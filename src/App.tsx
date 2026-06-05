import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header, MobileBottomNav, Footer } from "@/components/Layout";
import Index from "./pages/Index";
import MandiPrices from "./pages/MandiPrices";
import Weather from "./pages/Weather";
import Marketplace from "./pages/Marketplace";
import Schemes from "./pages/Schemes";
import CropAdvisor from "./pages/CropAdvisor";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mandi" element={<MandiPrices />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/advisor" element={<CropAdvisor />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <MobileBottomNav />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
