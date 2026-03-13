"use client";

import { useMemo } from "react";

type Hours = Record<string, string>;

export default function BusinessCard({
  name,
  tagline,
  address,
  phone,
  email,
  website,
  hours,
}: {
  name: string;
  tagline: string | null;
  address: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: Hours | null;
}) {
  /* ---------------------------------------------------------
     TIME PARSER (fixed midnight bug)
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     IS BUSINESS OPEN?
  --------------------------------------------------------- */
  const isOpen = useMemo(() => {
    if (!hours) return null;

    const now = new Date();
    const day = now
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const todayHours =
      hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];

    if (!todayHours || todayHours.trim() === "") return null;

    const [openStr, closeStr] = todayHours.split("-").map((s) => s.trim());
    const open = parseTime(openStr);
    const close = parseTime(closeStr);

    if (open === null || close === null) return null;

    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    // Handles ranges like 9AM–12AM (midnight)
    if (close < open) {
      return nowMinutes >= open || nowMinutes <= close;
    }

    return nowMinutes >= open && nowMinutes <= close;
  }, [hours]);

  /* ---------------------------------------------------------
     HOURS RENDERER
  --------------------------------------------------------- */
  function renderHours() {
    if (!hours) return null;

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
      <div className="business-card-hours">
        {days.map((day) => {
          const value =
            hours[day] || hours[day.charAt(0).toUpperCase() + day.slice(1)];

          if (!value || value.trim() === "") return null;

          const label = day.charAt(0).toUpperCase() + day.slice(1);

          return (
            <div key={day} className="business-card-hours-item">
              <span>{label}</span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <article className="business-card">
      <header>
        <h2 className="business-card__title">{name}</h2>
        {tagline && <p className="business-card__tagline">{tagline}</p>}
      </header>

      <section className="business-card__section">
        <p className="business-card__location">
          <strong>Location:</strong> {address}
        </p>

        {phone && (
          <p className="business-card__contact">
            <strong>Phone:</strong> {phone}
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
            >
              Visit website →
            </a>
          </p>
        )}

        {isOpen !== null && (
          <p className={`business-card__status ${isOpen ? "open" : "closed"}`}>
            {isOpen ? "Open now" : "Closed"}
          </p>
        )}
      </section>

      {renderHours()}
    </article>
  );
}
