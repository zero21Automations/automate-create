import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectSetup from "./pages/ProjectSetup";
import ScriptStudio from "./pages/ScriptStudio";
import IdeaOverview from "./pages/IdeaOverview";
import AssetManager from "./pages/AssetManager";
import Production from "./pages/Production";
import Publishing from "./pages/Publishing";
import GlobalAnalytics from "./pages/GlobalAnalytics";
import GlobalResearch from "./pages/GlobalResearch";
import SystemArchitecture from "./pages/SystemArchitecture";
import IdeaAnalytics from "./pages/IdeaAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthGuard>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetail />} />
            <Route path="projects/:projectId/ideas/:ideaId" element={<IdeaOverview />} />
            <Route path="projects/:projectId/ideas/:ideaId/script" element={<ScriptStudio />} />
            <Route path="projects/:projectId/ideas/:ideaId/assets" element={<AssetManager />} />
            <Route path="projects/:projectId/ideas/:ideaId/production" element={<Production />} />
            <Route path="projects/:projectId/ideas/:ideaId/publishing" element={<Publishing />} />
            <Route path="projects/:projectId/ideas/:ideaId/analytics" element={<IdeaAnalytics />} />
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="research" element={<GlobalResearch />} />
            <Route path="architecture" element={<SystemArchitecture />} />
            <Route path="setup" element={<ProjectSetup />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthGuard>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
