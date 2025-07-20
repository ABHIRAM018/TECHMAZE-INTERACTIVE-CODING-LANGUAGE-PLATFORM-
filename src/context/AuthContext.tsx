import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    }).catch(error => {
      console.error('Session check error:', error);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username // Store username in user metadata
          }
        }
      });

      if (authError) {
        console.error('Auth error details:', authError);
        throw new Error(authError.message);
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: authData.user.id, 
            username,
            updated_at: new Date().toISOString()
          }]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error('Failed to create user profile');
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred during registration');
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error details:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof Error) {
        throw new Error(`Sign in failed: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred during sign in');
      }
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error details:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Sign out error:', error);
      if (error instanceof Error) {
        throw new Error(`Sign out failed: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred during sign out');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}