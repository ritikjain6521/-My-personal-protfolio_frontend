import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import { Analytics } from "@vercel/analytics/react";

// CMS & Auth Providers
import { AuthProvider } from "./contexts/AuthContext";
import { CMSProvider } from "./contexts/CMSContext";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SkillsManager from "./pages/admin/SkillsManager";
import ProjectsManager from "./pages/admin/ProjectsManager";
import CertificationsManager from "./pages/admin/CertificationsManager";
import BlogManager from "./pages/admin/BlogManager";
import HeroAboutManager from "./pages/admin/HeroAboutManager";
import ExperienceManager from "./pages/admin/ExperienceManager";
import ResumeMaker from "./pages/admin/ResumeMaker";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CMSProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Portfolio */}
              <Route path="/" element={<Index />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* Admin Auth */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />

              {/* Admin CMS - Protected */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/skills" element={<ProtectedRoute><SkillsManager /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><ProjectsManager /></ProtectedRoute>} />
              <Route path="/admin/certifications" element={<ProtectedRoute><CertificationsManager /></ProtectedRoute>} />
              <Route path="/admin/blogs" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
              <Route path="/admin/hero" element={<ProtectedRoute><HeroAboutManager /></ProtectedRoute>} />
              <Route path="/admin/experience" element={<ProtectedRoute><ExperienceManager /></ProtectedRoute>} />
              <Route path="/admin/resume" element={<ProtectedRoute><ResumeMaker /></ProtectedRoute>} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </BrowserRouter>
        </TooltipProvider>
      </CMSProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
