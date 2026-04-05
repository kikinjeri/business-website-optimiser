// app/dashboard/[slug]/DashboardClient.tsx
"use client";

import "@/styles/styles.css";
import Link from "next/link";
import { useMemo } from "react";

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
  hours_json: any | null;
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

type DashboardClientProps = {
  business: Business;
  serviceAreas: string[];
  analytics: AnalyticsSummary;
};

export default function DashboardClient({
  business,
  serviceAreas,
  analytics,
}: DashboardClientProps) {
  const topCta = useMemo(() => {
    const entries: { label: string; value: number }[] = [
      { label: "Call", value: analytics.ctaCall },
      { label: "Quote", value: analytics.ctaQuote },
      { label: "Directions", value: analytics.ctaDirections },
      { label: "Website", value: analytics.ctaWebsite },
    ];
    const best = entries.reduce(
      (max, curr) => (curr.value > max.value ? curr : max),
      { label: "None", value: 0 },
    );
    return best.value > 0 ? best.label : "None yet";
  }, [analytics]);

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">{business.name}</h1>
          <p className="dashboard-subtitle">
            Private performance view for this business card.
          </p>
        </div>
        <div className="dashboard-header-actions">
          {business.website_url && (
            <a
              href={business.website_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              View website
            </a>
          )}
          <Link
            href={`/business/${business.slug}`}
            className="btn btn-primary"
            target="_blank"
          >
            View public card
          </Link>
        </div>
      </header>

      <div className="dashboard-scroll-container">
        {/* Row 1: Business card + business analytics */}
        <section className="dashboard-row">
          <div className="panel panel-card">
            <h2 className="panel-title">Business card</h2>
            <p className="panel-description">
              This is how your card appears in the public directory.
            </p>
            <DemoBusinessCard business={business} serviceAreas={serviceAreas} />
            <BusinessMeta business={business} serviceAreas={serviceAreas} />
          </div>

          <div className="panel panel-analytics">
            <h2 className="panel-title">Card analytics (last 30 days)</h2>
            <p className="panel-description">
              High‑level performance of your public business card.
            </p>

            <div className="stats-grid stats-grid--wide">
              <StatBlock label="Views" value={analytics.views30d} />
              <StatBlock
                label="CTA clicks"
                value={
                  analytics.ctaCall +
                  analytics.ctaQuote +
                  analytics.ctaDirections +
                  analytics.ctaWebsite
                }
              />
              <StatBlock label="CTR" value={`${analytics.ctr}%`} />
              <StatBlock label="Top CTA" value={topCta} />
            </div>

            <div className="chart-placeholder">
              <p className="chart-placeholder-title">Traffic over time</p>
              <p className="chart-placeholder-subtitle">
                A time‑series chart of views and clicks will appear here.
              </p>
            </div>

            <InsightsBlock analytics={analytics} topCta={topCta} />
          </div>
        </section>

        {/* Row 2: Embed code + embed analytics (for now, reuse same analytics) */}
        <section className="dashboard-row">
          <div className="panel panel-card">
            <h2 className="panel-title">Embed code</h2>
            <p className="panel-description">
              Add this card to your own website using the embed snippet.
            </p>
            <EmbedCodeBlock slug={business.slug} />
          </div>

          <div className="panel panel-analytics">
            <h2 className="panel-title">Embed analytics</h2>
            <p className="panel-description">
              Performance of this card when embedded on external sites.
            </p>

            <div className="stats-grid stats-grid--wide">
              <StatBlock label="Embed views" value={analytics.views30d} />
              <StatBlock
                label="Embed CTA clicks"
                value={
                  analytics.ctaCall +
                  analytics.ctaQuote +
                  analytics.ctaDirections +
                  analytics.ctaWebsite
                }
              />
              <StatBlock label="Embed CTR" value={`${analytics.ctr}%`} />
              <StatBlock label="Top CTA (embed)" value={topCta} />
            </div>

            <div className="chart-placeholder">
              <p className="chart-placeholder-title">Embed traffic over time</p>
              <p className="chart-placeholder-subtitle">
                Once embed‑specific tracking is enabled, this chart will show
                embed‑only traffic.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PRESENTATION COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

function StatBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="stat-block">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

function DemoBusinessCard({
  business,
  serviceAreas,
}: {
  business: Business;
  serviceAreas: string[];
}) {
  return (
    <article className="demo-card" aria-label="Business card preview">
      <header className="demo-card-header">
        <h3 className="demo-card-title">{business.name}</h3>
        {business.tagline_en && (
          <p className="demo-card-tagline">{business.tagline_en}</p>
        )}
      </header>
      <div className="demo-card-body">
        {business.address && (
          <p className="demo-card-line">
            <span className="demo-card-label">Address:</span>{" "}
            <span>{business.address}</span>
          </p>
        )}
        {business.phone && (
          <p className="demo-card-line">
            <span className="demo-card-label">Phone:</span>{" "}
            <span>{business.phone}</span>
          </p>
        )}
        {business.website_url && (
          <p className="demo-card-line">
            <span className="demo-card-label">Website:</span>{" "}
            <span>{business.website_url}</span>
          </p>
        )}
        {serviceAreas.length > 0 && (
          <p className="demo-card-line">
            <span className="demo-card-label">Service areas:</span>{" "}
            <span>{serviceAreas.join(", ")}</span>
          </p>
        )}
      </div>
    </article>
  );
}

function BusinessMeta({
  business,
  serviceAreas,
}: {
  business: Business;
  serviceAreas: string[];
}) {
  return (
    <div className="panel-meta">
      <dl className="meta-grid">
        <div>
          <dt>Status</dt>
          <dd>{business.status ?? "Draft"}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{business.category ?? "Uncategorized"}</dd>
        </div>
        <div>
          <dt>Neighborhood</dt>
          <dd>{business.neighborhood ?? "Not set"}</dd>
        </div>
        <div>
          <dt>Slug</dt>
          <dd>{business.slug}</dd>
        </div>
        <div>
          <dt>Accessibility</dt>
          <dd>
            {business.is_accessible ? "Accessible" : "Not marked accessible"}
          </dd>
        </div>
        <div>
          <dt>Service areas</dt>
          <dd>{serviceAreas.length > 0 ? serviceAreas.join(", ") : "None"}</dd>
        </div>
      </dl>
    </div>
  );
}

function EmbedCodeBlock({ slug }: { slug: string }) {
  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/business/${slug}`;
  const iframeCode = `<iframe src="${publicUrl}" loading="lazy" style="border:0;width:100%;height:420px;"></iframe>`;

  return (
    <div className="embed-block">
      <div className="embed-field">
        <label className="embed-label">Public URL</label>
        <div className="embed-input-row">
          <input
            readOnly
            value={publicUrl}
            className="embed-input"
            aria-label="Public URL"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigator.clipboard.writeText(publicUrl)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="embed-field">
        <label className="embed-label">Embed code</label>
        <div className="embed-input-row">
          <textarea
            readOnly
            value={iframeCode}
            className="embed-textarea"
            rows={3}
            aria-label="Embed code"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigator.clipboard.writeText(iframeCode)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

function InsightsBlock({
  analytics,
  topCta,
}: {
  analytics: AnalyticsSummary;
  topCta: string;
}) {
  const totalClicks =
    analytics.ctaCall +
    analytics.ctaQuote +
    analytics.ctaDirections +
    analytics.ctaWebsite;

  const insights: string[] = [];

  if (analytics.views30d === 0) {
    insights.push(
      "No views in the last 30 days yet. Share your card to get traffic.",
    );
  } else {
    insights.push(
      `Your card received ${analytics.views30d} views and ${totalClicks} CTA clicks in the last 30 days.`,
    );
    insights.push(`Current click‑through rate is ${analytics.ctr}%.`);
    if (topCta !== "None yet") {
      insights.push(`Top‑performing CTA is ${topCta}.`);
    }
  }

  return (
    <section className="insights-block" aria-label="Analytics insights">
      <h3 className="insights-title">Insights</h3>
      <ul className="insights-list">
        {insights.map((text, idx) => (
          <li key={idx} className="insights-item">
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
