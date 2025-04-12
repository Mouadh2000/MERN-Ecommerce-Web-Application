import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const ProtectedRoute = ({ element, requiresAuth }) => {
  const { isLoggedIn } = useAuth();

  if (requiresAuth && !isLoggedIn) {
    return <Navigate to="/MyAccountSignIn" />;
  }

  return element;
};

export default ProtectedRoute;