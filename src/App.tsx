
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedLayout from "@/components/ui/AnimatedLayout";
import { useAuth } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Attractions from "./pages/Attractions";
import Tickets from "./pages/Tickets";
import Agents from "./pages/Agents";
import Wallet from "./pages/Wallet";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <AdminDashboard />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/attractions" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Attractions />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/tickets" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Tickets />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/agents" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Agents />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/wallet" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Wallet />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/bookings" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Bookings />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payments" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <Payments />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={
        <ProtectedRoute>
          <AnimatedLayout>
            <NotFound />
          </AnimatedLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
