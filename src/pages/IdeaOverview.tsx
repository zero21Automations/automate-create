import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import { useToast } from "@/hooks/use-toast";
import { 
  Lightbulb, 
  Target, 
  Users, 
  BarChart3, 
  FileText, 
  Video, 
  ArrowLeft, 
  Package, 
  Clapperboard, 
  Upload, 
  Check, 
  Lock,
  Zap,
  Eye,
  Clock,
  TrendingUp,
  PlayCircle,
  Settings,
  Camera,
  Palette,
  MessageSquare
} from "lucide-react";

const IdeaOverview = () => {
  const { projectId, ideaId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  const { toast } = useToast();
  
  const project = projects.find(p => p.id === projectId);
  const idea = ideas.find(i => i.id === ideaId);

  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate overview when component loads
  useEffect(() => {
    const generateOverview = async () => {
      if (!idea) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { data, error: functionError } = await supabase.functions.invoke('generate-idea-overview', {
          body: { idea }
        });

        if (functionError) throw functionError;

        if (data?.overview) {
          setOverview(data.overview);
          toast({
            title: "Overview Generated",
            description: "AI-powered content overview has been created for your idea.",
          });
        } else {
          throw new Error("No overview data received");
        }
      } catch (err) {
        console.error('Error generating overview:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate overview');
        toast({
          title: "Error generating overview",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (idea && !overview) {
      generateOverview();
    }
  }, [idea, overview, toast]);

  const regenerateOverview = async () => {
    if (!idea) return;
    
    setLoading(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-idea-overview', {
        body: { idea }
      });

      if (functionError) throw functionError;

      if (data?.overview) {
        setOverview(data.overview);
        toast({
          title: "Overview Regenerated",
          description: "Fresh AI-powered overview has been created.",
        });
      }
    } catch (err) {
      console.error('Error regenerating overview:', err);
      toast({
        title: "Error regenerating overview",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const proceedToScript = () => {
    if (projectId && ideaId) {
      navigate(`/projects/${projectId}/ideas/${ideaId}/script`);
    }
  };

  if (!project || !idea) {
    return <div className="p-6"><Skeleton className="h-8 w-64" /></div>;
  }

  // Pipeline stages for integrated navigation
  const pipelineStages = [
    { id: 'idea', label: 'Idea', icon: Lightbulb, path: `/projects/${projectId}/ideas/${ideaId}`, status: 'current' },
    { id: 'script', label: 'Script', icon: FileText, path: `/projects/${projectId}/ideas/${ideaId}/script`, status: 'pending' },
    { id: 'assets', label: 'Assets', icon: Package, path: `/projects/${projectId}/ideas/${ideaId}/assets`, status: 'pending' },
    { id: 'production', label: 'Production', icon: Clapperboard, path: `/projects/${projectId}/ideas/${ideaId}/production`, status: 'pending' },
    { id: 'publishing', label: 'Publishing', icon: Upload, path: `/projects/${projectId}/ideas/${ideaId}/publishing`, status: 'pending' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `/projects/${projectId}/ideas/${ideaId}/analytics`, status: 'locked' }
  ];

  const currentStageIndex = pipelineStages.findIndex(s => s.status === 'current');
  const progressPercentage = ((currentStageIndex + 1) / pipelineStages.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>{project?.name}</span>
                <span>›</span>
                <span className="text-primary font-medium">{idea?.title || "Untitled Idea"}</span>
              </div>
              
              <h1 className="text-xl font-bold flex items-center gap-3 my-4">
                <Eye className="h-6 w-6" />
                Content Overview
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  AI Generated
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Comprehensive strategic overview for your content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={regenerateOverview}
              variant="outline"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Regenerate
                </>
              )}
            </Button>
            <Button 
              onClick={proceedToScript}
              disabled={loading || !overview}
            >
              <FileText className="h-4 w-4 mr-2" />
              Next: Script
            </Button>
          </div>
        </div>

        {/* Pipeline Navigation */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Production Pipeline</h3>
            <div className="flex items-center gap-2">
              <Progress value={progressPercentage} className="w-32" />
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
            {pipelineStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = stage.status === 'current';
              const isCompleted = false;
              const isLocked = stage.status === 'locked';
              
              return (
                <div key={stage.id} className="flex items-center gap-2 min-w-0">
                  <Button
                    variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                    size="sm"
                    className={`flex items-center gap-2 text-xs whitespace-nowrap ${
                      isLocked ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLocked}
                    onClick={() => navigate(stage.path)}
                  >
                    <Icon className="h-4 w-4" />
                    {stage.label}
                    {isCompleted && <Check className="h-3 w-3 ml-1" />}
                    {isLocked && <Lock className="h-3 w-3 ml-1" />}
                  </Button>
                  {index < pipelineStages.length - 1 && (
                    <div className={`h-px w-8 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-destructive mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2">Error Loading Overview</h3>
            <p className="text-muted-foreground text-center mb-4">{error}</p>
            <Button onClick={regenerateOverview}>
              <Zap className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : overview ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{overview.executive_summary}</p>
              </CardContent>
            </Card>

            {/* Content Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Content Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Core Hook
                  </h4>
                  <p className="text-muted-foreground">{overview.content_strategy.core_hook}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Narrative Flow
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {overview.content_strategy.narrative_flow.map((beat: string, index: number) => (
                      <li key={index}>{beat}</li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Emotional Journey</h4>
                    <p className="text-sm text-muted-foreground">{overview.content_strategy.emotional_journey}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Value Proposition</h4>
                    <p className="text-sm text-muted-foreground">{overview.content_strategy.value_proposition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Production Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Visual Direction
                  </h4>
                  <p className="text-muted-foreground">{overview.production_guidelines.visual_direction}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Key Scenes
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {overview.production_guidelines.key_scenes.map((scene: string, index: number) => (
                      <li key={index}>{scene}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {overview.production_guidelines.technical_requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Editing Style</h4>
                    <p className="text-sm text-muted-foreground">{overview.production_guidelines.editing_style}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Success Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Success Elements</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {overview.success_factors.key_success_elements.map((element: string, index: number) => (
                      <li key={index}>{element}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Potential Challenges</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {overview.success_factors.potential_challenges.map((challenge: string, index: number) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Scalability Potential</h4>
                  <p className="text-muted-foreground">{overview.success_factors.scalability_potential}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Audience Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Audience Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Target Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Expected Watch Time:</span>
                      <span className="font-medium">{overview.audience_engagement.target_metrics.expected_watch_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement Rate:</span>
                      <span className="font-medium">{overview.audience_engagement.target_metrics.engagement_rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Goal:</span>
                      <span className="font-medium">{overview.audience_engagement.target_metrics.conversion_goal}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Optimization Tips</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {overview.audience_engagement.optimization_tips.map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Platform Adaptations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Adaptations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {overview.audience_engagement.platform_adaptations.map((adaptation: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">{adaptation.platform}</h4>
                    <p className="text-sm text-muted-foreground">{adaptation.adaptations}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  {overview.next_steps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IdeaOverview;