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
import Research from "./pages/Research";
import ProjectSetup from "./pages/ProjectSetup";
import ScriptStudio from "./pages/ScriptStudio";
import AssetManager from "./pages/AssetManager";
import Assembly from "./pages/Assembly";
import Publishing from "./pages/Publishing";
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
            {/* Project-scoped routes only */}
            <Route path="projects/:projectId/ideas" element={<Research />} />
            <Route path="projects/:projectId/ideas/:ideaId/script" element={<ScriptStudio />} />
            <Route path="projects/:projectId/ideas/:ideaId/assets" element={<AssetManager />} />
            <Route path="projects/:projectId/ideas/:ideaId/assembly" element={<Assembly />} />
            <Route path="projects/:projectId/ideas/:ideaId/publish" element={<Publishing />} />
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
