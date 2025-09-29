import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Palette, Mic, Music, Video, MessageSquare } from 'lucide-react';
import type { IdeaSetup, CreativeDNA } from '@/types/idea-dna';

interface CreativeDNAStageProps {
  ideaData: IdeaSetup;
  onUpdate: (updates: Partial<IdeaSetup>) => void;
}

const VOICE_TONES = [
  'Casual & Friendly',
  'Professional & Authoritative', 
  'Energetic & Enthusiastic',
  'Calm & Soothing',
  'Witty & Humorous',
  'Inspirational & Motivational',
  'Educational & Informative',
  'Conversational & Relatable'
];

const MUSIC_MOODS = [
  'Upbeat & Energetic',
  'Calm & Peaceful',
  'Dramatic & Intense',
  'Playful & Fun',
  'Inspiring & Uplifting',
  'Mysterious & Suspenseful',
  'Romantic & Emotional',
  'Corporate & Clean'
];

const CONTENT_STYLES = [
  'Educational Tutorial',
  'Storytelling Narrative',
  'Quick Tips & Hacks',
  'Behind-the-Scenes',
  'Problem & Solution',
  'Before & After',
  'List/Countdown Format',
  'Interview/Q&A',
  'Reaction/Commentary',
  'Trending/Viral Format'
];

const VISUAL_STYLES = [
  'Clean & Minimal',
  'Colorful & Vibrant',
  'Dark & Moody',
  'Bright & Airy',
  'Professional & Corporate',
  'Playful & Fun',
  'Cinematic & Dramatic',
  'Documentary Style'
];

const CAPTION_STYLES = [
  'Dynamic Text Highlights',
  'Minimal Subtitles',
  'Bold Typography',
  'Animated Text Effects',
  'Color-Coded Keywords',
  'Simple White Text',
  'No Text Overlay'
];

const NARRATOR_TYPES = [
  'Human Voice (Self)',
  'AI Generated Voice',
  'Text-to-Speech',
  'Voiceover Artist',
  'No Narration (Text Only)',
  'Background Music Only'
];

const TRENDING_HASHTAGS = [
  'viral', 'trending', 'fyp', 'foryou', 'tips', 'hacks', 'tutorial',
  'motivation', 'lifestyle', 'productivity', 'mindset', 'success',
  'learn', 'growth', 'inspiration', 'facts', 'storytime', 'relatable'
];

