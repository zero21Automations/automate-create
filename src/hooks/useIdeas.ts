import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Idea = {
  id: string;
  project_id: string;
  title: string;
  description?: string | null;
  source?: string | null;
  score: number;
  hashtags?: string[] | null;
  status: 'generated' | 'validated' | 'rejected' | 'scripted' | 'assets_ready' | 'assembled' | 'published';
  metadata?: any;
  created_at: string;
  updated_at: string;
};

export const useIdeas = (projectId: string) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchIdeas = async () => {
    if (!projectId) return;
    
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas((data as Idea[]) || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      toast({
        title: "Error fetching ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createIdea = async (ideaData: Partial<Idea>) => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert({
          title: ideaData.title || '',
          description: ideaData.description,
          source: ideaData.source,
          score: ideaData.score || 0,
          hashtags: ideaData.hashtags,
          status: ideaData.status || 'generated',
          metadata: ideaData.metadata,
          project_id: projectId,
        })
        .select()
        .single();

      if (error) throw error;
      
      setIdeas(prev => [data as Idea, ...prev]);
      toast({
        title: "Idea created",
        description: "Your new idea has been added to the pipeline",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating idea:', error);
      toast({
        title: "Error creating idea",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateIdea = async (id: string, updates: Partial<Idea>) => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setIdeas(prev => prev.map(i => i.id === id ? (data as Idea) : i));
      return data;
    } catch (error) {
      console.error('Error updating idea:', error);
      toast({
        title: "Error updating idea",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  const generateIdeas = async () => {
    try {
      // Simulate AI idea generation
      const mockIdeas = [
        {
          title: "5 Morning Habits That Changed My Life",
          description: "Personal transformation through simple daily routines",
          source: "AI Research Agent",
          score: 85,
          hashtags: ["productivity", "morningroutine", "selfcare"],
        },
        {
          title: "Why Everyone's Wrong About Remote Work",
          description: "Contrarian take on remote work misconceptions",
          source: "Trend Analysis",
          score: 78,
          hashtags: ["remotework", "productivity", "worklife"],
        },
        {
          title: "The Secret Ingredient in Every Viral Video",
          description: "Pattern analysis of top-performing content",
          source: "Competitor Analysis",
          score: 92,
          hashtags: ["viral", "contentcreation", "socialmedia"],
        },
      ];

      const promises = mockIdeas.map(idea => createIdea(idea));
      await Promise.all(promises);
      
      toast({
        title: "Ideas generated",
        description: `Generated ${mockIdeas.length} new ideas for your project`,
      });
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Error generating ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [projectId]);

  return {
    ideas,
    loading,
    createIdea,
    updateIdea,
    generateIdeas,
    refetch: fetchIdeas,
  };
};