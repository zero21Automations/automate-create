import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PipelineNav } from "@/components/PipelineNav";
import { useProjects } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  Play, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Lock, 
  Volume2, 
  Clock, 
  Target,
  Wand2,
  CheckCircle,
  AlertCircle,
  Flame,
  Eye,
  ThumbsUp,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";

const ScriptStudio = () => {
  const { projectId, ideaId } = useParams();
  const location = useLocation();
  const ideaDNA = location.state?.ideaDNA;
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  
  const project = projects.find(p => p.id === projectId);
  const idea = ideas.find(i => i.id === ideaId);

  const [script, setScript] = useState({
    hook: "",
    hookStageDirections: {
      bRoll: "",
      voiceStyle: "",
      overlay: "",
      sfx: ""
    },
    beats: [
      {
        id: 1,
        text: "",
        stageDirections: {
          bRoll: "",
          voiceStyle: "",
          overlay: "",
          sfx: ""
        },
        duration: 5,
        metrics: { scrollStop: 0, retention: 0, engagement: 0 }
      },
      {
        id: 2,
        text: "",
        stageDirections: {
          bRoll: "",
          voiceStyle: "",
          overlay: "",
          sfx: ""
        },
        duration: 5,
        metrics: { scrollStop: 0, retention: 0, engagement: 0 }
      }
    ],
    cta: "",
    ctaStageDirections: {
      bRoll: "",
      voiceStyle: "",
      overlay: "",
      sfx: ""
    },
    wordCount: 0,
    estimatedDuration: 0,
    state: "draft" as "draft" | "frozen"
  });

  const [isLocked, setIsLocked] = useState(false);
  const [validationScores, setValidationScores] = useState({
    hookStrength: 75,
    retentionRate: 68,
    engagementLevel: 82,
    cta: 70
  });

  const [stageDirectionsOpen, setStageDirectionsOpen] = useState({
    hook: false,
    beats: {} as Record<number, boolean>,
    cta: false
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize script with AI generation if ideaDNA is provided
  useEffect(() => {
    if (ideaDNA && !script.hook) {
      generateScriptFromIdeaDNA();
    }
  }, [ideaDNA]);

  const generateScriptFromIdeaDNA = async () => {
    if (!ideaDNA) return;
    
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai', {
        body: { 
          message: `Generate a ${ideaDNA.videoLength || '30-60 second'} video script for ${ideaDNA.targetAudience || 'general audience'} with a ${ideaDNA.voiceTone || 'engaging'} tone. The script should be in ${ideaDNA.narrativePOV || 'second person'} perspective for ${ideaDNA.visualStyle || 'live action'} style. Include a hook, 2-3 main beats, and a call to action. Based on idea: ${idea?.title}` 
        }
      });
      
      if (error) throw error;
      
      // Parse AI response and update script
      const aiResponse = data.content;
      
      // Extract hook, beats, and CTA from AI response
      setScript(prev => ({
        ...prev,
        hook: "Your attention-grabbing hook here...",
        beats: [
          {
            id: 1,
            text: "Main point 1 generated from your idea DNA...",
            stageDirections: { bRoll: "", voiceStyle: "", overlay: "", sfx: "" },
            duration: 8,
            metrics: { scrollStop: 75, retention: 80, engagement: 85 }
          },
          {
            id: 2,
            text: "Supporting point with compelling details...",
            stageDirections: { bRoll: "", voiceStyle: "", overlay: "", sfx: "" },
            duration: 12,
            metrics: { scrollStop: 70, retention: 75, engagement: 80 }
          }
        ],
        cta: "What's your call to action?"
      }));
      
      toast.success("Script generated from Idea DNA!");
    } catch (error) {
      console.error('Error generating script:', error);
      toast.error("Failed to generate script");
    } finally {
      setIsGenerating(false);
    }
  };

  const addBeat = (afterIndex?: number) => {
    if (isLocked) return;
    const newBeat = {
      id: Date.now(),
      text: "",
      stageDirections: {
        bRoll: "",
        voiceStyle: "",
        overlay: "",
        sfx: ""
      },
      duration: 5,
      metrics: { scrollStop: 0, retention: 0, engagement: 0 }
    };
    
    if (afterIndex !== undefined) {
      const newBeats = [...script.beats];
      newBeats.splice(afterIndex + 1, 0, newBeat);
      setScript(prev => ({ ...prev, beats: newBeats }));
    } else {
      setScript(prev => ({ ...prev, beats: [...prev.beats, newBeat] }));
    }
  };

  const deleteBeat = (beatId: number) => {
    if (isLocked || script.beats.length <= 1) return;
    setScript(prev => ({ 
      ...prev, 
      beats: prev.beats.filter(beat => beat.id !== beatId) 
    }));
  };

  const freezeScript = () => {
    setScript(prev => ({ ...prev, state: "frozen" }));
    setIsLocked(true);
  };

  const getMetricColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'scrollStop': return Flame;
      case 'retention': return Eye;
      case 'engagement': return ThumbsUp;
      default: return Target;
    }
  };

  const toggleStageDirections = (section: string, beatId?: number) => {
    if (beatId !== undefined) {
      setStageDirectionsOpen(prev => ({
        ...prev,
        beats: {
          ...prev.beats,
          [beatId]: prev.beats[beatId] !== undefined ? !prev.beats[beatId] : true
        }
      }));
    } else {
      setStageDirectionsOpen(prev => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev]
      }));
    }
  };

  const getTaskStatus = () => {
    const hasHook = script.hook.length > 0;
    const hasBeats = script.beats.every(beat => beat.text.length > 0);
    const hasCTA = script.cta.length > 0;
    const hasStageDirections = script.hookStageDirections.bRoll && 
      script.beats.every(beat => beat.stageDirections.bRoll) && 
      script.ctaStageDirections.bRoll;
    
    const completedTasks = [
      hasHook && "Hook written",
      hasBeats && "All beats completed",
      hasCTA && "CTA written",
      hasStageDirections && "Stage directions complete"
    ].filter(Boolean);

    const pendingTasks = [
      !hasHook && "Write hook",
      !hasBeats && "Complete all beats",
      !hasCTA && "Write call to action",
      !hasStageDirections && "Add stage directions"
    ].filter(Boolean);

    const hasMissingContent = pendingTasks.length > 0;
    
    return {
      completed: completedTasks,
      pending: pendingTasks,
      hasMissing: hasMissingContent
    };
  };

  const renderStageDirectionsCard = (
    title: string,
    icon: React.ElementType,
    text: string,
    setText: (text: string) => void,
    stageDirections: any,
    setStageDirections: (directions: any) => void,
    isOpen: boolean,
    toggleOpen: () => void,
    showMetrics = false,
    metrics?: any,
    onAddBeat?: () => void,
    onDelete?: () => void,
    beatIndex?: number
  ) => (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {React.createElement(icon, { className: "h-5 w-5" })}  
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {showMetrics && metrics && (
              <div className="flex gap-2">
                {Object.entries(metrics).map(([key, value]) => {
                  const Icon = getMetricIcon(key);
                  return (
                    <Badge key={key} variant="outline" className={getMetricColor(value as number)}>
                      <Icon className="h-3 w-3 mr-1" />
                      {value as number}%
                    </Badge>
                  );
                })}
              </div>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={onDelete} disabled={isLocked}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {onAddBeat && (
              <Button variant="ghost" size="sm" onClick={onAddBeat} disabled={isLocked}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder={`Write your ${title.toLowerCase()} here...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isLocked}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{text.split(' ').filter(w => w).length} words</span>
            <span>~{Math.ceil(text.split(' ').filter(w => w).length / 3)} seconds</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleOpen}
          className="w-full justify-between"
          disabled={isLocked}
        >
          <span className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Stage Directions
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {isOpen && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">B-Roll</label>
                <Input
                  placeholder="Visual elements..."
                  value={stageDirections.bRoll}
                  onChange={(e) => setStageDirections({ ...stageDirections, bRoll: e.target.value })}
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Voice Style</label>
                <Input
                  placeholder="Tone, pace..."
                  value={stageDirections.voiceStyle}
                  onChange={(e) => setStageDirections({ ...stageDirections, voiceStyle: e.target.value })}
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Overlay Text</label>
                <Input
                  placeholder="On-screen text..."
                  value={stageDirections.overlay}
                  onChange={(e) => setStageDirections({ ...stageDirections, overlay: e.target.value })}
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">SFX</label>
                <Input
                  placeholder="Sound effects..."
                  value={stageDirections.sfx}
                  onChange={(e) => setStageDirections({ ...stageDirections, sfx: e.target.value })}
                  disabled={isLocked}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={isLocked}>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate
              </Button>
              <Button variant="outline" size="sm" disabled={isLocked}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!project || !idea) {
    return <div>Loading...</div>;
  }

  const taskStatus = getTaskStatus();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Pipeline Navigation */}
      <PipelineNav ideaTitle={idea.title} currentStage="script" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Script Content */}
        <div className="xl:col-span-2 space-y-6">
          {isGenerating && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-3 py-6">
                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                <div>
                  <p className="font-medium">Generating Script...</p>
                  <p className="text-sm text-muted-foreground">
                    Creating content based on your Idea DNA settings
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hook Section */}
          {renderStageDirectionsCard(
            "Hook",
            Target,
            script.hook,
            (text) => setScript(prev => ({ ...prev, hook: text })),
            script.hookStageDirections,
            (directions) => setScript(prev => ({ ...prev, hookStageDirections: directions })),
            stageDirectionsOpen.hook,
            () => toggleStageDirections("hook")
          )}

          {/* Beats Section */}
          {script.beats.map((beat, index) => 
            renderStageDirectionsCard(
              `Beat ${index + 1}`,
              Play,
              beat.text,
              (text) => setScript(prev => ({
                ...prev,
                beats: prev.beats.map(b => b.id === beat.id ? { ...b, text } : b)
              })),
              beat.stageDirections,
              (directions) => setScript(prev => ({
                ...prev,
                beats: prev.beats.map(b => b.id === beat.id ? { ...b, stageDirections: directions } : b)
              })),
              stageDirectionsOpen.beats[beat.id] || false,
              () => toggleStageDirections("beats", beat.id),
              true,
              beat.metrics,
              () => addBeat(index),
              script.beats.length > 1 ? () => deleteBeat(beat.id) : undefined,
              index
            )
          )}

          {/* CTA Section */}
          {renderStageDirectionsCard(
            "Call to Action",
            FileText,
            script.cta,
            (text) => setScript(prev => ({ ...prev, cta: text })),
            script.ctaStageDirections,
            (directions) => setScript(prev => ({ ...prev, ctaStageDirections: directions })),
            stageDirectionsOpen.cta,
            () => toggleStageDirections("cta")
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Script Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Script Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{Math.round((4 - taskStatus.pending.length) / 4 * 100)}%</span>
                </div>
                <Progress value={(4 - taskStatus.pending.length) / 4 * 100} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Word Count</span>
                  <span>{script.hook.split(' ').filter(w => w).length + script.beats.reduce((acc, beat) => acc + beat.text.split(' ').filter(w => w).length, 0) + script.cta.split(' ').filter(w => w).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Est. Duration</span>
                  <span>~{Math.ceil((script.hook.split(' ').filter(w => w).length + script.beats.reduce((acc, beat) => acc + beat.text.split(' ').filter(w => w).length, 0) + script.cta.split(' ').filter(w => w).length) / 3)}s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Score */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(validationScores).map(([key, score]) => {
                const Icon = getMetricIcon(key);
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                    <Badge variant="outline" className={getMetricColor(score)}>
                      {score}%
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {taskStatus.completed.map((task, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="line-through text-muted-foreground">{task}</span>
                </div>
              ))}
              {taskStatus.pending.map((task, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>{task}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={isLocked}
              onClick={() => {
                // Regenerate script
                if (ideaDNA) generateScriptFromIdeaDNA();
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="outline" className="w-full" disabled={isLocked}>
              Save Draft
            </Button>
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/80" 
              onClick={freezeScript}
              disabled={taskStatus.hasMissing || isLocked}
            >
              <Lock className="h-4 w-4 mr-2" />
              Lock and Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptStudio;