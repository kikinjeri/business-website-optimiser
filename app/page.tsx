// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main role="main">
      {/* HERO — full‑bleed gradient, split layout */}
      <header className="hero-full hero-gradient" role="banner">
        <div className="hero-container">
          {/* LEFT SIDE — text */}
          <div className="hero-text">
            <p className="hero-eyebrow">Increase traffic to your business website</p>

            <h1 className="hero-title">
              Clean code. Fast pages. Accessible by design.
              <span className="accent"> Built to rank.</span>
            </h1>

            <p className="hero-subtitle">
              Your business card becomes a high‑performance mini website — fast,
              consistent, and built for modern SEO.
            </p>

            <div className="hero-actions">
              <Link href="/dashboard" className="hero-btn-primary">
                Go to Dashboard
              </Link>
              <Link href="#card-explainer" className="hero-btn-secondary">
                View Demo Card
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE — premium business card */}
          <div className="hero-card-wrapper">
            <DemoBusinessCard />
          </div>
        </div>
      </header>

      {/* SECTION 1 — What the card is */}
      <section id="card-explainer" className="section centered">
        <h2 className="section-heading accent">
          Your business card, rebuilt for the modern web.
        </h2>

        <p className="section-subtitle">
          A single, accessible card you can embed anywhere.
        </p>

        <div className="horizontal-points">
          <div className="point">SEO‑ready</div>
          <div className="point">Accessible</div>
          <div className="point">Consistent everywhere</div>
        </div>
      </section>

      {/* SECTION 2 — Why it helps your business */}
      <section className="section centered section-muted">
        <h2 className="section-heading accent">
          Built to help customers find you.
        </h2>

        <div className="value-grid">
          <div className="value-block">
            <h3>Search visibility</h3>
            <p>Clean HTML helps Google understand your business.</p>
          </div>

          <div className="value-block">
            <h3>Accessibility</h3>
            <p>WCAG‑minded structure works for everyone.</p>
          </div>

          <div className="value-block">
            <h3>Consistency</h3>
            <p>One source of truth across the web.</p>
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
      aria-label="Demo business card for Ottawa Pest Pros"
    >
      {/* Gradient border wrapper */}
      <div className="demo-card-border">
        <div className="demo-card-inner">
          {/* Header */}
          <header className="demo-card-header">
            <h3 className="demo-card-title">Ottawa Pest Pros</h3>
            <p className="demo-card-tagline">
              Fast, reliable pest control for homes & businesses.
            </p>
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
              <dd>ottawapestpros.example</dd>
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
