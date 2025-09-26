-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  brand_kit JSONB,
  posting_rules JSONB,
  status TEXT NOT NULL DEFAULT 'setup' CHECK (status IN ('setup', 'active', 'paused')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ideas table
CREATE TABLE public.ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  source TEXT,
  score INTEGER DEFAULT 0,
  hashtags TEXT[],
  status TEXT NOT NULL DEFAULT 'generated' CHECK (status IN ('generated', 'validated', 'rejected', 'scripted', 'assets_ready', 'assembled', 'published')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scripts table
CREATE TABLE public.scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE UNIQUE,
  hook TEXT,
  beats TEXT[],
  cta TEXT,
  voice_style TEXT,
  read_time INTEGER,
  quality_scores JSONB,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'ready')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assets table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
  script_id UUID REFERENCES public.scripts(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('voiceover', 'broll', 'music', 'captions')),
  file_url TEXT,
  metadata JSONB,
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'generating', 'ready', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assemblies table
CREATE TABLE public.assemblies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE UNIQUE,
  script_id UUID NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  platform_versions JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create publications table
CREATE TABLE public.publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assembly_id UUID NOT NULL REFERENCES public.assemblies(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  platform_post_id TEXT,
  caption TEXT,
  hashtags TEXT[],
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assemblies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for projects
CREATE POLICY "Users can view their own projects" 
ON public.projects FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
ON public.projects FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON public.projects FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for ideas
CREATE POLICY "Users can view ideas from their projects" 
ON public.ideas FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = ideas.project_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create ideas for their projects" 
ON public.ideas FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = ideas.project_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update ideas from their projects" 
ON public.ideas FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = ideas.project_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete ideas from their projects" 
ON public.ideas FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = ideas.project_id 
  AND projects.user_id = auth.uid()
));

-- Create similar RLS policies for scripts, assets, assemblies, and publications
CREATE POLICY "Users can view scripts from their ideas" 
ON public.scripts FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = scripts.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create scripts for their ideas" 
ON public.scripts FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = scripts.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update scripts from their ideas" 
ON public.scripts FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = scripts.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete scripts from their ideas" 
ON public.scripts FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = scripts.idea_id 
  AND projects.user_id = auth.uid()
));

-- Assets policies
CREATE POLICY "Users can view assets from their ideas" 
ON public.assets FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assets.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create assets for their ideas" 
ON public.assets FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assets.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update assets from their ideas" 
ON public.assets FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assets.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete assets from their ideas" 
ON public.assets FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assets.idea_id 
  AND projects.user_id = auth.uid()
));

-- Assemblies policies
CREATE POLICY "Users can view assemblies from their ideas" 
ON public.assemblies FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assemblies.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create assemblies for their ideas" 
ON public.assemblies FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assemblies.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update assemblies from their ideas" 
ON public.assemblies FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assemblies.idea_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete assemblies from their ideas" 
ON public.assemblies FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.ideas 
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE ideas.id = assemblies.idea_id 
  AND projects.user_id = auth.uid()
));

-- Publications policies
CREATE POLICY "Users can view publications from their assemblies" 
ON public.publications FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.assemblies 
  JOIN public.ideas ON ideas.id = assemblies.idea_id
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE assemblies.id = publications.assembly_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create publications for their assemblies" 
ON public.publications FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.assemblies 
  JOIN public.ideas ON ideas.id = assemblies.idea_id
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE assemblies.id = publications.assembly_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can update publications from their assemblies" 
ON public.publications FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.assemblies 
  JOIN public.ideas ON ideas.id = assemblies.idea_id
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE assemblies.id = publications.assembly_id 
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete publications from their assemblies" 
ON public.publications FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.assemblies 
  JOIN public.ideas ON ideas.id = assemblies.idea_id
  JOIN public.projects ON projects.id = ideas.project_id 
  WHERE assemblies.id = publications.assembly_id 
  AND projects.user_id = auth.uid()
));

-- Create update timestamp functions and triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ideas_updated_at
  BEFORE UPDATE ON public.ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at
  BEFORE UPDATE ON public.scripts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assemblies_updated_at
  BEFORE UPDATE ON public.assemblies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON public.publications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_ideas_project_id ON public.ideas(project_id);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_scripts_idea_id ON public.scripts(idea_id);
CREATE INDEX idx_assets_idea_id ON public.assets(idea_id);
CREATE INDEX idx_assets_script_id ON public.assets(script_id);
CREATE INDEX idx_assemblies_idea_id ON public.assemblies(idea_id);
CREATE INDEX idx_publications_assembly_id ON public.publications(assembly_id);