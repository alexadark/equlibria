import { defineField, defineType } from 'sanity';
import { Package } from 'lucide-react';

export default defineType({
  name: 'split-offering',
  type: 'object',
  icon: Package,
  title: 'Split Project',
  description:
    'Column with project reference - displays project title, excerpt, and image.',
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: { type: 'project' },
      validation: (Rule) => Rule.required().error('Project is required'),
    }),
    defineField({
      name: 'showExcerpt',
      type: 'boolean',
      title: 'Show Excerpt',
      description: 'Display the project excerpt below the title',
      initialValue: true,
    }),
    defineField({
      name: 'showImage',
      type: 'boolean',
      title: 'Show Image',
      description: 'Display the project image',
      initialValue: true,
    }),
    defineField({
      name: 'customTitle',
      type: 'string',
      title: 'Custom Title',
      description:
        'Override the project title (leave empty to use project title)',
    }),
    defineField({
      name: 'customExcerpt',
      type: 'text',
      title: 'Custom Excerpt',
      description:
        'Override the project excerpt (leave empty to use project excerpt)',
    }),
    defineField({
      name: 'link',
      type: 'link',
      description: 'Custom link (leave empty to link to project page)',
    }),
  ],
  preview: {
    select: {
      title: 'project.title',
      subtitle: 'project.excerpt',
      media: 'project.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'No Project Selected',
        subtitle: subtitle || 'Select a project',
        media,
      };
    },
  },
});
