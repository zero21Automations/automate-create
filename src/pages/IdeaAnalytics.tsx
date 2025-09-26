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
      {/* Pipeline Navigation */}
      <PipelineNav ideaTitle="5-Minute Morning Workout" currentStage="analytics" />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-factory-gradient">Idea Analytics</h1>
            <p className="text-muted-foreground">Performance tracking for: 5-Minute Morning Workout</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            <Clock className="h-3 w-3 mr-1" />
            Published 7 days ago
          </Badge>
          {ideaId && (
            <Badge variant="secondary" className="badge-factory">Idea: {ideaId}</Badge>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Platform Breakdown */}
        <div className="xl:col-span-2 space-y-6">
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

          <Card className="card-factory-glow p-6">
            <h2 className="text-xl font-semibold mb-6">Engagement Breakdown</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">{performanceData.likes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{performanceData.comments}</p>
                <p className="text-sm text-muted-foreground">Comments</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Share className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">{performanceData.shares}</p>
                <p className="text-sm text-muted-foreground">Shares</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Click-through Rate</span>
                <Badge variant="secondary">{performanceData.ctr}%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Engagement</span>
                <Badge variant="secondary">{performanceData.totalEngagement.toLocaleString()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue per View</span>
                <Badge variant="secondary">${(performanceData.revenue / performanceData.totalViews * 1000).toFixed(3)}</Badge>
              </div>
            </div>
          </Card>

          {/* Top Comments */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">Top Comments</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">"This actually works! Lost 5lbs already 🔥"</p>
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-muted-foreground">127 likes</span>
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">"Perfect for busy mornings!"</p>
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-muted-foreground">89 likes</span>
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">"Can you do one for evening workouts?"</p>
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-muted-foreground">56 likes</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Insights */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">AI Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">💡 Morning workout content performs 23% better than evening content</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">📈 Consider creating a follow-up "Evening Routine" video based on comments</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">⏰ Peak engagement happens 2-3 hours after posting</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IdeaAnalytics;