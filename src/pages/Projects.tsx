import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Eye, 
  Heart, 
  TrendingUp,
  Lightbulb,
  FileText,
  Play,
  Calendar,
  Grid3X3,
  List,
  Filter
} from "lucide-react";

const projectStats = [
  { label: "Total Projects", value: "5", trend: "+2", icon: Grid3X3 },
  { label: "Active Projects", value: "3", trend: "+1", icon: TrendingUp },
  { label: "Total Views (MTD)", value: "293.9K", trend: "+12.3K", icon: Eye },
  { label: "Content Output (30d)", value: "109", trend: "+23", icon: Play },
];

const projects = [
  {
    id: "fitlife",
    name: "FitLife Motivation",
    emoji: "🔥",
    tags: ["fitness", "wellness"],
    status: "active",
    created: "9/19/2025",
    pipeline: {
      ideas: 0,
      scripts: 8,
      videos: 7,
      live: 11
    },
    metrics: {
      views: "22.1K",
      engagement: "8.9%"
    },
    automation: 36,
    lastUpdate: "Just now"
  },
  {
    id: "mindful",
    name: "Mindful Moments", 
    emoji: "🧘",
    tags: ["mindfulness", "wellness"],
    status: "paused",
    created: "9/19/2025",
    pipeline: {
      ideas: 0,
      scripts: 8,
      videos: 9,
      live: 41
    },
    metrics: {
      views: "67.3K",
      engagement: "10.4%"
    },
    automation: 58,
    lastUpdate: "3d ago"
  },
  {
    id: "wildtalks",
    name: "WildTalks Animal Shorts",
    emoji: "🦁", 
    tags: ["animals", "humor", "+1"],
    status: "active",
    created: "9/19/2025",
    pipeline: {
      ideas: 9,
      scripts: 18,
      videos: 8,
      live: 16
    },
    metrics: {
      views: "35.5K",
      engagement: "6.0%"
    },
    automation: 59,
    lastUpdate: "6d ago",
    revenue: "+$2.2K MTD"
  },
  {
    id: "techtips",
    name: "TechTips Daily",
    emoji: "💻",
    tags: ["technology", "tutorials", "+1"],
    status: "active", 
    created: "9/19/2025",
    pipeline: {
      ideas: 0,
      scripts: 8,
      videos: 7,
      live: 18
    },
    metrics: {
      views: "Not available",
      engagement: "Not available"
    },
    automation: 0,
    lastUpdate: "Not available"
  },
  {
    id: "cooking",
    name: "Cooking Hacks Pro",
    emoji: "👨‍🍳",
    tags: ["cooking", "food"],
    status: "paused",
    created: "9/19/2025", 
    pipeline: {
      ideas: 0,
      scripts: 8,
      videos: 7,
      live: 23
    },
    metrics: {
      views: "Not available", 
      engagement: "Not available"
    },
    automation: 0,
    lastUpdate: "Not available"
  }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesNiche = nicheFilter === "all" || project.tags.some(tag => tag.includes(nicheFilter));
    return matchesSearch && matchesStatus && matchesNiche;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-factory-gradient">Projects</h1>
          <p className="text-muted-foreground">Your content factory workspace directory</p>
        </div>
        <Button variant="factory" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat) => (
          <Card key={stat.label} className="card-factory-glow p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <Badge variant="secondary" className="status-active">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="card-factory p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-factory"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={nicheFilter} onValueChange={setNicheFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Niches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Niches</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Projects Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredProjects.map((project) => (
          <Card key={project.id} className="card-factory-glow p-6 cursor-pointer hover:scale-[1.02] transition-transform">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{project.emoji}</span>
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">Created {project.created}</p>
                </div>
              </div>
              <Badge 
                variant="secondary"
                className={project.status === "active" ? "status-active" : "text-warning bg-warning/10"}
              >
                {project.status}
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Pipeline Stats */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-muted-foreground">Pipeline</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 mb-1">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">{project.pipeline.ideas}</div>
                  <div className="text-xs text-muted-foreground">Ideas</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 mb-1">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">{project.pipeline.scripts}</div>
                  <div className="text-xs text-muted-foreground">Scripts</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 mb-1">
                    <Play className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">{project.pipeline.videos}</div>
                  <div className="text-xs text-muted-foreground">Videos</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-500 mb-1">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold">{project.pipeline.live}</div>
                  <div className="text-xs text-muted-foreground">Live</div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {project.metrics.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {project.metrics.engagement}
                </span>
              </div>
              {project.revenue && (
                <div className="text-success font-medium">{project.revenue}</div>
              )}
            </div>

            {/* Automation & Update */}
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">AI Automation</span>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full progress-factory"
                      style={{ width: `${project.automation}%` }}
                    />
                  </div>
                  <span className="text-primary font-medium">{project.automation}%</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {project.lastUpdate}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}