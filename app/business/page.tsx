// app/business/page.tsx

import { supabaseServer } from "@/lib/supabase/server";
import { formatTelephone } from "@/lib/formatters";

export default async function BusinessPage() {
  const supabase = await supabaseServer();

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("id, name, phone, email, website_url")
    .order("name");

  if (error) {
    return <p>Error loading businesses.</p>;
  }

  // Remove Ottawa's Handyman
  const filtered = businesses.filter(
    (b) => b.name.toLowerCase() !== "ottawa's handyman",
  );

  return (
    <main className="business-page">
      {/* GLOBAL HEADER */}
      <header className="global-header">
        <a href="/" className="header-logo">
          OBO
        </a>

        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <h1 className="business-title">Local Businesses</h1>

      <section className="business-list">
        {filtered.map((business) => (
          <div key={business.id} className="business-line">
            <span className="line-name">{business.name}</span>

            {business.phone && (
              <a href={`tel:${business.phone}`} className="line-phone">
                {formatTelephone(business.phone)}
              </a>
            )}

            {business.email && (
              <a href={`mailto:${business.email}`} className="line-email">
                {business.email}
              </a>
            )}

            {business.website_url && (
              <a
                href={business.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="line-website"
              >
                {business.website_url
                  .replace("https://", "")
                  .replace("http://", "")}
              </a>
            )}
          </div>
        ))}
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} OBO — Online Business Optimiser
      </footer>
    </main>
  );
}
