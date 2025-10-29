/**
 * Script to fix corrupted orderRank fields in Sanity
 * Run with: node scripts/fix-orderrank.js
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

// Read .env.local file manually
const envFile = readFileSync('.env.local', 'utf-8');
const envVars = {};
envFile.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const client = createClient({
  projectId: envVars.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: envVars.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: envVars.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const typesToFix = [
  'page',
  'author',
  'category',
  'industry',
  'gallery-tag',
  'faq',
  'testimonial',
];

async function fixOrderRanks() {
  console.log('Starting orderRank fix...\n');

  for (const type of typesToFix) {
    console.log(`Processing ${type}...`);

    try {
      // Fetch all documents of this type with orderRank
      const docs = await client.fetch(
        `*[_type == $type && defined(orderRank)] | order(_createdAt) { _id, _rev, orderRank }`,
        { type }
      );

      if (docs.length === 0) {
        console.log(`  ✓ No documents found for ${type}`);
        continue;
      }

      console.log(`  Found ${docs.length} documents`);

      // Delete orderRank fields
      const transaction = client.transaction();
      docs.forEach((doc) => {
        transaction.patch(doc._id, (patch) => patch.unset(['orderRank']));
      });

      await transaction.commit();
      console.log(
        `  ✓ Cleared orderRank for ${docs.length} ${type} documents\n`
      );
    } catch (error) {
      console.error(`  ✗ Error processing ${type}:`, error.message, '\n');
    }
  }

  console.log(
    'Done! Restart your dev server and the orderRanks will regenerate automatically.'
  );
}

fixOrderRanks();
