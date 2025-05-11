
import React, { createContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, UserProfile } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { login, register, logout, updateProfile } from '@/services/authService';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, session, isLoading } = useAuthState();

  // Create the auth context value with our hooks and services
  const authContextType: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    login,
    register,
    logout,
    updateProfile: (data) => updateProfile(user, setUser, data)
  };

  return (
    <AuthContext.Provider value={authContextType}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth } from '@/hooks/useAuth';
