import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, numIdeas = 3 } = await req.json();
    
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch project data to inform AI generation
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (projectError) throw projectError;

    const brandKit = project.brand_kit || {};
    const audienceProfile = brandKit.audience_profile || {};
    const styleGuide = brandKit.style_guide || {};
    const niche = brandKit.niche || [];

    // Create comprehensive context for AI generation
    const contextPrompt = `
Generate ${numIdeas} content ideas for a ${niche.join(', ')} content factory project.

PROJECT CONTEXT:
- Project: ${project.name}
- Description: ${project.description || 'Not specified'}
- Niche: ${niche.join(', ')}
- Visual Style: ${brandKit.visual_style || 'modern'}

AUDIENCE PROFILE:
- Age Group: ${audienceProfile.primary_age || '25-34'}
- Platforms: ${audienceProfile.consumption?.platforms?.join(', ') || 'TikTok, Instagram'}
- Content Formats: ${audienceProfile.consumption?.formats?.join(', ') || 'Short-form'}
- Values: ${audienceProfile.psychographics?.values?.join(', ') || 'Not specified'}
- Pain Points: ${audienceProfile.psychographics?.pain_points?.join(', ') || 'Not specified'}

STYLE GUIDE:
- Voice: ${styleGuide.voice || 'friendly'}
- Tone: ${styleGuide.tone || 'conversational'}
- Target Audience: ${styleGuide.target_audience || 'young professionals'}
- Pacing: ${styleGuide.pacing || 'moderate'}
- Banned Words: ${styleGuide.banned_words?.join(', ') || 'None'}
- Default Hashtags: ${styleGuide.default_hashtags?.join(', ') || 'None'}
- CTA Templates: ${styleGuide.cta_templates?.join(', ') || 'None'}

GENERATION REQUIREMENTS:
- Create ideas that align with the project's niche and target audience
- Use the specified voice and tone
- Consider the target platforms and content formats
- Address audience pain points and values
- Include specific video concepts and hooks
- Suggest appropriate hashtags based on niche and audience
- Provide clear calls-to-action that match the brand voice

For each idea, provide:
1. Title (engaging and platform-optimized)
2. Description (brief concept overview)
3. Video concept (specific visual execution)
4. Target duration (15-90 seconds based on platform)
5. Visual style (aligned with brand kit)
6. Target platforms (from audience profile)
7. Call to action (aligned with voice/tone)
8. Content pillars (related to niche)
9. Tone (from style guide)
10. Hook type (opening strategy)
11. Complexity level (easy/medium/advanced)
12. Hashtags (3-5 relevant tags)
13. Score (0-100 based on viral potential)

Return as a JSON array of idea objects with these exact field names:
title, description, video_concept, target_duration, visual_style, target_platforms, call_to_action, content_pillars, tone, hook_type, complexity_level, hashtags, score, source
`;

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content strategist. Generate creative, engaging video content ideas that are optimized for viral potential and audience engagement. Always return valid JSON arrays.'
          },
          {
            role: 'user',
            content: contextPrompt
          }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'generate_content_ideas',
              description: 'Generate content ideas based on project context',
              parameters: {
                type: 'object',
                properties: {
                  ideas: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        video_concept: { type: 'string' },
                        target_duration: { type: 'number' },
                        visual_style: { type: 'string' },
                        target_platforms: { type: 'array', items: { type: 'string' } },
                        call_to_action: { type: 'string' },
                        content_pillars: { type: 'array', items: { type: 'string' } },
                        tone: { type: 'string' },
                        hook_type: { type: 'string' },
                        complexity_level: { type: 'string', enum: ['easy', 'medium', 'advanced'] },
                        hashtags: { type: 'array', items: { type: 'string' } },
                        score: { type: 'number', minimum: 0, maximum: 100 },
                        source: { type: 'string' }
                      },
                      required: ['title', 'description', 'video_concept', 'target_duration', 'visual_style', 'target_platforms', 'call_to_action', 'content_pillars', 'tone', 'hook_type', 'complexity_level', 'hashtags', 'score', 'source']
                    }
                  }
                },
                required: ['ideas']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'generate_content_ideas' } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API Error:', aiResponse.status, errorText);
      throw new Error(`AI generation failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call response from AI');
    }

    const generatedIdeas = JSON.parse(toolCall.function.arguments).ideas;

    // Insert ideas into database
    const ideasToInsert = generatedIdeas.map((idea: any) => ({
      ...idea,
      project_id: projectId,
      status: 'generated',
      source: 'AI Content Generator'
    }));

    const { data: insertedIdeas, error: insertError } = await supabase
      .from('ideas')
      .insert(ideasToInsert)
      .select();

    if (insertError) throw insertError;

    console.log(`Generated ${insertedIdeas.length} ideas for project ${projectId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ideas: insertedIdeas,
        count: insertedIdeas.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('AI idea generation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});