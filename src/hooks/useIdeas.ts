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
  // Enhanced video content fields
  video_concept?: string | null;
  target_duration?: number;
  visual_style?: string | null;
  target_platforms?: string[] | null;
  call_to_action?: string | null;
  content_pillars?: string[] | null;
  tone?: string | null;
  hook_type?: string | null;
  complexity_level?: string | null;
};

export const useIdeas = (projectId: string) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const generateIdeas = async (numIdeas: number = 3) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      toast({
        title: "Generating ideas...",
        description: "AI is creating personalized content ideas based on your project setup",
      });

      const { data, error } = await supabase.functions.invoke('ai-idea-generation', {
        body: { projectId, numIdeas }
      });

      if (error) throw error;

      if (data?.success && data?.ideas) {
        // Update local state with new ideas
        setIdeas(prev => [...(data.ideas as Idea[]), ...prev]);
        
        toast({
          title: "Ideas generated successfully",
          description: `Generated ${data.count} personalized ideas based on your project setup`,
        });
      } else {
        throw new Error('Failed to generate ideas');
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Error generating ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
    isGenerating,
    refetch: fetchIdeas,
  };
};