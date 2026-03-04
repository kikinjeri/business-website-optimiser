import "./globals.css";
import "../styles/styles.css";

export const metadata = {
  title: "Business Website Optimiser",
  description: "Structured, accessible, search‑ready business pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
