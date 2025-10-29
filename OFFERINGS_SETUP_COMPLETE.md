# Offering Content Type - Setup Complete ✓

## What Was Created

### 1. Schema Files

- **`sanity/schemas/documents/industry.ts`** - Industry taxonomy for categorizing offerings
- **`sanity/schemas/documents/offering.ts`** - Main offering content type with 8 organized tabs/groups

### 2. Query Files

- **`sanity/queries/industry.ts`** - GROQ queries for industries
- **`sanity/queries/offering.ts`** - GROQ queries for offerings

### 3. Frontend Routes

- **`/offerings`** - Listing page showing all offerings
- **`/offerings/[slug]`** - Individual offering detail pages
- **`/industries`** - Listing page showing all industries
- **`/industries/[slug]`** - Individual industry pages

### 4. Updated Configuration

- Registered in `sanity/schema.ts`
- Added to Sanity Studio navigation in `sanity/structure.ts`
- Fetch functions added to `sanity/lib/fetch.ts`
- TypeScript types generated in `sanity.types.ts`
- Updated `block-content.ts` to allow linking to offerings

## Sample Data Imported

### Industries (5 total)

1. **Real Assets & Infrastructure** - Tangible investments in physical assets
2. **Sustainable Housing & Development** - Environmentally responsible development
3. **Renewable Energy** - Solar, wind, hydro, and clean energy projects
4. **Transportation & Logistics** - Infrastructure and mobility solutions
5. **Technology & Innovation** - Blockchain, AI, clean tech, digital infrastructure

### Offerings (5 total)

#### 1. Greenfield Sustainable Housing

- **Company:** Greenfield Communities Inc.
- **Industries:** Sustainable Housing, Real Assets
- **Valuation:** $85 Million
- **Regulation:** Reg A+
- **Returns:** 12-15% annually
- **Description:** 250-unit net-zero carbon residential community
- **Leadership:** 3 executives (CEO, CFO, Chief Sustainability Officer)

#### 2. AquaTerra Floating Communities

- **Company:** AquaTerra Living
- **Industries:** Sustainable Housing, Technology
- **Valuation:** $15 Million
- **Regulation:** Reg CF
- **Returns:** 8-12% annually
- **Description:** Innovative floating architecture for climate-resilient coastal living
- **Leadership:** 2 executives (Founder/CEO, Chief Marine Biologist)

#### 3. Urban Modular Residential

- **Company:** Urban Modular Residential
- **Industries:** Sustainable Housing, Real Assets
- **Valuation:** $32 Million
- **Regulation:** Reg D
- **Returns:** 15-18% annually
- **Description:** High-efficiency modular housing (280+ completed units)
- **Leadership:** 2 executives (CEO, COO)

#### 4. Affordable Housing Solutions

- **Company:** Affordable Housing Solutions
- **Industries:** Sustainable Housing, Real Assets
- **Valuation:** $18 Million
- **Regulation:** Reg A+
- **Returns:** 6-9% annually plus social impact
- **Description:** Mission-driven affordable housing (150 families housed)
- **Leadership:** 2 executives (Executive Director, Director of Development)

#### 5. Community Solar Partners

- **Company:** Community Solar Partners
- **Industries:** Renewable Energy, Real Assets
- **Valuation:** $125 Million
- **Regulation:** Reg D
- **Returns:** 7-10% annually
- **Description:** Diversified portfolio of 25+ solar installations (145 MW)
- **Leadership:** 2 executives (CEO, CFO)

## Offering Schema Structure

The offering content type includes these organized tabs:

### 📋 Core Information (Default Tab)

- Company Name (required)
- Logo (required image)
- Tagline
- Background Image
- Industries (required reference array)

### 📖 Overview Tab

- Description (rich text with images, videos, code blocks)
- Leadership Bios (repeater with name, role, biography, photo)
- Mission Statement

### 💰 Investment Details Tab

- Valuation
- Regulation Type (Reg D, Reg S, Reg A+, Reg CF)
- Projected Returns
- Investor Documents (private file uploads with descriptions)

### 🪙 Tokenization Tab

- Token Structure (rich text explaining tokenomics)
- Blockchain Standard (e.g., "ERC-1400")
- Custodian Info

### 📊 Secondary Market Tab

- Market Data (text field for static information)
- _Note: Live data (price, charts, order book) would be pulled via API_

### 📄 Documents Tab

- Public Documents (file uploads with titles and descriptions)

### 🔍 SEO Tab

- Meta Title
- Meta Description
- No Index
- Open Graph Image

### ⚙️ Settings Tab

- Slug (auto-generated from company name)

## Frontend Features

### Offering Detail Page (`/offerings/[slug]`)

- Hero banner with background image, logo, company name, tagline
- Industry badges
- Overview section with rich text content
- Mission statement in styled card
- Leadership team grid with photos and bios
- Investment metrics in grid cards (valuation, regulation type, returns)
- Downloadable investor documents
- Tokenization details with blockchain standard
- Custodian information
- Secondary market data
- Public document downloads
- Fully responsive design

### Offerings Listing Page (`/offerings`)

- Grid layout of all offerings
- Cards showing: background image, logo, company name, tagline, industries, valuation, regulation type
- Hover effects and transitions
- Links to detail pages

## How to Use

1. **View in Sanity Studio:**

   ```bash
   npm run dev
   ```

   Navigate to http://localhost:3000/studio

2. **Access in Studio:**
   - **Industries** - Create/edit industry categories
   - **Offerings** - Create/edit investment offerings

3. **View on Frontend:**
   - All offerings: http://localhost:3000/offerings
   - Single offering: http://localhost:3000/offerings/[slug]
   - All industries: http://localhost:3000/industries
   - Single industry: http://localhost:3000/industries/[slug]

## Key Features

✅ Organized tab structure for easy data entry
✅ Rich text editing with images, videos, code blocks
✅ File upload support for investor and public documents
✅ Industry taxonomy for filtering
✅ Leadership bio repeater fields
✅ SEO optimization fields
✅ Fully typed with TypeScript
✅ Responsive frontend design
✅ Document download functionality
✅ Image optimization with Next.js Image
✅ Portable Text rendering for rich content

## Data Files

The sample data is stored in:

- `sample-industries.ndjson` - 5 industries
- `sample-offerings.ndjson` - 5 offerings with complete data

Both files have been imported to the `production` dataset.

## Next Steps

1. Customize the offering detail page design if needed
2. Add filtering/search to the offerings listing page
3. Create a dedicated "Industries" page showing offerings by industry
4. Add API integration for live secondary market data
5. Implement user authentication for accessing private investor documents
6. Create offering comparison functionality
7. Add investment calculator or ROI projections
8. Build investor dashboard showing portfolio of tokenized offerings

---

**All systems operational!** ✨ The Offering content type is fully configured and ready to use.
