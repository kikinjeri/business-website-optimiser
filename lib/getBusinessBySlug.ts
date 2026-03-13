// lib/getBusinessBySlug.ts

import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  const supabase = await supabaseServer();

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    console.error("Business fetch failed:", businessError);
    return { business: null, services: [], areas: [] };
  }

  const { data: services } = await supabase
    .from("business_services_view")
    .select("name_en")
    .eq("business_id", business.id);

  const { data: areas } = await supabase
    .from("business_service_areas_view")
    .select("area_name")
    .eq("business_id", business.id);

  return {
    business,
    services: services?.map((s) => ({ name_en: s.name_en })) || [],
    areas: areas?.map((a) => a.area_name) || [],
  };
}
