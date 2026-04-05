import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const today = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();

  const { data, error } = await supabase
    .from("theme_schedule")
    .select("theme")
    .eq("day_of_week", today)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ theme: data.theme }), {
    headers: { "Content-Type": "application/json" },
  });
});
