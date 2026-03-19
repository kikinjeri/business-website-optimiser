// app/dashboard/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import "@/styles/styles.css";
import Link from "next/link";

export default async function DashboardOverviewPage() {
  const supabase = await supabaseServer();

  // Fetch all businesses
  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, slug, status, created_at");

  if (!businesses || businesses.length === 0) {
    return (
      <main className="dashboard-page" role="main">
        <h1 className="dashboard-title">Dashboard</h1>
        <p>No businesses found.</p>
      </main>
    );
  }

  // Sort alphabetically
  businesses.sort((a, b) => a.name.localeCompare(b.name));

  // Fetch analytics events for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events } = await supabase
    .from("analytics_events")
    .select("business_id, event_type, created_at")
    .gte("created_at", thirtyDaysAgo.toISOString());

  const summaries = computeSummaries(businesses, events ?? []);

  // Global KPIs
  const totalBusinesses = businesses.length;
  const totalViews = summaries.reduce((sum, s) => sum + s.views30d, 0);
  const totalClicks = summaries.reduce((sum, s) => sum + s.clicks30d, 0);
  const avgCtr =
    totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;

  return (
    <main className="dashboard-page" role="main">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      {/* KPI cards */}
      <section className="panel kpi-grid">
        <KPI label="Total businesses" value={totalBusinesses} />
        <KPI label="Views (30 days)" value={totalViews} />
        <KPI label="CTA clicks (30 days)" value={totalClicks} />
        <KPI label="Average CTR" value={`${avgCtr}%`} />
      </section>

      {/* Business list */}
      <section className="panel">
        <div className="panel-header">
          <h2>Businesses</h2>
        </div>

        <div className="business-list">
          {summaries.map((s) => (
            <div key={s.id} className="business-row">
              {/* Left: Business name */}
              <div className="business-row-main">
                <Link
                  href={`/business/${s.slug}`}
                  className="business-name-link"
                >
                  {s.name}
                </Link>
                <span className={`status-badge status-${s.status ?? "draft"}`}>
                  {s.status ?? "Draft"}
                </span>
              </div>

              {/* Middle: Side-by-side analytics */}
              <div className="business-row-stats">
                <div className="stat-block">
                  <span className="stat-title">Card</span>
                  <span className="stat-line">
                    {s.views30d} views • {s.clicks30d} clicks • {s.ctr}% CTR
                  </span>
                </div>

                <div className="stat-block">
                  <span className="stat-title">Embed</span>
                  <span className="stat-line">
                    {s.views30d} views • {s.clicks30d} clicks • {s.ctr}% CTR
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* ANALYTICS SUMMARY LOGIC */
/* -------------------------------------------------------------------------- */

function computeSummaries(businesses, events) {
  return businesses.map((b) => {
    const ev = events.filter((e) => e.business_id === b.id);

    const views = ev.filter((e) => e.event_type === "view").length;
    const ctaCall = ev.filter((e) => e.event_type === "cta_call").length;
    const ctaQuote = ev.filter((e) => e.event_type === "cta_quote").length;
    const ctaDirections = ev.filter(
      (e) => e.event_type === "cta_directions",
    ).length;
    const ctaWebsite = ev.filter((e) => e.event_type === "cta_website").length;

    const clicks = ctaCall + ctaQuote + ctaDirections + ctaWebsite;
    const ctr = views > 0 ? Math.round((clicks / views) * 100) : 0;

    return {
      id: b.id,
      name: b.name,
      slug: b.slug,
      status: b.status,
      views30d: views,
      clicks30d: clicks,
      ctr,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS */
/* -------------------------------------------------------------------------- */

function KPI({ label, value }) {
  return (
    <div className="kpi-block">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
    </div>
  );
}
