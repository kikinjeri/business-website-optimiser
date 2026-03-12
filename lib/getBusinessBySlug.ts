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

  // Fetch services (name_en)
  const { data: servicesRaw } = await supabase
    .from("services")
    .select("name_en")
    .eq("business_id", business.id);

  const services = servicesRaw?.map(s => s.name_en).filter(Boolean) ?? [];

  // Fetch service areas (name_en)
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("name_en")
    .eq("business_id", business.id);

  const areas = areasRaw?.map(a => a.name_en).filter(Boolean) ?? [];

  return {
    business,
    services,
    areas,
  };
}
