import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Lock,
  Unlock,
  ArrowLeft
} from "lucide-react";

const Assembly = () => {
  const navigate = useNavigate();
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
            <h1 className="text-3xl font-bold text-factory-gradient">Assembly Studio</h1>
            <p className="text-muted-foreground">Stage 4: Post-production timeline editor and video rendering</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Preview Window */}
        <div className="xl:col-span-2 space-y-4">
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

            {/* Video Player */}
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
          </Card>
        </div>

        {/* Timeline Panel */}
        <div className="xl:col-span-2 space-y-4">
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
        </div>
      </div>

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
  );
};

export default Assembly;