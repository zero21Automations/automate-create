import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Check, 
  X, 
  Play,
  Volume2,
  ArrowLeft
} from "lucide-react";

const AssetManager = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState({
    voice: { status: 'ready', progress: 100, url: '/voice-sample.mp3' },
    music: { status: 'generating', progress: 65, url: null },
    captions: { status: 'ready', progress: 100, url: '/captions.srt' },
    broll: { status: 'idle', progress: 0, url: null },
    graphics: { status: 'failed', progress: 0, url: null }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <Check className="h-4 w-4 text-green-500" />;
      case 'generating': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed': return <X className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'generating': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-muted';
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
            <h1 className="text-3xl font-bold text-factory-gradient">Asset Manager</h1>
            <p className="text-muted-foreground">Stage 3: Generate and manage production assets</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="badge-factory">
            3/5 Assets Ready
          </Badge>
          {useParams().ideaId && (
            <Badge variant="secondary" className="badge-factory">Idea: {useParams().ideaId}</Badge>
          )}
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate All
          </Button>
          <Button variant="factory">
            Continue to Production
          </Button>
        </div>
      </div>

      {/* Asset Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Voice Asset */}
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              <span className="font-medium">Voice</span>
            </div>
            {getStatusIcon(assets.voice.status)}
          </div>
          <Progress value={assets.voice.progress} className="mb-3" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!assets.voice.url}>
              <Play className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Upload className="h-3 w-3" />
            </Button>
          </div>
        </Card>

        {/* Music Asset */}
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span className="font-medium">Music</span>
            </div>
            {getStatusIcon(assets.music.status)}
          </div>
          <Progress value={assets.music.progress} className="mb-3" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!assets.music.url}>
              <Play className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </Card>

        {/* Captions Asset */}
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Captions</span>
            </div>
            {getStatusIcon(assets.captions.status)}
          </div>
          <Progress value={assets.captions.progress} className="mb-3" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!assets.captions.url}>
              <Download className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </Card>

        {/* B-roll Asset */}
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              <span className="font-medium">B-roll</span>
            </div>
            {getStatusIcon(assets.broll.status)}
          </div>
          <Progress value={assets.broll.progress} className="mb-3" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Upload className="h-3 w-3" />
            </Button>
          </div>
        </Card>

        {/* Graphics Asset */}
        <Card className="card-factory-glow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <span className="font-medium">Graphics</span>
            </div>
            {getStatusIcon(assets.graphics.status)}
          </div>
          <Progress value={assets.graphics.progress} className="mb-3" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Upload className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Detailed Asset Management */}
      <Card className="card-factory-glow p-6">
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="captions">Captions</TabsTrigger>
            <TabsTrigger value="broll">B-roll</TabsTrigger>
            <TabsTrigger value="graphics">Graphics</TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Voice Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Voice Style</label>
                    <div className="text-sm text-muted-foreground">Energetic, Fast-paced</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Accent</label>
                    <div className="text-sm text-muted-foreground">American English</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pacing</label>
                    <div className="text-sm text-muted-foreground">165 WPM</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Preview & Controls</h3>
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">voice-sample.mp3</span>
                      <Badge variant="secondary">2:30</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" className="flex-1">
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
                <h3 className="font-semibold mb-4">Music Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mood</label>
                    <div className="text-sm text-muted-foreground">Upbeat Electronic</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">BPM</label>
                    <div className="text-sm text-muted-foreground">128-140</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <div className="text-sm text-muted-foreground">2:30</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Generation Progress</h3>
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Generating upbeat track...</span>
                      <Badge variant="secondary">65%</Badge>
                    </div>
                    <Progress value={65} />
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="captions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Caption Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style</label>
                    <div className="text-sm text-muted-foreground">Dynamic Highlights</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Emphasis Words</label>
                    <div className="text-sm text-muted-foreground">workout, results, transform</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timing</label>
                    <div className="text-sm text-muted-foreground">Word-level sync</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Caption File</h3>
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">captions.srt</span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="broll" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">B-roll Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Shots Needed</label>
                    <div className="text-sm text-muted-foreground">
                      • Gym workout scenes<br/>
                      • Before/after transformations<br/>
                      • Exercise demonstrations
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style</label>
                    <div className="text-sm text-muted-foreground">High-energy, motivational</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Upload or Generate</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop video files or generate with AI
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">
                        <Upload className="h-3 w-3 mr-2" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="graphics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Graphics Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Graphics Needed</label>
                    <div className="text-sm text-muted-foreground">
                      • Logo overlays<br/>
                      • Text highlights<br/>
                      • Progress indicators
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand Colors</label>
                    <div className="text-sm text-muted-foreground">Primary brand palette</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Generation Failed</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-700">Generation failed</span>
                    </div>
                    <p className="text-xs text-red-600">
                      Unable to generate graphics. Please try again or upload custom graphics.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AssetManager;