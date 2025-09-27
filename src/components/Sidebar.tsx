import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Factory, 
  Home, 
  FolderOpen, 
  Plus,
  Lightbulb,
  Search,
  BarChart3,
  Settings,
  FileText,
  Play,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, description: "Overview & Analytics" },
  { name: "Projects", href: "/projects", icon: FolderOpen, description: "Content Factories" },
];

const recentProjects = [
  { name: "FitLife Motivation", href: "/projects/fitlife", icon: "🔥", status: "active" },
  { name: "Mindful Moments", href: "/projects/mindful", icon: "🧘", status: "paused" },
  { name: "WildTalks Animal Shorts", href: "/projects/wildtalks", icon: "🦁", status: "active" },
  { name: "TechTips Daily", href: "/projects/techips", icon: "💻", status: "active" },
  { name: "Cooking Hacks Pro", href: "/projects/cooking", icon: "👨‍🍳", status: "paused" },
];

const tools = [
  { name: "Research", href: "/research", icon: Search, description: "Trend Analysis" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Performance Insights" },
];

const documentation = [
  { name: "System Architecture", href: "/docs/architecture", icon: FileText },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border nav-factory transition-all duration-300",
        collapsed ? "w-16" : "w-16 md:w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-factory rounded-lg">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-factory-gradient">Zero-21</h1>
                  <p className="text-xs text-muted-foreground">Content Factory</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-3">
              {/* Main Navigation */}
              <div className="space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent group",
                        active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", active && "text-primary")} />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* New Project Button */}
              {!collapsed && (
                <div className="pt-2">
                  <Button className="w-full btn-factory" asChild>
                    <Link to="/setup">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Link>
                  </Button>
                </div>
              )}

              {/* Recent Projects */}
              {!collapsed && (
                <div className="pt-6">
                  <div className="px-3 pb-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Recent Projects
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {recentProjects.map((project) => (
                      <Link
                        key={project.name}
                        to={project.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent group"
                      >
                        <span className="text-base">{project.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{project.name}</div>
                          <div className={cn(
                            "inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full",
                            project.status === "active" ? "status-active" : "text-warning bg-warning/10"
                          )}>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              project.status === "active" ? "bg-success" : "bg-warning"
                            )} />
                            {project.status}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Section */}
              {!collapsed && (
                <div className="pt-6">
                  <div className="px-3 pb-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Tools
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent"
                      >
                        <tool.icon className="h-4 w-4" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">{tool.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation */}
              {!collapsed && (
                <div className="pt-6">
                  <div className="px-3 pb-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Documentation
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {documentation.map((doc) => (
                      <Link
                        key={doc.name}
                        to={doc.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent"
                      >
                        <doc.icon className="h-4 w-4" />
                        <span className="font-medium">{doc.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-sidebar-border/50 p-3">
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent"
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="font-medium">Settings</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}