'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import SectionContainer from '@/components/ui/section-container';
import { urlFor } from '@/sanity/lib/image';
import { PAGE_QUERYResult } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type GalleryLightbox = Extract<Block, { _type: 'gallery-lightbox' }>;
type GalleryImage = NonNullable<NonNullable<GalleryLightbox['images']>>[number];

interface GalleryLightboxProps
  extends Omit<NonNullable<GalleryLightbox>, '_type' | '_key'> {}

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/
  )?.[1];
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export default function GalleryLightbox({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'center',
  tagLine,
  title,
  description,
  useMasonry,
  columns,
  masonryColumns,
  gapSize,
  fullWidth,
  roundedCorners,
  showTagFilters,
  images,
}: GalleryLightboxProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const isFullWidth = stegaClean(fullWidth);
  const hasRoundedCorners = stegaClean(roundedCorners) ?? false;
  const shouldShowTagFilters = stegaClean(showTagFilters) ?? false;
  const isMasonry = stegaClean(useMasonry) ?? false;
  const masonryCols = stegaClean(masonryColumns) ?? 3;
  const gap = stegaClean(gapSize) ?? 16;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags from all images
  const allTags = useMemo(() => {
    const tagMap = new Map<
      string,
      { _id: string; title: string; slug: { current: string } }
    >();
    images?.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (tag && tag._id && !tagMap.has(tag._id)) {
          tagMap.set(tag._id, tag);
        }
      });
    });
    return Array.from(tagMap.values()).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [images]);

  // Filter images by selected tag
  const filteredImages = useMemo(() => {
    if (!selectedTag || !images) return images;
    return images.filter((item) =>
      item.tags?.some((tag) => tag?._id === selectedTag)
    );
  }, [images, selectedTag]);

  // Stop any playing videos
  const stopCurrentVideo = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.pause();
      currentVideoRef.current.currentTime = 0;
    }
    if (currentIframeRef.current) {
      // Stop YouTube video by reloading iframe with autoplay=0
      const src = currentIframeRef.current.src;
      if (src) {
        currentIframeRef.current.src = src.replace('autoplay=1', 'autoplay=0');
      }
    }
  };

  // Handle slide change
  useEffect(() => {
    if (lightboxOpen) {
      stopCurrentVideo();
    }
  }, [lightboxIndex]);

  // Handle lightbox close
  const handleClose = () => {
    stopCurrentVideo();
    setLightboxOpen(false);
  };

  // Transform images for lightbox with video support (use filtered images)
  const lightboxSlides =
    filteredImages?.map((item) => {
      const hasVideo = stegaClean(item.hasVideo);
      const videoType = item.video?.videoType;

      if (hasVideo && item.video) {
        if (videoType === 'youtube' && item.video.youtubeUrl) {
          return {
            type: 'video-youtube' as const,
            src: item.video.youtubeUrl,
            poster: item.image?.asset?._id ? urlFor(item.image).url() : '',
            alt: item.image?.alt || '',
            title: item.caption || '',
          };
        } else if (videoType === 'url' && item.video.directUrl) {
          return {
            type: 'video-direct' as const,
            src: item.video.directUrl,
            poster: item.image?.asset?._id ? urlFor(item.image).url() : '',
            alt: item.image?.alt || '',
            title: item.caption || '',
          };
        }
      }

      return {
        type: 'image' as const,
        src: item.image?.asset?._id ? urlFor(item.image).url() : '',
        alt: item.image?.alt || '',
        title: item.caption || '',
      };
    }) || [];

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const galleryContent = (
    <>
      {(title || tagLine || description) && (
        <div
          className={cn(
            'mb-8 md:mb-12 lg:mb-16',
            align === 'center'
              ? 'max-w-[48rem] text-center mx-auto'
              : undefined,
            isNarrow ? 'max-w-[48rem] mx-auto' : undefined,
            isFullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8'
          )}
        >
          <div
            className={cn(color === 'primary' ? 'text-background' : undefined)}
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

      {/* Tag Filters */}
      {shouldShowTagFilters && allTags.length > 0 && (
        <div
          className={cn(
            'mb-6 md:mb-8',
            isFullWidth && 'container mx-auto px-4 sm:px-6 lg:px-8'
          )}
        >
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag._id}
                variant={selectedTag === tag._id ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedTag(tag._id)}
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {filteredImages && filteredImages.length > 0 && (
        <div
          className={cn(
            isMasonry
              ? 'columns-1 md:columns-2'
              : [
                  'grid',
                  stegaClean(columns) || 'grid-cols-3',
                  'grid-cols-1 md:grid-cols-2',
                  stegaClean(columns) === 'grid-cols-2' && 'lg:grid-cols-2',
                  stegaClean(columns) === 'grid-cols-3' && 'lg:grid-cols-3',
                  stegaClean(columns) === 'grid-cols-4' && 'lg:grid-cols-4',
                ]
          )}
          style={{
            gap: `${gap}px`,
            ...(isMasonry && { columnCount: masonryCols }),
          }}
        >
          {filteredImages.map((item, index) => {
            if (!item.image?.asset?._id) return null;

            const hasVideo = stegaClean(item.hasVideo);

            return (
              <div
                key={item._key || index}
                className={cn(
                  'group relative cursor-pointer overflow-hidden',
                  isMasonry ? 'break-inside-avoid' : 'aspect-square',
                  hasRoundedCorners && 'rounded-lg'
                )}
                style={isMasonry ? { marginBottom: `${gap}px` } : undefined}
                onClick={() => handleImageClick(index)}
              >
                {isMasonry ? (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.image.alt || ''}
                    placeholder={
                      item.image.asset?.metadata?.lqip ? 'blur' : undefined
                    }
                    blurDataURL={item.image.asset?.metadata?.lqip || ''}
                    width={item.image.asset?.metadata?.dimensions?.width || 800}
                    height={
                      item.image.asset?.metadata?.dimensions?.height || 600
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={85}
                  />
                ) : (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.image.alt || ''}
                    placeholder={
                      item.image.asset?.metadata?.lqip ? 'blur' : undefined
                    }
                    blurDataURL={item.image.asset?.metadata?.lqip || ''}
                    fill
                    sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${
                      stegaClean(columns) === 'grid-cols-4'
                        ? '25vw'
                        : stegaClean(columns) === 'grid-cols-3'
                          ? '33vw'
                          : '50vw'
                    }`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={85}
                  />
                )}
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                {/* Play button overlay for video items */}
                {hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black fill-black" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  return (
    <>
      {isFullWidth ? (
        <div
          className={cn(
            'w-full relative',
            color === 'primary' && 'bg-primary text-primary-foreground',
            color === 'secondary' && 'bg-secondary text-secondary-foreground',
            color === 'accent' && 'bg-accent text-accent-foreground',
            color === 'muted' && 'bg-muted text-muted-foreground',
            padding?.top ? 'pt-16 xl:pt-20' : undefined,
            padding?.bottom ? 'pb-16 xl:pb-20' : undefined
          )}
        >
          {galleryContent}
        </div>
      ) : (
        <SectionContainer color={color} padding={padding}>
          {galleryContent}
        </SectionContainer>
      )}

      <Lightbox
        open={lightboxOpen}
        close={handleClose}
        index={lightboxIndex}
        slides={lightboxSlides}
        carousel={{ finite: true }}
        on={{
          view: ({ index }) => {
            setLightboxIndex(index);
          },
        }}
        render={{
          slide: ({ slide }) => {
            if (slide.type === 'video-youtube') {
              return (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <div
                    className="relative w-full max-w-5xl"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <iframe
                      ref={currentIframeRef}
                      src={getYouTubeEmbedUrl(slide.src)}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            } else if (slide.type === 'video-direct') {
              return (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <video
                    ref={currentVideoRef}
                    controls
                    autoPlay
                    className="max-h-full max-w-full"
                    style={{ maxHeight: '90vh' }}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                </div>
              );
            } else {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              );
            }
          },
        }}
      />
    </>
  );
}
