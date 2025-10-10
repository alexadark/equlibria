import { defineField, defineType } from 'sanity';
import { GalleryHorizontal } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';

export default defineType({
  name: 'carousel-gallery',
  title: 'Carousel Gallery',
  type: 'object',
  icon: GalleryHorizontal,
  description: 'A horizontal scrolling gallery with cards',
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
      validation: (rule) =>
        rule.required().error('Title is required for the gallery'),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'demoUrl',
      type: 'url',
      title: 'Demo URL',
      description: 'URL for the demo link',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'demoText',
      type: 'string',
      title: 'Demo Link Text',
      description: 'Text to display for the demo link',
      initialValue: 'Book a demo',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'carousel-gallery-item' }],
      validation: (rule) =>
        rule
          .min(1)
          .error('At least one gallery item is required')
          .max(10)
          .warning(
            'Consider limiting gallery items to 10 for better performance'
          ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({ title, itemCount }) {
      return {
        title: 'Carousel Gallery',
        subtitle: `${title} (${itemCount || 0} items)`,
      };
    },
  },
});
