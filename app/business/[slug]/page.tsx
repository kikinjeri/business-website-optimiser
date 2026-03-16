// File: app/business/[slug]/page.tsx

import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function BusinessPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Canonical data fetcher (services removed, consistent shape)
  const { business, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <main className="business-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </main>
    );
  }

  return (
    <main className="business-page">
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
