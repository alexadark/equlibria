# Project Investment Features - ESOP-in-a-Box

## Overview

The **Project** content type has been enhanced to support investment opportunities like ESOP-in-a-Box. This implementation provides a comprehensive investment presentation with purchase details, process steps, and supporting content.

## What's Been Implemented

### 1. Enhanced Project Schema

**New Fields Added to `/sanity/schemas/documents/project.ts`:**

- **`subtitle`** - Additional context below the title
- **`aboutTitle`** - Title for the about section
- **`aboutText`** - Description text for the about section (4 rows)
- **`steps`** - Array of process steps with:
  - `title` - Step name
  - `content` - Rich block content
- **`buyNowUrl`** - External investment/purchase URL
- **`expiresDate`** - Expiration date (e.g., "December 2025")
- **`regulationType`** - Regulation type (e.g., "Reg D 506(c)", "Reg A+")
- **`budget`** - Budget/raise amount (e.g., "$25M Series A")

### 2. Page Structure

**Project Detail Page** (`/app/(main)/projects/[slug]/page.tsx`)

The page features a sophisticated two-column layout:

#### Left Column (66% width) - Main Content:

- About section with title and text
- Process steps displayed in timeline style
- Additional content blocks (gallery, features, etc.)

#### Right Column (33% width) - Sticky Sidebar:

- **Investment Card** featuring:
  - "Invest in This Project" heading
  - Descriptive text
  - Call-to-action button linking to investment URL
  - Project Details section with icons:
    - ⏰ Expires date
    - ✨ Regulation type
    - 💵 Budget/raise amount

### 3. Components Created/Updated

#### A. **ProjectHero** (`/components/blocks/project-hero.tsx`)

- Updated to display subtitle between title and excerpt
- Full-width hero image with dark overlay
- Category badges

#### B. **ProjectSteps** (`/components/blocks/project-steps.tsx`)

- Timeline-style animated presentation
- Animated circles and connection lines
- Step numbers on the right
- Smooth scroll-triggered animations using Framer Motion
- Rich text content support

#### C. **Projects Listing Page** (`/app/(main)/projects/page.tsx`)

- Grid display of all projects
- Links to individual project pages
- Hero section with page title and description

### 4. Sample Data

**ESOP-in-a-Box Project** (`sample-esop-project.ndjson`)

Complete sample project featuring:

- Title: "ESOP-in-a-Box™"
- Subtitle: "The Complete Employee Ownership Transition Platform"
- 5 comprehensive process phases
- Investment details (Reg D 506(c), $25M Series A, December 2025 expiry)
- 9-image gallery at bottom showing platform views and success stories
- Investment URL for inquiries

## The ESOP-in-a-Box Solution

### Core Value Proposition

Turnkey, largely automated pathway for Baby-Boomer business owners to exit through Employee Stock Ownership Plans (ESOPs), integrated with Equilibria's tokenization infrastructure.

### Five-Phase Process

**Phase 1: Feasibility & Readiness**

- AI-powered due diligence
- Repurchase liability projections
- Preliminary valuation ranges
- Readiness assessment report

**Phase 2: Strategic Structuring**

- C-corp vs S-corp election analysis
- Section 1042 tax deferral eligibility
- Leveraged ESOP transaction modeling
- Customized structuring recommendations

**Phase 3: Capital & Funding**

- SBA 7(a) and 504 loan programs
- Senior debt and mezzanine financing
- Seller note structuring
- Automated lender matching

**Phase 4: Transaction Close**

- Share transfer to ESOP trust
- Smart-contract token mirroring of cap table
- Blockchain-based audit trail
- Real-time compliance verification

**Phase 5: Ongoing Operations**

- Automated participant allocations
- Annual valuation coordination
- 409(p) testing for S-corporations
- Distribution processing
- DOL/IRS compliance monitoring

## Equilibria Integration

ESOP-in-a-Box leverages Equilibria's infrastructure for:

- **Tokenization** - Smart contracts represent ESOP shares
- **Transparency** - Immutable blockchain audit trails
- **Automation** - Cap table accuracy and vesting calculations
- **Compliance** - Regulatory requirements enforced through code
- **Liquidity** - Enhanced options for employee-owners

## Viewing the Project

### In Sanity Studio:

1. Navigate to Content → Projects
2. Find "ESOP-in-a-Box™"
3. Edit all fields including steps, investment details, and blocks

### On Frontend:

1. Visit `/projects` to see all projects
2. Click on "ESOP-in-a-Box™"
3. View at `/projects/esop-in-a-box`
4. See the complete layout with sidebar

### Key Features:

- ✅ Sticky sidebar that follows scroll
- ✅ Timeline-style animated steps
- ✅ Image gallery with lightbox at bottom
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ All fields optional (graceful degradation)
- ✅ SEO-optimized with meta fields
- ✅ Category support and filtering

## File Structure

```
sanity/
  schemas/
    documents/
      project.ts              # Enhanced schema with investment fields
  queries/
    project.ts                # Updated query with new fields
    projects-page.ts          # Projects listing page query

app/(main)/
  projects/
    [slug]/
      page.tsx                # Project detail page with sidebar
    page.tsx                  # Projects listing page

components/
  blocks/
    project-hero.tsx          # Hero with subtitle support
    project-steps.tsx         # Timeline-style steps component
  ui/
    project-card.tsx          # Card for project listings

sample-esop-project.ndjson    # Complete ESOP sample data
```

## Customization Guide

### Adding a New Investment Project:

1. **In Sanity Studio:**
   - Go to Content → Projects → Create New
   - Fill in required fields: Title, Slug, Featured Image
   - Add Subtitle for additional context
   - Write About Title and About Text
   - Add Process Steps (recommended 3-5 steps)
   - Set Investment URL, Expires Date, Regulation Type, Budget
   - Add Gallery block for images
   - Publish

2. **Investment Details:**
   - **Buy Now URL:** Link to your investment portal or contact form
   - **Expires Date:** When the offering closes
   - **Regulation Type:** SEC regulation (e.g., Reg A+, Reg D 506(c), Reg CF)
   - **Budget:** Total raise or project budget

3. **Content Blocks:**
   - Add Gallery for project images
   - Add Features Cards for key benefits
   - Add CTA blocks for additional actions
   - Add Split Rows for detailed information

## Best Practices

### For Investment Projects:

1. **Clear Value Proposition** - Use subtitle and about section effectively
2. **Transparent Process** - Document all phases in steps
3. **Visual Evidence** - Include gallery with platform/success images
4. **Regulatory Compliance** - Always specify regulation type
5. **Call to Action** - Make investment URL prominent and clear

### Content Guidelines:

- Keep steps between 3-7 for optimal readability
- Use high-quality images (minimum 1200px wide)
- Write concise, benefit-focused descriptions
- Include specific dates and amounts
- Link to detailed offering documents

## Next Steps

1. **Customize Sample** - Update ESOP project with real details
2. **Add More Projects** - Create additional investment opportunities
3. **Set Up Forms** - Configure investment inquiry forms
4. **Add Analytics** - Track interest and conversions
5. **Compliance Review** - Ensure all disclosures are present
6. **Test User Flow** - Verify entire investment journey

## Technical Notes

- Uses Framer Motion for smooth animations
- Sticky positioning for sidebar (CSS `position: sticky`)
- Responsive grid layout with Tailwind CSS
- Type-safe with generated TypeScript types from Sanity
- All components use Next.js 15 Server Components where possible
- Client components only where needed (animations, interactivity)

---

**Status:** ✅ Complete and Production-Ready
**Sample Data:** Imported to production dataset
**Pages:** `/projects` and `/projects/esop-in-a-box` live
