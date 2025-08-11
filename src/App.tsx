// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Hunter from "./pages/Hunter";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/profile";
import Tournament from "./pages/Tournaments";
import Riot from "./pages/Stats";
import ValorantSelector from "./pages/Guide"; 
import LiveMatchPage from "./pages/LiveMatchPage";
import SovaSun from "./pages/lineup/sova-sunset"; 
import { auth } from './firebase';
import { useEffect } from "react";

const queryClient = new QueryClient();

// This component will handle redirection based on auth state
const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect a logged-in user from the auth page to the dashboard.
        // DO NOT redirect from the profile setup page.
        if (location.pathname === '/') {
          navigate('/dashboard');
        }
      } else {
        // Redirect a logged-out user to the auth page if they are not already there.
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthWrapper />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/hunter" element={<Hunter />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournaments" element={<Tournament />} />
          <Route path="/app" element={<Riot />} />
          <Route path="/live-match" element={<LiveMatchPage />} /> 
          <Route path="/dashboard/guide" element={<ValorantSelector />} /> 
          <Route path="/sunset-sova" element={<SovaSun />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;