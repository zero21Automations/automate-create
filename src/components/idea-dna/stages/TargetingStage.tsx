import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Target, Users, Shield } from 'lucide-react';
import type { IdeaSetup, IdeaTargeting } from '@/types/idea-dna';

interface TargetingStageProps {
  ideaData: IdeaSetup;
  onUpdate: (updates: Partial<IdeaSetup>) => void;
}

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', maxDuration: 60, emoji: '🎵' },
  { id: 'youtube-shorts', name: 'YouTube Shorts', maxDuration: 60, emoji: '📺' },
  { id: 'instagram-reels', name: 'Instagram Reels', maxDuration: 90, emoji: '📷' },
  { id: 'instagram-stories', name: 'Instagram Stories', maxDuration: 15, emoji: '📖' },
  { id: 'twitter', name: 'Twitter/X', maxDuration: 140, emoji: '🐦' },
  { id: 'linkedin', name: 'LinkedIn', maxDuration: 600, emoji: '💼' },
  { id: 'facebook-reels', name: 'Facebook Reels', maxDuration: 60, emoji: '👥' }
];

const AUDIENCE_SEGMENTS = [
  'Gen Z (18-24)',
  'Millennials (25-40)',
  'Gen X (41-56)', 
  'Entrepreneurs',
  'Students',
  'Working Professionals',
  'Parents',
  'Fitness Enthusiasts',
  'Tech Enthusiasts',
  'Creative Professionals',
  'Small Business Owners',
  'Content Creators'
];

const COMMON_BANNED_WORDS = [
  'buy now', 'urgent', 'limited time', 'act fast', 'don\'t miss out',
  'guaranteed', '100% free', 'make money fast', 'weight loss',
  'click here', 'subscribe now', 'follow me', 'link in bio'
];

export const TargetingStage: React.FC<TargetingStageProps> = ({ ideaData, onUpdate }) => {
  const [newBannedWord, setNewBannedWord] = useState('');
  
  const targetingData = ideaData.targeting || {
    platforms: [],
    audience: '',
    banned_words: []
  };

  const updateTargeting = (updates: Partial<IdeaTargeting>) => {
    const updatedTargeting = { ...targetingData, ...updates };
    onUpdate({ targeting: updatedTargeting });
  };

  const togglePlatform = (platformId: string) => {
    const currentPlatforms = targetingData.platforms || [];
    const updatedPlatforms = currentPlatforms.includes(platformId)
      ? currentPlatforms.filter(p => p !== platformId)
      : [...currentPlatforms, platformId];
    
    updateTargeting({ platforms: updatedPlatforms });
  };

  const addBannedWord = (word: string) => {
    if (word && !targetingData.banned_words.includes(word.toLowerCase())) {
      updateTargeting({ 
        banned_words: [...targetingData.banned_words, word.toLowerCase()]
      });
      setNewBannedWord('');
    }
  };

  const removeBannedWord = (wordToRemove: string) => {
    updateTargeting({
      banned_words: targetingData.banned_words.filter(word => word !== wordToRemove)
    });
  };

  const getSelectedPlatformsInfo = () => {
    const selected = PLATFORMS.filter(p => targetingData.platforms.includes(p.id));
    if (selected.length === 0) return null;
    
    const minDuration = Math.min(...selected.map(p => p.maxDuration));
    const maxDuration = Math.max(...selected.map(p => p.maxDuration));
    
    return {
      count: selected.length,
      durationRange: minDuration === maxDuration ? `${minDuration}s` : `${minDuration}-${maxDuration}s`,
      platforms: selected
    };
  };

  const platformsInfo = getSelectedPlatformsInfo();

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          <Label className="text-sm font-medium">
            Target Platforms <span className="text-red-500">*</span>
          </Label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLATFORMS.map((platform) => {
            const isSelected = targetingData.platforms.includes(platform.id);
            
            return (
              <Card 
                key={platform.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => togglePlatform(platform.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => togglePlatform(platform.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{platform.emoji}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Max: {platform.maxDuration}s
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {platformsInfo && (
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>{platformsInfo.count} platforms selected</strong> • 
              Optimal duration: {platformsInfo.durationRange}
            </p>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Select at least one platform where this content will be published
        </p>
      </div>

      {/* Audience Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <Label className="text-sm font-medium">
            Target Audience <span className="text-red-500">*</span>
          </Label>
        </div>
        
        <Select 
          value={targetingData.audience} 
          onValueChange={(value) => updateTargeting({ audience: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your target audience..." />
          </SelectTrigger>
          <SelectContent>
            {AUDIENCE_SEGMENTS.map((segment) => (
              <SelectItem key={segment} value={segment}>
                {segment}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <p className="text-xs text-muted-foreground">
          Choose the primary audience segment for this content
        </p>
      </div>

      {/* Banned Words */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <Label className="text-sm font-medium">Content Compliance</Label>
        </div>
        
        {/* Current Banned Words */}
        {targetingData.banned_words.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium">Banned Words/Phrases:</p>
            <div className="flex flex-wrap gap-2">
              {targetingData.banned_words.map((word) => (
                <Badge key={word} variant="outline" className="flex items-center gap-1">
                  {word}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent text-red-500"
                    onClick={() => removeBannedWord(word)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Add Banned Word */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newBannedWord}
              onChange={(e) => setNewBannedWord(e.target.value)}
              placeholder="Add banned word/phrase..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addBannedWord(newBannedWord);
                }
              }}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addBannedWord(newBannedWord)}
              disabled={!newBannedWord}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Suggested Banned Words */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Common spam triggers:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_BANNED_WORDS
                .filter(word => !targetingData.banned_words.includes(word))
                .slice(0, 6)
                .map((word) => (
                  <Button
                    key={word}
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => addBannedWord(word)}
                  >
                    {word}
                  </Button>
                ))}
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Add words or phrases to avoid in scripts and captions to maintain platform compliance
        </p>
      </div>

      {/* Platform Readiness Check */}
      {platformsInfo && (
        <Card className="bg-green-50/50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-800">Platform Readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-green-700">
            {platformsInfo.platforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>{platform.emoji}</span>
                  <span>{platform.name}</span>
                </span>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  ✓ Ready
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Validation Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Stage Requirements</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {targetingData.platforms.length > 0 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>At least one platform selected</span>
          </div>
          <div className="flex items-center gap-2">
            {targetingData.audience ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Target audience selected</span>
          </div>
          <div className="flex items-center gap-2">
            {targetingData.banned_words.length > 0 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
            <span>Compliance guidelines (optional but recommended)</span>
          </div>
        </div>
      </div>
    </div>
  );
};