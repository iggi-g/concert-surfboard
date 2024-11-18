import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Callback from "@/pages/Callback";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;