import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Research from "./pages/Research";
import ProjectSetup from "./pages/ProjectSetup";
import ScriptStudio from "./pages/ScriptStudio";
import AssetManager from "./pages/AssetManager";
import Assembly from "./pages/Assembly";
import Publishing from "./pages/Publishing";
import GlobalResearch from "./pages/GlobalResearch";
import GlobalAnalytics from "./pages/GlobalAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectDetail />} />
            {/* Project-scoped routes */}
            <Route path="projects/:projectId/ideas" element={<Research />} />
            <Route path="projects/:projectId/ideas/:ideaId/script" element={<ScriptStudio />} />
            <Route path="projects/:projectId/ideas/:ideaId/assets" element={<AssetManager />} />
            <Route path="projects/:projectId/ideas/:ideaId/assembly" element={<Assembly />} />
            <Route path="projects/:projectId/ideas/:ideaId/publish" element={<Publishing />} />
            <Route path="projects/:projectId/publishing" element={<Publishing />} />
            <Route path="projects/:projectId/analytics" element={<GlobalAnalytics />} />
            {/* Global routes */}
            <Route path="research" element={<GlobalResearch />} />
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="ideas" element={<Research />} />
            <Route path="setup" element={<ProjectSetup />} />
            <Route path="script-studio" element={<ScriptStudio />} />
            <Route path="asset-manager" element={<AssetManager />} />
            <Route path="assembly" element={<Assembly />} />
            <Route path="publishing" element={<Publishing />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
