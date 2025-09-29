import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Workflow, 
  Settings2, 
  Lightbulb, 
  FileText, 
  Video, 
  Share, 
  BarChart3,
  Search,
  Palette,
  Users,
  MessageSquare,
  Calendar,
  Target,
  Zap,
  GitBranch,
  Server,
  Cloud,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function SystemArchitecture() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Zero-21 System Architecture</h1>
        <p className="text-muted-foreground text-lg">
          The AI-Powered Content Factory - Complete Technical Documentation
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="stages">Stages</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="payloads">Payloads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Core Architecture Principle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 bg-muted rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">Human ⬄ Automation Parity</h3>
                <p className="text-muted-foreground">
                  Anything an agent can automate, a human can also do manually.<br/>
                  Anything a human can do, an agent can also automate.<br/>
                  <strong>All state changes flow through Supabase DB as the single source of truth.</strong>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">UI = Factory Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Visual control center</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">n8n = Robotic Arms</h4>
                  <p className="text-sm text-muted-foreground">Automation workflows</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Copilot = Assistant</h4>
                  <p className="text-sm text-muted-foreground">Right-rail AI helper</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>React + TypeScript</li>
                    <li>Vite + Tailwind</li>
                    <li>shadcn/ui</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Backend/Data</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>Supabase (Postgres)</li>
                    <li>RLS Security</li>
                    <li>Edge Functions</li>
                    <li>Storage + CDN</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Automation</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>n8n workflows</li>
                    <li>DB event triggers</li>
                    <li>CRON scheduling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Models</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>GPT-5 / Gemini</li>
                    <li>DALL·E / SDXL</li>
                    <li>ElevenLabs</li>
                    <li>FFmpeg assembly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-2 overflow-x-auto pb-4">
                {[
                  { icon: Settings2, name: "Setup", color: "bg-blue-500" },
                  { icon: Search, name: "Research", color: "bg-green-500" },
                  { icon: Lightbulb, name: "Idea", color: "bg-yellow-500" },
                  { icon: FileText, name: "Script", color: "bg-purple-500" },
                  { icon: Video, name: "Assembly", color: "bg-red-500" },
                  { icon: Share, name: "Publish", color: "bg-orange-500" },
                  { icon: BarChart3, name: "Analytics", color: "bg-pink-500" }
                ].map((stage, index, array) => (
                  <div key={stage.name} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`p-3 rounded-full text-white ${stage.color}`}>
                        <stage.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs mt-1 font-medium">{stage.name}</span>
                    </div>
                    {index < array.length - 1 && (
                      <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Schema & Relationships</CardTitle>
              <CardDescription>Complete entity relationship diagram with all tables and foreign keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Core Tables
                  </h3>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <h4 className="font-medium text-blue-600">projects</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>user_id:</strong> uuid (FK → auth.users)</div>
                        <div><strong>name:</strong> text</div>
                        <div><strong>description:</strong> text</div>
                        <div><strong>brand_kit:</strong> jsonb</div>
                        <div><strong>posting_rules:</strong> jsonb</div>
                        <div><strong>status:</strong> setup | active | paused</div>
                        <div><strong>created_at, updated_at:</strong> timestamp</div>
                      </div>
                    </div>

                    <div className="border rounded p-3">
                      <h4 className="font-medium text-green-600">ideas</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>project_id:</strong> uuid (FK → projects)</div>
                        <div><strong>title, description:</strong> text</div>
                        <div><strong>video_concept:</strong> text</div>
                        <div><strong>target_duration:</strong> integer</div>
                        <div><strong>target_platforms:</strong> text[]</div>
                        <div><strong>hashtags:</strong> text[]</div>
                        <div><strong>status:</strong> generated | validated | rejected</div>
                        <div><strong>score:</strong> integer (0-100)</div>
                        <div><strong>seed, concept, targeting, creative_dna:</strong> jsonb</div>
                      </div>
                    </div>

                    <div className="border rounded p-3">
                      <h4 className="font-medium text-purple-600">scripts</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>idea_id:</strong> uuid (FK → ideas)</div>
                        <div><strong>hook:</strong> text</div>
                        <div><strong>beats:</strong> text[]</div>
                        <div><strong>cta:</strong> text</div>
                        <div><strong>voice_style:</strong> text</div>
                        <div><strong>read_time:</strong> integer</div>
                        <div><strong>quality_scores:</strong> jsonb</div>
                        <div><strong>status:</strong> draft | ready</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Production Tables</h3>
                  <div className="space-y-3">
                    <div className="border rounded p-3">
                      <h4 className="font-medium text-red-600">assets</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>idea_id:</strong> uuid (FK → ideas)</div>
                        <div><strong>script_id:</strong> uuid (FK → scripts)</div>
                        <div><strong>type:</strong> voiceover | broll | music | subtitle</div>
                        <div><strong>file_url:</strong> text</div>
                        <div><strong>metadata:</strong> jsonb</div>
                        <div><strong>status:</strong> idle | generating | ready | failed</div>
                      </div>
                    </div>

                    <div className="border rounded p-3">
                      <h4 className="font-medium text-orange-600">assemblies</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>idea_id:</strong> uuid (FK → ideas)</div>
                        <div><strong>script_id:</strong> uuid (FK → scripts)</div>
                        <div><strong>video_url:</strong> text</div>
                        <div><strong>thumbnail_url:</strong> text</div>
                        <div><strong>duration:</strong> integer</div>
                        <div><strong>platform_versions:</strong> jsonb</div>
                        <div><strong>status:</strong> pending | processing | ready | failed</div>
                      </div>
                    </div>

                    <div className="border rounded p-3">
                      <h4 className="font-medium text-pink-600">publications</h4>
                      <div className="text-xs space-y-1 mt-1">
                        <div><strong>id:</strong> uuid (PK)</div>
                        <div><strong>assembly_id:</strong> uuid (FK → assemblies)</div>
                        <div><strong>platform:</strong> tiktok | youtube | instagram</div>
                        <div><strong>platform_post_id:</strong> text</div>
                        <div><strong>caption:</strong> text</div>
                        <div><strong>hashtags:</strong> text[]</div>
                        <div><strong>scheduled_at, published_at:</strong> timestamp</div>
                        <div><strong>metrics:</strong> jsonb</div>
                        <div><strong>status:</strong> draft | scheduled | published | failed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Row Level Security (RLS) Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">User-Based Access</h4>
                    <div className="text-sm space-y-1 bg-muted p-3 rounded">
                      <div>✅ Users can only access their own projects</div>
                      <div>✅ Ideas inherit project ownership via FK</div>
                      <div>✅ Scripts inherit via idea → project chain</div>
                      <div>✅ Assets inherit via idea → project chain</div>
                      <div>✅ Publications inherit via assembly → idea → project</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Operation Policies</h4>
                    <div className="text-sm space-y-1 bg-muted p-3 rounded">
                      <div>📖 SELECT: View own data</div>
                      <div>➕ INSERT: Create new records</div>
                      <div>✏️ UPDATE: Modify existing records</div>
                      <div>🗑️ DELETE: Remove own records</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stages" className="space-y-6">
          <div className="space-y-6">
            {/* Stage 0: Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-blue-500" />
                  Stage 0: Project Setup Wizard
                </CardTitle>
                <CardDescription>Configure project foundation for automated pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Names project & selects niche</li>
                      <li>• Uploads brand kit (colors, fonts, logo)</li>
                      <li>• Defines audience profile & demographics</li>
                      <li>• Sets voice, tone & style guidelines</li>
                      <li>• Configures platform publishing rules</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Automation</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Validates brand token compatibility</li>
                      <li>• Normalizes brand assets & palettes</li>
                      <li>• Suggests audience personas via AI</li>
                      <li>• Generates content templates</li>
                      <li>• Creates default hashtag pools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>projects</code> table</li>
                      <li>• Store <code>brand_kit</code> as JSONB</li>
                      <li>• Save <code>posting_rules</code> config</li>
                      <li>• Set status = 'active'</li>
                      <li>• Trigger welcome n8n workflow</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>Result:</strong> <code>projects.status = 'active'</code> with comprehensive configuration ready for AI-driven content generation
                </div>
              </CardContent>
            </Card>

            {/* Stage 1: Research → Idea */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-green-500" />
                  Stage 1: Research → Idea Generation
                </CardTitle>
                <CardDescription>Populate idea pipeline from human creativity + automated research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Adds competitor sources manually</li>
                      <li>• Manually creates ideas via form</li>
                      <li>• Reviews & validates AI suggestions</li>
                      <li>• Curates trending topics</li>
                      <li>• Defines content pillars</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Research Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Scrapes TikTok/YouTube APIs for trends</li>
                      <li>• Monitors Reddit & social platforms</li>
                      <li>• Analyzes viral content patterns</li>
                      <li>• Scores ideas (0-100) for viral potential</li>
                      <li>• Generates video concepts & hooks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>ideas</code> table</li>
                      <li>• Generate DNA: seed, concept, targeting</li>
                      <li>• Set status = 'generated' → 'validated'</li>
                      <li>• Store research metadata</li>
                      <li>• Trigger idea processing workflows</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>State Machine:</strong> generated → validated → rejected
                </div>
              </CardContent>
            </Card>

            {/* Stage 2: Idea → Script */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-500" />
                  Stage 2: Idea → Script Development
                </CardTitle>
                <CardDescription>Transform validated ideas into platform-optimized scripts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Writes/edits script manually</li>
                      <li>• Selects voice style & music</li>
                      <li>• Reviews AI-generated hooks</li>
                      <li>• Adjusts pacing & story beats</li>
                      <li>• Validates CTA effectiveness</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Idea Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Generates hooks based on hook_type</li>
                      <li>• Creates story beats for target duration</li>
                      <li>• Suggests CTAs from brand templates</li>
                      <li>• Optimizes for platform (TikTok vs YouTube)</li>
                      <li>• Scores script quality & engagement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>scripts</code> table</li>
                      <li>• Store structured: hook, beats[], cta</li>
                      <li>• Calculate read_time & quality_scores</li>
                      <li>• Update idea.status = 'scripted'</li>
                      <li>• Trigger asset generation pipeline</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>State Machine:</strong> draft → ready with quality gates
                </div>
              </CardContent>
            </Card>

            {/* Stage 3: Script → Assets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-500" />
                  Stage 3: Script → Asset Generation
                </CardTitle>
                <CardDescription>Generate all media assets needed for video assembly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uploads custom B-roll footage</li>
                      <li>• Records personal voiceover</li>
                      <li>• Selects background music tracks</li>
                      <li>• Reviews AI-generated subtitles</li>
                      <li>• Adjusts timing & synchronization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Production Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Generates voiceover via ElevenLabs</li>
                      <li>• Creates subtitles with timing</li>
                      <li>• Sources B-roll from stock APIs</li>
                      <li>• Suggests background music</li>
                      <li>• Pre-processes assets for assembly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>assets</code> table</li>
                      <li>• type: voiceover | broll | music | subtitle</li>
                      <li>• Store file_url in Supabase Storage</li>
                      <li>• Track generation metadata</li>
                      <li>• Update idea.status = 'assets_ready'</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>Asset State Machine:</strong> idle → generating → ready → failed → uploaded
                </div>
              </CardContent>
            </Card>

            {/* Stage 4: Assets → Assembly */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-red-500" />
                  Stage 4: Asset → Video Assembly
                </CardTitle>
                <CardDescription>Combine all assets into platform-optimized video files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Edits timeline in visual UI</li>
                      <li>• Adjusts transitions & effects</li>
                      <li>• Reviews final video output</li>
                      <li>• Approves for publishing</li>
                      <li>• Requests regeneration if needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Production Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Assembles video via FFmpeg</li>
                      <li>• Creates platform variants (9:16, 16:9)</li>
                      <li>• Applies brand overlays & effects</li>
                      <li>• Generates thumbnails automatically</li>
                      <li>• Optimizes compression & quality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>assemblies</code> table</li>
                      <li>• Store video_url & thumbnail_url</li>
                      <li>• Save platform_versions (TikTok/YouTube)</li>
                      <li>• Calculate final duration</li>
                      <li>• Update idea.status = 'assembled'</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>Assembly State Machine:</strong> pending → processing → ready → failed
                </div>
              </CardContent>
            </Card>

            {/* Stage 5: Assembly → Publishing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-orange-500" />
                  Stage 5: Assembly → Publishing
                </CardTitle>
                <CardDescription>Deploy finished videos across social platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Manually schedules posts</li>
                      <li>• Edits platform-specific captions</li>
                      <li>• Selects optimal posting times</li>
                      <li>• Reviews hashtag suggestions</li>
                      <li>• Monitors publishing status</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Publishing Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Formats for each platform's specs</li>
                      <li>• Inserts optimized captions & hashtags</li>
                      <li>• Schedules posts via APIs</li>
                      <li>• Handles upload retries & errors</li>
                      <li>• Tracks publishing success</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Insert into <code>publications</code> table</li>
                      <li>• Store platform_post_id from APIs</li>
                      <li>• Track scheduled_at & published_at</li>
                      <li>• Update idea.status = 'published'</li>
                      <li>• Trigger analytics collection</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>Publication State Machine:</strong> draft → scheduled → published → failed
                </div>
              </CardContent>
            </Card>

            {/* Stage 6: Publishing → Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-pink-500" />
                  Stage 6: Publishing → Analytics
                </CardTitle>
                <CardDescription>Track performance and close the optimization feedback loop</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Human Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Imports performance CSVs</li>
                      <li>• Tags posts as recycled/retired</li>
                      <li>• Reviews performance insights</li>
                      <li>• Identifies top-performing content</li>
                      <li>• Plans content recycling strategy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Analytics Agent</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Fetches metrics via platform APIs</li>
                      <li>• Normalizes data across platforms</li>
                      <li>• Records revenue attribution events</li>
                      <li>• Calculates ROI & performance scores</li>
                      <li>• Feeds insights back to research stage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">DB Handoff</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Update <code>publications.metrics</code></li>
                      <li>• Insert revenue_events for attribution</li>
                      <li>• Update post lifecycle status</li>
                      <li>• Generate new research insights</li>
                      <li>• Loop back to Stage 1 ideas</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <strong>Lifecycle Completion:</strong> published → recycled → retired (feeds new Stage 1 ideas)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agents & Automation Workflows</CardTitle>
              <CardDescription>n8n workflows and AI agents that power the automation layer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Search className="h-4 w-4 text-green-500" />
                    Research Agent
                  </h3>
                  <div className="border rounded p-4 space-y-3">
                    <div>
                      <h4 className="font-medium">Triggers</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• CRON schedule (daily/hourly)</li>
                        <li>• Manual research button</li>
                        <li>• Low idea count threshold</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Data Sources</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• TikTok Creative Center API</li>
                        <li>• YouTube Trending API</li>
                        <li>• Reddit API (trending subreddits)</li>
                        <li>• Twitter/X API trends</li>
                        <li>• Google Trends API</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">AI Processing</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• GPT-5 for content analysis</li>
                        <li>• Viral pattern recognition</li>
                        <li>• Niche relevance scoring</li>
                        <li>• Hook type classification</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Output</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Bulk insert into ideas table</li>
                        <li>• Status: 'generated'</li>
                        <li>• Score: 0-100 viral potential</li>
                        <li>• Auto-tag with source metadata</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Idea Agent
                  </h3>
                  <div className="border rounded p-4 space-y-3">
                    <div>
                      <h4 className="font-medium">Triggers</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• idea.status = 'validated'</li>
                        <li>• Manual script generation</li>
                        <li>• Batch processing requests</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Context Inputs</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Project brand_kit & style_guide</li>
                        <li>• Audience profile & preferences</li>
                        <li>• Platform optimization rules</li>
                        <li>• Historical performance data</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">AI Processing</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Gemini 2.5 Pro for script writing</li>
                        <li>• Hook generation & optimization</li>
                        <li>• Story beat structuring</li>
                        <li>• CTA recommendation engine</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Output</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Insert into scripts table</li>
                        <li>• Structured: hook, beats[], cta</li>
                        <li>• Quality scores & read time</li>
                        <li>• Trigger asset generation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Video className="h-4 w-4 text-purple-500" />
                    Production Agent
                  </h3>
                  <div className="border rounded p-4 space-y-3">
                    <div>
                      <h4 className="font-medium">Triggers</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• script.status = 'ready'</li>
                        <li>• Asset regeneration requests</li>
                        <li>• Manual production override</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Asset Generation</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• ElevenLabs: AI voiceover</li>
                        <li>• DALL·E/SDXL: Custom visuals</li>
                        <li>• Stock APIs: B-roll footage</li>
                        <li>• Music libraries: Background audio</li>
                        <li>• AI subtitle generation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Assembly Pipeline</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• FFmpeg video composition</li>
                        <li>• Platform format variants</li>
                        <li>• Brand overlay application</li>
                        <li>• Quality optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Output</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Upload to Supabase Storage</li>
                        <li>• Update assemblies table</li>
                        <li>• Generate platform variants</li>
                        <li>• Create thumbnails</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Share className="h-4 w-4 text-orange-500" />
                    Publishing Agent
                  </h3>
                  <div className="border rounded p-4 space-y-3">
                    <div>
                      <h4 className="font-medium">Triggers</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• assembly.status = 'ready'</li>
                        <li>• Scheduled publish times</li>
                        <li>• Manual publish override</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Platform APIs</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• TikTok Business API</li>
                        <li>• YouTube Data API v3</li>
                        <li>• Instagram Graph API</li>
                        <li>• Twitter API v2</li>
                        <li>• LinkedIn Content API</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Optimization</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Platform-specific formatting</li>
                        <li>• Hashtag optimization</li>
                        <li>• Caption generation</li>
                        <li>• Posting time optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Output</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Insert into publications table</li>
                        <li>• Store platform_post_id</li>
                        <li>• Track publishing metrics</li>
                        <li>• Error handling & retries</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Error Handling & Recovery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2 text-blue-600">Retry Strategy</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Exponential backoff (1s, 2s, 4s, 8s)</li>
                      <li>• Max 3 retries per operation</li>
                      <li>• Platform-specific rate limiting</li>
                      <li>• Circuit breaker patterns</li>
                    </ul>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2 text-yellow-600">Fallback Systems</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Alternative AI models</li>
                      <li>• Stock asset libraries</li>
                      <li>• Template-based generation</li>
                      <li>• Manual override options</li>
                    </ul>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2 text-red-600">Dead Letter Queue</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Failed jobs logged for inspection</li>
                      <li>• Human intervention prompts</li>
                      <li>• Error classification & routing</li>
                      <li>• Automatic retry scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payloads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Payloads & Data Structures</CardTitle>
              <CardDescription>Complete payload specifications for all system interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Project Setup Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "project": {
    "name": "My Content Factory",
    "niche": ["productivity", "wellness"],
    "description": "Content focused on productivity tips for remote workers",
    "icon": "🎬"
  },
  "brand_kit": {
    "logo_url": "https://...",
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#64748B", 
      "accent": "#10B981"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "visual_style": "modern",
    "audience_profile": {
      "primary_age": "25-34",
      "gender_balance": "balanced",
      "regions": ["United States"],
      "psychographics": {
        "values": ["growth", "efficiency"],
        "motivations": ["career advancement"],
        "pain_points": ["work-life balance"]
      },
      "consumption": {
        "platforms": ["tiktok", "instagram"],
        "formats": ["short-form", "stories"]
      }
    },
    "style_guide": {
      "voice": "friendly",
      "tone": "conversational",
      "target_audience": "young professionals",
      "pacing": "moderate",
      "banned_words": ["hate", "spam"],
      "default_hashtags": ["#productivity", "#remote"],
      "cta_templates": ["Comment below!", "Save this post!"],
      "emoji_policy": "moderate",
      "hashtag_policy": "research-based"
    }
  },
  "posting_rules": {
    "platforms": ["tiktok", "instagram"],
    "posting_windows": {
      "tiktok": ["09:00", "15:00", "21:00"],
      "instagram": ["12:00", "18:00"]
    },
    "auto_retry": true,
    "fixed_hashtags": ["#contentcreator"]
  }
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">AI Idea Generation Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "projectId": "uuid-here",
  "numIdeas": 3,
  "context": {
    "niche": ["productivity", "wellness"],
    "audience": {
      "age": "25-34",
      "platforms": ["tiktok", "instagram"],
      "pain_points": ["work-life balance"]
    },
    "brand_voice": "friendly",
    "style": "modern"
  }
}

// Response:
{
  "success": true,
  "ideas": [
    {
      "title": "5 Morning Habits That Changed My Life",
      "description": "Personal transformation through daily routines",
      "video_concept": "Split-screen before/after showing habit demos",
      "target_duration": 60,
      "visual_style": "clean",
      "target_platforms": ["tiktok", "instagram"],
      "call_to_action": "Comment your morning routine!",
      "content_pillars": ["productivity", "wellness"],
      "tone": "motivational",
      "hook_type": "transformation",
      "complexity_level": "easy",
      "hashtags": ["#productivity", "#morningroutine"],
      "score": 85,
      "source": "AI Content Generator"
    }
  ],
  "count": 3
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Idea DNA Generation Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "ideaId": "uuid-here",
  "ideaData": {
    "title": "5 Morning Habits That Changed My Life",
    "description": "Personal transformation...",
    "target_platforms": ["tiktok"],
    "complexity_level": "easy"
  }
}

// Response - Updates idea with DNA:
{
  "seed": {
    "core_message": "Small habits create big changes",
    "emotional_trigger": "transformation",
    "value_proposition": "Actionable morning routine"
  },
  "concept": {
    "narrative_structure": "problem-solution-result",
    "visual_metaphors": ["before/after", "growth"],
    "content_framework": "listicle"
  },
  "targeting": {
    "demographic": "young professionals",
    "psychographic": "growth-minded",
    "behavioral": "seeks productivity content"
  },
  "creative_dna": {
    "hook_formula": "transformation promise",
    "story_arc": "struggle → habits → success",
    "engagement_triggers": ["relatability", "aspirational"]
  }
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Script Generation Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "ideaId": "uuid-here",
  "scriptData": {
    "hook": "I used to hit snooze 5 times every morning...",
    "beats": [
      "Problem: Chaotic mornings led to stressful days",
      "Solution: I tried these 5 specific habits",
      "Habit 1: 10-minute meditation (show timer)",
      "Habit 2: Drink 16oz water immediately",
      "Habit 3: Write 3 priorities (show notebook)",
      "Habit 4: 5-minute stretch routine",
      "Habit 5: Protein-rich breakfast",
      "Result: My energy increased 200%"
    ],
    "cta": "Comment your current morning routine!",
    "voice_style": "conversational",
    "read_time": 45
  },
  "quality_scores": {
    "hook_strength": 8.5,
    "story_flow": 9.0,
    "engagement_potential": 8.8,
    "cta_effectiveness": 9.2
  }
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Asset Generation Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`// Voiceover Asset
{
  "type": "voiceover",
  "ideaId": "uuid-here",
  "scriptId": "uuid-here",
  "text": "I used to hit snooze 5 times every morning...",
  "voice_settings": {
    "voice_id": "professional_female",
    "speed": 1.1,
    "emotion": "enthusiastic"
  }
}

// B-roll Asset
{
  "type": "broll", 
  "ideaId": "uuid-here",
  "search_terms": ["morning routine", "meditation", "healthy breakfast"],
  "duration": 45,
  "style": "lifestyle"
}

// Music Asset
{
  "type": "music",
  "ideaId": "uuid-here", 
  "mood": "upbeat",
  "energy": "medium",
  "duration": 45,
  "genre": "ambient"
}

// Subtitle Asset
{
  "type": "subtitle",
  "ideaId": "uuid-here",
  "scriptId": "uuid-here",
  "voiceover_url": "https://...",
  "style": {
    "font": "bold",
    "color": "#FFFFFF",
    "position": "center"
  }
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Video Assembly Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "ideaId": "uuid-here",
  "scriptId": "uuid-here", 
  "assets": {
    "voiceover": "https://storage.../voiceover.mp3",
    "broll": ["https://storage.../clip1.mp4", "..."],
    "music": "https://storage.../background.mp3",
    "subtitles": "https://storage.../subtitles.srt"
  },
  "assembly_config": {
    "platform_versions": {
      "tiktok": {
        "aspect_ratio": "9:16",
        "resolution": "1080x1920", 
        "max_duration": 60
      },
      "youtube": {
        "aspect_ratio": "16:9",
        "resolution": "1920x1080",
        "max_duration": 180
      }
    },
    "brand_overlay": {
      "logo_position": "bottom_right",
      "watermark": true
    },
    "transitions": "smooth",
    "effects": ["zoom", "fade"]
  }
}

// Response:
{
  "assembly_id": "uuid-here",
  "video_url": "https://storage.../final_video.mp4",
  "thumbnail_url": "https://storage.../thumbnail.jpg",
  "duration": 47,
  "platform_versions": {
    "tiktok": "https://storage.../tiktok_version.mp4",
    "youtube": "https://storage.../youtube_version.mp4"
  },
  "status": "ready"
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Publishing Payload</h3>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`{
  "assembly_id": "uuid-here",
  "publications": [
    {
      "platform": "tiktok",
      "video_url": "https://storage.../tiktok_version.mp4",
      "caption": "5 morning habits that changed everything ✨",
      "hashtags": ["#productivity", "#morningroutine", "#selfcare"],
      "scheduled_at": "2024-01-15T09:00:00Z",
      "privacy": "public"
    },
    {
      "platform": "instagram", 
      "video_url": "https://storage.../instagram_version.mp4",
      "caption": "Transform your mornings with these 5 habits 🌅",
      "hashtags": ["#productivity", "#wellness", "#routine"],
      "scheduled_at": "2024-01-15T12:00:00Z",
      "privacy": "public"
    }
  ]
}

// Response:
{
  "publications": [
    {
      "id": "uuid-here",
      "platform": "tiktok",
      "platform_post_id": "7123456789",
      "status": "published",
      "published_at": "2024-01-15T09:00:15Z",
      "url": "https://tiktok.com/@user/video/7123456789"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics System Architecture</CardTitle>
              <CardDescription>Three-tier analytics system: Global, Project, and Idea levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-600">
                    <BarChart3 className="h-4 w-4" />
                    Global Analytics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Scope</h4>
                      <p className="text-xs text-muted-foreground">
                        Cross-platform performance across all user projects and content
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Metrics</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Total content published</li>
                        <li>• Aggregate reach & impressions</li>
                        <li>• Platform performance comparison</li>
                        <li>• Revenue attribution totals</li>
                        <li>• User engagement trends</li>
                        <li>• Viral content patterns</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Use Cases</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Portfolio overview dashboard</li>
                        <li>• Platform strategy optimization</li>
                        <li>• Industry benchmarking</li>
                        <li>• ROI analysis across projects</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Sources</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• All publications.metrics</li>
                        <li>• Aggregated revenue_events</li>
                        <li>• Cross-project performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                    <Target className="h-4 w-4" />
                    Project Analytics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Scope</h4>
                      <p className="text-xs text-muted-foreground">
                        Performance metrics for a specific content factory project
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Metrics</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Project-specific reach & engagement</li>
                        <li>• Content pipeline velocity</li>
                        <li>• Idea → publish conversion rate</li>
                        <li>• Brand performance against goals</li>
                        <li>• Audience growth attribution</li>
                        <li>• Content pillar effectiveness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Use Cases</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Project health monitoring</li>
                        <li>• Content strategy refinement</li>
                        <li>• Brand performance tracking</li>
                        <li>• Pipeline optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Sources</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Project-filtered publications</li>
                        <li>• Ideas pipeline metrics</li>
                        <li>• Brand kit performance data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-purple-600">
                    <Lightbulb className="h-4 w-4" />
                    Idea Analytics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Scope</h4>
                      <p className="text-xs text-muted-foreground">
                        Granular performance tracking for individual content ideas
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Metrics</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Individual post performance</li>
                        <li>• Platform-specific metrics</li>
                        <li>• Hook effectiveness scores</li>
                        <li>• Audience demographic response</li>
                        <li>• Engagement rate per platform</li>
                        <li>• Revenue attribution per post</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Use Cases</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Content recycling decisions</li>
                        <li>• Hook pattern analysis</li>
                        <li>• A/B testing insights</li>
                        <li>• Viral content identification</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Sources</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Individual publication metrics</li>
                        <li>• Platform API responses</li>
                        <li>• Engagement detail tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Analytics Data Flow & Collection</h3>
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Real-time Collection</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium">Platform APIs</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• TikTok Analytics API (hourly sync)</li>
                          <li>• YouTube Analytics API (daily sync)</li>
                          <li>• Instagram Insights API (daily sync)</li>
                          <li>• Twitter Analytics API (hourly sync)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Collected Metrics</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Views, impressions, reach</li>
                          <li>• Likes, comments, shares</li>
                          <li>• Save rate, completion rate</li>
                          <li>• Click-through rates</li>
                          <li>• Audience demographics</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Performance Scoring</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Viral Score Calculation:</strong>
                        <pre className="text-xs bg-muted p-2 rounded mt-1">
{`viral_score = (
  (views / followers) * 40 +           // Reach multiplier
  (engagement_rate) * 30 +             // Engagement weight  
  (completion_rate) * 20 +             // Retention factor
  (save_rate) * 10                     // Intent to return
) * platform_weight`}
                        </pre>
                      </div>
                      <div>
                        <strong>Platform Weights:</strong> TikTok (1.0), Instagram (0.8), YouTube (1.2), Twitter (0.6)
                      </div>
                    </div>
                  </div>

                  <div className="border rounded p-4">
                    <h4 className="font-medium mb-2">Revenue Attribution</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium">Attribution Models</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• First-touch attribution</li>
                          <li>• Last-touch attribution</li>
                          <li>• Multi-touch weighted</li>
                          <li>• Time-decay attribution</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Revenue Events</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Link clicks to products</li>
                          <li>• Promo code usage</li>
                          <li>• Email signups</li>
                          <li>• Purchase conversions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Analytics Database Schema</h3>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`-- Enhanced publications table with metrics
publications.metrics: {
  "views": 125000,
  "likes": 8500, 
  "comments": 450,
  "shares": 320,
  "saves": 1200,
  "reach": 98000,
  "impressions": 145000,
  "completion_rate": 0.78,
  "engagement_rate": 0.084,
  "click_through_rate": 0.023,
  "demographics": {
    "age_groups": {"18-24": 0.35, "25-34": 0.45},
    "gender": {"female": 0.62, "male": 0.38},
    "top_regions": ["US", "UK", "CA"]
  },
  "viral_score": 87.5,
  "revenue_attributed": 1250.00,
  "last_updated": "2024-01-15T10:30:00Z"
}

-- Revenue events table
CREATE TABLE revenue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID REFERENCES publications(id),
  event_type TEXT NOT NULL, -- 'click', 'signup', 'purchase'
  revenue_amount DECIMAL(10,2),
  attribution_weight DECIMAL(3,2) DEFAULT 1.0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analytics aggregations table  
CREATE TABLE analytics_aggregations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope TEXT NOT NULL, -- 'global', 'project', 'idea'
  scope_id UUID, -- project_id or idea_id for scoped analytics
  period TEXT NOT NULL, -- 'day', 'week', 'month'
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  metrics JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Research System</CardTitle>
              <CardDescription>Cross-platform content discovery and trend analysis engine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Research Architecture Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-blue-600">Data Collection Layer</h4>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Social Platform APIs</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• TikTok Creative Center API</li>
                          <li>• YouTube Trending API</li>
                          <li>• Instagram Graph API</li>
                          <li>• Twitter/X API v2</li>
                          <li>• LinkedIn Content API</li>
                          <li>• Reddit API</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Trend Discovery APIs</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Google Trends API</li>
                          <li>• BuzzSumo API</li>
                          <li>• Mention.com API</li>
                          <li>• Brand24 API</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Competitor Intelligence</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Social Blade API</li>
                          <li>• VidIQ API</li>
                          <li>• TubeBuddy API</li>
                          <li>• Custom scraping (with rate limits)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-green-600">Processing Pipeline</h4>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">AI Content Analysis</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• GPT-5 for content categorization</li>
                          <li>• Gemini for trend pattern recognition</li>
                          <li>• Natural language sentiment analysis</li>
                          <li>• Video content transcription & analysis</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Viral Pattern Detection</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Engagement velocity analysis</li>
                          <li>• Hook effectiveness scoring</li>
                          <li>• Visual style trend identification</li>
                          <li>• Sound/music trend tracking</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Niche Relevance Scoring</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Semantic similarity matching</li>
                          <li>• Audience overlap analysis</li>
                          <li>• Hashtag correlation scoring</li>
                          <li>• Content pillar alignment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Research Data Schema</h3>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`-- Global research discoveries table
CREATE TABLE research_discoveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_platform TEXT NOT NULL, -- 'tiktok', 'youtube', 'instagram', etc.
  source_url TEXT,
  source_id TEXT, -- platform-specific post/video ID
  content_type TEXT NOT NULL, -- 'video', 'image', 'text', 'audio'
  
  -- Content analysis
  title TEXT,
  description TEXT,
  transcription TEXT,
  hashtags TEXT[],
  
  -- Performance metrics
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0, 
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,4),
  
  -- AI analysis results
  content_categories TEXT[],
  viral_factors JSONB, -- hook types, visual styles, etc.
  sentiment_score DECIMAL(3,2), -- -1.0 to 1.0
  trend_score INTEGER, -- 0-100 viral potential
  
  -- Niche relevance  
  niche_tags TEXT[],
  relevance_scores JSONB, -- scores per niche category
  
  -- Discovery metadata
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  discovery_method TEXT, -- 'api', 'scraping', 'manual'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trending topics aggregation
CREATE TABLE trending_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_name TEXT NOT NULL,
  topic_category TEXT, -- 'hashtag', 'sound', 'format', 'concept'
  
  -- Trend metrics
  mention_count INTEGER DEFAULT 0,
  growth_rate DECIMAL(5,2), -- percentage growth
  peak_score INTEGER, -- 0-100 trend intensity
  
  -- Platform breakdown
  platform_data JSONB, -- performance per platform
  
  -- Time series data
  trend_start DATE,
  trend_peak DATE,
  trend_status TEXT DEFAULT 'emerging', -- 'emerging', 'peak', 'declining'
  
  -- Related content
  sample_content_ids UUID[], -- references to research_discoveries
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Competitor tracking
CREATE TABLE competitor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT,
  
  -- Profile metrics
  followers_count INTEGER,
  following_count INTEGER,
  posts_count INTEGER,
  
  -- Content analysis
  content_categories TEXT[],
  posting_frequency DECIMAL(4,2), -- posts per day
  average_engagement DECIMAL(5,4),
  
  -- Performance tracking
  growth_rate DECIMAL(5,2),
  viral_content_count INTEGER,
  
  -- Monitoring settings
  is_active BOOLEAN DEFAULT true,
  last_checked TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(platform, username)
);`}
                </pre>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Research Workflows & Automation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-purple-600">Scheduled Research Agents</h4>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Trend Discovery (Hourly)</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Monitor platform trending APIs</li>
                          <li>• Collect viral content samples</li>
                          <li>• Update trending_topics table</li>
                          <li>• Calculate growth rates & scores</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Competitor Analysis (Daily)</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Scrape competitor profiles</li>
                          <li>• Analyze recent content performance</li>
                          <li>• Track follower growth patterns</li>
                          <li>• Identify content strategy shifts</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Deep Analysis (Weekly)</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Comprehensive trend pattern analysis</li>
                          <li>• Cross-platform correlation studies</li>
                          <li>• Viral content factor identification</li>
                          <li>• Niche-specific insight generation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-orange-600">Research Integration</h4>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Idea Generation Feed</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Filter discoveries by project niche</li>
                          <li>• Score relevance to brand voice</li>
                          <li>• Generate adaptation suggestions</li>
                          <li>• Auto-create idea drafts</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Trend Alerts</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Real-time emerging trend notifications</li>
                          <li>• Niche-specific opportunity alerts</li>
                          <li>• Competitor content performance alerts</li>
                          <li>• Viral threshold breach notifications</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h5 className="font-medium text-sm">Research Dashboard</h5>
                        <ul className="text-xs space-y-1 text-muted-foreground mt-1">
                          <li>• Global trend visualization</li>
                          <li>• Niche-filtered research feed</li>
                          <li>• Competitor performance tracking</li>
                          <li>• Content opportunity scoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Research API Integration Examples</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">TikTok Trend Discovery</h4>
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`// TikTok Creative Center API call
const trendingResponse = await fetch('https://ads.tiktok.com/creative_radar_api/v1/popular_trend/list', {
  headers: {
    'Authorization': \`Bearer \${TIKTOK_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    period: 7, // last 7 days
    region: 'US',
    industry: 'lifestyle'
  })
});

const trends = await trendingResponse.json();

// Process and store discoveries
for (const trend of trends.data) {
  await supabase.from('research_discoveries').insert({
    source_platform: 'tiktok',
    source_id: trend.trend_id,
    title: trend.trend_name,
    hashtags: trend.hashtags,
    views: trend.view_count,
    engagement_rate: trend.engagement_rate,
    trend_score: trend.heat_score,
    content_categories: await classifyContent(trend.description),
    viral_factors: {
      music_id: trend.music_id,
      effect_ids: trend.effect_ids,
      hook_type: await analyzeHook(trend.sample_videos)
    },
    discovered_at: new Date().toISOString()
  });
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">YouTube Analytics Integration</h4>
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`// YouTube Data API v3 trending content
const youtubeResponse = await fetch(
  \`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=22&key=\${YOUTUBE_API_KEY}\`
);

const videos = await youtubeResponse.json();

// Process viral videos for patterns
for (const video of videos.items) {
  const transcript = await getVideoTranscript(video.id);
  const thumbnailAnalysis = await analyzeVideoThumbnail(video.snippet.thumbnails.maxres.url);
  
  await supabase.from('research_discoveries').insert({
    source_platform: 'youtube',
    source_id: video.id,
    source_url: \`https://youtube.com/watch?v=\${video.id}\`,
    title: video.snippet.title,
    description: video.snippet.description,
    transcription: transcript,
    hashtags: extractHashtags(video.snippet.description),
    views: parseInt(video.statistics.viewCount),
    likes: parseInt(video.statistics.likeCount),
    comments: parseInt(video.statistics.commentCount),
    viral_factors: {
      thumbnail_style: thumbnailAnalysis.style,
      title_pattern: analyzeTitlePattern(video.snippet.title),
      hook_timestamp: findHookInTranscript(transcript)
    }
  });
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}