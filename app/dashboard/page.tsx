import { supabaseServer } from "@/lib/supabase/server";
import "@/styles/styles.css";
import Link from "next/link";

export default async function DashboardOverviewPage() {
  const supabase = await supabaseServer();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, slug, status, phone, address, category, created_at");

  const searchParams = new URLSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const filtered = businesses?.filter((b) => {
    const haystack = [b.name, b.address, b.phone, b.category, b.slug]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchQuery);
  });

  const sorted = filtered?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events } = await supabase
    .from("analytics_events")
    .select("business_id, event_type, created_at")
    .gte("created_at", thirtyDaysAgo.toISOString());

  const summaries = computeSummaries(sorted, events ?? []);

  const totalBusinesses = sorted.length;
  const totalViews = summaries.reduce((sum, s) => sum + s.views30d, 0);
  const totalClicks = summaries.reduce((sum, s) => sum + s.clicks30d, 0);
  const avgCtr =
    totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;

  return (
    <div className="dashboard-fullwidth">
      {/* TOP NAV */}
      <header className="dashboard-topnav">
        <Link href="/dashboard" className="topnav-link topnav-link--active">
          Dashboard
        </Link>
        <Link href="/business" className="topnav-link">
          Directory
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-mainwide">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        {/* SEARCH BAR */}
        <form className="dashboard-searchbar">
          <input
            type="text"
            name="q"
            placeholder="Search by name, address, phone, or category..."
            className="search-input"
            defaultValue={searchQuery}
          />
          <button className="search-btn">Search</button>
        </form>

        <div className="dashboard-content">
          {/* KPI PANEL */}
          <section className="panel">
            <div className="stats-grid stats-grid--wide">
              <KPI label="Total businesses" value={totalBusinesses} />
              <KPI label="Views (30 days)" value={totalViews} />
              <KPI label="CTA clicks (30 days)" value={totalClicks} />
              <KPI label="Average CTR" value={`${avgCtr}%`} />
            </div>
          </section>

          {/* BUSINESS LIST */}
          <section className="panel">
            <div className="panel-header">
              <h2>Businesses</h2>
            </div>

            <div className="business-list">
              {summaries.map((s) => (
                <div key={s.id} className="business-row">
                  {/* LEFT: NAME + STATUS */}
                  <div className="business-row-main">
                    <Link
                      href={`/business/${s.slug}`}
                      className="business-name-link"
                    >
                      {s.name}
                    </Link>
                    <span
                      className={`status-pill status-${s.status ?? "draft"}`}
                    >
                      {s.status ?? "Draft"}
                    </span>
                  </div>

                  {/* RIGHT: ANALYTICS */}
                  <div className="business-row-stats">
                    <div className="stat-block">
                      <span className="stat-label">Views</span>
                      <span className="stat-value">{s.views30d}</span>
                    </div>

                    <div className="stat-block">
                      <span className="stat-label">Clicks</span>
                      <span className="stat-value">{s.clicks30d}</span>
                    </div>

                    <div className="stat-block">
                      <span className="stat-label">CTR</span>
                      <span className="stat-value">{s.ctr}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
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
/* KPI COMPONENT */
/* -------------------------------------------------------------------------- */

function KPI({ label, value }) {
  return (
    <div className="stat-block">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
