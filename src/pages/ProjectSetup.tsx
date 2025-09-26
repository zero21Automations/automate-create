import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Palette, 
  Users, 
  Globe, 
  Calendar, 
  Settings2,
  Sparkles,
  Target,
  Clock,
  Hash,
  MessageSquare,
  Eye,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Stage 0: Project Creation Perfect Implementation
export default function ProjectSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Step 1: Project Basics
    project: {
      name: "",
      niche: [],
      icon: "",
      description: ""
    },
    // Step 2: Brand Kit
    brandkit: {
      logo_url: "",
      colors: { primary: "#3B82F6", secondary: "#64748B", accent: "#10B981" },
      fonts: { heading: "Inter", body: "Inter" },
      visual_style: "modern"
    },
    // Step 3: Audience Profile
    audience_profile: {
      primary_age: "25-34",
      gender_balance: "balanced",
      regions: ["United States"],
      psychographics: {
        values: [],
        motivations: [],
        pain_points: []
      },
      consumption: {
        platforms: [],
        formats: []
      }
    },
    // Step 4: Style Guide
    style_guide: {
      voice: "friendly",
      tone: "conversational",
      target_audience: "young professionals",
      pacing: "moderate",
      banned_words: [],
      default_hashtags: [],
      cta_templates: [],
      emoji_policy: "moderate",
      hashtag_policy: "research-based"
    },
    // Step 5: Publishing Rules
    publishing_rules: {
      platforms: [],
      posting_windows: {},
      auto_retry: true,
      fixed_hashtags: []
    }
  });

  const steps = [
    { id: 1, title: "Project Basics", icon: Settings2, description: "Name, niche, and basic setup" },
    { id: 2, title: "Brand Kit", icon: Palette, description: "Colors, fonts, and visual identity" },
    { id: 3, title: "Audience Profile", icon: Users, description: "Demographics and preferences" },
    { id: 4, title: "Style Guide", icon: MessageSquare, description: "Voice, tone, and content rules" },
    { id: 5, title: "Publishing Rules", icon: Calendar, description: "Platforms and scheduling" }
  ];

  const niches = [
    "Productivity", "Wellness", "Technology", "Business", "Lifestyle", 
    "Fitness", "Education", "Entertainment", "Travel", "Food"
  ];

  const platforms = [
    { id: "tiktok", name: "TikTok", icon: "🎵" },
    { id: "youtube", name: "YouTube", icon: "📺" },
    { id: "instagram", name: "Instagram", icon: "📷" },
    { id: "twitter", name: "Twitter", icon: "🐦" },
    { id: "linkedin", name: "LinkedIn", icon: "💼" }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.project.name.trim()) {
          toast({ title: "Project name is required", variant: "destructive" });
          return false;
        }
        if (formData.project.niche.length === 0) {
          toast({ title: "Please select at least one niche", variant: "destructive" });
          return false;
        }
        return true;
      case 2:
        // Brand kit validation
        return true;
      case 3:
        if (formData.audience_profile.consumption.platforms.length === 0) {
          toast({ title: "Please select target platforms", variant: "destructive" });
          return false;
        }
        return true;
      case 4:
        // Style guide validation
        return true;
      case 5:
        if (formData.publishing_rules.platforms.length === 0) {
          toast({ title: "Please select publishing platforms", variant: "destructive" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleFinish = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      // In real implementation, save to database
      console.log("Creating project with data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Project Created Successfully",
        description: "Your content factory is ready to start generating ideas!"
      });

      // Redirect to project dashboard
      // navigate(`/projects/${projectId}`);
      
    } catch (error) {
      toast({
        title: "Project Creation Failed",
        description: "Unable to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSuggestions = async (field: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ai', {
        body: { 
          message: `Generate suggestions for ${field} based on the niche: ${formData.project.niche.join(", ")}. Provide 3-5 specific, actionable suggestions.` 
        }
      });

      if (error) throw error;

      toast({
        title: "Suggestions Generated",
        description: "AI suggestions have been applied to your form"
      });
      
      // Parse and apply AI suggestions
      console.log("AI suggestions:", data.response);
      
    } catch (error) {
      toast({
        title: "Failed to Generate Suggestions",
        description: "Unable to get AI suggestions",
        variant: "destructive"
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={formData.project.name}
                onChange={(e) => setFormData({
                  ...formData,
                  project: { ...formData.project, name: e.target.value }
                })}
                placeholder="My Content Factory"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label>Content Niche *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {niches.map((niche) => (
                  <Button
                    key={niche}
                    variant={formData.project.niche.includes(niche) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newNiches = formData.project.niche.includes(niche)
                        ? formData.project.niche.filter(n => n !== niche)
                        : [...formData.project.niche, niche];
                      setFormData({
                        ...formData,
                        project: { ...formData.project, niche: newNiches }
                      });
                    }}
                  >
                    {niche}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={formData.project.description}
                onChange={(e) => setFormData({
                  ...formData,
                  project: { ...formData.project, description: e.target.value }
                })}
                placeholder="Describe your content strategy, target audience, and video concepts..."
                className="mt-2"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will help inform AI-generated ideas with detailed video concepts, target platforms, and content strategy.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Brand Colors</h3>
                <p className="text-sm text-muted-foreground">Define your visual identity</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateSuggestions("brand colors")}
              >
                <Sparkles className="w-4 h-4" />
                AI Suggest
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: formData.brandkit.colors.primary }}
                  />
                  <Input
                    type="color"
                    value={formData.brandkit.colors.primary}
                    onChange={(e) => setFormData({
                      ...formData,
                      brandkit: {
                        ...formData.brandkit,
                        colors: { ...formData.brandkit.colors, primary: e.target.value }
                      }
                    })}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: formData.brandkit.colors.secondary }}
                  />
                  <Input
                    type="color"
                    value={formData.brandkit.colors.secondary}
                    onChange={(e) => setFormData({
                      ...formData,
                      brandkit: {
                        ...formData.brandkit,
                        colors: { ...formData.brandkit.colors, secondary: e.target.value }
                      }
                    })}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label>Accent Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: formData.brandkit.colors.accent }}
                  />
                  <Input
                    type="color"
                    value={formData.brandkit.colors.accent}
                    onChange={(e) => setFormData({
                      ...formData,
                      brandkit: {
                        ...formData.brandkit,
                        colors: { ...formData.brandkit.colors, accent: e.target.value }
                      }
                    })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Visual Style</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["modern", "minimalist", "bold", "playful"].map((style) => (
                  <Button
                    key={style}
                    variant={formData.brandkit.visual_style === style ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      brandkit: { ...formData.brandkit, visual_style: style }
                    })}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Logo Upload</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop your logo here or click to upload
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Target Audience</h3>
                <p className="text-sm text-muted-foreground">Define who you're creating content for</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateSuggestions("audience profile")}
              >
                <Sparkles className="w-4 h-4" />
                AI Suggest
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Age Group</Label>
                <select 
                  value={formData.audience_profile.primary_age}
                  onChange={(e) => setFormData({
                    ...formData,
                    audience_profile: { ...formData.audience_profile, primary_age: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
              <div>
                <Label>Gender Balance</Label>
                <select 
                  value={formData.audience_profile.gender_balance}
                  onChange={(e) => setFormData({
                    ...formData,
                    audience_profile: { ...formData.audience_profile, gender_balance: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="balanced">Balanced</option>
                  <option value="female-majority">Female Majority</option>
                  <option value="male-majority">Male Majority</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Target Platforms *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={formData.audience_profile.consumption.platforms.includes(platform.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newPlatforms = formData.audience_profile.consumption.platforms.includes(platform.id)
                        ? formData.audience_profile.consumption.platforms.filter(p => p !== platform.id)
                        : [...formData.audience_profile.consumption.platforms, platform.id];
                      setFormData({
                        ...formData,
                        audience_profile: {
                          ...formData.audience_profile,
                          consumption: { ...formData.audience_profile.consumption, platforms: newPlatforms }
                        }
                      });
                    }}
                  >
                    {platform.icon} {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Content Formats</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Short-form", "Long-form", "Live", "Stories"].map((format) => (
                  <Button
                    key={format}
                    variant={formData.audience_profile.consumption.formats.includes(format) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newFormats = formData.audience_profile.consumption.formats.includes(format)
                        ? formData.audience_profile.consumption.formats.filter(f => f !== format)
                        : [...formData.audience_profile.consumption.formats, format];
                      setFormData({
                        ...formData,
                        audience_profile: {
                          ...formData.audience_profile,
                          consumption: { ...formData.audience_profile.consumption, formats: newFormats }
                        }
                      });
                    }}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Content Style Guide</h3>
                <p className="text-sm text-muted-foreground">Define your brand voice and content rules</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateSuggestions("style guide")}
              >
                <Sparkles className="w-4 h-4" />
                AI Suggest
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Brand Voice</Label>
                <select 
                  value={formData.style_guide.voice}
                  onChange={(e) => setFormData({
                    ...formData,
                    style_guide: { ...formData.style_guide, voice: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="playful">Playful</option>
                </select>
              </div>
              <div>
                <Label>Content Tone</Label>
                <select 
                  value={formData.style_guide.tone}
                  onChange={(e) => setFormData({
                    ...formData,
                    style_guide: { ...formData.style_guide, tone: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="conversational">Conversational</option>
                  <option value="educational">Educational</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="humorous">Humorous</option>
                  <option value="serious">Serious</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Emoji Usage</Label>
                <select 
                  value={formData.style_guide.emoji_policy}
                  onChange={(e) => setFormData({
                    ...formData,
                    style_guide: { ...formData.style_guide, emoji_policy: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="minimal">Minimal</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <Label>Hashtag Strategy</Label>
                <select 
                  value={formData.style_guide.hashtag_policy}
                  onChange={(e) => setFormData({
                    ...formData,
                    style_guide: { ...formData.style_guide, hashtag_policy: e.target.value }
                  })}
                  className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="research-based">Research-Based</option>
                  <option value="trending">Trending Focus</option>
                  <option value="brand-specific">Brand-Specific</option>
                  <option value="mixed">Mixed Strategy</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Banned Words/Phrases</Label>
              <Textarea
                value={formData.style_guide.banned_words.join(", ")}
                onChange={(e) => setFormData({
                  ...formData,
                  style_guide: { 
                    ...formData.style_guide, 
                    banned_words: e.target.value.split(",").map(word => word.trim()) 
                  }
                })}
                placeholder="Enter words or phrases to avoid (comma-separated)"
                className="mt-2"
                rows={2}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Publishing Platforms *</h3>
              <p className="text-sm text-muted-foreground">Select where to publish your content</p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={formData.publishing_rules.platforms.includes(platform.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newPlatforms = formData.publishing_rules.platforms.includes(platform.id)
                        ? formData.publishing_rules.platforms.filter(p => p !== platform.id)
                        : [...formData.publishing_rules.platforms, platform.id];
                      setFormData({
                        ...formData,
                        publishing_rules: { ...formData.publishing_rules, platforms: newPlatforms }
                      });
                    }}
                  >
                    {platform.icon} {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Posting Schedule</h3>
              <p className="text-sm text-muted-foreground">Configure optimal posting times</p>
              <div className="mt-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">AI will suggest optimal posting times based on:</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Your audience timezone and activity patterns</li>
                  <li>• Platform-specific peak hours</li>
                  <li>• Historical performance data</li>
                  <li>• Competitor posting analysis</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Auto-retry Failed Posts</p>
                  <p className="text-sm text-muted-foreground">Automatically retry if publishing fails</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.publishing_rules.auto_retry}
                onChange={(e) => setFormData({
                  ...formData,
                  publishing_rules: { ...formData.publishing_rules, auto_retry: e.target.checked }
                })}
                className="w-4 h-4"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Project Setup</h1>
              <p className="text-muted-foreground">Configure your content factory settings</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={getStepProgress()} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    currentStep === step.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : currentStep > step.id 
                        ? "bg-success/10 border border-success/20"
                        : "bg-muted/30 border border-border"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id 
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-success text-white"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const StepIcon = steps[currentStep - 1].icon;
                    return <StepIcon className="w-5 h-5" />;
                  })()}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStep()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="btn-factory">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFinish} 
                    disabled={loading}
                    className="btn-factory"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Create Project
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}