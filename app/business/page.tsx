// app/business/page.tsx
export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";

export default async function BusinessListPage() {
  const supabase = await supabaseServer();

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("name");

  if (error) {
    return <div>Error loading businesses.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Businesses</h1>
      <ul>
        {businesses?.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
