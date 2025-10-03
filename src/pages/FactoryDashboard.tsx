import { useParams } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useFactoryJobs } from "@/hooks/useFactoryJobs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FactoryJobCard } from "@/components/FactoryJobCard";
import { Factory, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FactoryDashboard() {
  const { projectId } = useParams();
  const { projects, loading: projectsLoading } = useProjects();
  const project = projects.find((p) => p.id === projectId);
  const { jobs, loading: jobsLoading, advanceJob, retryJob } = useFactoryJobs(projectId);

  if (projectsLoading || jobsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const totalJobs = jobs.length;
  const runningJobs = jobs.filter((j) => j.status === 'running').length;
  const completedJobs = jobs.filter((j) => j.status === 'completed').length;
  const failedJobs = jobs.filter((j) => j.status === 'failed').length;
  const checkpointJobs = jobs.filter((j) => j.status === 'checkpoint').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Factory className="h-8 w-8 text-primary" />
            Factory Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your content production pipeline
          </p>
        </div>
        {project.dna_locked && (
          <Badge className="bg-primary/10 text-primary">
            DNA Locked • Auto-Mode
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              Content pieces in pipeline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{runningJobs}</div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedJobs}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {failedJobs + checkpointJobs}
            </div>
            <p className="text-xs text-muted-foreground">
              {checkpointJobs} checkpoints, {failedJobs} failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Jobs</h2>
        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Factory className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No factory jobs yet. Start by validating an idea to begin production.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <FactoryJobCard
                key={job.id}
                job={job}
                onAdvance={advanceJob}
                onRetry={retryJob}
              />
            ))}
          </div>
        )}
      </div>

      {/* Automation Config */}
      {project.automation_config && (
        <Card>
          <CardHeader>
            <CardTitle>Automation Settings</CardTitle>
            <CardDescription>Current factory configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-validate Ideas</p>
                <Badge variant={project.automation_config.auto_validate_ideas ? "default" : "secondary"}>
                  {project.automation_config.auto_validate_ideas ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-generate Scripts</p>
                <Badge variant={project.automation_config.auto_generate_scripts ? "default" : "secondary"}>
                  {project.automation_config.auto_generate_scripts ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-generate Assets</p>
                <Badge variant={project.automation_config.auto_generate_assets ? "default" : "secondary"}>
                  {project.automation_config.auto_generate_assets ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-assemble Videos</p>
                <Badge variant={project.automation_config.auto_assemble_videos ? "default" : "secondary"}>
                  {project.automation_config.auto_assemble_videos ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-publish</p>
                <Badge variant={project.automation_config.auto_publish ? "default" : "secondary"}>
                  {project.automation_config.auto_publish ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Quality Threshold</p>
                <p className="text-sm text-muted-foreground">
                  {((project.automation_config.quality_threshold || 0.7) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
