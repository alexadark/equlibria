# Quick Start: Industry Page Filters

## What's New

Interactive filters have been added to industry pages allowing users to filter offerings by:

- **Offering Type** (Reg D, Reg S, Reg A+, Reg CF)
- **Geography** (US, Europe, APAC, LATAM, MEA, Global)
- **Min Investment** (Various ranges up to $100k+)
- **Availability** (Open, Secondary, Coming Soon)

## Files Changed

### Schema

- `sanity/schemas/documents/offering.ts` - Added `geography` field

### Components

- `components/ui/offerings-filter.tsx` - Filter controls component (NEW)
- `components/ui/filterable-offerings.tsx` - Filterable offerings grid (NEW)
- `components/ui/select.tsx` - Dropdown select component (NEW, from shadcn)

### Queries

- `sanity/queries/offering.ts` - Added geography, minimumInvestment, status fields
- `sanity/queries/offerings-by-industry.ts` - Added geography, minimumInvestment, status fields

### Pages

- `app/(main)/industries/[slug]/page.tsx` - Integrated filterable offerings

## Getting Started

### 1. Import Sample Data

```bash
cd /Users/webstantly/DEV/projects/equlibria
npx sanity dataset import sample-offerings-with-geography.ndjson
```

This imports 6 sample offerings with varied filter values.

### 2. Regenerate Types

```bash
npx sanity@latest typegen generate --force
```

### 3. Test the Filters

1. Start the dev server: `npm run dev`
2. Visit any industry page (e.g., `/industries/renewable-energy`)
3. Use the filter dropdowns to filter offerings
4. Click "Clear Filters" to reset

## How It Works

### Client-Side Filtering

The filtering happens on the client for instant results:

1. All offerings for an industry are fetched server-side
2. The `FilterableOfferings` component manages filter state
3. `useMemo` optimizes filtering performance
4. UI updates automatically as filters change

### Filter Logic

- **Regulation Type**: Exact match on `regulationType`
- **Geography**: Exact match on `geography`
- **Min Investment**: Numerical comparison on parsed `minimumInvestment`
- **Status**: Exact match on `status` (excludes 'closed' offerings)

## Customization

### Adding More Geography Options

Edit `sanity/schemas/documents/offering.ts`:

```typescript
options: {
  list: [
    // Add new options here
    { title: 'Australia', value: 'australia' },
  ],
}
```

### Changing Filter Ranges

Edit `components/ui/offerings-filter.tsx`:

```typescript
const MIN_INVESTMENTS = [
  // Customize ranges here
  { label: 'Up to $5,000', value: '5000' },
];
```

### Styling

All components use Tailwind CSS and shadcn/ui for consistent styling.

## Troubleshooting

### TypeScript Errors

If you see type errors about `Array<never>`, it means there's no data in the dataset yet. Import the sample data and regenerate types.

### Filters Not Working

1. Ensure offerings have the filter fields populated in Sanity
2. Check browser console for errors
3. Verify the offering data includes `geography`, `minimumInvestment`, `regulationType`, and `status`

### No Offerings Showing

1. Verify offerings are linked to the industry
2. Check offering status is not 'closed'
3. Ensure offerings have a slug defined

## Next Steps

1. **Add More Industries**: Create industry documents in Sanity
2. **Add More Offerings**: Create offering documents with all filter fields
3. **Customize Filters**: Modify filter options to match your needs
4. **Add URL Params**: Persist filter state in URL for shareable links
5. **Add Sorting**: Add sort options (alphabetical, investment amount, etc.)

## Documentation

See `INDUSTRY_FILTERS_SETUP.md` for detailed technical documentation.
