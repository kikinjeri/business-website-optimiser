// File: app/card/[slug]/page.tsx

import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import EmbedCard from "@/components/EmbedCard";
import "@/styles/styles.css";

export default async function CardPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { embed?: string };
}) {
  const { slug } = params;

  // Canonical data fetcher (services removed, consistent shape)
  const { business, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  const isEmbed = searchParams?.embed === "1";

  return (
    <div
      style={{
        padding: isEmbed ? 0 : 20,
        background: isEmbed ? "transparent" : "#f9fafb",
        minHeight: isEmbed ? "auto" : "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <EmbedCard
          business={business}
          areas={areas}
          tags={business.tags} // ← Correct, consistent with new data model
        />
      </div>
    </div>
  );
}
