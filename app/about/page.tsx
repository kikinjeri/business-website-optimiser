// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* NAVBAR */}
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

      {/* HERO */}
      <header className="about-hero">
        <h1>About Business Website Optimiser</h1>
        <p className="about-tagline">
          We help local businesses get more website traffic by improving how
          they appear on Google and how easily customers can find them.
        </p>
      </header>

      {/* CONTENT */}
      <section className="about-content">
        <h2>Increase Website Traffic</h2>
        <p>
          When your business information is clear, consistent, and easy for
          search engines to read, you show up more often in local search
          results. More visibility means more clicks, more calls, and more
          customers.
        </p>

        <h2>Optimised for Google</h2>
        <p>
          Our pages use clean headings, structured content, and fast
          performance. This helps Google understand exactly what your business
          offers and where you operate, which improves your ranking over time.
        </p>

        <h2>Accessibility Boosts Searchability</h2>
        <p>
          Accessible pages aren’t just better for people — they’re better for
          search engines. Clear text, proper labels, readable contrast, and
          screen‑reader‑friendly structure make your content easier for Google
          to scan and index. When your page is easier to read, it’s easier to
          rank.
        </p>

        <h2>Easy for Customers to Navigate</h2>
        <p>
          Customers can quickly see your services, service areas, and contact
          details without digging through cluttered layouts. A clean,
          trustworthy design helps people reach out faster and increases
          conversions.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser
      </footer>
    </main>
  );
}
