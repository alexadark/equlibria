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
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {offerings.map((offering) => (
                <Link
                  key={offering?.slug?.current}
                  href={`/offerings/${offering?.slug?.current}`}
                  className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                >
                  {/* Background Image */}
                  {offering?.backgroundImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(offering.backgroundImage)?.url() || ''}
                        alt={
                          stegaClean(offering.backgroundImage.alt) ||
                          offering?.companyName ||
                          ''
                        }
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Logo */}
                    {offering?.logo && (
                      <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white p-1">
                          <Image
                            src={urlFor(offering.logo)?.url() || ''}
                            alt={
                              stegaClean(offering.logo.alt) ||
                              offering?.companyName ||
                              ''
                            }
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h2 className="text-xl font-bold">
                          {offering?.companyName}
                        </h2>
                      </div>
                    )}

                    {/* Tagline */}
                    {offering?.tagline && (
                      <p className="mb-4 text-muted-foreground">
                        {offering.tagline}
                      </p>
                    )}

                    {/* Industries */}
                    {offering?.industries && offering.industries.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {offering.industries.map((ind) => (
                          <Badge key={ind?.slug?.current} variant="outline">
                            {ind?.title}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Investment Details */}
                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                      {offering?.valuation && (
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Valuation
                          </p>
                          <p className="font-semibold">{offering.valuation}</p>
                        </div>
                      )}
                      {offering?.regulationType && (
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Regulation
                          </p>
                          <p className="font-semibold">
                            {offering.regulationType.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
