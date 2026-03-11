import BusinessCard from "@/components/cards/BusinessCard";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import CopyEmbedButton from "@/components/CopyEmbedButton";

export default async function EmbedCodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "20px",
          color: "#fff",
          background: "#0f172a",
        }}
      >
        Business not found.
      </div>
    );
  }

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

        {/* PREVIEW SECTION — FIXED ALIGNMENT */}
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
    </div>
  );
}
