import { supabaseServer } from "@/lib/supabase/server";
import "@/styles/styles.css";
import Link from "next/link";

export default async function DashboardOverviewPage({ searchParams }) {
  const supabase = await supabaseServer();

  const query = (searchParams?.q || "").toLowerCase().trim();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, slug, status, phone, address, category");

  // Smart search
  const filtered = businesses?.filter((b) => {
    const haystack = [
      b.name,
      b.address,
      b.phone,
      b.category,
      b.slug,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  const sorted = filtered?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  // Analytics
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: events } = await supabase
    .from("analytics_events")
    .select("business_id, event_type, created_at")
    .gte("created_at", thirtyDaysAgo.toISOString());

  const summaries = computeSummaries(sorted, events ?? []);

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

      <main className="dashboard-mainwide">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        {/* SEARCH BAR */}
        <form className="dashboard-searchbar" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Search by name, address, phone, or category..."
            className="search-input"
            defaultValue={query}
          />
          <button className="search-btn">Search</button>
        </form>

        {/* KPI PANEL */}
        <section className="panel">
          <div className="stats-grid stats-grid--wide">
            <KPI label="Total businesses" value={summaries.length} />
            <KPI
              label="Views (30 days)"
              value={summaries.reduce((s, x) => s + x.views30d, 0)}
            />
            <KPI
              label="Clicks (30 days)"
              value={summaries.reduce((s, x) => s + x.clicks30d, 0)}
            />
            <KPI
              label="Average CTR"
              value={
                summaries.reduce((s, x) => s + x.views30d, 0) > 0
                  ? `${Math.round(
                      (summaries.reduce((s, x) => s + x.clicks30d, 0) /
                        summaries.reduce((s, x) => s + x.views30d, 0)) *
                        100,
                    )}%`
                  : "0%"
              }
            />
          </div>
        </section>

        {/* BUSINESS TABLE */}
        <section className="panel">
          <div className="table-header">
            <div className="col-business">Business</div>
            <div className="col-card">Card</div>
            <div className="col-embed">Embed</div>
          </div>

          <div className="table-body">
            {summaries.map((s) => (
              <div key={s.id} className="table-row">
                {/* BUSINESS COLUMN */}
                <div className="col-business">
                  <Link href={`/business/${s.slug}`} className="business-name-link">
                    {s.name}
                  </Link>
                  <span className={`status-pill status-${s.status ?? "draft"}`}>
                    {s.status ?? "Draft"}
                  </span>
                </div>

                {/* CARD ANALYTICS */}
                <div className="col-card">
                  <span className="pill">Card</span>
                  <span className="metric">
                    {s.views30d} views • {s.clicks30d} clicks • {s.ctr}% CTR
                  </span>
                </div>

                {/* EMBED ANALYTICS */}
                <div className="col-embed">
                  <span className="pill">Embed</span>
                  <span className="metric">
                    {s.views30d} views • {s.clicks30d} clicks • {s.ctr}% CTR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function computeSummaries(businesses, events) {
  return businesses.map((b) => {
    const ev = events.filter((e) => e.business_id === b.id);

    const views = ev.filter((e) => e.event_type === "view").length;
    const clicks = ev.filter((e) => e.event_type.startsWith("cta_")).length;
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

function KPI({ label, value }) {
  return (
    <div className="stat-block">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
