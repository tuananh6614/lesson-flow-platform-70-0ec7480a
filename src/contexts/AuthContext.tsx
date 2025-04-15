
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
        toast({
          title: 'Error',
          description: 'Failed to load user profile',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [toast]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${user.full_name}`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout failed',
        description: 'An error occurred while logging out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await registerUser(fullName, email, password);
      setUser(newUser);
      toast({
        title: 'Registration successful',
        description: `Welcome, ${newUser.full_name}!`,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
