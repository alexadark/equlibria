'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';

import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import SectionContainer from '@/components/ui/section-container';
import { urlFor } from '@/sanity/lib/image';
import { PAGE_QUERYResult } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type FeaturedOfferings = Extract<Block, { _type: 'featured-offerings' }>;
type Offering = NonNullable<
  NonNullable<FeaturedOfferings['offerings']>
>[number];

interface FeaturedOfferingsProps
  extends Omit<NonNullable<FeaturedOfferings>, '_type' | '_key'> {}

const statusLabels: Record<string, string> = {
  open: 'Open',
  secondary: 'Secondary',
  closed: 'Closed',
  'coming-soon': 'Coming Soon',
};

const statusColors: Record<string, string> = {
  open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  secondary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
  'coming-soon':
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
};

export default function FeaturedOfferings({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  ctaUrl,
  ctaText,
  offerings,
}: FeaturedOfferingsProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className={cn('container', isNarrow ? 'max-w-[48rem]' : undefined)}>
        {(title || tagLine || description) && (
          <div
            className={cn(
              'mb-8 md:mb-12 lg:mb-16',
              align === 'center' ? 'text-center mx-auto' : undefined
            )}
          >
            <div
              className={cn(
                color === 'primary' ? 'text-background' : undefined
              )}
            >
              {tagLine && (
                <h1 className="leading-[0] mb-4">
                  <span className="text-base font-semibold">{tagLine}</span>
                </h1>
              )}
              {title && <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>}
            </div>
            {description && <p>{description}</p>}
          </div>
        )}
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            {ctaUrl && (
              <a
                href={ctaUrl}
                className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
              >
                {ctaText || 'View all offerings'}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {offerings &&
              offerings.length > 0 &&
              offerings.map((offering) => {
                const offeringHref = offering.slug?.current
                  ? `/offerings/${offering.slug.current}`
                  : '#';
                const status = stegaClean(offering.status) || 'open';
                const statusLabel = statusLabels[status] || status;
                const statusColor =
                  statusColors[status] || statusColors['open'];

                return (
                  <CarouselItem
                    key={offering._id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      href={offeringHref}
                      className="group flex flex-col h-full"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                        {offering.backgroundImage &&
                          offering.backgroundImage.asset?._id && (
                            <div className="aspect-3/2 flex overflow-clip">
                              <div className="flex-1">
                                <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                  <Image
                                    src={urlFor(offering.backgroundImage).url()}
                                    alt={
                                      offering.backgroundImage.alt ||
                                      offering.companyName ||
                                      ''
                                    }
                                    placeholder={
                                      offering.backgroundImage?.asset?.metadata
                                        ?.lqip
                                        ? 'blur'
                                        : undefined
                                    }
                                    blurDataURL={
                                      offering.backgroundImage?.asset?.metadata
                                        ?.lqip || ''
                                    }
                                    fill
                                    sizes="(min-width: 768px) 452px, 100vw"
                                    className="h-full w-full object-cover object-center"
                                    quality={100}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                        {/* Status Badge Overlay */}
                        <div className="absolute top-4 right-4">
                          <Badge className={cn('font-medium', statusColor)}>
                            {statusLabel}
                          </Badge>
                        </div>

                        {/* Company Logo */}
                        {offering.logo && offering.logo.asset?._id && (
                          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-950 rounded-lg p-3 shadow-lg">
                            <div className="relative w-16 h-16">
                              <Image
                                src={urlFor(offering.logo).url()}
                                alt={
                                  offering.logo.alt ||
                                  offering.companyName ||
                                  ''
                                }
                                fill
                                sizes="64px"
                                className="object-contain"
                                quality={100}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 pt-4">
                        {offering.companyName && (
                          <div className="mb-2 line-clamp-2 break-words text-xl font-semibold md:text-2xl">
                            {offering.companyName}
                          </div>
                        )}

                        {offering.tagline && (
                          <div className="text-muted-foreground mb-4 line-clamp-2 text-sm md:text-base">
                            {offering.tagline}
                          </div>
                        )}

                        <div className="mt-auto space-y-3 pt-4 border-t">
                          {/* ROI */}
                          {offering.projectedReturns && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Annual ROI
                              </span>
                              <span className="text-sm font-semibold">
                                {offering.projectedReturns}
                              </span>
                            </div>
                          )}

                          {/* Minimum Investment */}
                          {offering.minimumInvestment && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Min. Investment
                              </span>
                              <span className="text-sm font-semibold">
                                {offering.minimumInvestment}
                              </span>
                            </div>
                          )}

                          {/* Valuation */}
                          {offering.valuation && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Valuation
                              </span>
                              <span className="text-sm font-semibold">
                                {offering.valuation}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-sm mt-6 font-medium">
                          View details{' '}
                          <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </div>
    </SectionContainer>
  );
}
