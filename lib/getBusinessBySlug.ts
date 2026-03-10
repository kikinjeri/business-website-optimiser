// lib/getBusinessBySlug.ts
import { supabaseServer } from "@/lib/supabase/server";

export async function getBusinessBySlug(slug: string) {
  const supabase = await supabaseServer();

  // Fetch business
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (businessError || !business) {
    return { business: null, services: [], areas: [] };
  }

  // Fetch services
  const { data: servicesRaw } = await supabase
    .from("services")
    .select("name_en")
    .eq("business_id", business.id);

  const services = servicesRaw?.map((s) => s.name_en) ?? [];

  // Fetch service areas
  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("area_name")
    .eq("business_id", business.id);

  const areas = areasRaw?.map((a) => a.area_name) ?? [];

  return {
    business,
    services,
    areas,
  };
}
