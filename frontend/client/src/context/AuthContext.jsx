import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setAuthError(null);
      const response = await axiosInstance.post('/login/', { email, password });
      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + access_token;

      const userResponse = await axiosInstance.get('/details/');
      setCurrentUser(userResponse.data);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Une erreur s'est produite lors de la connexion.";
      setAuthError(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    delete axiosInstance.defaults.headers['Authorization'];
    navigate('/MyAccountSignIn');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken) {
        try {
          axiosInstance.defaults.headers['Authorization'] = "Bearer " + accessToken;
          const userResponse = await axiosInstance.get('/details/');
          setCurrentUser(userResponse.data);
          setIsLoggedIn(true);
        } catch (error) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            logout();
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
    authError,
    login,
    logout,
    setAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};