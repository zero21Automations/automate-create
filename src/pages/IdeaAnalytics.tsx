import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Users, 
  Target, 
  DollarSign, 
  BarChart3,
  Calendar,
  Clock,
  ArrowLeft,
  Download,
  RefreshCw
} from "lucide-react";
import { PipelineNav } from "@/components/PipelineNav";

const IdeaAnalytics = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();

  const [timeRange, setTimeRange] = useState("7d");
  
  const performanceData = {
    totalViews: 45600,
    totalEngagement: 3240,
    engagementRate: 7.1,
    shares: 892,
    comments: 234,
    likes: 2114,
    revenue: 127.50,
    ctr: 4.2,
    avgWatchTime: "1:45"
  };

  const platformData = [
    {
      platform: "TikTok",
      views: 28400,
      engagement: 2100,
      engagementRate: 7.4,
      revenue: 85.20,
      trend: "up"
    },
    {
      platform: "Instagram Reels", 
      views: 12200,
      engagement: 890,
      engagementRate: 7.3,
      revenue: 32.40,
      trend: "up"
    },
    {
      platform: "YouTube Shorts",
      views: 5000,
      engagement: 250,
      engagementRate: 5.0,
      revenue: 9.90,
      trend: "down"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${projectId}`)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="text-left">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="flex items-center gap-1">
                💪 <span>Fitlife Project</span>
              </span>
              <span>•</span>
              <span className="text-primary font-medium">5-Minute Morning Workout</span>
            </div>
            <h1 className="text-xl font-bold text-factory-gradient flex items-center gap-3 my-4">
              <BarChart3 className="h-6 w-6" />
              Idea Analytics
              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                Stage 6/6
              </Badge>
            </h1>
            <p className="text-muted-foreground">Performance tracking and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            <Clock className="h-3 w-3 mr-1" />
            Published 7 days ago
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Pipeline Navigation */}
      <PipelineNav currentStage="analytics" ideaTitle="5-Minute Morning Workout" />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold">{performanceData.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+12.5% vs last week</span>
          </div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
              <p className="text-2xl font-bold">{performanceData.engagementRate}%</p>
            </div>
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+2.1% vs last week</span>
          </div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">${performanceData.revenue}</p>
            </div>
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+8.3% vs last week</span>
          </div>
        </Card>

        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Watch Time</p>
              <p className="text-2xl font-bold">{performanceData.avgWatchTime}</p>
            </div>
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-xs text-red-500">-0.3s vs last week</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Platform Performance</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className={timeRange === "24h" ? "bg-primary/10" : ""} onClick={() => setTimeRange("24h")}>24h</Button>
                <Button variant="ghost" size="sm" className={timeRange === "7d" ? "bg-primary/10" : ""} onClick={() => setTimeRange("7d")}>7d</Button>
                <Button variant="ghost" size="sm" className={timeRange === "30d" ? "bg-primary/10" : ""} onClick={() => setTimeRange("30d")}>30d</Button>
              </div>
            </div>
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{platform.platform}</p>
                      <p className="text-sm text-muted-foreground">{platform.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{platform.engagementRate}%</span>
                      {platform.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">${platform.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sticky Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Performance Summary</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Performance</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Views Target Met
                    </span>
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => navigate(`/projects/${projectId}`)}
          size="lg"
          className="bg-gradient-factory text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Project
        </Button>
      </div>
    </div>
  );
};

export default IdeaAnalytics;