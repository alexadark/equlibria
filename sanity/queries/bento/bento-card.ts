import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';

// @sanity-typegen-ignore
export const bentoCardQuery = groq`
  _type == "bento-card" => {
    _type,
    _key,
    icon,
    title,
    description,
    image{
      ${imageQuery}
    },
    size,
  }
`;
