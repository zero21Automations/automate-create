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
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image, Flame, ThumbsUp, Zap, Eye, Lock, Palette } from "lucide-react";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";

const ScriptStudio = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const [script, setScript] = useState({
    hook: "",
    beats: [{ 
      id: 1, 
      text: "", 
      stageDirections: "",
      metrics: { scrollStop: 85, retention: 78, engagement: 72 }
    }],
    cta: "",
    state: "draft", // draft, frozen, locked
    version: 1
  });

  const [validationScores, setValidationScores] = useState({
    hookStrength: 7,
    engagementPotential: 8,
    brandAlignment: 9
  });

  const [styleDNA] = useState({
    narrative: "Third Person",
    visual: "Live Action",
    tone: "Energetic",
    pace: "Fast",
    targeting: "Fitness Enthusiasts 18-35"
  });

  const [isLocked, setIsLocked] = useState(false);

  const addBeat = () => {
    if (isLocked) return;
    const newBeat = {
      id: script.beats.length + 1,
      text: "",
      stageDirections: "",
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
              <h3 className="font-semibold">Active Style DNA</h3>
              {isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{styleDNA.narrative}</Badge>
              <Badge variant="secondary">{styleDNA.visual}</Badge>
              <Badge variant="secondary">{styleDNA.tone}</Badge>
              <Badge variant="secondary">{styleDNA.pace} Pace</Badge>
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
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Hook (First 3 seconds)</label>
                  <div className="flex items-center gap-2">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-orange-600 font-medium">90% scroll-stop</span>
                  </div>
                </div>
                <Textarea
                  placeholder="Start with a compelling hook that stops the scroll..."
                  value={script.hook}
                  onChange={(e) => setScript(prev => ({ ...prev, hook: e.target.value }))}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
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
                    <div key={beat.id} className="space-y-3 mb-6 p-4 border rounded-lg bg-card/50">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Beat {index + 1}</Badge>
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
                      
                      <Textarea
                        placeholder="Enter script content for this beat..."
                        value={beat.text}
                        onChange={(e) => {
                          if (isLocked) return;
                          const newBeats = [...script.beats];
                          newBeats[index].text = e.target.value;
                          setScript(prev => ({ ...prev, beats: newBeats }));
                        }}
                        className="min-h-[100px]"
                        disabled={isLocked}
                      />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <Input
                          placeholder="Stage directions (camera, visuals, etc.)"
                          value={beat.stageDirections}
                          onChange={(e) => {
                            if (isLocked) return;
                            const newBeats = [...script.beats];
                            newBeats[index].stageDirections = e.target.value;
                            setScript(prev => ({ ...prev, beats: newBeats }));
                          }}
                          className="text-sm text-muted-foreground"
                          disabled={isLocked}
                        />
                        
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
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Call to Action</label>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-blue-600 font-medium">Conversion-optimized</span>
                  </div>
                </div>
                <Textarea
                  placeholder="End with a strong call to action..."
                  value={script.cta}
                  onChange={(e) => setScript(prev => ({ ...prev, cta: e.target.value }))}
                  className="min-h-[80px]"
                  disabled={isLocked}
                />
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
                    <span>Bold, attention-grabbing tone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-3 w-3 text-primary" />
                    <span>Close-up, dynamic opening shot</span>
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
                    <span>Upbeat electronic, crescendo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary" />
                    <span>Animated text overlays</span>
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