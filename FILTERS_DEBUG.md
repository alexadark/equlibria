# Debug: Where Are The Filters?

## Current Implementation

The filters are on **individual industry pages**, not the main industries listing.

### To See The Filters

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/industries/finance-fintech`
3. Scroll down past the industry header
4. You should see:
   - "Investment Offerings in Finance & FinTech" heading
   - **4 filter dropdowns** (Offering Type, Geography, Min Investment, Availability)
   - Offerings grid below

### Expected UI Structure

```
[Industry Image]
[Industry Title]
[Industry Description]

"Investment Offerings in [Industry Name]"

┌─────────────────────────────────────────────┐
│ Offering Type  ▼ | Geography  ▼ |  etc...   │  ← FILTERS HERE
└─────────────────────────────────────────────┘

[Offering Card] [Offering Card] [Offering Card]
```

### If Filters Don't Appear

**Reason:** No offerings linked to that industry

**Solution:**

1. Go to Sanity Studio: `http://localhost:3000/studio`
2. Open an offering (e.g., "Affordable Housing Solutions")
3. Add "Finance & FinTech" to the Industries field
4. Publish
5. Refresh the industry page

### If You Want Filters On Main Industries Page

Let me know! I can add filters to `/industries` to filter/search industries themselves (different from offering filters).

## Quick Test Command

```bash
# Check which offerings are in Finance & FinTech industry
cd /Users/webstantly/DEV/projects/equlibria
npx sanity documents query "*[_type == 'offering' && references(*[_type=='industry' && slug.current=='finance-fintech'][0]._id)]{companyName}" --dataset production --pretty
```
