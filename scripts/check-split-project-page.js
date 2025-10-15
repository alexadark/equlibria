import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-10-31',
});

async function checkPage() {
  const page = await client.fetch(
    '*[_type == "page" && slug.current == "split-project-demo"][0]{title, blocks[_type == "split-row"]{_type, fullWidth, splitColumns[]{_type, imagePosition}}}'
  );
  console.log(JSON.stringify(page, null, 2));
}

checkPage();
