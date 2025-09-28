import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  BarChart3
} from "lucide-react";

export interface StageTask {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  progress?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface StageProgressTrackerProps {
  stageTitle: string;
  overallProgress: number;
  tasks: StageTask[];
  qualityScore?: number;
  className?: string;
}

export const StageProgressTracker = ({
  stageTitle,
  overallProgress,
  tasks,
  qualityScore,
  className = ""
}: StageProgressTrackerProps) => {
  const getTaskIcon = (status: StageTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <RefreshCw className="h-4 w-4 text-info animate-spin" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTaskBadge = (status: StageTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-info/10 text-info border-info/20';
      case 'blocked':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/20';
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress Overview */}
      <Card className="card-factory-glow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">{stageTitle} Progress</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Completion</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {completedTasks}/{tasks.length} tasks completed
            </span>
            {blockedTasks > 0 && (
              <Badge variant="outline" className="text-xs border-warning/30 text-warning">
                {blockedTasks} blocked
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Quality Score (if provided) */}
      {qualityScore !== undefined && (
        <Card className="card-factory-glow p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Quality Score</h3>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              qualityScore >= 8 ? 'text-success' :
              qualityScore >= 6 ? 'text-warning' :
              'text-destructive'
            }`}>
              {qualityScore}/10
            </div>
            <div className="text-xs text-muted-foreground">
              {qualityScore >= 8 ? 'Excellent' :
               qualityScore >= 6 ? 'Good' :
               'Needs Improvement'}
            </div>
          </div>
        </Card>
      )}

      {/* Current Tasks */}
      <Card className="card-factory-glow p-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Current Tasks</h3>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTaskIcon(task.status)}
                  <span className="text-sm font-medium">{task.label}</span>
                </div>
                <Badge variant="outline" className={getTaskBadge(task.status)}>
                  {task.status === 'in-progress' && task.progress 
                    ? `${task.progress}%` 
                    : task.status.replace('-', ' ')
                  }
                </Badge>
              </div>
              
              {task.description && (
                <p className="text-xs text-muted-foreground ml-6">
                  {task.description}
                </p>
              )}
              
              {task.progress !== undefined && task.status === 'in-progress' && (
                <Progress value={task.progress} className="h-1 ml-6" />
              )}
              
              {task.action && task.status === 'blocked' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={task.action.onClick}
                  className="text-xs ml-6"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  {task.action.label}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};