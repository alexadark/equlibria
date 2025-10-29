import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const featuredIndustriesQuery = groq`
  _type == "featured-industries" => {
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
    industries[]-> {
      _id,
      title,
      slug,
      description,
      image {
        ...,
        asset-> {
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    }
  }
`;
