"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSEO(formData: FormData) {
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;

  const updates = {
    category: formData.get("category"),
    neighborhood: formData.get("neighborhood"),
    seo_title: formData.get("seo_title"),
    seo_description: formData.get("seo_description"),
    seo_keywords: formData.get("seo_keywords"),
  };

  const serviceAreasRaw = formData.get("service_areas") as string | null;

  const supabase = supabaseServer();

  // Update business SEO + metadata
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
