import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Play, Save, RefreshCw, Clock, Target, Mic, Video, Music, ArrowLeft, Image } from "lucide-react";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";

const ScriptStudio = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const [script, setScript] = useState({
    hook: "",
    beats: [{ id: 1, text: "", stageDirections: "" }],
    cta: ""
  });

  const [validationScores, setValidationScores] = useState({
    hookStrength: 7,
    engagementPotential: 8,
    brandAlignment: 9
  });

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
            onClick={() => navigate(`/projects/${projectId}/ideas/${ideaId}/assets`)}
            className="bg-gradient-factory text-white"
          >
            <Image className="h-4 w-4 mr-2" />
            Next: Assets
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Script Editor */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Script Structure</h2>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>

            <div className="space-y-6">
              {/* Hook */}
              <div>
                <label className="text-sm font-medium mb-2 block">Hook (First 3 seconds)</label>
                <Textarea
                  placeholder="Start with a compelling hook that stops the scroll..."
                  value={script.hook}
                  onChange={(e) => setScript(prev => ({ ...prev, hook: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <Separator />

              {/* Script Beats */}
              <div>
                <label className="text-sm font-medium mb-2 block">Script Beats</label>
                {script.beats.map((beat, index) => (
                  <div key={beat.id} className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Beat {index + 1}</Badge>
                    </div>
                    <Textarea
                      placeholder="Enter script content for this beat..."
                      value={beat.text}
                      onChange={(e) => {
                        const newBeats = [...script.beats];
                        newBeats[index].text = e.target.value;
                        setScript(prev => ({ ...prev, beats: newBeats }));
                      }}
                      className="min-h-[100px]"
                    />
                    <Input
                      placeholder="Stage directions (camera angles, visuals, etc.)"
                      value={beat.stageDirections}
                      onChange={(e) => {
                        const newBeats = [...script.beats];
                        newBeats[index].stageDirections = e.target.value;
                        setScript(prev => ({ ...prev, beats: newBeats }));
                      }}
                      className="text-sm text-muted-foreground"
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Add Beat
                </Button>
              </div>

              <Separator />

              {/* Call to Action */}
              <div>
                <label className="text-sm font-medium mb-2 block">Call to Action</label>
                <Textarea
                  placeholder="End with a strong call to action..."
                  value={script.cta}
                  onChange={(e) => setScript(prev => ({ ...prev, cta: e.target.value }))}
                  className="min-h-[80px]"
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

          {/* Asset Requirements */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Asset Requirements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <span className="text-sm">Voice: Energetic, fast-paced</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-sm">B-roll: Workout footage</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                <span className="text-sm">Music: Upbeat electronic</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm">Captions: Dynamic highlights</span>
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