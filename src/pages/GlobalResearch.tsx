import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Search, 
  TrendingUp, 
  Eye, 
  Users, 
  Share2,
  Play,
  Hash,
  Globe,
  Target,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Star,
  Award,
  Zap,
  Activity,
  Plus
} from "lucide-react";

const GlobalResearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedNiche, setSelectedNiche] = useState("all");

  // Mock global trend data
  const [industryTrends] = useState([
    {
      id: "1",
      hashtag: "#AIProductivity",
      category: "Productivity",
      platforms: ["TikTok", "YouTube", "Instagram"],
      growth: "+284%",
      volume: "2.1M",
      engagement: "8.4%",
      difficulty: "Medium",
      trending_score: 95,
      description: "AI tools for workplace productivity optimization"
    },
    {
      id: "2", 
      hashtag: "#HealthyMealPrep",
      category: "Health & Wellness",
      platforms: ["Instagram", "TikTok", "Pinterest"],
      growth: "+156%", 
      volume: "1.8M",
      engagement: "12.1%",
      difficulty: "Low",
      trending_score: 87,
      description: "Quick and nutritious meal preparation content"
    },
    {
      id: "3",
      hashtag: "#HomeWorkout",
      category: "Fitness",
      platforms: ["TikTok", "YouTube", "Instagram"],
      growth: "+203%",
      volume: "3.2M", 
      engagement: "9.7%",
      difficulty: "High",
      trending_score: 82,
      description: "Equipment-free fitness routines for home"
    }
  ]);

  const [competitorAnalysis] = useState([
    {
      id: "1",
      creator: "@ProductivityPro",
      platform: "TikTok",
      followers: "847K",
      avg_views: "234K",
      engagement_rate: "8.4%",
      content_type: "Productivity Tips",
      posting_frequency: "2x/day",
      best_performing: "Morning routine optimization",
      weakness: "Limited long-form content"
    },
    {
      id: "2",
      creator: "@FitnessJourney",
      platform: "Instagram", 
      followers: "1.2M",
      avg_views: "145K",
      engagement_rate: "11.2%",
      content_type: "Workout Demos",
      posting_frequency: "1x/day",
      best_performing: "15-minute HIIT workouts",
      weakness: "Inconsistent posting times"
    },
    {
      id: "3",
      creator: "@WellnessWisdom",
      platform: "YouTube",
      followers: "654K",
      avg_views: "89K", 
      engagement_rate: "6.8%",
      content_type: "Mindfulness & Mental Health",
      posting_frequency: "3x/week",
      best_performing: "Stress management techniques", 
      weakness: "Thumbnails lack visual appeal"
    }
  ]);

  const [viralContent] = useState([
    {
      id: "1",
      title: "5-Minute Morning Routine That Changed Everything",
      creator: "@MorningMotivation",
      platform: "TikTok",
      views: "4.2M",
      engagement: "12.8%",
      shares: "89K",
      hook: "Stop wasting your mornings...",
      why_viral: "Relatable problem + quick solution + visual transformation"
    },
    {
      id: "2",
      title: "Why I Stopped Using My Phone First Thing",
      creator: "@DigitalDetox",
      platform: "YouTube",
      views: "1.8M", 
      engagement: "15.4%",
      shares: "45K",
      hook: "Your phone is ruining your mornings...",
      why_viral: "Controversial stance + actionable advice + personal story"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low": return "text-green-600 bg-green-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "High": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendingIcon = (score: number) => {
    if (score >= 90) return <Star className="h-4 w-4 text-yellow-500" />;
    if (score >= 80) return <Award className="h-4 w-4 text-blue-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
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
            <h1 className="text-3xl font-bold text-factory-gradient">Global Research</h1>
            <p className="text-muted-foreground">Cross-industry trends, competitor analysis, and viral content insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            <Globe className="h-3 w-3 mr-1" />
            Industry-Wide Analysis
          </Badge>
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

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
        <div className="flex-1">
          <Input
            placeholder="Search trends, hashtags, or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </div>
        <select 
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-3 py-2 bg-background/50 border border-input rounded-md text-sm"
        >
          <option value="all">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="pinterest">Pinterest</option>
        </select>
        <select 
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          className="px-3 py-2 bg-background/50 border border-input rounded-md text-sm"
        >
          <option value="all">All Niches</option>
          <option value="productivity">Productivity</option>
          <option value="fitness">Fitness</option>
          <option value="wellness">Health & Wellness</option>
          <option value="tech">Technology</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="viral">Viral Content</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <div className="space-y-4">
            {industryTrends.map((trend) => (
              <Card key={trend.id} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTrendingIcon(trend.trending_score)}
                    <div>
                      <h3 className="text-xl font-semibold">{trend.hashtag}</h3>
                      <p className="text-muted-foreground">{trend.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{trend.category}</Badge>
                    <Badge className={getDifficultyColor(trend.difficulty)}>
                      {trend.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{trend.growth}</div>
                    <div className="text-sm text-muted-foreground">Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{trend.volume}</div>
                    <div className="text-sm text-muted-foreground">Monthly Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{trend.engagement}</div>
                    <div className="text-sm text-muted-foreground">Avg Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{trend.trending_score}</div>
                    <div className="text-sm text-muted-foreground">Trend Score</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Platforms</div>
                    <div className="flex gap-1">
                      {trend.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    High opportunity for {trend.category.toLowerCase()} content creators
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add to Project
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="mt-6">
          <div className="space-y-4">
            {competitorAnalysis.map((competitor) => (
              <Card key={competitor.id} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{competitor.creator}</h3>
                    <p className="text-muted-foreground">{competitor.content_type}</p>
                  </div>
                  <Badge variant="secondary">{competitor.platform}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{competitor.followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{competitor.avg_views}</div>
                    <div className="text-sm text-muted-foreground">Avg Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{competitor.engagement_rate}</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{competitor.posting_frequency}</div>
                    <div className="text-sm text-muted-foreground">Posting Freq</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-success mb-1">Best Performing</div>
                    <div className="text-sm">{competitor.best_performing}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-warning mb-1">Opportunity Gap</div>
                    <div className="text-sm">{competitor.weakness}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    Analyze posting patterns and content strategy
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-3 w-3 mr-1" />
                      Deep Dive
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Compare
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="viral" className="mt-6">
          <div className="space-y-4">
            {viralContent.map((content) => (
              <Card key={content.id} className="card-factory-glow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{content.title}</h3>
                    <p className="text-muted-foreground">by {content.creator}</p>
                  </div>
                  <Badge variant="secondary">{content.platform}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.views}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.engagement}</div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{content.shares}</div>
                    <div className="text-sm text-muted-foreground">Shares</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium mb-1">Hook</div>
                    <div className="text-sm italic">"{content.hook}"</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Why It Went Viral</div>
                    <div className="text-sm">{content.why_viral}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    High viral potential pattern identified
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Watch
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Adapt Format
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-6">
          <Card className="card-factory-glow p-6">
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keyword Research Tool</h3>
              <p className="text-muted-foreground mb-4">Advanced keyword analysis and search volume insights coming soon</p>
              <Button variant="outline">
                <Hash className="h-4 w-4 mr-2" />
                Request Early Access
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalResearch;