'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { stegaClean } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { INDUSTRIES_QUERYResult } from '@/sanity.types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type IndustriesGridProps = {
  industries: INDUSTRIES_QUERYResult;
};

export default function IndustriesGrid({ industries }: IndustriesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) return industries;

    const query = searchQuery.toLowerCase();
    return industries?.filter(
      (industry) =>
        industry?.title?.toLowerCase().includes(query) ||
        industry?.description?.toLowerCase().includes(query)
    );
  }, [industries, searchQuery]);

  return (
    <section className="py-16 xl:py-20">
      <div className="container">
        {/* Header Banner */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl xl:text-6xl">
            Industries
          </h1>

          {/* Search Bar */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by industry or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Industry Grid */}
        {filteredIndustries && filteredIndustries.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {filteredIndustries.map((industry) => (
              <Link
                key={industry?.slug?.current}
                href={`/industries/${industry?.slug?.current}`}
                className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:shadow-primary/5"
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
                  <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                    {industry?.title}
                  </h2>
                  {industry?.description && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
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
              {searchQuery
                ? 'No industries found matching your search.'
                : 'No industries available yet.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
