"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  // Load theme from localStorage
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
          Business Website Optimiser
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/business">Directory</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/contact">Contact</Link>

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
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link href="/business" onClick={() => setMenuOpen(false)}>
          Directory
        </Link>
        <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

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
