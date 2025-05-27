import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return storedUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;