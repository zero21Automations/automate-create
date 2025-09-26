import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TrendingUp, Users, Target, Zap, Eye, Search, Filter, Download, Upload, MoreHorizontal, Play, ThumbsUp, MessageCircle, Share2, Bookmark, Clock, CheckCircle, XCircle, AlertCircle, BarChart3, Lightbulb, RefreshCw, Settings, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Research Stage - Idea Generation Flow
export default function Research() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  // Mock data for demonstration
  const mockIdeas = [
    {
      id: "1",
      title: "5 Minutes to Transform Your Morning Routine",
      description: "Quick productivity hacks that actually work",
      source: "research_agent",
      platform: "tiktok",
      score: 0.89,
      status: "validated",
      metadata: {
        trend_alignment: 0.95,
        audience_fit: 0.82,
        brand_alignment: 0.91,
        competitor_source: "@productivitypro"
      },
      tags: ["productivity", "morning", "habits", "wellness"],
      created_at: "2024-01-15T10:30:00Z",
      validation_reason: "High engagement potential with strong trend alignment"
    },
    {
      id: "2", 
      title: "Why Your Phone is Sabotaging Your Success",
      description: "The hidden psychology of digital addiction",
      source: "competitor_analysis",
      platform: "youtube",
      score: 0.76,
      status: "generated",
      metadata: {
        trend_alignment: 0.71,
        audience_fit: 0.89,
        brand_alignment: 0.68
      },
      tags: ["digital detox", "psychology", "success", "mindfulness"],
      created_at: "2024-01-15T09:15:00Z"
    },
    {
      id: "3",
      title: "30-Second Desk Workout for Remote Workers",
      description: "Combat sedentary lifestyle with micro-movements",
      source: "human_input",
      platform: "instagram",
      score: 0.93,
      status: "approved",
      metadata: {
        trend_alignment: 0.88,
        audience_fit: 0.96,
        brand_alignment: 0.95
      },
      tags: ["fitness", "remote work", "health", "quick workout"],
      created_at: "2024-01-15T08:45:00Z"
    }
  ];

  const [manualIdeaForm, setManualIdeaForm] = useState({
    title: "",
    description: "",
    platform: "tiktok",
    tags: ""
  });

  const handleGenerateIdeas = async () => {
    setLoading(true);
    try {
      // Simulate AI research agent
      const { data, error } = await supabase.functions.invoke('ai', {
        body: { 
          message: "Generate 3 viral content ideas for productivity and wellness niche. Include trend analysis and engagement potential scoring." 
        }
      });

      if (error) throw error;

      toast({
        title: "Research Complete",
        description: "Generated new viral content ideas based on current trends"
      });

      // In real implementation, parse AI response and save to database
      setIdeas(mockIdeas);
    } catch (error) {
      toast({
        title: "Research Failed",
        description: "Unable to generate ideas. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateIdea = async (ideaId: string, action: "approve" | "reject") => {
    try {
      // In real implementation, update idea status in database
      const updatedIdeas = ideas.map(idea => 
        idea.id === ideaId 
          ? { ...idea, status: action === "approve" ? "validated" : "rejected" }
          : idea
      );
      setIdeas(updatedIdeas);

      toast({
        title: action === "approve" ? "Idea Approved" : "Idea Rejected",
        description: `Idea moved to ${action === "approve" ? "validated" : "rejected"} status`
      });
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Unable to update idea status",
        variant: "destructive"
      });
    }
  };

  const handleSubmitManualIdea = async () => {
    if (!manualIdeaForm.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter an idea title",
        variant: "destructive"
      });
      return;
    }

    try {
      // In real implementation, save to database and score with AI
      const newIdea = {
        id: Date.now().toString(),
        ...manualIdeaForm,
        source: "human_input",
        score: 0.75, // Default score, would be calculated by AI
        status: "generated",
        metadata: {
          trend_alignment: 0.0,
          audience_fit: 0.0,
          brand_alignment: 0.0
        },
        tags: manualIdeaForm.tags.split(",").map(tag => tag.trim()),
        created_at: new Date().toISOString()
      };

      setIdeas([newIdea, ...ideas]);
      setManualIdeaForm({ title: "", description: "", platform: "tiktok", tags: "" });
      
      toast({
        title: "Idea Added",
        description: "Manual idea submitted for validation"
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to add idea",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated": return <CheckCircle className="w-4 h-4 text-success" />;
      case "rejected": return <XCircle className="w-4 h-4 text-destructive" />;
      case "approved": return <CheckCircle className="w-4 h-4 text-primary" />;
      default: return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "research_agent": return <Zap className="w-4 h-4" />;
      case "competitor_analysis": return <BarChart3 className="w-4 h-4" />;
      case "human_input": return <Lightbulb className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === "all" || idea.source === selectedSource;
    const matchesStatus = selectedStatus === "all" || idea.status === selectedStatus;
    return matchesSearch && matchesSource && matchesStatus;
  });

  useEffect(() => {
    // Simulate initial load
    setIdeas(mockIdeas);
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ideas Hub</h1>
              <p className="text-muted-foreground">Stage 1: Discover trending topics and validate content ideas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleGenerateIdeas} 
              disabled={loading}
              className="btn-factory"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Generate Ideas
                </>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="pipeline" className="h-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pipeline">Idea Pipeline</TabsTrigger>
            <TabsTrigger value="manual">Manual Input</TabsTrigger>
            <TabsTrigger value="sources">Research Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
              <div className="flex-1">
                <Input
                  placeholder="Search ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-2 bg-background/50 border border-input rounded-md text-sm"
              >
                <option value="all">All Sources</option>
                <option value="research_agent">AI Research</option>
                <option value="competitor_analysis">Competitor Analysis</option>
                <option value="human_input">Manual Input</option>
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-background/50 border border-input rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="generated">Generated</option>
                <option value="validated">Validated</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Ideas Grid */}
            <div className="grid gap-4">
              {filteredIdeas.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">No Ideas Found</h3>
                        <p className="text-muted-foreground">Start by generating ideas or add them manually</p>
                      </div>
                      <Button onClick={handleGenerateIdeas} className="btn-factory">
                        <TrendingUp className="w-4 h-4" />
                        Generate First Ideas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredIdeas.map((idea) => (
                  <Card key={idea.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{idea.title}</h3>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getSourceIcon(idea.source)}
                              {idea.source.replace("_", " ")}
                            </Badge>
                            <Badge variant={idea.platform === "tiktok" ? "default" : idea.platform === "youtube" ? "destructive" : "secondary"}>
                              {idea.platform}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{idea.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Viral Score: {(idea.score * 100).toFixed(0)}%
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(idea.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {getStatusIcon(idea.status)}
                          <span className="text-sm capitalize">{idea.status}</span>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Trend Alignment</div>
                          <Progress value={idea.metadata.trend_alignment * 100} className="h-2" />
                          <div className="text-xs text-right">{(idea.metadata.trend_alignment * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Audience Fit</div>
                          <Progress value={idea.metadata.audience_fit * 100} className="h-2" />
                          <div className="text-xs text-right">{(idea.metadata.audience_fit * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Brand Alignment</div>
                          <Progress value={idea.metadata.brand_alignment * 100} className="h-2" />
                          <div className="text-xs text-right">{(idea.metadata.brand_alignment * 100).toFixed(0)}%</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {idea.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {idea.status === "generated" && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleValidateIdea(idea.id, "approve")}
                                className="btn-factory"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleValidateIdea(idea.id, "reject")}
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </>
                          )}
                          {(idea.status === "validated" || idea.status === "approved") && (
                            <Button size="sm" className="btn-factory">
                              <Play className="w-4 h-4" />
                              Create Script
                            </Button>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Manual Idea</CardTitle>
                <CardDescription>
                  Input your own content ideas for validation and scoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Idea Title *</Label>
                  <Input
                    id="title"
                    value={manualIdeaForm.title}
                    onChange={(e) => setManualIdeaForm({...manualIdeaForm, title: e.target.value})}
                    placeholder="Enter your content idea title..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={manualIdeaForm.description}
                    onChange={(e) => setManualIdeaForm({...manualIdeaForm, description: e.target.value})}
                    placeholder="Describe your content idea..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Target Platform</Label>
                    <select 
                      id="platform"
                      value={manualIdeaForm.platform}
                      onChange={(e) => setManualIdeaForm({...manualIdeaForm, platform: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={manualIdeaForm.tags}
                      onChange={(e) => setManualIdeaForm({...manualIdeaForm, tags: e.target.value})}
                      placeholder="productivity, wellness, tips"
                    />
                  </div>
                </div>
                <Button onClick={handleSubmitManualIdea} className="btn-factory">
                  <Plus className="w-4 h-4" />
                  Add Idea
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Research Agent
                  </CardTitle>
                  <CardDescription>
                    AI-powered trend analysis across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>TikTok Trends</span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>YouTube Analytics</span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reddit Monitoring</span>
                      <Badge variant="warning">Limited</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Configure Sources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Competitor Analysis
                  </CardTitle>
                  <CardDescription>
                    Monitor competitor content performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>@productivitypro</span>
                      <Badge variant="success">Tracking</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>@wellnessguru</span>
                      <Badge variant="success">Tracking</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>@lifehacks101</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Competitors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}