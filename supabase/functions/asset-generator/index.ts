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

    // Fetch script and idea
    const { data: script, error: scriptError } = await supabase
      .from("scripts")
      .select("*, ideas!inner(*)")
      .eq("idea_id", ideaId)
      .single();

    if (scriptError) throw scriptError;

    // Generate voiceover using TTS
    const voiceoverText = [script.hook, ...script.beats, script.cta].join(" ");
    
    // Create placeholder assets (in production, would call real TTS/image APIs)
    const assets = [];

    // 1. Voiceover asset
    const { data: voiceoverAsset } = await supabase
      .from("assets")
      .insert({
        idea_id: ideaId,
        script_id: script.id,
        type: "voiceover",
        status: "ready",
        metadata: {
          voice_style: script.voice_style,
          duration: script.read_time,
          text: voiceoverText
        }
      })
      .select()
      .single();

    assets.push(voiceoverAsset);

    // 2. B-roll placeholder (would fetch from stock APIs)
    const { data: brollAsset } = await supabase
      .from("assets")
      .insert({
        idea_id: ideaId,
        script_id: script.id,
        type: "broll",
        status: "ready",
        metadata: {
          style: script.ideas.visual_style || "modern",
          clips_count: script.beats.length
        }
      })
      .select()
      .single();

    assets.push(brollAsset);

    // 3. Background music placeholder
    const { data: musicAsset } = await supabase
      .from("assets")
      .insert({
        idea_id: ideaId,
        script_id: script.id,
        type: "music",
        status: "ready",
        metadata: {
          mood: script.ideas.tone,
          duration: script.read_time + 5
        }
      })
      .select()
      .single();

    assets.push(musicAsset);

    // Update idea status
    await supabase
      .from("ideas")
      .update({ status: "assets_ready" })
      .eq("id", ideaId);

    // Log completion
    await supabase.from("audit_logs").insert({
      project_id: projectId,
      factory_job_id: jobId,
      action: "assets_generated",
      stage: "assets",
      details: { ideaId, assetCount: assets.length }
    });

    // Advance to next stage
    await supabase.functions.invoke("factory-orchestrator", {
      body: { jobId, action: "advance" }
    });

    return new Response(JSON.stringify({ 
      success: true, 
      assets 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Asset generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
