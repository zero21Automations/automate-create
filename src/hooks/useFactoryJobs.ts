import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FactoryJob {
  id: string;
  project_id: string;
  idea_id: string | null;
  current_stage: string;
  status: string;
  checkpoint_required: boolean;
  checkpoint_expires_at: string | null;
  error_count: number;
  last_error: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export const useFactoryJobs = (projectId?: string) => {
  const [jobs, setJobs] = useState<FactoryJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchJobs = async () => {
    if (!projectId) {
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('factory_jobs')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      console.error('Error fetching factory jobs:', error);
      toast({
        title: 'Error loading jobs',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (ideaId: string, stage: string = 'script') => {
    if (!projectId) return null;

    try {
      const { data, error } = await supabase
        .from('factory_jobs')
        .insert({
          project_id: projectId,
          idea_id: ideaId,
          current_stage: stage,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Job created',
        description: 'Factory job started successfully',
      });

      await fetchJobs();
      return data;
    } catch (error: any) {
      console.error('Error creating job:', error);
      toast({
        title: 'Error creating job',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const advanceJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('factory-orchestrator', {
        body: { jobId, action: 'advance' }
      });

      if (error) throw error;

      toast({
        title: 'Job advanced',
        description: `Moving to ${data.stage} stage`,
      });

      await fetchJobs();
      return data;
    } catch (error: any) {
      console.error('Error advancing job:', error);
      toast({
        title: 'Error advancing job',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const retryJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('factory-orchestrator', {
        body: { jobId, action: 'retry' }
      });

      if (error) throw error;

      toast({
        title: 'Job retrying',
        description: 'Retrying failed job',
      });

      await fetchJobs();
      return data;
    } catch (error: any) {
      console.error('Error retrying job:', error);
      toast({
        title: 'Error retrying job',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchJobs();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('factory-jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'factory_jobs',
          filter: projectId ? `project_id=eq.${projectId}` : undefined
        },
        () => {
          fetchJobs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  return {
    jobs,
    loading,
    createJob,
    advanceJob,
    retryJob,
    refetch: fetchJobs
  };
};
