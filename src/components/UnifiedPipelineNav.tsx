import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { 
  Target, 
  FileText, 
  Package, 
  Clapperboard, 
  Upload, 
  BarChart3,
  Check,
  Lock,
  AlertCircle,
  RefreshCw
} from "lucide-react";

interface PipelineStage {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  status: 'completed' | 'current' | 'pending' | 'locked' | 'failed';
  completionPercentage?: number;
}

interface UnifiedPipelineNavProps {
  projectId: string;
  ideaId: string;
  currentStage: string;
  overallProgress: number;
  completionData?: {
    [stageId: string]: {
      percentage: number;
      blockers?: string[];
    };
  };
}

export const UnifiedPipelineNav = ({ 
  projectId, 
  ideaId, 
  currentStage, 
  overallProgress,
  completionData = {}
}: UnifiedPipelineNavProps) => {
  const stages: PipelineStage[] = [
    { 
      id: 'idea', 
      label: 'Idea', 
      icon: Target, 
      path: `/projects/${projectId}/ideas/${ideaId}`, 
      status: getStageStatus('idea'),
      completionPercentage: completionData.idea?.percentage || 0
    },
    { 
      id: 'script', 
      label: 'Script', 
      icon: FileText, 
      path: `/projects/${projectId}/ideas/${ideaId}/script`, 
      status: getStageStatus('script'),
      completionPercentage: completionData.script?.percentage || 0
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Package, 
      path: `/projects/${projectId}/ideas/${ideaId}/assets`, 
      status: getStageStatus('assets'),
      completionPercentage: completionData.assets?.percentage || 0
    },
    { 
      id: 'production', 
      label: 'Production', 
      icon: Clapperboard, 
      path: `/projects/${projectId}/ideas/${ideaId}/production`, 
      status: getStageStatus('production'),
      completionPercentage: completionData.production?.percentage || 0
    },
    { 
      id: 'publishing', 
      label: 'Publishing', 
      icon: Upload, 
      path: `/projects/${projectId}/ideas/${ideaId}/publishing`, 
      status: getStageStatus('publishing'),
      completionPercentage: completionData.publishing?.percentage || 0
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      path: `/projects/${projectId}/ideas/${ideaId}/analytics`, 
      status: getStageStatus('analytics'),
      completionPercentage: completionData.analytics?.percentage || 0
    }
  ];

  function getStageStatus(stageId: string): PipelineStage['status'] {
    const stageOrder = ['idea', 'script', 'assets', 'production', 'publishing', 'analytics'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    if (stageId === 'analytics' && currentIndex < 4) return 'locked';
    if (completionData[stageId]?.blockers?.length) return 'failed';
    return 'pending';
  }

  function getStageIcon(stage: PipelineStage) {
    const Icon = stage.icon;
    
    switch (stage.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-white" />;
      case 'current':
        return <Icon className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-white" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Icon className="h-4 w-4" />;
    }
  }

  function getStageVariant(stage: PipelineStage) {
    switch (stage.status) {
      case 'completed':
        return 'secondary';
      case 'current':
        return 'default';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  const currentStageIndex = stages.findIndex(s => s.status === 'current');

  return (
    <Card className="card-factory-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-factory-gradient">Production Pipeline</h3>
        <div className="flex items-center gap-2">
          <Progress value={overallProgress} className="w-32" />
          <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isDisabled = stage.status === 'locked';
          const hasBlockers = completionData[stage.id]?.blockers?.length > 0;
          
          return (
            <div key={stage.id} className="flex items-center gap-2 min-w-0">
              {isDisabled ? (
                <Button
                  variant={getStageVariant(stage)}
                  size="sm"
                  className={`min-w-[100px] justify-start opacity-50 cursor-not-allowed ${
                    stage.status === 'completed' ? 'bg-success text-white' :
                    stage.status === 'current' ? 'bg-primary text-primary-foreground shadow-lg' :
                    stage.status === 'failed' ? 'bg-destructive text-destructive-foreground' :
                    ''
                  }`}
                  disabled
                >
                  {getStageIcon(stage)}
                  <span className="ml-2">{stage.label}</span>
                  {stage.status === 'locked' && <Lock className="h-3 w-3 ml-auto" />}
                </Button>
              ) : (
                <Button
                  asChild
                  variant={getStageVariant(stage)}
                  size="sm"
                  className={`min-w-[100px] justify-start relative group ${
                    stage.status === 'completed' ? 'bg-success text-white hover:bg-success/90' :
                    stage.status === 'current' ? 'bg-primary text-primary-foreground shadow-lg' :
                    stage.status === 'failed' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' :
                    'hover:bg-muted'
                  }`}
                >
                  <NavLink to={stage.path} className="flex items-center w-full">
                    {getStageIcon(stage)}
                    <span className="ml-2">{stage.label}</span>
                    {hasBlockers && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-pulse" />
                    )}
                  </NavLink>
                </Button>
              )}
              
              {index < stages.length - 1 && (
                <div 
                  className={`h-px w-8 transition-colors ${
                    stage.status === 'completed' ? 'bg-success' : 'bg-muted'
                  }`} 
                  style={{ pointerEvents: 'none' }} 
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Stage-specific progress indicators */}
      {currentStageIndex >= 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Stage Progress</span>
            <span className="font-medium">
              {Math.round(stages[currentStageIndex]?.completionPercentage || 0)}%
            </span>
          </div>
          <Progress 
            value={stages[currentStageIndex]?.completionPercentage || 0} 
            className="mt-2 h-2" 
          />
          
          {/* Show blockers if any */}
          {completionData[currentStage]?.blockers?.length > 0 && (
            <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-warning mb-2">
                <AlertCircle className="h-4 w-4" />
                Completion Blockers
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {completionData[currentStage].blockers.map((blocker, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-warning rounded-full" />
                    {blocker}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};