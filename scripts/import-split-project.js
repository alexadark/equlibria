import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function importSplitProjectPage() {
  try {
    // First, let's check if there are any existing projects
    const projects = await client.fetch('*[_type == "project"][0...3]');
    console.log(
      'Found projects:',
      projects.map((p) => ({ id: p._id, title: p.title }))
    );

    // Import the page data
    const pageData = {
      _type: 'page',
      _id: 'split-project-demo',
      title: 'Split Project Demo',
      slug: {
        current: 'split-project-demo',
        _type: 'slug',
      },
      meta_title: 'Split Project Demo - Showcasing Project Split Components',
      meta_description:
        'A demonstration page showing the new split project component with alternating layouts and project metadata.',
      blocks: [
        {
          _type: 'hero-1',
          _key: 'hero',
          title: 'Project Showcase',
          subtitle: 'Discover our investment opportunities',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Explore our curated selection of investment projects, each presented in an engaging split layout that highlights both visual appeal and key project details.',
                },
              ],
              style: 'normal',
            },
          ],
          image: {
            _type: 'image',
            _sanityAsset: 'image@https://picsum.photos/seed/hero/1920/1080',
          },
          link: {
            title: 'View All Projects',
            href: '/projects',
            buttonVariant: 'default',
          },
        },
        {
          _type: 'split-row',
          _key: 'project-1',
          padding: { top: true, bottom: true },
          colorVariant: 'default',
          noGap: false,
          fullWidth: false,
          splitColumns: [
            {
              _type: 'split-project',
              _key: 'project-1',
              project: projects[0]
                ? { _type: 'reference', _ref: projects[0]._id }
                : null,
              imagePosition: 'right',
              showMetadata: true,
              customTitle: '',
              customExcerpt: '',
              buttonText: 'View Offer',
              buttonVariant: 'default',
            },
          ],
        },
        {
          _type: 'split-row',
          _key: 'project-2',
          padding: { top: true, bottom: true },
          colorVariant: 'primary',
          noGap: false,
          fullWidth: true,
          splitColumns: [
            {
              _type: 'split-project',
              _key: 'project-2',
              project: projects[1]
                ? { _type: 'reference', _ref: projects[1]._id }
                : null,
              imagePosition: 'left',
              showMetadata: true,
              customTitle: '',
              customExcerpt: '',
              buttonText: 'View Offer',
              buttonVariant: 'outline',
            },
          ],
        },
      ],
    };

    // Create the page
    const result = await client.createOrReplace(pageData);
    console.log('Successfully created page:', result._id);
  } catch (error) {
    console.error('Error importing split project page:', error);
  }
}

importSplitProjectPage();
