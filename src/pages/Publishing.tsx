import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Upload, 
  Calendar as CalendarIcon, 
  Clock, 
  Share2, 
  Target,
  TrendingUp,
  Users,
  Hash,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Play,
  Edit,
  ArrowLeft,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";
import { PipelineNav } from "@/components/PipelineNav";
import { NextButton } from "@/components/NextButton";

const Publishing = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [autoSchedule, setAutoSchedule] = useState(true);
  
  const [platforms] = useState([
    {
      id: "tiktok",
      name: "TikTok",
      handle: "@fitlife_motivation",
      status: "connected",
      video: "tiktok-9x16.mp4",
      optimalTimes: ["6:00 AM", "7:00 PM", "9:00 PM"]
    },
    {
      id: "youtube", 
      name: "YouTube Shorts",
      handle: "@FitLifeMotivation",
      status: "connected", 
      video: "youtube-9x16.mp4",
      optimalTimes: ["2:00 PM", "4:00 PM", "8:00 PM"]
    },
    {
      id: "instagram",
      name: "Instagram Reels", 
      handle: "@fitlife.motivation",
      status: "connected",
      video: "instagram-9x16.mp4", 
      optimalTimes: ["11:00 AM", "1:00 PM", "5:00 PM"]
    },
    {
      id: "youtube-long",
      name: "YouTube",
      handle: "@FitLifeMotivation", 
      status: "pending",
      video: "youtube-16x9.mp4",
      optimalTimes: ["12:00 PM", "3:00 PM", "6:00 PM"]
    }
  ]);

  const [scheduledPosts] = useState([
    {
      id: "1",
      title: "5 Minute Morning Workout",
      platforms: ["tiktok", "instagram"],
      scheduledTime: "2025-09-26 18:00",
      status: "scheduled",
      estimatedReach: "2.1K - 8.5K"
    },
    {
      id: "2", 
      title: "Healthy Meal Prep Hacks",
      platforms: ["youtube", "youtube-long"],
      scheduledTime: "2025-09-27 14:00", 
      status: "publishing",
      estimatedReach: "1.8K - 6.2K"
    },
    {
      id: "3",
      title: "Gym Anxiety Solutions", 
      platforms: ["tiktok"],
      scheduledTime: "2025-09-27 19:00",
      status: "draft",
      estimatedReach: "1.5K - 5.1K"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-green-500";
      case "pending": return "bg-yellow-500"; 
      case "scheduled": return "bg-blue-500";
      case "publishing": return "bg-purple-500";
      case "published": return "bg-green-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled": return <Clock className="h-4 w-4" />;
      case "publishing": return <Upload className="h-4 w-4" />;
      case "published": return <CheckCircle className="h-4 w-4" />;
      case "failed": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Unified Header with Integrated Pipeline */}
      <div className="space-y-6">
        {/* Project & Idea Context */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
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
                <Upload className="h-6 w-6" />
                Publishing Hub
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage 5/6
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Schedule and distribute content across platforms</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="badge-factory">
              <Target className="h-3 w-3 mr-1" />
              4 Platforms Connected
            </Badge>
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Content Calendar
            </Button>
            <Button variant="factory">
              <Upload className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
            <Button 
              onClick={() => navigate(`/projects/${projectId}/ideas/${ideaId}/analytics`)}
              className="bg-gradient-factory text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Next: Analytics
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Publishing Setup */}
          <div className="space-y-6">
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Content Publishing</h2>
              <Badge variant="outline">Video: 5-minute-morning-workout.mp4</Badge>
            </div>

            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="analytics">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="platforms" className="mt-6">
                <div className="space-y-4">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(platform.status)}`} />
                        <div>
                          <p className="font-medium">{platform.name}</p>
                          <p className="text-sm text-muted-foreground">{platform.handle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{platform.video}</Badge>
                        <Switch defaultChecked={platform.status === "connected"} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="content" className="mt-6">
                <div className="space-y-6">
                  {/* Global Settings */}
                  <div>
                    <h3 className="font-semibold mb-3">Global Caption</h3>
                    <Textarea
                      placeholder="Write your main caption here..."
                      defaultValue="🔥 Transform your mornings with this 5-minute workout routine! No equipment needed - just you and 5 minutes to start your day strong. 💪

Who's trying this tomorrow? Drop a 🔥 in the comments!"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Global Hashtags</h3>
                    <Input 
                      placeholder="#fitness #workout #morning #motivation #health"
                      defaultValue="#fitness #workout #morning #motivation #health #fitlife #transform #noequipment #quickworkout #morningroutine"
                    />
                  </div>

                  {/* Platform-Specific */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Platform-Specific Captions</h3>
                    
                    <div className="space-y-3">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">TikTok</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <Textarea 
                          placeholder="TikTok-specific caption..."
                          defaultValue="POV: You only have 5 minutes but want to feel productive ✨ This quick morning routine will get your blood pumping! #morningworkout #quickfitness"
                          className="text-sm"
                        />
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">YouTube Shorts</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <Textarea 
                          placeholder="YouTube-specific caption..."
                          defaultValue="🔥 5-Minute Morning Workout - No Equipment Needed!

Start your day right with this quick and effective morning routine. Perfect for busy schedules!

Subscribe for more quick fitness tips! 👆"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scheduling" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Auto-Schedule</h3>
                      <p className="text-sm text-muted-foreground">Let AI choose optimal posting times</p>
                    </div>
                    <Switch checked={autoSchedule} onCheckedChange={setAutoSchedule} />
                  </div>

                  {autoSchedule ? (
                    <div className="space-y-4">
                      <h4 className="font-medium">Recommended Posting Times</h4>
                      {platforms.filter(p => p.status === "connected").map((platform) => (
                        <div key={platform.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <span className="font-medium">{platform.name}</span>
                          <div className="flex items-center gap-2">
                            {platform.optimalTimes.map((time, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-medium">Custom Schedule</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Time</label>
                          <Input type="time" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Expected Performance</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-medium">Estimated Reach</span>
                      </div>
                      <p className="text-2xl font-bold">2.1K - 8.5K</p>
                      <p className="text-xs text-muted-foreground">Based on similar content</p>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Engagement Rate</span>
                      </div>
                      <p className="text-2xl font-bold">6.2% - 9.8%</p>
                      <p className="text-xs text-muted-foreground">Historical average</p>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Platform Breakdown</h4>
                    {platforms.filter(p => p.status === "connected").map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <span className="font-medium">{platform.name}</span>
                        <div className="text-right">
                          <p className="font-medium">1.2K - 3.1K views</p>
                          <p className="text-xs text-muted-foreground">7.5% engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

          {/* Scheduled Posts Overview */}
          <Card className="card-factory-glow p-6">
            <h2 className="text-xl font-semibold mb-6">Scheduled Posts</h2>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.scheduledTime}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platforms.find(p => p.id === platform)?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`} />
                      {getStatusIcon(post.status)}
                      <Badge variant="secondary">{post.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.estimatedReach}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sticky Quality & Progress Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            {/* Progress Overview */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Publishing Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Ready to Publish</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Content Ready
                    </span>
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Captions Set
                    </span>
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Schedule Set
                    </span>
                    <Badge variant="secondary" className="text-xs">Auto</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Platforms Connected
                    </span>
                    <Badge variant="secondary" className="text-xs">3/4</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Score */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Content Score</h3>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">9.1/10</div>
                  <div className="text-xs text-muted-foreground">Publishing Readiness</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Caption Quality</span>
                    <span className="font-medium text-green-600">9.4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Hashtag Relevance</span>
                    <span className="font-medium text-green-600">8.9</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Timing Optimization</span>
                    <span className="font-medium text-green-600">9.0</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="card-factory-glow p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
              </div>
            </Card>

            {/* Publishing Rules */}
            <Card className="card-factory-glow p-4">
              <h3 className="font-semibold mb-4">Publishing Rules</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-hashtag optimization</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cross-platform staggering</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-retry on failure</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Performance tracking</span>
                  <Switch defaultChecked />
                </div>
            </div>
          </Card>

          {/* First Comment */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-4">First Comment</h3>
            <Textarea 
              placeholder="Pin a comment to appear first..."
              defaultValue="Thanks for watching! What's your favorite morning workout? Let me know below! 👇"
              className="text-sm"
            />
          </Card>
        </div>
      </div>

      {/* Scheduled Posts */}
      <Card className="card-factory-glow p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(post.status)}
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Scheduled: {post.scheduledTime}</span>
                      <span>•</span>
                      <span>Reach: {post.estimatedReach}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {post.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
          </div>
        </div>
      </div>
      
      {/* Floating Next Button */}
      <NextButton nextStage="analytics" nextLabel="View Analytics" icon={BarChart3} />
    </div>
  );
};

export default Publishing;