// app/components/BusinessCard.tsx
import Link from "next/link";

export interface BusinessCardProps {
  name: string;
  tagline?: string | null;
  phone?: string | null;
  address?: string | null;
  slug: string;
  services?: { name_en: string }[];
}

export default function BusinessCard({
  name,
  tagline,
  phone,
  address,
  slug,
  services = [],
}: BusinessCardProps) {
  return (
    <div
      role="region"
      aria-label={`${name} business profile`}
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "420px",
        borderRadius: "14px",
        border: "1px solid #111",
        background: "#050608",
        color: "#f5f7fa",
        padding: "20px",
        boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
      }}
    >
      <header
        style={{
          marginBottom: "14px",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h2 style={{ margin: "0 0 4px 0", fontSize: "1.35rem" }}>{name}</h2>
        {tagline && (
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#c7cbd1" }}>
            {tagline}
          </p>
        )}
      </header>

      {services.length > 0 && (
        <ul
          style={{
            margin: "0 0 12px 0",
            paddingLeft: "18px",
            fontSize: "0.9rem",
            color: "#d5d9e0",
            lineHeight: 1.5,
          }}
        >
          {services.map((service) => (
            <li key={service.name_en}>{service.name_en}</li>
          ))}
        </ul>
      )}

      {phone && (
        <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>
          <strong>Phone:</strong>{" "}
          <a
            href={`tel:${phone}`}
            style={{ color: "#4f8cff", textDecoration: "none" }}
          >
            {phone}
          </a>
        </p>
      )}

      {address && (
        <p style={{ margin: "0 0 12px 0", fontSize: "0.9rem" }}>
          <strong>Address:</strong> {address}
        </p>
      )}

      <Link
        href={`/business/${slug}`}
        style={{
          display: "inline-block",
          padding: "9px 14px",
          borderRadius: "999px",
          background: "#4f8cff",
          color: "#050608",
          fontSize: "0.9rem",
          fontWeight: 600,
          textDecoration: "none",
          textAlign: "center",
          marginBottom: "6px",
        }}
      >
        View full profile
      </Link>

      <p style={{ margin: 0, fontSize: "0.78rem", color: "#9ba0aa" }}>
        Screen‑reader friendly. Built for all customers.{" "}
        <Link href="/" style={{ color: "#6f93ff", textDecoration: "none" }}>
          Business Website Optimiser
        </Link>
      </p>
    </div>
  );
}
