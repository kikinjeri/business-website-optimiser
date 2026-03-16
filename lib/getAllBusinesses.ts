// File: lib/getAllBusinesses.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function getAllBusinesses() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, slug, category, neighborhood, status")
    .order("name", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}
