import { fetchSanityOfferings } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offerings',
  description:
    'Browse our investment offerings across various industries and asset classes.',
};

export default async function OfferingsPage() {
  const offerings = await fetchSanityOfferings();

  return (
    <section className="py-16 xl:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl">
            Investment Offerings
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore tokenized investment opportunities across real assets and
            infrastructure
          </p>
        </div>

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
                      {offering.industries.map((industry) => (
                        <Badge key={industry?.slug?.current} variant="outline">
                          {industry?.title}
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
            <p className="text-muted-foreground">No offerings available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
