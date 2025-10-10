import { groq } from 'next-sanity';

// @sanity-typegen-ignore
export const contactInfoQuery = groq`
  _type == "contact-info" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    email,
    phone,
    officeAddress,
  }
`;
