import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';
import { API_ENDPOINTS } from '../config/api.js';
import { initSocket, disconnectSocket } from '../services/socket.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ME);
      setUser(response.data.user);

      // Initialize socket connection
      if (token) {
        initSocket(token);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Initialize socket
      initSocket(token);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Initialize socket
      initSocket(token);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    disconnectSocket();
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

