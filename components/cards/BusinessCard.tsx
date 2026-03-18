"use client";

import { useState } from "react";

type BusinessCardProps = {
  name: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: Record<string, string> | null;
  areas: string[];
  slug: string;
  tags: string[];
  lat?: number | null;
  lng?: number | null;
};

export default function BusinessCard({
  name,
  tagline,
  address,
  phone,
  email,
  website,
  hours,
  areas,
  slug,
  tags,
  lat,
  lng,
}: BusinessCardProps) {
  const [showAllAreas, setShowAllAreas] = useState(false);
  const [showHours, setShowHours] = useState(false);

  // Normalize website URL
  const normalizedWebsite = website
    ? website.startsWith("http")
      ? website
      : `https://${website}`
    : null;

  // Clean tags
  const cleanedTags = Array.from(
    new Set((tags || []).map((t) => t.trim().toLowerCase()).filter(Boolean)),
  );

  // Service areas sorted alphabetically
  const sortedAreas = [...areas].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  );

  const previewAreas = sortedAreas.slice(0, 6);
  const showToggleAreas = sortedAreas.length > 6;
  const areasToDisplay = showAllAreas ? sortedAreas : previewAreas;

  // Hours sorted Monday → Sunday
  const orderedDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const sortedHours =
    hours &&
    orderedDays
      .filter((day) => hours[day])
      .map((day) => [day, hours[day]] as [string, string]);

  // Google Maps Directions URL
  const directionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            address,
          )}`
        : null;

  return (
    <section className="business-card">
      {/* Title */}
      <h1 className="business-card__title">{name}</h1>

      {/* Tagline */}
      {tagline && (
        <p className="business-card__tagline">
          <strong>{tagline}</strong>
        </p>
      )}

      {/* Tags */}
      {cleanedTags.length > 0 && (
        <p className="business-card__tags">{cleanedTags.join(", ")}</p>
      )}

      {/* Location + Contact */}
      <div className="business-card__section">
        {address && <p className="business-card__location">{address}</p>}

        {phone && (
          <p className="business-card__contact">
            <a href={`tel:${phone}`} className="business-card__link">
              {phone}
            </a>
          </p>
        )}

        {email && (
          <p className="business-card__contact">
            <a href={`mailto:${email}`} className="business-card__link">
              {email}
            </a>
          </p>
        )}

        {normalizedWebsite && (
          <p className="business-card__contact">
            <a
              href={normalizedWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="business-card__link"
            >
              {normalizedWebsite}
            </a>
          </p>
        )}
      </div>

      {/* Hours (collapsible) */}
      {sortedHours && (
        <div className="business-card__section">
          <h3>Hours</h3>

          {!showHours && (
            <button
              className="business-card-areas-toggle"
              onClick={() => setShowHours(true)}
            >
              View hours
            </button>
          )}

          {showHours && (
            <>
              <div className="business-card-hours">
                {sortedHours.map(([day, value]) => (
                  <div key={day} className="business-card-hours-item">
                    <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <button
                className="business-card-areas-toggle"
                onClick={() => setShowHours(false)}
              >
                Hide hours
              </button>
            </>
          )}
        </div>
      )}

      {/* Service Areas (clean text-only, collapsible) */}
      {areasToDisplay.length > 0 && (
        <div className="business-card__section">
          <h3>Service Areas</h3>

          <div className="business-card-areas-inline">
            {areasToDisplay.map((area) => (
              <span key={area} className="business-card-area-text">
                {area}
              </span>
            ))}
          </div>

          {showToggleAreas && (
            <button
              className="business-card-areas-toggle"
              onClick={() => setShowAllAreas(!showAllAreas)}
            >
              {showAllAreas ? "Hide full list" : "View full service area list"}
            </button>
          )}
        </div>
      )}

      {/* CTA Footer — bold accent links */}
      <div className="business-card-footer">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="business-card__link"
            style={{ fontWeight: 700 }}
          >
            <span aria-hidden="true">📞</span> Call Now
          </a>
        )}

        {normalizedWebsite && (
          <a
            href={normalizedWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="business-card__link"
            style={{ fontWeight: 700 }}
          >
            <span aria-hidden="true">↗️</span> Get a Quote
          </a>
        )}

        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="business-card__link"
            style={{ fontWeight: 700 }}
          >
            <span aria-hidden="true">📍</span> Get Directions
          </a>
        )}
      </div>
    </section>
  );
}
