import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface NextButtonProps {
  nextStage: string;
  nextLabel: string;
  icon: React.ComponentType<any>;
  disabled?: boolean;
}

export const NextButton = ({ nextStage, nextLabel, icon: Icon, disabled = false }: NextButtonProps) => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();

  const handleNext = () => {
    if (!disabled && projectId && ideaId) {
      navigate(`/projects/${projectId}/ideas/${ideaId}/${nextStage}`);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleNext}
        disabled={disabled}
        size="lg"
        className="bg-gradient-factory text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full"
      >
        <Icon className="h-5 w-5 mr-2" />
        {nextLabel}
        <ChevronRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
};