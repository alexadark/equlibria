import { defineField, defineType } from 'sanity';
import { ImageIcon } from 'lucide-react';
import {
  COLS_VARIANTS,
  STACK_ALIGN,
  SECTION_WIDTH,
} from '../shared/layout-variants';
import { altTextField } from '../shared/alt-text-field';
import { BulkImageArrayInput } from '@/sanity/components/BulkImageArrayInput';

export default defineType({
  name: 'gallery-lightbox',
  title: 'Gallery Lightbox',
  type: 'object',
  icon: ImageIcon,
  description: 'A responsive image gallery with lightbox carousel',
  fields: [
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
      rows: 3,
    }),
    defineField({
      name: 'useMasonry',
      type: 'boolean',
      title: 'Use Masonry Layout',
      description:
        'Enable Pinterest-style layout that adapts to image aspect ratios',
      initialValue: false,
    }),
    defineField({
      name: 'columns',
      type: 'string',
      title: 'Number of Columns',
      options: {
        list: COLS_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'grid-cols-3',
      hidden: ({ parent }) => parent?.useMasonry === true,
    }),
    defineField({
      name: 'masonryColumns',
      type: 'number',
      title: 'Masonry Columns (Desktop)',
      description: 'Number of columns for masonry layout on large screens',
      initialValue: 3,
      validation: (rule) => rule.min(2).max(6).integer(),
      hidden: ({ parent }) => parent?.useMasonry !== true,
    }),
    defineField({
      name: 'gapSize',
      type: 'number',
      title: 'Gap Size (pixels)',
      description: 'Space between images in pixels',
      initialValue: 16,
      validation: (rule) => rule.min(0).max(64).integer(),
    }),
    defineField({
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      description: 'Stretch gallery across entire browser width',
      initialValue: false,
    }),
    defineField({
      name: 'roundedCorners',
      type: 'boolean',
      title: 'Rounded Corners',
      description: 'Add rounded corners to images',
      initialValue: false,
    }),
    defineField({
      name: 'showTagFilters',
      type: 'boolean',
      title: 'Show Tag Filters',
      description: 'Display tag filter buttons above the gallery',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Item',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              description: 'Thumbnail image (always required)',
              options: {
                hotspot: true,
                accept: 'image/*',
              },
              fields: [altTextField],
              validation: (rule) => rule.required().error('Image is required'),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption to display in the lightbox',
            }),
            defineField({
              name: 'tags',
              type: 'array',
              title: 'Tags',
              description: 'Tags for filtering gallery images',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'gallery-tag' }],
                },
              ],
              options: {
                layout: 'tags',
              },
            }),
            defineField({
              name: 'hasVideo',
              type: 'boolean',
              title: 'Has Video?',
              description:
                'Enable if this item should play a video when clicked',
              initialValue: false,
            }),
            defineField({
              name: 'video',
              title: 'Video',
              type: 'video-field',
              description: 'Video that plays when the item is clicked',
              hidden: ({ parent }) => !parent?.hasVideo,
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              hasVideo: 'hasVideo',
            },
            prepare({ title, media, hasVideo }) {
              return {
                title: title || 'Gallery Item',
                subtitle: hasVideo ? 'With video' : 'Image only',
                media,
              };
            },
          },
        },
      ],
      components: {
        input: BulkImageArrayInput,
      },
      options: {
        layout: 'grid',
        accept: 'image/*',
      },
      validation: (rule) =>
        rule
          .min(1)
          .error('At least one image is required')
          .max(50)
          .warning('Consider limiting images to 50 for better performance'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length',
      columns: 'columns',
    },
    prepare({ title, imageCount, columns }) {
      const colsNum = columns?.replace('grid-cols-', '') || '3';
      return {
        title: 'Gallery Lightbox',
        subtitle: `${title} (${imageCount || 0} images, ${colsNum} columns)`,
      };
    },
  },
});
