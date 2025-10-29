import { fetchSanityIndustries } from '@/sanity/lib/fetch';
import IndustriesGrid from '@/components/ui/industries-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Explore investment opportunities across different industries and sectors.',
};

export default async function IndustriesPage() {
  const industries = await fetchSanityIndustries();

  return <IndustriesGrid industries={industries} />;
}
