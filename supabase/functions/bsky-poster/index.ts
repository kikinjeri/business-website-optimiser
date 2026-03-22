// supabase/functions/bsky-poster/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BskyAgent } from "npm:@atproto/api";

serve(async (req) => {
  // Allow ?no-verify-jwt=1 to bypass auth
  const url = new URL(req.url);
  const skipAuth = url.searchParams.get("no-verify-jwt") === "1";

  if (!skipAuth) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ code: 401, message: "Missing authorization header" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SERVICE_ROLE_KEY")!
  );

  // 1. Find the next pending scheduled post
  const { data: post, error: fetchError } = await supabase
    .from("scheduled_posts")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true })
    .limit(1)
    .single();

  if (fetchError || !post) {
    return new Response("No pending posts", { status: 200 });
  }

  // 2. Authenticate with Bluesky
  const agent = new BskyAgent({
    service: Deno.env.get("BLUESKY_SERVICE_URL")!,
  });

  await agent.login({
    identifier: Deno.env.get("BLUESKY_USERNAME")!,
    password: Deno.env.get("BLUESKY_APP_PASSWORD")!,
  });

  // 3. Post to Bluesky
  const record = {
    $type: "app.bsky.feed.post",
    text: post.content,
    createdAt: new Date().toISOString(),
  };

  const response = await agent.post(record);

  // 4. Update scheduled_posts
  await supabase
    .from("scheduled_posts")
    .update({
      status: "posted",
      post_uri: response.uri,
    })
    .eq("id", post.id);

  // 5. Log into bsky_posts
  await supabase.from("bsky_posts").insert({
    business_id: post.business_id,
    embed_id: post.embed_id,
    post_uri: response.uri,
  });

  return new Response("Posted to Bluesky", { status: 200 });
});
