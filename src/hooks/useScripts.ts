import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Script = {
  id: string;
  idea_id: string;
  hook?: string | null;
  beats?: string[] | null;
  cta?: string | null;
  voice_style?: string | null;
  read_time?: number | null;
  quality_scores?: any;
  status: 'draft' | 'ready';
  created_at: string;
  updated_at: string;
};

export const useScripts = (ideaId?: string) => {
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchScript = async () => {
    if (!ideaId) return;
    
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('idea_id', ideaId)
        .maybeSingle();

      if (error) throw error;
      setScript(data as Script);
    } catch (error) {
      console.error('Error fetching script:', error);
      toast({
        title: "Error fetching script",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateScript = async (scriptData: Partial<Script>) => {
    if (!ideaId) return;

    try {
      const { data, error } = await supabase
        .from('scripts')
        .upsert({
          idea_id: ideaId,
          hook: scriptData.hook,
          beats: scriptData.beats,
          cta: scriptData.cta,
          voice_style: scriptData.voice_style,
          read_time: scriptData.read_time,
          quality_scores: scriptData.quality_scores,
          status: scriptData.status || 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      
      setScript(data as Script);
      
      // Update idea status to 'scripted'
      await supabase
        .from('ideas')
        .update({ status: 'scripted' })
        .eq('id', ideaId);
      
      toast({
        title: "Script saved",
        description: "Your script has been saved successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error saving script:', error);
      toast({
        title: "Error saving script",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchScript();
  }, [ideaId]);

  return {
    script,
    loading,
    createOrUpdateScript,
    refetch: fetchScript,
  };
};