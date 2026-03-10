// app/business/[slug]/page.tsx

import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import BusinessCard from "@/components/cards/BusinessCard";

export default async function BusinessPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Next.js 14: params is a Promise — must await it
  const { slug } = await props.params;

  // Fetch business data
  const { business, services, areas } = await getBusinessBySlug(slug);

  // Handle missing business
  if (!business) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  // Render full business profile
  return (
    <div style={{ padding: "40px" }}>
      <BusinessCard business={business} services={services} areas={areas} />
    </div>
  );
}
