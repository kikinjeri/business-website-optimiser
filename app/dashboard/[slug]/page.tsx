// File: app/dashboard/[slug]/page.tsx
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
  const { data: business, error } = await supabase
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
      views_total,
      views_30d,
      clicks_phone,
      clicks_website,
      clicks_map,
      seo_title,
      seo_description,
      seo_keywords
    `,
    )
    .eq("slug", slug)
    .single();

  if (!business) {
    return (
      <main className="dashboard-page">
        <h1>Business not found</h1>
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
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">{business.name}</h1>
        <p className="dashboard-subtitle">
          Manage your business, analytics, card, and settings.
        </p>
      </header>

      {/* TAB NAVIGATION */}
      <nav className="dashboard-tabs" aria-label="Dashboard navigation">
        <Link href={`/dashboard/${slug}`} className="dashboard-tab active">
          Overview
        </Link>
        <Link
          href={`/dashboard/${slug}?tab=analytics`}
          className="dashboard-tab"
        >
          Analytics
        </Link>
        <Link href={`/dashboard/${slug}?tab=card`} className="dashboard-tab">
          Card Editor
        </Link>
        <Link href={`/dashboard/${slug}?tab=embed`} className="dashboard-tab">
          Embed Code
        </Link>
        <Link
          href={`/dashboard/${slug}?tab=settings`}
          className="dashboard-tab"
        >
          Settings
        </Link>
      </nav>

      {/* TAB CONTENT */}
      <section className="dashboard-content">
        {/* We will replace this with real tab components */}
        <p>Select a tab above to manage your business.</p>

        <div className="dashboard-quick-links">
          <Link href={`/business/${slug}`} className="dashboard-btn">
            View Public Page
          </Link>
          <Link href={`/card/${slug}?embed=1`} className="dashboard-btn">
            Preview Card
          </Link>
          <Link href={`/business/${slug}/embed-code`} className="dashboard-btn">
            Embed Code
          </Link>
        </div>
      </section>
    </main>
  );
}
