import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function BusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "20px",
          color: "#fff",
          background: "#0f172a",
        }}
      >
        Business not found.
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <BusinessCard
        business={business}
        services={services}
        areas={areas}
        searchParams={sp ?? {}}
      />
    </div>
  );
}
