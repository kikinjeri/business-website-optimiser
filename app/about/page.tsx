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
              I’m Mwihaki, a web developer based in Ottawa who builds tools that
              help local businesses get discovered online. Many small businesses
              don’t have the time or resources to manage websites, SEO, or
              digital profiles — so I created a simple system that handles the
              essentials for them.
            </p>

            <p className="page-intro">
              My focus is on making it easier for people to find the services
              they need by connecting them with the businesses that provide
              them.
            </p>
          </div>

          <div className="about-image-wrapper">
            <Image
              src="/images/two.jpg"
              alt="Mwihaki, Ottawa-based web developer"
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
            <li>Stronger visibility in local search</li>
            <li>Clear, trustworthy information for customers</li>
            <li>Faster indexing and better understanding by Google</li>
            <li>Fully accessible pages for all users</li>
            <li>Smooth performance across all devices</li>
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
            <li>One place for your hours, services, and contact details</li>
            <li>Helps Google understand your business structure</li>
            <li>Supports local discovery and community visibility</li>
          </ul>
        </section>

        {/* WHY I BUILT THIS */}
        <section className="guide-section" aria-labelledby="why-built">
          <h2 id="why-built" className="section-title">
            Why I Built This
          </h2>
          <p className="section-text">
            I created Business Website Optimiser to support the Ottawa community
            and highlight the incredible small businesses that make it unique.
            This project is designed to help them get seen, build trust, and
            grow.
          </p>
        </section>

        {/* CONTACT */}
        <section className="guide-section" aria-labelledby="get-in-touch">
          <h2 id="get-in-touch" className="section-title">
            Get in Touch
          </h2>
          <p className="section-text">
            If you’d like to connect, you can reach me at:
          </p>

          <p className="section-text">
            <strong>Phone:</strong> (xxx) xxx‑xxxx
            <br />
            <strong>Email:</strong> example@email.com
          </p>
        </section>

        <footer className="guide-footer">
          <p>© {new Date().getFullYear()} Business Website Optimiser</p>
        </footer>
      </div>
    </main>
  );
}
