"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Business = {
  id: string;
  name: string;
  slug: string;
  category?: string;
  location?: string;
  status?: string;
  dataQuality?: number;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

function normalizeName(name: string) {
  return name.trim().toUpperCase();
}

function getInitial(name: string) {
  const n = normalizeName(name);
  const first = n[0];
  return first && first >= "A" && first <= "Z" ? first : "#";
}

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, slug, category, neighborhood");

      if (!error && data) {
        const mapped = data.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          category: b.category || "",
          location: b.neighborhood || "Ottawa",
          status: "active", // placeholder for future
          dataQuality: 82, // placeholder for future
        }));

        setBusinesses(mapped);
      }

      setLoading(false);
    }

    load();
  }, []);

  const filteredAndGrouped = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = businesses
      .filter((b) => {
        if (!q) return true;
        const haystack =
          `${b.name} ${b.category ?? ""} ${b.location ?? ""}`.toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) =>
        normalizeName(a.name).localeCompare(normalizeName(b.name)),
      );

    const groups: Record<string, Business[]> = {};
    for (const b of filtered) {
      const initial = getInitial(b.name);
      if (!groups[initial]) groups[initial] = [];
      groups[initial].push(b);
    }

    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        businesses: groups[letter],
      }));
  }, [query, businesses]);

  return (
    <main className="directory-page">
      <header className="directory-header">
        <h1>Business Directory</h1>
        <p>Browse and manage all businesses in the system.</p>

        <div className="directory-search">
          <label htmlFor="directory-search-input" className="sr-only">
            Search businesses
          </label>
          <input
            id="directory-search-input"
            type="search"
            placeholder="Search businesses…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="directory-search-input"
          />
        </div>
      </header>

      {loading && <p>Loading businesses…</p>}

      {!loading && (
        <section aria-label="Business directory" className="directory-list">
          {filteredAndGrouped.length === 0 && (
            <p className="directory-empty">No businesses found.</p>
          )}

          {filteredAndGrouped.map(({ letter, businesses }) => (
            <section key={letter} className="directory-section">
              <h2 className="directory-section-letter">{letter}</h2>

              <ul className="directory-section-list">
                {businesses.map((b) => (
                  <li key={b.slug} className="directory-row">
                    <div className="directory-row-left">
                      <h3 className="directory-row-name">{b.name}</h3>

                      {(b.category || b.location) && (
                        <p className="directory-row-meta">
                          {b.category && <span>{b.category}</span>}
                          {b.category && b.location && <span>•</span>}
                          {b.location && <span>{b.location}</span>}
                        </p>
                      )}

                      <div className="directory-row-badges">
                        <span className="badge badge-status">{b.status}</span>
                        <span className="badge badge-quality">
                          {b.dataQuality}% quality
                        </span>
                      </div>
                    </div>

                    <nav
                      className="directory-row-actions"
                      aria-label={`Actions for ${b.name}`}
                    >
                      <Link href={`/business/${b.slug}`}>View</Link>
                      <Link href={`/business/${b.slug}?embed=1`}>Preview</Link>
                      <Link href={`/business/${b.slug}/embed-code`}>Embed</Link>
                      <Link href={`/dashboard/analytics/${b.slug}`}>
                        Analytics
                      </Link>
                    </nav>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
      )}
    </main>
  );
}
