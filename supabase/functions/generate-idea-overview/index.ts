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
    const { idea } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build comprehensive prompt from all idea data
    const prompt = `Generate a comprehensive content overview based on this validated idea:

BASIC INFO:
Title: ${idea.title}
Description: ${idea.description || 'Not provided'}
Video Concept: ${idea.video_concept || 'Not provided'}
Score: ${idea.score}%
Target Duration: ${idea.target_duration || 60} seconds

CONTENT STRATEGY:
Visual Style: ${idea.visual_style || 'modern'}
Tone: ${idea.tone || 'engaging'}
Hook Type: ${idea.hook_type || 'question'}
Complexity: ${idea.complexity_level || 'medium'}
Target Platforms: ${idea.target_platforms?.join(', ') || 'tiktok'}
Content Pillars: ${idea.content_pillars?.join(', ') || 'None'}
Call to Action: ${idea.call_to_action || 'None'}
Hashtags: ${idea.hashtags?.join(', ') || 'None'}

DNA DATA:
${idea.seed ? `
Seed:
- Core Message: ${idea.seed.core_message || 'Not defined'}
- Emotional Trigger: ${idea.seed.emotional_trigger || 'Not defined'}
- Target Outcome: ${idea.seed.target_outcome || 'Not defined'}
- Inspiration Sources: ${idea.seed.inspiration_sources?.join(', ') || 'Not defined'}
` : ''}

${idea.concept ? `
Concept:
- Narrative Structure: ${idea.concept.narrative_structure || 'Not defined'}
- Pacing Strategy: ${idea.concept.pacing_strategy || 'Not defined'}
- Visual Metaphors: ${idea.concept.visual_metaphors?.join(', ') || 'Not defined'}
- Key Moments: ${idea.concept.key_moments?.join(', ') || 'Not defined'}
` : ''}

${idea.targeting ? `
Targeting:
- Primary Audience: ${idea.targeting.primary_audience || 'Not defined'}
- Audience Pain Points: ${idea.targeting.audience_pain_points?.join(', ') || 'Not defined'}
- Audience Desires: ${idea.targeting.audience_desires?.join(', ') || 'Not defined'}
- Consumption Context: ${idea.targeting.consumption_context || 'Not defined'}
- Engagement Triggers: ${idea.targeting.engagement_triggers?.join(', ') || 'Not defined'}
` : ''}

${idea.creative_dna ? `
Creative DNA:
- Unique Angle: ${idea.creative_dna.unique_angle || 'Not defined'}
- Personality Traits: ${idea.creative_dna.personality_traits?.join(', ') || 'Not defined'}
- Content Formula: ${idea.creative_dna.content_formula || 'Not defined'}
- Viral Elements: ${idea.creative_dna.viral_elements?.join(', ') || 'Not defined'}
- Differentiation Strategy: ${idea.creative_dna.differentiation_strategy || 'Not defined'}
` : ''}

Generate a detailed content overview that will guide the next steps in the content creation pipeline.`;

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
            content: "You are an expert content strategist and creative director. Generate comprehensive, actionable content overviews that will guide creators through the production process. Be specific, detailed, and strategic."
          },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_content_overview",
              description: "Generate a comprehensive content overview for an idea",
              parameters: {
                type: "object",
                properties: {
                  executive_summary: {
                    type: "string",
                    description: "2-3 sentence high-level summary of the content idea and its potential"
                  },
                  content_strategy: {
                    type: "object",
                    properties: {
                      core_hook: {
                        type: "string",
                        description: "The opening hook that will grab attention in the first 3 seconds"
                      },
                      narrative_flow: {
                        type: "array",
                        items: { type: "string" },
                        description: "5-7 key beats/moments in the content flow"
                      },
                      emotional_journey: {
                        type: "string",
                        description: "How the viewer's emotions should evolve throughout the content"
                      },
                      value_proposition: {
                        type: "string",
                        description: "Clear value the viewer gets from watching"
                      }
                    },
                    required: ["core_hook", "narrative_flow", "emotional_journey", "value_proposition"]
                  },
                  production_guidelines: {
                    type: "object",
                    properties: {
                      visual_direction: {
                        type: "string",
                        description: "Specific visual style and direction for filming/editing"
                      },
                      key_scenes: {
                        type: "array",
                        items: { type: "string" },
                        description: "4-6 essential scenes that must be captured"
                      },
                      technical_requirements: {
                        type: "array",
                        items: { type: "string" },
                        description: "Specific technical needs (lighting, equipment, locations, etc.)"
                      },
                      editing_style: {
                        type: "string",
                        description: "Pacing, transitions, and editing approach"
                      }
                    },
                    required: ["visual_direction", "key_scenes", "technical_requirements", "editing_style"]
                  },
                  audience_engagement: {
                    type: "object",
                    properties: {
                      target_metrics: {
                        type: "object",
                        properties: {
                          expected_watch_time: { type: "string" },
                          engagement_rate: { type: "string" },
                          conversion_goal: { type: "string" }
                        },
                        required: ["expected_watch_time", "engagement_rate", "conversion_goal"]
                      },
                      optimization_tips: {
                        type: "array",
                        items: { type: "string" },
                        description: "3-5 specific tips to maximize engagement"
                      },
                      platform_adaptations: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            platform: { type: "string" },
                            adaptations: { type: "string" }
                          },
                          required: ["platform", "adaptations"]
                        },
                        description: "How to adapt content for each target platform"
                      }
                    },
                    required: ["target_metrics", "optimization_tips", "platform_adaptations"]
                  },
                  success_factors: {
                    type: "object",
                    properties: {
                      key_success_elements: {
                        type: "array",
                        items: { type: "string" },
                        description: "3-5 critical elements that will determine success"
                      },
                      potential_challenges: {
                        type: "array",
                        items: { type: "string" },
                        description: "Potential obstacles and how to overcome them"
                      },
                      scalability_potential: {
                        type: "string",
                        description: "How this content can be turned into a series or scaled"
                      }
                    },
                    required: ["key_success_elements", "potential_challenges", "scalability_potential"]
                  },
                  next_steps: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-7 specific next steps to move from overview to script"
                  }
                },
                required: ["executive_summary", "content_strategy", "production_guidelines", "audience_engagement", "success_factors", "next_steps"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_content_overview" } }
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
      throw new Error("No overview data generated");
    }

    const overviewData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ overview: overviewData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating idea overview:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate overview" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});