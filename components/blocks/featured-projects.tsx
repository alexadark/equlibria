import SectionContainer from '@/components/ui/section-container';
import ProjectCard from '@/components/ui/project-card';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { PAGE_QUERYResult } from '@/sanity.types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FeaturedProjectsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'featured-projects' }
>;

export default function FeaturedProjects({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  projects,
  showViewAllButton,
  viewAllButtonText,
  viewAllButtonVariant,
}: FeaturedProjectsProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Link
              key={project?.slug?.current}
              className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`/projects/${project?.slug?.current}`}
            >
              <ProjectCard
                title={project?.title ?? ''}
                excerpt={project?.excerpt ?? ''}
                image={project?.image ?? null}
                categories={project?.categories ?? []}
              />
            </Link>
          ))}
        </div>
        {showViewAllButton && (
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={stegaClean(viewAllButtonVariant) || 'default'}
              asChild
            >
              <Link href="/projects">
                {viewAllButtonText || 'View All Projects'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
