import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Heart,
  Share2,
  Play,
  Download,
  RefreshCw,
  Calendar,
  Globe,
  Award,
  Target,
  Zap,
  Filter,
  Clock
} from "lucide-react";

const GlobalAnalytics = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Mock global analytics data
  const [portfolioMetrics] = useState({
    total_projects: 12,
    total_posts: 247,
    total_views: "8.4M",
    total_revenue: "$23,840",
    avg_engagement: "9.2%",
    top_performing_niche: "Productivity",
    growth_rate: "+34%"
  });

  const [projectPerformance] = useState([
    {
      id: "fitlife",
      name: "FitLife Motivation",
      niche: "Fitness",
      posts: 34,
      views: "2.1M",
      engagement: "12.4%",
      revenue: "$6,420",
      roi: "340%",
      trend: "up",
      growth: "+45%"
    },
    {
      id: "productivity",
      name: "Productivity Pro",
      niche: "Productivity", 
      posts: 28,
      views: "1.8M",
      engagement: "8.7%",
      revenue: "$8,130",
      roi: "410%",
      trend: "up",
      growth: "+32%"
    },
    {
      id: "mindful",
      name: "Mindful Moments",
      niche: "Wellness",
      posts: 19,
      views: "945K",
      engagement: "14.2%",
      revenue: "$3,210",
      roi: "280%",
      trend: "down",
      growth: "-8%"
    },
    {
      id: "cooking",
      name: "Cooking Hacks Pro",
      niche: "Lifestyle",
      posts: 41,
      views: "1.2M", 
      engagement: "6.8%",
      revenue: "$2,890",
      roi: "190%",
      trend: "stable",
      growth: "+3%"
    }
  ]);

  const [contentTypeAnalysis] = useState([
    {
      type: "How-To Tutorials",
      performance: 95,
      avg_views: "234K",
      engagement: "11.2%",
      conversion: "4.8%",
      best_platforms: ["YouTube", "TikTok"],
      trend: "up"
    },
    {
      type: "Quick Tips",
      performance: 87,
      avg_views: "145K", 
      engagement: "8.9%",
      conversion: "3.2%",
      best_platforms: ["TikTok", "Instagram"],
      trend: "stable"
    },
    {
      type: "Behind the Scenes",
      performance: 73,
      avg_views: "89K",
      engagement: "15.4%",
      conversion: "2.1%",
      best_platforms: ["Instagram", "TikTok"],
      trend: "up"
    },
    {
      type: "Product Reviews",
      performance: 91,
      avg_views: "178K",
      engagement: "7.6%", 
      conversion: "8.9%",
      best_platforms: ["YouTube", "Instagram"],
      trend: "up"
    }
  ]);

  const [platformInsights] = useState([
    {
      platform: "TikTok",
      total_posts: 98,
      total_views: "3.2M",
      avg_engagement: "12.8%",
      best_time: "7-9 PM",
      top_content: "Quick productivity tips",
      revenue_share: "35%",
      growth: "+52%"
    },
    {
      platform: "YouTube",
      total_posts: 45,
      total_views: "2.1M", 
      avg_engagement: "6.4%",
      best_time: "2-4 PM",
      top_content: "Tutorial deep-dives",
      revenue_share: "45%",
      growth: "+28%"
    },
    {
      platform: "Instagram",
      total_posts: 67,
      total_views: "1.8M",
      avg_engagement: "9.7%",
      best_time: "11 AM-1 PM",
      top_content: "Visual transformations",
      revenue_share: "20%",
      growth: "+18%"
    }
  ]);

  const [audienceInsights] = useState([
    {
      demographic: "Age 25-34",
      percentage: "42%",
      engagement: "11.2%",
      platforms: ["TikTok", "Instagram"],
      interests: ["Productivity", "Wellness", "Career"]
    },
    {
      demographic: "Age 18-24", 
      percentage: "28%",
      engagement: "14.8%",
      platforms: ["TikTok", "YouTube"],
      interests: ["Lifestyle", "Fitness", "Technology"]
    },
    {
      demographic: "Age 35-44",
      percentage: "22%",
      engagement: "8.4%",
      platforms: ["YouTube", "Instagram"],
      interests: ["Business", "Health", "Finance"]
    },
    {
      demographic: "Age 45+",
      percentage: "8%", 
      engagement: "6.1%",
      platforms: ["YouTube", "Pinterest"],
      interests: ["Cooking", "Wellness", "Travel"]
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-success";
      case "down": return "text-destructive";  
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-factory-gradient">Global Analytics</h1>
            <p className="text-muted-foreground">Cross-project performance insights and portfolio optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            <Globe className="h-3 w-3 mr-1" />
            Portfolio Overview
          </Badge>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="factory">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-4 w-4 text-primary" />
            <Badge variant="secondary" className="text-xs">Active</Badge>
          </div>
          <div className="text-2xl font-bold">{portfolioMetrics.total_projects}</div>
          <div className="text-sm text-muted-foreground">Projects</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <Play className="h-4 w-4 text-primary" />
            <TrendingUp className="h-3 w-3 text-success" />
          </div>
          <div className="text-2xl font-bold">{portfolioMetrics.total_posts}</div>
          <div className="text-sm text-muted-foreground">Total Posts</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-xs text-success">{portfolioMetrics.growth_rate}</span>
          </div>
          <div className="text-2xl font-bold">{portfolioMetrics.total_views}</div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <TrendingUp className="h-3 w-3 text-success" />
          </div>
          <div className="text-2xl font-bold">{portfolioMetrics.total_revenue}</div>
          <div className="text-sm text-muted-foreground">Revenue</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <Heart className="h-4 w-4 text-primary" />
            <Target className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{portfolioMetrics.avg_engagement}</div>
          <div className="text-sm text-muted-foreground">Avg Engagement</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-4 w-4 text-primary" />
            <Zap className="h-3 w-3 text-yellow-500" />
          </div>
          <div className="text-lg font-bold">{portfolioMetrics.top_performing_niche}</div>
          <div className="text-sm text-muted-foreground">Top Niche</div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs text-success">+34%</span>
          </div>
          <div className="text-2xl font-bold">8.2x</div>
          <div className="text-sm text-muted-foreground">Avg ROI</div>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Project Performance</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="platforms">Platform Insights</TabsTrigger>
          <TabsTrigger value="audience">Audience Data</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <div className="space-y-4">
            {projectPerformance.map((project) => (
              <Card key={project.id} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <Badge variant="secondary">{project.niche}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(project.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(project.trend)}`}>
                      {project.growth}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.views}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.engagement}</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.revenue}</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.roi}</div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
                      <BarChart3 className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <div className="space-y-4">
            {contentTypeAnalysis.map((content, index) => (
              <Card key={index} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{content.type}</h3>
                    <div className="flex gap-2 mt-2">
                      {content.best_platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(content.trend)}
                    <Badge variant="secondary">
                      {content.performance}/100
                    </Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Performance Score</span>
                    <span className="text-sm text-muted-foreground">{content.performance}%</span>
                  </div>
                  <Progress value={content.performance} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.avg_views}</div>
                    <div className="text-sm text-muted-foreground">Avg Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.engagement}</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.conversion}</div>
                    <div className="text-sm text-muted-foreground">Conversion</div>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Optimize
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <div className="space-y-4">
            {platformInsights.map((platform, index) => (
              <Card key={index} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{platform.platform}</h3>
                    <p className="text-muted-foreground">Best performing: {platform.top_content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{platform.revenue_share} revenue</Badge>
                    <span className="text-sm text-success font-medium">{platform.growth}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{platform.total_posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{platform.total_views}</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{platform.avg_engagement}</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{platform.best_time}</div>
                    <div className="text-sm text-muted-foreground">Best Time</div>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audience" className="mt-6">
          <div className="space-y-4">
            {audienceInsights.map((audience, index) => (
              <Card key={index} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{audience.demographic}</h3>
                    <p className="text-muted-foreground">{audience.percentage} of total audience</p>
                  </div>
                  <Badge variant="secondary">{audience.engagement} engagement</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Top Platforms</div>
                    <div className="flex gap-2">
                      {audience.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Top Interests</div>
                    <div className="flex gap-2 flex-wrap">
                      {audience.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Audience Share</span>
                    <span className="text-sm text-muted-foreground">{audience.percentage}</span>
                  </div>
                  <Progress value={parseInt(audience.percentage)} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card className="card-factory-glow p-6">
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Trend Analytics</h3>
              <p className="text-muted-foreground mb-4">Historical performance trends and predictive insights coming soon</p>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Request Access
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalAnalytics;