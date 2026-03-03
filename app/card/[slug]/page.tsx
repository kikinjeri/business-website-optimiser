import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function CardPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !business) {
    return (
      <div
        style={{ fontFamily: "sans-serif", padding: 20, textAlign: "center" }}
      >
        Business not found.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        fontFamily: "sans-serif",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {business.logo_url && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <Image
            src={business.logo_url}
            alt={business.name}
            width={80}
            height={80}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </div>
      )}

      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        {business.name}
      </h2>

      {business.tagline && (
        <p
          style={{
            fontSize: 14,
            color: "#555",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {business.tagline}
        </p>
      )}

      <div style={{ fontSize: 14, color: "#444", marginBottom: 12 }}>
        {business.phone && <p>📞 {business.phone}</p>}
        {business.email && <p>✉️ {business.email}</p>}
        {business.website && (
          <p>
            🌐{" "}
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb" }}
            >
              Visit website
            </a>
          </p>
        )}
      </div>

      {business.website && (
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            background: "#2563eb",
            color: "white",
            padding: "10px 14px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Learn More
        </a>
      )}
    </div>
  );
}
