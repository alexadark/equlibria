# Featured Industries Component Setup

## Overview

The Featured Industries component displays a curated grid of industry sectors with links to their respective pages and a call-to-action button at the bottom.

## Component Features

- Grid layout of industry cards (responsive: 1 column on mobile, 2 on tablet, 3 on desktop)
- Each card displays:
  - Featured image with hover scale effect
  - Industry title
  - Brief description (limited to 3 lines)
- "View all industries" button below the grid
- Configurable section with:
  - Optional tagline
  - Title (required)
  - Description
  - Section width (default or narrow)
  - Content alignment (left or center)
  - Padding options
  - Background color variants

## Files Created

### Schema

- `/sanity/schemas/blocks/featured-industries.ts` - Sanity schema definition

### Component

- `/components/blocks/featured-industries.tsx` - React component

### Query

- `/sanity/queries/featured-industries.ts` - GROQ query fragment

### Sample Data

- `/sample-featured-industries.ndjson` - Example page with featured industries

## Usage

### 1. In Sanity Studio

1. Navigate to any page document
2. Add a new block
3. Select "Featured Industries" from the insert menu
4. Configure the block:
   - Add a title (required)
   - Optionally add a tagline and description
   - Select industries to feature (minimum 1, maximum 12 recommended)
   - Set the CTA button URL (defaults to `/industries`)
   - Customize the button text (defaults to "View all industries")
   - Choose background color variant
   - Select section width and alignment

### 2. Import Sample Data

To import the example page:

```bash
cd /Users/webstantly/DEV/projects/equlibria
npx sanity dataset import sample-featured-industries.ndjson
```

This creates a sample page at `/featured-industries-example` demonstrating the component.

### 3. Preview

After importing, you can:

- View the page in Studio's preview mode
- Visit the page at `http://localhost:3000/featured-industries-example`
- Edit the content and see live updates

## Component Structure

The component follows the same pattern as other featured content blocks:

```
SectionContainer (handles background color and padding)
  └─ Container (responsive width)
      ├─ Header Section (tagline, title, description)
      ├─ Industries Grid (3 columns on desktop)
      │   └─ Industry Cards (link to individual industry pages)
      │       ├─ Featured Image
      │       └─ Content (title, description)
      └─ CTA Button (links to all industries page)
```

## Customization Options

### Section Layout

- **Padding**: xs, sm, default, lg, xl, 2xl, none
- **Color Variant**: default, secondary, accent, primary
- **Section Width**: default (full container), narrow (48rem max-width)
- **Stack Align**: left, center

### CTA Configuration

- **CTA URL**: Link destination (defaults to `/industries`)
- **CTA Text**: Button label (defaults to "View all industries")

### Industry Selection

- Select 1-12 industries to feature
- Industries are referenced from the industry document type
- Each industry must have:
  - Title
  - Slug
  - Featured image
  - Description

## Best Practices

1. **Number of Industries**: Display 3, 6, or 9 industries for best grid appearance
2. **Images**: Use high-quality images with consistent aspect ratios
3. **Descriptions**: Keep descriptions concise (3 lines max are displayed)
4. **Order**: Order industries by importance or relevance to your audience
5. **CTA Placement**: The button appears centered or left-aligned based on stackAlign setting

## Integration

The component is automatically registered in:

- `sanity/schema.ts` - Schema registration
- `components/blocks/index.tsx` - Component mapping
- `sanity/queries/page.ts` - Query composition
- `sanity/schemas/blocks/shared/block-configs.ts` - Block menu configuration

No additional setup is required to use this component in your pages.
