# FAQ Organization Guide

## Import Instructions

First, import all the FAQ documents:

```bash
npx sanity dataset import sample-equilibria-faqs.ndjson production
```

## Page Structure Recommendation

You can organize these FAQs in two ways:

### Option 1: Single FAQ Page with Sections

Create one page (e.g., `/faqs`) with multiple FAQ blocks, each representing a section:

**Page Structure:**
- **Section 1: Tokenization and Digital Securities** (5 FAQs)
- **Section 2: Regulatory Framework** (4 FAQs)
- **Section 3: Compliance and Investor Verification** (2 FAQs)
- **Section 4: AI Agents and Automation** (3 FAQs)
- **Section 5: AI-Driven Database Marketing** (4 FAQs)
- **Section 6: General Questions** (3 FAQs)

### Option 2: Multiple FAQ Pages

Create separate pages for each major topic area.

---

## FAQ IDs by Section

Use these IDs when adding FAQs to your page blocks in Sanity Studio:

### Section 1: Tokenization and Digital Securities

**Block Title:** "Tokenization and Digital Securities"
**Block Description:** "Understanding digital securities, tokenization, and how your assets are managed"

FAQs to add:
- `faq-what-is-tokenization`
- `faq-tokenization-benefits`
- `faq-assets-tokenized`
- `faq-tokenization-vs-crypto`
- `faq-token-custody`

---

### Section 2: Regulatory Framework — Reg A+, Reg D, and Reg S

**Block Title:** "Regulatory Framework"
**Block Description:** "Learn about the securities regulations that govern our offerings"

FAQs to add:
- `faq-regulation-d`
- `faq-regulation-s`
- `faq-regulation-a-plus`
- `faq-multiple-exemptions`

---

### Section 3: Compliance and Investor Verification

**Block Title:** "Compliance and Investor Verification"
**Block Description:** "How we ensure security and regulatory compliance"

FAQs to add:
- `faq-kyc-aml-process`
- `faq-information-security`

---

### Section 4: AI Agents and Automation

**Block Title:** "AI Agents and Automation"
**Block Description:** "How artificial intelligence enhances your investment experience"

FAQs to add:
- `faq-ai-agents-definition`
- `faq-ai-agents-benefits`
- `faq-ai-agents-supervision`

---

### Section 5: AI-Driven Database Marketing

**Block Title:** "AI-Driven Database Marketing"
**Block Description:** "Understanding our investor database and intelligent matching system"

FAQs to add:
- `faq-investor-database`
- `faq-ai-investor-marketing`
- `faq-contact-data-sharing`
- `faq-ai-targeting-benefits`

---

### Section 6: General Questions

**Block Title:** "General Questions"
**Block Description:** "Everything you need to know about getting started"

FAQs to add:
- `faq-how-to-invest`
- `faq-who-regulates`
- `faq-contact-support`

---

## Step-by-Step: Creating a Single FAQ Page

1. **Go to Sanity Studio** → Pages → Create New Page
2. **Set page details:**
   - Title: "Frequently Asked Questions"
   - Slug: `faqs`
   - Meta Title: "FAQs - Equilibria"
   - Meta Description: "Answers to common questions about tokenization, regulation, AI agents, and investing through Equilibria"

3. **Add 6 FAQ Blocks** (one for each section):

   **Block 1:**
   - Type: FAQs
   - Tag Line: "Section 1"
   - Title: "Tokenization and Digital Securities"
   - Description: "Understanding digital securities, tokenization, and how your assets are managed"
   - Add 5 FAQ references (see Section 1 IDs above)

   **Block 2:**
   - Type: FAQs
   - Tag Line: "Section 2"
   - Title: "Regulatory Framework — Reg A+, Reg D, and Reg S"
   - Description: "Learn about the securities regulations that govern our offerings"
   - Add 4 FAQ references (see Section 2 IDs above)

   **Block 3:**
   - Type: FAQs
   - Tag Line: "Section 3"
   - Title: "Compliance and Investor Verification"
   - Description: "How we ensure security and regulatory compliance"
   - Add 2 FAQ references (see Section 3 IDs above)

   **Block 4:**
   - Type: FAQs
   - Tag Line: "Section 4"
   - Title: "AI Agents and Automation"
   - Description: "How artificial intelligence enhances your investment experience"
   - Add 3 FAQ references (see Section 4 IDs above)

   **Block 5:**
   - Type: FAQs
   - Tag Line: "Section 5"
   - Title: "AI-Driven Database Marketing"
   - Description: "Understanding our investor database and intelligent matching system"
   - Add 4 FAQ references (see Section 5 IDs above)

   **Block 6:**
   - Type: FAQs
   - Tag Line: "Section 6"
   - Title: "General Questions"
   - Description: "Everything you need to know about getting started"
   - Add 3 FAQ references (see Section 6 IDs above)

4. **Publish the page**

---

## Visual Appearance

Each FAQ block will render as an accordion with:
- Section tag line and title at the top
- Description text
- Collapsible FAQ items below

Users can expand/collapse individual questions and multiple FAQs can be open simultaneously.

---

## Optional: Search and Filter Sidebar

You mentioned wanting:
- Article cards: Title, summary, read time
- Sidebar navigation: Search + filter by topic

This would require creating a custom FAQ page component. Let me know if you'd like me to create that enhanced version with:
- Search functionality
- Category filtering
- Card-based layout option
- Sidebar navigation
