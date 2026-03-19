// File: app/business/[slug]/page.tsx
import type { Metadata } from "next";
import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import "@/styles/styles.css";

// ⭐ Generate SEO metadata dynamically for each business
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { business } = await getBusinessBySlug(slug);

  if (!business) {
    return {
      title: "Business not found | Business Web Optimiser",
      description: "This business could not be found.",
    };
  }

  return {
    title: `${business.name} | Business Web Optimiser`,
    description:
      business.tagline_en ||
      business.short_description ||
      `Learn more about ${business.name}.`,
    alternates: {
      canonical: `https://your-domain.com/business/${business.slug}`,
    },
    openGraph: {
      title: business.name,
      description:
        business.tagline_en ||
        business.short_description ||
        `Learn more about ${business.name}.`,
      url: `https://your-domain.com/business/${business.slug}`,
      type: "website",
    },
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15/16: params is a Promise
  const { slug } = await params;

  const { business, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <main className="business-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </main>
    );
  }

  // ⭐ LocalBusiness JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description:
      business.tagline_en ||
      business.short_description ||
      `Learn more about ${business.name}.`,
    url: `https://your-domain.com/business/${business.slug}`,
    telephone: business.phone || undefined,
    address:
      business.address || business.city || business.region
        ? {
            "@type": "PostalAddress",
            streetAddress: business.address || undefined,
            addressLocality: business.city || undefined,
            addressRegion: business.region || undefined,
            postalCode: business.postal_code || undefined,
            addressCountry: "CA",
          }
        : undefined,
    sameAs: business.website_url ? [business.website_url] : undefined,
  };

  return (
    <main className="business-page">
      {/* ⭐ Inject JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BusinessCard
        name={business.name}
        tagline={business.tagline_en}
        address={business.address}
        phone={business.phone}
        email={business.email}
        website={business.website_url}
        hours={business.hours_json}
        areas={areas}
        slug={business.slug}
        is_accessible={business.is_accessible}
        supports_screen_readers={business.supports_screen_readers}
        supports_keyboard_navigation={business.supports_keyboard_navigation}
        tags={business.tags}
      />
    </main>
  );
}
