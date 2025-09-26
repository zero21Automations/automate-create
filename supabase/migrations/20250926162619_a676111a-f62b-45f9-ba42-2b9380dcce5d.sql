-- Enhance ideas table with more robust video content fields
ALTER TABLE public.ideas 
ADD COLUMN IF NOT EXISTS video_concept text,
ADD COLUMN IF NOT EXISTS target_duration integer DEFAULT 60,
ADD COLUMN IF NOT EXISTS visual_style text,
ADD COLUMN IF NOT EXISTS target_platforms text[] DEFAULT ARRAY['tiktok'],
ADD COLUMN IF NOT EXISTS call_to_action text,
ADD COLUMN IF NOT EXISTS content_pillars text[],
ADD COLUMN IF NOT EXISTS tone text DEFAULT 'engaging',
ADD COLUMN IF NOT EXISTS hook_type text,
ADD COLUMN IF NOT EXISTS complexity_level text DEFAULT 'medium';