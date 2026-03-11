import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import { logEmbedView } from "@/lib/logEmbedView";
import { headers as nextHeaders } from "next/headers";

export default async function CardEmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  // Next.js 15: params is a Promise
  const { slug } = await params;

  // Next.js 15: searchParams is a Promise
  const sp = await searchParams;
  const isEmbed = sp?.embed === "1";

  // Fetch business data
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

  // Next.js 15: headers() is a Promise — MUST await it
  const hdrs = await nextHeaders();
  const referrer = hdrs.get("referer");
  const userAgent = hdrs.get("user-agent");

  // Analytics (non-blocking)
  logEmbedView({
    businessId: business.id,
    slug,
    referrer,
    userAgent,
    embed: isEmbed,
  });

  // Wider preview card so hours never squish
  return (
    <div
      style={{
        padding: "20px 0",
        margin: 0,
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px", // WIDE ENOUGH FOR HOURS
          padding: "0 16px",
        }}
      >
        <BusinessCard
          business={business}
          services={services}
          areas={areas}
          searchParams={sp}
        />
      </div>
    </div>
  );
}
