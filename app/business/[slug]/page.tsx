// app/business/[slug]/page.tsx

import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function BusinessPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div className="page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  return (
    <BusinessCard
      name={business.name}
      tagline={business.tagline_en}
      address={business.address}
      phone={business.phone}
      email={business.email}
      website={business.website_url}
      hours={business.hours_json}
      services={services}
      areas={areas}
      slug={business.slug}
    />
  );
}
