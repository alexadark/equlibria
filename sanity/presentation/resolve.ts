import {
  defineLocations,
  defineDocuments,
  PresentationPluginOptions,
} from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
          { title: 'Blog', href: `/blog` },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/projects/${doc?.slug}`,
          },
          { title: 'Projects', href: `/projects` },
        ],
      }),
    }),
    offering: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/offerings/${doc?.slug}`,
          },
          { title: 'Offerings', href: `/offerings` },
        ],
      }),
    }),
    industry: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/industries/${doc?.slug}`,
          },
          { title: 'Industries', href: `/industries` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == 'page' && slug.current == 'index'`,
    },
    {
      route: '/:slug',
      filter: `_type == 'page' && slug.current == $slug`,
    },
    {
      route: '/blog',
      filter: `_type == 'blog-page'`,
    },
    {
      route: '/blog/:slug',
      filter: `_type == 'post' && slug.current == $slug`,
    },
    {
      route: '/projects',
      filter: `_type == 'projects-page'`,
    },
    {
      route: '/projects/:slug',
      filter: `_type == 'project' && slug.current == $slug`,
    },
    {
      route: '/offerings',
      filter: `_type == 'offerings-page'`,
    },
    {
      route: '/offerings/:slug',
      filter: `_type == 'offering' && slug.current == $slug`,
    },
    {
      route: '/industries/:slug',
      filter: `_type == 'industry' && slug.current == $slug`,
    },
  ]),
};
