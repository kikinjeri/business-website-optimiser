import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import Link from "next/link";

export default async function EmbedCodePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { business, services, areas } = await getBusinessBySlug(slug);

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
          business={business}
          services={services}
          areas={areas}
          searchParams={{ embed: "1" }}
        />
      </div>

      <h2 className="embed-title">Embed code</h2>

      <p className="embed-description">
        Copy and paste this code into your website, Facebook page, Instagram
        bio, or builders like Wix and Squarespace. It always stays up‑to‑date
        automatically.
      </p>

      <textarea readOnly value={iframeCode} className="embed-textarea" />
    </div>
  );
}
