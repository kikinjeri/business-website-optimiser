// /supabase/functions/embed_chunk/index.ts

import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'content' field" }),
        { status: 400 }
      );
    }

    // Generate embedding using OpenAI
    const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        input: content,
        model: "text-embedding-3-small",
      }),
    });

    if (!embeddingRes.ok) {
      const err = await embeddingRes.text();
      return new Response(
        JSON.stringify({ error: "OpenAI error", details: err }),
        { status: 500 }
      );
    }

    const json = await embeddingRes.json();
    const embedding = json.data[0].embedding;

    return new Response(JSON.stringify({ embedding }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      { status: 500 }
    );
  }
});
