// app/guide/page.tsx
import React from "react";

export const metadata = {
  title: "Guide: Using Your Business Profile Link & Embed Code",
  description:
    "A clear guide for business owners explaining how links and embed codes support visibility, consistency, accessibility, and online presence.",
};

export default function GuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        Guide: Using Your Business Profile Link & Embed Code
      </h1>

      <p className="text-gray-600 mb-10 leading-relaxed">
        This guide explains what your profile link and embed code are, how they
        support your online presence, and where you can use them to strengthen
        visibility, consistency, and accessibility across the web.
      </p>

      {/* WHAT THEY ARE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          What Your Link and Embed Code Are
        </h2>

        <p className="mb-4">
          You receive two simple tools designed to help customers find accurate,
          up‑to‑date information about your business wherever they look:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Your Profile Link:</strong> A direct link to your structured
            business profile — a clear, accessible page that presents your
            services, hours, contact details, and location.
          </li>
          <li>
            <strong>Your Embed Code:</strong> A small snippet you can paste into
            your existing website to display your business card or services
            directly on your site. It updates automatically whenever your
            information changes.
          </li>
        </ul>
      </section>

      {/* BENEFITS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          How These Tools Support Your Online Presence
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>
            <strong>Consistent information everywhere:</strong> Your link and
            embed code help ensure customers see the same accurate details
            across your website, social media, Google Business Profile, and
            directories.
          </li>

          <li>
            <strong>Clear signals for Google:</strong> When your profile link
            appears in multiple trusted places, it helps Google connect your
            business name, services, and location. This strengthens your local
            search presence over time.
          </li>

          <li>
            <strong>Improved accessibility:</strong> Your profile page is built
            to be readable on all devices and by assistive technologies,
            supporting a wider range of customers and improving overall user
            experience.
          </li>

          <li>
            <strong>Always up‑to‑date:</strong> If your hours, services, or
            contact details change, your embedded card and your link update
            automatically. You only update your information once.
          </li>
        </ul>
      </section>

      {/* WHERE TO USE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          Where You Can Use Your Profile Link
        </h2>

        <p className="mb-4">
          Your link can be placed anywhere customers look for information about
          your business:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Google Business Profile (Website, Services, Menu, Learn More)</li>
          <li>Instagram bio</li>
          <li>Facebook page</li>
          <li>LinkedIn company page</li>
          <li>Email signatures</li>
          <li>QR codes on print materials</li>
          <li>Local directories</li>
          <li>Online ads or promotions</li>
        </ul>
      </section>

      {/* EMBED CODE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          Where You Can Use Your Embed Code
        </h2>

        <p className="mb-4">
          If you have a website, you can embed your business card or services
          list directly into your pages. This helps maintain consistency and
          ensures customers always see the most accurate information.
        </p>

        <p className="text-sm font-mono bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto mb-4">
          {`<iframe
  src="https://yourdomain.com/business/your-slug"
  title="Your Business Profile"
  loading="lazy"
  style="border:0; width:100%; max-width:480px; height:420px; border-radius:12px;"
></iframe>`}
        </p>

        <p className="text-gray-700">
          The embed code works with most website builders. Simply paste it where
          you want your business card or services to appear.
        </p>
      </section>

      {/* SUMMARY */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          What This Means for Your Business
        </h2>

        <p className="mb-4">
          Using your link and embed code helps your business present clear,
          consistent, accessible information across the web. This supports:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Stronger visibility in local search</li>
          <li>Improved customer trust and clarity</li>
          <li>Less time spent updating multiple platforms</li>
          <li>A more unified and professional online presence</li>
        </ul>
      </section>

      <footer className="text-sm text-gray-500 border-t pt-6">
        <p>This guide is designed to be accessible and easy to read.</p>
        <p>Clear structure helps both customers and search engines.</p>
      </footer>
    </main>
  );
}
