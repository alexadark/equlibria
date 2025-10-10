import SectionContainer from '@/components/ui/section-container';
import PostCard from '@/components/ui/post-card';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { fetchSanityPosts } from '@/sanity/lib/fetch';
import { PAGE_QUERYResult } from '@/sanity.types';
import { cn } from '@/lib/utils';

type AllPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'all-posts' }
>;

export default async function AllPosts({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
}: AllPostsProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const posts = await fetchSanityPosts();

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post?.slug?.current}
              className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`/blog/${post?.slug?.current}`}
            >
              <PostCard
                title={post?.title ?? ''}
                excerpt={post?.excerpt ?? ''}
                image={post?.image ?? null}
              />
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
