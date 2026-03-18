// File: app/dashboard/[slug]/page.tsx
// app/dashboard/[slug]/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import "@/styles/styles.css";

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const supabase = supabaseServer();

  // Fetch business
  const { data: business } = await supabase
    .from("businesses")
    .select(
      `
      id,
      name,
      slug,
      category,
      neighborhood,
      status,
      tagline_en,
      website_url,
      phone,
      email,
      address,
      hours_json,
      is_accessible,
      supports_screen_readers,
      supports_keyboard_navigation,
      theme_primary,
      theme_accent,
      theme_text,
      theme_background,
      seo_title,
      seo_description,
      seo_keywords
    `,
    )
    .eq("slug", slug)
    .single();

  if (!business) {
    return (
      <main className="dashboard-page" role="main">
        <h1 className="dashboard-title">Business not found</h1>
        <p>No business exists with slug: {slug}</p>
      </main>
    );
  }

  // Fetch service areas
  const { data: areas } = await supabase
    .from("service_areas")
    .select("name_en")
    .eq("business_id", business.id);

  const serviceAreas = areas?.map((a) => a.name_en) ?? [];

  return (
    <main className="dashboard-page" role="main">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">{business.name}</h1>
        <p className="dashboard-subtitle">
          Your business control center — analytics, card preview, embed tools,
          and settings.
        </p>
      </header>

      {/* Tab Navigation */}
      <nav
        className="dashboard-tabs"
        aria-label="Business dashboard navigation"
      >
        <DashboardTab href={`/dashboard/${slug}`} label="Overview" active />
        <DashboardTab
          href={`/dashboard/${slug}?tab=analytics`}
          label="Analytics"
        />
        <DashboardTab
          href={`/dashboard/${slug}?tab=card`}
          label="Card Editor"
        />
        <DashboardTab
          href={`/dashboard/${slug}?tab=embed`}
          label="Embed Code"
        />
        <DashboardTab
          href={`/dashboard/${slug}?tab=settings`}
          label="Settings"
        />
      </nav>

      {/* Content */}
      <section className="dashboard-content" aria-live="polite">
        <p className="dashboard-placeholder">
          Select a tab above to manage your business.
        </p>

        {/* Quick Links */}
        <div className="dashboard-quick-links">
          <Link
            href={`/business/${slug}`}
            className="dashboard-btn"
            aria-label="View public business page"
          >
            View Public Page
          </Link>

          <Link
            href={`/card/${slug}?embed=1`}
            className="dashboard-btn"
            aria-label="Preview business card"
          >
            Preview Card
          </Link>

          <Link
            href={`/business/${slug}/embed-code`}
            className="dashboard-btn"
            aria-label="View embed code"
          >
            Embed Code
          </Link>
        </div>
      </section>
    </main>
  );
}

function DashboardTab({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`dashboard-tab ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
