import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette, ChevronDown, ChevronUp, Sparkles, RotateCcw, Check, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";

const ScriptStudio = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  
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
    narrative: "Third Person",
    visual: "Live Action",
    tone: "Energetic",
    pace: "Fast",
    targeting: "Fitness Enthusiasts 18-35"
  });

  const narrativeOptions = ["First Person", "Second Person", "Third Person", "Voiceover"];
  const visualOptions = ["Live Action", "Animation", "Screen Recording", "Talking Head", "B-Roll Only"];
  const toneOptions = ["Energetic", "Calm", "Playful", "Professional", "Motivational", "Educational", "Dramatic"];
  const paceOptions = ["Slow", "Medium", "Fast", "Very Fast"];
  
  const stageDirectionOptions = {
    camera: ["Close-up", "Medium shot", "Wide shot", "Over shoulder", "POV", "Drone shot"],
    movement: ["Static", "Pan left", "Pan right", "Zoom in", "Zoom out", "Handheld"],
    lighting: ["Natural", "Studio", "Golden hour", "Blue hour", "Dramatic", "Soft"],
    setting: ["Indoor", "Outdoor", "Studio", "Kitchen", "Gym", "Office", "Bedroom"]
  };

  const [isLocked, setIsLocked] = useState(false);

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
    
    return {
      completed: [
        hasHook && "Hook written",
        hasBeats && "All beats completed",
        hasCTA && "CTA written",
        hasStageDirections && "Stage directions complete"
      ].filter(Boolean),
      pending: [
        !hasHook && "Write hook",
        !hasBeats && "Complete all beats",
        !hasCTA && "Write call to action",
        !hasStageDirections && "Add stage directions"
      ].filter(Boolean)
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
            <h3 className="text-lg font-semibold">{title} ({duration} seconds)</h3>
            <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
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
                  <Sparkles className="h-3 w-3 mr-1" />
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

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Pipeline Navigation */}
      <PipelineNav ideaTitle="5-Minute Morning Workout" currentStage="script" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-factory-gradient">Script Studio</h1>
            <p className="text-muted-foreground">Stage 2: Transform ideas into platform-optimized scripts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            <Clock className="h-3 w-3 mr-1" />
            2:30 read time
          </Badge>
          {ideaId && (
            <Badge variant="secondary" className="badge-factory">Idea: {ideaId}</Badge>
          )}
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Script Editor */}
        <div className="xl:col-span-2 space-y-6">
          {/* Style DNA Card */}
          <Card className="card-factory-glow p-4 border-l-4 border-l-primary">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Script DNA</h3>
              {isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Narrative</Label>
                <Select value={styleDNA.narrative} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, narrative: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {narrativeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Visual</Label>
                <Select value={styleDNA.visual} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, visual: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visualOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Tone</Label>
                <Select value={styleDNA.tone} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, tone: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Pace</Label>
                <Select value={styleDNA.pace} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, pace: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paceOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-3">
              <Label className="text-xs font-medium text-muted-foreground">Targeting</Label>
              <Input 
                value={styleDNA.targeting} 
                onChange={(e) => setStyleDNA(prev => ({ ...prev, targeting: e.target.value }))}
                className="h-8 text-sm"
                disabled={isLocked}
              />
            </div>
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
            Flame,
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
          {/* Quality Scores */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Quality Metrics</h3>
            <div className="space-y-3">
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
          </Card>

          {/* Status Tracker */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Progress Status</h3>
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
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium text-orange-600 mb-2">Pending</h4>
                <div className="space-y-1">
                  {status.pending.length > 0 ? (
                    status.pending.map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="h-3 w-3" />
                        {task}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-green-600">All tasks completed!</div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Platform Versions */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Platform Versions</h3>
            <Tabs defaultValue="tiktok" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                <TabsTrigger value="youtube">YouTube</TabsTrigger>
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
              </TabsList>
              <TabsContent value="tiktok" className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Optimized for 15-60 seconds, vertical format
                </div>
              </TabsContent>
              <TabsContent value="youtube" className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Extended for 60+ seconds, horizontal format
                </div>
              </TabsContent>
              <TabsContent value="instagram" className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Square/vertical format, 30-60 seconds
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      
      {/* Floating Next Button */}
      <NextButton nextStage="assets" nextLabel="Next: Assets" icon={Image} />
    </div>
  );
};

export default ScriptStudio;