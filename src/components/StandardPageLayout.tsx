import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UnifiedPipelineNav } from "./UnifiedPipelineNav";
import { PrimaryActionButton } from "./PrimaryActionButton";
import { StageProgressTracker } from "./StageProgressTracker";
import type { StageTask } from "./StageProgressTracker";

interface StandardPageLayoutProps {
  // Page identification
  projectName: string;
  projectEmoji?: string;
  ideaTitle: string;
  
  // Stage information
  currentStage: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  };
  
  // Navigation
  projectId: string;
  ideaId: string;
  stageNumber: number;
  totalStages: number;
  
  // Progress tracking
  overallProgress: number;
  stageProgress: number;
  tasks: StageTask[];
  qualityScore?: number;
  
  // Next stage configuration
  nextStage?: {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
  };
  nextStageDisabled?: boolean;
  nextStageDisabledReason?: string;
  
  // Content
  children: ReactNode;
  
  // Additional actions in header
  headerActions?: ReactNode;
  
  // Layout configuration
  sidebarContent?: ReactNode;
  useStandardSidebar?: boolean;
  
  className?: string;
}

export const StandardPageLayout = ({
  projectName,
  projectEmoji = "🎯",
  ideaTitle,
  currentStage,
  projectId,
  ideaId,
  stageNumber,
  totalStages,
  overallProgress,
  stageProgress,
  tasks,
  qualityScore,
  nextStage,
  nextStageDisabled = false,
  nextStageDisabledReason,
  children,
  headerActions,
  sidebarContent,
  useStandardSidebar = true,
  className = ""
}: StandardPageLayoutProps) => {
  const navigate = useNavigate();
  const StageIcon = currentStage.icon;

  const completionData = {
    [currentStage.id]: {
      percentage: stageProgress,
      blockers: nextStageDisabledReason ? [nextStageDisabledReason] : []
    }
  };

  return (
    <div className={`min-h-screen bg-background p-6 space-y-6 ${className}`}>
      {/* Unified Header */}
      <div className="space-y-6">
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
                <span className="flex items-center gap-1">
                  {projectEmoji} <span>{projectName}</span>
                </span>
                <span>›</span>
                <span className="text-primary font-medium">{ideaTitle}</span>
              </div>
              
              <h1 className="text-xl font-bold text-factory-gradient flex items-center gap-3 my-4">
                <StageIcon className="h-6 w-6" />
                {currentStage.title}
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage {stageNumber}/{totalStages}
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">{currentStage.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {headerActions}
            {nextStage && (
              <PrimaryActionButton
                nextStage={nextStage}
                isDisabled={nextStageDisabled}
                disabledReason={nextStageDisabledReason}
                completionPercentage={stageProgress}
              />
            )}
          </div>
        </div>

        {/* Unified Pipeline Navigation */}
        <UnifiedPipelineNav
          projectId={projectId}
          ideaId={ideaId}
          currentStage={currentStage.id}
          overallProgress={overallProgress}
          completionData={completionData}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6 min-w-0">
          {children}
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            {useStandardSidebar && (
              <StageProgressTracker
                stageTitle={currentStage.title}
                overallProgress={stageProgress}
                tasks={tasks}
                qualityScore={qualityScore}
              />
            )}
            {sidebarContent}
          </div>
        </div>
      </div>
    </div>
  );
};