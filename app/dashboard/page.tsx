"use client";

import { useState } from "react";
import Link from "next/link";

type TabId = "overview" | "edit" | "embed" | "analytics" | "settings";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <main className="dashboard-shell">
      {/* Sidebar (desktop) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <p className="sidebar-label">Business</p>
          <h1 className="sidebar-title">Ottawa Pest Pros</h1>
          <span className="status-pill status-pill--published">Published</span>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          <SidebarLink
            label="Overview"
            tabId="overview"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarLink
            label="Edit Card"
            tabId="edit"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarLink
            label="Embed Code"
            tabId="embed"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarLink
            label="Analytics"
            tabId="analytics"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarLink
            label="Settings"
            tabId="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </nav>

        <div className="sidebar-footer">
          <Link href="/card/ottawa-pest-pros" className="sidebar-footer-link">
            View live card
          </Link>
          <button className="sidebar-footer-link" type="button">
            Copy public URL
          </button>
        </div>
      </aside>

      {/* Main content */}
      <section className="dashboard-main">
        {/* Mobile tabs */}
        <div className="dashboard-tabs" aria-label="Dashboard navigation">
          <TabPill
            label="Overview"
            tabId="overview"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabPill
            label="Edit"
            tabId="edit"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabPill
            label="Embed"
            tabId="embed"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabPill
            label="Analytics"
            tabId="analytics"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabPill
            label="Settings"
            tabId="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "edit" && <EditCardPanel />}
          {activeTab === "embed" && <EmbedPanel />}
          {activeTab === "analytics" && <AnalyticsPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                               NAV COMPONENTS                               */
/* -------------------------------------------------------------------------- */

function SidebarLink({
  label,
  tabId,
  activeTab,
  setActiveTab,
}: {
  label: string;
  tabId: TabId;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}) {
  const isActive = activeTab === tabId;
  return (
    <button
      type="button"
      className={`sidebar-link ${isActive ? "sidebar-link--active" : ""}`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );
}

function TabPill({
  label,
  tabId,
  activeTab,
  setActiveTab,
}: {
  label: string;
  tabId: TabId;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}) {
  const isActive = activeTab === tabId;
  return (
    <button
      type="button"
      className={`tab-pill ${isActive ? "tab-pill--active" : ""}`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PANELS                                       */
/* -------------------------------------------------------------------------- */

function OverviewPanel() {
  return (
    <div className="panel-grid">
      <section className="panel">
        <div className="panel-header">
          <h2>Business card</h2>
          <button type="button" className="panel-link">
            Open full card
          </button>
        </div>
        <DemoBusinessCard />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Overview</h2>
        </div>
        <div className="stats-grid">
          <StatBlock label="Views" value="1,248" />
          <StatBlock label="CTA clicks" value="312" />
          <StatBlock label="CTR" value="25%" />
        </div>
        <div className="panel-actions">
          <button type="button" className="panel-btn">
            Edit card
          </button>
          <button type="button" className="panel-btn">
            Copy embed code
          </button>
          <button type="button" className="panel-btn panel-btn--ghost">
            Open analytics
          </button>
        </div>
        <p className="panel-meta">
          Last updated: 2 days ago • Status: Published
        </p>
      </section>
    </div>
  );
}

function EditCardPanel() {
  return (
    <div className="panel-grid panel-grid--edit">
      <section className="panel">
        <div className="panel-header">
          <h2>Live preview</h2>
        </div>
        <DemoBusinessCard />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Edit business card</h2>
        </div>
        <form className="edit-form">
          <Field label="Business name" defaultValue="Ottawa Pest Pros" />
          <Field
            label="Tagline"
            defaultValue="Fast, reliable pest control for homes & businesses."
          />
          <Field
            label="Address"
            defaultValue="123 Mapleview Drive, Ottawa, ON"
          />
          <Field label="Phone" defaultValue="(613) 555‑0192" />
          <Field label="Website" defaultValue="ottawapestpros.example" />
          <Field label="Service areas" defaultValue="Ottawa, Kanata, Nepean" />
          <Field label="Hours" defaultValue="Mon–Fri, 8am–6pm" />
          <Field label="Primary CTA label" defaultValue="Call Now" />
          <Field label="Secondary CTA label" defaultValue="Get a Quote" />
          <Field label="Tertiary CTA label" defaultValue="Directions" />
          <button type="button" className="panel-btn">
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
}

function EmbedPanel() {
  const embedCode = `<iframe src="https://yourdomain.com/card/ottawa-pest-pros" style="border:0;width:100%;max-width:420px;height:360px;" loading="lazy"></iframe>`;

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Embed code</h2>
      </div>
      <p className="panel-description">
        Use this snippet to embed the business card on any website or landing
        page.
      </p>
      <div className="embed-actions">
        <button type="button" className="panel-btn">
          Copy embed code
        </button>
        <button type="button" className="panel-btn panel-btn--ghost">
          Copy public URL
        </button>
      </div>
      <pre className="embed-code" aria-label="Embed code snippet">
        <code>{embedCode}</code>
      </pre>
      <div className="panel-subsection">
        <h3>Preview</h3>
        <DemoBusinessCard />
      </div>
    </section>
  );
}

function AnalyticsPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Analytics</h2>
      </div>
      <p className="panel-description">
        Simple, privacy‑minded analytics for this business card.
      </p>
      <div className="stats-grid stats-grid--wide">
        <StatBlock label="Views (30 days)" value="1,248" />
        <StatBlock label="CTA clicks (30 days)" value="312" />
        <StatBlock label="CTR" value="25%" />
        <StatBlock label="Call clicks" value="120" />
        <StatBlock label="Quote clicks" value="80" />
        <StatBlock label="Directions" value="60" />
        <StatBlock label="Website visits" value="52" />
      </div>
      {/* Placeholder for future chart */}
      <div className="chart-placeholder">
        <p>Traffic over time (chart coming soon).</p>
      </div>
    </section>
  );
}

function SettingsPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Settings</h2>
      </div>
      <form className="edit-form">
        <Field label="Slug" defaultValue="ottawa-pest-pros" />
        <Field label="Category" defaultValue="Pest Control" />
        <Field label="Internal notes" as="textarea" defaultValue="" />
        <div className="toggle-row">
          <span>Published</span>
          <button type="button" className="toggle-pill">
            On
          </button>
        </div>
        <button type="button" className="panel-btn">
          Save settings
        </button>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SMALL COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-block">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  as = "input",
}: {
  label: string;
  defaultValue?: string;
  as?: "input" | "textarea";
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {as === "textarea" ? (
        <textarea
          className="field-control field-control--textarea"
          defaultValue={defaultValue}
        />
      ) : (
        <input
          className="field-control"
          defaultValue={defaultValue}
          type="text"
        />
      )}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DEMO CARD                                    */
/* -------------------------------------------------------------------------- */

function DemoBusinessCard() {
  return (
    <article
      className="demo-card"
      aria-label="Demo business card for Ottawa Pest Pros"
    >
      <div className="demo-card-border">
        <div className="demo-card-inner">
          <header className="demo-card-header">
            <h3 className="demo-card-title">Ottawa Pest Pros</h3>
            <p className="demo-card-tagline">
              Fast, reliable pest control for homes & businesses.
            </p>
          </header>

          <dl className="demo-card-details">
            <div className="detail-row">
              <dt>Location</dt>
              <dd>123 Mapleview Drive, Ottawa, ON</dd>
            </div>
            <div className="detail-row">
              <dt>Phone</dt>
              <dd>(613) 555‑0192</dd>
            </div>
            <div className="detail-row">
              <dt>Website</dt>
              <dd>ottawapestpros.example</dd>
            </div>
          </dl>

          <div className="demo-card-ctas">
            <button className="demo-cta gradient-btn" disabled>
              Call Now
            </button>
            <button className="demo-cta gradient-btn" disabled>
              Get a Quote
            </button>
            <button className="demo-cta gradient-btn" disabled>
              Directions
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
