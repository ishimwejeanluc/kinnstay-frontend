
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GuestDashboard from "./pages/dashboard/GuestDashboard";
import HostDashboard from "./pages/dashboard/HostDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import GuestBookings from "./pages/dashboard/guest/GuestBookings";
import GuestSaved from "./pages/dashboard/guest/GuestSaved";
import HostProperties from "./pages/dashboard/host/HostProperties";
import HostBookings from "./pages/dashboard/host/HostBookings";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminProperties from "./pages/dashboard/admin/AdminProperties";
import PropertyDetail from "./pages/PropertyDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSettings from "./pages/profile/ProfileSettings";

const queryClient = new QueryClient();

// This component checks if a user is already authenticated,
// and if so, redirects them to their dashboard
const HomeRedirect = () => {
  const { isAuthenticated, getDashboardPath } = useAuth();
  
  if (isAuthenticated) {
    const dashboardPath = getDashboardPath();
    return <Navigate to={dashboardPath} replace />;
  }
  
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Profile Routes */}
            <Route path="/profile">
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute allowedRoles={['guest', 'host', 'admin']}>
                    <ProfileSettings />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Protected Routes */}
            <Route path="/dashboard">
              {/* Guest Dashboard Routes */}
              <Route path="guest">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['guest', 'admin']}>
                      <GuestDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="bookings" 
                  element={
                    <ProtectedRoute allowedRoles={['guest', 'admin']}>
                      <GuestBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="saved" 
                  element={
                    <ProtectedRoute allowedRoles={['guest', 'admin']}>
                      <GuestSaved />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Host Dashboard Routes */}
              <Route path="host">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['host', 'admin']}>
                      <HostDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="properties" 
                  element={
                    <ProtectedRoute allowedRoles={['host', 'admin']}>
                      <HostProperties />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="bookings" 
                  element={
                    <ProtectedRoute allowedRoles={['host', 'admin']}>
                      <HostBookings />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Admin Dashboard Routes */}
              <Route path="admin">
                <Route 
                  index
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="users" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminUsers />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="properties" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminProperties />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Default redirect based on role */}
              <Route 
                index
                element={<Navigate to="/dashboard/guest" replace />} 
              />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
