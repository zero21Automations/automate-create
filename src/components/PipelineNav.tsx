import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Image, 
  Video, 
  Share2, 
  BarChart3, 
  ChevronRight,
  Check,
  Clock,
  AlertCircle
} from "lucide-react";

interface PipelineStage {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  status: 'completed' | 'current' | 'pending' | 'locked';
}

interface PipelineNavProps {
  ideaTitle?: string;
  currentStage: string;
}

export const PipelineNav = ({ ideaTitle = "Content Idea", currentStage }: PipelineNavProps) => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const location = useLocation();

  const stages: PipelineStage[] = [
    {
      id: 'script',
      label: 'Script',
      icon: FileText,
      path: `/projects/${projectId}/ideas/${ideaId}/script`,
      status: getStageStatus('script', currentStage)
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: Image,
      path: `/projects/${projectId}/ideas/${ideaId}/assets`,
      status: getStageStatus('assets', currentStage)
    },
    {
      id: 'assembly',
      label: 'Assembly',
      icon: Video,
      path: `/projects/${projectId}/ideas/${ideaId}/assembly`,
      status: getStageStatus('assembly', currentStage)
    },
    {
      id: 'publishing',
      label: 'Publishing',
      icon: Share2,
      path: `/projects/${projectId}/ideas/${ideaId}/publishing`,
      status: getStageStatus('publishing', currentStage)
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: `/projects/${projectId}/ideas/${ideaId}/analytics`,
      status: getStageStatus('analytics', currentStage)
    }
  ];

  function getStageStatus(stageId: string, current: string): 'completed' | 'current' | 'pending' | 'locked' {
    const stageOrder = ['script', 'assets', 'assembly', 'publishing', 'analytics'];
    const currentIndex = stageOrder.indexOf(current);
    const stageIndex = stageOrder.indexOf(stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    if (stageIndex === currentIndex + 1) return 'pending';
    return 'locked';
  }

  const getStageIcon = (stage: PipelineStage) => {
    switch (stage.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <stage.icon className="h-4 w-4 text-yellow-500" />;
      case 'locked':
        return <stage.icon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStageColor = (stage: PipelineStage) => {
    switch (stage.status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-blue-500 bg-blue-50 ring-2 ring-blue-200';
      case 'pending':
        return 'border-yellow-500 bg-yellow-50';
      case 'locked':
        return 'border-muted bg-muted/30';
    }
  };

  const canNavigateToStage = (stage: PipelineStage) => {
    return stage.status === 'completed' || stage.status === 'current' || stage.status === 'pending';
  };

  return (
    <Card className="card-factory-glow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-factory-gradient">Production Pipeline</h2>
          <p className="text-sm text-muted-foreground">{ideaTitle}</p>
        </div>
        <Badge variant="outline" className="badge-factory">
          Stage {stages.findIndex(s => s.status === 'current') + 1} of {stages.length}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => canNavigateToStage(stage) ? navigate(stage.path) : null}
              disabled={!canNavigateToStage(stage)}
              className={`flex items-center gap-2 h-auto p-3 border-2 transition-all ${getStageColor(stage)} ${
                canNavigateToStage(stage) ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              {getStageIcon(stage)}
              <div className="text-left">
                <div className="font-medium text-xs">{stage.label}</div>
                <div className="text-xs text-muted-foreground capitalize">{stage.status}</div>
              </div>
            </Button>
            
            {index < stages.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">Progress:</span>
          <Badge variant="secondary" className="text-xs">
            {Math.round(((stages.findIndex(s => s.status === 'current') + 1) / stages.length) * 100)}% Complete
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-factory h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${((stages.findIndex(s => s.status === 'current') + 1) / stages.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </Card>
  );
};