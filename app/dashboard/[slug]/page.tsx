// app/dashboard/[slug]/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";
import "@/styles/styles.css";

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const supabase = supabaseServer();

  // Fetch business
  const { data: business, error: businessError } = await supabase
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

  if (!business || businessError) {
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

  // Fetch analytics events (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events } = await supabase
    .from("analytics_events")
    .select("event_type, created_at")
    .eq("business_id", business.id)
    .gte("created_at", thirtyDaysAgo.toISOString());

  const analyticsSummary = computeAnalytics(events ?? []);

  return (
    <main role="main">
      <DashboardClient
        business={business}
        serviceAreas={serviceAreas}
        analytics={analyticsSummary}
      />
    </main>
  );
}

type AnalyticsEvent = {
  event_type: string;
  created_at: string;
};

type AnalyticsSummary = {
  views30d: number;
  totalViews: number;
  ctaCall: number;
  ctaQuote: number;
  ctaDirections: number;
  ctaWebsite: number;
  ctr: number;
};

function computeAnalytics(events: AnalyticsEvent[]): AnalyticsSummary {
  const views = events.filter((e) => e.event_type === "view").length;
  const ctaCall = events.filter((e) => e.event_type === "cta_call").length;
  const ctaQuote = events.filter((e) => e.event_type === "cta_quote").length;
  const ctaDirections = events.filter(
    (e) => e.event_type === "cta_directions",
  ).length;
  const ctaWebsite = events.filter(
    (e) => e.event_type === "cta_website",
  ).length;

  const totalClicks = ctaCall + ctaQuote + ctaDirections + ctaWebsite;
  const ctr = views > 0 ? Math.round((totalClicks / views) * 100) : 0;

  return {
    views30d: views,
    totalViews: views, // can expand to lifetime later
    ctaCall,
    ctaQuote,
    ctaDirections,
    ctaWebsite,
    ctr,
  };
}
