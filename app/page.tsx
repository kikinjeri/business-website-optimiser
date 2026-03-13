export default function HomePage() {
  return (
    <>
      <header className="app-hero" role="banner">
        <section className="app-hero-inner">
          <h1 className="app-hero-title">
            Clean code. Lightning‑fast pages. Accessible by design.
            <span className="accent"> Built to rank.</span>
          </h1>

          <p className="app-hero-subtitle">
            Turn your business details into search‑ready, accessible,
            high‑performance pages. Load faster, rank higher, and reach more
            customers across Google, mobile, and assistive technologies.
          </p>

          <h2 className="hero-supporting">
            Increase your business website traffic — automatically.
          </h2>

          <div className="app-hero-actions" aria-label="Primary actions"></div>
        </section>

        <section className="feature-section">
          <h2 className="section-heading">What you get</h2>

          <div className="app-preview-grid">
            <div className="preview-card" tabIndex={0}>
              <h3>Search‑optimised pages</h3>
              <p>
                Clean, semantic HTML that helps Google understand and index your
                business instantly.
              </p>
            </div>

            <div className="preview-card" tabIndex={0}>
              <h3>Accessible by default</h3>
              <p>
                WCAG‑minded structure, keyboard‑friendly navigation, and
                screen‑reader clarity built in.
              </p>
            </div>

            <div className="preview-card" tabIndex={0}>
              <h3>Embeddable business cards</h3>
              <p>
                Share your business anywhere and send traffic directly to your
                website with lightweight, fast‑loading cards.
              </p>
            </div>

            <div className="preview-card" tabIndex={0}>
              <h3>Works everywhere you do</h3>
              <p>
                Embed your card on social media, Wix, Squarespace, WordPress, or
                any site that supports links — no setup required.
              </p>
            </div>
          </div>
        </section>
      </header>

      {/* ⭐ TRUST BADGES */}
      <section className="about-badges">
        <div className="badge">⚡ Lightning‑Fast Performance</div>
        <div className="badge">🔍 Search‑Optimised Structure</div>
        <div className="badge">♿ Accessibility‑First HTML</div>
        <div className="badge">📱 Mobile‑First Layout</div>
      </section>

      <section className="accessibility-section">
        <h2>Built for accessibility</h2>
        <p>
          Every page is structured for clarity, keyboard navigation, and
          assistive technology support — ensuring your business is usable by
          everyone.
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser
      </footer>
    </>
  );
}
