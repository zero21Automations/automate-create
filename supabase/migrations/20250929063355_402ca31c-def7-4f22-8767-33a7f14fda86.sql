-- First, add the new columns without changing status values
ALTER TABLE public.ideas 
ADD COLUMN IF NOT EXISTS seed JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS concept JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS targeting JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS creative_dna JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS progress JSONB DEFAULT '{"completion": 0, "quality_score": 0}'::jsonb,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS narrator_type TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS banned_words TEXT[] DEFAULT NULL,
ADD COLUMN IF NOT EXISTS idea_references JSONB DEFAULT NULL;

-- Drop existing check constraint if it exists
ALTER TABLE public.ideas DROP CONSTRAINT IF EXISTS ideas_status_check;

-- Add new check constraint with DNA status values
ALTER TABLE public.ideas ADD CONSTRAINT ideas_status_check 
CHECK (status IN ('seed', 'concept', 'targeting', 'dna', 'generated', 'validated', 'rejected', 'scripted', 'assets_ready', 'assembled', 'published', 'recycled', 'retired'));

-- Now update existing 'generated' status to 'seed'
UPDATE public.ideas 
SET status = 'seed' 
WHERE status = 'generated';

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_ideas_status ON public.ideas (status);
CREATE INDEX IF NOT EXISTS idx_ideas_progress ON public.ideas USING GIN (progress);