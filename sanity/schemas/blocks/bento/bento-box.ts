import { defineField, defineType } from 'sanity';
import { LayoutGrid } from 'lucide-react';

export default defineType({
  name: 'bento-box',
  title: 'Bento Box',
  type: 'object',
  icon: LayoutGrid,
  description: 'A responsive bento-style grid layout with varying card sizes',
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
      name: 'cards',
      type: 'array',
      of: [{ type: 'bento-card' }],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: () => `/sanity/preview/bento-card.jpg`,
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
      cardCount: 'cards.length',
    },
    prepare({ title, cardCount }) {
      return {
        title: 'Bento Box',
        subtitle: title || `${cardCount || 0} cards`,
      };
    },
  },
});
