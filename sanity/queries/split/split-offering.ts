import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';

// @sanity-typegen-ignore
export const splitOfferingQuery = groq`
  _type == "split-offering" => {
    _type,
    _key,
    project->{
      title,
      slug,
      excerpt,
      image{
        ${imageQuery}
      }
    },
    showExcerpt,
    showImage,
    customTitle,
    customExcerpt,
    link{
      title,
      href,
      target,
      buttonVariant
    }
  }
`;
