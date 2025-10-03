import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Project = {
  id: string;
  user_id: string;
  name: string;
  emoji?: string;
  description?: string | null;
  brand_kit?: any;
  posting_rules?: any;
  status: 'setup' | 'active' | 'paused';
  dna_locked?: boolean;
  dna_locked_at?: string | null;
  automation_config?: {
    auto_validate_ideas?: boolean;
    auto_generate_scripts?: boolean;
    auto_generate_assets?: boolean;
    auto_assemble_videos?: boolean;
    auto_publish?: boolean;
    quality_threshold?: number;
    batch_size?: number;
    generation_schedule?: string;
    checkpoint_timeout_hours?: number;
  };
  created_at: string;
  updated_at: string;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects((data as Project[]) || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error fetching projects",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: projectData.name || '',
          description: projectData.description,
          brand_kit: projectData.brand_kit,
          posting_rules: projectData.posting_rules,
          status: projectData.status || 'setup',
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [data as Project, ...prev]);
      toast({
        title: "Project created",
        description: "Your new project has been created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error creating project",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? (data as Project) : p));
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error updating project",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    refetch: fetchProjects,
  };
};