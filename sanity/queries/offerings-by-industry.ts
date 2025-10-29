import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';

// Offerings filtered by industry
export const OFFERINGS_BY_INDUSTRY_QUERY = groq`*[_type == "offering" && defined(slug) && references($industryId)] | order(_createdAt desc){
  companyName,
  slug,
  logo{
    ${imageQuery}
  },
  tagline,
  backgroundImage{
    ${imageQuery}
  },
  industries[]->{
    title,
    slug,
  },
  valuation,
  regulationType,
}`;
