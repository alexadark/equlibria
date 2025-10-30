'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OFFERINGS_BY_INDUSTRY_QUERYResult } from '@/sanity.types';

interface FilterableOfferingsProps {
  offerings: OFFERINGS_BY_INDUSTRY_QUERYResult;
  industryTitle: string;
}

export function FilterableOfferings({
  offerings,
  industryTitle,
}: FilterableOfferingsProps) {
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [offeringTypeFilter, setOfferingTypeFilter] = useState<string>('all');
  const [geographyFilter, setGeographyFilter] = useState<string>('all');
  const [minInvestmentFilter, setMinInvestmentFilter] = useState<string>('all');

  // Extract unique values for filters
  const { availabilities, offeringTypes, geographies, minInvestments } =
    useMemo(() => {
      const availabilitySet = new Set<string>();
      const offeringTypeSet = new Set<string>();
      const geographySet = new Set<string>();
      const minInvestmentSet = new Set<string>();

      offerings.forEach((offering) => {
        if (offering?.status) availabilitySet.add(offering.status);
        if (offering?.regulationType)
          offeringTypeSet.add(offering.regulationType);
        if (offering?.geography) geographySet.add(offering.geography);
        if (offering?.minimumInvestment)
          minInvestmentSet.add(offering.minimumInvestment);
      });

      return {
        availabilities: Array.from(availabilitySet).sort(),
        offeringTypes: Array.from(offeringTypeSet).sort(),
        geographies: Array.from(geographySet).sort(),
        minInvestments: Array.from(minInvestmentSet).sort(),
      };
    }, [offerings]);

  // Filter offerings based on selected filters
  const filteredOfferings = useMemo(() => {
    return offerings.filter((offering) => {
      const matchesAvailability =
        availabilityFilter === 'all' || offering?.status === availabilityFilter;
      const matchesOfferingType =
        offeringTypeFilter === 'all' ||
        offering?.regulationType === offeringTypeFilter;
      const matchesGeography =
        geographyFilter === 'all' || offering?.geography === geographyFilter;
      const matchesMinInvestment =
        minInvestmentFilter === 'all' ||
        offering?.minimumInvestment === minInvestmentFilter;

      return (
        matchesAvailability &&
        matchesOfferingType &&
        matchesGeography &&
        matchesMinInvestment
      );
    });
  }, [
    offerings,
    availabilityFilter,
    offeringTypeFilter,
    geographyFilter,
    minInvestmentFilter,
  ]);

  const hasActiveFilters =
    availabilityFilter !== 'all' ||
    offeringTypeFilter !== 'all' ||
    geographyFilter !== 'all' ||
    minInvestmentFilter !== 'all';

  const clearFilters = () => {
    setAvailabilityFilter('all');
    setOfferingTypeFilter('all');
    setGeographyFilter('all');
    setMinInvestmentFilter('all');
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOfferings.length} of {offerings.length} offerings
            in {industryTitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Offering Type Filter */}
          {offeringTypes.length > 0 && (
            <Select
              value={offeringTypeFilter}
              onValueChange={setOfferingTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Offering Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Offering Type</SelectItem>
                {offeringTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Geography Filter */}
          {geographies.length > 0 && (
            <Select value={geographyFilter} onValueChange={setGeographyFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Geography</SelectItem>
                {geographies.map((geography) => (
                  <SelectItem key={geography} value={geography}>
                    {geography}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Min Investment Filter */}
          {minInvestments.length > 0 && (
            <Select
              value={minInvestmentFilter}
              onValueChange={setMinInvestmentFilter}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Min Investment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Min Investment</SelectItem>
                {minInvestments.map((minInvestment) => (
                  <SelectItem key={minInvestment} value={minInvestment}>
                    {minInvestment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Availability Filter */}
          {availabilities.length > 0 && (
            <Select
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Availability</SelectItem>
                {availabilities.map((availability) => (
                  <SelectItem key={availability} value={availability}>
                    {availability
                      .split('-')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Offerings Grid */}
      {filteredOfferings.length > 0 ? (
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

                {/* Status Badge */}
                {offering?.status && (
                  <div className="mb-4">
                    <Badge
                      variant={
                        offering.status === 'open'
                          ? 'default'
                          : offering.status === 'closing-soon'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {offering.status
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </Badge>
                  </div>
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
                <div className="space-y-3 border-t pt-4">
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
                  {offering?.minimumInvestment && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Minimum Investment
                      </p>
                      <p className="font-semibold">
                        {offering.minimumInvestment}
                      </p>
                    </div>
                  )}
                  {offering?.geography && (
                    <div>
                      <p className="text-xs text-muted-foreground">Geography</p>
                      <p className="text-sm">{offering.geography}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="mb-4 text-muted-foreground">
            No offerings match your current filters.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
