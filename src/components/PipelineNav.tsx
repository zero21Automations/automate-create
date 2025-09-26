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
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6 mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-factory-gradient flex items-center gap-2">
            Production Pipeline
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium">
              {stages.findIndex(s => s.status === 'current') + 1}/{stages.length}
            </Badge>
          </h2>
          <p className="text-muted-foreground mt-1 font-medium">{ideaTitle}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-3 flex-shrink-0">
            <div
              onClick={() => canNavigateToStage(stage) ? navigate(stage.path) : null}
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${stage.status === 'completed' ? 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500' : ''}
                ${stage.status === 'current' ? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-lg' : ''}
                ${stage.status === 'pending' ? 'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-500' : ''}
                ${stage.status === 'locked' ? 'border-muted bg-muted/30 cursor-not-allowed opacity-60' : ''}
                ${canNavigateToStage(stage) ? 'hover:scale-105 hover:shadow-md' : ''}
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-lg
                ${stage.status === 'completed' ? 'bg-green-500 text-white' : ''}
                ${stage.status === 'current' ? 'bg-primary text-white animate-pulse' : ''}
                ${stage.status === 'pending' ? 'bg-yellow-500 text-white' : ''}
                ${stage.status === 'locked' ? 'bg-muted text-muted-foreground' : ''}
              `}>
                {getStageIcon(stage)}
              </div>
              
              <div className="text-left">
                <div className={`
                  font-semibold text-sm
                  ${stage.status === 'current' ? 'text-primary' : ''}
                  ${stage.status === 'completed' ? 'text-green-700' : ''}
                  ${stage.status === 'pending' ? 'text-yellow-700' : ''}
                  ${stage.status === 'locked' ? 'text-muted-foreground' : ''}
                `}>
                  {stage.label}
                </div>
                <div className={`
                  text-xs capitalize font-medium
                  ${stage.status === 'current' ? 'text-primary/80' : ''}
                  ${stage.status === 'completed' ? 'text-green-600' : ''}
                  ${stage.status === 'pending' ? 'text-yellow-600' : ''}
                  ${stage.status === 'locked' ? 'text-muted-foreground' : ''}
                `}>
                  {stage.status}
                </div>
              </div>
              
              {/* Tooltip */}
              {!canNavigateToStage(stage) && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Complete previous stages first
                </div>
              )}
            </div>
            
            {index < stages.length - 1 && (
              <div className={`
                flex items-center justify-center w-6 h-1 rounded-full transition-all duration-300
                ${index < stages.findIndex(s => s.status === 'current') ? 'bg-green-500' : 'bg-muted'}
              `}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Enhanced Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Pipeline Progress</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
            {Math.round(((stages.findIndex(s => s.status === 'current') + 1) / stages.length) * 100)}% Complete
          </Badge>
        </div>
        <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
          <div 
            className="h-3 bg-gradient-factory rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ 
              width: `${((stages.findIndex(s => s.status === 'current') + 1) / stages.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};