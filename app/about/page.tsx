// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <h1 className="page-title">About</h1>

        {/* HERO SECTION */}
        <div className="about-hero about-hero--right">
          <div className="about-text">
            <p className="page-intro">
              Hi! I’m Mwihaki, an Ottawa‑based web developer who wants to help local
              businesses show up online. A lot of small businesses don’t have
              the time or resources to manage websites, profiles, or SEO — so I
              built a simple tool that does the heavy lifting for you.
            </p>

            <p className="page-intro">
              My goal is to help customers find the services they need by
              connecting them with the local businesses that offer them.
            </p>
          </div>

          <Image
            src="/images/two.jpg"
            alt="Portrait"
            className="about-image"
            width={130}
            height={130}
          />
        </div>

        {/* BUSINESS BENEFITS */}
        <section className="guide-section">
          <h2 className="section-title">How This Helps Your Business</h2>
          <ul className="section-list">
            <li>Better visibility in local search</li>
            <li>Clear info customers can trust</li>
            <li>Faster indexing and understanding by Google</li>
            <li>More accessible for everyone</li>
            <li>Smoother experience across devices</li>
          </ul>
        </section>

        {/* BUSINESS CARD BENEFITS */}
        <section className="guide-section">
          <h2 className="section-title">Why Your Business Card Matters</h2>
          <ul className="section-list">
            <li>A clean, professional page you can share anywhere</li>
            <li>Fast, mobile‑friendly, and easy to read</li>
            <li>One place for your hours, services, and contact info</li>
            <li>Helps Google understand your business</li>
            <li>Supports local discovery and community visibility</li>
          </ul>
        </section>

        {/* WHY I BUILT THIS */}
        <section className="guide-section">
          <h2 className="section-title">Why I Built This</h2>
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
        <section className="guide-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-text">
            If you have questions or ideas, you can reach out anytime through
            the{" "}
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
