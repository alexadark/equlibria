import {
  fetchSanityIndustryBySlug,
  fetchSanityIndustriesStaticParams,
} from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { Metadata } from 'next';

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

  return (
    <section className="py-16 xl:py-20">
      <div className="container max-w-4xl">
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
  );
}
