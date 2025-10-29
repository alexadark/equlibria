import { fetchSanityOfferings } from '@/sanity/lib/fetch';
import { FilterableOfferings } from '@/components/ui/filterable-offerings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offerings',
  description:
    'Browse our investment offerings across various industries and asset classes.',
};

export default async function OfferingsPage() {
  const offerings = await fetchSanityOfferings();

  return (
    <section className="py-16 xl:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl">
            Investment Offerings
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore tokenized investment opportunities across real assets and
            infrastructure
          </p>
        </div>

        {offerings && offerings.length > 0 ? (
          <FilterableOfferings
            offerings={offerings}
            industryTitle="All Industries"
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No offerings available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
