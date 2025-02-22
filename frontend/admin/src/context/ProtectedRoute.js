import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element, requiresAuth }) => {
  const { isLoggedIn } = useAuth();

  if (requiresAuth && !isLoggedIn) {
    return <Navigate to="/authentication/sign-in/" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  requiresAuth: PropTypes.bool.isRequired,
};

export default ProtectedRoute;