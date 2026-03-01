import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function BusinessPage() {
  const supabase = await supabaseServer();

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("id, name, phone, website_url, slug, tagline_en, address")
    .order("name");

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Error loading businesses</h1>
        <p>Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="business-directory">
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="Main">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              Business Website Optimiser
            </Link>

            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/business">Businesses</Link>
            </div>
          </div>
        </nav>

        <h1 className="directory-title">Local Businesses</h1>

        <section className="directory-list">
          {businesses?.map((b) => (
            <Link
              key={b.id}
              href={`/business/${b.slug}`}
              className="directory-row"
            >
              <span className="row-name">{b.name}</span>

              {b.tagline_en && (
                <span className="row-tagline">{b.tagline_en}</span>
              )}

              {b.phone && <span className="row-phone">{b.phone}</span>}

              {b.website_url && (
                <span className="row-website">
                  {b.website_url.replace("https://", "").replace("http://", "")}
                </span>
              )}

              {b.address && (
                <span className="row-city">
                  {b.address.split(",")[1]?.trim() || "—"}
                </span>
              )}

              <span className="row-view">View →</span>
            </Link>
          ))}
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Business Website Optimiser
        </footer>
      </div>
    </main>
  );
}
