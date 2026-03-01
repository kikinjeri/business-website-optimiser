import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import BusinessCard from "@/components/BusinessCard"; // ✅ FIXED

export default async function BusinessPage() {
  const supabase = await supabaseServer();

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("id, name, slug, tagline_en, phone, address")
    .order("name");

  if (error) return <p>Error loading businesses.</p>;

  return (
    <main className="business-page">
      <nav className="navbar" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            Business Website Optimiser
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/business">Businesses</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      <h1 className="business-title">Local Businesses</h1>

      <section className="business-list">
        {businesses.map((b) => (
          <BusinessCard
            key={b.id}
            name={b.name}
            tagline={b.tagline_en}
            phone={b.phone}
            address={b.address}
            slug={b.slug}
          />
        ))}
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Business Website Optimiser
      </footer>
    </main>
  );
}
