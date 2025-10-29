import {
  fetchSanityOfferingBySlug,
  fetchSanityOfferingsStaticParams,
} from '@/sanity/lib/fetch';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { stegaClean } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export async function generateStaticParams() {
  const offerings = await fetchSanityOfferingsStaticParams();

  return offerings.map((offering) => ({
    slug: offering.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const offering = await fetchSanityOfferingBySlug({ slug: params.slug });

  if (!offering) {
    notFound();
  }

  return generatePageMetadata({
    page: {
      meta_title: offering.meta_title || offering.companyName,
      meta_description:
        offering.meta_description || offering.tagline || undefined,
      noindex: offering.noindex,
      ogImage: offering.ogImage,
    },
    slug: `offerings/${params.slug}`,
  });
}

export default async function OfferingPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const offering = await fetchSanityOfferingBySlug({ slug: params.slug });

  if (!offering) {
    notFound();
  }

  const backgroundImage = offering.backgroundImage
    ? urlFor(offering.backgroundImage)?.url()
    : null;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section
        className="relative py-20 xl:py-32"
        style={{
          backgroundImage: backgroundImage
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="flex flex-col items-center gap-6 text-center text-white">
            {offering.logo && (
              <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-white p-2">
                <Image
                  src={urlFor(offering.logo)?.url() || ''}
                  alt={stegaClean(offering.logo.alt) || ''}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl">
                {offering.companyName}
              </h1>
              {offering.tagline && (
                <p className="mt-4 text-xl">{offering.tagline}</p>
              )}
            </div>
            {offering.industries && offering.industries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {offering.industries.map((industry) => (
                  <Link
                    key={industry?.slug?.current}
                    href={`/industries/${industry?.slug?.current}`}
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-pointer text-sm transition-colors hover:bg-secondary/80"
                    >
                      {industry?.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16 xl:py-20">
        <div className="container max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investment">Investment Details</TabsTrigger>
              <TabsTrigger value="tokenization">Tokenization</TabsTrigger>
              <TabsTrigger value="secondary">Secondary Market</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              {offering.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <PortableTextRenderer value={offering.description} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {offering.missionStatement && (
                <Card>
                  <CardHeader>
                    <CardTitle>Mission Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {offering.missionStatement}
                    </p>
                  </CardContent>
                </Card>
              )}

              {offering.leadershipBios &&
                offering.leadershipBios.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Leadership Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        {offering.leadershipBios.map((bio) => (
                          <div
                            key={bio._key}
                            className="flex gap-4 rounded-lg border p-4"
                          >
                            {bio.photo && (
                              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={urlFor(bio.photo)?.url() || ''}
                                  alt={
                                    stegaClean(bio.photo.alt) || bio.name || ''
                                  }
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold">{bio.name}</h4>
                              {bio.role && (
                                <p className="text-sm text-muted-foreground">
                                  {bio.role}
                                </p>
                              )}
                              {bio.biography && (
                                <p className="mt-2 text-sm">{bio.biography}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            {/* Investment Details Tab */}
            <TabsContent value="investment" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {offering.valuation && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Valuation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{offering.valuation}</p>
                    </CardContent>
                  </Card>
                )}
                {offering.regulationType && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Regulation Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {offering.regulationType.toUpperCase()}
                      </p>
                    </CardContent>
                  </Card>
                )}
                {offering.projectedReturns && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Projected Returns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {offering.projectedReturns}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {offering.investorDocuments &&
                offering.investorDocuments.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Investor Documents (Private)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {offering.investorDocuments.map((doc) => (
                          <div
                            key={doc._key}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div>
                              <h4 className="font-medium">{doc.title}</h4>
                              {doc.description && (
                                <p className="text-sm text-muted-foreground">
                                  {doc.description}
                                </p>
                              )}
                            </div>
                            {doc.asset?.url && (
                              <Button size="sm" asChild>
                                <a
                                  href={doc.asset.url}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            {/* Tokenization Tab */}
            <TabsContent value="tokenization" className="mt-6 space-y-6">
              {offering.tokenStructure && (
                <Card>
                  <CardHeader>
                    <CardTitle>Token Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <PortableTextRenderer value={offering.tokenStructure} />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {offering.blockchainStandard && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Blockchain Standard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">
                        {offering.blockchainStandard}
                      </p>
                    </CardContent>
                  </Card>
                )}
                {offering.custodianInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Custodian Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{offering.custodianInfo}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Secondary Market Tab */}
            <TabsContent value="secondary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Data</CardTitle>
                </CardHeader>
                <CardContent>
                  {offering.marketData ? (
                    <p className="whitespace-pre-wrap text-muted-foreground">
                      {offering.marketData}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Secondary market data will be available once trading
                      begins. Live price charts and order book will be displayed
                      here.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Public Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {offering.publicDocuments &&
                  offering.publicDocuments.length > 0 ? (
                    <div className="space-y-3">
                      {offering.publicDocuments.map((doc) => (
                        <div
                          key={doc._key}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            {doc.description && (
                              <p className="text-sm text-muted-foreground">
                                {doc.description}
                              </p>
                            )}
                          </div>
                          {doc.asset?.url && (
                            <Button size="sm" asChild>
                              <a
                                href={doc.asset.url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No public documents available at this time.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
