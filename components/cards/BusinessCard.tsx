import Link from "next/link";

type BusinessCardProps = {
  name: string;
  slug?: string;
  tagline?: string | null;
  phone?: string | null;
  address?: string | null;
  website_url?: string | null;
  services?: string[];
  hours?: Record<string, string> | null;
  service_areas?: string[] | null;
  serviceAreasFull?: string[] | null;
  neighborhood?: string | null;
  theme?: {
    primary: string;
    accent: string;
    text: string;
    background: string;
  };
  lat?: number | string | null;
  lng?: number | string | null;
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

function convertToEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("/embed")) return url;
  const encoded = encodeURIComponent(url);
  return `https://www.google.com/maps/embed?pb=${encoded}`;
}

function buildServiceAreaTag(service_areas?: string[] | null): string {
  if (service_areas && service_areas.length > 0) {
    const sorted = [...service_areas].sort((a, b) => a.localeCompare(b, "en"));
    if (sorted.length <= 3) return `Serving ${sorted.join(", ")}`;
    return `Serving ${sorted.slice(0, 3).join(", ")} and more`;
  }
  return "Serving Ottawa";
}

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
  return now >= startDate && now <= endDate ? "open" : "closed";
}

export default function BusinessCard(props: BusinessCardProps) {
  const {
    name,
    slug,
    tagline,
    phone,
    address,
    website_url,
    services,
    hours,
    service_areas,
    serviceAreasFull,
    neighborhood,
    lat,
    lng,
    map_url,
  } = props;

  const safeServices = Array.isArray(services) ? services : [];
  const hasServices = safeServices.length > 0;
  const hasHours = hours && Object.keys(hours).length > 0;

  const openStatus = getOpenStatus(hours ?? null);
  const serviceAreaTag = buildServiceAreaTag(service_areas);

  const websiteDomain = website_url
    ? website_url.replace("https://", "").replace("http://", "").split("/")[0]
    : null;

  return (
    <article className="business-card" aria-label={`${name} business profile`}>
      {/* Header */}
      <header className="business-card-header">
        <h1 className="business-card-title">{name}</h1>
        {tagline && <p className="business-card-tagline">{tagline}</p>}
      </header>

      {/* Contact + Location */}
      <section className="business-card-info-grid">
        <div>
          {address && (
            <p className="business-card-info-item">
              <span className="business-card-label">📍 Address:</span> {address}
            </p>
          )}

          {neighborhood && (
            <p className="business-card-info-item">
              <span className="business-card-label">🏙️ Neighbourhood:</span>{" "}
              {neighborhood}
            </p>
          )}

          {serviceAreasFull && serviceAreasFull.length > 0 && (
            <p className="business-card-info-item">
              <span className="business-card-label">🗺️ Service areas:</span>{" "}
              {serviceAreasFull.join(", ")}
            </p>
          )}

          {phone && (
            <p className="business-card-info-item">
              <span className="business-card-label">📞 Phone:</span>{" "}
              <a href={`tel:${phone}`} className="business-card-link">
                {phone}
              </a>
            </p>
          )}

          {websiteDomain && (
            <p className="business-card-info-item">
              <span className="business-card-label">🌐 Website:</span>{" "}
              <a
                href={website_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="business-card-link"
              >
                {websiteDomain} →
              </a>
            </p>
          )}
        </div>

        {/* Hours */}
        {hasHours && (
          <div>
            <p className="business-card-hours-title">
              🕒 Hours{" "}
              {openStatus && (
                <span
                  className={
                    openStatus === "open"
                      ? "business-card-open"
                      : "business-card-closed"
                  }
                >
                  {openStatus === "open" ? "Open now" : "Closed"}
                </span>
              )}
            </p>

            <dl className="business-card-hours-list">
              {DAY_ORDER.map((day) => {
                const key = day.toLowerCase();
                const value = hours![key];
                if (!value) return null;

                return (
                  <div key={day} className="business-card-hours-row">
                    <dt>{DAY_LABELS[key]}</dt>
                    <dd>{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}
      </section>

      {/* Services */}
      {hasServices && (
        <section className="business-card-section">
          <h2 className="business-card-section-title">
            🛠️ Services at a glance
          </h2>

          <ul className="business-card-services-grid">
            {safeServices.slice(0, 8).map((service, idx) => (
              <li key={idx} className="business-card-service-tag">
                {service}
              </li>
            ))}
          </ul>

          {safeServices.length > 8 && (
            <p className="business-card-more-services">
              + {safeServices.length - 8} more services
            </p>
          )}
        </section>
      )}

      {/* Mini Map */}
      {map_url && (
        <section className="business-card-section">
          <h2 className="business-card-section-title">🗺️ Location</h2>

          <iframe
            width="100%"
            height="180"
            className="business-card-map"
            loading="lazy"
            src={convertToEmbedUrl(map_url)}
          ></iframe>

          <a
            href={
              lat && lng
                ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
                : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    address || "",
                  )}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="business-card-map-link"
          >
            Get directions →
          </a>
        </section>
      )}

      {/* Footer tags */}
      <footer className="business-card-footer">
        <span className="business-card-footer-tag">
          📍 Local Ottawa business
        </span>
        <span className="business-card-footer-tag">🗺️ {serviceAreaTag}</span>
      </footer>

      {/* Navigation Links */}
      {slug && (
        <div className="business-card-links">
          <Link href={`/business/${slug}`} className="business-card-link">
            View full business page →
          </Link>

          <Link
            href={`/business/${slug}/embed-code`}
            className="business-card-link"
          >
            Get embed code →
          </Link>

          <Link href="/business" className="business-card-link">
            Back to businesses →
          </Link>
        </div>
      )}
    </article>
  );
}
