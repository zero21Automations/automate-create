import React, { useEffect, useRef, useState } from "react";
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
  const [project, setProject] = useState<Project | null>(null);
  const creatingRef = useRef(false);
  const isUuid = (val?: string) => !!val && /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i.test(val);
  // Use the actual project UUID once available; avoid passing slugs like "fitlife"
  const { ideas, loading: ideasLoading, generateIdeas } = useIdeas(project?.id || '');

  useEffect(() => {
    if (!projectId) return;

    // Prefer matching by exact UUID id
    if (isUuid(projectId)) {
      const byId = projects.find((p) => p.id === projectId);
      if (byId) setProject(byId);
      return;
    }

    // Non-UUID param (e.g., "fitlife"): try to match by name prefix
    const lower = projectId.toLowerCase();
    const byName = projects.find((p) => p.name?.toLowerCase().startsWith(lower));
    if (byName) {
      setProject(byName);
    }
  }, [projects, projectId]);

  // Auto-create demo project when visiting a slug (non-UUID) and none exists yet
  useEffect(() => {
    if (!projectId || isUuid(projectId) || project || creatingRef.current) return;
    creatingRef.current = true;
    createProject({
      name: `${projectId.charAt(0).toUpperCase()}${projectId.slice(1)} Project`,
      description: 'AI-powered content creation pipeline',
      status: 'active',
    })
      .then((newProject) => {
        if (newProject) {
          setProject(newProject as Project);
          // Navigate to canonical UUID route to keep everything consistent
          navigate(`/projects/${(newProject as Project).id}`, { replace: true });
        }
      })
      .catch(console.error)
      .finally(() => {
        creatingRef.current = false;
      });
  }, [projectId, project, createProject, navigate]);

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Ideas Pipeline ({totalIdeas})</TabsTrigger>
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
                    disabled={!project?.id || ideasLoading}
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

        <TabsContent value="pipeline">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Ideas Pipeline</h2>
                <p className="text-muted-foreground">Track your content ideas through each stage</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={generateIdeas} disabled={!project?.id || ideasLoading}>
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
              </div>
            </div>

            {/* Pipeline Status Legend */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Pipeline Stages</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Generated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Validated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Scripted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Assets Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Assembled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Published</span>
                </div>
              </div>
            </Card>

            {totalIdeas === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start by generating some content ideas using AI research
                  </p>
                  <Button onClick={generateIdeas} disabled={!project?.id || ideasLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate First Ideas
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {ideas.map((idea) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'generated': return 'bg-gray-400';
                      case 'validated': return 'bg-blue-500';
                      case 'scripted': return 'bg-green-500';
                      case 'assets_ready': return 'bg-purple-500';
                      case 'assembled': return 'bg-yellow-500';
                      case 'published': return 'bg-orange-500';
                      default: return 'bg-gray-400';
                    }
                  };

                  const getNextAction = (status: string) => {
                    switch (status) {
                      case 'generated':
                        return { text: 'Validate Idea', icon: CheckCircle, disabled: false };
                      case 'validated':
                        return { text: 'Create Script', icon: FileText, disabled: false };
                      case 'scripted':
                        return { text: 'Generate Assets', icon: Upload, disabled: false };
                      case 'assets_ready':
                        return { text: 'Assemble Video', icon: Video, disabled: false };
                      case 'assembled':
                        return { text: 'Publish Content', icon: Globe, disabled: false };
                      case 'published':
                        return { text: 'View Analytics', icon: BarChart3, disabled: false };
                      default:
                        return { text: 'Continue', icon: ArrowRight, disabled: true };
                    }
                  };

                  const nextAction = getNextAction(idea.status);
                  const NextIcon = nextAction.icon;

                  return (
                    <Card key={idea.id} className="hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            {/* Status Indicator */}
                            <div className="flex flex-col items-center gap-1">
                              <div className={`w-4 h-4 rounded-full ${getStatusColor(idea.status)}`}></div>
                              <span className="text-xs text-muted-foreground capitalize">{idea.status}</span>
                            </div>
                            
                            {/* Idea Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {idea.title}
                                </h3>
                                <Badge variant="outline">Score: {idea.score}%</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{idea.description}</p>
                              <div className="flex gap-1 flex-wrap">
                                {idea.hashtags?.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="flex items-center gap-3">
                            <div className="text-right text-sm text-muted-foreground">
                              <div>Created {new Date(idea.created_at).toLocaleDateString()}</div>
                            </div>
                            <Button 
                              size="sm" 
                              disabled={nextAction.disabled}
                              onClick={() => {
                                const routes = {
                                  'generated': `/projects/${projectId}/ideas/${idea.id}`,
                                  'validated': `/projects/${projectId}/ideas/${idea.id}/script`,
                                  'scripted': `/projects/${projectId}/ideas/${idea.id}/assets`, 
                                  'assets_ready': `/projects/${projectId}/ideas/${idea.id}/assembly`,
                                  'assembled': `/projects/${projectId}/ideas/${idea.id}/publish`,
                                  'published': `/projects/${projectId}/ideas/${idea.id}/analytics`
                                };
                                navigate(routes[idea.status as keyof typeof routes] || `/projects/${projectId}/ideas/${idea.id}`);
                              }}
                              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                            >
                              <NextIcon className="h-4 w-4 mr-2" />
                              {nextAction.text}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
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