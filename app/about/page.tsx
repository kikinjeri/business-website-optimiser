import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="page-shell" aria-labelledby="about-title">
      <div className="page-container about-page">
        <header className="about-header">
          <h1 id="about-title" className="page-title">
            About
          </h1>
        </header>

        {/* HERO SECTION */}
        <section className="about-hero about-hero--right">
          <div className="about-text">
            <p className="page-intro">
              Hi! I’m Mwihaki, an Ottawa‑based web developer who wants to help
              local businesses show up online. A lot of small businesses don’t
              have the time or resources to manage websites, profiles, or SEO —
              so I built a simple tool that does the heavy lifting for you.
            </p>

            <p className="page-intro">
              My goal is to help customers find the services they need by
              connecting them with the local businesses that offer them.
            </p>
          </div>

          <div className="about-image-wrapper">
            <Image
              src="/images/two.jpg"
              alt="Mwihaki, an Ottawa‑based web developer"
              className="about-image"
              width={130}
              height={130}
            />
          </div>
        </section>

        {/* BUSINESS BENEFITS */}
        <section className="guide-section" aria-labelledby="business-benefits">
          <h2 id="business-benefits" className="section-title">
            How This Helps Your Business
          </h2>
          <ul className="section-list">
            <li>Better visibility in local search</li>
            <li>Clear information customers can trust</li>
            <li>Faster indexing and understanding by Google</li>
            <li>More accessible for everyone</li>
            <li>Smoother experience across devices</li>
          </ul>
        </section>

        {/* BUSINESS CARD BENEFITS */}
        <section
          className="guide-section"
          aria-labelledby="business-card-benefits"
        >
          <h2 id="business-card-benefits" className="section-title">
            Why Your Business Card Matters
          </h2>
          <ul className="section-list">
            <li>A clean, professional page you can share anywhere</li>
            <li>Fast, mobile‑friendly, and easy to read</li>
            <li>One place for your hours, services, and contact info</li>
            <li>Helps Google understand your business</li>
            <li>Supports local discovery and community visibility</li>
          </ul>
        </section>

        {/* WHY I BUILT THIS */}
        <section className="guide-section" aria-labelledby="why-built">
          <h2 id="why-built" className="section-title">
            Why I Built This
          </h2>
          <p className="section-text">
            I made Business Website Optimiser because I wanted to use my skills
            to support the Ottawa community. There are so many great small
            businesses here — I wanted to make them easier to find.
          </p>
          <p className="section-text">
            This project helps them get seen, get trusted, and grow.
          </p>
        </section>

        {/* CONTACT */}
        <section className="guide-section" aria-labelledby="get-in-touch">
          <h2 id="get-in-touch" className="section-title">
            Get in Touch
          </h2>
          <p className="section-text">
            If you have questions or ideas, you can reach out anytime through
            the{" "}
            <Link href="/guide" className="link-underline">
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
