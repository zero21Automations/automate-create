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
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette, ChevronDown, ChevronUp, Sparkles, RotateCcw, Check } from "lucide-react";
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
    hook: false,
    beats: {} as Record<number, boolean>,
    cta: false
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

  const addBeat = () => {
    if (isLocked) return;
    const newBeat = {
      id: script.beats.length + 1,
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
    setScript(prev => ({ ...prev, beats: [...prev.beats, newBeat] }));
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
          [beatId]: !prev.beats[beatId]
        }
      }));
    } else {
      setStageDirectionsOpen(prev => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev]
      }));
    }
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
    metricLabel: string
  ) => {
    const Icon = icon;
    
    return (
      <Card className={`p-6 border-l-4 ${colorClass} bg-gradient-to-r from-violet-950/20 to-transparent`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-violet-100">{title} ({duration} seconds)</h3>
            <Button variant="outline" size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-500">
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
          </div>
        </div>

        <Textarea
          placeholder={`Enter your ${title.toLowerCase()} content...`}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[100px] mb-4 bg-violet-950/20 border-violet-600 text-violet-100 placeholder:text-violet-400"
          disabled={isLocked}
        />

        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-violet-300 hover:text-violet-100">
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
                <Label className="text-sm text-violet-300 mb-2 block">B-Roll Shot</Label>
                <Textarea
                  placeholder="e.g. Wide shot of penguin colony"
                  value={stageDirections.bRoll}
                  onChange={(e) => onStageDirectionsChange('bRoll', e.target.value)}
                  className="bg-violet-950/20 border-violet-600 text-violet-100 placeholder:text-violet-400"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-violet-300 mb-2 block">Overlay/Graphics</Label>
                <Textarea
                  placeholder="e.g. 🐧🔥 emoji animation"
                  value={stageDirections.overlay}
                  onChange={(e) => onStageDirectionsChange('overlay', e.target.value)}
                  className="bg-violet-950/20 border-violet-600 text-violet-100 placeholder:text-violet-400"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-violet-300 mb-2 block">Voice Style</Label>
                <Textarea
                  placeholder="e.g. Excited, surprised"
                  value={stageDirections.voiceStyle}
                  onChange={(e) => onStageDirectionsChange('voiceStyle', e.target.value)}
                  className="bg-violet-950/20 border-violet-600 text-violet-100 placeholder:text-violet-400"
                  disabled={isLocked}
                />
              </div>
              <div>
                <Label className="text-sm text-violet-300 mb-2 block">SFX</Label>
                <Textarea
                  placeholder="e.g. Pebble drop sound..."
                  value={stageDirections.sfx}
                  onChange={(e) => onStageDirectionsChange('sfx', e.target.value)}
                  className="bg-violet-950/20 border-violet-600 text-violet-100 placeholder:text-violet-400"
                  disabled={isLocked}
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-500">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Generate Directions
                </Button>
                <Button variant="outline" size="sm" className="border-violet-600 text-violet-300 hover:bg-violet-800">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
              <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Check className="h-3 w-3 mr-1" />
                Approve
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-violet-950 p-6 space-y-6">
      {/* Pipeline Navigation */}
      <PipelineNav ideaTitle="5-Minute Morning Workout" currentStage="script" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-violet-300 hover:text-violet-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Script Studio</h1>
            <p className="text-violet-300">Stage 2: Transform ideas into platform-optimized scripts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-violet-800 text-violet-200">
            <Clock className="h-3 w-3 mr-1" />
            2:30 read time
          </Badge>
          {ideaId && (
            <Badge variant="secondary" className="bg-violet-800 text-violet-200">Idea: {ideaId}</Badge>
          )}
          <Button variant="outline" size="sm" className="border-violet-600 text-violet-300 hover:bg-violet-800">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
            <Save className="h-4 w-4 mr-2" />
            Save Script
          </Button>
          <Button 
            onClick={script.state === "draft" ? freezeScript : () => navigate(`/projects/${projectId}/ideas/${ideaId}/assets`)}
            className={script.state === "draft" ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-gradient-to-r from-violet-600 to-purple-600 text-white"}
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
          <Card className="p-4 border border-violet-600 bg-gradient-to-r from-violet-950/40 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-violet-400" />
              <h3 className="font-semibold text-violet-100">Script DNA</h3>
              {isLocked && <Lock className="h-3 w-3 text-violet-400" />}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-violet-300">Narrative</Label>
                <Select value={styleDNA.narrative} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, narrative: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm bg-violet-950/20 border-violet-600 text-violet-100">
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
                <Label className="text-xs font-medium text-violet-300">Visual</Label>
                <Select value={styleDNA.visual} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, visual: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm bg-violet-950/20 border-violet-600 text-violet-100">
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
                <Label className="text-xs font-medium text-violet-300">Tone</Label>
                <Select value={styleDNA.tone} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, tone: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm bg-violet-950/20 border-violet-600 text-violet-100">
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
                <Label className="text-xs font-medium text-violet-300">Pace</Label>
                <Select value={styleDNA.pace} onValueChange={(value) => setStyleDNA(prev => ({ ...prev, pace: value }))} disabled={isLocked}>
                  <SelectTrigger className="h-8 text-sm bg-violet-950/20 border-violet-600 text-violet-100">
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
              <Label className="text-xs font-medium text-violet-300">Targeting</Label>
              <Input 
                value={styleDNA.targeting} 
                onChange={(e) => setStyleDNA(prev => ({ ...prev, targeting: e.target.value }))}
                className="h-8 text-sm bg-violet-950/20 border-violet-600 text-violet-100"
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-violet-100">Script Beats</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addBeat}
                disabled={isLocked}
                className="border-violet-600 text-violet-300 hover:bg-violet-800"
              >
                Add Beat
              </Button>
            </div>
            
            {script.beats.map((beat, index) => (
              <div key={beat.id}>
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
                  stageDirectionsOpen.beats[beat.id] || false,
                  () => toggleStageDirections('beats', beat.id),
                  "border-l-blue-500",
                  Target,
                  `${beat.metrics.engagement}% engagement`
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
          <Card className="p-4 border border-violet-600 bg-gradient-to-r from-violet-950/40 to-transparent">
            <h3 className="font-semibold mb-4 text-violet-100">Quality Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-violet-300">Hook Strength</span>
                <Badge variant="secondary" className="bg-violet-800 text-violet-200">{validationScores.hookStrength}/10</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-violet-300">Engagement Potential</span>
                <Badge variant="secondary" className="bg-violet-800 text-violet-200">{validationScores.engagementPotential}/10</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-violet-300">Brand Alignment</span>
                <Badge variant="secondary" className="bg-violet-800 text-violet-200">{validationScores.brandAlignment}/10</Badge>
              </div>
            </div>
          </Card>

          {/* Platform Versions */}
          <Card className="p-4 border border-violet-600 bg-gradient-to-r from-violet-950/40 to-transparent">
            <h3 className="font-semibold mb-4 text-violet-100">Platform Versions</h3>
            <Tabs defaultValue="tiktok" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-violet-800">
                <TabsTrigger value="tiktok" className="text-violet-200">TikTok</TabsTrigger>
                <TabsTrigger value="youtube" className="text-violet-200">YouTube</TabsTrigger>
                <TabsTrigger value="instagram" className="text-violet-200">Instagram</TabsTrigger>
              </TabsList>
              <TabsContent value="tiktok" className="mt-4">
                <div className="text-sm text-violet-300">
                  Optimized for 15-60 seconds, vertical format
                </div>
              </TabsContent>
              <TabsContent value="youtube" className="mt-4">
                <div className="text-sm text-violet-300">
                  Extended for 60+ seconds, horizontal format
                </div>
              </TabsContent>
              <TabsContent value="instagram" className="mt-4">
                <div className="text-sm text-violet-300">
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