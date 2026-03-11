"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  // Extract slug if URL contains /business/[slug]
  const slugMatch = pathname.match(/\/business\/([^\/]+)/);
  const slug = slugMatch ? slugMatch[1] : null;

  // Load theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          Business Optimiser
        </Link>

        {/* Desktop */}
        <div className="navbar-links">
          <Link href="/business">Directory</Link>

          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>

          {slug && (
            <>
              <Link href={`/business/${slug}/embed-code`}>Embed Code</Link>
              <Link href={`/dashboard/analytics/${slug}`}>Analytics</Link>
            </>
          )}

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
        <Link href="/business" onClick={() => setMenuOpen(false)}>
          Directory
        </Link>
        <Link href="/guide" onClick={() => setMenuOpen(false)}>
          Guide
        </Link>
        <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        {slug && (
          <>
            <Link
              href={`/business/${slug}/embed-code`}
              onClick={() => setMenuOpen(false)}
            >
              Embed Code
            </Link>
            <Link
              href={`/dashboard/analytics/${slug}`}
              onClick={() => setMenuOpen(false)}
            >
              Analytics
            </Link>
          </>
        )}

        <button
          className="theme-toggle mobile-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
