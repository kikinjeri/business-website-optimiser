"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Hours = Record<string, string>;

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
  is_accessible,
  supports_screen_readers,
  supports_keyboard_navigation,
  tags = [],
}: {
  name: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: Hours | null;
  areas: string[];
  slug: string;

  is_accessible?: boolean;
  supports_screen_readers?: boolean;
  supports_keyboard_navigation?: boolean;

  tags?: string[];
}) {
  const [showFullHours, setShowFullHours] = useState(false);

  /* ----------------------------------------------
   * BREADCRUMBS
   * ---------------------------------------------- */
  const breadcrumbs = (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/business">Business Directory</Link>
        </li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  );

  /* ----------------------------------------------
   * TIME PARSER
   * ---------------------------------------------- */
  function parseTime(str: string): number | null {
    if (!str) return null;

    const match = str.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
    if (!match) return null;

    let hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3]?.toUpperCase() ?? null;

    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

  /* ----------------------------------------------
   * IS BUSINESS OPEN?
   * ---------------------------------------------- */
  const isOpen = useMemo(() => {
    if (!hours) return null;

    const now = new Date();
    const day = now
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const todayHours =
      hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];

    if (!todayHours || todayHours.toLowerCase() === "closed") return false;

    const [openStr, closeStr] = todayHours.split("–").map((s) => s.trim());
    const open = parseTime(openStr);
    const close = parseTime(closeStr);

    if (open === null || close === null) return null;

    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    // Handles overnight hours (e.g., 8 PM – 2 AM)
    if (close < open) {
      return nowMinutes >= open || nowMinutes <= close;
    }

    return nowMinutes >= open && nowMinutes <= close;
  }, [hours]);

  /* ----------------------------------------------
   * TODAY'S HOURS
   * ---------------------------------------------- */
  function getTodayHours() {
    if (!hours) return null;

    const now = new Date();
    const day = now
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    return hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];
  }

  const todayHours = getTodayHours();

  /* ----------------------------------------------
   * FULL HOURS DROPDOWN
   * ---------------------------------------------- */
  function renderFullHours() {
    if (!hours || !showFullHours) return null;

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    return (
      <dl className="business-card-hours" aria-label="Weekly business hours">
        {days.map((day) => {
          const value =
            hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];
          if (!value) return null;

          const label = day.charAt(0).toUpperCase() + day.slice(1);

          return (
            <div key={day} className="business-card-hours-item">
              <dt>{label}</dt>
              <dd>
                <time>{value}</time>
              </dd>
            </div>
          );
        })}
      </dl>
    );
  }

  /* ----------------------------------------------
   * ACTION LINKS
   * ---------------------------------------------- */
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`
    : null;

  const callNow = phone ? `tel:${phone.replace(/\s+/g, "")}` : null;

  /* ----------------------------------------------
   * CLEAN DISPLAY URL
   * ---------------------------------------------- */
  const displayUrl =
    website
      ?.replace("https://", "")
      .replace("http://", "")
      .replace("www.", "") ?? "";

  /* ----------------------------------------------
   * RENDER
   * ---------------------------------------------- */
  return (
    <>
      {breadcrumbs}

      <article
        className="business-card"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <header>
          <h1 className="business-card__title" itemProp="name">
            {name}
          </h1>

          {tagline && (
            <p className="business-card__tagline" itemProp="description">
              {tagline}
            </p>
          )}

          {/* TRUST BADGES */}
          <div className="business-card__trust-badges">
            {is_accessible && (
              <span className="badge badge--green">Accessible</span>
            )}
            {supports_screen_readers && (
              <span className="badge badge--blue">Screen‑reader friendly</span>
            )}
            {supports_keyboard_navigation && (
              <span className="badge badge--purple">Keyboard friendly</span>
            )}
          </div>

          {/* TAGS */}
          {tags.length > 0 && (
            <div className="business-card__tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <section className="business-card__section">
          <address className="business-card__location" itemProp="address">
            <strong>Location:</strong> {address}
          </address>

          {mapsUrl && (
            <p className="business-card__contact">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card__link"
              >
                Get Directions
              </a>
            </p>
          )}

          {phone && (
            <p className="business-card__contact">
              <strong>Phone:</strong> <span itemProp="telephone">{phone}</span>
            </p>
          )}

          {email && (
            <p className="business-card__contact">
              <strong>Email:</strong> {email}
            </p>
          )}

          {website && (
            <p className="business-card__contact">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card__link"
                itemProp="url"
              >
                {displayUrl}
              </a>
            </p>
          )}

          {todayHours && (
            <p className="business-card__status">
              <strong>Today:</strong> <time>{todayHours}</time>
              <span style={{ marginLeft: "0.5rem" }} />
              <button
                className="hours-toggle"
                aria-expanded={showFullHours}
                onClick={() => setShowFullHours(!showFullHours)}
              >
                {showFullHours ? "Hide full hours" : "View full hours"}
              </button>
            </p>
          )}
        </section>

        {renderFullHours()}

        {/* SERVICE AREAS */}
        {areas.length > 0 && (
          <section className="business-card__section">
            <h2>Service Areas</h2>
            <ul className="business-card-areas">
              {areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        <footer className="business-card-footer">
          {callNow && (
            <a
              href={callNow}
              className="business-card-btn"
              aria-label={`Call ${name}`}
            >
              Call Now
            </a>
          )}

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="business-card-btn"
              aria-label={`Get a quote from ${name}`}
            >
              Get a Quote
            </a>
          )}
        </footer>
      </article>
    </>
  );
}
