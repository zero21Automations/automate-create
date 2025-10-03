-- Phase 1: Factory Automation Schema

-- 1. Extend projects table with DNA lock and automation config
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS dna_locked boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS dna_locked_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS automation_config jsonb DEFAULT '{
  "auto_validate_ideas": false,
  "auto_generate_scripts": false,
  "auto_generate_assets": false,
  "auto_assemble_videos": false,
  "auto_publish": false,
  "quality_threshold": 0.7,
  "batch_size": 5,
  "generation_schedule": "0 9 * * *",
  "checkpoint_timeout_hours": 24
}'::jsonb;

-- 2. Create factory_jobs table for pipeline orchestration
CREATE TABLE IF NOT EXISTS public.factory_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  idea_id uuid REFERENCES public.ideas(id) ON DELETE CASCADE,
  current_stage text NOT NULL CHECK (current_stage IN ('research', 'idea', 'script', 'assets', 'assembly', 'publish', 'analytics')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'checkpoint', 'completed', 'failed', 'cancelled')),
  checkpoint_required boolean DEFAULT false,
  checkpoint_expires_at timestamp with time zone,
  error_count integer DEFAULT 0,
  last_error text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  completed_at timestamp with time zone
);

ALTER TABLE public.factory_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view jobs for their projects"
ON public.factory_jobs FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = factory_jobs.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create jobs for their projects"
ON public.factory_jobs FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = factory_jobs.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update jobs for their projects"
ON public.factory_jobs FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = factory_jobs.project_id
  AND projects.user_id = auth.uid()
));

-- 3. Create automation_rules table
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  stage text NOT NULL CHECK (stage IN ('research', 'idea', 'script', 'assets', 'assembly', 'publish', 'analytics')),
  enabled boolean DEFAULT true,
  checkpoint_required boolean DEFAULT false,
  checkpoint_timeout_hours integer DEFAULT 24,
  retry_count integer DEFAULT 3,
  fallback_action text CHECK (fallback_action IN ('skip', 'manual', 'retry')),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(project_id, stage)
);

ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage rules for their projects"
ON public.automation_rules FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = automation_rules.project_id
  AND projects.user_id = auth.uid()
));

-- 4. Create checkpoint_overrides table
CREATE TABLE IF NOT EXISTS public.checkpoint_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_job_id uuid REFERENCES public.factory_jobs(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('approve', 'reject', 'edit', 'regenerate')),
  notes text,
  modifications jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.checkpoint_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create overrides for accessible jobs"
ON public.checkpoint_overrides FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.factory_jobs
  JOIN public.projects ON projects.id = factory_jobs.project_id
  WHERE factory_jobs.id = checkpoint_overrides.factory_job_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can view overrides for accessible jobs"
ON public.checkpoint_overrides FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.factory_jobs
  JOIN public.projects ON projects.id = factory_jobs.project_id
  WHERE factory_jobs.id = checkpoint_overrides.factory_job_id
  AND projects.user_id = auth.uid()
));

-- 5. Create copilot_suggestions table
CREATE TABLE IF NOT EXISTS public.copilot_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  idea_id uuid REFERENCES public.ideas(id) ON DELETE CASCADE,
  stage text NOT NULL CHECK (stage IN ('idea', 'script', 'assets', 'assembly', 'publish')),
  suggestion_type text NOT NULL CHECK (suggestion_type IN ('regenerate', 'improve', 'modify', 'swap', 'add')),
  title text NOT NULL,
  description text,
  action_payload jsonb,
  priority integer DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  dismissed boolean DEFAULT false,
  applied boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.copilot_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage suggestions for their projects"
ON public.copilot_suggestions FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = copilot_suggestions.project_id
  AND projects.user_id = auth.uid()
));

-- 6. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  factory_job_id uuid REFERENCES public.factory_jobs(id) ON DELETE CASCADE,
  user_id uuid,
  action text NOT NULL,
  stage text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view logs for their projects"
ON public.audit_logs FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.projects
  WHERE projects.id = audit_logs.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- 7. Create triggers for updated_at timestamps
CREATE TRIGGER update_factory_jobs_updated_at
BEFORE UPDATE ON public.factory_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_automation_rules_updated_at
BEFORE UPDATE ON public.automation_rules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_factory_jobs_project_id ON public.factory_jobs(project_id);
CREATE INDEX IF NOT EXISTS idx_factory_jobs_status ON public.factory_jobs(status);
CREATE INDEX IF NOT EXISTS idx_factory_jobs_current_stage ON public.factory_jobs(current_stage);
CREATE INDEX IF NOT EXISTS idx_copilot_suggestions_project_id ON public.copilot_suggestions(project_id);
CREATE INDEX IF NOT EXISTS idx_copilot_suggestions_idea_id ON public.copilot_suggestions(idea_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_project_id ON public.audit_logs(project_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_factory_job_id ON public.audit_logs(factory_job_id);