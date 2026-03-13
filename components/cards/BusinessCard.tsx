"use client";

import React from "react";

/* -------------------------------
   TIME PARSING + OPEN/CLOSED LOGIC
---------------------------------- */

function parseTime(str) {
  const match = str.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  let minute = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
}

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

  // Closed all day
  if (/closed/i.test(todayHours)) return false;

  // Parse "8:00 AM – 5:00 PM"
  const parts = todayHours.split(/–|-/);
  if (parts.length !== 2) return null;

  const [openStr, closeStr] = parts.map((s) => s.trim());

  const open = parseTime(openStr);
  const close = parseTime(closeStr);

  if (!open || !close) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Overnight hours (e.g., 8pm–2am)
  if (close < open) {
    return nowMinutes >= open || nowMinutes <= close;
  }

  // Normal hours
  return nowMinutes >= open && nowMinutes <= close;
}

/* -------------------------------
   BUSINESS CARD COMPONENT
---------------------------------- */

export default function BusinessCard({
  business,
  services,
  areas,
  searchParams,
}) {
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
  } = business;

  /* COLORS */
  const background = "#0f172a";
  const primary = "#6366f1";
  const accent = "#38bdf8";
  const text = "#ffffff";

  /* WEBSITE URL FIX */
  const websiteUrl =
    website_url &&
    (website_url.startsWith("http://") || website_url.startsWith("https://"))
      ? website_url
      : website_url
        ? `https://${website_url}`
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

  /* ORDER DAYS */
  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /* OPEN NOW */
  const isOpen = isBusinessOpen(hours_json);

  return (
    <article
      aria-label={`Business profile for ${name}`}
      style={{
        background,
        color: text,
        borderRadius: "24px",
        padding: "32px",
        width: "100%",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
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
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "40px",
        }}
      >
        {/* LEFT COLUMN */}
        <section aria-labelledby="business-heading">
          <header
            style={{
              marginBottom: "20px",
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
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: "6px",
                }}
              >
                {name}
              </h1>

              {(tagline_en || tagline) && (
                <p style={{ fontSize: "1.05rem", opacity: 0.85 }}>
                  {tagline_en || tagline}
                </p>
              )}
            </div>

            {isOpen !== null && (
              <p
                aria-label={isOpen ? "Open now" : "Closed now"}
                style={{
                  fontSize: "0.9rem",
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
              style={{ marginBottom: "20px" }}
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

          {/* PHONE */}
          {phone && (
            <p
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "1rem",
              }}
            >
              <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                📞
              </span>
              <a
                href={`tel:${phone}`}
                style={{
                  color: accent,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {phone}
              </a>
            </p>
          )}

          {/* WEBSITE */}
          {websiteUrl && (
            <p
              style={{
                marginBottom: "16px",
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
              >
                {websiteUrl}
              </a>
            </p>
          )}

          {/* SERVICES */}
          {services?.length > 0 && (
            <section
              aria-labelledby="services-heading"
              style={{ marginBottom: "24px" }}
            >
              <h2
                id="services-heading"
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.7,
                  marginBottom: "10px",
                }}
              >
                Services
              </h2>

              <section style={{ marginTop: "1rem" }}>
                <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                  Services include:
                </strong>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    margin: 0,
                  }}
                >
                  {services.slice(0, 8).map((service) => (
                    <li
                      key={service}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {service}
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.85rem",
                    opacity: 0.8,
                  }}
                >
                  Visit website for a full list of services.
                </p>
              </section>
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
                  marginBottom: "10px",
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
            gap: "20px",
          }}
        >
          {/* HOURS */}
          {hours_json && (
            <section
              aria-labelledby="hours-heading"
              style={{
                borderRadius: "16px",
                padding: "18px",
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
                  marginBottom: "10px",
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
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "6px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ width: "70px", opacity: 0.9 }}>
                        {day.slice(0, 3)}:
                      </span>
                      <span style={{ opacity: 0.9 }}>{hours}</span>
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
                padding: "14px 18px",
                borderRadius: "999px",
                background: primary,
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
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
