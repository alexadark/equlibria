import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';
import { linkQuery } from '../shared/link';
import { videoQuery } from '../shared/video';

// @sanity-typegen-ignore
export const hero3Query = groq`
  _type == "hero-3" => {
    _type,
    _key,
    mediaType,
    backgroundImage{
      ${imageQuery}
    },
    backgroundVideo{
      ${videoQuery}
    },
    title,
    description,
    links[]{
      ${linkQuery}
    },
  }
`;
