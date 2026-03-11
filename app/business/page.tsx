"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Business = {
  name: string;
  slug: string;
  category?: string;
  location?: string;
};

const BUSINESSES: Business[] = [
  {
    name: "Electrical Standard Inc.",
    slug: "electrical-standard",
    category: "Electrician",
    location: "Ottawa",
  },
  {
    name: "Plumbing Express",
    slug: "plumbing-express",
    category: "Plumbing",
    location: "Ottawa",
  },
  {
    name: "Ottawa's Handyman",
    slug: "ottawas-handyman",
    category: "Handyman",
    location: "Ottawa",
  },
  {
    name: "Pest Control Ottawa Inc.",
    slug: "pest-control-ottawa",
    category: "Pest Control",
    location: "Ottawa",
  },
  {
    name: "Francis Home Environment",
    slug: "francis-home",
    category: "HVAC",
    location: "Ottawa",
  },
];

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

  const filteredAndGrouped = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = BUSINESSES.filter((b) => {
      if (!q) return true;
      const haystack =
        `${b.name} ${b.category ?? ""} ${b.location ?? ""}`.toLowerCase();
      return haystack.includes(q);
    }).sort((a, b) =>
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
  }, [query]);

  return (
    <main className="directory-page">
      <section className="directory-header">
        <h1>Business Directory</h1>
        <p>
          Browse all tracked businesses in alphabetical order. Use this
          directory to quickly access analytics, embed code, and card previews.
        </p>
      </section>

      <section className="directory-search" aria-label="Search businesses">
        <label htmlFor="directory-search-input" className="sr-only">
          Search businesses
        </label>
        <input
          id="directory-search-input"
          type="search"
          className="directory-search-input"
          placeholder="Search businesses…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="directory-list" aria-label="Business directory">
        {filteredAndGrouped.length === 0 && (
          <p className="directory-empty">
            No businesses found. Try a different search.
          </p>
        )}

        {filteredAndGrouped.map(({ letter, businesses }) => (
          <div key={letter} className="directory-section">
            <h2 className="directory-section-letter">{letter}</h2>

            <ul className="directory-section-list">
              {businesses.map((b) => (
                <li
                  key={b.slug}
                  className="directory-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* LEFT SIDE */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <h3
                      className="directory-row-name"
                      style={{
                        margin: 0,
                        fontSize: "1.05rem",
                        fontWeight: 600,
                      }}
                    >
                      {b.name}
                    </h3>

                    {(b.category || b.location) && (
                      <p
                        className="directory-row-meta"
                        style={{
                          margin: 0,
                          opacity: 0.75,
                          fontSize: "0.9rem",
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        {b.category && <span>{b.category}</span>}
                        {b.category && b.location && <span>•</span>}
                        {b.location && <span>{b.location}</span>}
                      </p>
                    )}
                  </div>

                  {/* RIGHT SIDE — ACTION LINKS */}
                  <nav
                    className="directory-row-actions"
                    aria-label={`Actions for ${b.name}`}
                    style={{
                      display: "flex",
                      gap: "16px",
                      fontSize: "0.9rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Link href={`/dashboard/analytics/${b.slug}`}>
                      Analytics
                    </Link>
                    <Link href={`/business/${b.slug}/embed-code`}>
                      Embed Code
                    </Link>
                    <Link href={`/card/${b.slug}?embed=1`}>Preview</Link>
                    <Link href={`/business/${b.slug}`}>View</Link>
                  </nav>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
