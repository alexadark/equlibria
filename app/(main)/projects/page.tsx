import { fetchSanityProjectsPage } from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ui/project-card';
import { urlFor } from '@/sanity/lib/image';

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export async function generateMetadata() {
  const page = await fetchSanityProjectsPage();

  if (!page) {
    return {
      title: 'Projects',
      description: 'View our investment projects',
    };
  }

  return {
    title: page.meta_title || page.title || 'Projects',
    description:
      page.meta_description ||
      page.description ||
      'View our investment projects',
    openGraph: {
      images: [
        {
          url: page.ogImage
            ? urlFor(page.ogImage).quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width: page.ogImage?.asset?.metadata?.dimensions?.width || 1200,
          height: page.ogImage?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: !isProduction
      ? 'noindex, nofollow'
      : page.noindex
        ? 'noindex'
        : 'index, follow',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/projects`,
    },
  };
}

export default async function ProjectsPage() {
  const page = await fetchSanityProjectsPage();

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        {page.heroImage && page.heroImage.asset?._id && (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={urlFor(page.heroImage).url()}
                alt={page.heroImage.alt || ''}
                fill
                className="object-cover"
                priority
                placeholder={
                  page.heroImage?.asset?.metadata?.lqip ? 'blur' : undefined
                }
                blurDataURL={page.heroImage?.asset?.metadata?.lqip || ''}
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background z-[1]" />
          </>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {page.title && (
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up opacity-0 [animation-delay:100ms] ${page.heroImage ? 'text-white' : ''}`}
              >
                {page.title}
              </h1>
            )}
            {page.description && (
              <p
                className={`text-lg md:text-xl animate-fade-up opacity-0 [animation-delay:200ms] ${page.heroImage ? 'text-white/90' : 'text-muted-foreground'}`}
              >
                {page.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {page.projects && page.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.projects.map((project) => (
                <Link
                  key={project.slug?.current}
                  href={`/projects/${project.slug?.current}`}
                  className="group"
                >
                  <ProjectCard
                    title={project.title}
                    excerpt={project.excerpt}
                    image={project.image}
                    categories={project.categories}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No projects available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
