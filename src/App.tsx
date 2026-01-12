import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Master Pages
import InstitusiPage from "./pages/master/InstitusiPage";
import ProdiPage from "./pages/master/ProdiPage";
import KelasPage from "./pages/master/KelasPage";
import RuanganPage from "./pages/master/RuanganPage";
import MatakuliahPage from "./pages/master/MatakuliahPage";
import DosenPage from "./pages/master/DosenPage";
import MahasiswaPage from "./pages/master/MahasiswaPage";

// Akademik Pages
import JadwalPage from "./pages/akademik/JadwalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Master Data */}
              <Route path="/master/institusi" element={<InstitusiPage />} />
              <Route path="/master/prodi" element={<ProdiPage />} />
              <Route path="/master/kelas" element={<KelasPage />} />
              <Route path="/master/ruangan" element={<RuanganPage />} />
              <Route path="/master/matakuliah" element={<MatakuliahPage />} />
              <Route path="/master/dosen" element={<DosenPage />} />
              <Route path="/master/mahasiswa" element={<MahasiswaPage />} />
              
              {/* Akademik */}
              <Route path="/akademik/jadwal" element={<JadwalPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
