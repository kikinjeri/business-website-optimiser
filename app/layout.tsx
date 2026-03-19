// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "../styles/styles.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Business Web Optimiser",
    template: "%s | Business Web Optimiser",
  },

  description:
    "Accessible, SEO‑friendly business profiles, embeddable cards, and optimisation tools for local businesses.",

  openGraph: {
    type: "website",
    url: "https://your-domain.com",
    title: "Business Web Optimiser",
    description:
      "Optimise your business presence with accessible, SEO‑ready profiles and analytics.",
    siteName: "Business Web Optimiser",
  },

  twitter: {
    card: "summary_large_image",
    title: "Business Web Optimiser",
    description:
      "Accessible, SEO‑friendly business profiles and embeddable cards.",
  },

  alternates: {
    canonical: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Business Web Optimiser",
    url: "https://your-domain.com",
    description:
      "A premium, accessibility‑first platform for optimising local business websites and profiles.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
  };

  return (
    <html lang="en" data-theme="dark">
      <body className="app-body">
        <Navbar />

        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <main id="main-content" className="page-container">
          {children}
        </main>
      </body>
    </html>
  );
}
