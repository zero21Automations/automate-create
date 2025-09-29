import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ideaData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Based on this content idea, generate structured DNA data:

Title: ${ideaData.title}
Description: ${ideaData.description || 'Not provided'}
Video Concept: ${ideaData.video_concept || 'Not provided'}
Target Duration: ${ideaData.target_duration || 60} seconds
Visual Style: ${ideaData.visual_style || 'modern'}
Tone: ${ideaData.tone || 'engaging'}
Hook Type: ${ideaData.hook_type || 'question'}
Target Platforms: ${ideaData.target_platforms?.join(', ') || 'tiktok'}
Content Pillars: ${ideaData.content_pillars?.join(', ') || 'None'}
Call to Action: ${ideaData.call_to_action || 'None'}
Hashtags: ${ideaData.hashtags?.join(', ') || 'None'}

Generate comprehensive DNA data for this content idea.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert content strategist. Generate detailed DNA data for content ideas that will help with content planning and creation."
          },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_idea_dna",
              description: "Generate comprehensive DNA data for a content idea",
              parameters: {
                type: "object",
                properties: {
                  seed: {
                    type: "object",
                    properties: {
                      inspiration_sources: {
                        type: "array",
                        items: { type: "string" },
                        description: "List of 3-5 inspiration sources or references"
                      },
                      core_message: {
                        type: "string",
                        description: "The central message or takeaway"
                      },
                      emotional_trigger: {
                        type: "string",
                        description: "Primary emotional response to evoke"
                      },
                      target_outcome: {
                        type: "string",
                        description: "What the viewer should do/feel after watching"
                      }
                    },
                    required: ["inspiration_sources", "core_message", "emotional_trigger", "target_outcome"]
                  },
                  concept: {
                    type: "object",
                    properties: {
                      narrative_structure: {
                        type: "string",
                        description: "How the story unfolds (problem-solution, before-after, etc.)"
                      },
                      visual_metaphors: {
                        type: "array",
                        items: { type: "string" },
                        description: "Key visual metaphors or symbols to use"
                      },
                      pacing_strategy: {
                        type: "string",
                        description: "How fast/slow the content should move"
                      },
                      key_moments: {
                        type: "array",
                        items: { type: "string" },
                        description: "3-5 crucial moments in the video"
                      }
                    },
                    required: ["narrative_structure", "visual_metaphors", "pacing_strategy", "key_moments"]
                  },
                  targeting: {
                    type: "object",
                    properties: {
                      primary_audience: {
                        type: "string",
                        description: "Main target audience description"
                      },
                      audience_pain_points: {
                        type: "array",
                        items: { type: "string" },
                        description: "What problems/challenges the audience faces"
                      },
                      audience_desires: {
                        type: "array",
                        items: { type: "string" },
                        description: "What the audience wants to achieve"
                      },
                      consumption_context: {
                        type: "string",
                        description: "When/where/how the audience will watch this"
                      },
                      engagement_triggers: {
                        type: "array",
                        items: { type: "string" },
                        description: "What will make them like, share, comment"
                      }
                    },
                    required: ["primary_audience", "audience_pain_points", "audience_desires", "consumption_context", "engagement_triggers"]
                  },
                  creative_dna: {
                    type: "object",
                    properties: {
                      unique_angle: {
                        type: "string",
                        description: "What makes this content unique/different"
                      },
                      personality_traits: {
                        type: "array",
                        items: { type: "string" },
                        description: "Brand personality traits to showcase"
                      },
                      content_formula: {
                        type: "string",
                        description: "The proven formula/pattern this follows"
                      },
                      viral_elements: {
                        type: "array",
                        items: { type: "string" },
                        description: "Elements that could make this go viral"
                      },
                      differentiation_strategy: {
                        type: "string",
                        description: "How this stands out from competitors"
                      }
                    },
                    required: ["unique_angle", "personality_traits", "content_formula", "viral_elements", "differentiation_strategy"]
                  }
                },
                required: ["seed", "concept", "targeting", "creative_dna"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_idea_dna" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall || !toolCall.function?.arguments) {
      throw new Error("No DNA data generated");
    }

    const dnaData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ dnaData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating idea DNA:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate DNA" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});