import { groq } from 'next-sanity';
import { bodyQuery } from './shared/body';
import { imageQuery } from './shared/image';

// @sanity-typegen-ignore
export const timelineQuery = groq`
  _type == "timeline-row" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    timelines[]{
      title,
      tagLine,
      body[]{
        ${bodyQuery}
      },
    },
  }
`;
