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

    const { jobId, action } = await req.json();

    // Fetch job
    const { data: job, error: jobError } = await supabase
      .from("factory_jobs")
      .select("*, projects!inner(*)")
      .eq("id", jobId)
      .single();

    if (jobError) throw jobError;

    const automationConfig = job.projects.automation_config || {};
    
    // Log action
    await supabase.from("audit_logs").insert({
      project_id: job.project_id,
      factory_job_id: job.id,
      action: `orchestrator_${action}`,
      stage: job.current_stage,
      details: { jobId, action }
    });

    // Handle different actions
    if (action === "advance") {
      const nextStage = getNextStage(job.current_stage);
      const rule = await getAutomationRule(supabase, job.project_id, nextStage);
      
      if (rule?.checkpoint_required && !job.projects.dna_locked) {
        // Create checkpoint
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + (rule.checkpoint_timeout_hours || 24));
        
        await supabase.from("factory_jobs").update({
          status: "checkpoint",
          current_stage: nextStage,
          checkpoint_required: true,
          checkpoint_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString()
        }).eq("id", jobId);

        return new Response(JSON.stringify({ 
          success: true, 
          checkpoint: true,
          stage: nextStage 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Auto-advance based on stage
      await supabase.from("factory_jobs").update({
        status: "pending",
        current_stage: nextStage,
        updated_at: new Date().toISOString()
      }).eq("id", jobId);

      // Trigger appropriate agent
      await triggerStageAgent(supabase, job, nextStage, automationConfig);

      return new Response(JSON.stringify({ 
        success: true, 
        stage: nextStage 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "retry") {
      if (job.error_count >= 3) {
        await supabase.from("factory_jobs").update({
          status: "failed",
          last_error: "Max retries exceeded",
          updated_at: new Date().toISOString()
        }).eq("id", jobId);

        return new Response(JSON.stringify({ 
          success: false, 
          error: "Max retries exceeded" 
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      await supabase.from("factory_jobs").update({
        status: "pending",
        error_count: job.error_count + 1,
        updated_at: new Date().toISOString()
      }).eq("id", jobId);

      await triggerStageAgent(supabase, job, job.current_stage, automationConfig);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Orchestrator error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

function getNextStage(currentStage: string): string {
  const stages = ["research", "idea", "script", "assets", "assembly", "publish", "analytics"];
  const currentIndex = stages.indexOf(currentStage);
  return stages[currentIndex + 1] || "analytics";
}

async function getAutomationRule(supabase: any, projectId: string, stage: string) {
  const { data } = await supabase
    .from("automation_rules")
    .select("*")
    .eq("project_id", projectId)
    .eq("stage", stage)
    .single();
  return data;
}

async function triggerStageAgent(supabase: any, job: any, stage: string, config: any) {
  await supabase.from("factory_jobs").update({
    status: "running",
    updated_at: new Date().toISOString()
  }).eq("id", job.id);

  // Trigger appropriate edge function based on stage
  const functionMap: Record<string, string> = {
    "idea": "research-agent",
    "script": "script-generator",
    "assets": "asset-generator",
    "assembly": "video-assembler",
    "publish": "publisher-agent"
  };

  const functionName = functionMap[stage];
  if (functionName) {
    try {
      await supabase.functions.invoke(functionName, {
        body: { jobId: job.id, ideaId: job.idea_id, projectId: job.project_id }
      });
    } catch (error) {
      console.error(`Error invoking ${functionName}:`, error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      await supabase.from("factory_jobs").update({
        status: "failed",
        last_error: errorMessage,
        updated_at: new Date().toISOString()
      }).eq("id", job.id);
    }
  }
}
