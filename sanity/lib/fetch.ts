import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/queries/page';
import { NAVIGATION_QUERY } from '@/sanity/queries/navigation';
import { SETTINGS_QUERY } from '@/sanity/queries/settings';
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from '@/sanity/queries/post';
import {
  PROJECT_QUERY,
  PROJECTS_QUERY,
  PROJECTS_SLUGS_QUERY,
} from '@/sanity/queries/project';
import { PROJECTS_PAGE_QUERY } from '@/sanity/queries/projects-page';
import {
  CATEGORY_QUERY,
  CATEGORIES_SLUGS_QUERY,
} from '@/sanity/queries/category';
import {
  INDUSTRY_QUERY,
  INDUSTRIES_QUERY,
  INDUSTRIES_SLUGS_QUERY,
} from '@/sanity/queries/industry';
import {
  OFFERING_QUERY,
  OFFERINGS_QUERY,
  OFFERINGS_SLUGS_QUERY,
} from '@/sanity/queries/offering';
import { OFFERINGS_BY_INDUSTRY_QUERY } from '@/sanity/queries/offerings-by-industry';
import {
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
  POSTS_SLUGS_QUERYResult,
  PROJECT_QUERYResult,
  PROJECTS_QUERYResult,
  PROJECTS_SLUGS_QUERYResult,
  PROJECTS_PAGE_QUERYResult,
  CATEGORY_QUERYResult,
  CATEGORIES_SLUGS_QUERYResult,
  INDUSTRY_QUERYResult,
  INDUSTRIES_QUERYResult,
  INDUSTRIES_SLUGS_QUERYResult,
  OFFERING_QUERYResult,
  OFFERINGS_QUERYResult,
  OFFERINGS_SLUGS_QUERYResult,
  OFFERINGS_BY_INDUSTRY_QUERYResult,
  NAVIGATION_QUERYResult,
  SETTINGS_QUERYResult,
} from '@/sanity.types';

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityPosts = async (): Promise<POSTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: POSTS_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERYResult> => {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanityProjects = async (): Promise<PROJECTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  return data;
};

export const fetchSanityProjectBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PROJECT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProjectsStaticParams =
  async (): Promise<PROJECTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PROJECTS_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityProjectsPage =
  async (): Promise<PROJECTS_PAGE_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PROJECTS_PAGE_QUERY,
    });

    return data;
  };

export const fetchSanityCategoryBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<CATEGORY_QUERYResult> => {
  const { data } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityCategoriesStaticParams =
  async (): Promise<CATEGORIES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: CATEGORIES_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityIndustries =
  async (): Promise<INDUSTRIES_QUERYResult> => {
    const { data } = await sanityFetch({
      query: INDUSTRIES_QUERY,
    });

    return data;
  };

export const fetchSanityIndustryBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<INDUSTRY_QUERYResult> => {
  const { data } = await sanityFetch({
    query: INDUSTRY_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityIndustriesStaticParams =
  async (): Promise<INDUSTRIES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: INDUSTRIES_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityOfferings =
  async (): Promise<OFFERINGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: OFFERINGS_QUERY,
    });

    return data;
  };

export const fetchSanityOfferingBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<OFFERING_QUERYResult> => {
  const { data } = await sanityFetch({
    query: OFFERING_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityOfferingsStaticParams =
  async (): Promise<OFFERINGS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: OFFERINGS_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    });

    return data;
  };

export const fetchSanityOfferingsByIndustry = async ({
  industryId,
}: {
  industryId: string;
}): Promise<OFFERINGS_BY_INDUSTRY_QUERYResult> => {
  const { data } = await sanityFetch({
    query: OFFERINGS_BY_INDUSTRY_QUERY,
    params: { industryId },
  });

  return data;
};
