// components/BusinessCard.tsx
import Link from "next/link";

type BusinessCardProps = {
  name: string;
  tagline?: string | null;
  phone?: string | null;
  address?: string | null;
  website_url?: string | null;
  services?: string[];
  hours?: Record<string, string> | null;
  service_areas?: string[] | null;
  theme?: {
    primary: string;
    accent: string;
    text: string;
    background: string;
  };
  lat?: number | null;
  lng?: number | null;
  map_url?: string | null;
};

const DAY_ORDER = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// Determine if business is open right now
function getOpenStatus(hours: Record<string, string> | null) {
  if (!hours) return null;

  const now = new Date();
  const dayKey = DAY_ORDER[now.getDay()];
  const todayHours = hours[dayKey];

  if (!todayHours || todayHours.toLowerCase() === "closed") return "closed";
  if (todayHours.includes("24/7")) return "open";

  const [start, end] = todayHours.split(" - ");
  if (!start || !end) return null;

  const startDate = new Date(`1970-01-01 ${start}`);
  const endDate = new Date(`1970-01-01 ${end}`);

  if (now >= startDate && now <= endDate) return "open";
  return "closed";
}

// Extract neighborhood from address
function extractNeighborhood(address?: string | null): string | null {
  if (!address) return null;
  const parts = address.split(",");
  if (parts.length < 2) return null;
  return parts[1].trim();
}

// Build service area tag text
function buildServiceAreaTag(
  service_areas?: string[] | null,
  neighborhood?: string | null,
): string {
  if (service_areas && service_areas.length > 0) {
    const sorted = [...service_areas].sort((a, b) => a.localeCompare(b, "en"));

    if (sorted.length <= 3) {
      return `Serving ${sorted.join(", ")}`;
    }

    const firstThree = sorted.slice(0, 3).join(", ");
    return `Serving ${firstThree} and more`;
  }

  if (neighborhood) return `Serving ${neighborhood}`;

  return "Serving Ottawa";
}

export default function BusinessCard({
  name,
  tagline,
  phone,
  address,
  website_url,
  services = [],
  hours,
  service_areas,
  theme,
  lat,
  lng,
  map_url,
}: BusinessCardProps) {
  const bg = theme?.background || "var(--obo-light-surface)";
  const text = theme?.text || "var(--obo-light-text)";
  const primary = theme?.primary || "var(--obo-light-text)";
  const accent = theme?.accent || "var(--obo-light-accent)";

  const hasHours = hours && Object.keys(hours).length > 0;
  const hasServices = Array.isArray(services) && services.length > 0;

  const openStatus = getOpenStatus(hours);
  const neighborhood = extractNeighborhood(address);
  const serviceAreaTag = buildServiceAreaTag(service_areas, neighborhood);

  const websiteDomain = website_url
    ? website_url.replace("https://", "").replace("http://", "").split("/")[0]
    : null;

  return (
    <article
      aria-label={`${name} business profile`}
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        maxWidth: "760px",
        margin: "0 auto",
        borderRadius: "18px",
        border: `1px solid rgba(0,0,0,0.06)`,
        background: bg,
        color: text,
        padding: "28px 28px 32px",
        boxShadow: "0 22px 55px rgba(0,0,0,0.16)",
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: "20px",
          paddingBottom: "16px",
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.8rem",
            lineHeight: 1.2,
            color: primary,
          }}
        >
          {name}
        </h1>

        {tagline && (
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "1rem",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            {tagline}
          </p>
        )}
      </header>

      {/* Contact + location */}
      <section
        aria-label="Contact and location"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <div>
          {address && (
            <p style={{ margin: "0 0 10px", fontSize: "1rem" }}>
              <span style={{ fontWeight: 600 }}>📍 Address:</span>{" "}
              <span style={{ color: "rgba(0,0,0,0.7)" }}>{address}</span>
            </p>
          )}

          {map_url && (
            <p style={{ margin: "0 0 10px", fontSize: "1rem" }}>
              <a
                href={map_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accent,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Open in Google Maps →
              </a>
            </p>
          )}

          {phone && (
            <p style={{ margin: "0 0 10px", fontSize: "1rem" }}>
              <span style={{ fontWeight: 600 }}>📞 Phone:</span>{" "}
              <a
                href={`tel:${phone}`}
                style={{
                  color: accent,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {phone}
              </a>
            </p>
          )}

          {websiteDomain && (
            <p style={{ margin: 0, fontSize: "1rem" }}>
              <span style={{ fontWeight: 600 }}>🌐 Website:</span>{" "}
              <a
                href={website_url!}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accent,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {websiteDomain} →
              </a>
            </p>
          )}
        </div>

        {/* Hours */}
        {hasHours && (
          <div aria-label="Opening hours">
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "1rem",
                fontWeight: 700,
                color: primary,
              }}
            >
              🕒 Hours{" "}
              {openStatus && (
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "0.85rem",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background:
                      openStatus === "open"
                        ? "rgba(22,163,74,0.12)"
                        : "rgba(220,38,38,0.12)",
                    color: openStatus === "open" ? "#15803d" : "#b91c1c",
                    fontWeight: 600,
                  }}
                >
                  {openStatus === "open" ? "Open now" : "Closed"}
                </span>
              )}
            </p>

            <dl
              style={{
                margin: 0,
                fontSize: "0.92rem",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "10px",
                rowGap: "4px",
              }}
            >
              {DAY_ORDER.map((day) => {
                const key = day.toLowerCase();
                const value = hours![key];
                if (!value) return null;

                return (
                  <div key={day} style={{ display: "contents" }}>
                    <dt style={{ fontWeight: 600 }}>
                      {DAY_LABELS[key] || day}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        color: "rgba(0,0,0,0.7)",
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}
      </section>

      {/* Services */}
      {hasServices && (
        <section
          aria-label="Key services"
          style={{
            marginTop: "26px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            paddingTop: "18px",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "1.15rem",
              color: primary,
            }}
          >
            🛠️ Services at a glance
          </h2>

          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "6px 20px",
              fontSize: "0.95rem",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            {services.slice(0, 8).map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>

          {services.length > 8 && (
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.9rem",
                color: accent,
                fontWeight: 600,
              }}
            >
              + {services.length - 8} more services
            </p>
          )}
        </section>
      )}

      {/* Mini Map (OpenStreetMap — no API key needed) */}
      {lat && lng && (
        <section
          aria-label="Mini map"
          style={{
            marginTop: "26px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            paddingTop: "18px",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "1.15rem",
              color: primary,
            }}
          >
            🗺️ Location
          </h2>

          <iframe
            width="100%"
            height="180"
            style={{
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
          ></iframe>

          {map_url && (
            <p style={{ marginTop: "10px", fontSize: "0.95rem" }}>
              <a
                href={map_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accent,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View larger map →
              </a>
            </p>
          )}
        </section>
      )}

      {/* Footer tags — business‑specific */}
      <footer
        aria-label="Business trust signals"
        style={{
          marginTop: "26px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 14px",
          fontSize: "0.95rem",
          color: "rgba(0,0,0,0.75)",
        }}
      >
        {/* Local business */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.05)",
            fontWeight: 600,
          }}
        >
          📍 Local Ottawa business
        </span>

        {/* Service area tag */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.05)",
            fontWeight: 600,
          }}
        >
          🗺️ {serviceAreaTag}
        </span>
      </footer>
    </article>
  );
}
