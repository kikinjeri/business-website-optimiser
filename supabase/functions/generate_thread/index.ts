// /supabase/functions/generate_thread/index.ts

import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    //
    // 1. GET TODAY'S THEME
    //
    const themeRes = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/choose_theme`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
      }
    );

    const { theme } = await themeRes.json();
    if (!theme) {
      return new Response(
        JSON.stringify({ error: "No theme returned from choose_theme" }),
        { status: 500 }
      );
    }

    //
    // 2. EMBED THE THEME FOR SEMANTIC SEARCH
    //
    const embedRes = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/embed_chunk`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: theme }),
      }
    );

    if (!embedRes.ok) {
      const err = await embedRes.text();
      return new Response(
        JSON.stringify({ error: "Embedding failed", details: err }),
        { status: 500 }
      );
    }

    const { embedding } = await embedRes.json();

    //
    // 3. SEMANTICALLY RETRIEVE RELEVANT RAG CHUNKS
    //
    const { data: chunks, error: matchError } = await supabase.rpc(
      "match_rag_chunks",
      {
        query_embedding: embedding,
        match_threshold: 0.75,
        match_count: 40,
      }
    );

    if (matchError) {
      return new Response(
        JSON.stringify({ error: "match_rag_chunks failed", details: matchError }),
        { status: 500 }
      );
    }

    if (!chunks || chunks.length === 0) {
      return new Response(
        JSON.stringify({ error: "No RAG chunks found for theme" }),
        { status: 404 }
      );
    }

    //
    // 4. GROUP CHUNKS BY usage_hint
    //
    const grouped: Record<string, any[]> = {};
    for (const c of chunks) {
      const key = c.usage_hint ?? "misc";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(c);
    }

    const pick = (arr: any[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    //
    // 5. BUILD A MINI-THREAD (3–5 POSTS)
    //
    const thread = [
      grouped["hook"] ? pick(grouped["hook"]).content : null,
      grouped["explanation"] ? pick(grouped["explanation"]).content : null,
      grouped["example"] ? pick(grouped["example"]).content : null,
      grouped["why"] ? pick(grouped["why"]).content : null,
      grouped["cta"] ? pick(grouped["cta"]).content : null,
    ].filter(Boolean);

    if (thread.length === 0) {
      return new Response(
        JSON.stringify({ error: "No usable chunks for thread" }),
        { status: 500 }
      );
    }

    //
    // 6. STORE THREAD IN post_queue
    //
    const { error: insertError } = await supabase
      .from("post_queue")
      .insert({
        theme,
        posts: thread,
        scheduled_for: new Date().toISOString(),
      });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Failed to insert into post_queue", details: insertError }),
        { status: 500 }
      );
    }

    //
    // 7. RETURN SUCCESS
    //
    return new Response(
      JSON.stringify({
        status: "ok",
        theme,
        posts: thread,
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500 }
    );
  }
});
