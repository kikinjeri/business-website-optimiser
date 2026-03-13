"use client";

import React from "react";

type Service = {
  id: string | number;
  name_en: string;
  category_en?: string;
  description_en?: string;
  tags?: string[] | null;
};

type Business = {
  name: string;
  tagline_en?: string | null;
  tagline?: string | null;
  address?: string | null;
  phone?: string | null;
  website_url?: string | null;
  lat?: number | null;
  lng?: number | null;
  hours_json?: Record<string, string> | null;
  neighborhood?: string | null;
};

type Props = {
  business: Business | null;
  services: Service[];
  areas?: string[];
  searchParams?: Record<string, string>;
};

/* -------------------------------
   TIME PARSING + OPEN/CLOSED LOGIC
---------------------------------- */

function parseTime(str: string) {
  const match = str.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  let minute = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3]?.toUpperCase();

  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
}

function isBusinessOpen(hours_json?: Record<string, string> | null) {
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

  const parts = todayHours.split(/–|-/);
  if (parts.length !== 2) return null;

  const [openStr, closeStr] = parts.map((s) => s.trim());
  const open = parseTime(openStr);
  const close = parseTime(closeStr);
  if (!open || !close) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (close < open) {
    return nowMinutes >= open || nowMinutes <= close;
  }

  return nowMinutes >= open && nowMinutes <= close;
}

/* -------------------------------
   BUSINESS CARD COMPONENT
---------------------------------- */

export default function BusinessCard({ business, services, areas }: Props) {
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

  const websiteUrl =
    website_url &&
    (website_url.startsWith("http://") || website_url.startsWith("https://"))
      ? website_url
      : website_url
        ? `https://${website_url}`
        : null;

  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            address,
          )}`
        : null;

  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const isOpen = isBusinessOpen(hours_json || undefined);

  return (
    <article
      className="business-card"
      aria-label={`Business profile for ${name}`}
    >
      <div className="business-card-gradient" aria-hidden="true" />

      <div className="business-card-grid">
        {/* LEFT COLUMN */}
        <section
          className="business-card-main"
          aria-labelledby="business-heading"
        >
          <header className="business-card-header">
            <div>
              <h1 id="business-heading" className="business-card-title">
                {name}
              </h1>

              {(tagline_en || tagline) && (
                <p className="business-card-tagline">{tagline_en || tagline}</p>
              )}
            </div>

            {isOpen !== null && (
              <p
                className={`business-card-status ${
                  isOpen
                    ? "business-card-status--open"
                    : "business-card-status--closed"
                }`}
                aria-label={isOpen ? "Open now" : "Closed now"}
              >
                {isOpen ? "Open now" : "Closed now"}
              </p>
            )}
          </header>

          {address && (
            <section
              className="business-card-address"
              aria-labelledby="address-heading"
            >
              <h2 id="address-heading" className="sr-only">
                Address
              </h2>
              <p>{address}</p>
              {neighborhood && (
                <p className="business-card-neighborhood">{neighborhood}</p>
              )}
            </section>
          )}

          {phone && (
            <p className="business-card-phone">
              <span aria-hidden="true">📞</span>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          )}

          {websiteUrl && (
            <p className="business-card-website">
              <span aria-hidden="true">🌐</span>
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                {websiteUrl}
              </a>
            </p>
          )}

          {services?.length > 0 && (
            <section
              className="business-card-services"
              aria-labelledby="services-heading"
            >
              <h2 id="services-heading" className="business-card-section-label">
                Services
              </h2>

              <div className="business-card-services-inner">
                <strong className="business-card-services-title">
                  Services include:
                </strong>

                <ul className="business-card-services-list">
                  {services.slice(0, 8).map((service) => (
                    <li key={service.id} className="business-card-service-chip">
                      {service.name_en}
                    </li>
                  ))}
                </ul>

                <p className="business-card-services-note">
                  Visit website for a full list of services.
                </p>
              </div>
            </section>
          )}

          {areas && areas.length > 0 && (
            <section
              className="business-card-areas"
              aria-labelledby="areas-heading"
            >
              <h2 id="areas-heading" className="business-card-section-label">
                Service areas
              </h2>
              <p className="business-card-areas-text">{areas.join(", ")}</p>
            </section>
          )}

          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="business-card-directions-button"
            >
              Get directions
            </a>
          )}
        </section>

        {/* RIGHT COLUMN */}
        <section className="business-card-side" aria-label="Hours and location">
          {hours_json && (
            <section
              className="business-card-hours"
              aria-labelledby="hours-heading"
            >
              <h2 id="hours-heading" className="business-card-section-label">
                Hours
              </h2>

              <ul className="business-card-hours-list">
                {orderedDays.map((day) => {
                  const hours =
                    hours_json[day.toLowerCase()] ||
                    hours_json[day] ||
                    "Closed";

                  return (
                    <li key={day} className="business-card-hours-item">
                      <span className="business-card-hours-day">
                        {day.slice(0, 3)}:
                      </span>
                      <span className="business-card-hours-time">{hours}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </section>
      </div>
    </article>
  );
}
