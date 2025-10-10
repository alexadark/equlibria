import { defineType, defineField } from 'sanity';
import { ArrowDownNarrowWide } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';

export default defineType({
  name: 'timeline-row',
  type: 'object',
  title: 'Timeline Row',
  description: 'Row of Timeline Sections',
  icon: ArrowDownNarrowWide,
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
      name: 'timelines',
      type: 'array',
      of: [{ type: 'timelines-1' }],
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
    defineField({
      name: 'padding',
      type: 'section-padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
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
    select: {
      subtitle: 'timelines.0.title',
    },
    prepare({ subtitle }) {
      return {
        title: 'Timelines Row',
        subtitle,
      };
    },
  },
});
