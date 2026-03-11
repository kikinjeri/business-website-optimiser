export default function DashboardPage() {
  return (
    <main className="dashboard-container">
      <div className="dashboard-inner">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>
            Navigate your business tools, pages, embeds, and analytics — all in
            one place.
          </p>
        </header>

        <section aria-label="Dashboard navigation" className="dashboard-grid">
          <DashboardCard
            title="Business Directory"
            description="Browse all businesses in a clean, SEO‑optimized directory."
            href="/directory"
          />

          <DashboardCard
            title="About"
            description="Understand the mission and accessibility‑first philosophy."
            href="/about"
          />

          <DashboardCard
            title="Embed Code"
            description="Generate iframe embed code for any business."
            href="/business/pest-control-ottawa/embed-code"
          />

          <DashboardCard
            title="Analytics"
            description="Track views, referrers, and performance for each business."
            href="/dashboard/analytics/pest-control-ottawa"
          />
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ title, description, href }) {
  return (
    <a href={href} className="dashboard-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
