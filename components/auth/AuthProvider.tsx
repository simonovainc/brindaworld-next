'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type AuthUser } from '@/types/index';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (isMounted && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Auth initialization failed'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
          });
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'));
    }
  }, [supabase.auth]);

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
