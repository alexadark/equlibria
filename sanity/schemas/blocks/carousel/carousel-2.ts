import { defineField, defineType } from 'sanity';
import { Quote } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';

export default defineType({
  name: 'carousel-2',
  type: 'object',
  title: 'Carousel 2',
  icon: Quote,
  description: 'A carousel of testimonials',
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
      name: 'testimonial',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'testimonial.0.name',
    },
    prepare({ title }) {
      return {
        title: 'Testimonials Carousel',
        subtitle: title,
      };
    },
  },
});
