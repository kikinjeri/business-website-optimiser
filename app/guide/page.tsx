// app/guide/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Guide | Business Website Optimiser",
  description:
    "A simple guide explaining how to use your Business Profile link and Embed Code to keep your information consistent and accessible.",
};

export default function GuidePage() {
  return (
    <main className="page-shell">
     

      <div className="page-container">
        {/* TITLE */}
        <h1 className="page-title">Guide</h1>

        <p className="page-intro">
          Your Business Profile and Embed Code make it easy to share accurate,
          up‑to‑date information everywhere customers look. This page explains
          how they work and how to use them effectively.
        </p>

        {/* WHAT THEY ARE */}
        <section className="guide-section">
          <h2 className="section-title">Your Business Profile</h2>
          <p className="section-text">
            Your profile is a clean, accessible page that displays your
            services, hours, contact details, and location. It’s designed to be
            easy to read on any device and gives customers a reliable place to
            find your information.
          </p>
        </section>

        <section className="guide-section">
          <h2 className="section-title">Your Embed Code</h2>
          <p className="section-text">
            The embed code lets you display your business card or services
            directly on your website. It updates automatically whenever your
            details change, so your website always stays consistent without
            extra work.
          </p>

          <pre className="embed-example">
            {`<iframe
  src="https://yourdomain.com/business/your-slug"
  title="Your Business Profile"
  loading="lazy"
  style="border:0; width:100%; max-width:480px; height:420px; border-radius:12px;"
></iframe>`}
          </pre>
        </section>

        {/* BENEFITS */}
        <section className="guide-section">
          <h2 className="section-title">How This Helps Your Business</h2>
          <ul className="bullet-list">
            <li>Customers always see accurate, consistent information</li>
            <li>Improves trust and reduces confusion</li>
            <li>Strengthens your visibility in local search</li>
            <li>Works on all devices and assistive technologies</li>
            <li>No maintenance — updates happen automatically</li>
          </ul>
        </section>

        {/* CONTACT */}
        <section className="guide-section">
          <h2 className="section-title">Need Help?</h2>
          <p className="section-text">
            If you have questions or want help using your profile or embed code,
            you can reach out anytime through the{" "}
            <Link href="/about" className="underline">
              About page
            </Link>
            . We’re here to support local businesses and make your online
            presence easier to manage.
          </p>
        </section>

        <footer className="guide-footer">
          <p>This guide is designed to be simple, clear, and easy to scan.</p>
        </footer>
      </div>
    </main>
  );
}
