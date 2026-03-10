// app/layout.tsx
import "./globals.css";
import "../styles/styles.css";

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Business Web Optimiser",
  description:
    "Accessible, SEO‑friendly business profiles and embeddable cards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Navbar />

        <main className="page-container">{children}</main>
      </body>
    </html>
  );
}
