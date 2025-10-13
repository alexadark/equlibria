import Blocks from '@/components/blocks';
import ProjectHero from '@/components/blocks/project-hero';
import ProjectSteps from '@/components/blocks/project-steps';
import { Button } from '@/components/ui/button';
import {
  fetchSanityProjectBySlug,
  fetchSanityProjectsStaticParams,
} from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { Clock, Sparkles, Banknote } from 'lucide-react';

export async function generateStaticParams() {
  const projects = await fetchSanityProjectsStaticParams();

  return projects.map((project) => ({
    slug: project.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await fetchSanityProjectBySlug({ slug: params.slug });

  if (!project) {
    notFound();
  }

  return generatePageMetadata({
    page: project,
    slug: `projects/${params.slug}`,
  });
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await fetchSanityProjectBySlug({ slug: params.slug });

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero
        title={project.title}
        subtitle={project.subtitle}
        excerpt={project.excerpt}
        image={project.image}
        categories={project.categories}
      />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            {(project.aboutTitle || project.aboutText) && (
              <div className="space-y-4">
                {project.aboutTitle && (
                  <h2 className="text-3xl font-bold">{project.aboutTitle}</h2>
                )}
                {project.aboutText && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.aboutText}
                  </p>
                )}
              </div>
            )}

            {/* Steps Section */}
            {project.steps && project.steps.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Process</h2>
                <ProjectSteps steps={project.steps} />
              </div>
            )}

            {/* Additional Blocks */}
            <Blocks blocks={project?.blocks ?? []} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Investment Card */}
              <div className="border rounded-lg p-6 bg-card space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Invest in This Project
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn more and participate in this investment opportunity.
                  </p>
                </div>

                {project.buyNowUrl && (
                  <Button asChild className="w-full" size="lg">
                    <a
                      href={project.buyNowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Investment
                    </a>
                  </Button>
                )}

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold text-lg">Project Details</h4>

                  {project.expiresDate && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Expires {project.expiresDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.regulationType && (
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {project.regulationType}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.budget && (
                    <div className="flex items-start gap-3">
                      <Banknote className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{project.budget}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
