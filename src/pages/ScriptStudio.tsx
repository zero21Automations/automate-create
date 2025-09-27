import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette, ChevronDown, ChevronUp, Sparkles, RotateCcw, Check, Plus, Trash2, Wand2, Dna, Users, Volume2, Type, Repeat, User, Timer, FileText, BarChart3, Package, Upload, Clapperboard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useProjects, Project } from "@/hooks/useProjects";
import { useIdeas, Idea } from "@/hooks/useIdeas";

const ScriptStudio = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  
  // Fetch project and idea data
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  
  const currentProject = projects.find(p => p.id === projectId);
  const currentIdea = ideas.find(i => i.id === ideaId);
  
  const [script, setScript] = useState({
    hook: "",
    hookStageDirections: {
      bRoll: "",
      voiceStyle: "",
      overlay: "",
      sfx: ""
    },
    hookDuration: 3,
    beats: [{ 
      id: 1, 
      text: "", 
      stageDirections: {
        bRoll: "",
        voiceStyle: "",
        overlay: "",
        sfx: ""
      },
      duration: 5,
      metrics: { scrollStop: 85, retention: 78, engagement: 72 }
    }],
    cta: "",
    ctaStageDirections: {
      bRoll: "",
      voiceStyle: "",
      overlay: "",
      sfx: ""
    },
    ctaDuration: 3,
    state: "draft", // draft, frozen, locked
    version: 1
  });

  const [stageDirectionsOpen, setStageDirectionsOpen] = useState({
    hook: true,
    beats: {} as Record<number, boolean>,
    cta: true
  });

  const [validationScores, setValidationScores] = useState({
    hookStrength: 7,
    engagementPotential: 8,
    brandAlignment: 9
  });

  const [styleDNA, setStyleDNA] = useState({
    voiceTone: "Energetic, motivational",
    audience: "Fitness enthusiasts 18-35",
    captionStyle: "Dynamic highlights",
    musicMood: "Upbeat electronic",
    narrativePOV: "Second Person",
    narratorType: "Character Narrator",
    visualStyle: "Live Action",
    videoLength: "15-30 seconds",
    characterIdentity: "",
    characterVisualStyle: "",
    voiceTraits: ""
  });

  const voiceToneOptions = ["Energetic, motivational", "Playful, witty", "Calm, educational", "Dramatic, intense", "Friendly, conversational"];
  const audienceOptions = ["Gen Z, TikTok-native", "Millennials, Instagram-focused", "Fitness enthusiasts 18-35", "Business professionals", "Parents, family-oriented"];
  const captionStyleOptions = ["Dynamic highlights", "Minimal text", "Story-driven", "Educational bullets", "Call-out quotes"];
  const musicMoodOptions = ["Upbeat electronic", "Chill ambient", "Dramatic cinematic", "Acoustic warm", "High-energy rock"];
  const narrativePOVOptions = ["First Person", "Second Person", "Third Person"];
  const narratorTypeOptions = ["Voiceover", "Character Narrator", "On-screen Host"];
  const visualStyleOptions = ["Live Action", "Animation", "Cartoon/Comic", "Screen Recording", "Mixed Media"];
  const videoLengthOptions = ["15-30 seconds", "30-60 seconds", "60+ seconds"];
  
  const stageDirectionOptions = {
    camera: ["Close-up", "Medium shot", "Wide shot", "Over shoulder", "POV", "Drone shot"],
    movement: ["Static", "Pan left", "Pan right", "Zoom in", "Zoom out", "Handheld"],
    lighting: ["Natural", "Studio", "Golden hour", "Blue hour", "Dramatic", "Soft"],
    setting: ["Indoor", "Outdoor", "Studio", "Kitchen", "Gym", "Office", "Bedroom"]
  };

  const [isLocked, setIsLocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCharacterDetails = async (field: string) => {
    setIsGenerating(true);
    try {
      const prompts = {
        characterIdentity: "Generate a unique, memorable character identity for a content creator (like Capybara CFO, Wise Owl, etc.). Be creative and engaging. Return only the character name/identity.",
        characterVisualStyle: "Generate a brief visual description for a character narrator's appearance (like 'hoodie + glasses', 'business suit + coffee cup', etc.). Keep it simple and memorable. Return only the visual description.",
        voiceTraits: "Generate 3-4 voice traits for a character narrator (like 'calm, energetic, witty' or 'deep, soothing, confident'). Return only the comma-separated traits."
      };
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke('ai', {
        body: { message: prompts[field as keyof typeof prompts] }
      });

      if (functionError) {
        throw new Error(functionError.message || "Failed to get AI response");
      }

      const aiResponse = functionData?.response;
      if (aiResponse) {
        setStyleDNA(prev => ({
          ...prev,
          [field]: aiResponse.trim()
        }));
      }
    } catch (error) {
      console.error('Error generating character details:', error);
      // Fallback to mock data if AI fails
      const mockResults = {
        characterIdentity: "Energetic Fitness Penguin",
        characterVisualStyle: "Athletic wear + water bottle",
        voiceTraits: "Upbeat, encouraging, slightly breathless"
      };
      
      setStyleDNA(prev => ({
        ...prev,
        [field]: mockResults[field as keyof typeof mockResults] || ""
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const addBeat = (afterIndex?: number) => {
    if (isLocked) return;
    const newBeat = {
      id: Date.now(), // Use timestamp for unique ID
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
    duration: number,
    onDurationChange: (duration: number) => void,
    text: string,
    onTextChange: (text: string) => void,
    stageDirections: { bRoll: string; voiceStyle: string; overlay: string; sfx: string },
    onStageDirectionsChange: (field: string, value: string) => void,
    isOpen: boolean,
    onToggle: () => void,
    colorClass: string,
    icon: any,
    metricLabel: string,
    canDelete?: boolean,
    onDelete?: () => void
  ) => {
    const Icon = icon;
    
    return (
      <Card className={`card-factory-glow p-6 border-l-4 ${colorClass}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="outline" className="text-xs">
              {duration}s
            </Badge>
            <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20 transition-all hover-scale">
              <Wand2 className="h-3 w-3 mr-1" />
              Generate {title}
            </Button>
            <Badge variant="secondary" className="text-xs">
              {text.length} chars
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={duration.toString()} onValueChange={(value) => onDurationChange(parseInt(value))} disabled={isLocked}>
              <SelectTrigger className="h-8 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[3,4,5,6,7,8,9,10].map(sec => (
                  <SelectItem key={sec} value={sec.toString()}>{sec}s</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {canDelete && (
              <Button variant="outline" size="sm" onClick={onDelete} disabled={isLocked}>
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <Textarea
          placeholder={`Enter your ${title.toLowerCase()} content...`}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[100px] mb-4"
          disabled={isLocked}
        />

        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Stage Directions
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">B-Roll Shot</Label>
                <Textarea
                  placeholder="e.g. Wide shot of penguin colony"
                  value={stageDirections.bRoll}
                  onChange={(e) => onStageDirectionsChange('bRoll', e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Overlay/Graphics</Label>
                <Textarea
                  placeholder="e.g. 🐧🔥 emoji animation"
                  value={stageDirections.overlay}
                  onChange={(e) => onStageDirectionsChange('overlay', e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Voice Style</Label>
                <Textarea
                  placeholder="e.g. Excited, surprised"
                  value={stageDirections.voiceStyle}
                  onChange={(e) => onStageDirectionsChange('voiceStyle', e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">SFX</Label>
                <Textarea
                  placeholder="e.g. Pebble drop sound..."
                  value={stageDirections.sfx}
                  onChange={(e) => onStageDirectionsChange('sfx', e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Wand2 className="h-3 w-3 mr-1" />
                  Generate Directions
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
              <Button variant="default" size="sm">
                <Check className="h-3 w-3 mr-1" />
                Approve
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  const status = getTaskStatus();

  // Pipeline stages for integrated navigation
  const pipelineStages = [
    { id: 'idea', label: 'Idea', icon: Target, path: `/projects/${projectId}/ideas/${ideaId}`, status: 'completed' as const },
    { id: 'script', label: 'Script', icon: FileText, path: `/projects/${projectId}/ideas/${ideaId}/script`, status: 'current' as const },
    { id: 'assets', label: 'Assets', icon: Package, path: `/projects/${projectId}/ideas/${ideaId}/assets`, status: 'pending' as const },
    { id: 'assembly', label: 'Assembly', icon: Clapperboard, path: `/projects/${projectId}/ideas/${ideaId}/assembly`, status: 'pending' as const },
    { id: 'publishing', label: 'Publishing', icon: Upload, path: `/projects/${projectId}/ideas/${ideaId}/publishing`, status: 'pending' as const },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `/projects/${projectId}/ideas/${ideaId}/analytics`, status: 'locked' as const }
  ];

  const currentStageIndex = pipelineStages.findIndex(s => s.status === 'current');
  const progressPercentage = ((currentStageIndex + 1) / pipelineStages.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Unified Header with Integrated Pipeline */}
      <div className="space-y-6">
        {/* Project & Idea Context */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span className="flex items-center gap-1">
                  {currentProject?.emoji && <span className="text-base">{currentProject.emoji}</span>}
                  <span>{currentProject?.name || "Project"}</span>
                </span>
                <span>•</span>
                <span className="text-primary font-medium">{currentIdea?.title || "Untitled Idea"}</span>
              </div>
              
              <h1 className="text-xl font-bold text-factory-gradient flex items-center gap-3 my-4">
                <FileText className="h-6 w-6" />
                Script Studio
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage {currentStageIndex + 1}/{pipelineStages.length}
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Transform ideas into platform-optimized scripts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="factory">
              <Save className="h-4 w-4 mr-2" />
              Save Script
            </Button>
            <Button 
              onClick={script.state === "draft" ? freezeScript : () => navigate(`/projects/${projectId}/ideas/${ideaId}/assets`)}
              className={script.state === "draft" ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-gradient-factory text-white"}
            >
              {script.state === "draft" ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Freeze & Continue
                </>
              ) : (
                <>
                  <Image className="h-4 w-4 mr-2" />
                  Next: Assets
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Integrated Pipeline Navigation */}
        <Card className="card-factory-glow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-factory-gradient">Production Pipeline</h3>
            <div className="flex items-center gap-2">
              <Progress value={progressPercentage} className="w-32" />
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
            {pipelineStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = stage.status === 'current';
              const isCompleted = stage.status === 'completed';
              const isLocked = stage.status === 'locked';
              
              return (
                <div key={stage.id} className="flex items-center gap-2 min-w-0">
                  <Button
                    variant={isActive ? "default" : isCompleted ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => !isLocked && navigate(stage.path)}
                    disabled={isLocked}
                    className={`min-w-[100px] justify-start ${
                      isActive ? "bg-primary text-primary-foreground shadow-lg" :
                      isCompleted ? "bg-secondary text-secondary-foreground" :
                      isLocked ? "opacity-50 cursor-not-allowed" :
                      "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {stage.label}
                    {isCompleted && <Check className="h-3 w-3 ml-auto" />}
                    {isLocked && <Lock className="h-3 w-3 ml-auto" />}
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Script Editor */}
        <div className="xl:col-span-2 space-y-6">
          {/* Enhanced Script DNA Card */}
          <Card className="card-factory-glow p-6 border-l-4 border-l-primary">
            <div className="flex items-center gap-2 mb-4">
              <Dna className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Script DNA</h3>
              {isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              These settings inform how AI generates scripts. Defaults come from your project style guide — you can adjust them here.
            </p>
            
            {/* Voice & Audience Settings */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Voice Tone
                </Label>
                <Select value={styleDNA.voiceTone} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, voiceTone: value }))} disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceToneOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Audience
                </Label>
                <Select value={styleDNA.audience} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, audience: value }))} disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Caption Style
                </Label>
                <Select value={styleDNA.captionStyle} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, captionStyle: value }))} disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {captionStyleOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Music Mood
                </Label>
                <Select value={styleDNA.musicMood} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, musicMood: value }))} disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {musicMoodOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Script Style Dimensions */}
            <div className="mb-6">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Script Style Dimensions
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Narrative POV
                  </Label>
                  <Select value={styleDNA.narrativePOV} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, narrativePOV: value }))} disabled={isLocked}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {narrativePOVOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Narrator Type
                  </Label>
                  <Select value={styleDNA.narratorType} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, narratorType: value }))} disabled={isLocked}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {narratorTypeOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    Visual Style
                  </Label>
                  <Select value={styleDNA.visualStyle} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, visualStyle: value }))} disabled={isLocked}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visualStyleOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    Video Length
                  </Label>
                  <Select value={styleDNA.videoLength} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, videoLength: value }))} disabled={isLocked}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {videoLengthOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                          {option === "15-30 seconds" && <span className="text-xs text-muted-foreground ml-2">Hook ≤ 8 words</span>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Character Narrator Details */}
            {styleDNA.narratorType === "Character Narrator" && (
              <>
                <Separator className="my-6" />
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Character Narrator Details
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Character Identity</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g. Capybara CFO, Wise Owl, etc."
                          value={styleDNA.characterIdentity}
                          onChange={(e) => setStyleDNA(prev => ({ ...prev, characterIdentity: e.target.value }))}
                          disabled={isLocked}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateCharacterDetails('characterIdentity')}
                          disabled={isLocked || isGenerating}
                          className="min-w-[100px]"
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Visual Style</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g. hoodie + glasses"
                          value={styleDNA.characterVisualStyle}
                          onChange={(e) => setStyleDNA(prev => ({ ...prev, characterVisualStyle: e.target.value }))}
                          disabled={isLocked}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateCharacterDetails('characterVisualStyle')}
                          disabled={isLocked || isGenerating}
                          className="min-w-[100px]"
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Voice Traits (comma-separated)</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g. calm, chill, deep"
                          value={styleDNA.voiceTraits}
                          onChange={(e) => setStyleDNA(prev => ({ ...prev, voiceTraits: e.target.value }))}
                          disabled={isLocked}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateCharacterDetails('voiceTraits')}
                          disabled={isLocked || isGenerating}
                          className="min-w-[100px]"
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Hook */}
          {renderStageDirectionsCard(
            "Hook",
            script.hookDuration,
            (duration) => setScript(prev => ({ ...prev, hookDuration: duration })),
            script.hook,
            (text) => setScript(prev => ({ ...prev, hook: text })),
            script.hookStageDirections,
            (field, value) => setScript(prev => ({ 
              ...prev, 
              hookStageDirections: { ...prev.hookStageDirections, [field]: value }
            })),
            stageDirectionsOpen.hook,
            () => toggleStageDirections('hook'),
            "border-l-orange-500",
            Zap,
            "90% scroll-stop"
          )}

          {/* Beats */}
          <div className="space-y-4">
            {script.beats.map((beat, index) => (
              <div key={beat.id} className="space-y-4">
                {renderStageDirectionsCard(
                  `Beat ${index + 1}`,
                  beat.duration,
                  (duration) => {
                    const newBeats = [...script.beats];
                    newBeats[index].duration = duration;
                    setScript(prev => ({ ...prev, beats: newBeats }));
                  },
                  beat.text,
                  (text) => {
                    const newBeats = [...script.beats];
                    newBeats[index].text = text;
                    setScript(prev => ({ ...prev, beats: newBeats }));
                  },
                  beat.stageDirections,
                  (field, value) => {
                    const newBeats = [...script.beats];
                    newBeats[index].stageDirections = { ...newBeats[index].stageDirections, [field]: value };
                    setScript(prev => ({ ...prev, beats: newBeats }));
                  },
                  stageDirectionsOpen.beats[beat.id] !== undefined ? stageDirectionsOpen.beats[beat.id] : true,
                  () => toggleStageDirections('beats', beat.id),
                  "border-l-blue-500",
                  Target,
                  `${beat.metrics.engagement}% engagement`,
                  script.beats.length > 1,
                  () => deleteBeat(beat.id)
                )}
                
                {/* Add Beat Button */}
                {!isLocked && (
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addBeat(index)}
                      className="text-muted-foreground border-dashed"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Beat After
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          {renderStageDirectionsCard(
            "Call to Action",
            script.ctaDuration,
            (duration) => setScript(prev => ({ ...prev, ctaDuration: duration })),
            script.cta,
            (text) => setScript(prev => ({ ...prev, cta: text })),
            script.ctaStageDirections,
            (field, value) => setScript(prev => ({ 
              ...prev, 
              ctaStageDirections: { ...prev.ctaStageDirections, [field]: value }
            })),
            stageDirectionsOpen.cta,
            () => toggleStageDirections('cta'),
            "border-l-green-500",
            Target,
            "Conversion-optimized"
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quality Metrics & Progress Status */}
          <Card className="card-factory-glow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Quality & Progress
              </h3>
              {status.hasMissing && (
                <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">
                  <Wand2 className="h-3 w-3 mr-1" />
                  Generate Missing
                </Button>
              )}
            </div>
            
            {/* Quality Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hook Strength</span>
                <Badge variant="secondary">{validationScores.hookStrength}/10</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Engagement Potential</span>
                <Badge variant="secondary">{validationScores.engagementPotential}/10</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Brand Alignment</span>
                <Badge variant="secondary">{validationScores.brandAlignment}/10</Badge>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Progress Status */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-2">Completed</h4>
                <div className="space-y-1">
                  {status.completed.length > 0 ? (
                    status.completed.map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-green-600">
                        <Check className="h-3 w-3" />
                        {task}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">No tasks completed yet</div>
                  )}
                </div>
              </div>
              
              {status.pending.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 mb-2">Pending</h4>
                    <div className="space-y-1">
                      {status.pending.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-orange-600">
                          <Clock className="h-3 w-3" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScriptStudio;