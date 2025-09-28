import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PrimaryActionButtonProps {
  nextStage: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
  };
  isDisabled: boolean;
  disabledReason?: string;
  completionPercentage?: number;
  className?: string;
}

export const PrimaryActionButton = ({ 
  nextStage, 
  isDisabled, 
  disabledReason,
  completionPercentage = 0,
  className = ""
}: PrimaryActionButtonProps) => {
  const navigate = useNavigate();
  const Icon = nextStage.icon;

  const handleClick = () => {
    if (!isDisabled) {
      navigate(nextStage.path);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Completion indicator for current stage */}
      {completionPercentage > 0 && completionPercentage < 100 && (
        <Badge variant="outline" className="text-xs">
          {Math.round(completionPercentage)}% Complete
        </Badge>
      )}
      
      {/* Disabled reason badge */}
      {isDisabled && disabledReason && (
        <Badge variant="outline" className="text-xs border-warning/30 text-warning">
          <Lock className="h-3 w-3 mr-1" />
          {disabledReason}
        </Badge>
      )}
      
      {/* Primary action button */}
      <Button
        onClick={handleClick}
        disabled={isDisabled}
        size="lg"
        className={`bg-gradient-factory text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
          !isDisabled ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
        } px-6 py-3`}
      >
        <Icon className="h-5 w-5 mr-2" />
        {isDisabled ? `${nextStage.label} Locked` : `Next: ${nextStage.label}`}
        {!isDisabled && <ChevronRight className="h-5 w-5 ml-2" />}
      </Button>
    </div>
  );
};