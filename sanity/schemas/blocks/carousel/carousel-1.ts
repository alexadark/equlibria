import { defineField, defineType } from 'sanity';
import { GalleryHorizontal } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';

export default defineType({
  name: 'carousel-1',
  type: 'object',
  title: 'Carousel 1',
  icon: GalleryHorizontal,
  description: 'A carousel of images',
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
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          { title: 'One', value: 'one' },
          { title: 'Two', value: 'two' },
          { title: 'Three', value: 'three' },
        ],
        layout: 'radio',
      },
      initialValue: 'one',
    }),
    defineField({
      name: 'indicators',
      type: 'string',
      title: 'Slide Indicators',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Dots', value: 'dots' },
          { title: 'Count', value: 'count' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Choose how to indicate carousel progress and position',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'images.0.alt',
    },
    prepare({ title }) {
      return {
        title: 'Carousel',
        subtitle: title,
      };
    },
  },
});
