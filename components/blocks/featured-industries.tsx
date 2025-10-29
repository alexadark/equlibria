'use client';

import Image from 'next/image';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';

import { Button } from '@/components/ui/button';
import SectionContainer from '@/components/ui/section-container';
import { urlFor } from '@/sanity/lib/image';
import { PAGE_QUERYResult } from '@/sanity.types';
import { cn } from '@/lib/utils';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type FeaturedIndustries = Extract<Block, { _type: 'featured-industries' }>;
type Industry = NonNullable<
  NonNullable<FeaturedIndustries['industries']>
>[number];

interface FeaturedIndustriesProps
  extends Omit<NonNullable<FeaturedIndustries>, '_type' | '_key'> {}

export default function FeaturedIndustries({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  ctaUrl,
  ctaText,
  industries,
}: FeaturedIndustriesProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

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
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Industries Grid */}
        {industries && industries.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {industries.map((industry) => {
              const industryHref = industry.slug?.current
                ? `/industries/${industry.slug.current}`
                : '#';

              return (
                <Link
                  key={industry._id}
                  href={industryHref}
                  className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  {industry.image && industry.image.asset?._id && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(industry.image).url()}
                        alt={industry.image.alt || industry.title || ''}
                        placeholder={
                          industry.image?.asset?.metadata?.lqip
                            ? 'blur'
                            : undefined
                        }
                        blurDataURL={
                          industry.image?.asset?.metadata?.lqip || ''
                        }
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        quality={100}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {industry.title && (
                      <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                        {industry.title}
                      </h3>
                    )}
                    {industry.description && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {industry.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Button */}
        {ctaUrl && (
          <div
            className={cn(
              'mt-8 md:mt-12',
              align === 'center' ? 'flex justify-center' : undefined
            )}
          >
            <Button asChild size="lg">
              <Link href={ctaUrl}>{ctaText || 'View all industries'}</Link>
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
