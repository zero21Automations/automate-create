import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { FactoryJob } from "@/hooks/useFactoryJobs";
import { formatDistanceToNow } from "date-fns";

interface FactoryJobCardProps {
  job: FactoryJob;
  onAdvance: (jobId: string) => void;
  onRetry: (jobId: string) => void;
}

export const FactoryJobCard = ({ job, onAdvance, onRetry }: FactoryJobCardProps) => {
  const getStatusIcon = () => {
    switch (job.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'running':
        return <Play className="h-4 w-4 text-info" />;
      case 'checkpoint':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (job.status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      case 'running':
        return 'bg-info/10 text-info';
      case 'checkpoint':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStageProgress = () => {
    const stages = ['research', 'idea', 'script', 'assets', 'assembly', 'publish', 'analytics'];
    const currentIndex = stages.indexOf(job.current_stage);
    const progress = ((currentIndex + 1) / stages.length) * 100;
    return Math.round(progress);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-base">
              {job.current_stage.charAt(0).toUpperCase() + job.current_stage.slice(1)} Stage
            </CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {job.status}
          </Badge>
        </div>
        <CardDescription>
          {job.checkpoint_required && 'Checkpoint required • '}
          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{getStageProgress()}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${getStageProgress()}%` }}
            />
          </div>
        </div>

        {/* Error message */}
        {job.last_error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{job.last_error}</p>
            {job.error_count > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Retry attempts: {job.error_count}/3
              </p>
            )}
          </div>
        )}

        {/* Checkpoint info */}
        {job.checkpoint_required && job.checkpoint_expires_at && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
            <p className="text-sm text-warning">
              Checkpoint expires {formatDistanceToNow(new Date(job.checkpoint_expires_at), { addSuffix: true })}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {job.status === 'checkpoint' && (
            <Button
              onClick={() => onAdvance(job.id)}
              variant="factory"
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Continue
            </Button>
          )}
          {job.status === 'failed' && (
            <Button
              onClick={() => onRetry(job.id)}
              variant="factory-outline"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
