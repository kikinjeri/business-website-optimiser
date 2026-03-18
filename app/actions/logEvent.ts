"use server";

import { headers } from "next/headers";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server.ts";

export async function logEvent(
  businessId: string,
  eventType: string,
  metadata: Record<string, any> = {},
) {
  const supabase = createClient();
  const h = headers();

  const ip = h.get("x-forwarded-for") || "0.0.0.0";
  const ip_hash = crypto.createHash("sha256").update(ip).digest("hex");
  const referrer = h.get("referer") || null;
  const user_agent = h.get("user-agent") || null;

  await supabase.from("analytics_events").insert({
    business_id: businessId,
    event_type: eventType,
    metadata,
    referrer,
    user_agent,
    ip_hash,
  });
}
