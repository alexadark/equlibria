import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { PAGE_QUERYResult } from '@/sanity.types';
import GridCard from './grid-card';
import PricingCard from './pricing-card';
import GridPost from './grid-post';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type GridRow = Extract<Block, { _type: 'grid-row' }>;
type GridColumn = NonNullable<NonNullable<GridRow['columns']>[number]>;

const componentMap: {
  [K in GridColumn['_type']]: React.ComponentType<
    Extract<GridColumn, { _type: K }>
  >;
} = {
  'grid-card': GridCard,
  'pricing-card': PricingCard,
  'grid-post': GridPost,
};

export default function GridRow({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  gridColumns,
  columns,
}: GridRow) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

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
        {columns && columns?.length > 0 && (
          <div
            className={cn(
              `grid grid-cols-1 gap-6`,
              `lg:${stegaClean(gridColumns)}`
            )}
          >
            {columns.map((column) => {
              const Component = componentMap[column._type];
              if (!Component) {
                // Fallback for development/debugging of new component types
                console.warn(
                  `No component implemented for grid column type: ${column._type}`
                );
                return <div data-type={column._type} key={column._key} />;
              }
              return (
                <Component
                  {...(column as any)}
                  color={color}
                  key={column._key}
                />
              );
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
