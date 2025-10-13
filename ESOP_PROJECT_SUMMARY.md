# ESOP-in-a-Box Investment Project - Quick Reference

## ✅ What's Complete

The **Project** content type now supports full investment opportunities with:

### Features Implemented:

- ✨ Subtitle field for additional hero context
- 📝 About section (title + text)
- 📋 Timeline-style process steps with animations
- 💰 Investment sidebar with:
  - Buy Now / Investment button
  - Expires date
  - Regulation type
  - Budget/raise amount
- 🖼️ Gallery support at bottom
- 📱 Fully responsive layout
- 🎨 Sticky sidebar on desktop

### Pages Created:

- `/projects` - Listing of all projects
- `/projects/[slug]` - Individual project detail page with sidebar

### Sample Content:

- **ESOP-in-a-Box™** project imported and live
- Includes 5 process phases
- 9 gallery images
- Complete investment details

## 🚀 Quick Start

### View the Project:

```
URL: /projects/esop-in-a-box
```

### Edit in Sanity:

1. Open Sanity Studio
2. Go to Content → Projects
3. Find "ESOP-in-a-Box™"

### Create New Investment Project:

1. Click "Create New" in Projects
2. Fill in:
   - Title & Subtitle
   - Featured Image
   - About Title & Text
   - Steps (3-7 recommended)
   - Investment URL
   - Expires Date, Regulation Type, Budget
3. Add Gallery block for images
4. Publish

## 📊 ESOP-in-a-Box Overview

**What:** Turnkey ESOP transition platform for Baby Boomer business exits
**Connection:** Integrates with Equilibria tokenization infrastructure
**Investment:** Reg D 506(c), $25M Series A, Expires December 2025

### 5 Phases:

1. Feasibility & Readiness (due diligence, valuations)
2. Strategic Structuring (tax, corp structure)
3. Capital & Funding (SBA, debt, mezzanine)
4. Transaction Close (smart contracts, blockchain)
5. Ongoing Operations (compliance, distributions)

## 📁 Key Files

```
Schema:       sanity/schemas/documents/project.ts
Query:        sanity/queries/project.ts
Hero:         components/blocks/project-hero.tsx
Steps:        components/blocks/project-steps.tsx
Detail Page:  app/(main)/projects/[slug]/page.tsx
List Page:    app/(main)/projects/page.tsx
Sample:       sample-esop-project.ndjson
```

## 🎯 Investment Sidebar Fields

| Field               | Example                          | Description                   |
| ------------------- | -------------------------------- | ----------------------------- |
| **Investment URL**  | `https://equilibria.com/contact` | Link for investment inquiries |
| **Expires Date**    | `December 2025`                  | When offering closes          |
| **Regulation Type** | `Reg D 506(c)`                   | SEC regulation                |
| **Budget**          | `$25M Series A`                  | Raise amount                  |

## 🔄 Why Projects Instead of Offerings?

User decided to consolidate under "Projects" to avoid confusion. Projects now serve as the universal content type for all investment opportunities, case studies, and showcase items.

## 📖 Full Documentation

See `PROJECT_INVESTMENT_FEATURES.md` for complete details.

---

**Status:** ✅ Production Ready
**Last Updated:** Today
**Sample Imported:** Yes (ESOP-in-a-Box)
