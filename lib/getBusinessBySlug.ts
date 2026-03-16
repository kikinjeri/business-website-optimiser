// File: src/lib/getBusinessBySlug.ts

import { supabaseServer } from "@/lib/supabase/server";

export type Business = {
  id: string;
  name: string;
  slug: string;
  tagline_en: string | null;
  category: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  hours_json: unknown | null;
  seo_keywords: string[] | null;
  is_accessible: boolean | null;
  supports_screen_readers: boolean | null;
  supports_keyboard_navigation: boolean | null;
  neighborhood: string | null;
};

export type ServiceArea = {
  name_en: string;
};

export type GetBusinessBySlugResult = {
  business: (Business & { tags: string[] }) | null;
  areas: string[];
};

/**
 * Canonical data fetcher for a single business.
 * Used by business page, card page, embed code page, etc.
 * Returns a stable, services‑free shape: { business, areas }.
 */
export async function getBusinessBySlug(
  slug: string,
): Promise<GetBusinessBySlugResult> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      id,
      name,
      slug,
      tagline_en,
      category,
      address,
      phone,
      email,
      website_url,
      hours_json,
      seo_keywords,
      is_accessible,
      supports_screen_readers,
      supports_keyboard_navigation,
      neighborhood,
      service_areas:service_areas(name_en)
    `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return {
      business: null,
      areas: [],
    };
  }

  const areas =
    (data.service_areas as ServiceArea[] | null | undefined)
      ?.map((a) => a.name_en)
      .filter(Boolean) ?? [];

  const {
    service_areas: _serviceAreas,
    seo_keywords,
    ...rest
  } = data as any;

  const business: Business & { tags: string[] } = {
    ...(rest as Business),
    tags: Array.isArray(seo_keywords)
      ? seo_keywords.filter((t) => typeof t === "string")
      : [],
  };

  return {
    business,
    areas,
  };
}
