'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import { PAGE_QUERYResult } from '@/sanity.types';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type Hero3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'hero-3' }
>;

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/
  )?.[1];
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1`;
}

export default function Hero3({
  mediaType,
  backgroundImage,
  backgroundVideo,
  title,
  description,
  links,
}: Hero3Props) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const cleanMediaType = stegaClean(mediaType);
  const isVideo = cleanMediaType === 'video';

  useEffect(() => {
    if (
      isVideo &&
      backgroundVideo?.videoType === 'youtube' &&
      iframeRef.current
    ) {
      // Send message to YouTube iframe to control mute
      const message = isMuted
        ? '{"event":"command","func":"mute","args":""}'
        : '{"event":"command","func":"unMute","args":""}';
      iframeRef.current.contentWindow?.postMessage(message, '*');
    }
  }, [isMuted, isVideo, backgroundVideo?.videoType]);

  const toggleMute = () => {
    if (isVideo && backgroundVideo?.videoType === 'url' && videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      {isVideo && backgroundVideo ? (
        <>
          {backgroundVideo.videoType === 'youtube' &&
          backgroundVideo.youtubeUrl ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                ref={iframeRef}
                src={getYouTubeEmbedUrl(backgroundVideo.youtubeUrl)}
                className="absolute pointer-events-none border-0 m-0 p-0"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100vw',
                  height: '100vh',
                  transform: 'translate(-50%, -50%) scale(1.5)',
                  transformOrigin: 'center',
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : backgroundVideo.videoType === 'url' &&
            backgroundVideo.directUrl ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={backgroundVideo.directUrl} type="video/mp4" />
            </video>
          ) : null}
        </>
      ) : (
        backgroundImage &&
        backgroundImage.asset?._id && (
          <Image
            src={urlFor(backgroundImage).url()}
            alt={backgroundImage.alt || ''}
            fill
            className="object-cover"
            priority
            quality={100}
            placeholder={
              backgroundImage?.asset?.metadata?.lqip ? 'blur' : undefined
            }
            blurDataURL={backgroundImage?.asset?.metadata?.lqip || ''}
          />
        )
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Mute/Unmute Button */}
      {isVideo && backgroundVideo && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {title && (
          <div className="inline-block border-4 border-white px-8 py-6 md:px-12 md:py-8 mb-6 animate-fade-up [animation-delay:100ms] opacity-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              {title}
            </h1>
          </div>
        )}

        {description && (
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 animate-fade-up [animation-delay:200ms] opacity-0">
            {description}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up [animation-delay:300ms] opacity-0">
            {links.map((link) => (
              <Button
                key={link._key}
                variant={stegaClean(link?.buttonVariant)}
                asChild
                size="lg"
              >
                <Link
                  href={link.href || '#'}
                  target={link.target ? '_blank' : undefined}
                  rel={link.target ? 'noopener' : undefined}
                >
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
