// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <div className="about-hero">
          <Image
            src="/images/two.jpg"
            alt="About section image"
            className="about-image"
            width={180}
            height={180}
          />

          <div className="about-text">
            <p className="page-intro">
              I’m an Ottawa based web developer passionate about helping local
              businesses boost their online presence. My focus is on accessible,
              semantic, search‑friendly design because it removes friction — for
              customers, for search engines, and for you.
            </p>
          </div>
        </div>

        <section className="guide-section"></section>

        <section className="guide-section">
          <h2 className="section-title"></h2>
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
