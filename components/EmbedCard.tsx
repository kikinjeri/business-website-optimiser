// components/EmbedCard.tsx

interface EmbedCardProps {
  business: any;
  services: string[];
  areas: string[];
}

export default function EmbedCard({
  business,
  services,
  areas,
}: EmbedCardProps) {
  const theme = {
    primary: business.theme_primary || "#111827",
    accent: business.theme_accent || "#2563eb",
    text: business.theme_text || "#111827",
    background: business.theme_background || "#ffffff",
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: theme.background,
        color: theme.text,
        borderRadius: "12px",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
        border: `1px solid ${theme.primary}20`,
      }}
    >
      <h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "1.4rem",
          color: theme.primary,
        }}
      >
        {business.name}
      </h2>

      {business.tagline_en && (
        <p style={{ margin: "0 0 12px 0", opacity: 0.85 }}>
          {business.tagline_en}
        </p>
      )}

      {services.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <strong style={{ color: theme.primary }}>Services:</strong>
          <p style={{ margin: "4px 0 0 0", opacity: 0.9 }}>
            {services.join(", ")}
          </p>
        </div>
      )}

      {areas.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <strong style={{ color: theme.primary }}>Service Areas:</strong>
          <p style={{ margin: "4px 0 0 0", opacity: 0.9 }}>
            {areas.join(", ")}
          </p>
        </div>
      )}

      <div style={{ marginTop: "16px" }}>
        {business.phone && (
          <p style={{ margin: "4px 0" }}>
            <strong>Phone:</strong> {business.phone}
          </p>
        )}

        {business.address && (
          <p style={{ margin: "4px 0" }}>
            <strong>Address:</strong> {business.address}
          </p>
        )}

        {business.website_url && (
          <p style={{ margin: "4px 0" }}>
            <a
              href={business.website_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.accent,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Visit Website →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
