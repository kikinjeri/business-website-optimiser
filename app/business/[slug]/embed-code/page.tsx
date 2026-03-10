// app/business/[slug]/embed-code/page.tsx

import Link from "next/link";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function EmbedCodePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { business } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  // Use your real domain from env
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://YOURDOMAIN.com";

  const embedUrl = `${domain}/card/${slug}?embed=1`;

  const iframeCode = `<iframe
  src="${embedUrl}"
  style="border:0;width:100%;max-width:420px;height:600px;border-radius:12px;overflow:hidden;"
  loading="lazy"
></iframe>`;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <Link
        href={`/business/${slug}`}
        style={{ display: "inline-block", marginBottom: "16px" }}
      >
        ← Back to business page
      </Link>

      <h1>Embed this business card</h1>
      <p>Copy and paste this code into your website:</p>

      <textarea
        readOnly
        value={iframeCode}
        style={{
          width: "100%",
          height: "140px",
          padding: "12px",
          fontSize: "0.9rem",
          fontFamily: "monospace",
          borderRadius: "8px",
        }}
      />

      <h2 style={{ marginTop: "32px" }}>Preview</h2>

      <iframe
        src={embedUrl}
        style={{
          border: 0,
          width: "100%",
          maxWidth: "420px",
          height: "600px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        loading="lazy"
      />
    </div>
  );
}
