'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterOptions {
  regulationType: string;
  geography: string;
  minInvestment: string;
  status: string;
}

interface OfferingsFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const REGULATION_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Reg D', value: 'reg-d' },
  { label: 'Reg S', value: 'reg-s' },
  { label: 'Reg A+', value: 'reg-a-plus' },
  { label: 'Reg CF', value: 'reg-cf' },
];

const GEOGRAPHIES = [
  { label: 'All Regions', value: 'all' },
  { label: 'United States', value: 'us' },
  { label: 'Europe', value: 'europe' },
  { label: 'Asia Pacific', value: 'apac' },
  { label: 'Latin America', value: 'latam' },
  { label: 'Middle East & Africa', value: 'mea' },
  { label: 'Global', value: 'global' },
];

const MIN_INVESTMENTS = [
  { label: 'Any Amount', value: 'all' },
  { label: 'Up to $10,000', value: '10000' },
  { label: 'Up to $25,000', value: '25000' },
  { label: 'Up to $50,000', value: '50000' },
  { label: 'Up to $100,000', value: '100000' },
  { label: 'Over $100,000', value: '100000+' },
];

const STATUSES = [
  { label: 'All Status', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Coming Soon', value: 'coming-soon' },
];

export function OfferingsFilter({ onFilterChange }: OfferingsFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    regulationType: 'all',
    geography: 'all',
    minInvestment: 'all',
    status: 'all',
  });

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      regulationType: 'all',
      geography: 'all',
      minInvestment: 'all',
      status: 'all',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== 'all'
  );

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Offering Type Filter */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <label className="mb-2 block text-sm font-medium">
            Offering Type
          </label>
          <Select
            value={filters.regulationType}
            onValueChange={(value) => updateFilter('regulationType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {REGULATION_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Geography Filter */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <label className="mb-2 block text-sm font-medium">Geography</label>
          <Select
            value={filters.geography}
            onValueChange={(value) => updateFilter('geography', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {GEOGRAPHIES.map((geo) => (
                <SelectItem key={geo.value} value={geo.value}>
                  {geo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Investment Filter */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <label className="mb-2 block text-sm font-medium">
            Min Investment
          </label>
          <Select
            value={filters.minInvestment}
            onValueChange={(value) => updateFilter('minInvestment', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              {MIN_INVESTMENTS.map((inv) => (
                <SelectItem key={inv.value} value={inv.value}>
                  {inv.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Availability Filter */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <label className="mb-2 block text-sm font-medium">Availability</label>
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="mt-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.regulationType && (
            <Badge variant="secondary">
              {
                REGULATION_TYPES.find((t) => t.value === filters.regulationType)
                  ?.label
              }
            </Badge>
          )}
          {filters.geography && (
            <Badge variant="secondary">
              {GEOGRAPHIES.find((g) => g.value === filters.geography)?.label}
            </Badge>
          )}
          {filters.minInvestment && (
            <Badge variant="secondary">
              {
                MIN_INVESTMENTS.find((i) => i.value === filters.minInvestment)
                  ?.label
              }
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary">
              {STATUSES.find((s) => s.value === filters.status)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
