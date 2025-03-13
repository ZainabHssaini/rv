import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatbotPage from "./pages/ChatbotPage";
import FeaturesPage from "./pages/FeaturesPage";
import TherapyPage from "./pages/TherapyPage";
import PetGamePage from "./pages/PetGamePage";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import BlogsPodcastsPage from "./pages/BlogsPodcastsPage";
import SignIn from "./pages/Signin";
import { PetGameProvider } from "./context/PetGameContext";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/pet-game" element={
            <PetGameProvider>
              <PetGamePage />
            </PetGameProvider>
          } />
          <Route path="/mood-tracker" element={<MoodTrackerPage />} />
          <Route path="/blogs-podcasts" element={<BlogsPodcastsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
