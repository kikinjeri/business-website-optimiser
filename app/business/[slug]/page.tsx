// File: app/business/[slug]/page.tsx
import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import "@/styles/styles.css";

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
