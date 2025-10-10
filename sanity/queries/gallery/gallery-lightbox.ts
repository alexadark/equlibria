import { groq } from 'next-sanity';
import { imageQuery } from '../shared/image';
import { videoQuery } from '../shared/video';

// @sanity-typegen-ignore
export const galleryLightboxQuery = groq`
  _type == "gallery-lightbox" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    useMasonry,
    columns,
    masonryColumns,
    gapSize,
    fullWidth,
    roundedCorners,
    showTagFilters,
    images[]{
      _key,
      image{
        ${imageQuery}
      },
      caption,
      tags[]->{
        _id,
        title,
        slug,
      },
      hasVideo,
      video{
        ${videoQuery}
      },
    },
  }
`;
