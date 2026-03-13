// lib/getBusinessBySlug.ts

import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  const supabase = await supabaseServer();

  // Explicitly select the fields you actually use
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      slug,
      tagline_en,
      address,
      phone,
      email,
      website_url,
      hours_json,
      is_accessible,
      supports_screen_readers,
      supports_keyboard_navigation
    `)
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    console.error("Business fetch failed:", businessError);
    return { business: null, services: [], areas: [] };
  }

  // SERVICES
  const { data: services } = await supabase
    .from("business_services_view")
    .select("name_en")
    .eq("business_id", business.id);

  // SERVICE AREAS
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
