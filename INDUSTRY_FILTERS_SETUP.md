# Industry Page Filters Setup

This document describes the interactive filtering system added to the industry pages for sorting offerings.

## Overview

The industry pages now include an interactive filter bar that allows users to filter investment offerings by:

1. **Offering Type** - Filter by regulation type (Reg D, Reg S, Reg A+, Reg CF)
2. **Geography** - Filter by geographic region (United States, Europe, Asia Pacific, Latin America, Middle East & Africa, Global)
3. **Min Investment** - Filter by minimum investment amount ranges
4. **Availability** - Filter by offering status (Open, Secondary, Coming Soon)

## Schema Changes

### New Field Added to Offering Schema

A new `geography` field was added to the `offering` document type:

```typescript
defineField({
  name: 'geography',
  title: 'Geography',
  type: 'string',
  group: 'investment',
  description: 'Geographic location or market for this offering',
  options: {
    list: [
      { title: 'United States', value: 'us' },
      { title: 'Europe', value: 'europe' },
      { title: 'Asia Pacific', value: 'apac' },
      { title: 'Latin America', value: 'latam' },
      { title: 'Middle East & Africa', value: 'mea' },
      { title: 'Global', value: 'global' },
    ],
    layout: 'dropdown',
  },
}),
```

## Component Architecture

### 1. OfferingsFilter Component

**Location**: `components/ui/offerings-filter.tsx`

A client-side component that renders the filter UI with four dropdowns:

- Uses shadcn/ui `Select` components for each filter
- Displays active filters as badges
- Includes a "Clear Filters" button when any filters are active
- Calls `onFilterChange` callback when filters are updated

### 2. FilterableOfferings Component

**Location**: `components/ui/filterable-offerings.tsx`

A client-side component that:

- Manages the filter state
- Applies filtering logic to the offerings array using `useMemo`
- Renders the filtered offerings grid
- Shows "No offerings match your current filters" when no results

**Filtering Logic**:

- **Regulation Type**: Exact match on `regulationType` field
- **Geography**: Exact match on `geography` field
- **Min Investment**: Parses investment amounts and compares numerically
  - "Up to $X" filters show offerings with minimumInvestment ≤ X
  - "Over $100,000" shows offerings > $100,000
- **Status**: Exact match on `status` field (excludes 'closed' from display)

### 3. Industry Page Integration

**Location**: `app/(main)/industries/[slug]/page.tsx`

The industry page remains a server component but uses the `FilterableOfferings` client component to handle the interactive filtering.

## Query Updates

Updated queries to include the necessary fields for filtering:

### offerings-by-industry.ts

```typescript
export const OFFERINGS_BY_INDUSTRY_QUERY = groq`*[_type == "offering" && defined(slug) && references($industryId)] | order(_createdAt desc){
  // ... other fields
  regulationType,
  minimumInvestment,
  geography,
  status,
}`;
```

### offering.ts

```typescript
export const OFFERINGS_QUERY = groq`*[_type == "offering" && defined(slug)] | order(_createdAt desc){
  // ... other fields
  regulationType,
  minimumInvestment,
  geography,
  status,
}`;
```

## Sample Data

A sample data file with geography fields populated is available at:
`sample-offerings-with-geography.ndjson`

To import the sample data:

```bash
npx sanity dataset import sample-offerings-with-geography.ndjson
```

This includes 6 sample offerings with varied values for each filter dimension:

- Different regulation types (Reg D, Reg S, Reg A+, Reg CF)
- Different geographies (US, Europe, APAC, LATAM, Global)
- Different minimum investments ($5,000 - $100,000)
- Different statuses (Open, Secondary, Coming Soon)

## Usage

1. Navigate to any industry page (e.g., `/industries/renewable-energy`)
2. Use the filter dropdowns to narrow down offerings
3. Active filters are displayed as badges below the filter controls
4. Click "Clear Filters" to reset all filters
5. The offerings grid updates automatically as filters change

## Technical Details

- **Client-Side Filtering**: Filtering happens on the client for instant results
- **Type Safety**: Uses generated Sanity types for type safety
- **Responsive Design**: Filter controls stack on mobile, display inline on desktop
- **Performance**: Uses `useMemo` to optimize filtering operations
- **Accessibility**: Uses semantic HTML and ARIA-compliant shadcn/ui components

## Future Enhancements

Potential improvements:

1. Add URL query parameters to persist filter state
2. Add "Results count" indicator
3. Add sort options (alphabetical, valuation, etc.)
4. Add multi-select filters for industries
5. Add search/text filter for company names
6. Save filter preferences in localStorage
