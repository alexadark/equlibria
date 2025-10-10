import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';

export default defineType({
  name: 'gallery-tag',
  title: 'Gallery Tag',
  type: 'document',
  icon: Tag,
  description: 'Tags for filtering gallery images',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) =>
        rule.required().error('Title is required for gallery tags'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().error('Slug is required for gallery tags'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Optional description for the tag',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || 'Gallery Tag',
      };
    },
  },
});
