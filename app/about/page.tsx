// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell">
      {/* NAVBAR — consistent across app */}
      <nav className="site-navbar" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Business Website Optimiser
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/guide">Guide</Link>
            <Link href="/business">Businesses</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      <div className="page-container">
        {/* TITLE */}
        <h1 className="page-title">About </h1>

        <p className="page-intro">
          I’m a web developer based in Ottawa who’s passionate about helping
          local businesses show up clearly and confidently online. My focus is
          on accessible, semantic, search‑friendly design because it removes
          friction — for customers, for search engines, and for you.
        </p>

        <section className="guide-section">
          <h2 className="section-title">Purpose</h2>
          <p className="section-text">
            Business Website Optimiser is a simple system that turns your
            business information into clean, structured, trustworthy pages. Your
            Business Profile and Embed Code work together to present your
            services, hours, and contact details in a format that’s easy to
            read, easy to maintain, and easy for customers to act on.
          </p>
        </section>

        <section className="guide-section">
          <h2 className="section-title">Why It Matters</h2>
          <p className="section-text">
            I build everything using semantic HTML and accessibility‑first
            patterns. That matters because it helps search engines understand
            your content, improves accessibility for assistive technologies, and
            creates a consistent structure that builds trust. Clear information
            leads to better decisions — and better results for your business.
          </p>
        </section>

        <section className="guide-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-text">
            If you have questions, feedback, or ideas, I’d love to hear from
            you. You can reach out anytime through the{" "}
            <Link href="/guide" className="underline">
              Guide
            </Link>{" "}
            or by exploring your business profile tools.
          </p>
        </section>

        <footer className="guide-footer">
          <p>© {new Date().getFullYear()} Business Website Optimiser</p>
        </footer>
      </div>
    </main>
  );
}
