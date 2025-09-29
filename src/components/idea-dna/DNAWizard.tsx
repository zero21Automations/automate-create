import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ArrowRight, Save, CheckCircle, AlertCircle } from 'lucide-react';

import { SeedStage } from './stages/SeedStage';
import { ConceptStage } from './stages/ConceptStage';
import { TargetingStage } from './stages/TargetingStage';
import { CreativeDNAStage } from './stages/CreativeDNAStage';

import type { IdeaSetup, DNAStage, DNAStageConfig } from '@/types/idea-dna';

const STAGE_CONFIG: DNAStageConfig[] = [
  {
    id: 'seed',
    title: 'Idea Seed',
    description: 'Capture the core idea and initial concept',
    fields: ['title'],
    validation: (data) => !!data?.seed?.title,
    minQualityScore: 20
  },
  {
    id: 'concept',
    title: 'Idea Concept',
    description: 'Define what this video is about and why it matters',
    fields: ['value_proposition'],
    validation: (data) => !!data?.concept?.value_proposition,
    minQualityScore: 40
  },
  {
    id: 'targeting',
    title: 'Targeting & Compliance',
    description: 'Choose platforms, audience, and content guidelines',
    fields: ['platforms', 'audience'],
    validation: (data) => data?.targeting?.platforms?.length > 0 && !!data?.targeting?.audience,
    minQualityScore: 60
  },
  {
    id: 'dna',
    title: 'Creative DNA',
    description: 'Lock in the creative direction and style',
    fields: ['voice_tone', 'content_style', 'length'],
    validation: (data) => !!data?.creative_dna?.voice_tone && !!data?.creative_dna?.content_style && !!data?.creative_dna?.length,
    minQualityScore: 80
  }
];

