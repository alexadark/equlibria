import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import Timeline1 from '@/components/blocks/timeline/timeline-1';
import { PAGE_QUERYResult, ColorVariant } from '@/sanity.types';

type TimelineRow = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'timeline-row' }
>;

export default function TimelineRow({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  timelines,
}: TimelineRow) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant) as ColorVariant;

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
        {timelines && timelines?.length > 0 && (
          <div className="max-w-[48rem] mx-auto">
            {timelines?.map((timeline) => (
              <Timeline1
                key={timeline._key}
                color={color}
                tagLine={timeline.tagLine}
                title={timeline.title}
                body={timeline.body}
              />
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
