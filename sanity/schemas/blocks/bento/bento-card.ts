import { defineField, defineType } from 'sanity';
import { LayoutGrid } from 'lucide-react';

export default defineType({
  name: 'bento-card',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          { title: 'Building', value: 'Building2' },
          { title: 'Landmark', value: 'Landmark' },
          { title: 'Grid', value: 'Grid3x3' },
          { title: 'Compass', value: 'Compass' },
          { title: 'Home', value: 'Home' },
          { title: 'Target', value: 'Target' },
        ],
        layout: 'dropdown',
      },
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
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Card Size',
      options: {
        list: [
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      size: 'size',
    },
    prepare({ title, media, size }) {
      return {
        title: 'Bento Card',
        subtitle: `${title || 'No title'} - ${size}`,
        media,
      };
    },
  },
});
