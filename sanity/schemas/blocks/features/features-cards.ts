import { defineField, defineType } from 'sanity';
import { LayoutGrid } from 'lucide-react';
import {
  COLS_VARIANTS,
  STACK_ALIGN,
  SECTION_WIDTH,
} from '../shared/layout-variants';

export default defineType({
  name: 'features-cards',
  type: 'object',
  title: 'Features Cards',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
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
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'gridColumns',
      type: 'string',
      title: 'Grid Columns',
      description: 'Number of columns for the grid layout',
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'grid-cols-3',
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [{ type: 'features-card' }],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (block) => `/sanity/preview/${block}.jpg`,
            },
            { name: 'list' },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cardTitle: 'cards.0.title',
    },
    prepare({ title, cardTitle }) {
      return {
        title: 'Features Cards',
        subtitle: title || cardTitle || 'No Title',
      };
    },
  },
});
