import { defineField, defineType } from 'sanity';
import { Video } from 'lucide-react';

export const videoField = defineField({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: Video,
  fields: [
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Direct URL', value: 'url' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description:
        'Full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)',
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
      validation: (rule) =>
        rule.custom((value) => {
          if (
            value &&
            !value.includes('youtube.com') &&
            !value.includes('youtu.be')
          ) {
            return 'Please enter a valid YouTube URL';
          }
          return true;
        }),
    }),
    defineField({
      name: 'directUrl',
      title: 'Direct Video URL',
      type: 'url',
      description: 'Direct link to video file (e.g., .mp4, .webm)',
      hidden: ({ parent }) => parent?.videoType !== 'url',
    }),
  ],
});

export default defineType({
  name: 'video-field',
  title: 'Video',
  type: 'object',
  icon: Video,
  fields: videoField.type === 'object' ? videoField.fields || [] : [],
});
