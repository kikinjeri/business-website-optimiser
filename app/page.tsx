// app/page.tsx

export default function HomePage() {
  return (
    <>
      <header className="app-hero" role="banner">
        <div className="app-hero-inner">
          <h1 className="app-hero-title">
            Clean code. Lightning‑fast pages. Accessible by design.
            <span className="accent"> Built to rank.</span>
          </h1>

          <p className="app-hero-subtitle">
            Business Website Optimiser turns your business details into
            search‑ready, accessible, high‑performance pages that help you rank
            higher, load faster, and reach more customers across Google, mobile,
            and assistive technologies.
          </p>

          <div className="app-hero-actions"></div>
        </div>

        <div className="app-preview-grid">
          <div className="preview-card">
            <h3>Search‑optimised pages</h3>
            <p>
              Clean, semantic HTML that helps Google understand and index your
              business instantly.
            </p>
          </div>

          <div className="preview-card">
            <h3>Accessible by default</h3>
            <p>
              WCAG‑minded structure, keyboard‑friendly navigation, and
              screen‑reader clarity built in.
            </p>
          </div>

          <div className="preview-card">
            <h3>Embeddable business cards</h3>
            <p>
              Share your business anywhere and send traffic directly to your
              website with lightweight, fast‑loading cards.
            </p>
          </div>
        </div>
      </header>

      {/* ⭐ TRUST BADGES */}
      <section className="about-badges">
        <div className="badge">⚡ Lightning‑Fast Performance</div>
        <div className="badge">🔍 Search‑Optimised Structure</div>
        <div className="badge">♿ Accessibility‑First HTML</div>
        <div className="badge">📱 Mobile‑First Layout</div>
      </section>

      <section className="accessibility-section">
        <h2></h2>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser — Increase your
        business website traffic.
      </footer>
    </>
  );
}
