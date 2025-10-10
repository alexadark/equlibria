import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const videoQuery = groq`
  videoType,
  youtubeUrl,
  directUrl
`;
