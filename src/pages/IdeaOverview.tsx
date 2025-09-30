import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PipelineNav } from "@/components/PipelineNav";

import { useProjects } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import { Lightbulb, Target, Users, Music, Dna, Wand2, FileText, Type, Volume2, Video, ArrowLeft, Package, Clapperboard, Upload, BarChart3, Check, Lock, Hash, Globe, User, Ban } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NavLink } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StageGenerateButton } from "@/components/StageGenerateButton";
import { toast } from "sonner";

const IdeaOverview = () => {
  const { projectId, ideaId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { ideas } = useIdeas(projectId || "");
  
  const project = projects.find(p => p.id === projectId);
  const idea = ideas.find(i => i.id === ideaId);

  const [ideaDNA, setIdeaDNA] = useState({
    // Idea Details (first part of DNA)
    description: "",
    targetPlatforms: [] as string[],
    hashtags: [] as string[],
    bannedWords: [] as string[],
    // Creative DNA
    voiceTone: "",
    targetAudience: "",
    musicMood: "",
    colorScheme: "",
    contentStyle: "",
    captionStyle: "",
    narrativePOV: "",
    narratorType: "",
    visualStyle: "",
    videoLength: "",
    // Character Narrator Details (conditional)
    characterAppearance: "",
    characterPersonality: "",
    characterBackground: "",
    characterClothing: ""
  });

  // Initialize with idea data when available
  useState(() => {
    if (idea) {
      setIdeaDNA(prev => ({
        ...prev,
        description: idea.video_concept || "",
        targetPlatforms: idea.target_platforms && idea.target_platforms.length > 0 
          ? idea.target_platforms 
          : ["TikTok"], // Default to TikTok if no platforms defined
        hashtags: idea.hashtags || []
      }));
    } else {
      // If no idea data yet, set TikTok as default
      setIdeaDNA(prev => ({
        ...prev,
        targetPlatforms: ["TikTok"]
      }));
    }
  });

  const platformOptions = [
    "TikTok", "Instagram", "YouTube Shorts", "Facebook", "Twitter", "LinkedIn", "Snapchat", "Pinterest", "Reddit"
  ];

  const hashtagSuggestions = [
    "fyp", "viral", "trending", "tips", "tutorial", "lifehack", "motivation", "productivity", 
    "wellness", "fitness", "business", "entrepreneur", "success", "mindset", "growth", 
    "tech", "ai", "innovation", "creative", "inspiration", "education", "learning"
  ];

  const bannedWordsSuggestions = [
    "click", "subscribe", "like", "follow", "buy now", "limited time", "urgent", "hurry",
    "guaranteed", "instant", "secret", "hack", "trick", "easy money", "get rich quick"
  ];

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

  const captionStyleOptions = [
    "Dynamic highlights", "Minimal text", "Story-driven", "Educational bullets", "Call-out quotes"
  ];

  const narrativePOVOptions = [
    "First Person", "Second Person", "Third Person"
  ];

  const narratorTypeOptions = [
    "Voiceover", "Character Narrator", "On-screen Host"
  ];

  const visualStyleOptions = [
    "Live Action", "Animation", "Cartoon/Comic", "Screen Recording", "Mixed Media"
  ];

  const videoLengthOptions = [
    "15-30 seconds", "30-60 seconds", "60+ seconds"
  ];

  const generateIdeaDNA = async () => {
    // Simulate AI generation with realistic values based on current content
    const updatedDNA = {
      ...ideaDNA,
      description: ideaDNA.description || "A quick, engaging video that teaches viewers something valuable in under 60 seconds with strong visual hooks and clear takeaways.",
      voiceTone: "Energetic",
      targetAudience: "Gen Z (18-24)",
      musicMood: "Upbeat",
      colorScheme: "Vibrant",
      contentStyle: "Quick Tips",
      captionStyle: "Dynamic highlights",
      narrativePOV: "Second Person",
      narratorType: "Character Narrator",
      visualStyle: "Live Action",
      videoLength: "15-30 seconds"
    };

    // If character narrator is selected, also generate character details
    if (updatedDNA.narratorType === "Character Narrator") {
      updatedDNA.characterAppearance = "Young, energetic person in their 20s with an approachable demeanor, expressive eyes, and confident posture";
      updatedDNA.characterPersonality = "Enthusiastic, knowledgeable, speaks with passion and uses engaging hand gestures. Warm and relatable tone";
      updatedDNA.characterBackground = "Content creator and educator with expertise in the video topic, positioned as a helpful guide and mentor";
      updatedDNA.characterClothing = "Casual but polished - fitted jeans, stylish sneakers, and a vibrant colored top that complements the overall aesthetic";
    }

    setIdeaDNA(updatedDNA);
    toast.success("Idea DNA regenerated successfully!");
  };

  const generateDescription = async () => {
    // Simulate AI generation of description
    const descriptions = [
      "A quick, engaging tutorial that teaches viewers a valuable skill in under 60 seconds with clear step-by-step instructions.",
      "An entertaining and informative video that solves a common problem with a creative approach and strong visual storytelling.",
      "A fast-paced, visually appealing demonstration that showcases useful tips and tricks with immediate actionable value.",
      "An inspiring and educational piece that transforms complex concepts into simple, digestible content with engaging visuals."
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    setIdeaDNA(prev => ({
      ...prev,
      description: randomDescription
    }));
    toast.success("Description regenerated!");
  };

  const generateCharacterAppearance = async () => {
    const appearances = [
      "Young, energetic person in their 20s with an approachable demeanor, expressive eyes, and confident posture",
      "Mid-20s professional with a friendly smile, well-groomed appearance, and animated facial expressions",
      "Creative individual with artistic flair, unique style, and engaging presence that draws viewers in",
      "Knowledgeable expert with authoritative but approachable look, clear speaking voice, and professional demeanor"
    ];
    const randomAppearance = appearances[Math.floor(Math.random() * appearances.length)];
    setIdeaDNA(prev => ({ ...prev, characterAppearance: randomAppearance }));
    toast.success("Character appearance regenerated!");
  };

  const generateCharacterPersonality = async () => {
    const personalities = [
      "Enthusiastic, knowledgeable, speaks with passion and uses engaging hand gestures. Warm and relatable tone",
      "Confident and articulate, uses humor effectively, maintains eye contact with camera, speaks clearly and with conviction",
      "Energetic and motivational, uses storytelling techniques, varies vocal tone for emphasis, naturally charismatic",
      "Patient and educational, breaks down complex topics simply, uses analogies, encouraging and supportive demeanor"
    ];
    const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)];
    setIdeaDNA(prev => ({ ...prev, characterPersonality: randomPersonality }));
    toast.success("Character personality regenerated!");
  };

  const generateCharacterBackground = async () => {
    const backgrounds = [
      "Content creator and educator with expertise in the video topic, positioned as a helpful guide and mentor",
      "Industry professional sharing insider knowledge and practical tips based on real experience",
      "Passionate enthusiast who discovered valuable insights and wants to share them with others",
      "Experienced practitioner with proven results, offering actionable advice and strategies"
    ];
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setIdeaDNA(prev => ({ ...prev, characterBackground: randomBackground }));
    toast.success("Character background regenerated!");
  };

  const generateCharacterClothing = async () => {
    const clothingStyles = [
      "Casual but polished - fitted jeans, stylish sneakers, and a vibrant colored top that complements the overall aesthetic",
      "Smart casual - well-fitted chinos, clean white sneakers, and a trendy hoodie or crew neck in brand colors",
      "Professional casual - dark jeans, minimalist white/black top, and accessories that add personality without distraction",
      "Creative casual - unique but accessible style with interesting textures, colors that pop on camera, comfortable yet stylish"
    ];
    const randomClothing = clothingStyles[Math.floor(Math.random() * clothingStyles.length)];
    setIdeaDNA(prev => ({ ...prev, characterClothing: randomClothing }));
    toast.success("Character clothing regenerated!");
  };

  const proceedToScript = () => {
    if (projectId && ideaId) {
      // Pass the idea DNA to the script studio
      navigate(`/projects/${projectId}/ideas/${ideaId}/script`, {
        state: { ideaDNA }
      });
    }
  };

  const isFormComplete = Object.entries(ideaDNA).every(([key, value]) => {
    // Skip character fields if not character narrator
    if (ideaDNA.narratorType !== "Character Narrator" && 
        ["characterAppearance", "characterPersonality", "characterBackground", "characterClothing"].includes(key)) {
      return true;
    }
    // Skip banned words and hashtags as they're not required
    if (["bannedWords", "hashtags"].includes(key)) {
      return true;
    }
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === 'string' && value.length > 0;
  });

  if (!project || !idea) {
    return <div>Loading...</div>;
  }

  // Pipeline stages for integrated navigation
  const pipelineStages = [
    { id: 'idea', label: 'Idea', icon: Lightbulb, path: `/projects/${projectId}/ideas/${ideaId}`, status: 'current' },
    { id: 'script', label: 'Script', icon: FileText, path: `/projects/${projectId}/ideas/${ideaId}/script`, status: 'pending' },
    { id: 'assets', label: 'Assets', icon: Package, path: `/projects/${projectId}/ideas/${ideaId}/assets`, status: 'pending' },
    { id: 'production', label: 'Production', icon: Clapperboard, path: `/projects/${projectId}/ideas/${ideaId}/production`, status: 'pending' },
    { id: 'publishing', label: 'Publishing', icon: Upload, path: `/projects/${projectId}/ideas/${ideaId}/publishing`, status: 'pending' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `/projects/${projectId}/ideas/${ideaId}/analytics`, status: 'locked' }
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
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>{project?.name}</span>
                <span>›</span>
                <span className="text-primary font-medium">{idea?.title || "Untitled Idea"}</span>
              </div>
              
              <h1 className="text-xl font-bold text-factory-gradient flex items-center gap-3 my-4">
                <Lightbulb className="h-6 w-6" />
                Idea Overview
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage {currentStageIndex + 1}/{pipelineStages.length}
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Define creative direction and style for your content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={proceedToScript}
              disabled={!isFormComplete}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <FileText className="h-4 w-4 mr-2" />
              Next: Script
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
              const isCompleted = false; // For idea stage, no stages are completed yet
              const isLocked = stage.status === 'locked';
              
              return (
                <div key={stage.id} className="flex items-center gap-2 min-w-0">
                  <NavLink to={stage.path} className="flex items-center">
                    <Button
                      variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                      size="sm"
                      className={`flex items-center gap-2 text-xs whitespace-nowrap ${
                        isLocked ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isLocked}
                      asChild
                    >
                      <div className="flex items-center w-full">
                        <Icon className="h-4 w-4 mr-2" />
                        {stage.label}
                        {isCompleted && <Check className="h-3 w-3 ml-auto" />}
                        {isLocked && <Lock className="h-3 w-3 ml-auto" />}
                      </div>
                    </Button>
                  </NavLink>
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
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Idea DNA Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5" />
                Idea DNA
              </CardTitle>
              <CardDescription>
                Define the creative direction and style for your content idea
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Idea Overview Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Video Concept
                </h4>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Description</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={generateDescription}
                        className="h-7 px-2 text-xs"
                      >
                        <Wand2 className="h-3 w-3 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Describe what this video will be about..."
                      value={ideaDNA.description}
                      onChange={(e) => setIdeaDNA({...ideaDNA, description: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Target Platforms
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-3 border rounded-md">
                        {platformOptions.map(platform => (
                          <div key={platform} className="flex items-center space-x-2">
                            <Checkbox
                              id={platform}
                              checked={ideaDNA.targetPlatforms.includes(platform)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setIdeaDNA({...ideaDNA, targetPlatforms: [...ideaDNA.targetPlatforms, platform]});
                                } else {
                                  setIdeaDNA({...ideaDNA, targetPlatforms: ideaDNA.targetPlatforms.filter(p => p !== platform)});
                                }
                              }}
                            />
                            <label htmlFor={platform} className="text-sm cursor-pointer">{platform}</label>
                          </div>
                        ))}
                      </div>
                      {ideaDNA.targetPlatforms.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {ideaDNA.targetPlatforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">{platform}</Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Hashtags
                      </label>
                      <div className="space-y-2">
                        <Input
                          placeholder="Enter custom hashtags separated by commas"
                          value={ideaDNA.hashtags.join(", ")}
                          onChange={(e) => setIdeaDNA({...ideaDNA, hashtags: e.target.value.split(",").map(h => h.trim()).filter(h => h)})}
                        />
                        <div className="text-xs text-muted-foreground mb-2">Popular suggestions:</div>
                        <div className="flex gap-1 flex-wrap max-h-20 overflow-y-auto">
                          {hashtagSuggestions.map((hashtag) => (
                            <Badge 
                              key={hashtag} 
                              variant={ideaDNA.hashtags.includes(hashtag) ? "default" : "outline"} 
                              className="text-xs cursor-pointer hover:bg-primary/10"
                              onClick={() => {
                                if (ideaDNA.hashtags.includes(hashtag)) {
                                  setIdeaDNA({...ideaDNA, hashtags: ideaDNA.hashtags.filter(h => h !== hashtag)});
                                } else {
                                  setIdeaDNA({...ideaDNA, hashtags: [...ideaDNA.hashtags, hashtag]});
                                }
                              }}
                            >
                              #{hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {ideaDNA.hashtags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {ideaDNA.hashtags.map((hashtag) => (
                            <Badge key={hashtag} variant="default" className="text-xs">#{hashtag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Banned Words Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Ban className="h-4 w-4" />
                      Banned Words/Phrases
                    </label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter words/phrases to avoid, separated by commas"
                        value={ideaDNA.bannedWords.join(", ")}
                        onChange={(e) => setIdeaDNA({...ideaDNA, bannedWords: e.target.value.split(",").map(w => w.trim()).filter(w => w)})}
                      />
                      <div className="text-xs text-muted-foreground mb-2">Common words to avoid:</div>
                      <div className="flex gap-1 flex-wrap max-h-16 overflow-y-auto">
                        {bannedWordsSuggestions.map((word) => (
                          <Badge 
                            key={word} 
                            variant={ideaDNA.bannedWords.includes(word) ? "destructive" : "outline"} 
                            className="text-xs cursor-pointer hover:bg-destructive/10"
                            onClick={() => {
                              if (ideaDNA.bannedWords.includes(word)) {
                                setIdeaDNA({...ideaDNA, bannedWords: ideaDNA.bannedWords.filter(w => w !== word)});
                              } else {
                                setIdeaDNA({...ideaDNA, bannedWords: [...ideaDNA.bannedWords, word]});
                              }
                            }}
                          >
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {ideaDNA.bannedWords.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {ideaDNA.bannedWords.map((word) => (
                          <Badge key={word} variant="destructive" className="text-xs">{word}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-4">
                  <Dna className="h-4 w-4" />
                  Creative DNA
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
                      <Type className="h-4 w-4" />
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Caption Style
                    </label>
                    <Select value={ideaDNA.captionStyle} onValueChange={(value) => setIdeaDNA({...ideaDNA, captionStyle: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select caption style" />
                      </SelectTrigger>
                      <SelectContent>
                        {captionStyleOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Narrative POV
                    </label>
                    <Select value={ideaDNA.narrativePOV} onValueChange={(value) => setIdeaDNA({...ideaDNA, narrativePOV: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select narrative POV" />
                      </SelectTrigger>
                      <SelectContent>
                        {narrativePOVOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Narrator Type
                    </label>
                    <Select value={ideaDNA.narratorType} onValueChange={(value) => setIdeaDNA({...ideaDNA, narratorType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select narrator type" />
                      </SelectTrigger>
                      <SelectContent>
                        {narratorTypeOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Video className="h-4 w-4" />
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Video Length
                    </label>
                    <Select value={ideaDNA.videoLength} onValueChange={(value) => setIdeaDNA({...ideaDNA, videoLength: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select video length" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoLengthOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Character Narrator Details - Conditional Section */}
                {ideaDNA.narratorType === "Character Narrator" && (
                  <div className="border-t pt-6 space-y-4">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Character Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Physical Appearance</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={generateCharacterAppearance}
                            className="h-7 px-2 text-xs"
                          >
                            <Wand2 className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe the character's physical appearance (age, build, facial features, etc.)"
                          value={ideaDNA.characterAppearance}
                          onChange={(e) => setIdeaDNA({...ideaDNA, characterAppearance: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Personality & Mannerisms</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={generateCharacterPersonality}
                            className="h-7 px-2 text-xs"
                          >
                            <Wand2 className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Describe personality traits, speaking style, gestures, quirks, etc."
                          value={ideaDNA.characterPersonality}
                          onChange={(e) => setIdeaDNA({...ideaDNA, characterPersonality: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Background & Role</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={generateCharacterBackground}
                            className="h-7 px-2 text-xs"
                          >
                            <Wand2 className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Character's background, expertise, role in the video"
                          value={ideaDNA.characterBackground}
                          onChange={(e) => setIdeaDNA({...ideaDNA, characterBackground: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Clothing & Style</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={generateCharacterClothing}
                            className="h-7 px-2 text-xs"
                          >
                            <Wand2 className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Clothing style, colors, accessories, overall aesthetic"
                          value={ideaDNA.characterClothing}
                          onChange={(e) => setIdeaDNA({...ideaDNA, characterClothing: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={generateIdeaDNA}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Regenerate DNA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Quality & Progress Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            {/* Progress Overview */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">DNA Progress</h3>
              </div>
              <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">DNA Completion</span>
                <span className="text-sm font-medium">{(() => {
                  const requiredFields = Object.entries(ideaDNA).filter(([key]) => {
                    // Skip character fields if not character narrator
                    if (ideaDNA.narratorType !== "Character Narrator" && 
                        ["characterAppearance", "characterPersonality", "characterBackground", "characterClothing"].includes(key)) {
                      return false;
                    }
                    // Skip optional fields
                    if (["bannedWords", "hashtags"].includes(key)) {
                      return false;
                    }
                    return true;
                  });
                  
                  const completedFields = requiredFields.filter(([key, value]) => {
                    if (Array.isArray(value)) return value.length > 0;
                    return typeof value === 'string' && value.length > 0;
                  });
                  
                  return Math.round((completedFields.length / requiredFields.length) * 100);
                })()}%</span>
              </div>
              <Progress value={(() => {
                const requiredFields = Object.entries(ideaDNA).filter(([key]) => {
                  if (ideaDNA.narratorType !== "Character Narrator" && 
                      ["characterAppearance", "characterPersonality", "characterBackground", "characterClothing"].includes(key)) {
                    return false;
                  }
                  if (["bannedWords", "hashtags"].includes(key)) {
                    return false;
                  }
                  return true;
                });
                
                const completedFields = requiredFields.filter(([key, value]) => {
                  if (Array.isArray(value)) return value.length > 0;
                  return typeof value === 'string' && value.length > 0;
                });
                
                return Math.round((completedFields.length / requiredFields.length) * 100);
              })()} className="w-full" />
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ideaDNA.description ? 'bg-green-500' : 'bg-muted'}`} />
                  <span className="text-xs">Video Concept</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ideaDNA.targetPlatforms.length > 0 ? 'bg-green-500' : 'bg-muted'}`} />
                  <span className="text-xs">Target Platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ideaDNA.voiceTone && ideaDNA.targetAudience && ideaDNA.contentStyle ? 'bg-green-500' : 'bg-muted'}`} />
                  <span className="text-xs">Creative DNA</span>
                </div>
                {ideaDNA.narratorType === "Character Narrator" && (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${ideaDNA.characterAppearance && ideaDNA.characterPersonality ? 'bg-green-500' : 'bg-muted'}`} />
                    <span className="text-xs">Character Details</span>
                  </div>
                )}
              </div>
              </div>
              
              {/* Generate DNA Button */}
              <div className="mt-4">
                <StageGenerateButton
                  stage="dna"
                  hasExistingContent={Object.values(ideaDNA).some(value => 
                    Array.isArray(value) ? value.length > 0 : 
                    typeof value === 'string' ? value.length > 0 : false
                  )}
                  onGenerate={async () => {
                    // Generate DNA based on idea content
                    toast.success("DNA generation completed!");
                  }}
                />
              </div>
            </Card>

            {/* Quality Metrics */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Quality Score</h3>
              </div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(85 + (isFormComplete ? 10 : 0) + (ideaDNA.hashtags.length > 0 ? 3 : 0) + (ideaDNA.bannedWords.length > 0 ? 2 : 0))}
                </div>
                <div className="text-xs text-muted-foreground">Overall Quality</div>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Concept Clarity</span>
                  <Badge variant={ideaDNA.description ? "default" : "outline"} className="text-xs">
                    {ideaDNA.description ? "Strong" : "Needs Work"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Creative Direction</span>
                  <Badge variant={ideaDNA.voiceTone && ideaDNA.visualStyle ? "default" : "outline"} className="text-xs">
                    {ideaDNA.voiceTone && ideaDNA.visualStyle ? "Defined" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Platform Readiness</span>
                  <Badge variant={ideaDNA.targetPlatforms.length > 0 ? "default" : "outline"} className="text-xs">
                    {ideaDNA.targetPlatforms.length > 0 ? "Ready" : "Not Set"}
                  </Badge>
                </div>
                {ideaDNA.narratorType === "Character Narrator" && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Character Dev</span>
                    <Badge variant={ideaDNA.characterAppearance && ideaDNA.characterPersonality ? "default" : "outline"} className="text-xs">
                      {ideaDNA.characterAppearance && ideaDNA.characterPersonality ? "Complete" : "Basic"}
                    </Badge>
                  </div>
                )}
              </div>
              </div>
            </Card>

            {/* Tasks */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Check className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Tasks</h3>
              </div>
            <div className="space-y-2">
              {!ideaDNA.description && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs">Add video description</span>
                </div>
              )}
              {!ideaDNA.voiceTone && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs">Define voice & tone</span>
                </div>
              )}
              {!ideaDNA.targetAudience && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs">Select target audience</span>
                </div>
              )}
              {!ideaDNA.contentStyle && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs">Choose content style</span>
                </div>
              )}
              {ideaDNA.narratorType === "Character Narrator" && !ideaDNA.characterAppearance && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs">Describe character</span>
                </div>
              )}
              {isFormComplete && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs">Ready for script phase</span>
                </div>
              )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaOverview;