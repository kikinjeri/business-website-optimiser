"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBusiness(formData: FormData) {
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;

  const updates = {
    name: formData.get("name"),
    tagline_en: formData.get("tagline_en"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    website_url: formData.get("website_url"),
  };

  const serviceAreasRaw = formData.get("service_areas") as string | null;

  const supabase = supabaseServer();

  // Update business fields
  await supabase.from("businesses").update(updates).eq("id", id);

  // Update service areas if included
  if (serviceAreasRaw) {
    const areas = serviceAreasRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Delete old areas
    await supabase.from("service_areas").delete().eq("business_id", id);

    // Insert new areas
    if (areas.length > 0) {
      await supabase.from("service_areas").insert(
        areas.map((name) => ({
          business_id: id,
          name_en: name,
        })),
      );
    }
  }

  revalidatePath(`/dashboard/${slug}`);
}
