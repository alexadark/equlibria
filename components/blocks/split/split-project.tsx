import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import { Clock, Sparkles, Banknote, MapPin, Calendar } from 'lucide-react';
import type { SplitProject } from '@/sanity.types';

interface SplitProjectProps extends SplitProject {
  color?: string;
  isSingleColumn?: boolean;
  fullWidth?: boolean;
  noGap?: boolean;
}

export default function SplitProject({
  project,
  imagePosition,
  showMetadata,
  customTitle,
  customExcerpt,
  buttonText,
  buttonVariant,
  color,
  isSingleColumn,
  fullWidth,
  noGap,
}: SplitProjectProps) {
  if (!project) {
    return null;
  }

  const displayTitle = customTitle || project.title;
  const displayExcerpt = customExcerpt || project.excerpt;
  const displayButtonText = buttonText || 'View Offer';
  const cleanImagePosition = stegaClean(imagePosition) || 'left';
  const isImageLeft = cleanImagePosition === 'left';

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log(`🖼️ Split Project: ${displayTitle}`, {
      rawPosition: imagePosition,
      cleanPosition: cleanImagePosition,
      isImageLeft: isImageLeft,
      fullWidth: fullWidth,
    });
  }

  const imageContent = (
    <div
      className={cn(
        'relative overflow-hidden group',
        fullWidth
          ? 'h-screen min-h-[600px] w-full'
          : 'h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]'
      )}
    >
      <Image
        src={urlFor(project.image).url()}
        alt={project.image.alt || displayTitle || ''}
        placeholder={project.image?.asset?.metadata?.lqip ? 'blur' : undefined}
        blurDataURL={project.image?.asset?.metadata?.lqip || ''}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={fullWidth ? '50vw' : '(min-width: 1024px) 50vw, 100vw'}
        quality={100}
        priority
      />

      {/* Overlay metadata tags */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
        {project.categories && project.categories.length > 0 && (
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {project.categories[0].title}
          </div>
        )}
        {project.expiresDate && (
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {project.expiresDate}
          </div>
        )}
        {project.regulationType && (
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {project.regulationType}
          </div>
        )}
        {project.budget && (
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
            <Banknote className="w-3 h-3" />
            {project.budget}
          </div>
        )}
      </div>
    </div>
  );

  const textContent = (
    <div
      className={cn(
        'flex flex-col justify-center',
        fullWidth
          ? 'h-screen min-h-[600px] px-12 lg:px-16 xl:px-24 bg-background'
          : 'px-6 py-8'
      )}
    >
      <div className="space-y-6 max-w-xl">
        {displayTitle && (
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {displayTitle}
          </h2>
        )}

        {displayExcerpt && (
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {displayExcerpt}
          </p>
        )}

        <div className="pt-6">
          <Button
            variant={stegaClean(buttonVariant) || 'default'}
            size="lg"
            asChild
          >
            <Link href={`/projects/${project.slug?.current}`}>
              {displayButtonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  // Full-width edge-to-edge layout
  if (fullWidth) {
    return (
      <div
        className="grid grid-cols-1 lg:grid-cols-2 w-full"
        data-image-position={cleanImagePosition}
        data-is-image-left={isImageLeft}
      >
        {isImageLeft ? (
          <>
            <div data-column="image-left">{imageContent}</div>
            <div data-column="text-right">{textContent}</div>
          </>
        ) : (
          <>
            <div data-column="text-left">{textContent}</div>
            <div data-column="image-right">{imageContent}</div>
          </>
        )}
      </div>
    );
  }

  // Regular contained layout
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 items-center w-full',
        noGap ? 'gap-0' : 'gap-8 lg:gap-12'
      )}
    >
      {isImageLeft ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
}
