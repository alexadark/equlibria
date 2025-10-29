import { defineField, defineType } from 'sanity';
import { Building2 } from 'lucide-react';
import { altTextField } from '../blocks/shared/alt-text-field';

export default defineType({
  name: 'offering',
  title: 'Offering',
  type: 'document',
  icon: Building2,
  groups: [
    {
      name: 'info',
      title: 'Core Information',
      default: true,
    },
    {
      name: 'overview',
      title: 'Overview',
    },
    {
      name: 'investment',
      title: 'Investment Details',
    },
    {
      name: 'tokenization',
      title: 'Tokenization',
    },
    {
      name: 'secondary',
      title: 'Secondary Market',
    },
    {
      name: 'documents',
      title: 'Documents',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    // Core Information Fields
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'info',
      description: 'e.g., "Building Modular Inc."',
      validation: (Rule) => Rule.required().error('Company name is required'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'info',
      options: {
        hotspot: true,
      },
      fields: [altTextField],
      validation: (Rule) => Rule.required().error('Logo is required'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'info',
      description: 'Short tagline for the offering',
      validation: (Rule) =>
        Rule.max(100).warning('Keep tagline under 100 characters'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'info',
      description: 'Hero/banner background image',
      options: {
        hotspot: true,
      },
      fields: [altTextField],
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'info',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one industry must be selected'),
    }),

    // Overview Tab Fields
    defineField({
      name: 'description',
      title: 'Description',
      type: 'block-content',
      group: 'overview',
      description: 'Main company summary',
    }),
    defineField({
      name: 'leadershipBios',
      title: 'Leadership Bios',
      type: 'array',
      group: 'overview',
      of: [
        {
          type: 'object',
          name: 'leadershipBio',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'biography',
              title: 'Biography',
              type: 'text',
              rows: 5,
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [altTextField],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      group: 'overview',
      rows: 4,
    }),

    // Investment Details Tab Fields
    defineField({
      name: 'valuation',
      title: 'Valuation',
      type: 'string',
      group: 'investment',
      description: 'e.g., "$10M" or "TBD"',
    }),
    defineField({
      name: 'regulationType',
      title: 'Regulation Type',
      type: 'string',
      group: 'investment',
      options: {
        list: [
          { title: 'Reg D', value: 'reg-d' },
          { title: 'Reg S', value: 'reg-s' },
          { title: 'Reg A+', value: 'reg-a-plus' },
          { title: 'Reg CF', value: 'reg-cf' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'projectedReturns',
      title: 'Projected Returns',
      type: 'string',
      group: 'investment',
      description: 'e.g., "8-12% annually"',
    }),
    defineField({
      name: 'investorDocuments',
      title: 'Investor Documents (Private)',
      type: 'array',
      group: 'investment',
      description:
        'Private documents like pitch decks or financials (access controlled)',
      of: [
        {
          type: 'file',
          fields: [
            defineField({
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),

    // Tokenization Tab Fields
    defineField({
      name: 'tokenStructure',
      title: 'Token Structure',
      type: 'block-content',
      group: 'tokenization',
      description: 'Explain the tokenomics',
    }),
    defineField({
      name: 'blockchainStandard',
      title: 'Blockchain Standard',
      type: 'string',
      group: 'tokenization',
      description: 'e.g., "ERC-1400", "ERC-20", "Polygon", etc.',
    }),
    defineField({
      name: 'custodianInfo',
      title: 'Custodian Info',
      type: 'text',
      group: 'tokenization',
      rows: 3,
      description: 'Name and details of the custodian',
    }),

    // Secondary Market Tab Fields
    defineField({
      name: 'marketData',
      title: 'Market Data',
      type: 'text',
      group: 'secondary',
      rows: 4,
      description:
        'Static market information. Live data (price, chart, order book) will be pulled via API.',
    }),

    // Documents Tab Fields
    defineField({
      name: 'publicDocuments',
      title: 'Public Documents',
      type: 'array',
      group: 'documents',
      description: 'Public-facing documents like white papers or prospectuses',
      of: [
        {
          type: 'file',
          fields: [
            defineField({
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),

    // Settings
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'companyName',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Slug is required for the offering URL'),
    }),

    // SEO Fields
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1200x630]',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tagline',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Offering',
        media,
      };
    },
  },
});
