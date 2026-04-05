// /supabase/functions/publish_thread/index.ts

import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { BskyAgent } from "npm:@atproto/api";

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    //
    // 1. GET NEXT UNPUBLISHED THREAD
    //
    const { data: queue, error: queueError } = await supabase
      .from("post_queue")
      .select("*")
      .eq("published", false)
      .order("scheduled_for", { ascending: true })
      .limit(1)
      .single();

    if (queueError || !queue) {
      return new Response(
        JSON.stringify({ message: "No posts to publish" }),
        { status: 200 }
      );
    }

    //
    // 2. LOGIN TO BLUESKY
    //
    const agent = new BskyAgent({ service: "https://bsky.social" });

    await agent.login({
      identifier: Deno.env.get("BSKY_USERNAME")!,
      password: Deno.env.get("BSKY_PASSWORD")!,
    });

    //
    // 3. POST THE THREAD
    //
    let replyRef: any = undefined;

    for (const post of queue.posts) {
      const res = await agent.post({
        text: post,
        reply: replyRef,
      });

      // Build reply chain
      replyRef = {
        root: replyRef?.root ?? res.uri,
        parent: res.uri,
      };
    }

    //
    // 4. MARK AS PUBLISHED
    //
    const { error: updateError } = await supabase
      .from("post_queue")
      .update({ published: true })
      .eq("id", queue.id);

    if (updateError) {
      return new Response(
        JSON.stringify({
          error: "Failed to update post_queue",
          details: updateError,
        }),
        { status: 500 }
      );
    }

    //
    // 5. LOG SUCCESS
    //
    await supabase.from("post_logs").insert({
      post_queue_id: queue.id,
      status: "success",
      message: "Thread posted successfully",
    });

    return new Response(
      JSON.stringify({
        status: "posted",
        id: queue.id,
        theme: queue.theme,
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Unexpected error in publish_thread",
        details: String(err),
      }),
      { status: 500 }
    );
  }
});
