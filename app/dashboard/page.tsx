// app/dashboard/page.tsx
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="dashboard-container" role="main">
      <div className="dashboard-inner">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Your control center — manage businesses, view analytics, and access
            tools from one place.
          </p>
        </header>

        {/* Tools Section */}
        <section
          aria-labelledby="dashboard-tools-title"
          className="dashboard-grid-section"
        >
          <h2 id="dashboard-tools-title" className="dashboard-section-title">
            Your Tools
          </h2>

          <div className="dashboard-grid">
            <DashboardCard
              title="Business Directory"
              description="Browse and manage all businesses in a clean, SEO‑optimized directory."
              href="/business"
            />

            <DashboardCard
              title="Embed Code"
              description="Generate and preview iframe embed code for any business."
              href="/business/pest-control-ottawa/embed-code"
            />

            <DashboardCard
              title="Analytics"
              description="Track views, CTA clicks, and performance for each business."
              href="/dashboard/analytics/pest-control-ottawa"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="dashboard-card"
      aria-label={`${title} — ${description}`}
    >
      <h3 className="dashboard-card-title">{title}</h3>
      <p className="dashboard-card-description">{description}</p>
    </Link>
  );
}
