import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";
import { useProjects } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import { Lightbulb, Target, Users, Music, Palette, Wand2, FileText, Video, Eye, User, Timer } from "lucide-react";
import { toast } from "sonner";

const IdeaOverview = () => {
  const { projectId, ideaId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  
  const project = projects.find(p => p.id === projectId);
  const idea = ideas.find(i => i.id === ideaId);

  const [ideaDNA, setIdeaDNA] = useState({
    // Basic Idea DNA
    voiceTone: "",
    targetAudience: "",
    musicMood: "",
    colorScheme: "",
    contentStyle: "",
    // Script DNA (merged)
    narrativePOV: "",
    narratorType: "",
    visualStyle: "",
    videoLength: ""
  });

  const voiceToneOptions = [
    "Professional", "Casual", "Energetic", "Calm", "Humorous", "Serious", "Inspirational", "Educational"
  ];

  const audienceOptions = [
    "Gen Z (18-24)", "Millennials (25-40)", "Gen X (41-56)", "Business Professionals", 
    "Students", "Parents", "Entrepreneurs", "General Audience"
  ];

  const musicMoodOptions = [
    "Upbeat", "Chill", "Dramatic", "Inspiring", "Minimal", "Electronic", "Acoustic", "No Music"
  ];

  const colorSchemeOptions = [
    "Vibrant", "Minimal", "Dark Mode", "Light & Airy", "Bold Contrast", "Warm Tones", "Cool Tones", "Monochrome"
  ];

  const contentStyleOptions = [
    "Tutorial", "Storytelling", "Quick Tips", "Behind-the-Scenes", "Product Demo", "Interview", "Animation", "Live Action"
  ];

  const narrativePOVOptions = ["First Person", "Second Person", "Third Person"];
  const narratorTypeOptions = ["On Screen", "Voiceover", "Text Only"];
  const visualStyleOptions = ["Live Action", "Animation", "Mixed Media", "Screen Recording"];
  const videoLengthOptions = ["15-30 seconds", "30-60 seconds", "60-90 seconds", "90+ seconds"];

  const generateIdeaDNA = async () => {
    // Simulate AI generation based on idea content
    setIdeaDNA({
      voiceTone: "Energetic",
      targetAudience: "Gen Z (18-24)",
      musicMood: "Upbeat",
      colorScheme: "Vibrant",
      contentStyle: "Quick Tips",
      narrativePOV: "Second Person",
      narratorType: "On Screen",
      visualStyle: "Live Action",
      videoLength: "30-60 seconds"
    });
    toast.success("Idea DNA generated successfully!");
  };

  const proceedToScript = () => {
    if (projectId && ideaId) {
      // Pass the idea DNA to the script page via navigation state
      navigate(`/projects/${projectId}/ideas/${ideaId}/script`, {
        state: { ideaDNA }
      });
    }
  };

  if (!project || !idea) {
    return <div>Loading...</div>;
  }

  const isDNAComplete = ideaDNA.voiceTone && ideaDNA.targetAudience && ideaDNA.narrativePOV && ideaDNA.visualStyle;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Pipeline Navigation */}
      <PipelineNav ideaTitle={idea.title} currentStage="idea" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Idea DNA Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Idea DNA
              </CardTitle>
              <CardDescription>
                Define the creative direction and style for your content idea
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Core Creative Direction */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Core Creative Direction
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Voice & Tone
                    </label>
                    <Select value={ideaDNA.voiceTone} onValueChange={(value) => setIdeaDNA({...ideaDNA, voiceTone: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceToneOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Target Audience
                    </label>
                    <Select value={ideaDNA.targetAudience} onValueChange={(value) => setIdeaDNA({...ideaDNA, targetAudience: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Music Mood
                    </label>
                    <Select value={ideaDNA.musicMood} onValueChange={(value) => setIdeaDNA({...ideaDNA, musicMood: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select music mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {musicMoodOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Content Style
                    </label>
                    <Select value={ideaDNA.contentStyle} onValueChange={(value) => setIdeaDNA({...ideaDNA, contentStyle: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content style" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentStyleOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Script Style Dimensions */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Script Style Dimensions
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Narrative POV
                    </label>
                    <Select value={ideaDNA.narrativePOV} onValueChange={(value) => setIdeaDNA({...ideaDNA, narrativePOV: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select POV" />
                      </SelectTrigger>
                      <SelectContent>
                        {narrativePOVOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Narrator Type
                    </label>
                    <Select value={ideaDNA.narratorType} onValueChange={(value) => setIdeaDNA({...ideaDNA, narratorType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select narrator" />
                      </SelectTrigger>
                      <SelectContent>
                        {narratorTypeOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      Visual Style
                    </label>
                    <Select value={ideaDNA.visualStyle} onValueChange={(value) => setIdeaDNA({...ideaDNA, visualStyle: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visual style" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualStyleOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      Video Length
                    </label>
                    <Select value={ideaDNA.videoLength} onValueChange={(value) => setIdeaDNA({...ideaDNA, videoLength: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
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

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={generateIdeaDNA}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate DNA
                </Button>
                <Button onClick={proceedToScript} disabled={!isDNAComplete}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Script
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Idea Details */}
          <Card>
            <CardHeader>
              <CardTitle>Idea Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Video Concept</h4>
                <p className="text-sm text-muted-foreground">{idea.video_concept || "No concept defined yet"}</p>
              </div>
              
              {idea.target_platforms && idea.target_platforms.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Target Platforms</h4>
                  <div className="flex gap-2 flex-wrap">
                    {idea.target_platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">{platform}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {idea.hashtags && idea.hashtags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Hashtags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {idea.hashtags.map((hashtag) => (
                      <Badge key={hashtag} variant="outline">#{hashtag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Define Idea DNA</p>
                  <p className="text-xs text-muted-foreground">Set creative direction</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 p-3 rounded-lg ${isDNAComplete ? 'bg-muted/50' : 'opacity-50'}`}>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Generate Script</p>
                  <p className="text-xs text-muted-foreground">AI-powered script creation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>DNA Completion</span>
                  <span>{Math.round((Object.values(ideaDNA).filter(v => v).length / Object.keys(ideaDNA).length) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(Object.values(ideaDNA).filter(v => v).length / Object.keys(ideaDNA).length) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <NextButton 
        nextStage="script" 
        nextLabel="Start Script"
        icon={FileText}
        disabled={!isDNAComplete}
      />
    </div>
  );
};

export default IdeaOverview;