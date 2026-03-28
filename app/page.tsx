// app/page.tsx
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Business Web Optimiser",
  description:
    "Learn about Mwihaki, an Ottawa-based developer helping showcase local businesses online with accessible, SEO-friendly profiles.",
};

export default function HomePage() {
  return (
    <main role="main">
      {/* HERO — full‑bleed gradient, split layout */}
      <header className="hero-full hero-gradient" role="banner">
        <div className="hero-container">
          {/* LEFT SIDE — text */}
          <div className="hero-text">
            {/* App name — main H1 */}
            <h1 className="hero-app-name">Business Web Optimiser</h1>

            {/* Eyebrow */}
            <p className="hero-eyebrow">
              Increase traffic to your business website
            </p>

            {/* Main headline — H2 */}
            <h2 className="hero-title">
              Structured and semantic HTML.
              <span className="accent"> Search Engine Optimised. </span>
            </h2>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Your business card becomes a high‑performance mini website — fast,
              consistent, and built for modern SEO.
            </p>

            {/* CTA — left aligned */}
            <div className="hero-actions">
              <Link
                href="#card-explainer"
                className="hero-btn-secondary hero-btn-single"
              >
                Boost Traffic
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE — premium business card */}
          <div className="hero-card-wrapper">
            <p className="hero-card-label">Sample Business Card</p>
            <div className="hero-card-scale">
              <DemoBusinessCard />
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1 — What the card is */}
      <section id="card-explainer" className="section centered">
        <h2 className="section-heading accent">Built for the modern web.</h2>

        <p className="section-subtitle">
          A single, accessible card you can embed anywhere — designed to boost
          visibility and clicks.
        </p>

        <div className="value-grid">
          <div className="value-block">
            <h3>SEO‑ready</h3>
            <p>
              Optimised markup helps your site rank higher in search results.
            </p>
          </div>

          <div className="value-block">
            <h3>Accessible</h3>
            <p>WCAG‑minded design ensures your card works for everyone.</p>
          </div>

          <div className="value-block">
            <h3>Consistent everywhere</h3>
            <p>
              One source of truth keeps your brand aligned across platforms.
            </p>
          </div>

          <div className="value-block">
            <h3>Mobile‑friendly</h3>
            <p>Responsive layouts deliver a smooth experience on any device.</p>
          </div>
        </div>

        <h3 className="section-heading accent">
          Built to help customers find you.
        </h3>

        <div className="value-grid">
          <div className="value-block">
            <h3>Search Visibility</h3>
            <p>
              Clean HTML and structured data help Google understand your
              business.
            </p>
          </div>

          <div className="value-block">
            <h3>Inclusive Design</h3>
            <p>WCAG‑minded structure ensures your card works for everyone.</p>
          </div>

          <div className="value-block">
            <h3>Consistency</h3>
            <p>
              One source of truth across platforms keeps your brand aligned.
            </p>
          </div>

          <div className="value-block">
            <h3>Conversion Power</h3>
            <p>Fast, responsive pages encourage customers to click and act.</p>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-row">
        <div className="trust-badge">⚡ Lightning‑Fast</div>
        <div className="trust-badge">🔍 Search‑Optimised</div>
        <div className="trust-badge">♿ Accessibility‑First</div>
        <div className="trust-badge">📱 Mobile‑Ready</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DEMO CARD                                    */
/* -------------------------------------------------------------------------- */

function DemoBusinessCard() {
  return (
    <article
      className="demo-card"
      aria-label="Demo business card for Ottawa Electric Pros"
    >
      {/* Gradient border wrapper */}
      <div className="demo-card-border">
        <div className="demo-card-inner">
          {/* Header */}
          <header className="demo-card-header">
            <h3 className="demo-card-title">Ottawa Electric Pros</h3>
            <p className="demo-card-tagline">
              Fast, reliable electrical services for homes & businesses.
            </p>
            <p className="demo-card-status accent">Open Now</p>
          </header>

          {/* Details */}
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
              <dd>www.ottawapros.example</dd>
            </div>

            <div className="detail-row">
              <dt>Hours</dt>
              <dd>Open 24/7</dd>
            </div>

            <div className="detail-row">
              <dt>Service Area</dt>
              <dd>Ottawa</dd>
            </div>
          </dl>

          {/* CTAs */}
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
