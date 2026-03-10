// app/business/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function BusinessDirectoryPage() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("businesses")
    .select("name, slug")
    .eq("status", "published")
    .order("name");

  return (
    <div>
      <h1 className="page-title">Business Directory</h1>

      <div className="business-list">
        {data?.map((b) => (
          <Link
            key={b.slug}
            href={`/business/${b.slug}`}
            className="business-link"
          >
            {b.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
