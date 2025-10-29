import { defineField, defineType } from 'sanity';
import { Package } from 'lucide-react';
import { altTextField } from '../blocks/shared/alt-text-field';

export default defineType({
  name: 'offerings-page',
  title: 'Offerings Page',
  type: 'document',
  icon: Package,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      group: 'content',
      initialValue: 'Our Offerings',
      validation: (Rule) => Rule.required().error('Hero title is required'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'content',
      initialValue: 'Explore our comprehensive range of services and solutions',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [altTextField],
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'noindex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1200x630]',
      type: 'image',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Offerings Page',
        subtitle: 'Offerings Page Configuration',
        media,
      };
    },
  },
});
