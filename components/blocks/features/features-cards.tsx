'use client';

import { PAGE_QUERYResult } from '@/sanity.types';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/section-container';
import FeaturesCard from './features-card';
import Masonry from 'react-masonry-css';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type FeaturesCards = Extract<Block, { _type: 'features-cards' }>;
type Card = NonNullable<NonNullable<FeaturesCards['cards']>>[number];

const componentMap: {
  [K in Card['_type']]: React.ComponentType<Extract<Card, { _type: K }>>;
} = {
  'features-card': FeaturesCard,
};

export default function FeaturesCardsBlock({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'center',
  tagLine,
  title,
  description,
  layout,
  gridColumns,
  cards,
}: FeaturesCards) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const cleanLayout = stegaClean(layout);
  const cleanGridColumns = stegaClean(gridColumns) || 'grid-cols-3';

  // Map grid column classes for both grid and masonry layouts
  const gridColsMap = {
    'grid-cols-2': 'lg:grid-cols-2',
    'grid-cols-3': 'lg:grid-cols-3',
    'grid-cols-4': 'lg:grid-cols-4',
  };

  const masonryColsMap = {
    'grid-cols-2': 2,
    'grid-cols-3': 3,
    'grid-cols-4': 4,
  };

  const gridClass =
    gridColsMap[cleanGridColumns as keyof typeof gridColsMap] ||
    'lg:grid-cols-3';
  const masonryColsCount =
    masonryColsMap[cleanGridColumns as keyof typeof masonryColsMap] || 3;

  return (
    <SectionContainer color={color} padding={padding}>
      {/* Standard Header Section */}
      {(tagLine || title || description) && (
        <div
          className={cn(
            'mb-8 md:mb-12 lg:mb-16',
            align === 'center'
              ? 'max-w-[48rem] text-center mx-auto'
              : undefined,
            isNarrow ? 'max-w-[48rem] mx-auto' : undefined
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

      {/* Cards Section */}
      {cards && cards.length > 0 && (
        <>
          {cleanLayout === 'masonry' ? (
            <Masonry
              breakpointCols={{
                default: masonryColsCount,
                1024: masonryColsCount,
                768: 2,
                640: 1,
              }}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {cards.map((card) => {
                const Component = componentMap[card._type];
                if (!Component) {
                  console.warn(
                    `No component implemented for card type: ${card._type}`
                  );
                  return <div data-type={card._type} key={card._key} />;
                }
                return (
                  <div key={card._key} className="mb-6">
                    <Component {...(card as any)} color={color} />
                  </div>
                );
              })}
            </Masonry>
          ) : (
            <div
              className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', gridClass)}
            >
              {cards.map((card) => {
                const Component = componentMap[card._type];
                if (!Component) {
                  console.warn(
                    `No component implemented for card type: ${card._type}`
                  );
                  return <div data-type={card._type} key={card._key} />;
                }
                return (
                  <Component {...(card as any)} color={color} key={card._key} />
                );
              })}
            </div>
          )}
        </>
      )}
    </SectionContainer>
  );
}
