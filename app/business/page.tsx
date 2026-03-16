// File: app/business/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import "@/styles/styles.css";

function normalizeName(name: string) {
  return name.trim().toUpperCase();
}

function getInitial(name: string) {
  const n = normalizeName(name);
  const first = n[0];
  return first && first >= "A" && first <= "Z" ? first : "#";
}

export default async function DirectoryPage() {
  const supabase = supabaseServer();

  // Fetch only the fields we actually use
  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, slug, category, neighborhood, status")
    .order("name", { ascending: true });

  const businesses = data || [];

  // Group alphabetically
  const groups: Record<string, typeof businesses> = {};
  for (const b of businesses) {
    const letter = getInitial(b.name);
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(b);
  }

  const sortedGroups = Object.keys(groups)
    .sort()
    .map((letter) => ({
      letter,
      businesses: groups[letter],
    }));

  return (
    <main className="directory-page">
      <header className="directory-header">
        <h1>Business Directory</h1>
        <p>Browse and manage all businesses in the system.</p>

        {/* Search is client-side only, so we keep it simple */}
        <form action="/business" method="GET" className="directory-search">
          <label htmlFor="q" className="sr-only">
            Search businesses
          </label>
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Search businesses…"
            className="directory-search-input"
            defaultValue=""
          />
        </form>
      </header>

      {sortedGroups.length === 0 && (
        <p className="directory-empty">No businesses found.</p>
      )}

      <section aria-label="Business directory" className="directory-list">
        {sortedGroups.map(({ letter, businesses }) => (
          <section key={letter} className="directory-section">
            <h2 className="directory-section-letter">{letter}</h2>

            <ul className="directory-section-list">
              {businesses.map((b) => (
                <li key={b.slug} className="directory-row">
                  <div className="directory-row-left">
                    <h3 className="directory-row-name">{b.name}</h3>

                    {(b.category || b.neighborhood) && (
                      <p className="directory-row-meta">
                        {b.category && <span>{b.category}</span>}
                        {b.category && b.neighborhood && <span>•</span>}
                        {b.neighborhood && <span>{b.neighborhood}</span>}
                      </p>
                    )}

                    {b.status && (
                      <div className="directory-row-badges">
                        <span className="badge badge-status">{b.status}</span>
                      </div>
                    )}
                  </div>

                  <nav
                    className="directory-row-actions"
                    aria-label={`Actions for ${b.name}`}
                  >
                    <Link href={`/business/${b.slug}`}>View</Link>
                    <Link href={`/card/${b.slug}?embed=1`}>Preview</Link>
                    <Link href={`/business/${b.slug}/embed-code`}>Embed</Link>
                    <Link href={`/dashboard/${b.slug}`}>Dashboard</Link>
                  </nav>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </main>
  );
}
