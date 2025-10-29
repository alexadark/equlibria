# Featured Offerings Component

## Overview

The FeaturedOfferings component is a carousel that showcases active or trending investment offerings. It displays key investment information in an attractive, scrollable format.

## Features

- **Carousel Layout**: Smooth horizontal scrolling with navigation arrows
- **Offering Cards**: Each card displays:
  - Company logo (positioned over background image)
  - Background image with hover effects
  - Status badge (Open, Secondary, Closed, Coming Soon)
  - Company name and tagline
  - Annual ROI range
  - Minimum investment required
  - Valuation
  - Link to offering details page
- **Responsive Design**: Optimized for all screen sizes
- **Customizable**: Section padding, colors, alignment options

## Files Created/Modified

### New Files

1. **Schema**: `sanity/schemas/blocks/featured-offerings.ts`
   - Block schema definition with all configuration options

2. **Query**: `sanity/queries/featured-offerings.ts`
   - GROQ query to fetch offerings with all necessary data

3. **Component**: `components/blocks/featured-offerings.tsx`
   - React component that renders the carousel

4. **Sample Data**: `sample-featured-offerings.ndjson`
   - Sample offerings and page with featured offerings block

5. **Documentation**: `FEATURED_OFFERINGS_SETUP.md` (this file)

### Modified Files

1. **Offering Schema**: `sanity/schemas/documents/offering.ts`
   - Added `minimumInvestment` field
   - Added `status` field (open, secondary, closed, coming-soon)

2. **Schema Registry**: `sanity/schema.ts`
   - Registered featured-offerings block

3. **Block Configuration**: `sanity/schemas/blocks/shared/block-configs.ts`
   - Added featured-offerings to ALL_BLOCKS
   - Added to BLOCK_MENU_GROUPS

4. **Page Query**: `sanity/queries/page.ts`
   - Included featured-offerings query

5. **Blocks Index**: `components/blocks/index.tsx`
   - Registered FeaturedOfferings component in componentMap

6. **Offering Query**: `sanity/queries/offering.ts`
   - Added new fields (minimumInvestment, status)

## Usage

### In Sanity Studio

1. Navigate to any Page document
2. Add a new block
3. Select "Featured Offerings" from the block menu
4. Configure:
   - Section padding and color variant
   - Tag line, title, and description
   - CTA link and text
   - Select offerings to feature (via references)

### Importing Sample Data

```bash
npx sanity dataset import sample-featured-offerings.ndjson
```

This will create:

- 4 sample offerings with investment details
- 1 demo page showcasing the featured offerings block

## Preview Image

**TODO**: Create a preview image at `public/sanity/preview/featured-offerings.jpg`

The preview image should be a screenshot showing:

- Multiple offering cards in a carousel layout
- Visible logos, background images, and status badges
- Investment details (ROI, minimum investment)

Recommended dimensions: 800x500px

## Offering Status Options

- **Open**: Offering is currently accepting new investments (green badge)
- **Secondary**: Available on secondary market (blue badge)
- **Closed**: No longer accepting investments (gray badge)
- **Coming Soon**: Not yet available (purple badge)

## Component Props

```typescript
interface FeaturedOfferingsProps {
  padding?: SectionPadding;
  colorVariant?: string;
  sectionWidth?: 'default' | 'narrow';
  stackAlign?: 'left' | 'center';
  tagLine?: string;
  title: string;
  description?: string;
  ctaUrl?: string;
  ctaText?: string;
  offerings: Array<Offering>;
}
```

## Styling

The component uses:

- TailwindCSS for styling
- Badge component for status indicators
- Carousel component for horizontal scrolling
- Custom status colors (defined in component)
- Responsive breakpoints for mobile/tablet/desktop

## Investment Data Fields

Each offering card displays:

1. **Background Image**: Hero image for the offering
2. **Company Logo**: Positioned in bottom-left corner
3. **Status Badge**: Top-right corner (color-coded)
4. **Company Name**: Bold heading
5. **Tagline**: Subtitle text
6. **Annual ROI**: Projected returns (e.g., "12-18% annually")
7. **Minimum Investment**: Required minimum (e.g., "$25,000")
8. **Valuation**: Company valuation (e.g., "$50M")

## Next Steps

1. Add preview image: `public/sanity/preview/featured-offerings.jpg`
2. Import sample data to test the component
3. Create real offerings in Sanity Studio
4. Add the featured-offerings block to your pages
5. Regenerate types if needed: `npx sanity typegen generate`

## Notes

- All images use proper optimization with blur placeholders
- Links automatically route to `/offerings/[slug]`
- Status colors have dark mode support
- Carousel supports drag-free scrolling on mobile
