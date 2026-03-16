// File: app/business/page.tsx
import { getAllBusinesses } from "@/lib/getAllBusinesses";
import DirectoryClient from "./DirectoryClient";
import "@/styles/styles.css";

export default async function DirectoryPage() {
  // Fetch all businesses server-side (fast, SEO-friendly)
  const businesses = await getAllBusinesses();

  return (
    <main className="directory-page">
      <header className="directory-header">
        <h1>Business Directory</h1>
        <p>Browse and manage all businesses in the system.</p>
      </header>

      {/* Client component handles search, filtering, grouping, links */}
      <DirectoryClient businesses={businesses} />
    </main>
  );
}
