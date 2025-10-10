import { defineType, defineField } from 'sanity';
import { ListCollapse } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'faqs',
  type: 'object',
  icon: ListCollapse,
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
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        {
          name: 'faq',
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'faqs.0.title',
    },
    prepare({ title }) {
      return {
        title: 'FAQs',
        subtitle: title || 'No Title',
      };
    },
  },
});
