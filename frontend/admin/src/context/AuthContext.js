import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosApi';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login/', { email, password });
      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + access_token;

      const userResponse = await axiosInstance.get('/details/');
      const user = userResponse.data;
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    delete axiosInstance.defaults.headers['Authorization'];
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const isAuthenticated = !!accessToken && !!refreshToken;
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        try {
          const userResponse = await axiosInstance.get('/details/');
          setCurrentUser(userResponse.data);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            navigate('/');
          }
          console.error('Failed to fetch user details:', error);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    isLoggedIn,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };