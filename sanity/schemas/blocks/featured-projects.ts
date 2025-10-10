import { defineField, defineType } from 'sanity';
import { Star } from 'lucide-react';
import { STACK_ALIGN, SECTION_WIDTH } from './shared/layout-variants';

export default defineType({
  name: 'featured-projects',
  type: 'object',
  title: 'Featured Projects',
  description: 'A curated selection of featured projects',
  icon: Star,
  fields: [
    defineField({
      name: 'tagLine',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the featured projects section',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(12)
          .error('Select between 1 and 12 featured projects'),
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
    defineField({
      name: 'showViewAllButton',
      title: 'Show "View All Projects" Button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'viewAllButtonText',
      title: 'View All Button Text',
      type: 'string',
      initialValue: 'View All Projects',
      hidden: ({ parent }) => !parent?.showViewAllButton,
    }),
    defineField({
      name: 'viewAllButtonVariant',
      title: 'View All Button Variant',
      type: 'button-variant',
      initialValue: 'default',
      hidden: ({ parent }) => !parent?.showViewAllButton,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projects: 'projects',
    },
    prepare({ title, projects }) {
      const projectCount = projects?.length || 0;
      return {
        title: title || 'Featured Projects',
        subtitle: `${projectCount} ${projectCount === 1 ? 'project' : 'projects'} selected`,
      };
    },
  },
});
