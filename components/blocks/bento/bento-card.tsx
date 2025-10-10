import { PAGE_QUERYResult } from '@/sanity.types';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import {
  Building2,
  Landmark,
  Grid3x3,
  Compass,
  Home,
  Target,
} from 'lucide-react';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type BentoBox = Extract<Block, { _type: 'bento-box' }>;
type BentoCard = NonNullable<NonNullable<BentoBox['cards']>[number]>;

const iconMap = {
  Building2,
  Landmark,
  Grid3x3,
  Compass,
  Home,
  Target,
};

export default function BentoCard({
  icon,
  title,
  description,
  image,
  size,
}: BentoCard) {
  const cardSize = stegaClean(size);
  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        cardSize === 'large' ? 'md:col-span-2' : ''
      )}
    >
      {image && image.asset?._id && (
        <Image
          src={urlFor(image).url()}
          alt={image.alt || ''}
          width={image.asset?.metadata?.dimensions?.width || 800}
          height={image.asset?.metadata?.dimensions?.height || 800}
          placeholder={image?.asset?.metadata?.lqip ? 'blur' : undefined}
          blurDataURL={image?.asset?.metadata?.lqip || ''}
          quality={100}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {IconComponent && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
            <IconComponent className="h-5 w-5 text-white" />
          </div>
        )}
        <div>
          {title && (
            <h3
              className={cn(
                'mb-2 font-semibold text-white',
                cardSize === 'large' ? 'text-2xl' : 'text-xl'
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-white/90 text-pretty">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
