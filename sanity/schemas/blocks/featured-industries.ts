import { defineField, defineType } from 'sanity';
import { Factory } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'featured-industries',
  title: 'Featured Industries',
  type: 'object',
  icon: Factory,
  description: 'A grid showcasing selected industries',
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      title: 'Color Variant',
      description: 'Select a background color variant',
    }),
    defineField({
      name: 'sectionWidth',
      type: 'string',
      title: 'Section Width',
      options: {
        list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'stackAlign',
      type: 'string',
      title: 'Stack Layout Alignment',
      options: {
        list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'tagLine',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'ctaUrl',
      type: 'url',
      title: 'CTA URL',
      description: 'URL for the "View all industries" button',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      initialValue: '/industries',
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text',
      description: 'Text to display on the button',
      initialValue: 'View all industries',
    }),
    defineField({
      name: 'industries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
      validation: (rule) =>
        rule
          .min(1)
          .error('At least one industry is required')
          .max(12)
          .warning('Consider limiting industries to 12 for better performance'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      industryCount: 'industries.length',
    },
    prepare({ title, industryCount }) {
      return {
        title: 'Featured Industries',
        subtitle: `${title} (${industryCount || 0} industries)`,
      };
    },
  },
});
