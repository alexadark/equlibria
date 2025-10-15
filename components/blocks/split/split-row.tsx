import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { PAGE_QUERYResult } from '@/sanity.types';
import SplitContent from './split-content';
import SplitCardsList from './split-cards-list';
import SplitImage from './split-image';
import SplitInfoList from './split-info-list';
import SplitOffering from './split-offering';
import SplitProject from './split-project';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type SplitRow = Extract<Block, { _type: 'split-row' }>;
type SplitColumn = NonNullable<NonNullable<SplitRow['splitColumns']>[number]>;

const componentMap: {
  [K in SplitColumn['_type']]: React.ComponentType<
    Extract<SplitColumn, { _type: K }>
  >;
} = {
  'split-content': SplitContent,
  'split-cards-list': SplitCardsList,
  'split-image': SplitImage,
  'split-info-list': SplitInfoList,
  'split-offering': SplitOffering,
  'split-project': SplitProject,
};

export default function SplitRow({
  padding,
  colorVariant,
  noGap,
  fullWidth,
  splitColumns,
}: SplitRow) {
  const color = stegaClean(colorVariant);
  const isSingleColumn = splitColumns?.length === 1;

  const hasSplitProject = splitColumns?.some(
    (col) => col._type === 'split-project'
  );

  // For full-width split-project, render without any wrapper
  if (fullWidth && hasSplitProject) {
    return (
      <>
        {splitColumns?.map((column) => {
          const Component = componentMap[column._type];
          if (!Component) {
            console.warn(
              `No component implemented for split column type: ${column._type}`
            );
            return <div data-type={column._type} key={column._key} />;
          }

          return (
            <Component
              {...(column as any)}
              color={color}
              noGap={noGap}
              fullWidth={fullWidth}
              isSingleColumn={isSingleColumn}
              key={column._key}
            />
          );
        })}
      </>
    );
  }

  const content = splitColumns && splitColumns?.length > 0 && (
    <div
      className={cn(
        'grid grid-cols-1',
        isSingleColumn ? 'mx-auto max-w-4xl' : 'lg:grid-cols-2',
        noGap ? 'gap-0' : 'gap-12 lg:gap-20',
        fullWidth && !isSingleColumn && 'h-[600px] lg:h-[700px] xl:h-[800px]'
      )}
    >
      {splitColumns?.map((column) => {
        const Component = componentMap[column._type];
        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for split column type: ${column._type}`
          );
          return <div data-type={column._type} key={column._key} />;
        }

        return (
          <Component
            {...(column as any)}
            color={color}
            noGap={noGap}
            fullWidth={fullWidth}
            isSingleColumn={isSingleColumn}
            key={column._key}
          />
        );
      })}
    </div>
  );

  if (fullWidth && !isSingleColumn) {
    return (
      <div
        className={cn(
          `bg-${color} relative`,
          padding?.top ? 'pt-16 xl:pt-20' : undefined,
          padding?.bottom ? 'pb-16 xl:pb-20' : undefined
        )}
      >
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {content}
        </div>
      </div>
    );
  }

  return (
    <SectionContainer color={color} padding={padding}>
      {content}
    </SectionContainer>
  );
}
