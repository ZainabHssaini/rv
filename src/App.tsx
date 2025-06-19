import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FeaturesPage from "./pages/FeaturesPage";
import TherapyPage from "./pages/TherapyPage";
import PetGamePage from "./pages/PetGamePage";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import BlogsPodcastsPage from "./pages/BlogsPodcastsPage";
import SignIn from "./pages/SignIn";
import { PetGameProvider } from "./context/PetGameContext";
import SignUp from "./pages/SignUp";
import ChatTherapist from "./components/ChatTherapist";
import BookVideo from "./components/BookVideo";
import ParentsPage from "./pages/ParentsPage";
import BankTransfer from "./pages/BankTransfer";
import RevivaSolution from "./pages/RevivaSolution";
import Entrepreneur from "./pages/Entrepreneur";
import CreateProjectPage from "./pages/CreateProjectPage";
import ExploreProjectsPage from "./pages/ExploreProjectsPage";
import Community from "./pages/Community";
import MarathonPage from "./pages/MarathonPage";
import Chatbot from "./components/Chatbot";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Chatbot/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/pet-game" element={
            <PetGameProvider>
              <PetGamePage />
            </PetGameProvider>
          } />
          <Route path="/mood-tracker" element={<MoodTrackerPage />} />
          <Route path="/blogs-podcasts" element={<BlogsPodcastsPage />} />
          <Route path="/chat" element={<ChatTherapist />} />
          <Route path="/book" element={<BookVideo />} />
          <Route path="/virement" element={<BankTransfer />} />
          <Route path="/sol" element={<RevivaSolution />} />
          <Route path="/sol/entrepreneur" element={<Entrepreneur />} />
          <Route path="/createProject" element={<CreateProjectPage />} />
          <Route path="/exploreProject" element={<ExploreProjectsPage />} />

          <Route path="/sol/marathon" element={<MarathonPage />} />
          <Route path="/sol/Community" element={<Community />} />

=

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;