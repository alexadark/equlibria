import {
  fetchSanityIndustryBySlug,
  fetchSanityIndustriesStaticParams,
  fetchSanityOfferingsByIndustry,
} from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { Metadata } from 'next';
import { FilterableOfferings } from '@/components/ui/filterable-offerings';

export async function generateStaticParams() {
  const industries = await fetchSanityIndustriesStaticParams();

  return industries.map((industry) => ({
    slug: industry.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const industry = await fetchSanityIndustryBySlug({ slug: params.slug });

  if (!industry) {
    notFound();
  }

  return generatePageMetadata({
    page: industry,
    slug: `industries/${params.slug}`,
  });
}

export default async function IndustryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const industry = await fetchSanityIndustryBySlug({ slug: params.slug });

  if (!industry) {
    notFound();
  }

  // Fetch offerings for this industry
  const offerings = await fetchSanityOfferingsByIndustry({
    industryId: industry._id || '',
  });

  return (
    <div>
      {/* Industry Header */}
      <section className="py-16 xl:py-20">
        <div className="container max-w-6xl">
          {industry.image && (
            <div className="relative mb-8 h-64 overflow-hidden rounded-lg md:h-96">
              <Image
                src={urlFor(industry.image)?.url() || ''}
                alt={stegaClean(industry.image.alt) || industry.title || ''}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            {industry.title}
          </h1>

          {industry.description && (
            <p className="text-lg text-muted-foreground">
              {industry.description}
            </p>
          )}
        </div>
      </section>

      {/* Offerings in this Industry */}
      <section className="pb-16 xl:pb-20">
        <div className="container max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold">
            Investment Offerings in {industry.title}
          </h2>

          {offerings && offerings.length > 0 ? (
            <FilterableOfferings
              offerings={offerings}
              industryTitle={industry.title || ''}
            />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No offerings available in this industry yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
