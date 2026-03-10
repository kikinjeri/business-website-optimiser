"use client";

import React from "react";

/* Determine if business is open today */
function isBusinessOpen(hours_json) {
  if (!hours_json) return null;

  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const now = new Date();
  const jsDay = now.getDay(); // Sunday = 0
  const todayName = orderedDays[jsDay === 0 ? 6 : jsDay - 1];

  const todayHours =
    hours_json[todayName.toLowerCase()] || hours_json[todayName] || null;

  if (!todayHours) return null;
  if (/closed/i.test(todayHours)) return false;

  return true;
}

export default function BusinessCard({ business, services, areas }) {
  if (!business) return null;

  const {
    name,
    tagline_en,
    tagline,
    address,
    phone,
    website_url,
    lat,
    lng,
    hours_json,
    neighborhood,
    theme_primary,
    theme_accent,
    theme_text,
    theme_background,
    slug,
  } = business;

  /* PREMIUM STRIPE-STYLE COLORS (override unreadable theme colors) */
  const background = "#0f172a"; // deep navy
  const primary = "#6366f1"; // indigo
  const accent = "#38bdf8"; // cyan
  const text = "#ffffff"; // always readable

  /* WEBSITE LINK (D4) */
  const rawWebsite = website_url;
  const websiteUrl =
    rawWebsite &&
    (rawWebsite.startsWith("http://") || rawWebsite.startsWith("https://"))
      ? rawWebsite
      : rawWebsite
        ? `https://${rawWebsite}`
        : null;

  /* DIRECTIONS URL */
  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            address,
          )}`
        : null;

  /* SORT DAYS */
  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /* OPEN NOW LOGIC */
  const isOpen = isBusinessOpen(hours_json);

  /* JSON-LD STRUCTURED DATA */
  const jsonLd =
    slug &&
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name,
      url: `https://your-domain.com/business/${slug}`,
      telephone: phone || undefined,
      address: address
        ? {
            "@type": "PostalAddress",
            streetAddress: address,
          }
        : undefined,
      sameAs: websiteUrl ? [websiteUrl] : undefined,
      openingHoursSpecification:
        hours_json &&
        orderedDays.map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          description:
            hours_json[day.toLowerCase()] || hours_json[day] || "Closed",
        })),
    });

  return (
    <article
      aria-label={`Business profile for ${name}`}
      style={{
        background,
        color: text,
        borderRadius: "24px",
        padding: "28px",
        maxWidth: "960px",
        margin: "0 auto",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {/* Gradient background accents */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-40%",
          background:
            "radial-gradient(circle at top left, rgba(99,102,241,0.25), transparent 55%), radial-gradient(circle at bottom right, rgba(56,189,248,0.25), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* GRID LAYOUT */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
          gap: "32px",
        }}
      >
        {/* LEFT COLUMN */}
        <section aria-labelledby="business-heading">
          <header
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h1
                id="business-heading"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: "4px",
                }}
              >
                {name}
              </h1>

              {(tagline_en || tagline) && (
                <p style={{ fontSize: "1rem", opacity: 0.85 }}>
                  {tagline_en || tagline}
                </p>
              )}
            </div>

            {/* OPEN NOW TEXT (subtle, premium, no pill) */}
            {isOpen !== null && (
              <p
                aria-label={isOpen ? "Open now" : "Closed now"}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: isOpen ? "#4ade80" : "#f87171",
                  marginTop: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {isOpen ? "Open now" : "Closed now"}
              </p>
            )}
          </header>

          {/* ADDRESS */}
          {address && (
            <section
              aria-labelledby="address-heading"
              style={{ marginBottom: "16px" }}
            >
              <h2 id="address-heading" className="sr-only">
                Address
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.9 }}>{address}</p>
              {neighborhood && (
                <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                  {neighborhood}
                </p>
              )}
            </section>
          )}

          {/* WEBSITE (D4) */}
          {websiteUrl && (
            <p
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                🌐
              </span>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accent,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {websiteUrl}
              </a>
            </p>
          )}

          {/* SERVICES */}
          {services?.length > 0 && (
            <section
              aria-labelledby="services-heading"
              style={{ marginBottom: "20px" }}
            >
              <h2
                id="services-heading"
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.7,
                  marginBottom: "8px",
                }}
              >
                Services
              </h2>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {services.map((service) => (
                  <li
                    key={service}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* SERVICE AREAS */}
          {areas?.length > 0 && (
            <section aria-labelledby="areas-heading">
              <h2
                id="areas-heading"
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.7,
                  marginBottom: "8px",
                }}
              >
                Service areas
              </h2>
              <p style={{ opacity: 0.9 }}>{areas.join(", ")}</p>
            </section>
          )}
        </section>

        {/* RIGHT COLUMN */}
        <section
          aria-label="Hours and location"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* HOURS */}
          {hours_json && (
            <section
              aria-labelledby="hours-heading"
              style={{
                borderRadius: "16px",
                padding: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h2
                id="hours-heading"
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.7,
                  marginBottom: "8px",
                }}
              >
                Hours
              </h2>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {orderedDays.map((day) => {
                  const hours =
                    hours_json[day.toLowerCase()] ||
                    hours_json[day] ||
                    "Closed";

                  return (
                    <li
                      key={day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.85rem",
                        opacity: 0.9,
                      }}
                    >
                      <span>{day}</span>
                      <span>{hours}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* DIRECTIONS BUTTON */}
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 16px",
                borderRadius: "999px",
                background: primary,
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Get directions
            </a>
          )}
        </section>
      </div>
    </article>
  );
}
