import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}