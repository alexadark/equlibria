import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';

// @sanity-typegen-ignore
export const featuredOfferingsQuery = groq`
  _type == "featured-offerings" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    ctaUrl,
    ctaText,
    offerings[]->{
      _id,
      companyName,
      slug,
      logo{
        ${imageQuery}
      },
      backgroundImage{
        ${imageQuery}
      },
      tagline,
      projectedReturns,
      minimumInvestment,
      status,
      valuation,
    },
  }
`;
