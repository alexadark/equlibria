import { groq } from 'next-sanity';
import { imageQuery } from './shared/image';

// Single offering query
export const OFFERING_QUERY = groq`*[_type == "offering" && slug.current == $slug][0]{
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
  description,
  leadershipBios[]{
    _key,
    name,
    role,
    biography,
    photo{
      ${imageQuery}
    }
  },
  missionStatement,
  geography,
  valuation,
  regulationType,
  projectedReturns,
  minimumInvestment,
  status,
  investorDocuments[]{
    _key,
    title,
    description,
    asset->{
      _id,
      url,
      originalFilename,
      extension,
      size
    }
  },
  tokenStructure,
  blockchainStandard,
  custodianInfo,
  marketData,
  publicDocuments[]{
    _key,
    title,
    description,
    asset->{
      _id,
      url,
      originalFilename,
      extension,
      size
    }
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
export const OFFERINGS_QUERY = groq`*[_type == "offering" && defined(slug)] | order(_createdAt desc){
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
  projectedReturns,
  minimumInvestment,
  geography,
  status,
}`;

// Slugs query (for static params)
export const OFFERINGS_SLUGS_QUERY = groq`*[_type == "offering" && defined(slug)]{slug}`;
