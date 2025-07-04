
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Signals from "./pages/Signals";
import OpenPositions from './pages/OpenPositions';
import Orders from './pages/Orders';
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SignalDetail from "./pages/SignalDetail";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BrokerIntegration from "./pages/BrokerIntegration";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSignals from "./pages/admin/AdminSignals";
import AdminSettings from "./pages/admin/AdminSettings";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import RiskDisclosure from "./pages/legal/RiskDisclosure";
import ShariahCompliance from "./pages/legal/ShariahCompliance";
import GDPRCompliance from "./pages/legal/GDPRCompliance";
import CookieNotice from "./pages/legal/CookieNotice";

// Create QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LanguageProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signals" element={<Signals />} />
                <Route path="/signals/:symbol" element={<SignalDetail />} />
                <Route path="/open-positions" element={<OpenPositions />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin-old" element={<Admin />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/broker-integration" element={<BrokerIntegration />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Admin Routes - Protected */}
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminProtectedRoute>
                    <AdminUsers />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/signals" element={
                  <AdminProtectedRoute>
                    <AdminSignals />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <AdminProtectedRoute>
                    <AdminSettings />
                  </AdminProtectedRoute>
                } />
                
                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/risk-disclosure" element={<RiskDisclosure />} />
                <Route path="/shariah-compliance" element={<ShariahCompliance />} />
                <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
                <Route path="/cookie-notice" element={<CookieNotice />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
