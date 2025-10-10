import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';
import { socialLinksQuery } from '../shared/social-links';

// @sanity-typegen-ignore
export const team1Query = groq`
  _type == "team-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    members[]{
      _key,
      name,
      role,
      avatar{
        ${imageQuery}
      },
      socialLinks[]{
        ${socialLinksQuery}
      },
    },
  }
`;
