"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  const supabase = await supabaseServer();

  // Fetch business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (businessError || !business) {
    console.error("Business fetch failed:", businessError);
    return { business: null, services: [], areas: [] };
  }

  // Normalize empty strings → null
  const businessClean = Object.fromEntries(
    Object.entries(business).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  );

  // Fetch services (ordered)
  const { data: servicesRaw, error: servicesError } = await supabase
    .from("services")
    .select("id, business_id, category_en, name_en, description_en, tags")
    .eq("business_id", business.id)
    .order("name_en", { ascending: true });

  if (servicesError) {
    console.error("Service fetch failed:", servicesError);
  }

  const services = servicesRaw ?? [];

  // Fetch service areas (ordered)
  const { data: areasRaw, error: areasError } = await supabase
    .from("service_areas")
    .select("name_en")
    .eq("business_id", business.id)
    .order("name_en", { ascending: true });

  if (areasError) {
    console.error("Areas fetch failed:", areasError);
  }

  const areas =
    areasRaw?.map((a) => (a.name_en && a.name_en.trim() !== "" ? a.name_en : null))
      .filter(Boolean) ?? [];

  return {
    business: businessClean,
    services,
    areas,
  };
}
