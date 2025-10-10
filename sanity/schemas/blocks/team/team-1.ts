import { defineField, defineType, defineArrayMember } from 'sanity';
import { Users } from 'lucide-react';
import { altTextField } from '../shared/alt-text-field';
import { STACK_ALIGN, SECTION_WIDTH } from '../shared/layout-variants';

export default defineType({
  name: 'team-1',
  title: 'Team 1',
  type: 'object',
  icon: Users,
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
      name: 'members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [altTextField],
            }),
            defineField({
              name: 'socialLinks',
              type: 'array',
              title: 'Social Links',
              of: [{ type: 'social-link' }],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'avatar',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'padding',
      type: 'section-padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
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
      title: 'title',
      membersCount: 'members.length',
    },
    prepare({ title, membersCount }) {
      return {
        title: 'Team 1',
        subtitle: title || `${membersCount || 0} members`,
      };
    },
  },
});
