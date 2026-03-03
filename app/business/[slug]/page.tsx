// app/business/[slug]/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import BusinessCard from "@/components/BusinessCard";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await supabaseServer();

  // Fetch business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (businessError || !business) {
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
    .select("id, name_en, description_en, starting_price")
    .eq("business_id", business.id);

  const services = servicesRaw ?? [];

  // Fetch service areas
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("id, area_name")
    .eq("business_id", business.id);

  const areas = areasRaw ?? [];

  // Hours JSON
  const hours = business.hours_json || null;

  // Extract neighbourhood
  const neighborhood = business.address
    ?.split(",")[1]
    ?.trim()
    ?.replace("Ottawa", "")
    ?.trim();

  // Theme colors
  const theme = {
    primary: business.theme_primary || "#111827",
    accent: business.theme_accent || "#2563eb",
    text: business.theme_text || "#111827",
    background: business.theme_background || "#ffffff",
  };

  return (
    <main className="business-page-wrapper" style={{ padding: "32px 0" }}>
      <div
        className="container"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Back navigation */}
        <nav
          aria-label="Back to directory"
          style={{
            marginBottom: "24px",
          }}
        >
          <Link
            href="/business"
            style={{
              display: "inline-block",
              color: theme.primary,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            ← Back to Businesses
          </Link>
        </nav>

        {/* Page hero */}
        <header
          className="business-header"
          style={{
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              color: theme.primary,
            }}
          >
            {business.name}
          </h1>

          {business.tagline_en && (
            <p
              className="tagline"
              style={{
                margin: "6px 0 0",
                fontSize: "1.05rem",
                color: `${theme.text}aa`,
              }}
            >
              {business.tagline_en}
            </p>
          )}
        </header>

        {/* Website link */}
        {business.website_url && (
          <a
            href={business.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-link"
            style={{
              display: "inline-block",
              marginBottom: "24px",
              color: theme.accent,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Visit website →
          </a>
        )}

        {/* Business card */}
        <section
          aria-label="Business overview"
          className="business-card-section"
          style={{ marginBottom: "40px" }}
        >
          <BusinessCard
            name={business.name}
            tagline={business.tagline_en}
            phone={business.phone}
            address={business.address}
            website_url={business.website_url}
            services={services.map((s) => s.name_en)}
            hours={hours}
            service_areas={areas.map((a) => a.area_name)}
            theme={theme}
            lat={business.lat}
            lng={business.lng}
            map_url={business.map_url}
          />
        </section>

        {/* Map */}

        {/* Neighbourhood */}
        {neighborhood && (
          <section
            className="menu-section"
            aria-label="Neighbourhood"
            style={{ marginBottom: "40px" }}
          >
            <h2
              style={{
                marginBottom: "8px",
                fontSize: "1.4rem",
                color: theme.primary,
              }}
            >
              Neighbourhood
            </h2>
            <p style={{ fontSize: "1rem", color: `${theme.text}cc` }}>
              {neighborhood}
            </p>
          </section>
        )}

        {/* Service Areas */}
        {areas.length > 0 && (
          <section
            className="menu-section"
            aria-label="Service areas"
            style={{ marginBottom: "40px" }}
          >
            <h2
              style={{
                marginBottom: "12px",
                fontSize: "1.4rem",
                color: theme.primary,
              }}
            >
              Service areas
            </h2>

            <ul className="area-list" style={{ paddingLeft: "20px" }}>
              {areas.map((area) => (
                <li key={area.id} style={{ marginBottom: "6px" }}>
                  {area.area_name}
                </li>
              ))}
            </ul>
          </section>
          
        )}
      </div>
    </main>
  );
}
