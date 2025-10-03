import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { jobId, ideaId, projectId } = await req.json();

    // Fetch assembly and idea
    const { data: assembly } = await supabase
      .from("assemblies")
      .select("*, ideas!inner(*)")
      .eq("idea_id", ideaId)
      .single();

    const { data: script } = await supabase
      .from("scripts")
      .select("*")
      .eq("idea_id", ideaId)
      .single();

    // Generate platform-optimized captions using Lovable AI
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    
    for (const platform of assembly.ideas.target_platforms || ["tiktok"]) {
      const captionPrompt = `Create a ${platform} caption for this video:
Title: ${assembly.ideas.title}
Hook: ${script?.hook}
CTA: ${script?.cta}
Hashtags: ${assembly.ideas.hashtags?.join(" ") || ""}

Make it platform-optimized and engaging.`;

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "user", content: captionPrompt }
          ]
        })
      });

      const aiData = await aiResponse.json();
      const caption = aiData.choices?.[0]?.message?.content || "";

      // Create publication record (would actually post to platform APIs)
      await supabase.from("publications").insert({
        assembly_id: assembly.id,
        platform: platform,
        caption: caption,
        hashtags: assembly.ideas.hashtags,
        status: "scheduled",
        scheduled_at: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
      });
    }

    // Update idea status
    await supabase
      .from("ideas")
      .update({ status: "published" })
      .eq("id", ideaId);

    // Log completion
    await supabase.from("audit_logs").insert({
      project_id: projectId,
      factory_job_id: jobId,
      action: "content_published",
      stage: "publish",
      details: { ideaId, assemblyId: assembly.id }
    });

    // Mark job as completed
    await supabase.from("factory_jobs").update({
      status: "completed",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).eq("id", jobId);

    return new Response(JSON.stringify({ 
      success: true 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Publishing error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
