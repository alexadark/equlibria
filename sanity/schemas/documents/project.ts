import { defineField, defineType } from 'sanity';
import { FolderKanban } from 'lucide-react';
import {
  SHOWCASE_BLOCKS,
  createBlocksField,
} from '../blocks/shared/block-configs';
import { altTextField } from '../blocks/shared/alt-text-field';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderKanban,
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
      validation: (Rule) => Rule.required().error('Title is required'),
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
        Rule.required().error('Slug is required for the project URL'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'Appears below the title',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description: 'A brief description of the project',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [altTextField],
      validation: (Rule) => Rule.required().error('Featured image is required'),
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      group: 'content',
      description: 'Title for the about section',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      group: 'content',
      description: 'Description text for the about section',
      rows: 4,
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'block-content',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled Step',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'buyNowUrl',
      title: 'Investment URL',
      type: 'url',
      group: 'content',
      description: 'External link for the investment/purchase button',
    }),
    defineField({
      name: 'expiresDate',
      title: 'Expires Date',
      type: 'string',
      group: 'content',
      description: 'e.g. "October 2025"',
    }),
    defineField({
      name: 'regulationType',
      title: 'Regulation Type',
      type: 'string',
      group: 'content',
      description: 'e.g. "Reg A+", "Reg D 506(c)"',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      group: 'content',
      description: 'e.g. "100M Budget", "$25M Series A"',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'settings',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      ...createBlocksField(SHOWCASE_BLOCKS),
      group: 'content',
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
      media: 'image',
      categories: 'categories',
    },
    prepare(selection) {
      const { title, media, categories } = selection;
      const categoryCount = categories?.length || 0;
      return {
        title,
        media,
        subtitle:
          categoryCount > 0
            ? `${categoryCount} ${categoryCount === 1 ? 'category' : 'categories'}`
            : 'No categories',
      };
    },
  },
});
