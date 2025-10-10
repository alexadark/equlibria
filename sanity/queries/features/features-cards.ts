import { groq } from 'next-sanity';
import { featuresCardQuery } from './features-card';

// @sanity-typegen-ignore
export const featuresCardsQuery = groq`
  _type == "features-cards" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    layout,
    gridColumns,
    cards[]{
      ${featuresCardQuery}
    },
  }
`;
