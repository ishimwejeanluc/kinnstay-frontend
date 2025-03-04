
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the appropriate dashboard when role changes
    if (user && !allowedRoles.includes(user.role)) {
      if (user.role === 'guest') {
        navigate('/dashboard/guest', { replace: true });
      } else if (user.role === 'host') {
        navigate('/dashboard/host', { replace: true });
      } else if (user.role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      }
    }
  }, [user, allowedRoles, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Return null while the useEffect handles the navigation
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
