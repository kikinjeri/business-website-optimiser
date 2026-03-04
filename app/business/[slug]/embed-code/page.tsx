export const dynamic = "force-dynamic";

// app/business/[slug]/embed-code/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import BusinessCard from "@/components/BusinessCard";

export default async function EmbedCodePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const supabase = await supabaseServer();

  // Fetch business
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!business) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </main>
    );
  }

  // Fetch services
  const { data: servicesRaw } = await supabase
    .from("services")
    .select("name_en")
    .eq("business_id", business.id);

  const services = servicesRaw?.map((s) => s.name_en) ?? [];

  // Fetch service areas
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("area_name")
    .eq("business_id", business.id);

  const areas = areasRaw?.map((a) => a.area_name) ?? [];

  const embedUrl = `https://YOURDOMAIN.com/card/${slug}`;

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <Link
        href={`/business/${slug}`}
        style={{ display: "inline-block", marginBottom: "16px" }}
      >
        ← Back to business page
      </Link>

      <h1>Embed this business card</h1>
      <p>Copy and paste this code into your website:</p>

      <textarea
        readOnly
        style={{
          width: "100%",
          height: "140px",
          padding: "12px",
          fontSize: "0.9rem",
          fontFamily: "monospace",
        }}
      >
        {`<iframe
  src="${embedUrl}"
  style="border:0;width:100%;height:420px;"
  loading="lazy"
></iframe>`}
      </textarea>

      <h2 style={{ marginTop: "32px" }}>Preview</h2>

      <BusinessCard
        name={business.name}
        tagline={business.tagline_en}
        phone={business.phone}
        address={business.address}
        website_url={business.website_url}
        services={services}
        hours={business.hours_json}
        service_areas={areas}
        theme={{
          primary: business.theme_primary,
          accent: business.theme_accent,
          text: business.theme_text,
          background: business.theme_background,
        }}
        lat={business.lat}
        lng={business.lng}
        map_url={business.map_url}
        neighborhood={business.address?.split(",")[1]?.trim()}
        serviceAreasFull={areas}
      />
    </main>
  );
}
