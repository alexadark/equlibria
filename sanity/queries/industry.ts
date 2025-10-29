import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';

// Single industry query
export const INDUSTRY_QUERY = groq`*[_type == "industry" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  image{
    ${imageQuery}
  },
  _createdAt,
  _updatedAt,
  meta_title,
  meta_description,
  noindex,
  ogImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
  }
}`;

// List query
export const INDUSTRIES_QUERY = groq`*[_type == "industry" && defined(slug)] | order(orderRank){
  title,
  slug,
  description,
  image{
    ${imageQuery}
  },
}`;

// Slugs query (for static params)
export const INDUSTRIES_SLUGS_QUERY = groq`*[_type == "industry" && defined(slug)]{slug}`;
