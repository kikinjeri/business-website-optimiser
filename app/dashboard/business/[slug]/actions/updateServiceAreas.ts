"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateServiceAreas(formData: FormData) {
  const businessId = formData.get("business_id") as string;
  const slug = formData.get("slug") as string;

  const raw = formData.get("service_areas") as string;
  const areas = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const supabase = supabaseServer();

  // Remove old service areas
  await supabase.from("service_areas").delete().eq("business_id", businessId);

  // Insert new service areas
  if (areas.length > 0) {
    await supabase.from("service_areas").insert(
      areas.map((name) => ({
        business_id: businessId,
        name_en: name,
      })),
    );
  }

  revalidatePath(`/dashboard/${slug}`);
}
