import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, getAccessToken, clearTokens, adaptUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userData = await authAPI.getProfile();
        setUser(userData);
      } catch (err) {
        // Token invalid/expired — clearTokens already called by request()
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setError(null);
    try {
      const { user: userData } = await authAPI.login(credentials);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const register = useCallback(async (data) => {
    setError(null);
    try {
      const { user: userData } = await authAPI.register(data);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.data || err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // Even if server call fails, clear local state
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    setError(null);
    try {
      const updated = await authAPI.updateProfile(profileData);
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await authAPI.getProfile();
      setUser(userData);
      return userData;
    } catch {
      return null;
    }
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;