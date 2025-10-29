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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regulationFilter, setRegulationFilter] = useState<string>('all');
  const [geographyFilter, setGeographyFilter] = useState<string>('all');
  const [minInvestmentFilter, setMinInvestmentFilter] = useState<string>('all');

  // Extract unique values for filters
  const { statuses, regulations, geographies, minInvestments } = useMemo(() => {
    const statusSet = new Set<string>();
    const regulationSet = new Set<string>();
    const geographySet = new Set<string>();
    const minInvestmentSet = new Set<string>();

    offerings.forEach((offering) => {
      if (offering?.status) statusSet.add(offering.status);
      if (offering?.regulationType) regulationSet.add(offering.regulationType);
      if (offering?.geography) geographySet.add(offering.geography);
      if (offering?.minimumInvestment)
        minInvestmentSet.add(offering.minimumInvestment);
    });

    return {
      statuses: Array.from(statusSet).sort(),
      regulations: Array.from(regulationSet).sort(),
      geographies: Array.from(geographySet).sort(),
      minInvestments: Array.from(minInvestmentSet).sort(),
    };
  }, [offerings]);

  // Filter offerings based on selected filters
  const filteredOfferings = useMemo(() => {
    return offerings.filter((offering) => {
      const matchesStatus =
        statusFilter === 'all' || offering?.status === statusFilter;
      const matchesRegulation =
        regulationFilter === 'all' ||
        offering?.regulationType === regulationFilter;
      const matchesGeography =
        geographyFilter === 'all' || offering?.geography === geographyFilter;
      const matchesMinInvestment =
        minInvestmentFilter === 'all' ||
        offering?.minimumInvestment === minInvestmentFilter;

      return (
        matchesStatus &&
        matchesRegulation &&
        matchesGeography &&
        matchesMinInvestment
      );
    });
  }, [
    offerings,
    statusFilter,
    regulationFilter,
    geographyFilter,
    minInvestmentFilter,
  ]);

  const hasActiveFilters =
    statusFilter !== 'all' ||
    regulationFilter !== 'all' ||
    geographyFilter !== 'all' ||
    minInvestmentFilter !== 'all';

  const clearFilters = () => {
    setStatusFilter('all');
    setRegulationFilter('all');
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
          {/* Status Filter */}
          {statuses.length > 0 && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status
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

          {/* Regulation Filter */}
          {regulations.length > 0 && (
            <Select
              value={regulationFilter}
              onValueChange={setRegulationFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Regulation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Regulation</SelectItem>
                {regulations.map((regulation) => (
                  <SelectItem key={regulation} value={regulation}>
                    {regulation.toUpperCase()}
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

          {/* Minimum Investment Filter */}
          {minInvestments.length > 0 && (
            <Select
              value={minInvestmentFilter}
              onValueChange={setMinInvestmentFilter}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Minimum Investment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Minimum Investment</SelectItem>
                {minInvestments.map((minInvestment) => (
                  <SelectItem key={minInvestment} value={minInvestment}>
                    {minInvestment}
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
