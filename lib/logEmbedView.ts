import { supabaseServer } from "@/lib/supabase/server";

export async function logEmbedView({
  businessId,
  slug,
  referrer,
  userAgent,
  embed,
}: {
  businessId: string;
  slug: string;
  referrer?: string | null;
  userAgent?: string | null;
  embed?: boolean;
}) {
  try {
    const supabase = await supabaseServer();

    await supabase.from("embed_analytics").insert({
      business_id: businessId,
      slug,
      referrer,
      user_agent: userAgent,
      embed: embed ?? false,
    });
  } catch (error) {
    console.error("Embed analytics error:", error);
  }
}
