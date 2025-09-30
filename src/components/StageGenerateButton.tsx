import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StageGenerateButtonProps {
  stage: "dna" | "script" | "assets" | "production" | "publishing";
  hasExistingContent: boolean;
  onGenerate: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

export const StageGenerateButton = ({ 
  stage, 
  hasExistingContent, 
  onGenerate, 
  disabled = false,
  className = ""
}: StageGenerateButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (isGenerating || disabled) return;
    
    setIsGenerating(true);
    try {
      await onGenerate();
    } catch (error) {
      console.error(`Error generating ${stage}:`, error);
      toast({
        title: "Generation Failed",
        description: `Failed to generate ${stage} content. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getStageLabel = () => {
    switch (stage) {
      case "dna":
        return hasExistingContent ? "Regenerate DNA" : "Generate DNA";
      case "script":
        return hasExistingContent ? "Regenerate Script" : "Generate Script";
      case "assets":
        return hasExistingContent ? "Regenerate Assets" : "Generate Assets";
      case "production":
        return hasExistingContent ? "Regenerate Video" : "Generate Video";
      case "publishing":
        return hasExistingContent ? "Regenerate Content" : "Generate Content";
      default:
        return hasExistingContent ? "Regenerate" : "Generate";
    }
  };

  const getIcon = () => {
    if (isGenerating) {
      return <RefreshCw className="h-4 w-4 mr-2 animate-spin" />;
    }
    return hasExistingContent ? 
      <RefreshCw className="h-4 w-4 mr-2" /> : 
      <Sparkles className="h-4 w-4 mr-2" />;
  };

  return (
    <Button 
      onClick={handleGenerate}
      disabled={disabled || isGenerating}
      variant="factory"
      className={`w-full ${className}`}
    >
      {getIcon()}
      {isGenerating ? "Generating..." : getStageLabel()}
    </Button>
  );
};