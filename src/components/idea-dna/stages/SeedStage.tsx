import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import type { IdeaSetup, IdeaSeed } from '@/types/idea-dna';

interface SeedStageProps {
  ideaData: IdeaSetup;
  onUpdate: (updates: Partial<IdeaSetup>) => void;
}

const SUGGESTED_TAGS = [
  'viral', 'trending', 'educational', 'entertaining', 'motivational',
  'lifestyle', 'technology', 'business', 'health', 'fitness',
  'productivity', 'mindset', 'relationships', 'finance', 'travel'
];

export const SeedStage: React.FC<SeedStageProps> = ({ ideaData, onUpdate }) => {
  const [newTag, setNewTag] = useState('');
  
  const seedData = ideaData.seed || {
    title: '',
    description: '',
    source: 'manual' as const,
    tags: []
  };

  const updateSeed = (updates: Partial<IdeaSeed>) => {
    const updatedSeed = { ...seedData, ...updates };
    onUpdate({ seed: updatedSeed });
  };

  const addTag = (tag: string) => {
    if (tag && !seedData.tags.includes(tag)) {
      updateSeed({ tags: [...seedData.tags, tag] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateSeed({ tags: seedData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Idea Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={seedData.title}
          onChange={(e) => updateSeed({ title: e.target.value })}
          placeholder="Enter your video idea title..."
          className="text-lg"
        />
        <p className="text-xs text-muted-foreground">
          A clear, engaging title that captures the essence of your video idea
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Short Description
        </Label>
        <Textarea
          id="description"
          value={seedData.description || ''}
          onChange={(e) => updateSeed({ description: e.target.value })}
          placeholder="Brief description of your video idea..."
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Optional: Add a brief description to provide more context
        </p>
      </div>

      {/* Source */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Idea Source</Label>
        <Select 
          value={seedData.source} 
          onValueChange={(value: 'manual' | 'research_agent' | 'competitor' | 'import') => 
            updateSeed({ source: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual Entry</SelectItem>
            <SelectItem value="research_agent">AI Research Agent</SelectItem>
            <SelectItem value="competitor">Competitor Analysis</SelectItem>
            <SelectItem value="import">Import from External</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          How was this idea discovered or generated?
        </p>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Content Tags</Label>
        
        {/* Current Tags */}
        {seedData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {seedData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                #{tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Add New Tag */}
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(newTag);
              }
            }}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => addTag(newTag)}
            disabled={!newTag || seedData.tags.includes(newTag)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Suggested Tags */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS
              .filter(tag => !seedData.tags.includes(tag))
              .slice(0, 8)
              .map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => addTag(tag)}
                >
                  #{tag}
                </Button>
              ))}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Tags help categorize and organize your content ideas
        </p>
      </div>

      {/* Validation Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Stage Requirements</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {seedData.title ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Title is required</span>
          </div>
          <div className="flex items-center gap-2">
            {seedData.description ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
            <span>Description (optional but recommended)</span>
          </div>
          <div className="flex items-center gap-2">
            {seedData.tags.length > 0 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
            <span>At least one tag (optional but recommended)</span>
          </div>
        </div>
      </div>
    </div>
  );
};