import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";
import { useProjects } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import { Lightbulb, Target, Users, Music, Palette, Wand2, FileText } from "lucide-react";
import { toast } from "sonner";

const IdeaOverview = () => {
  const { projectId, ideaId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  
  const project = projects.find(p => p.id === projectId);
  const idea = ideas.find(i => i.id === ideaId);

  const [ideaDNA, setIdeaDNA] = useState({
    voiceTone: "",
    targetAudience: "",
    musicMood: "",
    colorScheme: "",
    contentStyle: ""
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

  const generateIdeaDNA = async () => {
    // Simulate AI generation
    setIdeaDNA({
      voiceTone: "Energetic",
      targetAudience: "Gen Z (18-24)",
      musicMood: "Upbeat",
      colorScheme: "Vibrant",
      contentStyle: "Quick Tips"
    });
    toast.success("Idea DNA generated successfully!");
  };

  const proceedToScript = () => {
    if (projectId && ideaId) {
      navigate(`/projects/${projectId}/ideas/${ideaId}/script`);
    }
  };

  if (!project || !idea) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{project.name}</span>
            <span>•</span>
            <span>Idea Overview</span>
          </div>
          <h1 className="text-3xl font-bold">{idea.title}</h1>
          <p className="text-muted-foreground mt-1">{idea.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateIdeaDNA}>
            <Wand2 className="h-4 w-4 mr-2" />
            Generate DNA
          </Button>
          <NextButton 
            nextStage="script" 
            nextLabel="Start Script"
            icon={FileText}
            disabled={!ideaDNA.voiceTone || !ideaDNA.targetAudience}
          />
        </div>
      </div>

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
                    <Palette className="h-4 w-4" />
                    Color Scheme
                  </label>
                  <Select value={ideaDNA.colorScheme} onValueChange={(value) => setIdeaDNA({...ideaDNA, colorScheme: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemeOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
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
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Define Idea DNA</p>
                  <p className="text-xs text-muted-foreground">Set creative direction</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Script Writing</p>
                  <p className="text-xs text-muted-foreground">Create detailed script</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IdeaOverview;