"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function logEvent(
  eventType: string,
  restaurantId: string,
  metadata: any = {}
) {
  const supabase = await supabaseServer();

  return supabase.from("analytics").insert({
    event_type: eventType,
    restaurant_id: restaurantId,
    metadata,
  });
}
