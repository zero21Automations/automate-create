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
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";

const ScriptStudio = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const [script, setScript] = useState({
    hook: "",
    hookStageDirections: "",
    hookDuration: 3,
    beats: [{ 
      id: 1, 
      text: "", 
      stageDirections: "",
      duration: 5,
      metrics: { scrollStop: 85, retention: 78, engagement: 72 }
    }],
    cta: "",
    ctaStageDirections: "",
    ctaDuration: 3,
    state: "draft", // draft, frozen, locked
    version: 1
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
      stageDirections: "",
      duration: 5,
      metrics: { scrollStop: 0, retention: 0, engagement: 0 }
    };
    setScript(prev => ({ ...prev, beats: [...prev.beats, newBeat] }));
  };

  const freezeScript = () => {
    setScript(prev => ({ ...prev, state: "frozen" }));
    setIsLocked(true);
  };

  const getMetricColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMetricIcon = (type) => {
    switch (type) {
      case 'scrollStop': return Flame;
      case 'retention': return Eye;
      case 'engagement': return ThumbsUp;
      default: return Target;
    }
  };

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

          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">Script Structure</h2>
                <Badge variant={script.state === "frozen" ? "secondary" : "outline"}>
                  v{script.version} • {script.state}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>

            <div className="space-y-6">
              {/* Hook */}
              <div className="border-l-4 border-l-orange-500 pl-4 bg-orange-50/20 rounded-r-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-orange-700">Hook</label>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                      {script.hookDuration}s
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <Select value={script.hookDuration.toString()} onValueChange={(value) => setScript(prev => ({ ...prev, hookDuration: parseInt(value) }))} disabled={isLocked}>
                        <SelectTrigger className="h-6 w-16 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3,4,5,6,7,8,9,10].map(sec => (
                            <SelectItem key={sec} value={sec.toString()}>{sec}s</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-orange-600 font-medium">90% scroll-stop</span>
                    </div>
                  </div>
                </div>
                <Textarea
                  placeholder="Start with a compelling hook that stops the scroll..."
                  value={script.hook}
                  onChange={(e) => setScript(prev => ({ ...prev, hook: e.target.value }))}
                  className="min-h-[80px] mb-3 border-orange-200 focus:border-orange-400"
                  disabled={isLocked}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Select value={script.hookStageDirections} onValueChange={(value) => setScript(prev => ({ ...prev, hookStageDirections: value }))} disabled={isLocked}>
                    <SelectTrigger className="text-sm text-muted-foreground">
                      <SelectValue placeholder="Camera angle" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageDirectionOptions.camera.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select disabled={isLocked}>
                    <SelectTrigger className="text-sm text-muted-foreground">
                      <SelectValue placeholder="Movement" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageDirectionOptions.movement.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Script Beats */}
              <div>
                <label className="text-sm font-medium mb-4 block">Script Beats</label>
                {script.beats.map((beat, index) => {
                  const ScrollStopIcon = getMetricIcon('scrollStop');
                  const RetentionIcon = getMetricIcon('retention');
                  const EngagementIcon = getMetricIcon('engagement');
                  
                  return (
                    <div key={beat.id} className="border-l-4 border-l-blue-500 pl-4 bg-blue-50/20 rounded-r-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-blue-700 border-blue-500">Beat {index + 1}</Badge>
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                            {beat.duration}s
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-500" />
                            <Select value={beat.duration.toString()} onValueChange={(value) => {
                              if (isLocked) return;
                              const newBeats = [...script.beats];
                              newBeats[index].duration = parseInt(value);
                              setScript(prev => ({ ...prev, beats: newBeats }));
                            }} disabled={isLocked}>
                              <SelectTrigger className="h-6 w-16 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[3,4,5,6,7,8,9,10].map(sec => (
                                  <SelectItem key={sec} value={sec.toString()}>{sec}s</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <ScrollStopIcon className="h-3 w-3" />
                              <span className={getMetricColor(beat.metrics.scrollStop)}>
                                {beat.metrics.scrollStop}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <RetentionIcon className="h-3 w-3" />
                              <span className={getMetricColor(beat.metrics.retention)}>
                                {beat.metrics.retention}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <EngagementIcon className="h-3 w-3" />
                              <span className={getMetricColor(beat.metrics.engagement)}>
                                {beat.metrics.engagement}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Textarea
                        placeholder="Enter script content for this beat..."
                        value={beat.text}
                        onChange={(e) => {
                          if (isLocked) return;
                          const newBeats = [...script.beats];
                          newBeats[index].text = e.target.value;
                          setScript(prev => ({ ...prev, beats: newBeats }));
                        }}
                        className="min-h-[100px] mb-3 border-blue-200 focus:border-blue-400"
                        disabled={isLocked}
                      />
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <Select value={beat.stageDirections} onValueChange={(value) => {
                          if (isLocked) return;
                          const newBeats = [...script.beats];
                          newBeats[index].stageDirections = value;
                          setScript(prev => ({ ...prev, beats: newBeats }));
                        }} disabled={isLocked}>
                          <SelectTrigger className="text-sm text-muted-foreground">
                            <SelectValue placeholder="Camera angle" />
                          </SelectTrigger>
                          <SelectContent>
                            {stageDirectionOptions.camera.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select disabled={isLocked}>
                          <SelectTrigger className="text-sm text-muted-foreground">
                            <SelectValue placeholder="Movement" />
                          </SelectTrigger>
                          <SelectContent>
                            {stageDirectionOptions.movement.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                        
                      {/* Asset Preview Slots */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" disabled={!beat.text}>
                          <Mic className="h-3 w-3 mr-1" />
                          Voice
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" disabled={!beat.stageDirections}>
                          <Video className="h-3 w-3 mr-1" />
                          B-roll
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={addBeat}
                  disabled={isLocked}
                >
                  Add Beat
                </Button>
              </div>

              <Separator />

              {/* Call to Action */}
              <div className="border-l-4 border-l-green-500 pl-4 bg-green-50/20 rounded-r-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-green-700">Call to Action</label>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                      {script.ctaDuration}s
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-green-500" />
                      <Select value={script.ctaDuration.toString()} onValueChange={(value) => setScript(prev => ({ ...prev, ctaDuration: parseInt(value) }))} disabled={isLocked}>
                        <SelectTrigger className="h-6 w-16 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3,4,5,6,7,8,9,10].map(sec => (
                            <SelectItem key={sec} value={sec.toString()}>{sec}s</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Conversion-optimized</span>
                    </div>
                  </div>
                </div>
                <Textarea
                  placeholder="End with a strong call to action..."
                  value={script.cta}
                  onChange={(e) => setScript(prev => ({ ...prev, cta: e.target.value }))}
                  className="min-h-[80px] mb-3 border-green-200 focus:border-green-400"
                  disabled={isLocked}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Select value={script.ctaStageDirections} onValueChange={(value) => setScript(prev => ({ ...prev, ctaStageDirections: value }))} disabled={isLocked}>
                    <SelectTrigger className="text-sm text-muted-foreground">
                      <SelectValue placeholder="Camera angle" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageDirectionOptions.camera.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select disabled={isLocked}>
                    <SelectTrigger className="text-sm text-muted-foreground">
                      <SelectValue placeholder="Setting" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageDirectionOptions.setting.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
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

          {/* Beat-Specific Asset Requirements */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Asset Requirements by Beat</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {/* Hook Requirements */}
              <div className="border-l-2 border-orange-500 pl-3">
                <div className="text-xs font-medium text-orange-600 mb-1">Hook</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mic className="h-3 w-3 text-primary" />
                    <span>{styleDNA.tone.toLowerCase()}, attention-grabbing tone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-3 w-3 text-primary" />
                    <span>
                      {script.hookStageDirections || "Close-up, dynamic opening shot"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Beat Requirements */}
              {script.beats.map((beat, index) => (
                <div key={beat.id} className="border-l-2 border-blue-500 pl-3">
                  <div className="text-xs font-medium text-blue-600 mb-1">Beat {index + 1}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mic className="h-3 w-3 text-primary" />
                      <span>
                        {beat.stageDirections ? 
                          `${styleDNA.tone.toLowerCase()}, narrative voice` : 
                          "Add stage directions for voice requirements"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-3 w-3 text-primary" />
                      <span>
                        {beat.stageDirections || "Stage directions needed for B-roll"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA Requirements */}
              <div className="border-l-2 border-green-500 pl-3">
                <div className="text-xs font-medium text-green-600 mb-1">Call to Action</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Music className="h-3 w-3 text-primary" />
                    <span>Upbeat {styleDNA.pace.toLowerCase()}-paced, crescendo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary" />
                    <span>
                      {script.ctaStageDirections || "Animated text overlays"}
                    </span>
                  </div>
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
      
      {/* Floating Next Button */}
      <NextButton nextStage="assets" nextLabel="Next: Assets" icon={Image} />
    </div>
    </div>
  );
};

export default ScriptStudio;