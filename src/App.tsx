import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import NotReady from "./pages/NotReady";
import ScrollToTop from "./utils/scrollToTop";
import SmoothScroll from "./components/SmoothScroll";

const PhotographyPage = lazy(() => import("./pages/photography/PhotographyPage"));
const DarkroomPage = lazy(() => import("./pages/photography/darkroom/DarkroomPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <SmoothScroll />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* <Route path="/projects/NFS" element={<NFS />} /> */}
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/projects/not-ready" element={<NotReady />} />
                <Route path="/photography" element={<PhotographyPage />} />
                <Route path="/darkroom" element={<DarkroomPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
