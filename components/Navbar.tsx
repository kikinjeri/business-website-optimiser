"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? "color: var(--text);" : "";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          Business Web Optimiser
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <Link
            href="/"
            style={{ ...(pathname === "/" && { color: "var(--text)" }) }}
          >
            Home
          </Link>

          <Link
            href="/about"
            style={{ ...(pathname === "/about" && { color: "var(--text)" }) }}
          >
            About
          </Link>

          <Link
            href="/business"
            style={{
              ...(pathname === "/business" && { color: "var(--text)" }),
            }}
          >
            Directory
          </Link>

          <Link
            href="/dashboard"
            style={{
              ...(pathname === "/dashboard" && { color: "var(--text)" }),
            }}
          >
            Dashboard
          </Link>

          <Link
            href="/contact"
            style={{
              ...(pathname === "/contact" && { color: "var(--text)" }),
            }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${open ? "open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>

        <Link href="/directory" onClick={() => setOpen(false)}>
          Directory
        </Link>
        <Link href="/dashboard" onClick={() => setOpen(false)}>
          Dashboard
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
