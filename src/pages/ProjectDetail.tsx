import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjects, type Project } from "@/hooks/useProjects";
import { useIdeas, type Idea } from "@/hooks/useIdeas";
import { useToast } from "@/hooks/use-toast";
import EnhancedIdeaForm from "@/components/EnhancedIdeaForm";
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
  Palette,
} from "lucide-react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, createProject } = useProjects();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  // Remove the old newIdea state as we're using EnhancedIdeaForm
  const creatingRef = useRef(false);
  const isUuid = (val?: string) => !!val && /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i.test(val);
  // Use the actual project UUID once available; avoid passing slugs like "fitlife"
  const { ideas, loading: ideasLoading, generateIdeas, updateIdea, createIdea } = useIdeas(project?.id || '');

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
    return filteredIdeas.filter(idea => idea.status === status);
  };

  // Filter and sort ideas
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.hashtags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || idea.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.score - a.score;
      case "title":
        return a.title.localeCompare(b.title);
      case "created_at":
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleValidateIdea = async (ideaId: string, newStatus: string) => {
    try {
      await updateIdea(ideaId, { status: newStatus as any });
      toast({
        title: "Idea updated",
        description: `Idea status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating idea",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleAddIdea = async (ideaData: Partial<Idea>) => {
    try {
      await createIdea({
        ...ideaData,
        status: 'generated',
        score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
      });

      setIsAddingIdea(false);
      
      toast({
        title: "Idea added",
        description: "Your idea has been added to the pipeline",
      });
    } catch (error) {
      console.error('Error adding idea:', error);
      toast({
        title: "Error adding idea",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const ideaStats = {
    generated: getIdeasByStatus('generated').length,
    validated: getIdeasByStatus('validated').length,
    scripted: getIdeasByStatus('scripted').length,
    assets_ready: getIdeasByStatus('assets_ready').length,
    assembled: getIdeasByStatus('assembled').length,
    published: getIdeasByStatus('published').length,
  };

  const totalIdeas = filteredIdeas.length;
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

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Ideas Pipeline ({totalIdeas})</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
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
                  
                  <Dialog open={isAddingIdea} onOpenChange={setIsAddingIdea}>
                    <DialogTrigger asChild>
                      <Button className="h-auto p-4 justify-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-lg p-2">
                            <Plus className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">Add Idea</div>
                            <div className="text-sm text-muted-foreground">Manual entry</div>
                          </div>
                        </div>
                      </Button>
                    </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Content Idea</DialogTitle>
                    </DialogHeader>
                    <EnhancedIdeaForm
                      onSubmit={handleAddIdea}
                      onCancel={() => setIsAddingIdea(false)}
                      loading={ideasLoading}
                    />
                  </DialogContent>
                  </Dialog>
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
                <Dialog open={isAddingIdea} onOpenChange={setIsAddingIdea}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Idea
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button onClick={generateIdeas} disabled={!project?.id || ideasLoading}>
                  {ideasLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      AI Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Smart Filtering */}
            <Card className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search ideas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px] bg-background">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="generated">Generated</SelectItem>
                    <SelectItem value="validated">Validated</SelectItem>
                    <SelectItem value="scripted">Scripted</SelectItem>
                    <SelectItem value="assets_ready">Assets Ready</SelectItem>
                    <SelectItem value="assembled">Assembled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px] bg-background">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="created_at">Date Created</SelectItem>
                    <SelectItem value="score">Score</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
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
                {filteredIdeas.map((idea) => {
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

                  const getStatusIcon = (status: string) => {
                    switch (status) {
                      case 'generated': return Lightbulb;
                      case 'validated': return CheckCircle;
                      case 'scripted': return FileText;
                      case 'assets_ready': return Upload;
                      case 'assembled': return Video;
                      case 'published': return Globe;
                      default: return Lightbulb;
                    }
                  };

                  const getNextAction = (status: string) => {
                    switch (status) {
                      case 'generated':
                        return { 
                          text: 'Validate Idea', 
                          icon: CheckCircle, 
                          disabled: false,
                          action: () => handleValidateIdea(idea.id, 'validated')
                        };
                      case 'validated':
                        return { 
                          text: 'Create Script', 
                          icon: FileText, 
                          disabled: false,
                          action: () => navigate(`/projects/${projectId}/ideas/${idea.id}/script`)
                        };
                      case 'scripted':
                        return { 
                          text: 'Generate Assets', 
                          icon: Upload, 
                          disabled: false,
                          action: () => navigate(`/projects/${projectId}/ideas/${idea.id}/assets`)
                        };
                      case 'assets_ready':
                        return { 
                          text: 'Assemble Video', 
                          icon: Video, 
                          disabled: false,
                          action: () => navigate(`/projects/${projectId}/ideas/${idea.id}/assembly`)
                        };
                      case 'assembled':
                        return { 
                          text: 'Publish Content', 
                          icon: Globe, 
                          disabled: false,
                          action: () => navigate(`/projects/${projectId}/ideas/${idea.id}/publish`)
                        };
                      case 'published':
                        return { 
                          text: 'View Analytics', 
                          icon: BarChart3, 
                          disabled: false,
                          action: () => navigate(`/projects/${projectId}/ideas/${idea.id}/analytics`)
                        };
                      default:
                        return { text: 'Continue', icon: ArrowRight, disabled: true, action: () => {} };
                    }
                  };

                  const nextAction = getNextAction(idea.status);
                  const NextIcon = nextAction.icon;
                  const StatusIcon = getStatusIcon(idea.status);

                  return (
                    <Card key={idea.id} className="hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            {/* Status Indicator */}
                            <div className="flex flex-col items-center gap-1">
                              <div className={`w-8 h-8 rounded-full ${getStatusColor(idea.status)} flex items-center justify-center`}>
                                <StatusIcon className="h-4 w-4 text-white" />
                              </div>
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
                              
                              {/* Enhanced idea details */}
                              {idea.video_concept && (
                                <div className="mb-3">
                                  <p className="text-sm text-muted-foreground">
                                    <Video className="inline h-3 w-3 mr-1" />
                                    {idea.video_concept}
                                  </p>
                                </div>
                              )}
                              
                              {/* Quick info badges */}
                              <div className="flex gap-2 mb-3 flex-wrap">
                                {idea.target_duration && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {idea.target_duration}s
                                  </Badge>
                                )}
                                {idea.tone && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Target className="h-3 w-3 mr-1" />
                                    {idea.tone}
                                  </Badge>
                                )}
                                {idea.visual_style && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Palette className="h-3 w-3 mr-1" />
                                    {idea.visual_style}
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Platform badges */}
                              {idea.target_platforms && idea.target_platforms.length > 0 && (
                                <div className="flex gap-1 mb-2">
                                  {idea.target_platforms.map((platform, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {platform === 'tiktok' && '🎵'} 
                                      {platform === 'youtube' && '📺'}
                                      {platform === 'instagram' && '📷'}
                                      {platform === 'twitter' && '🐦'}
                                      {platform === 'linkedin' && '💼'}
                                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              {/* Hashtags */}
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
                              onClick={nextAction.action}
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