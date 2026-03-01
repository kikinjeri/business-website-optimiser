"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main-content">
      {/* ===========================
          NAVBAR
      ============================ */}
      <nav className="navbar" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Online Business Optimiser
          </Link>

          <div className="nav-links">
            <Link href="/business">Business</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      {/* ===========================
          APP-STYLE HERO
      ============================ */}
      <header className="app-hero" role="banner">
        <div className="app-hero-inner">
          <h1 className="app-hero-title">
            Your business.
            <span className="accent">Structured. Searchable. Shareable.</span>
          </h1>

          <p className="app-hero-subtitle">
            OBO turns your business details into a clean, accessible, app‑ready
            profile that works across search, devices, and assistive tech.
          </p>

          <div className="app-hero-actions">
            <Link href="/business" className="cta-primary">
              Create Your Page
            </Link>
            <Link href="/business/palermos" className="cta-secondary">
              View Example
            </Link>
          </div>
        </div>

        {/* APP-LIKE MODULE PREVIEW */}
        <div className="app-preview-grid">
          <div className="preview-card">
            <h3>Business Profile</h3>
            <p>
              Your services, hours, location, and accessibility — structured for
              clarity.
            </p>
          </div>

          <div className="preview-card">
            <h3>Search‑Ready Layout</h3>
            <p>
              Semantic HTML that helps search engines understand your business.
            </p>
          </div>

          <div className="preview-card">
            <h3>Share Anywhere</h3>
            <p>
              Link it, embed it, or hand it to your developer as a foundation.
            </p>
          </div>
        </div>
      </header>

      {/* ===========================
          FEATURE ROWS (NETFLIX STYLE)
      ============================ */}
      <section className="feature-rows">
        <h2 className="section-title">What you can build with OBO</h2>

        <div className="row">
          <article className="row-card">
            <h3>Local Service Page</h3>
            <p>A clean, trustworthy page for any local business.</p>
          </article>

          <article className="row-card">
            <h3>Business Card Embed</h3>
            <p>Drop your business card into any website or platform.</p>
          </article>

          <article className="row-card">
            <h3>Search‑Optimised Profile</h3>
            <p>Structured content that improves discoverability.</p>
          </article>
        </div>
      </section>

      {/* ===========================
          ACCESSIBILITY SECTION
      ============================ */}
      <section className="accessibility-section">
        <h2>Built on semantic HTML and real accessibility</h2>

        <p>
          OBO pages use correct landmarks, headings, and ARIA where it actually
          helps. The result is a page that works for search engines, screen
          readers, and real people — without clutter or noise.
        </p>
      </section>

      {/* ===========================
          FOOTER
      ============================ */}
      <footer className="footer">
        <p>
          © 2026 Online Business Optimiser. Built with care for local service
          businesses.
        </p>
      </footer>
    </main>
  );
}
