// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* NAVBAR — identical to homepage */}
      <nav className="navbar" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Business Website Optimiser
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/business">Businesses</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-intro">
          <h1>Built to make local businesses visible</h1>
          <p className="about-tagline">
            Your business deserves to be easy to find, easy to understand, and
            accessible to everyone.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">
        <p>
          Business Website Optimiser creates clean, semantic, search‑ready pages
          and embeddable business cards from your existing details. We focus on
          structure, clarity, and accessibility so your information works for
          both search engines and real people.
        </p>

        <p>
          Every page is built with accessibility in mind: proper headings,
          readable typography, meaningful link text, and layouts that work with
          screen readers and keyboard navigation. When more people can use your
          site, more people can become your customers.
        </p>

        <p>
          We also optimise how your business appears to Google. By presenting
          your services, location, and contact details in a consistent,
          machine‑readable format, we make it easier for search engines to
          understand and surface your business in local results.
        </p>

        <p>
          Your business profile and card can be embedded anywhere—Google
          Business Profile, your existing website, partner sites, newsletters,
          or directories. Wherever they appear, they send visitors back to your
          website, where you control the experience.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser — Built for
        visibility, accessibility, and real‑world traffic.
      </footer>
    </main>
  );
}
