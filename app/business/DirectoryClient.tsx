// File: app/business/DirectoryClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Business = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  neighborhood: string | null;
  status: string | null;
  // If you add tags later: tags?: string[];
};

type Props = {
  businesses: Business[];
};

function normalizeName(name: string) {
  return name.trim().toUpperCase();
}

function getInitial(name: string) {
  const n = normalizeName(name);
  const first = n[0];
  return first && first >= "A" && first <= "Z" ? first : "#";
}

export default function DirectoryClient({ businesses }: Props) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = q
      ? businesses.filter((b) => {
          const parts: string[] = [];

          if (b.name) parts.push(b.name);
          if (b.category) parts.push(b.category);
          if (b.neighborhood) parts.push(b.neighborhood);
          // If you add tags later: if (b.tags) parts.push(b.tags.join(" "));

          const haystack = parts.join(" ").toLowerCase();
          return haystack.includes(q);
        })
      : businesses;

    const groups: Record<string, Business[]> = {};
    for (const b of filtered) {
      const letter = getInitial(b.name);
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(b);
    }

    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        businesses: groups[letter],
      }));
  }, [businesses, query]);

  return (
    <>
      <form
        className="directory-search"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Search businesses"
      >
        <label htmlFor="directory-search-input" className="sr-only">
          Search businesses
        </label>
        <input
          id="directory-search-input"
          type="search"
          placeholder="Search by name, category, neighborhood…"
          className="directory-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {filteredGroups.length === 0 && (
        <p className="directory-empty">No businesses match your search.</p>
      )}

      <section aria-label="Business directory" className="directory-list">
        {filteredGroups.map(({ letter, businesses }) => (
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
                    <Link href={`/business/${b.slug}`}>Business card</Link>
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
    </>
  );
}
