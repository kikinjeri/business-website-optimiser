"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  const supabase = await supabaseServer();

  // Fetch business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    return { business: null, services: [], areas: [] };
  }

  // Fetch full service rows
  const { data: servicesRaw } = await supabase
    .from("services")
    .select("id, business_id, category_en, name_en, description_en, tags")
    .eq("business_id", business.id);

  const services = servicesRaw ?? [];

  // Fetch service areas
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("name_en")
    .eq("business_id", business.id);

  const areas = areasRaw?.map((a) => a.name_en).filter(Boolean) ?? [];

  return {
    business,
    services,
    areas,
  };
}
