// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main-content">
      <nav className="navbar" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Business Website Optimiser
          </Link>

          <div className="nav-links">
            <Link href="/business">Businesses</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      <header className="app-hero" role="banner">
        <div className="app-hero-inner">
          <h1 className="app-hero-title">
            Increase your business website traffic.
            <span className="accent"> Make your information accessible to everyone.</span>
          </h1>

          <p className="app-hero-subtitle">
            Business Website Optimiser transforms your business details into fast, accessible, search‑ready pages and
            embeddable cards that bring more customers to your website—from Google, screen readers, and every device.
          </p>

          <div className="app-hero-actions">
            <Link href="/business" className="cta-primary">
              View Local Businesses
            </Link>
            <Link href="/about" className="cta-secondary">
              Why accessibility grows traffic
            </Link>
          </div>
        </div>

        <div className="app-preview-grid">
          <div className="preview-card">
            <h3>Search‑optimised pages</h3>
            <p>Clean, semantic HTML that helps Google understand your business instantly.</p>
          </div>

          <div className="preview-card">
            <h3>Accessible by default</h3>
            <p>Built for screen readers, keyboard navigation, and WCAG‑minded structure.</p>
          </div>

          <div className="preview-card">
            <h3>Embeddable business cards</h3>
            <p>Share your business anywhere and send traffic directly to your website.</p>
          </div>
        </div>
      </header>

      <section className="feature-rows">
        <h2 className="section-title">Turn accessibility into real‑world traffic</h2>

        <div className="row">
          <article className="row-card">
            <h3>Reach more customers</h3>
            <p>Accessible pages work for people using screen readers, assistive tech, and older devices.</p>
          </article>

          <article className="row-card">
            <h3>Improve local visibility</h3>
            <p>Semantic structure helps search engines trust and rank your business.</p>
          </article>

          <article className="row-card">
            <h3>Share your information anywhere</h3>
            <p>Your card travels with your brand and always links back to your website.</p>
          </article>
        </div>
      </section>

      <section className="accessibility-section">
        <h2>Accessibility isn’t compliance. It’s reach.</h2>

        <p>
          When your business information is accessible, more people can find you, understand you, and contact you.
          Business Website Optimiser uses semantic HTML, correct landmarks, and assistive‑tech‑friendly patterns so your
          details work for everyone—including customers using screen readers.
        </p>

        <p>
          Accessible, structured pages send stronger quality signals to search engines and reduce friction for real
          people. That combination leads to more clicks, more calls, and more customers.
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser — Increase your business website traffic.
      </footer>
    </main>
  );
}
  