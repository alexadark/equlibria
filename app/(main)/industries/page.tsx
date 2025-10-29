import { fetchSanityIndustries } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Explore investment opportunities across different industries and sectors.',
};

export default async function IndustriesPage() {
  const industries = await fetchSanityIndustries();

  return (
    <section className="py-16 xl:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl">
            Industries
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse investment opportunities across various industries and
            sectors
          </p>
        </div>

        {industries && industries.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry?.slug?.current}
                href={`/industries/${industry?.slug?.current}`}
                className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
              >
                {industry?.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(industry.image)?.url() || ''}
                      alt={
                        stegaClean(industry.image.alt) || industry?.title || ''
                      }
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold">{industry?.title}</h2>
                  {industry?.description && (
                    <p className="line-clamp-3 text-muted-foreground">
                      {industry.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No industries available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
