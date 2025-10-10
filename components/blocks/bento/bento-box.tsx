import { PAGE_QUERYResult } from '@/sanity.types';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/section-container';
import BentoCard from './bento-card';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type BentoBox = Extract<Block, { _type: 'bento-box' }>;
type BentoCardType = NonNullable<NonNullable<BentoBox['cards']>[number]>;

const componentMap: {
  [K in BentoCardType['_type']]: React.ComponentType<
    Extract<BentoCardType, { _type: K }>
  >;
} = {
  'bento-card': BentoCard,
};

export default function BentoBoxComponent({
  padding,
  colorVariant,
  tagLine,
  title,
  description,
  cards,
}: BentoBox) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        {(tagLine || title || description) && (
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-[48rem] text-center mx-auto">
            <div
              className={cn(
                color === 'primary' ? 'text-background' : undefined
              )}
            >
              {tagLine && (
                <h1 className="leading-[0] mb-4">
                  <span className="text-base font-semibold uppercase tracking-wider text-neutral-500">
                    {tagLine}
                  </span>
                </h1>
              )}
              {title && (
                <h2 className="text-3xl md:text-5xl mb-4 font-bold tracking-tight text-balance">
                  {title}
                </h2>
              )}
            </div>
            {description && (
              <p className="text-lg text-neutral-600 text-pretty">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Bento Grid */}
        {cards && cards?.length > 0 && (
          <div className="grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((card) => {
              const Component = componentMap[card._type];
              if (!Component) {
                console.warn(
                  `No component implemented for card type: ${card._type}`
                );
                return <div data-type={card._type} key={card._key} />;
              }
              return <Component {...(card as any)} key={card._key} />;
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
