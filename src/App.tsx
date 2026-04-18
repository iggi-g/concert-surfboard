import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Favorites from "@/pages/Favorites";
import EventPage from "@/pages/EventPage";
import VenuesIndex from "@/pages/VenuesIndex";
import VenuePage from "@/pages/VenuePage";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import "./App.css";

const queryClient = new QueryClient();

function AppContent() {
  useGoogleAnalytics();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/event/:slug" element={<EventPage />} />
        <Route path="/venues" element={<VenuesIndex />} />
        <Route path="/venues/:venueSlug" element={<VenuePage />} />
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;