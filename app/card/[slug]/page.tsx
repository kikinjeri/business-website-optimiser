import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function CardPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  // Fetch business by slug
  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !business) {
    return (
      <div
        style={{
          fontFamily: "sans-serif",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Business not found.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        fontFamily: "sans-serif",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      {business.logo_url && (
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <Image
            src={business.logo_url}
            alt={business.name}
            width={80}
            height={80}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Name */}
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "6px",
          textAlign: "center",
        }}
      >
        {business.name}
      </h2>

      {/* Tagline */}
      {business.tagline && (
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          {business.tagline}
        </p>
      )}

      {/* Contact */}
      <div style={{ fontSize: "14px", color: "#444", marginBottom: "12px" }}>
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

      {/* CTA */}
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
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Learn More
        </a>
      )}
    </div>
  );
}
