import { groq } from 'next-sanity';
import { bentoCardQuery } from './bento-card';

// @sanity-typegen-ignore
export const bentoBoxQuery = groq`
  _type == "bento-box" => {
    _type,
    _key,
    padding,
    colorVariant,
    tagLine,
    title,
    description,
    cards[]{
      ${bentoCardQuery},
    },
  }
`;
