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
  const [duration] = useState(70); // Total video duration
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const [audioMix, setAudioMix] = useState({ voice: 80, music: 60, sfx: 40 });

  // Frozen asset manifest from Assets stage
  const frozenAssetManifest = {
    script_id: "script_123",
    version: "v2",
    locked_at: "2024-09-27T13:45:00Z",
    voice: { url: "voice_v2.mp3", style: "Energetic", status: "ready" },
    music: { url: "music_v1.mp3", bpm: 120, mood: "Upbeat", status: "ready" },
    captions: { url: "captions_v1.srt", format: "srt", status: "ready" },
    broll: [
      { beat_id: "b1", url: "penguin_colony.mp4", status: "ready" },
      { beat_id: "b2", url: "ocean_waves.mp4", status: "stale" }
    ],
    graphics: [{ id: "g1", type: "emoji", url: "sparkle.png", status: "ready" }]
  };

  // Scene-based timeline data
  const scenes = [
    {
      id: 'scene_1',
      name: 'Opening Hook',
      startTime: 0,
      duration: 15,
      status: 'ready',
      tracks: [
        { type: 'voice', content: 'Opening Hook', status: 'ready', locked: true },
        { type: 'broll', content: 'penguin_colony.mp4', status: 'ready', locked: true },
        { type: 'captions', content: 'Did you know penguins...', status: 'ready', locked: false },
        { type: 'music', content: 'Background track', status: 'ready', locked: true }
      ]
    },
    {
      id: 'scene_2', 
      name: 'Main Content Beat 1',
      startTime: 15,
      duration: 25,
      status: 'stale',
      tracks: [
        { type: 'voice', content: 'Main Content Beat 1', status: 'ready', locked: true },
        { type: 'broll', content: 'ocean_waves.mp4', status: 'stale', locked: true },
        { type: 'captions', content: 'These amazing creatures...', status: 'ready', locked: false },
        { type: 'music', content: 'Background track', status: 'ready', locked: true }
      ]
    },
    {
      id: 'scene_3',
      name: 'Main Content Beat 2', 
      startTime: 40,
      duration: 20,
      status: 'ready',
      tracks: [
        { type: 'voice', content: 'Main Content Beat 2', status: 'ready', locked: true },
        { type: 'broll', content: 'ice_landscape.mp4', status: 'ready', locked: true },
        { type: 'captions', content: 'In the harsh Antarctic...', status: 'ready', locked: false },
        { type: 'music', content: 'Background track', status: 'ready', locked: true }
      ]
    },
    {
      id: 'scene_4',
      name: 'Call to Action',
      startTime: 60, 
      duration: 10,
      status: 'ready',
      tracks: [
        { type: 'voice', content: 'Call to Action', status: 'ready', locked: true },
        { type: 'broll', content: 'subscribe_overlay.mp4', status: 'ready', locked: true },
        { type: 'captions', content: 'Subscribe for more!', status: 'ready', locked: false },
        { type: 'music', content: 'Background track', status: 'ready', locked: true }
      ]
    }
  ];

  // QA Report from render analysis
  const qaReport = {
    overall_score: 8.7,
    issues: [
      { scene: 'scene_2', type: 'caption_sync', severity: 'medium', suggestion: 'Shift captions -0.5s', auto_fixable: true },
      { scene: 'scene_2', type: 'audio_mix', severity: 'low', suggestion: 'Reduce music by 10%', auto_fixable: true }
    ]
  };

  // Render status
  const renderStatus = {
    status: 'draft_rendered',
    version: 'v3',
    progress: 85,
    preview_url: 'preview_v3.mp4',
    last_rendered: '2 minutes ago'
  };

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
              {formatTime(duration)} Duration
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6 min-w-0">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {/* Frozen Asset Status */}
          <Card className="card-factory-glow p-4 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-medium">Asset Manifest v{frozenAssetManifest.version} Locked</p>
                  <p className="text-xs text-muted-foreground">Frozen at {frozenAssetManifest.locked_at}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {renderStatus.status.replace('_', ' ')} v{renderStatus.version}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {renderStatus.last_rendered}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Scene-Based Timeline Editor */}
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Scene Timeline</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" title="Regenerate Full Preview">
                  <RotateCcw className="h-4 w-4" />
                  <span className="ml-1 text-xs">Full Render</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4" />
                  <span className="ml-1 text-xs">Audio Mix</span>
                </Button>
              </div>
            </div>

            {/* Audio Mix Controls */}
            <div className="mb-6 p-4 bg-muted/20 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Audio Levels</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Voice</label>
                  <Slider
                    value={[audioMix.voice]}
                    onValueChange={([value]) => setAudioMix(prev => ({ ...prev, voice: value }))}
                    max={100}
                    step={1}
                    className="mt-1"
                  />
                  <span className="text-xs text-muted-foreground">{audioMix.voice}%</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Music</label>
                  <Slider
                    value={[audioMix.music]}
                    onValueChange={([value]) => setAudioMix(prev => ({ ...prev, music: value }))}
                    max={100}
                    step={1}
                    className="mt-1"
                  />
                  <span className="text-xs text-muted-foreground">{audioMix.music}%</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">SFX</label>
                  <Slider
                    value={[audioMix.sfx]}
                    onValueChange={([value]) => setAudioMix(prev => ({ ...prev, sfx: value }))}
                    max={100}
                    step={1}
                    className="mt-1"
                  />
                  <span className="text-xs text-muted-foreground">{audioMix.sfx}%</span>
                </div>
              </div>
            </div>

            {/* Scene Cards */}
            <div className="space-y-4">
              {scenes.map((scene) => (
                <div 
                  key={scene.id}
                  className={`border rounded-lg p-4 transition-all ${
                    selectedScene === scene.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedScene(scene.id)}
                >
                  {/* Scene Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        scene.status === 'ready' ? 'bg-green-500' : 
                        scene.status === 'stale' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <h4 className="font-medium">{scene.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {formatTime(scene.startTime)} - {formatTime(scene.startTime + scene.duration)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {scene.status === 'stale' && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Regenerate Scene
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Scissors className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Move className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Scene Tracks */}
                  <div className="grid grid-cols-1 gap-2">
                    {scene.tracks.map((track, trackIndex) => (
                      <div key={trackIndex} className="flex items-center gap-3 p-2 bg-muted/10 rounded">
                        <div className="w-16 text-xs font-medium capitalize">{track.type}</div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className={`h-6 flex-1 rounded px-2 flex items-center text-xs ${
                            track.type === 'voice' ? 'bg-blue-500/20 text-blue-700' :
                            track.type === 'broll' ? 'bg-purple-500/20 text-purple-700' :
                            track.type === 'captions' ? 'bg-yellow-500/20 text-yellow-700' :
                            'bg-green-500/20 text-green-700'
                          }`}>
                            {track.content}
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            track.status === 'ready' ? 'bg-green-500' : 
                            track.status === 'stale' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          {track.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
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
                      <p className="text-sm text-muted-foreground">{render.aspect} • {render.resolution}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Progress value={render.progress} className="w-24" />
                      <span className="text-sm">{render.progress}%</span>
                    </div>
                    {render.status === "ready" && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Asset Library */}
          <Card className="card-factory-glow p-6">
            <h2 className="text-xl font-semibold mb-4">Asset Library</h2>
            <Tabs defaultValue="voice" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="voice">Voice</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="captions">Captions</TabsTrigger>
                <TabsTrigger value="broll">B-roll</TabsTrigger>
                <TabsTrigger value="graphics">Graphics</TabsTrigger>
              </TabsList>
              <TabsContent value="voice" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Main Voiceover</h4>
                    <p className="text-sm text-muted-foreground mb-2">voice-main.mp3</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="music" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Background Track</h4>
                    <p className="text-sm text-muted-foreground mb-2">music-bg.mp3</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="captions" className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Dynamic Captions</h4>
                  <p className="text-sm text-muted-foreground mb-2">captions.srt</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="broll" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {["Gym Workout A", "Exercise Demo", "Results Before/After"].map((clip, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="aspect-video bg-muted rounded mb-2"></div>
                      <h4 className="font-medium text-sm">{clip}</h4>
                      <p className="text-xs text-muted-foreground">broll-{index + 1}.mp4</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="graphics" className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {["Logo Intro", "CTA Graphics"].map((graphic, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                        <Layers className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium text-sm">{graphic}</h4>
                      <p className="text-xs text-muted-foreground">{graphic.toLowerCase().replace(' ', '-')}.png</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6 min-w-0">
          {/* Production Progress */}
          <Card className="card-factory-glow p-4">
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Production Progress</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{renderStatus.progress}%</div>
                <Progress value={renderStatus.progress} className="w-full mb-2" />
                <p className="text-sm text-muted-foreground">Overall Completion</p>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Timeline</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rendering</span>
                  <span className="text-blue-600">{renderStatus.progress}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>QA Review</span>
                  <span className="text-yellow-600">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Export</span>
                  <span className="text-gray-500">Queued</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quality Score */}
          <Card className="card-factory-glow p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Quality Score</h3>
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">{qaReport.overall_score}</div>
              <div className="text-sm text-muted-foreground">/ 10</div>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Video Quality</span>
                  <span className="font-medium text-green-600">9.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Audio Sync</span>
                  <span className="font-medium text-yellow-600">8.1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transitions</span>
                  <span className="font-medium text-yellow-600">7.8</span>
                </div>
              </div>
            </div>
          </Card>

          {/* QA Report & Tasks */}
          <Card className="card-factory-glow p-4">
            <h3 className="font-semibold mb-3">Quality Report</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{qaReport.overall_score}/10</span>
                <Badge variant="secondary">Draft Quality</Badge>
              </div>
              
              {qaReport.issues.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Issues to Fix:</h4>
                  {qaReport.issues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                      <div className="text-xs">
                        <p className="font-medium">{issue.scene}: {issue.type.replace('_', ' ')}</p>
                        <p className="text-muted-foreground">{issue.suggestion}</p>
                      </div>
                      {issue.auto_fixable && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Auto-fix
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Tasks</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="line-through text-muted-foreground">Timeline arranged</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span>Preview rendering ({renderStatus.progress}%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <AlertCircle className="h-3 w-3 text-yellow-500" />
                    <span>Fix scene 2 issues</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Floating Next Button */}
      <NextButton nextStage="publishing" nextLabel="Next: Publishing" icon={Share2} />
    </div>
  );
};

export default Production;