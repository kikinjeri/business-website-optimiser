// File: app/business/[slug]/embed-code/EmbedCodeClient.tsx
"use client";

import { useState } from "react";
import EmbedCard from "@/components/EmbedCard";

export const metadata: Metadata = {
  title: "About | Business Web Optimiser",
  description:
    "Learn about Mwihaki, an Ottawa-based developer helping showcase local businesses online with accessible, SEO-friendly profiles.",
};

export default function EmbedCodeClient({
  slug,
  business,
  areas,
}: {
  slug: string;
  business: any;
  areas: string[];
}) {
  const embedSnippet = `<iframe src="https://yourapp.vercel.app/business/${slug}" 
    style="border:0;width:100%;height:400px;" loading="lazy"></iframe>`;

  const directionsUrl = business.address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`
    : null;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className="section centered"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <h1 className="section-heading accent">Embed Your Business Card</h1>
      <p className="section-subtitle">
        Copy and paste this snippet anywhere — Google Business, WordPress, or
        your own site.
      </p>

      {/* Preview */}
      <div className="card-preview" style={{ marginBottom: "24px" }}>
        <EmbedCard business={business} areas={areas} />
      </div>

      {/* Embed Code */}
      <pre className="embed-snippet">{embedSnippet}</pre>

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className="hero-btn-primary"
        style={{ marginTop: "12px" }}
      >
        {copied ? "Copied!" : "Copy Embed Code"}
      </button>

      {/* Get Directions CTA */}
      {directionsUrl && (
        <div style={{ marginTop: "24px" }}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-secondary"
          >
            📍 Get Directions
          </a>
        </div>
      )}
    </main>
  );
}
