import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Idea } from "@/hooks/useIdeas";

interface EnhancedIdeaFormProps {
  onSubmit: (ideaData: Partial<Idea>) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<Idea>;
}

export default function EnhancedIdeaForm({ onSubmit, onCancel, loading, initialData }: EnhancedIdeaFormProps) {
  const [formData, setFormData] = useState<Partial<Idea>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    video_concept: initialData?.video_concept || "",
    target_duration: initialData?.target_duration || 60,
    visual_style: initialData?.visual_style || "modern",
    target_platforms: initialData?.target_platforms || ["tiktok"],
    call_to_action: initialData?.call_to_action || "",
    content_pillars: initialData?.content_pillars || [],
    tone: initialData?.tone || "engaging",
    hook_type: initialData?.hook_type || "question",
    complexity_level: initialData?.complexity_level || "medium",
    hashtags: initialData?.hashtags || [],
    ...initialData
  });

  const [newHashtag, setNewHashtag] = useState("");
  const [newPillar, setNewPillar] = useState("");

  const platforms = [
    { id: "tiktok", name: "TikTok", emoji: "🎵" },
    { id: "youtube", name: "YouTube", emoji: "📺" },
    { id: "instagram", name: "Instagram", emoji: "📷" },
    { id: "twitter", name: "Twitter", emoji: "🐦" },
    { id: "linkedin", name: "LinkedIn", emoji: "💼" }
  ];

  const visualStyles = ["modern", "minimalist", "dynamic", "clean", "bold", "playful", "analytical"];
  const tones = ["engaging", "motivational", "educational", "controversial", "friendly", "professional", "humorous"];
  const hookTypes = ["question", "transformation", "contrarian", "revelation", "story", "statistic", "challenge"];
  const complexityLevels = ["easy", "medium", "advanced"];

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags?.includes(newHashtag.trim())) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...(prev.hashtags || []), newHashtag.trim()]
      }));
      setNewHashtag("");
    }
  };

  const handleRemoveHashtag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags?.filter((_, i) => i !== index)
    }));
  };

  const handleAddPillar = () => {
    if (newPillar.trim() && !formData.content_pillars?.includes(newPillar.trim())) {
      setFormData(prev => ({
        ...prev,
        content_pillars: [...(prev.content_pillars || []), newPillar.trim()]
      }));
      setNewPillar("");
    }
  };

  const handleRemovePillar = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content_pillars: prev.content_pillars?.filter((_, i) => i !== index)
    }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => {
      const currentPlatforms = prev.target_platforms || [];
      const isSelected = currentPlatforms.includes(platformId);
      
      return {
        ...prev,
        target_platforms: isSelected
          ? currentPlatforms.filter(p => p !== platformId)
          : [...currentPlatforms, platformId]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Basic Information</h3>
        
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter compelling video title..."
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of the content..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="video_concept">Video Concept</Label>
          <Textarea
            id="video_concept"
            value={formData.video_concept}
            onChange={(e) => setFormData(prev => ({ ...prev, video_concept: e.target.value }))}
            placeholder="Describe the visual concept, scenes, and execution style..."
            rows={3}
          />
        </div>
      </div>

      {/* Video Specifications */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Video Specifications</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="target_duration">Target Duration (seconds)</Label>
            <Input
              id="target_duration"
              type="number"
              value={formData.target_duration}
              onChange={(e) => setFormData(prev => ({ ...prev, target_duration: parseInt(e.target.value) || 60 }))}
              min="15"
              max="300"
            />
          </div>

          <div>
            <Label>Visual Style</Label>
            <Select 
              value={formData.visual_style} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, visual_style: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visualStyles.map(style => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tone</Label>
            <Select 
              value={formData.tone} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tones.map(tone => (
                  <SelectItem key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Hook Type</Label>
            <Select 
              value={formData.hook_type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, hook_type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hookTypes.map(hook => (
                  <SelectItem key={hook} value={hook}>
                    {hook.charAt(0).toUpperCase() + hook.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Complexity Level</Label>
          <Select 
            value={formData.complexity_level} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, complexity_level: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {complexityLevels.map(level => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Platform & Strategy */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Platform & Strategy</h3>
        
        <div>
          <Label>Target Platforms</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {platforms.map(platform => (
              <Button
                key={platform.id}
                type="button"
                variant={formData.target_platforms?.includes(platform.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handlePlatformToggle(platform.id)}
              >
                {platform.emoji} {platform.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="call_to_action">Call to Action</Label>
          <Input
            id="call_to_action"
            value={formData.call_to_action}
            onChange={(e) => setFormData(prev => ({ ...prev, call_to_action: e.target.value }))}
            placeholder="What should viewers do after watching?"
          />
        </div>

        <div>
          <Label>Content Pillars</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newPillar}
              onChange={(e) => setNewPillar(e.target.value)}
              placeholder="Add content pillar..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPillar())}
            />
            <Button type="button" onClick={handleAddPillar} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.content_pillars?.map((pillar, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {pillar}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemovePillar(index)} />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Hashtags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              placeholder="Add hashtag..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHashtag())}
            />
            <Button type="button" onClick={handleAddHashtag} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.hashtags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                #{tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveHashtag(index)} />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading || !formData.title?.trim()}>
          {loading ? "Creating..." : "Create Idea"}
        </Button>
      </div>
    </form>
  );
}