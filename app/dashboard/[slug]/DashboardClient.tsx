"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { updateBusiness } from "./actions/updateBusiness";
import { updateServiceAreas } from "./actions/updateServiceAreas";
import { updateSEO } from "./actions/updateSEO";

type Business = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  neighborhood: string | null;
  status: string | null;
  tagline_en: string | null;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours_json: any;
  is_accessible: boolean | null;
  supports_screen_readers: boolean | null;
  supports_keyboard_navigation: boolean | null;
  theme_primary: string | null;
  theme_accent: string | null;
  theme_text: string | null;
  theme_background: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
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

type TabId = "overview" | "edit" | "embed" | "analytics" | "settings";

export default function DashboardClient({
  business,
  serviceAreas,
  analytics,
}: {
  business: Business;
  serviceAreas: string[];
  analytics: AnalyticsSummary;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isPending, startTransition] = useTransition();

  // Local state for live preview
  const [name, setName] = useState(business.name);
  const [tagline, setTagline] = useState(business.tagline_en ?? "");
  const [address, setAddress] = useState(business.address ?? "");
  const [phone, setPhone] = useState(business.phone ?? "");
  const [website, setWebsite] = useState(business.website_url ?? "");

  return (
    <div className="dashboard-shell">
      {/* Sidebar (desktop) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <p className="sidebar-label">Business</p>
          <h1 className="sidebar-title">{business.name}</h1>
          <span className="status-pill status-pill--published">
            {business.status ?? "Draft"}
          </span>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          <SidebarLink label="Overview" tabId="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink label="Edit Card" tabId="edit" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink label="Embed Code" tabId="embed" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink label="Analytics" tabId="analytics" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarLink label="Settings" tabId="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="sidebar-footer">
          <Link href={`/card/${business.slug}`} className="sidebar-footer-link">
            View live card
          </Link>
          <button
            className="sidebar-footer-link"
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(`${window.location.origin}/card/${business.slug}`)
            }
          >
            Copy public URL
          </button>
        </div>
      </aside>

      {/* Main content */}
      <section className="dashboard-main">
        {/* Mobile tabs */}
        <div className="dashboard-tabs" aria-label="Dashboard navigation">
          <TabPill label="Overview" tabId="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabPill label="Edit" tabId="edit" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabPill label="Embed" tabId="embed" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabPill label="Analytics" tabId="analytics" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabPill label="Settings" tabId="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <OverviewPanel
              business={business}
              analytics={analytics}
              name={name}
              tagline={tagline}
              address={address}
              phone={phone}
              website={website}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "edit" && (
            <EditCardPanel
              business={business}
              serviceAreas={serviceAreas}
              name={name}
              setName={setName}
              tagline={tagline}
              setTagline={setTagline}
              address={address}
              setAddress={setAddress}
              phone={phone}
              setPhone={setPhone}
              website={website}
              setWebsite={setWebsite}
              isPending={isPending}
              startTransition={startTransition}
            />
          )}

          {activeTab === "embed" && (
            <EmbedPanel business={business} name={name} tagline={tagline} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsPanel analytics={analytics} />
          )}

          {activeTab === "settings" && (
            <SettingsPanel
              business={business}
              serviceAreas={serviceAreas}
              isPending={isPending}
              startTransition={startTransition}
            />
          )}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* NAV COMPONENTS */
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
/* PANELS */
/* -------------------------------------------------------------------------- */

function OverviewPanel({
  business,
  analytics,
  name,
  tagline,
  address,
  phone,
  website,
  setActiveTab,
}: {
  business: Business;
  analytics: AnalyticsSummary;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  website: string;
  setActiveTab: (t: TabId) => void;
}) {
  return (
    <div className="panel-grid">
      <section className="panel">
        <div className="panel-header">
          <h2>Business card</h2>
          <Link href={`/card/${business.slug}`} className="panel-link">
            Open full card
          </Link>
        </div>
        <DemoBusinessCard
          name={name}
          tagline={tagline}
          address={address}
          phone={phone}
          website={website}
        />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Overview</h2>
        </div>
        <div className="stats-grid">
          <StatBlock label="Views (30 days)" value={analytics.views30d} />
          <StatBlock
            label="CTA clicks (30 days)"
            value={
              analytics.ctaCall +
              analytics.ctaQuote +
              analytics.ctaDirections +
              analytics.ctaWebsite
            }
          />
          <StatBlock label="CTR" value={`${analytics.ctr}%`} />
        </div>
        <div className="panel-actions">
          <button type="button" className="panel-btn" onClick={() => setActiveTab("edit")}>
            Edit card
          </button>
          <button type="button" className="panel-btn" onClick={() => setActiveTab("embed")}>
            Copy embed code
          </button>
          <button
            type="button"
            className="panel-btn panel-btn--ghost"
            onClick={() => setActiveTab("analytics")}
          >
            Open analytics
          </button>
        </div>
        <p className="panel-meta">
          Status: {business.status ?? "Draft"} • Slug: {business.slug}
        </p>
      </section>
    </div>
  );
}

function EditCardPanel({
  business,
  serviceAreas,
  name,
  setName,
  tagline,
  setTagline,
  address,
  setAddress,
  phone,
  setPhone,
  website,
  setWebsite,
  isPending,
  startTransition,
}: {
  business: Business;
  serviceAreas: string[];
  name: string;
  setName: (v: string) => void;
  tagline: string;
  setTagline: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}) {
  return (
    <div className="panel-grid panel-grid--edit">
      <section className="panel">
        <div className="panel-header">
          <h2>Live preview</h2>
        </div>
        <DemoBusinessCard
          name={name}
          tagline={tagline}
          address={address}
          phone={phone}
          website={website}
        />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Edit business card</h2>
        </div>

        <form
          action={updateBusiness}
          className="edit-form"
          onSubmit={() => startTransition(() => {})}
        >
          <input type="hidden" name="id" value={business.id} />
          <input type="hidden" name="slug" value={business.slug} />

          <Field label="Business name" name="name" value={name} onChange={setName} />
          <Field label="Tagline" name="tagline_en" value={tagline} onChange={setTagline} />
          <Field label="Address" name="address" value={address} onChange={setAddress} />
          <Field label="Phone" name="phone" value={phone} onChange={setPhone} />
          <Field label="Website" name="website_url" value={website} onChange={setWebsite} />

          <Field
            label="Service areas (comma‑separated)"
            name="service_areas"
            defaultValue={serviceAreas.join(", ")}
          />

          <button type="submit" className="panel-btn" disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </form>

        <form
          action={updateServiceAreas}
          className="edit-form edit-form--secondary"
          onSubmit={() => startTransition(() => {})}
        >
          <input type="hidden" name="business_id" value={business.id} />
          <input type="hidden" name="slug" value={business.slug} />

          <Field
            label="Service areas (override, comma‑separated)"
            name="service_areas"
            defaultValue={serviceAreas.join(", ")}
            as="textarea"
          />

          <button type="submit" className="panel-btn panel-btn--ghost" disabled={isPending}>
            {isPending ? "Updating areas..." : "Update service areas"}
          </button>
        </form>
      </section>
    </div>
  );
}

function EmbedPanel({
  business,
  name,
  tagline,
}: {
  business: Business;
  name: string;
  tagline: string;
}) {
  const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com"}/card/${business.slug}" style="border:0;width:100%;max-width:420px;height:360px;" loading="lazy"></iframe>`;

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Embed code</h2>
      </div>

      <p className="panel-description">
        Use this snippet to embed the business card on any website or landing page.
      </p>

      <div className="embed-actions">
        <button
          type="button"
          className="panel-btn"
          onClick={() => navigator.clipboard.writeText(embedCode)}
        >
          Copy embed code
        </button>

        <button
          type="button"
          className="panel-btn panel-btn--ghost"
          onClick={() =>
            navigator.clipboard.writeText(`${window.location.origin}/card/${business.slug}`)
          }
        >
          Copy public URL
        </button>
      </div>

      <pre className="embed-code">
        <code>{embedCode}</code>
      </pre>

      <div className="panel-subsection">
        <h3>Preview</h3>
        <DemoBusinessCard
          name={name}
          tagline={tagline}
          address={business.address ?? ""}
          phone={business.phone ?? ""}
          website={business.website_url ?? ""}
        />
      </div>
    </section>
  );
}

function AnalyticsPanel({ analytics }: { analytics: AnalyticsSummary }) {
  const totalClicks =
    analytics.ctaCall +
    analytics.ctaQuote +
    analytics.ctaDirections +
    analytics.ctaWebsite;

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Analytics</h2>
      </div>

      <p className="panel-description">
        Simple, privacy‑minded analytics for this business card.
      </p>

      <div className="stats-grid stats-grid--wide">
        <StatBlock label="Views (30 days)" value={analytics.views30d} />
        <StatBlock label="Total clicks (30 days)" value={totalClicks} />
        <StatBlock label="CTR" value={`${analytics.ctr}%`} />
        <StatBlock label="Call clicks" value={analytics.ctaCall} />
        <StatBlock label="Quote clicks" value={analytics.ctaQuote} />
        <StatBlock label="Directions" value={analytics.ctaDirections} />
        <StatBlock label="Website visits" value={analytics.ctaWebsite} />
      </div>

      <div className="chart-placeholder">
        <p>Traffic over time (chart coming soon).</p>
      </div>
    </section>
  );
}

function SettingsPanel({
  business,
  serviceAreas,
  isPending,
  startTransition,
}: {
  business: Business;
  serviceAreas: string[];
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Settings</h2>
      </div>

      <form
        action={updateSEO}
        className="edit-form"
        onSubmit={() => startTransition(() => {})}
      >
        <input type="hidden" name="id" value={business.id} />
        <input type="hidden" name="slug" value={business.slug} />

        <Field label="Slug" name="slug" defaultValue={business.slug} readOnly />
        <Field label="Category" name="category" defaultValue={business.category ?? ""} />
        <Field label="Neighborhood" name="neighborhood" defaultValue={business.neighborhood ?? ""} />

        <Field label="SEO title" name="seo_title" defaultValue={business.seo_title ?? ""} />

        <Field
          label="SEO description"
          name="seo_description"
          as="textarea"
          defaultValue={business.seo_description ?? ""}
        />

        <Field
          label="SEO keywords (comma‑separated)"
          name="seo_keywords"
          defaultValue={business.seo_keywords ?? ""}
        />

        <Field
          label="Service areas (comma‑separated)"
          name="service_areas"
          defaultValue={serviceAreas.join(", ")}
        />

        <button type="submit" className="panel-btn" disabled={isPending}>
          {isPending ? "Saving..." : "Save settings"}
        </button>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS */
/* -------------------------------------------------------------------------- */

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat-block">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  defaultValue,
  as = "input",
  readOnly = false,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (v: string) => void;
  defaultValue?: string;
  as?: "input" | "textarea";
  readOnly?: boolean;
}) {
  const commonProps = {
    name,
    readOnly,
    defaultValue,
  };

  return (
    <label className="field">
      <span className="field-label">{label}</span>

      {as === "textarea" ? (
        <textarea
          className="field-control field-control--textarea"
          {...commonProps}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      ) : (
        <input
          className="field-control"
          {...commonProps}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* DEMO CARD */
/* -------------------------------------------------------------------------- */

function DemoBusinessCard({
  name,
  tagline,
  address,
  phone,
  website,
}: {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  website: string;
}) {
  return (
    <article
      className="demo-card"
      aria-label={`Demo business card for ${name}`}
    >
      <div className="demo-card-border">
        <div className="demo-card-inner">
          <header className="demo-card-header">
            <h3 className="demo-card-title">{name}</h3>
            <p className="demo-card-tagline">{tagline}</p>
          </header>

          <dl className="demo-card-details">
            <div className="detail-row">
              <dt>Location</dt>
              <dd>{address}</dd>
            </div>
            <div className="detail-row">
              <dt>Phone</dt>
              <dd>{phone}</dd>
            </div>
            <div className="detail-row">
              <dt>Website</dt>
              <dd>{website}</dd>
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
