'use client';
import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Fragment } from 'react';
import { motion } from 'motion/react';
import { PAGE_QUERYResult } from '@/sanity.types';

type LogoCloud1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'logo-cloud-1' }
>;

export default function LogoCloud1({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  images,
}: LogoCloud1Props) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer
      color={color}
      padding={padding}
      className="overflow-hidden"
    >
      <div
        className={cn(
          'space-y-8',
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        {(title || tagLine || description) && (
          <div
            className={cn(
              align === 'center'
                ? 'max-w-[48rem] text-center mx-auto'
                : undefined
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
        <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-linear-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-linear-to-l after:from-background after:to-transparent after:content-['']">
          <motion.div
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
            animate={{
              x: ['0%', '-50%'],
            }}
            className="flex w-max gap-24 pr-24"
          >
            {[...new Array(2)].map((_, arrayIndex) => (
              <Fragment key={arrayIndex}>
                {images?.map((image, index) => (
                  <div
                    key={`${image.asset?._id}-${arrayIndex}-${index}`}
                    className="shrink-0 w-24 h-24 flex items-center justify-center"
                  >
                    <Image
                      src={urlFor(image).url()}
                      alt={image.alt || ''}
                      priority={arrayIndex === 0 && index < 3}
                      placeholder={
                        image?.asset?.metadata?.lqip &&
                        image?.asset?.mimeType !== 'image/svg+xml'
                          ? 'blur'
                          : undefined
                      }
                      blurDataURL={image?.asset?.metadata?.lqip || ''}
                      width={image.asset?.metadata?.dimensions?.width || 220}
                      height={image?.asset?.metadata?.dimensions?.height || 90}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
