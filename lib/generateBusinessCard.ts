export type Business = {
  id: string;
  name: string;
  slug: string;
  category: string;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  address: string;
  hours_json: Record<string, string> | null;
  tagline_en: string | null;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatHours(hours: Record<string, string> | null): string {
  if (!hours) return "";

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const normalized = days.map((day) => {
    const value =
      hours[day] ||
      hours[day.charAt(0).toUpperCase() + day.slice(1)];

    if (!value || value.trim() === "") return null;

    const label = day.charAt(0).toUpperCase() + day.slice(1);

    return `<p style="margin: 0.25rem 0;"><strong>${label}:</strong> ${escapeHtml(
      value
    )}</p>`;
  });

  return normalized.filter(Boolean).join("\n");
}

export function generateBusinessCard(business: Business): string {
  const tagline = business.tagline_en || business.category;
  const hoursBlock = formatHours(business.hours_json);

  const contactBlock = [
    business.phone
      ? `<p style="margin: 0.25rem 0;"><strong>Phone:</strong> ${escapeHtml(
          business.phone
        )}</p>`
      : "",
    business.email
      ? `<p style="margin: 0.25rem 0;"><strong>Email:</strong> ${escapeHtml(
          business.email
        )}</p>`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const websiteLink = business.website_url
    ? `<a href="${business.website_url}" target="_blank" rel="noopener noreferrer" style="color: #0055ff;">Visit website →</a>`
    : "";

  return `
<article aria-labelledby="business-name" style="
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  max-width: 380px;
  font-family: system-ui, sans-serif;
">
  <header>
    <h2 id="business-name" style="
      margin: 0;
      font-size: 1.35rem;
      font-weight: 700;
      color: #111;
    ">
      ${escapeHtml(business.name)}
    </h2>

    <p style="
      margin: 0.5rem 0 1rem;
      color: #555;
      font-size: 1rem;
    ">
      ${escapeHtml(tagline)}
    </p>
  </header>

  <section aria-label="Business details">
    <p style="margin: 0.25rem 0; font-size: 1rem; color: #111;">
      <strong>Location:</strong> ${escapeHtml(business.address)}
    </p>

    ${hoursBlock}
    ${contactBlock}
  </section>

  <footer style="margin-top: 1rem;">
    ${websiteLink}
  </footer>
</article>
`.trim();
}
