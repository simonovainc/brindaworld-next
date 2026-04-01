'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { initializeAnalytics, getAnalytics } from '@/lib/analytics';
import { getOrCreateSession } from '@/lib/sessions';
import { useAuth } from '@/components/auth/AuthProvider';

interface AnalyticsContextType {
  trackEvent: (eventType: string, metadata?: Record<string, any>) => void;
  trackPageView: (page: string, module?: string) => void;
  trackModuleStart: (module: string, childId?: string) => void;
  trackModuleComplete: (module: string, score?: number, childId?: string) => void;
  trackGameEvent: (module: string, action: string, metadata?: Record<string, any>) => void;
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const analyticsRef = React.useRef(initializeAnalytics());

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const sessionId = await getOrCreateSession();
        analyticsRef.current.setSessionId(sessionId);

        // Track session start
        analyticsRef.current.trackSessionStart();

        // Set profile ID if user is authenticated
        if (user?.id) {
          analyticsRef.current.setProfileId(user.id);
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initializeSession();

    // Setup session end on beforeunload
    const handleBeforeUnload = () => {
      analyticsRef.current.trackSessionEnd();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user?.id]);

  // Track page view on route change
  useEffect(() => {
    if (pathname) {
      // Parse module from pathname (e.g., /play/chess -> play, chess)
      const segments = pathname.split('/').filter(Boolean);
      const flow = segments[0]; // play, learn, lead
      const module = segments[1]; // specific module

      analyticsRef.current.trackPageView(pathname, flow);
    }
  }, [pathname]);

  // Update profile ID when user changes
  useEffect(() => {
    if (user?.id) {
      analyticsRef.current.setProfileId(user.id);
    }
  }, [user?.id]);

  const value: AnalyticsContextType = {
    trackEvent: (eventType, metadata) =>
      analyticsRef.current.trackEvent(eventType as any, metadata),
    trackPageView: (page, module) =>
      analyticsRef.current.trackPageView(page, module),
    trackModuleStart: (module, childId) =>
      analyticsRef.current.trackModuleStart(module, childId),
    trackModuleComplete: (module, score, childId) =>
      analyticsRef.current.trackModuleComplete(module, score, childId),
    trackGameEvent: (module, action, metadata) =>
      analyticsRef.current.trackGameEvent(module, action, metadata),
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
