import { defineField, defineType } from 'sanity';
import { TrendingUp } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'featured-offerings',
  title: 'Featured Offerings',
  type: 'object',
  icon: TrendingUp,
  description: 'A carousel showcasing active or trending investment offerings',
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
      description: 'URL for the call-to-action link',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'CTA Link Text',
      description: 'Text to display for the call-to-action link',
      initialValue: 'View all offerings',
    }),
    defineField({
      name: 'offerings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'offering' }],
        },
      ],
      validation: (rule) =>
        rule
          .min(1)
          .error('At least one offering is required')
          .max(10)
          .warning('Consider limiting offerings to 10 for better performance'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      offeringCount: 'offerings.length',
    },
    prepare({ title, offeringCount }) {
      return {
        title: 'Featured Offerings',
        subtitle: `${title} (${offeringCount || 0} offerings)`,
      };
    },
  },
});
