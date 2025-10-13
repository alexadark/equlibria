import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import type { SplitOffering } from '@/sanity.types';

interface SplitOfferingProps extends SplitOffering {
  color?: string;
  isSingleColumn?: boolean;
  fullWidth?: boolean;
}

export default function SplitOffering({
  project,
  showExcerpt,
  showImage,
  customTitle,
  customExcerpt,
  link,
  color,
  isSingleColumn,
  fullWidth,
}: SplitOfferingProps) {
  if (!project) {
    return null;
  }

  const displayTitle = customTitle || project.title;
  const displayExcerpt = customExcerpt || project.excerpt;
  const displayLink = link?.href || `/offerings/${project.slug?.current}`;

  return (
    <div
      className={cn(
        'flex flex-col',
        fullWidth && 'px-6 md:px-12 lg:px-16 xl:px-20',
        isSingleColumn && 'items-center text-center'
      )}
    >
      {showImage && project.image && project.image.asset?._id && (
        <div
          className={cn(
            'relative mb-6',
            fullWidth
              ? 'h-[300px] lg:h-[400px]'
              : 'h-[200px] sm:h-[250px] md:h-[200px] lg:h-[300px]',
            'rounded-lg overflow-hidden'
          )}
        >
          <Image
            src={urlFor(project.image).url()}
            alt={project.image.alt || displayTitle || ''}
            placeholder={
              project.image?.asset?.metadata?.lqip ? 'blur' : undefined
            }
            blurDataURL={project.image?.asset?.metadata?.lqip || ''}
            fill
            className="object-cover"
            sizes={
              fullWidth
                ? '(min-width: 1024px) 50vw, 100vw'
                : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
            }
            quality={100}
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col',
          isSingleColumn && 'items-center text-center'
        )}
      >
        {displayTitle && (
          <h3 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4">
            {displayTitle}
          </h3>
        )}

        {showExcerpt && displayExcerpt && (
          <div
            className={cn(
              'text-muted-foreground mb-6',
              isSingleColumn && 'max-w-2xl'
            )}
          >
            <p>{displayExcerpt}</p>
          </div>
        )}

        {displayLink && (
          <div className="flex flex-col">
            <Button
              className="mt-2"
              variant={
                link?.buttonVariant ? stegaClean(link.buttonVariant) : 'default'
              }
              size="lg"
              asChild
            >
              <Link
                href={displayLink}
                target={link?.target ? '_blank' : undefined}
              >
                {link?.title || 'View Offering'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
