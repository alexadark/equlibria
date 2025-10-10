import { defineField, defineType } from 'sanity';
import { LayoutTemplate } from 'lucide-react';
import { altTextField } from '../shared/alt-text-field';

export default defineType({
  name: 'hero-3',
  title: 'Hero 3',
  type: 'object',
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [altTextField],
      hidden: ({ parent }) => parent?.mediaType === 'video',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'video-field',
      hidden: ({ parent }) => parent?.mediaType === 'image',
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
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Hero 3',
        subtitle: title,
      };
    },
  },
});
