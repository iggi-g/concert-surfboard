
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Favorites from "@/pages/Favorites";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { ThemeProvider } from "@/components/theme-provider";
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
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="concerts-cph-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
