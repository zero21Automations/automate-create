import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Settings, 
  Play, 
  TrendingUp, 
  Users, 
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Lightbulb,
  FileText,
  Video,
  Upload,
  Mic
} from "lucide-react";

// Individual Project Dashboard Page
export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock project data - in real app, fetch from Supabase
  const project = {
    id: "fitlife",
    name: "FitLife Motivation",
    emoji: "🔥",
    description: "Motivational fitness content for young professionals",
    tags: ["fitness", "wellness", "motivation"],
    status: "active",
    created: "2025-09-19",
    niche: ["Fitness", "Wellness"],
    pipeline: {
      ideas: 12,
      scripts: 8,
      videos: 7,
      live: 11
    },
    metrics: {
      views: "22.1K",
      engagement: "8.4%",
      followers: "+847",
      revenue: "$1,240"
    }
  };

  const recentContent = [
    {
      id: "1",
      title: "5 Minute Morning Workout",
      type: "video",
      status: "published",
      platform: "tiktok",
      views: "12.3K",
      engagement: "9.2%",
      published: "2 hours ago"
    },
    {
      id: "2", 
      title: "Healthy Meal Prep Hacks",
      type: "script",
      status: "production",
      platform: "youtube",
      progress: 75,
      updated: "5 hours ago"
    },
    {
      id: "3",
      title: "Gym Anxiety Solutions",
      type: "idea",
      status: "validated",
      score: 0.89,
      created: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "success";
      case "production": return "warning"; 
      case "validated": return "info";
      case "draft": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle className="w-4 h-4" />;
      case "production": return <Clock className="w-4 h-4" />;
      case "validated": return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/projects")} variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/projects")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{project.emoji}</span>
                <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                <Badge variant={project.status === "active" ? "success" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button className="btn-factory">
              <Plus className="w-4 h-4" />
              New Content
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="assembly">Assembly</TabsTrigger>
            <TabsTrigger value="publishing">Publishing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Pipeline Overview */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ideas</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.pipeline.ideas}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scripts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.pipeline.scripts}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Production</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.pipeline.videos}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.pipeline.live}</div>
                  <p className="text-xs text-muted-foreground">
                    +4 this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.views}</div>
                  <p className="text-xs text-success">
                    +12.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.engagement}</div>
                  <p className="text-xs text-success">
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Followers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.followers}</div>
                  <p className="text-xs text-success">
                    +23% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.metrics.revenue}</div>
                  <p className="text-xs text-success">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Content */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
                <CardDescription>Latest activity in your content pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              {item.platform && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.platform}
                                </Badge>
                              )}
                              <span>
                                {item.published && `Published ${item.published}`}
                                {item.updated && `Updated ${item.updated}`}
                                {item.created && `Created ${item.created}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        {item.views && (
                          <div className="text-sm text-muted-foreground">
                            {item.views} views
                          </div>
                        )}
                        {item.progress && (
                          <div className="flex items-center gap-2 w-24">
                            <Progress value={item.progress} className="h-2" />
                            <span className="text-xs text-muted-foreground">{item.progress}%</span>
                          </div>
                        )}
                        {item.score && (
                          <div className="text-sm text-muted-foreground">
                            Score: {(item.score * 100).toFixed(0)}%
                          </div>
                        )}
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ideas">
            <Card>
              <CardHeader>
                <CardTitle>Ideas Hub</CardTitle>
                <CardDescription>Manage your content ideas and validation queue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Generate Ideas</h3>
                    <p className="text-muted-foreground mb-4">Discover trending topics and validate content ideas</p>
                    <Button onClick={() => navigate("/research")} className="btn-factory">
                      <Plus className="w-4 h-4 mr-2" />
                      Open Ideas Hub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scripts">
            <Card>
              <CardHeader>
                <CardTitle>Script Studio</CardTitle>
                <CardDescription>Write and optimize your content scripts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Create Scripts</h3>
                    <p className="text-muted-foreground mb-4">Transform your ideas into platform-optimized scripts</p>
                    <Button onClick={() => navigate("/script-studio")} className="btn-factory">
                      <FileText className="w-4 w-4 mr-2" />
                      Open Script Studio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Asset Generation</CardTitle>
                <CardDescription>Generate voice, music, captions, and B-roll assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Mic className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready for Asset Generation</h3>
                    <p className="text-muted-foreground mb-4">Create voice, music, captions, and visual assets</p>
                    <Button onClick={() => navigate("/asset-manager")} className="btn-factory">
                      <Mic className="w-4 w-4 mr-2" />
                      Open Asset Manager
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assembly">
            <Card>
              <CardHeader>
                <CardTitle>Post-Production Assembly</CardTitle>
                <CardDescription>Combine assets into finished videos with timeline editing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready for Video Assembly</h3>
                    <p className="text-muted-foreground mb-4">Edit timeline, sync assets, and render final videos</p>
                    <Button onClick={() => navigate("/assembly")} className="btn-factory">
                      <Video className="w-4 w-4 mr-2" />
                      Open Assembly Studio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publishing">
            <Card>
              <CardHeader>
                <CardTitle>Publishing & Scheduling</CardTitle>
                <CardDescription>Schedule and distribute content across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Publish</h3>
                    <p className="text-muted-foreground mb-4">Schedule posts and manage platform distribution</p>
                    <Button onClick={() => navigate("/publishing")} className="btn-factory">
                      <Upload className="w-4 w-4 mr-2" />
                      Open Publishing Hub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Performance insights and optimization recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard Coming Soon</h3>
                    <p className="text-muted-foreground">Performance analytics will be available here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}