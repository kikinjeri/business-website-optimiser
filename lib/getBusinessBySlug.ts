// lib/getBusinessBySlug.ts

import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  // Create server-side Supabase client
  const supabase = await supabaseServer();

  // Fetch the business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    return { business: null, services: [], areas: [] };
  }

  // Fetch services for this business
  const { data: services } = await supabase
    .from("services")
    .select(
      "id, name_en, category_en, description_en, starting_price, tags"
    )
    .eq("business_id", business.id)
    .order("name_en", { ascending: true });

  // Fetch service areas for this business
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("name_en")
    .eq("business_id", business.id)
    .order("name_en", { ascending: true });

  const areas = areasRaw?.map((a) => a.name_en) ?? [];

  return {
    business,
    services: services ?? [],
    areas,
  };
}