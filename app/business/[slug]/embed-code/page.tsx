import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
<<<<<<< HEAD
import CopyEmbedButton from "@/components/CopyEmbedButton";
=======
import BusinessCard from "@/components/cards/BusinessCard";
>>>>>>> embed-code

export default async function EmbedCodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
<<<<<<< HEAD
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "20px",
          color: "#fff",
          background: "#0f172a",
        }}
      >
        Business not found.
=======
      <div className="embed-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
>>>>>>> embed-code
      </div>
    );
  }

<<<<<<< HEAD
  const iframeCode = `<iframe src="${process.env.NEXT_PUBLIC_SITE_URL}/card/${slug}?embed=1" style="width:100%;border:0;" height="600"></iframe>`;

  return (
    <div
      style={{
        padding: "40px 0",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 20px",
          margin: "0 auto",
        }}
      >
        {/* Back link */}
        <a
          href={`/business/${slug}`}
          style={{
            display: "inline-block",
            marginBottom: "20px",
            color: "white",
            opacity: 0.8,
            textDecoration: "none",
          }}
        >
          ← Back to business page
        </a>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Embed this business card
        </h1>

        {/* NEW EXPLANATORY PARAGRAPH */}
        <p
          style={{
            fontSize: "1rem",
            opacity: 0.85,
            lineHeight: 1.6,
            marginBottom: "24px",
            maxWidth: "700px",
          }}
        >
          You can use this embed code anywhere you share your business online —
          on Facebook, Instagram, LinkedIn, or even website builders like Wix.
          It shows your business card exactly as it appears here, and it always
          stays up‑to‑date automatically. It’s completely free to use and helps
          customers find accurate information faster. If you ever need help
          adding it to your site or have any other web development needs, I’m
          always happy to help.
        </p>

        {/* COPY BUTTON + CODE BLOCK */}
        <div
          style={{
            marginBottom: "32px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <CopyEmbedButton code={iframeCode} />

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              fontSize: "0.9rem",
              marginTop: "12px",
            }}
          >
            {iframeCode}
          </pre>
        </div>

        {/* PREVIEW SECTION */}
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          Preview
        </h2>

        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BusinessCard
            business={business}
            services={services}
            areas={areas}
            searchParams={{ embed: "1" }}
          />
        </div>
      </div>
=======
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

      {/* PREVIEW */}
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

      {/* EMBED CODE BELOW PREVIEW */}
      <h2 className="embed-title">Embed code</h2>

      <p className="embed-description">
        Copy and paste this code into your website, Facebook page, Instagram
        bio, or builders like Wix and Squarespace. It always stays up‑to‑date
        automatically.
      </p>

      <textarea readOnly value={iframeCode} className="embed-textarea" />
>>>>>>> embed-code
    </div>
  );
}
