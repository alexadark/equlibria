import { fetchSanityProjectsPage } from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/project-card';
import { generatePageMetadata } from '@/sanity/lib/metadata';

export async function generateMetadata() {
  const page = await fetchSanityProjectsPage();

  if (!page) {
    return {
      title: 'Projects',
      description: 'View our investment projects',
    };
  }

  return generatePageMetadata({
    page,
    slug: 'projects',
  });
}

export default async function ProjectsPage() {
  const page = await fetchSanityProjectsPage();

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {page.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {page.title}
              </h1>
            )}
            {page.description && (
              <p className="text-lg md:text-xl text-muted-foreground">
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
