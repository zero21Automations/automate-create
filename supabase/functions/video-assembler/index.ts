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

    // Fetch script and assets
    const { data: script } = await supabase
      .from("scripts")
      .select("*")
      .eq("idea_id", ideaId)
      .single();

    const { data: assets } = await supabase
      .from("assets")
      .select("*")
      .eq("idea_id", ideaId);

    const { data: idea } = await supabase
      .from("ideas")
      .select("*")
      .eq("id", ideaId)
      .single();

    // In production, this would use FFmpeg or a video API
    // For now, create assembly record with placeholder
    const { data: assembly, error: assemblyError } = await supabase
      .from("assemblies")
      .insert({
        idea_id: ideaId,
        script_id: script.id,
        duration: script.read_time,
        status: "ready",
        platform_versions: {
          tiktok: { aspect_ratio: "9:16", resolution: "1080x1920" },
          instagram: { aspect_ratio: "9:16", resolution: "1080x1920" },
          youtube: { aspect_ratio: "16:9", resolution: "1920x1080" }
        },
        video_url: "https://placeholder-video.com/assembly.mp4"
      })
      .select()
      .single();

    if (assemblyError) throw assemblyError;

    // Update idea status
    await supabase
      .from("ideas")
      .update({ status: "ready" })
      .eq("id", ideaId);

    // Log completion
    await supabase.from("audit_logs").insert({
      project_id: projectId,
      factory_job_id: jobId,
      action: "video_assembled",
      stage: "assembly",
      details: { ideaId, assemblyId: assembly.id }
    });

    // Advance to next stage
    await supabase.functions.invoke("factory-orchestrator", {
      body: { jobId, action: "advance" }
    });

    return new Response(JSON.stringify({ 
      success: true, 
      assembly 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Video assembly error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
