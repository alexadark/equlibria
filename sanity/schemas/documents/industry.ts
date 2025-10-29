import { defineField, defineType } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';
import { Factory } from 'lucide-react';
import { altTextField } from '../blocks/shared/alt-text-field';

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: Factory,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'e.g., "Real Assets & Infrastructure"',
      validation: (Rule) => Rule.required().error('Industry title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Slug is required for the industry URL'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      description: 'A brief description of the industry',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      description: 'Featured image for the industry',
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
    orderRankField({ type: 'industry' }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Industry',
        media,
      };
    },
  },
});
