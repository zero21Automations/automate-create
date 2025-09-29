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
  status: 'generated' | 'seed' | 'validated' | 'rejected' | 'scripted' | 'assets_ready' | 'assembled' | 'published';
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
  // DNA fields
  seed?: any;
  concept?: any;
  targeting?: any;
  creative_dna?: any;
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
      // Generate DNA based on the idea data
      const { data: dnaResponse, error: dnaError } = await supabase.functions.invoke('generate-idea-dna', {
        body: { ideaData }
      });

      let finalIdeaData: any = { 
        title: ideaData.title || '',
        description: ideaData.description,
        source: ideaData.source,
        score: ideaData.score || 0,
        hashtags: ideaData.hashtags,
        status: ideaData.status || 'generated',
        metadata: ideaData.metadata,
        project_id: projectId,
        video_concept: ideaData.video_concept,
        target_duration: ideaData.target_duration,
        visual_style: ideaData.visual_style,
        target_platforms: ideaData.target_platforms,
        call_to_action: ideaData.call_to_action,
        content_pillars: ideaData.content_pillars,
        tone: ideaData.tone,
        hook_type: ideaData.hook_type,
        complexity_level: ideaData.complexity_level,
      };

      if (dnaResponse?.dnaData && !dnaError) {
        finalIdeaData = {
          ...finalIdeaData,
          seed: dnaResponse.dnaData.seed,
          concept: dnaResponse.dnaData.concept,
          targeting: dnaResponse.dnaData.targeting,
          creative_dna: dnaResponse.dnaData.creative_dna,
          status: 'seed' // Update status since DNA is now populated
        };
      }

      const { data, error } = await supabase
        .from('ideas')
        .insert(finalIdeaData)
        .select()
        .single();

      if (error) throw error;
      
      setIdeas(prev => [data as Idea, ...prev]);
      toast({
        title: "Idea created",
        description: dnaResponse?.dnaData ? 
          "Your new idea has been added with AI-generated DNA" : 
          "Your new idea has been added to the pipeline",
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
      // Simulate AI idea generation with enhanced video fields
      const mockIdeas = [
        {
          title: "5 Morning Habits That Changed My Life",
          description: "Personal transformation through simple daily routines",
          video_concept: "Split-screen before/after showing 5 quick habit demonstrations with upbeat music",
          source: "AI Research Agent",
          score: 85,
          hashtags: ["productivity", "morningroutine", "selfcare"],
          target_duration: 60,
          visual_style: "clean",
          target_platforms: ["tiktok", "instagram"],
          call_to_action: "Comment your current morning routine!",
          content_pillars: ["productivity", "wellness"],
          tone: "motivational",
          hook_type: "transformation",
          complexity_level: "easy",
        },
        {
          title: "Why Everyone's Wrong About Remote Work",
          description: "Contrarian take on remote work misconceptions",
          video_concept: "Fast-paced myth-busting format with statistics overlay and dynamic transitions",
          source: "Trend Analysis",
          score: 78,
          hashtags: ["remotework", "productivity", "worklife"],
          target_duration: 90,
          visual_style: "dynamic",
          target_platforms: ["tiktok", "youtube"],
          call_to_action: "Are you team remote or office?",
          content_pillars: ["business", "lifestyle"],
          tone: "controversial",
          hook_type: "contrarian",
          complexity_level: "medium",
        },
        {
          title: "The Secret Ingredient in Every Viral Video",
          description: "Pattern analysis of top-performing content",
          video_concept: "Behind-the-scenes breakdown of viral video patterns with examples and analysis",
          source: "Competitor Analysis",
          score: 92,
          hashtags: ["viral", "contentcreation", "socialmedia"],
          target_duration: 75,
          visual_style: "analytical",
          target_platforms: ["tiktok", "youtube", "instagram"],
          call_to_action: "Try this formula in your next video!",
          content_pillars: ["education", "marketing"],
          tone: "educational",
          hook_type: "revelation",
          complexity_level: "advanced",
        },
      ];

      // Generate DNA for each idea using the createIdea function which handles DNA generation
      const promises = mockIdeas.map(idea => createIdea(idea));
      await Promise.all(promises);
      
      toast({
        title: "Ideas generated",
        description: `Generated ${mockIdeas.length} new ideas with AI-powered DNA`,
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