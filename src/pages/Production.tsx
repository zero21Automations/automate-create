import { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Scissors,
  Move,
  RotateCcw,
  Download,
  Upload,
  Layers,
  Monitor,
  Smartphone,
  Square,
  Eye,
  EyeOff,
  Unlock,
  ArrowLeft,
  Share2,
  Video,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  FileText,
  Package,
  Clapperboard,
  Check,
  Lock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NextButton } from "@/components/NextButton";

const Production = () => {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(150); // 2:30 in seconds
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const [tracks] = useState([
    {
      id: "voice",
      type: "audio",
      name: "Voice Track",
      duration: 150,
      color: "bg-blue-500",
      visible: true,
      locked: false,
      assets: [
        { start: 0, end: 150, name: "Main Voiceover", file: "voice-main.mp3" }
      ]
    },
    {
      id: "music", 
      type: "audio",
      name: "Background Music",
      duration: 150,
      color: "bg-green-500",
      visible: true,
      locked: false,
      assets: [
        { start: 0, end: 150, name: "Upbeat Electronic", file: "music-bg.mp3" }
      ]
    },
    {
      id: "video",
      type: "video", 
      name: "Main Video",
      duration: 150,
      color: "bg-purple-500",
      visible: true,
      locked: false,
      assets: [
        { start: 0, end: 45, name: "Gym Workout A", file: "broll-1.mp4" },
        { start: 45, end: 90, name: "Exercise Demo", file: "broll-2.mp4" },
        { start: 90, end: 150, name: "Results Before/After", file: "broll-3.mp4" }
      ]
    },
    {
      id: "captions",
      type: "text",
      name: "Captions", 
      duration: 150,
      color: "bg-yellow-500",
      visible: true,
      locked: false,
      assets: [
        { start: 0, end: 150, name: "Dynamic Captions", file: "captions.srt" }
      ]
    },
    {
      id: "graphics",
      type: "graphics",
      name: "Graphics Overlay",
      duration: 150, 
      color: "bg-red-500",
      visible: true,
      locked: false,
      assets: [
        { start: 5, end: 15, name: "Logo Intro", file: "logo.png" },
        { start: 135, end: 150, name: "CTA Graphics", file: "cta-overlay.png" }
      ]
    }
  ]);

  const [renderQueue] = useState([
    {
      platform: "TikTok",
      aspect: "9:16",
      resolution: "1080x1920",
      status: "ready",
      progress: 100
    },
    {
      platform: "YouTube Shorts", 
      aspect: "9:16",
      resolution: "1080x1920",
      status: "rendering",
      progress: 75
    },
    {
      platform: "Instagram Reels",
      aspect: "9:16", 
      resolution: "1080x1920",
      status: "queued",
      progress: 0
    },
    {
      platform: "YouTube",
      aspect: "16:9",
      resolution: "1920x1080", 
      status: "queued",
      progress: 0
    }
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-500";
      case "rendering": return "bg-blue-500";
      case "queued": return "bg-gray-500";
      default: return "bg-gray-500";
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
                <Video className="h-6 w-6" />
                Production Studio
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage 4/6
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Post-production timeline editor and video rendering</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="badge-factory">
              2:30 Duration
            </Badge>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Project
            </Button>
            <Button variant="factory">
              <Upload className="h-4 w-4 mr-2" />
              Render All
            </Button>
            <Button 
              onClick={() => navigate(`/projects/${projectId}/ideas/${ideaId}/publishing`)}
              className="bg-gradient-factory text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Next: Publishing
            </Button>
          </div>
        </div>
      </div>

      {/* Production Pipeline */}
      <Card className="card-factory-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-factory-gradient">Production Pipeline</h3>
          <div className="flex items-center gap-2">
            <Progress value={75} className="w-32" />
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          {[
            { id: 'idea', label: 'Idea', icon: Target, path: `/projects/${projectId}/ideas/${ideaId}`, status: 'completed' },
            { id: 'script', label: 'Script', icon: FileText, path: `/projects/${projectId}/ideas/${ideaId}/script`, status: 'completed' },
            { id: 'assets', label: 'Assets', icon: Package, path: `/projects/${projectId}/ideas/${ideaId}/assets`, status: 'completed' },
            { id: 'production', label: 'Production', icon: Clapperboard, path: `/projects/${projectId}/ideas/${ideaId}/production`, status: 'current' },
            { id: 'publishing', label: 'Publishing', icon: Upload, path: `/projects/${projectId}/ideas/${ideaId}/publishing`, status: 'pending' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `/projects/${projectId}/ideas/${ideaId}/analytics`, status: 'locked' }
          ].map((stage, index) => {
            const Icon = stage.icon;
            const isActive = stage.status === 'current';
            const isCompleted = stage.status === 'completed';
            const isLocked = stage.status === 'locked';
            
            return (
              <div key={stage.id} className="flex items-center gap-2 min-w-0">
                <Button
                  asChild
                  variant={isActive ? "default" : isCompleted ? "secondary" : "ghost"}
                  size="sm"
                  className={`min-w-[100px] justify-start relative z-10 ${
                    isActive ? "bg-primary text-primary-foreground shadow-lg" : ""
                  } ${isCompleted ? "bg-secondary text-secondary-foreground" : ""} ${
                    isLocked ? "opacity-50" : "hover:bg-muted"
                  }`}
                >
                  <NavLink to={stage.path} className="flex items-center w-full">
                    <Icon className="h-4 w-4 mr-2" />
                    {stage.label}
                    {isCompleted && <Check className="h-3 w-3 ml-auto" />}
                    {isLocked && <Lock className="h-3 w-3 ml-auto" />}
                  </NavLink>
                </Button>
                {index < 5 && (
                  <div className={`h-px w-8 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} style={{ pointerEvents: 'none' }} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6">
          {/* Preview Window */}
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Video Preview</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Video Player */}
              <div>
                <div className="aspect-[9/16] bg-black rounded-lg mb-4 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <Play className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Preview Window</p>
                    <p className="text-xs opacity-50">1080x1920 • 9:16</p>
                  </div>
                  
                  {/* Timeline scrubber overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <span>{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-white/20 rounded-full">
                          <div 
                            className="h-1 bg-white rounded-full transition-all duration-100"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="sm">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Volume2 className="h-4 w-4" />
                  <Slider 
                    value={[75]} 
                    max={100} 
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Preview Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Preview Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform Format</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">TikTok</Button>
                      <Button variant="outline" size="sm">Instagram</Button>
                      <Button variant="outline" size="sm">YouTube</Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Quality</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">1080p</Button>
                      <Button variant="outline" size="sm">720p</Button>
                      <Button variant="outline" size="sm">480p</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline Panel */}
          <div className="space-y-4">
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Timeline Editor</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Scissors className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Move className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {/* Time ruler */}
              <div className="flex items-center text-xs text-muted-foreground border-b pb-2">
                <div className="w-32"></div>
                <div className="flex-1 flex justify-between">
                  <span>0:00</span>
                  <span>0:30</span>
                  <span>1:00</span>
                  <span>1:30</span>
                  <span>2:00</span>
                  <span>2:30</span>
                </div>
              </div>

              {/* Tracks */}
              {tracks.map((track) => (
                <div 
                  key={track.id} 
                  className={`flex items-center gap-3 p-2 rounded-lg border ${
                    selectedTrack === track.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  {/* Track Controls */}
                  <div className="w-32 flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const newTracks = tracks.map(t => 
                          t.id === track.id ? { ...t, visible: !t.visible } : t
                        );
                      }}
                    >
                      {track.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      {track.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    </Button>
                    <span className="text-xs font-medium truncate">{track.name}</span>
                  </div>

                  {/* Track Timeline */}
                  <div className="flex-1 h-8 bg-muted/20 rounded relative">
                    {track.assets.map((asset, index) => (
                      <div
                        key={index}
                        className={`absolute top-0 h-full rounded ${track.color} opacity-80 border border-white/20`}
                        style={{
                          left: `${(asset.start / duration) * 100}%`,
                          width: `${((asset.end - asset.start) / duration) * 100}%`
                        }}
                        title={asset.name}
                      >
                        <div className="p-1 text-xs text-white truncate">
                          {asset.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Render Queue */}
          <Card className="card-factory-glow p-6">
            <h2 className="text-xl font-semibold mb-4">Render Queue</h2>
            <div className="space-y-3">
              {renderQueue.map((render, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(render.status)}`} />
                    <div>
                      <p className="font-medium">{render.platform}</p>
                      <p className="text-sm text-muted-foreground">{render.resolution} • {render.aspect}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{render.status}</Badge>
                    {render.status === "rendering" && (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${render.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{render.progress}%</span>
                      </div>
                    )}
                    {render.status === "ready" && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Add Custom Export
            </Button>
          </Card>

          {/* Asset Library */}
          <Card className="card-factory-glow p-6">
            <h2 className="text-xl font-semibold mb-4">Asset Library</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Assets</TabsTrigger>
                <TabsTrigger value="voice">Voice</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="graphics">Graphics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Asset thumbnails would go here */}
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                    <Layers className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Sticky Quality & Progress Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <div className="sticky top-6 space-y-4">
            {/* Progress Overview */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Production Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Completion</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Timeline Complete
                    </span>
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Rendering Queue
                    </span>
                    <Badge variant="secondary" className="text-xs">75%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      TikTok Export
                    </span>
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      YouTube Export
                    </span>
                    <Badge variant="secondary" className="text-xs">0%</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Score */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Quality Score</h3>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8.7/10</div>
                  <div className="text-xs text-muted-foreground">Production Quality</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Video Quality</span>
                    <span className="font-medium text-green-600">9.2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Audio Sync</span>
                    <span className="font-medium text-green-600">8.9</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Transitions</span>
                    <span className="font-medium text-yellow-600">7.8</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Tasks */}
            <Card className="card-factory-glow p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Tasks</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="line-through text-muted-foreground">Import all assets</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="line-through text-muted-foreground">Arrange timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>Complete rendering queue</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                  <span>Review final output</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                  <span>Export for all platforms</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating Next Button */}
      <NextButton nextStage="publishing" nextLabel="Next: Publishing" icon={Share2} />
    </div>
    </div>
  );
};

export default Production;