export const CreativeDNAStage: React.FC<CreativeDNAStageProps> = ({ ideaData, onUpdate }) => {
  const [newHashtag, setNewHashtag] = useState('');
  
  const dnaData = ideaData.creative_dna || {
    voice_tone: '',
    music_mood: '',
    content_style: '',
    narrative_pov: 'second' as const,
    visual_style: '',
    caption_style: '',
    narrator_type: '',
    length: 'medium' as const,
    hashtags: []
  };

  const updateDNA = (updates: Partial<CreativeDNA>) => {
    const updatedDNA = { ...dnaData, ...updates };
    onUpdate({ creative_dna: updatedDNA });
  };

  const addHashtag = (hashtag: string) => {
    const cleanTag = hashtag.replace('#', '').toLowerCase();
    if (cleanTag && !dnaData.hashtags.includes(cleanTag)) {
      updateDNA({ hashtags: [...dnaData.hashtags, cleanTag] });
      setNewHashtag('');
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    updateDNA({ hashtags: dnaData.hashtags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      {/* Voice & Tone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <Label className="text-sm font-medium">
              Voice Tone <span className="text-red-500">*</span>
            </Label>
          </div>
          <Select value={dnaData.voice_tone} onValueChange={(value) => updateDNA({ voice_tone: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select voice tone..." />
            </SelectTrigger>
            <SelectContent>
              {VOICE_TONES.map((tone) => (
                <SelectItem key={tone} value={tone}>
                  {tone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <Label className="text-sm font-medium">Music Mood</Label>
          </div>
          <Select value={dnaData.music_mood} onValueChange={(value) => updateDNA({ music_mood: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select music mood..." />
            </SelectTrigger>
            <SelectContent>
              {MUSIC_MOODS.map((mood) => (
                <SelectItem key={mood} value={mood}>
                  {mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Style & POV */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <Label className="text-sm font-medium">
              Content Style <span className="text-red-500">*</span>
            </Label>
          </div>
          <Select value={dnaData.content_style} onValueChange={(value) => updateDNA({ content_style: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select content style..." />
            </SelectTrigger>
            <SelectContent>
              {CONTENT_STYLES.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Narrative POV</Label>
          <Select value={dnaData.narrative_pov} onValueChange={(value: 'first' | 'second' | 'third') => updateDNA({ narrative_pov: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">First Person (I/Me)</SelectItem>
              <SelectItem value="second">Second Person (You/Your)</SelectItem>
              <SelectItem value="third">Third Person (They/Them)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Visual & Caption Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <Label className="text-sm font-medium">Visual Style</Label>
          </div>
          <Select value={dnaData.visual_style} onValueChange={(value) => updateDNA({ visual_style: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select visual style..." />
            </SelectTrigger>
            <SelectContent>
              {VISUAL_STYLES.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <Label className="text-sm font-medium">Caption Style</Label>
          </div>
          <Select value={dnaData.caption_style} onValueChange={(value) => updateDNA({ caption_style: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select caption style..." />
            </SelectTrigger>
            <SelectContent>
              {CAPTION_STYLES.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Narrator & Length */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Narrator Type</Label>
          <Select value={dnaData.narrator_type} onValueChange={(value) => updateDNA({ narrator_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select narrator type..." />
            </SelectTrigger>
            <SelectContent>
              {NARRATOR_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Video Length <span className="text-red-500">*</span>
          </Label>
          <Select value={dnaData.length} onValueChange={(value: 'short' | 'medium' | 'long') => updateDNA({ length: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (15-30s)</SelectItem>
              <SelectItem value="medium">Medium (30-60s)</SelectItem>
              <SelectItem value="long">Long (60-90s)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Hashtags */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Content Hashtags</Label>
        
        {/* Current Hashtags */}
        {dnaData.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dnaData.hashtags.map((hashtag) => (
              <Badge key={hashtag} variant="secondary" className="flex items-center gap-1">
                #{hashtag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => removeHashtag(hashtag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Add New Hashtag */}
        <div className="flex gap-2">
          <Input
            value={newHashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
            placeholder="Add hashtag..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addHashtag(newHashtag);
              }
            }}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => addHashtag(newHashtag)}
            disabled={!newHashtag}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Trending Hashtags */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Trending hashtags:</p>
          <div className="flex flex-wrap gap-2">
            {TRENDING_HASHTAGS
              .filter(tag => !dnaData.hashtags.includes(tag))
              .slice(0, 8)
              .map((hashtag) => (
                <Button
                  key={hashtag}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => addHashtag(hashtag)}
                >
                  #{hashtag}
                </Button>
              ))}
          </div>
        </div>
      </div>

      {/* DNA Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="h-4 w-4 text-purple-600" />
            Creative DNA Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Voice:</strong> {dnaData.voice_tone || 'Not set'}</p>
          <p><strong>Style:</strong> {dnaData.content_style || 'Not set'}</p>
          <p><strong>Length:</strong> {dnaData.length ? `${dnaData.length} (${dnaData.length === 'short' ? '15-30s' : dnaData.length === 'medium' ? '30-60s' : '60-90s'})` : 'Not set'}</p>
          <p><strong>POV:</strong> {dnaData.narrative_pov === 'first' ? 'First Person' : dnaData.narrative_pov === 'second' ? 'Second Person' : 'Third Person'}</p>
          {dnaData.hashtags.length > 0 && (
            <p><strong>Tags:</strong> #{dnaData.hashtags.join(', #')}</p>
          )}
        </CardContent>
      </Card>

      {/* Validation Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Stage Requirements</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {dnaData.voice_tone ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Voice tone selected</span>
          </div>
          <div className="flex items-center gap-2">
            {dnaData.content_style ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Content style selected</span>
          </div>
          <div className="flex items-center gap-2">
            {dnaData.length ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Video length specified</span>
          </div>
          <div className="flex items-center gap-2">
            {dnaData.hashtags.length >= 3 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            )}
            <span>At least 3 hashtags (recommended)</span>
          </div>
        </div>
      </div>
    </div>
  );
};