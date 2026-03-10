// app/business/[slug]/page.tsx
import Link from "next/link";
import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function BusinessPage({
  params,
}: {
  params: { slug: string };
}) {
  const { business, services, areas } = await getBusinessBySlug(params.slug);

  if (!business) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {params.slug}</p>
      </div>
    );
  }

  const hours = business.hours_json || null;

  const neighborhood = business.address
    ?.split(",")[1]
    ?.replace("Ottawa", "")
    ?.trim();

  const theme = {
    primary: business.theme_primary || "#111827",
    accent: business.theme_accent || "#2563eb",
    text: business.theme_text || "#111827",
    background: business.theme_background || "#ffffff",
  };

  return (
    <div style={{ padding: "12px 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <nav style={{ marginBottom: "16px" }}>
          <Link href="/business" style={{ fontWeight: 600 }}>
            ← Back to Businesses
          </Link>
        </nav>

        <BusinessCard
          name={business.name}
          slug={business.slug}
          tagline={business.tagline_en}
          phone={business.phone}
          address={business.address}
          website_url={business.website_url}
          services={services}
          hours={hours}
          service_areas={areas}
          theme={theme}
          lat={business.lat}
          lng={business.lng}
          map_url={business.map_url}
          neighborhood={neighborhood}
          serviceAreasFull={areas}
        />
      </div>
    </div>
  );
}
