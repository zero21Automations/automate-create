import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette, ChevronDown, ChevronUp, Sparkles, RotateCcw, Check, Plus, Trash2, Wand2, Dna, Users, Volume2, Type, Repeat, User, Timer, FileText, BarChart3, Package, Upload, Clapperboard, CheckCircle } from "lucide-react";
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
  
  // Find project by name or ID
  const currentProject = projects.find(p => 
    p.id === projectId || p.name.toLowerCase().replace(/\s+/g, '') === projectId
  );
  
  const { ideas } = useIdeas(currentProject?.id || "");
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

  // Get idea DNA from navigation state or use defaults
  const location = useLocation();
  const ideaDNA = location.state?.ideaDNA || {};
  
  const [styleDNA, setStyleDNA] = useState({
    voiceTone: ideaDNA.voiceTone || "Energetic, motivational",
    audience: ideaDNA.targetAudience || "Fitness enthusiasts 18-35",
    captionStyle: ideaDNA.captionStyle || "Dynamic highlights",
    musicMood: ideaDNA.musicMood || "Upbeat electronic",
    narrativePOV: ideaDNA.narrativePOV || "Second Person",
    narratorType: ideaDNA.narratorType || "Character Narrator",
    visualStyle: ideaDNA.visualStyle || "Live Action",
    videoLength: ideaDNA.videoLength || "15-30 seconds",
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

  // Function to determine number of beats based on video length
  const getBeatsFromLength = (videoLength: string) => {
    switch (videoLength) {
      case "15-30 seconds":
        return 2; // Hook + 1 main beat
      case "30-60 seconds":
        return 3; // Hook + 2 main beats  
      case "60+ seconds":
        return 4; // Hook + 3 main beats
      default:
        return 3;
    }
  };

  // Generate complete script based on DNA
  const generateScriptFromDNA = async () => {
    setIsGenerating(true);
    try {
      const numBeats = getBeatsFromLength(ideaDNA.videoLength || "30-60 seconds");
      
      // Build comprehensive prompt from DNA
      const dnaPrompt = `
        Generate a ${ideaDNA.videoLength || "30-60 seconds"} video script with the following DNA:
        
        CONTENT DETAILS:
        - Description: ${ideaDNA.description || "Educational content"}
        - Target Platforms: ${ideaDNA.targetPlatforms?.join(", ") || "TikTok"}
        - Content Style: ${ideaDNA.contentStyle || "Quick Tips"}
        
        CREATIVE DNA:
        - Voice & Tone: ${ideaDNA.voiceTone || "Energetic"}
        - Target Audience: ${ideaDNA.targetAudience || "Gen Z"}
        - Narrative POV: ${ideaDNA.narrativePOV || "Second Person"}
        - Narrator Type: ${ideaDNA.narratorType || "Voiceover"}
        - Visual Style: ${ideaDNA.visualStyle || "Live Action"}
        - Caption Style: ${ideaDNA.captionStyle || "Dynamic highlights"}
        
        ${ideaDNA.narratorType === "Character Narrator" && ideaDNA.characterAppearance ? `
        CHARACTER DETAILS:
        - Appearance: ${ideaDNA.characterAppearance}
        - Personality: ${ideaDNA.characterPersonality}
        - Background: ${ideaDNA.characterBackground}
        - Clothing: ${ideaDNA.characterClothing}
        ` : ""}
        
        ${ideaDNA.bannedWords?.length > 0 ? `
        AVOID THESE WORDS/PHRASES: ${ideaDNA.bannedWords.join(", ")}
        ` : ""}
        
        STRUCTURE:
        - Hook (3-5 seconds): Strong opening that stops scrolling
        - ${numBeats - 1} main beats (${Math.round((parseInt(ideaDNA.videoLength?.split("-")[1] || "30") - 5) / (numBeats - 1))} seconds each): Core content delivery
        
        Return a JSON object with:
        {
          "hook": "compelling hook text",
          "beats": [
            {"text": "beat 1 content", "duration": 8},
            {"text": "beat 2 content", "duration": 8}
          ],
          "cta": "clear call to action"
        }
        
        Make it ${ideaDNA.voiceTone?.toLowerCase()} and optimized for ${ideaDNA.targetPlatforms?.join(" and ") || "social media"}.
      `;

      const { data: functionData, error: functionError } = await supabase.functions.invoke('ai', {
        body: { message: dnaPrompt }
      });

      if (functionError) {
        throw new Error(functionError.message || "Failed to generate script");
      }

      const aiResponse = functionData?.response;
      if (aiResponse) {
        try {
          // Try to parse JSON response
          const scriptData = JSON.parse(aiResponse);
          
          // Generate beats with proper structure
          const generatedBeats = scriptData.beats?.map((beat: any, index: number) => ({
            id: Date.now() + index,
            text: beat.text || "",
            stageDirections: {
              bRoll: `${ideaDNA.visualStyle || "Live action"} footage supporting: ${beat.text?.substring(0, 50)}...`,
              voiceStyle: `${ideaDNA.voiceTone || "Energetic"} delivery${ideaDNA.narratorType === "Character Narrator" ? ` in character persona` : ""}`,
              overlay: ideaDNA.captionStyle === "Dynamic highlights" ? "Key words highlighted dynamically" : "Minimal text overlay",
              sfx: "Subtle background audio"
            },
            duration: beat.duration || 8,
            metrics: { scrollStop: 75 + Math.random() * 20, retention: 70 + Math.random() * 25, engagement: 65 + Math.random() * 30 }
          })) || [];

          setScript({
            hook: scriptData.hook || "",
            hookStageDirections: {
              bRoll: `${ideaDNA.visualStyle || "Dynamic"} opening shot`,
              voiceStyle: `${ideaDNA.voiceTone || "Energetic"} hook delivery`,
              overlay: "Attention-grabbing text",
              sfx: "Hook sound effect"
            },
            hookDuration: 4,
            beats: generatedBeats,
            cta: scriptData.cta || "Follow for more tips!",
            ctaStageDirections: {
              bRoll: "Engaging closing shot",
              voiceStyle: "Clear call to action",
              overlay: "CTA text overlay",
              sfx: "Closing sound"
            },
            ctaDuration: 3,
            state: "draft",
            version: 1
          });
          
        } catch (parseError) {
          // Fallback if JSON parsing fails
          throw new Error("AI response was not in expected format");
        }
      }
    } catch (error) {
      console.error('Error generating script:', error);
      // Fallback generation with DNA data
      const numBeats = getBeatsFromLength(ideaDNA.videoLength || "30-60 seconds");
      const fallbackBeats = Array.from({ length: numBeats - 1 }, (_, index) => ({
        id: Date.now() + index,
        text: `${ideaDNA.contentStyle || "Educational"} content beat ${index + 1} about ${ideaDNA.description || "the topic"}.`,
        stageDirections: {
          bRoll: `${ideaDNA.visualStyle || "Live action"} footage`,
          voiceStyle: `${ideaDNA.voiceTone || "Energetic"} delivery`,
          overlay: "Supporting text",
          sfx: "Background audio"
        },
        duration: 8,
        metrics: { scrollStop: 75, retention: 70, engagement: 65 }
      }));

      setScript(prev => ({
        ...prev,
        hook: `${ideaDNA.voiceTone || "Engaging"} hook about ${ideaDNA.description || "the topic"}`,
        beats: fallbackBeats
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
    { id: 'production', label: 'Production', icon: Clapperboard, path: `/projects/${projectId}/ideas/${ideaId}/production`, status: 'pending' as const },
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={generateScriptFromDNA}
              disabled={isGenerating}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'Generate from DNA'}
            </Button>
            <Button variant="factory">
              <Save className="h-4 w-4 mr-2" />
              Save Script
            </Button>
            <Button 
              onClick={script.state === "draft" ? freezeScript : () => navigate(`/projects/${projectId}/ideas/${ideaId}/assets`)}
              disabled={script.state === "draft" && status.hasMissing}
              className={script.state === "draft" ? 
                (status.hasMissing ? "bg-muted hover:bg-muted text-muted-foreground" : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105") 
                : "bg-gradient-factory text-white"}
            >
              {script.state === "draft" ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Lock and Continue
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
                    asChild
                    variant={isActive ? "default" : isCompleted ? "secondary" : "ghost"}
                    size="sm"
                    className={`min-w-[100px] justify-start relative z-10 ${
                      isActive ? "bg-primary text-primary-foreground shadow-lg" : ""
                    } ${isCompleted ? "bg-secondary text-secondary-foreground" : ""} ${
                      isLocked ? "opacity-50" : "hover:bg-muted"
                    }`}
                  >
                    <NavLink to={stage.path} className="flex items-center w-full">
                      <Icon className="h-4 w-4 mr-2" />
                      {stage.label}
                      {isCompleted && <Check className="h-3 w-3 ml-auto" />}
                      {isLocked && <Lock className="h-3 w-3 ml-auto" />}
                    </NavLink>
                  </Button>
                  {index < pipelineStages.length - 1 && (
                    <div className={`h-px w-8 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} style={{ pointerEvents: 'none' }} />
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

        {/* Sticky Quality & Progress Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            {/* Progress Overview */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Script Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Completion</span>
                  <span className="font-medium">{status.pending.length === 0 ? '100' : Math.round((status.completed.length / (status.completed.length + status.pending.length)) * 100)}%</span>
                </div>
                <Progress value={status.pending.length === 0 ? 100 : Math.round((status.completed.length / (status.completed.length + status.pending.length)) * 100)} className="h-2" />
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${script.hook ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Hook Written
                    </span>
                    <Badge variant="secondary" className="text-xs">{script.hook ? '✓' : '○'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${script.beats.every(b => b.text) ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      Script Beats
                    </span>
                    <Badge variant="secondary" className="text-xs">{script.beats.filter(b => b.text).length}/{script.beats.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${script.cta ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Call to Action
                    </span>
                    <Badge variant="secondary" className="text-xs">{script.cta ? '✓' : '○'}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Score */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Quality Score</h3>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{((validationScores.hookStrength + validationScores.engagementPotential + validationScores.brandAlignment) / 3).toFixed(1)}/10</div>
                  <div className="text-xs text-muted-foreground">Script Quality</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Hook Strength</span>
                    <span className={`font-medium ${validationScores.hookStrength >= 8 ? 'text-green-600' : validationScores.hookStrength >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>{validationScores.hookStrength}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Engagement Potential</span>
                    <span className={`font-medium ${validationScores.engagementPotential >= 8 ? 'text-green-600' : validationScores.engagementPotential >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>{validationScores.engagementPotential}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Brand Alignment</span>
                    <span className={`font-medium ${validationScores.brandAlignment >= 8 ? 'text-green-600' : validationScores.brandAlignment >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>{validationScores.brandAlignment}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Tasks */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Tasks</h3>
              </div>
              <div className="space-y-2">
                {status.completed.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="line-through text-muted-foreground">{task}</span>
                  </div>
                ))}
                {status.pending.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3 text-yellow-500" />
                    <span>{task}</span>
                  </div>
                ))}
                {status.completed.length === 0 && status.pending.length === 0 && (
                  <div className="text-sm text-muted-foreground">All tasks completed</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptStudio;