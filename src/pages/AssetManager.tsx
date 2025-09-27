import { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  Music, 
  Video, 
  Image, 
  Upload, 
  Download, 
  RefreshCw, 
  X, 
  Play,
  Volume2,
  ArrowLeft,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Package,
  Clapperboard,
  Check,
  Lock,
  Edit,
  Eye,
  Pause,
  RotateCcw,
  Settings,
  Trash2,
  Layers
} from "lucide-react";
import { NextButton } from "@/components/NextButton";

const AssetManager = () => {
  const navigate = useNavigate();
  const [selectedAssetType, setSelectedAssetType] = useState("voice");
  
  // Mock script data - in real app this would come from the locked script
  const scriptData = {
    id: "script_123",
    version: "v2",
    locked: true,
    beats: [
      { id: "b1", text: "Ready to transform your mornings? This 5-minute workout will energize your entire day!", duration: 8 },
      { id: "b2", text: "Start with 30 seconds of jumping jacks - get that heart pumping!", duration: 12 },
      { id: "b3", text: "Next, drop into push-ups. Modified or full - just keep moving!", duration: 10 },
      { id: "b4", text: "Don't forget to stretch! Your future self will thank you.", duration: 8 }
    ]
  };

  // Asset manifest with beat-level tracking
  const [assetManifest, setAssetManifest] = useState({
    script_id: "script_123",
    voice: { 
      status: 'ready', 
      progress: 100, 
      style: 'Energetic', 
      accent: 'US', 
      pacing: 165,
      versions: ['v1', 'v2'],
      current_version: 'v2',
      url: '/voice-sample.mp3'
    },
    music: { 
      status: 'generating', 
      progress: 65, 
      bpm: 128, 
      mood: 'Upbeat', 
      url: null,
      suggestions: [
        { id: 1, title: "Energetic Workout Beat", url: "/music1.mp3", duration: "2:30" },
        { id: 2, title: "Morning Motivation", url: "/music2.mp3", duration: "2:45" }
      ]
    },
    captions: { 
      status: 'ready', 
      progress: 100, 
      format: 'srt', 
      style: 'Dynamic',
      url: '/captions.srt',
      editable: true
    },
    broll: [
      { beat_id: "b1", status: 'approved', clips: [
        { id: 1, url: "/clip1.mp4", thumbnail: "/thumb1.jpg", source: "pexels", title: "Person stretching" },
        { id: 2, url: "/clip2.mp4", thumbnail: "/thumb2.jpg", source: "unsplash", title: "Morning sunrise" }
      ]},
      { beat_id: "b2", status: 'pending', clips: [] },
      { beat_id: "b3", status: 'stale', clips: [
        { id: 3, url: "/clip3.mp4", thumbnail: "/thumb3.jpg", source: "pexels", title: "Push-up exercise" }
      ]},
      { beat_id: "b4", status: 'failed', clips: [] }
    ],
    graphics: [
      { id: "g1", type: "emoji", status: "ready", url: "/emoji-pack.json" },
      { id: "g2", type: "title", status: "failed", url: null }
    ],
    overall_progress: 75
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'generating': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'stale': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'failed': return <X className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'ready': 'bg-green-500/10 text-green-500 border-green-500/20',
      'approved': 'bg-green-500/10 text-green-500 border-green-500/20',
      'generating': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'stale': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      'failed': 'bg-red-500/10 text-red-500 border-red-500/20',
      'idle': 'bg-muted/20 text-muted-foreground border-muted/20'
    };
    return variants[status] || variants.idle;
  };

  const calculateOverallProgress = () => {
    const voiceReady = assetManifest.voice.status === 'ready' ? 20 : 0;
    const musicReady = assetManifest.music.status === 'ready' ? 20 : assetManifest.music.progress * 0.2;
    const captionsReady = assetManifest.captions.status === 'ready' ? 20 : 0;
    const brollReady = assetManifest.broll.filter(b => b.status === 'approved').length * 10;
    const graphicsReady = assetManifest.graphics.filter(g => g.status === 'ready').length * 10;
    return Math.min(100, voiceReady + musicReady + captionsReady + brollReady + graphicsReady);
  };

  const getBlockingTasks = () => {
    const tasks = [];
    if (assetManifest.music.status === 'generating') tasks.push("Music track generating");
    if (assetManifest.broll.some(b => b.status === 'failed')) tasks.push("B-roll clips failed - regenerate");
    if (assetManifest.graphics.some(g => g.status === 'failed')) tasks.push("Graphics pack failed - regenerate");
    if (assetManifest.broll.some(b => b.status === 'stale')) tasks.push("B-roll clips stale - update");
    return tasks;
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
                Asset Manager
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-medium text-sm">
                  Stage 3/6
                </Badge>
              </h1>
              
              <p className="text-muted-foreground">Generate and manage production assets</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="border-muted">
                Script {scriptData.version} Locked
              </Badge>
            </div>
            <Badge variant="secondary" className="badge-factory">
              {calculateOverallProgress()}% Complete
            </Badge>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Affected
            </Button>
            <Button 
              onClick={() => navigate(`/projects/${useParams().projectId}/ideas/${useParams().ideaId}/production`)}
              variant="factory"
              disabled={calculateOverallProgress() < 100}
            >
              <Video className="h-4 w-4 mr-2" />
              Next: Production
            </Button>
          </div>
        </div>
      </div>

      {/* Production Pipeline */}
      <Card className="card-factory-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-factory-gradient">Production Pipeline</h3>
          <div className="flex items-center gap-2">
            <Progress value={calculateOverallProgress()} className="w-32" />
            <span className="text-sm text-muted-foreground">{calculateOverallProgress()}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          {[
            { id: 'idea', label: 'Idea', icon: Target, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}`, status: 'completed' },
            { id: 'script', label: 'Script', icon: FileText, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}/script`, status: 'completed' },
            { id: 'assets', label: 'Assets', icon: Package, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}/assets`, status: 'current' },
            { id: 'production', label: 'Production', icon: Clapperboard, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}/production`, status: 'pending' },
            { id: 'publishing', label: 'Publishing', icon: Upload, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}/publishing`, status: 'pending' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `/projects/${useParams().projectId}/ideas/${useParams().ideaId}/analytics`, status: 'locked' }
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
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 min-w-0">
          {/* Asset Type Cards - Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Voice Asset Card */}
            <Card 
              className={`card-factory-glow p-4 cursor-pointer transition-all ${
                selectedAssetType === 'voice' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAssetType('voice')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  <span className="font-medium">Voice</span>
                </div>
                {getStatusIcon(assetManifest.voice.status)}
              </div>
              <Progress value={assetManifest.voice.progress} className="mb-3" />
              <Badge variant="outline" className={getStatusBadge(assetManifest.voice.status)}>
                {assetManifest.voice.status === 'ready' ? 'Ready' : 'Generating'}
              </Badge>
            </Card>

            {/* Music Asset Card */}
            <Card 
              className={`card-factory-glow p-4 cursor-pointer transition-all ${
                selectedAssetType === 'music' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAssetType('music')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  <span className="font-medium">Music</span>
                </div>
                {getStatusIcon(assetManifest.music.status)}
              </div>
              <Progress value={assetManifest.music.progress} className="mb-3" />
              <Badge variant="outline" className={getStatusBadge(assetManifest.music.status)}>
                {assetManifest.music.progress}%
              </Badge>
            </Card>

            {/* Captions Asset Card */}
            <Card 
              className={`card-factory-glow p-4 cursor-pointer transition-all ${
                selectedAssetType === 'captions' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAssetType('captions')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Captions</span>
                </div>
                {getStatusIcon(assetManifest.captions.status)}
              </div>
              <Progress value={assetManifest.captions.progress} className="mb-3" />
              <Badge variant="outline" className={getStatusBadge(assetManifest.captions.status)}>
                Ready
              </Badge>
            </Card>

            {/* B-roll Asset Card */}
            <Card 
              className={`card-factory-glow p-4 cursor-pointer transition-all ${
                selectedAssetType === 'broll' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAssetType('broll')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span className="font-medium">B-roll</span>
                </div>
                <div className="flex items-center gap-1">
                  {assetManifest.broll.slice(0, 3).map((beat, i) => (
                    <div key={i} className="h-2 w-2 rounded-full">
                      {getStatusIcon(beat.status)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 mb-3">
                {assetManifest.broll.slice(0, 4).map((beat, i) => (
                  <div key={i} className="aspect-video bg-muted rounded text-xs flex items-center justify-center">
                    {beat.clips.length > 0 ? (
                      <img src={beat.clips[0].thumbnail} alt="" className="w-full h-full object-cover rounded" />
                    ) : (
                      <Video className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <Badge variant="outline" className={getStatusBadge('pending')}>
                {assetManifest.broll.filter(b => b.status === 'approved').length}/4 Clips
              </Badge>
            </Card>

            {/* Graphics Asset Card */}
            <Card 
              className={`card-factory-glow p-4 cursor-pointer transition-all ${
                selectedAssetType === 'graphics' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedAssetType('graphics')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  <span className="font-medium">Graphics</span>
                </div>
                {getStatusIcon(assetManifest.graphics.some(g => g.status === 'failed') ? 'failed' : 'ready')}
              </div>
              <div className="flex items-center gap-2 mb-3">
                {assetManifest.graphics.map((graphic, i) => (
                  <Badge key={i} variant="outline" className={getStatusBadge(graphic.status)}>
                    {graphic.type}
                  </Badge>
                ))}
              </div>
              <Badge variant="outline" className={getStatusBadge('failed')}>
                1 Failed
              </Badge>
            </Card>
          </div>

          {/* Raw Asset Generation & Approval - No Timeline Editing */}
          <Card className="card-factory-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Asset Generation & Approval</h2>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Generate • Curate • Approve per Scene
              </Badge>
            </div>
            <Tabs value={selectedAssetType} onValueChange={setSelectedAssetType} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Voice
                </TabsTrigger>
                <TabsTrigger value="music" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Music
                </TabsTrigger>
                <TabsTrigger value="captions" className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Captions
                </TabsTrigger>
                <TabsTrigger value="broll" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  B-roll
                </TabsTrigger>
                <TabsTrigger value="graphics" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Graphics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="voice" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Voice Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Style</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.voice.style}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Accent</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.voice.accent}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Pacing</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.voice.pacing} WPM</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Version</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.voice.current_version}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Version History</label>
                        <div className="flex gap-2">
                          {assetManifest.voice.versions.map((version) => (
                            <Button key={version} variant="outline" size="sm">
                              {version}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Preview & Controls
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">voice-sample.mp3</span>
                          <Badge variant="secondary">2:30</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Custom
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="music" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Music Requirements
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Mood</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.music.mood}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">BPM</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.music.bpm}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Duration</label>
                            <div className="text-sm text-muted-foreground">2:30</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Badge variant="outline" className={getStatusBadge(assetManifest.music.status)}>
                              {assetManifest.music.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Alternative Suggestions</h4>
                        <div className="space-y-2">
                          {assetManifest.music.suggestions.map((track) => (
                            <div key={track.id} className="flex items-center justify-between bg-muted/20 rounded-lg p-3">
                              <div>
                                <div className="text-sm font-medium">{track.title}</div>
                                <div className="text-xs text-muted-foreground">{track.duration}</div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Check className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Generation Progress
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Generating upbeat track...</span>
                          <Badge variant="secondary">{assetManifest.music.progress}%</Badge>
                        </div>
                        <Progress value={assetManifest.music.progress} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" disabled={assetManifest.music.status === 'generating'}>
                          <RefreshCw className={`h-4 w-4 mr-2 ${assetManifest.music.status === 'generating' ? 'animate-spin' : ''}`} />
                          {assetManifest.music.status === 'generating' ? 'Generating...' : 'Regenerate'}
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Custom
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="captions" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Caption Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Style</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.captions.style}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Format</label>
                            <div className="text-sm text-muted-foreground">{assetManifest.captions.format.toUpperCase()}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Timing</label>
                            <div className="text-sm text-muted-foreground">Word-level sync</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Badge variant="outline" className={getStatusBadge(assetManifest.captions.status)}>
                              Ready
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Emphasis Keywords</label>
                        <div className="flex flex-wrap gap-2">
                          {["workout", "results", "transform", "energize"].map((word) => (
                            <Badge key={word} variant="secondary">{word}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Caption Editor
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4 max-h-64 overflow-y-auto">
                        <div className="text-sm font-mono space-y-2">
                          <div className="border-l-2 border-primary pl-2">
                            <div className="text-xs text-muted-foreground">00:00 - 00:08</div>
                            <div>Ready to transform your mornings?</div>
                          </div>
                          <div className="border-l-2 border-muted pl-2">
                            <div className="text-xs text-muted-foreground">00:08 - 00:20</div>
                            <div>This 5-minute workout will energize your entire day!</div>
                          </div>
                          <div className="border-l-2 border-muted pl-2">
                            <div className="text-xs text-muted-foreground">00:20 - 00:32</div>
                            <div>Start with 30 seconds of jumping jacks...</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="broll" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Beat-by-Beat B-roll Management
                    </h3>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {scriptData.beats.map((beat, index) => {
                      const beatAsset = assetManifest.broll.find(b => b.beat_id === beat.id);
                      return (
                        <Card key={beat.id} className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">Beat {index + 1}</Badge>
                                <Badge variant="outline" className={getStatusBadge(beatAsset?.status || 'pending')}>
                                  {beatAsset?.status || 'Pending'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{beat.duration}s</span>
                              </div>
                              <p className="text-sm mb-3">{beat.text}</p>
                              
                              {beatAsset?.clips.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                  {beatAsset.clips.map((clip) => (
                                    <div key={clip.id} className="relative group">
                                      <img 
                                        src={clip.thumbnail} 
                                        alt={clip.title} 
                                        className="w-full aspect-video object-cover rounded cursor-pointer"
                                      />
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                        <div className="flex gap-1">
                                          <Button variant="ghost" size="sm">
                                            <Play className="h-3 w-3 text-white" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Trash2 className="h-3 w-3 text-white" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div className="absolute bottom-1 left-1 bg-black/80 text-white text-xs px-1 rounded">
                                        {clip.source}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                                  <Video className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground mb-3">No clips assigned</p>
                                  <div className="flex justify-center gap-2">
                                    <Button variant="outline" size="sm">
                                      <RefreshCw className="h-3 w-3 mr-2" />
                                      Generate
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Upload className="h-3 w-3 mr-2" />
                                      Upload
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="graphics" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Graphics Pack
                    </h3>
                    <div className="space-y-4">
                      {assetManifest.graphics.map((graphic) => (
                        <Card key={graphic.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Image className="h-4 w-4" />
                              <span className="font-medium capitalize">{graphic.type} Pack</span>
                            </div>
                            <Badge variant="outline" className={getStatusBadge(graphic.status)}>
                              {graphic.status}
                            </Badge>
                          </div>
                          
                          {graphic.status === 'ready' ? (
                            <div className="grid grid-cols-4 gap-2">
                              {[1,2,3,4].map((i) => (
                                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                  <span className="text-lg">😊</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-red-200 rounded-lg p-4 text-center">
                              <AlertCircle className="h-6 w-6 mx-auto text-red-500 mb-2" />
                              <p className="text-sm text-red-600 mb-2">Generation failed</p>
                              <Button variant="outline" size="sm">
                                <RefreshCw className="h-3 w-3 mr-2" />
                                Retry
                              </Button>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Graphics Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Style Pack</label>
                            <div className="text-sm text-muted-foreground">Modern Fitness</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Color Scheme</label>
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded bg-orange-500"></div>
                              <div className="w-6 h-6 rounded bg-blue-500"></div>
                              <div className="w-6 h-6 rounded bg-green-500"></div>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Animation</label>
                            <div className="text-sm text-muted-foreground">Dynamic entrance</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate All
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Custom
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Streamlined Progress & Quality Sidebar */}
        <div className="lg:col-span-1 space-y-4 min-w-0">
          <div className="sticky top-6 space-y-4">
            {/* Asset Progress */}
            <Card className="card-factory-glow p-4">
              <h3 className="font-semibold mb-3 text-factory-gradient">Asset Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{calculateOverallProgress()}%</span>
                </div>
                <Progress value={calculateOverallProgress()} />
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="h-3 w-3" />
                      <span>Voice</span>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(assetManifest.voice.status)}>
                      Ready
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music className="h-3 w-3" />
                      <span>Music</span>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(assetManifest.music.status)}>
                      {assetManifest.music.progress}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-3 w-3" />
                      <span>Captions</span>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(assetManifest.captions.status)}>
                      Ready
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-3 w-3" />
                      <span>B-roll</span>
                    </div>
                    <Badge variant="outline" className={getStatusBadge('pending')}>
                      {assetManifest.broll.filter(b => b.status === 'approved').length}/4
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image className="h-3 w-3" />
                      <span>Graphics</span>
                    </div>
                    <Badge variant="outline" className={getStatusBadge('failed')}>
                      1 Failed
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Score */}
            <Card className="card-factory-glow p-4">
              <h3 className="font-semibold mb-3 text-factory-gradient">Quality Score</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-factory-gradient">8.2</div>
                <div className="text-sm text-muted-foreground">out of 10</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Audio Quality</span>
                  <span className="text-green-500 font-medium">9.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Visual Coverage</span>
                  <span className="text-yellow-500 font-medium">6.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Brand Alignment</span>
                  <span className="text-green-500 font-medium">8.9</span>
                </div>
              </div>
            </Card>

            {/* Blocking Tasks */}
            <Card className="card-factory-glow p-4">
              <h3 className="font-semibold mb-3 text-factory-gradient">Blocking Tasks</h3>
              <div className="space-y-2 text-sm">
                {getBlockingTasks().length === 0 ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-3 w-3" />
                    <span>All tasks complete!</span>
                  </div>
                ) : (
                  getBlockingTasks().map((task, index) => (
                    <div key={index} className="flex items-center gap-2 text-orange-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{task}</span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Next Button */}
      <NextButton nextStage="production" nextLabel="Next: Production" icon={Video} />
    </div>
  );
};

export default AssetManager;