import { defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'all-posts',
  type: 'object',
  title: 'All Posts',
  description: 'A list of all posts',
  icon: Newspaper,
  fields: [
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
  ],
  preview: {
    prepare() {
      return {
        title: 'All Posts',
      };
    },
  },
});
