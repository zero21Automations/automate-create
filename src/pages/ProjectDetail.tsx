import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProjects, type Project } from "@/hooks/useProjects";
import { useIdeas } from "@/hooks/useIdeas";
import {
  ArrowLeft,
  Plus,
  Play,
  BarChart3,
  Lightbulb,
  FileText,
  Video,
  Upload,
  Filter,
  Edit,
  ArrowRight,
  Clock,
  Eye,
  Calendar,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Download,
  Share2,
  Archive,
  AlertCircle,
  Zap,
  Layers,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, createProject } = useProjects();
  const { ideas, loading: ideasLoading, generateIdeas } = useIdeas(projectId || '');
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projects.length > 0 && projectId) {
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject || null);
    }
  }, [projects, projectId]);

  // Auto-create demo project if visiting specific project that doesn't exist
  useEffect(() => {
    if (projectId && projects.length > 0 && !project && !projectId.includes('-')) {
      // Only create if it looks like a real project name, not a UUID
      createProject({
        name: `${projectId.charAt(0).toUpperCase()}${projectId.slice(1)} Project`,
        description: 'AI-powered content creation pipeline',
        status: 'active'
      }).then((newProject) => {
        if (newProject) setProject(newProject as Project);
      }).catch(console.error);
    }
  }, [projectId, projects, project, createProject]);

  if (!project && projects.length > 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Project Not Found</h1>
          <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getIdeasByStatus = (status: string) => {
    return ideas.filter(idea => idea.status === status);
  };

  const ideaStats = {
    generated: getIdeasByStatus('generated').length,
    validated: getIdeasByStatus('validated').length,
    scripted: getIdeasByStatus('scripted').length,
    assets_ready: getIdeasByStatus('assets_ready').length,
    assembled: getIdeasByStatus('assembled').length,
    published: getIdeasByStatus('published').length,
  };

  const totalIdeas = ideas.length;
  const progressPercentage = totalIdeas > 0 ? (ideaStats.published / totalIdeas) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project?.name || 'Loading...'}</h1>
            <p className="text-muted-foreground">
              {project?.description || 'AI-powered content pipeline'} • Active since {project?.created_at ? new Date(project.created_at).toLocaleDateString() : '...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={project?.status === 'active' ? 'default' : 'secondary'}>
            {project?.status || 'Loading'}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ideas">Ideas ({totalIdeas})</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Progress</CardTitle>
                <CardDescription>
                  Track your content through each stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  
                  <div className="grid grid-cols-6 gap-2 mt-6">
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-lg p-3 mb-2">
                        <Lightbulb className="h-6 w-6 mx-auto text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.generated}</div>
                      <div className="text-xs text-muted-foreground">Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-50 rounded-lg p-3 mb-2">
                        <CheckCircle className="h-6 w-6 mx-auto text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.validated}</div>
                      <div className="text-xs text-muted-foreground">Validated</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-50 rounded-lg p-3 mb-2">
                        <FileText className="h-6 w-6 mx-auto text-green-600" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.scripted}</div>
                      <div className="text-xs text-muted-foreground">Scripted</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-50 rounded-lg p-3 mb-2">
                        <Upload className="h-6 w-6 mx-auto text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.assets_ready}</div>
                      <div className="text-xs text-muted-foreground">Assets</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-yellow-50 rounded-lg p-3 mb-2">
                        <Video className="h-6 w-6 mx-auto text-yellow-600" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.assembled}</div>
                      <div className="text-xs text-muted-foreground">Assembled</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-50 rounded-lg p-3 mb-2">
                        <Globe className="h-6 w-6 mx-auto text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold">{ideaStats.published}</div>
                      <div className="text-xs text-muted-foreground">Published</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start creating content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="h-auto p-4 justify-start" 
                    onClick={generateIdeas}
                    disabled={ideasLoading}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Generate Ideas</div>
                        <div className="text-sm text-muted-foreground">AI research agent</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link to={`/projects/${projectId}/ideas`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/50 rounded-lg p-2">
                          <Eye className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Ideas Pipeline</div>
                          <div className="text-sm text-muted-foreground">Manage ideas ({totalIdeas})</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {totalIdeas > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Ideas</CardTitle>
                <CardDescription>Latest ideas in your pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ideas.slice(0, 3).map((idea) => (
                    <div key={idea.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={idea.status === 'validated' ? 'default' : 'secondary'}>
                          {idea.status}
                        </Badge>
                        <div>
                          <p className="font-medium">{idea.title}</p>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Score: {idea.score}%</Badge>
                        {idea.status === 'validated' && (
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/projects/${projectId}/ideas/${idea.id}/script`}>
                              <FileText className="h-4 w-4 mr-1" />
                              Script
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ideas">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Ideas Pipeline</h2>
                <p className="text-muted-foreground">Generate and manage content ideas</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={generateIdeas} disabled={ideasLoading}>
                  {ideasLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Ideas
                    </>
                  )}
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/projects/${projectId}/ideas`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
            </div>

            {totalIdeas === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start by generating some content ideas using AI research
                  </p>
                  <Button onClick={generateIdeas} disabled={ideasLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate First Ideas
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {ideas.map((idea) => (
                  <Card key={idea.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={idea.status === 'validated' ? 'default' : 'secondary'}>
                            {idea.status}
                          </Badge>
                          <div>
                            <h3 className="font-semibold">{idea.title}</h3>
                            <p className="text-sm text-muted-foreground">{idea.description}</p>
                            <div className="flex gap-1 mt-2">
                              {idea.hashtags?.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Score: {idea.score}%</Badge>
                          {idea.status === 'validated' && (
                            <Button asChild size="sm">
                              <Link to={`/projects/${projectId}/ideas/${idea.id}/script`}>
                                <FileText className="h-4 w-4 mr-1" />
                                Create Script
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pipeline">
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pipeline View</h3>
            <p className="text-muted-foreground">
              Track content through script → assets → assembly → publish stages
            </p>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Performance metrics and insights coming soon
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;