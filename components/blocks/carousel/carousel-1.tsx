import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import { PAGE_QUERYResult } from '@/sanity.types';

const CAROUSEL_SIZES = {
  one: 'basis-full',
  two: 'basis-full md:basis-1/2',
  three: 'basis-full md:basis-1/2 lg:basis-1/3',
} as const;

const IMAGE_SIZES = {
  one: 'h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]',
  two: 'h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]',
  three: 'h-[30rem] md:h-[20rem] xl:h-[25rem]',
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

type Carousel1 = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'carousel-1' }
>;

interface Carousel1Props
  extends Omit<NonNullable<Carousel1>, '_type' | '_key'> {
  size: CarouselSize | null;
  indicators: 'none' | 'dots' | 'count' | null;
}

export default function Carousel1({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  size = 'one',
  indicators = 'none',
  images,
}: Carousel1Props) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const stegaIndicators = stegaClean(indicators);
  const stegaSize = stegaClean(size) as CarouselSize;

  return (
    <SectionContainer color={color} padding={padding}>
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
        {images && images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={`${index}-${image.alt}`}
                  className={CAROUSEL_SIZES[stegaSize]}
                >
                  {image && (
                    <div
                      className={cn(
                        'relative mx-auto overflow-hidden rounded-2xl',
                        IMAGE_SIZES[stegaSize],
                        stegaSize === 'one' ? 'max-w-[35rem]' : undefined
                      )}
                    >
                      <Image
                        className="object-cover"
                        src={urlFor(image).url()}
                        alt={image.alt || ''}
                        fill
                        placeholder={
                          image?.asset?.metadata?.lqip ? 'blur' : undefined
                        }
                        blurDataURL={image.asset?.metadata?.lqip || ''}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        quality={100}
                      />
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="secondary"
              className="-left-3 md:-left-8 xl:-left-12"
            />
            <CarouselNext
              variant="secondary"
              className="-right-3 md:-right-8 xl:-right-12"
            />
            {stegaIndicators !== 'none' && (
              <div className="w-full flex justify-center">
                {stegaIndicators === 'dots' && <CarouselDots />}
                {stegaIndicators === 'count' && <CarouselCounter />}
              </div>
            )}
          </Carousel>
        )}
      </div>
    </SectionContainer>
  );
}
