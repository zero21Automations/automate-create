import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  Share, 
  Play,
  Plus,
  Activity,
  Target,
  Zap,
  BarChart3
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "5",
    subtitle: "Active Projects",
    trend: "+2",
    trendType: "up" as const,
    icon: Target,
    color: "text-blue-400"
  },
  {
    title: "Content Output",
    value: "109",
    subtitle: "Videos This Month",
    trend: "+23",
    trendType: "up" as const,
    icon: Play,
    color: "text-purple-400"
  },
  {
    title: "Total Views",
    value: "293.9K",
    subtitle: "Last 30 Days",
    trend: "+12.3K",
    trendType: "up" as const,
    icon: Eye,
    color: "text-green-400"
  },
  {
    title: "Engagement Rate",
    value: "8.4%",
    subtitle: "Avg Across Platforms",
    trend: "+1.2%",
    trendType: "up" as const,
    icon: Heart,
    color: "text-pink-400"
  }
];

const recentActivity = [
  {
    type: "success",
    message: "TikTok post published: 67% engagement spike detected",
    time: "2 minutes ago",
    project: "WildTalks Animal Shorts"
  },
  {
    type: "info", 
    message: "Video auto-assembled: 'Ocean Facts #47' ready for review",
    time: "15 minutes ago",
    project: "WildTalks Animal Shorts"
  },
  {
    type: "success",
    message: "Script approved: 'Why Penguins Can't Fly But Love Swimming'",
    time: "1 hour ago",
    project: "WildTalks Animal Shorts"
  },
  {
    type: "warning",
    message: "YouTube OAuth token renewal required",
    time: "3 hours ago",
    project: "Cooking Hacks Pro"
  },
  {
    type: "info",
    message: "Research Agent added 3 new ideas from @competitor_tiktok",
    time: "6 hours ago",
    project: "FitLife Motivation"
  }
];

const topProjects = [
  {
    name: "WildTalks Animal Shorts",
    views: "45.2K",
    engagement: "6.0%",
    trend: "+$2.2K MTD",
    status: "active",
    emoji: "🦁"
  },
  {
    name: "FitLife Motivation", 
    views: "22.1K",
    engagement: "8.9%",
    trend: "+$1.8K MTD",
    status: "active",
    emoji: "🔥"
  },
  {
    name: "Mindful Moments",
    views: "67.3K", 
    engagement: "10.4%",
    trend: "+$980 MTD",
    status: "paused",
    emoji: "🧘"
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-factory-gradient">Content Factory Dashboard</h1>
          <p className="text-muted-foreground">Monitor your AI-powered content operations</p>
        </div>
        <Button variant="factory" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-factory-glow p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="status-active">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Projects */}
        <Card className="card-factory lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Top Performing Projects</h3>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {topProjects.map((project) => (
              <div key={project.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.emoji}</span>
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {project.engagement}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-success">{project.trend}</div>
                  <Badge 
                    variant="secondary" 
                    className={project.status === "active" ? "status-active" : "text-warning bg-warning/10"}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="card-factory p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "success" ? "bg-success" :
                    activity.type === "warning" ? "bg-warning" :
                    "bg-info"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <span className="text-xs">•</span>
                      <p className="text-xs text-primary">{activity.project}</p>
                    </div>
                  </div>
                </div>
                {index < recentActivity.length - 1 && (
                  <div className="border-b border-border/20" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}