// File: app/business/[slug]/embed-code/page.tsx

import BusinessCard from "@/components/cards/BusinessCard";
import Link from "next/link";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import "@/styles/styles.css";

export default async function EmbedCodePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Canonical data fetcher (services removed, consistent shape)
  const { business, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div className="embed-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://YOURDOMAIN.com";
  const embedUrl = `${domain}/card/${slug}?embed=1`;

  const iframeCode = `<iframe
  src="${embedUrl}"
  style="border:0;width:100%;max-width:420px;height:600px;border-radius:12px;overflow:hidden;"
  loading="lazy"
></iframe>`;

  return (
    <div className="embed-page">
      <div className="embed-page__topbar">
        <Link href={`/business/${slug}`} className="embed-page__back-link">
          ← Back to business page
        </Link>
      </div>

      <h2 className="embed-title">
        Live preview
        <span className="embed-scroll-note"> — scroll down for embed code</span>
      </h2>

      <div className="embed-preview-wrapper">
        <BusinessCard
          name={business.name}
          tagline={business.tagline_en}
          address={business.address}
          phone={business.phone}
          email={business.email}
          website={business.website_url}
          hours={business.hours_json}
          areas={areas}
          slug={business.slug}
          is_accessible={business.is_accessible}
          supports_screen_readers={business.supports_screen_readers}
          supports_keyboard_navigation={business.supports_keyboard_navigation}
          tags={business.tags}
        />
      </div>

      <h2 className="embed-title">Embed code</h2>

      <textarea readOnly value={iframeCode} className="embed-textarea" />
    </div>
  );
}
