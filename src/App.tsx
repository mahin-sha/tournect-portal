
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedLayout from "@/components/ui/AnimatedLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Attractions from "./pages/Attractions";
import Tickets from "./pages/Tickets";
import Agents from "./pages/Agents";
import Wallet from "./pages/Wallet";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/payments" element={<Payments />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatedLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
