import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';

// @sanity-typegen-ignore
export const splitProjectQuery = groq`
  _type == "split-project" => {
    _type,
    _key,
    project->{
      _id,
      title,
      slug,
      excerpt,
      image{
        ${imageQuery}
      },
      expiresDate,
      regulationType,
      budget,
      categories[]->{
        title,
        slug
      }
    },
    imagePosition,
    showMetadata,
    customTitle,
    customExcerpt,
    buttonText,
    buttonVariant
  }
`;
