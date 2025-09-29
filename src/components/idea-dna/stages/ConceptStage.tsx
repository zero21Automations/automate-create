import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Link as LinkIcon, Upload, Lightbulb } from 'lucide-react';
import type { IdeaSetup, IdeaConcept } from '@/types/idea-dna';

interface ConceptStageProps {
  ideaData: IdeaSetup;
  onUpdate: (updates: Partial<IdeaSetup>) => void;
}

export const ConceptStage: React.FC<ConceptStageProps> = ({ ideaData, onUpdate }) => {
  const [newReferenceUrl, setNewReferenceUrl] = useState('');
  const [newReferenceTitle, setNewReferenceTitle] = useState('');
  
  const conceptData = ideaData.concept || {
    value_proposition: '',
    references: []
  };

  const updateConcept = (updates: Partial<IdeaConcept>) => {
    const updatedConcept = { ...conceptData, ...updates };
    onUpdate({ concept: updatedConcept });
  };

  const addReference = () => {
    if (newReferenceUrl) {
      const newRef = {
        type: 'link' as const,
        url: newReferenceUrl,
        title: newReferenceTitle || 'Reference Link'
      };
      
      updateConcept({
        references: [...(conceptData.references || []), newRef]
      });
      
      setNewReferenceUrl('');
      setNewReferenceTitle('');
    }
  };

  const removeReference = (index: number) => {
    const updatedReferences = conceptData.references?.filter((_, i) => i !== index) || [];
    updateConcept({ references: updatedReferences });
  };

  const generateSuggestions = () => {
    const title = ideaData.seed?.title || '';
    const suggestions = [
      `This video explains ${title.toLowerCase()} in a way that's never been done before`,
      `Viewers will learn the surprising truth about ${title.toLowerCase()}`,
      `This content solves a common problem that most people struggle with`,
      `The video provides actionable insights that viewers can implement immediately`
    ];
    
    // Randomly select a suggestion based on the title
    const suggestionIndex = title.length % suggestions.length;
    updateConcept({ value_proposition: suggestions[suggestionIndex] });
  };

  return (
    <div className="space-y-6">
      {/* Value Proposition */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="value-proposition" className="text-sm font-medium">
            Video Concept & Value Proposition <span className="text-red-500">*</span>
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateSuggestions}
            className="text-xs"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            AI Suggest
          </Button>
        </div>
        <Textarea
          id="value-proposition"
          value={conceptData.value_proposition}
          onChange={(e) => updateConcept({ value_proposition: e.target.value })}
          placeholder="Describe what this video will be about and why your audience will care..."
          rows={4}
          className="min-h-[100px]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Clear description of your video's purpose and audience value
          </span>
          <span>
            {conceptData.value_proposition.length}/500
          </span>
        </div>
      </div>

      {/* Content Guidelines */}
      <Card className="bg-blue-50/50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            Concept Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800">
          <p>• <strong>What:</strong> Clearly explain what the video covers</p>
          <p>• <strong>Why:</strong> State why viewers should care or watch</p>
          <p>• <strong>Value:</strong> What will viewers gain or learn?</p>
          <p>• <strong>Unique Angle:</strong> What makes this different or special?</p>
        </CardContent>
      </Card>

      {/* References */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Reference Materials</Label>
        
        {/* Existing References */}
        {conceptData.references && conceptData.references.length > 0 && (
          <div className="space-y-2">
            {conceptData.references.map((ref, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{ref.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{ref.url}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReference(index)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {/* Add New Reference */}
        <div className="space-y-3 p-4 border rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="ref-title" className="text-xs">Reference Title</Label>
            <Input
              id="ref-title"
              value={newReferenceTitle}
              onChange={(e) => setNewReferenceTitle(e.target.value)}
              placeholder="Optional: Description of this reference"
              className="h-8 text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-url" className="text-xs">Reference URL</Label>
            <div className="flex gap-2">
              <Input
                id="ref-url"
                value={newReferenceUrl}
                onChange={(e) => setNewReferenceUrl(e.target.value)}
                placeholder="https://example.com/reference-video"
                className="h-8 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReference}
                disabled={!newReferenceUrl}
                className="px-3 h-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Add links to competitor videos, research articles, or other inspiration sources
        </p>
      </div>

      {/* Validation Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Stage Requirements</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {conceptData.value_proposition && conceptData.value_proposition.length >= 20 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span>Value proposition (minimum 20 characters)</span>
          </div>
          <div className="flex items-center gap-2">
            {conceptData.references && conceptData.references.length > 0 ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
            <span>Reference materials (optional but recommended)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