export const DNAWizard: React.FC = () => {
  const { projectId, ideaId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStage, setCurrentStage] = useState<DNAStage>('seed');
  const [ideaData, setIdeaData] = useState<IdeaSetup | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing idea data
  useEffect(() => {
    const loadIdeaData = async () => {
      if (!ideaId) return;
      
      try {
        const { data, error } = await supabase
          .from('ideas')
          .select('*')
          .eq('id', ideaId)
          .single();

        if (error) throw error;

        setIdeaData({
          idea_id: data.id,
          project_id: data.project_id,
          seed: data.seed ? (typeof data.seed === 'string' ? JSON.parse(data.seed) : data.seed) : undefined,
          concept: data.concept ? (typeof data.concept === 'string' ? JSON.parse(data.concept) : data.concept) : undefined,
          targeting: data.targeting ? (typeof data.targeting === 'string' ? JSON.parse(data.targeting) : data.targeting) : undefined,
          creative_dna: data.creative_dna ? (typeof data.creative_dna === 'string' ? JSON.parse(data.creative_dna) : data.creative_dna) : undefined,
          progress: data.progress ? (typeof data.progress === 'string' ? JSON.parse(data.progress) : data.progress) : { completion: 0, quality_score: 0 },
          status: data.status as DNAStage | 'validated'
        });

        // Set current stage based on existing data
        if (data.status === 'validated') {
          setCurrentStage('dna');
        } else if (['seed', 'concept', 'targeting', 'dna'].includes(data.status)) {
          setCurrentStage(data.status as DNAStage);
        } else {
          setCurrentStage('seed');
        }
      } catch (error) {
        console.error('Error loading idea:', error);
        toast({
          title: 'Error loading idea',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadIdeaData();
  }, [ideaId, toast]);

  const saveProgress = async (updates: Partial<IdeaSetup>, newStatus?: DNAStage) => {
    if (!ideaData || !ideaId) return;

    setSaving(true);
    try {
      const updatedData = { ...ideaData, ...updates };
      const currentConfig = STAGE_CONFIG.find(s => s.id === (newStatus || currentStage));
      
      // Calculate progress and quality score
      const completionScore = calculateCompletion(updatedData);
      const qualityScore = calculateQualityScore(updatedData);
      
      const progress = {
        completion: completionScore,
        quality_score: qualityScore
      };

      const { error } = await supabase
        .from('ideas')
        .update({
          seed: updates.seed ? JSON.stringify(updates.seed) : (ideaData.seed ? JSON.stringify(ideaData.seed) : null),
          concept: updates.concept ? JSON.stringify(updates.concept) : (ideaData.concept ? JSON.stringify(ideaData.concept) : null),
          targeting: updates.targeting ? JSON.stringify(updates.targeting) : (ideaData.targeting ? JSON.stringify(ideaData.targeting) : null),
          creative_dna: updates.creative_dna ? JSON.stringify(updates.creative_dna) : (ideaData.creative_dna ? JSON.stringify(ideaData.creative_dna) : null),
          progress: JSON.stringify(progress),
          status: newStatus || currentStage,
          updated_at: new Date().toISOString()
        })
        .eq('id', ideaId);

      if (error) throw error;

      setIdeaData({ ...updatedData, progress });
      
      toast({
        title: 'Progress saved',
        description: `Stage ${currentConfig?.title} updated successfully`
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: 'Error saving progress',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const calculateCompletion = (data: IdeaSetup): number => {
    let completedStages = 0;
    
    if (data.seed?.title) completedStages += 1;
    if (data.concept?.value_proposition) completedStages += 1;
    if (data.targeting?.platforms?.length && data.targeting?.audience) completedStages += 1;
    if (data.creative_dna?.voice_tone && data.creative_dna?.content_style && data.creative_dna?.length) completedStages += 1;
    
    return Math.round((completedStages / 4) * 100);
  };

  const calculateQualityScore = (data: IdeaSetup): number => {
    let score = 0;
    
    // Seed quality (25 points)
    if (data.seed?.title) score += 15;
    if (data.seed?.description) score += 5;
    if (data.seed?.tags?.length) score += 5;
    
    // Concept quality (25 points)
    if (data.concept?.value_proposition) {
      const length = data.concept.value_proposition.length;
      score += Math.min(20, length > 50 ? 20 : length > 20 ? 15 : 10);
    }
    if (data.concept?.references?.length) score += 5;
    
    // Targeting quality (25 points)
    if (data.targeting?.platforms?.length) score += 10;
    if (data.targeting?.audience) score += 10;
    if (data.targeting?.banned_words?.length) score += 5;
    
    // Creative DNA quality (25 points)
    const dnaFields = ['voice_tone', 'content_style', 'length', 'visual_style', 'hashtags'];
    const completedDNAFields = dnaFields.filter(field => {
      if (field === 'hashtags') return data.creative_dna?.hashtags?.length;
      return data.creative_dna?.[field as keyof typeof data.creative_dna];
    });
    score += Math.round((completedDNAFields.length / dnaFields.length) * 25);
    
    return Math.min(100, score);
  };

  const canAdvanceToNext = (stage: DNAStage): boolean => {
    if (!ideaData) return false;
    const config = STAGE_CONFIG.find(s => s.id === stage);
    return config ? config.validation(ideaData) : false;
  };

  const handleNext = async () => {
    const currentIndex = STAGE_CONFIG.findIndex(s => s.id === currentStage);
    if (currentIndex < STAGE_CONFIG.length - 1) {
      const nextStage = STAGE_CONFIG[currentIndex + 1].id as DNAStage;
      setCurrentStage(nextStage);
      await saveProgress({}, nextStage);
    }
  };

  const handlePrevious = () => {
    const currentIndex = STAGE_CONFIG.findIndex(s => s.id === currentStage);
    if (currentIndex > 0) {
      const prevStage = STAGE_CONFIG[currentIndex - 1].id as DNAStage;
      setCurrentStage(prevStage);
    }
  };

  const handleLockAndContinue = async () => {
    if (!canAdvanceToNext('dna') || !ideaData) return;
    
    const qualityScore = calculateQualityScore(ideaData);
    if (qualityScore < 70) {
      toast({
        title: 'Quality Score Too Low',
        description: 'Please improve your DNA setup to reach at least 70% quality before locking.',
        variant: 'destructive'
      });
      return;
    }

    await saveProgress({}, 'validated' as any);
    
    toast({
      title: 'DNA Locked Successfully!',
      description: 'Your idea is now ready for script development'
    });
    
    navigate(`/projects/${projectId}/ideas/${ideaId}/script`);
  };

  const renderStageContent = () => {
    if (!ideaData) return null;

    const stageProps = {
      ideaData,
      onUpdate: (updates: Partial<IdeaSetup>) => {
        setIdeaData(prev => prev ? { ...prev, ...updates } : null);
        saveProgress(updates);
      }
    };

    switch (currentStage) {
      case 'seed':
        return <SeedStage {...stageProps} />;
      case 'concept':
        return <ConceptStage {...stageProps} />;
      case 'targeting':
        return <TargetingStage {...stageProps} />;
      case 'dna':
        return <CreativeDNAStage {...stageProps} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!ideaData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Idea Not Found</h3>
            <p className="text-muted-foreground">The idea you're looking for doesn't exist.</p>
            <Button 
              onClick={() => navigate(`/projects/${projectId}`)} 
              className="mt-4"
            >
              Back to Project
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentConfig = STAGE_CONFIG.find(s => s.id === currentStage);
  const currentIndex = STAGE_CONFIG.findIndex(s => s.id === currentStage);
  const progress = ideaData.progress;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Idea DNA Setup</h1>
            <p className="text-muted-foreground">
              {ideaData.seed?.title || 'Building your creative foundation'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: {progress.completion}%</span>
              <span>Quality Score: {progress.quality_score}/100</span>
            </div>
            <Progress value={progress.completion} className="h-2" />
          </div>
          <Badge variant={progress.quality_score >= 70 ? 'default' : 'secondary'}>
            {progress.quality_score >= 70 ? 'Ready' : 'In Progress'}
          </Badge>
        </div>

        {/* Stage Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {STAGE_CONFIG.map((stage, index) => {
            const isCompleted = canAdvanceToNext(stage.id);
            const isCurrent = stage.id === currentStage;
            const isAccessible = index <= currentIndex || isCompleted;

            return (
              <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant={isCurrent ? 'default' : isCompleted ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => isAccessible ? setCurrentStage(stage.id) : undefined}
                  disabled={!isAccessible}
                  className={`px-4 py-2 ${isCurrent ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {isCompleted && <CheckCircle className="h-4 w-4" />}
                    <span>{index + 1}. {stage.title}</span>
                  </div>
                </Button>
                {index < STAGE_CONFIG.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stage Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{currentConfig?.title}</CardTitle>
              <p className="text-muted-foreground">{currentConfig?.description}</p>
            </CardHeader>
            <CardContent>
              {renderStageContent()}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Stage Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentIndex + 1}/4</div>
                <div className="text-sm text-muted-foreground">Stages Complete</div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{progress.completion}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quality</span>
                  <span>{progress.quality_score}/100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="p-4 space-y-3">
              {currentIndex > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Stage
                </Button>
              )}
              
              {saving && (
                <Button disabled className="w-full">
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </Button>
              )}
              
              {currentIndex < STAGE_CONFIG.length - 1 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!canAdvanceToNext(currentStage) || saving}
                  className="w-full"
                >
                  Next Stage
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleLockAndContinue}
                  disabled={!canAdvanceToNext('dna') || progress.quality_score < 70 || saving}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Lock & Continue to Script
                </Button>
              )}
              
              {currentStage === 'dna' && progress.quality_score < 70 && (
                <p className="text-xs text-muted-foreground text-center">
                  Minimum 70% quality score required to proceed
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};