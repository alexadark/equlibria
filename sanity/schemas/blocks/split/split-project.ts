import { defineField, defineType } from 'sanity';
import { FolderKanban } from 'lucide-react';

export default defineType({
  name: 'split-project',
  title: 'Split Project',
  type: 'object',
  icon: FolderKanban,
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: { type: 'project' },
      validation: (Rule) => Rule.required().error('Project is required'),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      description: 'Position of the image relative to the text content',
    }),
    defineField({
      name: 'showMetadata',
      title: 'Show Project Metadata',
      type: 'boolean',
      initialValue: true,
      description:
        'Display project details like expiration date, regulation type, and budget',
    }),
    defineField({
      name: 'customTitle',
      title: 'Custom Title',
      type: 'string',
      description: 'Override the project title (optional)',
    }),
    defineField({
      name: 'customExcerpt',
      title: 'Custom Excerpt',
      type: 'text',
      description: 'Override the project excerpt (optional)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'View Offer',
      description: 'Text for the action button',
    }),
    defineField({
      name: 'buttonVariant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Destructive', value: 'destructive' },
          { title: 'Outline', value: 'outline' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'project.title',
      imagePosition: 'imagePosition',
      customTitle: 'customTitle',
    },
    prepare({ title, imagePosition, customTitle }) {
      return {
        title: customTitle || title || 'Split Project',
        subtitle: `Image ${imagePosition === 'left' ? 'left' : 'right'}`,
        media: FolderKanban,
      };
    },
  },
});
