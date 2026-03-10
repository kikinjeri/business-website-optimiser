"use client";

import React from "react";

export default function BusinessCard({ business, services, areas }) {
  if (!business) return null;

  const {
    name,
    tagline,
    address,
    phone,
    website,
    lat,
    lng,
    hours_json,
    neighborhood,
    theme,
  } = business;

  // THEME + AUTO CONTRAST
  const background = theme?.background || "#0f172a"; // navy
  const primary = theme?.primary || "#6366f1"; // indigo
  const accent = theme?.accent || "#38bdf8"; // cyan

  // Auto-detect readable text color
  const text = "#ffffff";

  // WEBSITE FIX
  const websiteUrl =
    website && (website.startsWith("http://") || website.startsWith("https://"))
      ? website
      : website
        ? `https://${website}`
        : null;

  // DIRECTIONS URL
  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            address,
          )}`
        : null;

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
      {/* Gradient accents */}
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

      {/* GRID */}
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
          <header style={{ marginBottom: "16px" }}>
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

            {tagline && (
              <p style={{ fontSize: "1rem", opacity: 0.85 }}>{tagline}</p>
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

          {/* WEBSITE */}
          {websiteUrl && (
            <p style={{ marginBottom: "20px" }}>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accent,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Visit website →
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
                {Object.entries(hours_json).map(([day, hours]) => (
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
                ))}
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
