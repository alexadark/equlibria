'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { OfferingsFilter } from '@/components/ui/offerings-filter';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';

interface Offering {
  companyName?: string;
  slug?: {
    current?: string;
  };
  logo?: any;
  tagline?: string;
  backgroundImage?: any;
  industries?: Array<{
    title?: string;
    slug?: {
      current?: string;
    };
  }>;
  valuation?: string;
  regulationType?: string;
  minimumInvestment?: string;
  geography?: string;
  status?: string;
}

interface FilterOptions {
  regulationType: string;
  geography: string;
  minInvestment: string;
  status: string;
}

interface FilterableOfferingsProps {
  offerings: Offering[];
  industryTitle: string;
}

// Parse minimum investment string to number for comparison
function parseInvestmentAmount(investment?: string): number {
  if (!investment) return 0;
  // Remove $ and commas, then parse
  const cleaned = investment.replace(/[$,]/g, '');
  return parseInt(cleaned, 10) || 0;
}

export function FilterableOfferings({
  offerings,
  industryTitle,
}: FilterableOfferingsProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    regulationType: 'all',
    geography: 'all',
    minInvestment: 'all',
    status: 'all',
  });

  const filteredOfferings = useMemo(() => {
    return offerings.filter((offering) => {
      // Filter by regulation type
      if (
        filters.regulationType &&
        filters.regulationType !== 'all' &&
        offering.regulationType !== filters.regulationType
      ) {
        return false;
      }

      // Filter by geography
      if (
        filters.geography &&
        filters.geography !== 'all' &&
        offering.geography !== filters.geography
      ) {
        return false;
      }

      // Filter by minimum investment
      if (filters.minInvestment && filters.minInvestment !== 'all') {
        const offeringAmount = parseInvestmentAmount(
          offering.minimumInvestment
        );
        const filterAmount = parseInt(filters.minInvestment, 10);

        if (filters.minInvestment === '100000+') {
          // Over $100,000
          if (offeringAmount <= 100000) return false;
        } else {
          // Up to specified amount
          if (offeringAmount > filterAmount) return false;
        }
      }

      // Filter by status
      if (
        filters.status &&
        filters.status !== 'all' &&
        offering.status !== filters.status
      ) {
        return false;
      }

      return true;
    });
  }, [offerings, filters]);

  return (
    <>
      <OfferingsFilter onFilterChange={setFilters} />

      {filteredOfferings && filteredOfferings.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredOfferings.map((offering) => (
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
                      <p className="text-xs text-muted-foreground">Valuation</p>
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
            No offerings match your current filters.
          </p>
        </div>
      )}
    </>
  );
}
