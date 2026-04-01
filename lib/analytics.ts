'use client';

import { createClient } from '@/lib/supabase/client';

export type EventType =
  | 'page_view'
  | 'module_start'
  | 'module_complete'
  | 'game_event'
  | 'session_start'
  | 'session_end'
  | 'custom_event';

interface AnalyticsEvent {
  eventType: EventType;
  metadata?: Record<string, any>;
  timestamp?: number;
}

interface QueuedEvent extends AnalyticsEvent {
  sessionId: string;
  profileId?: string;
  timestamp: number;
}

class AnalyticsTracker {
  private eventQueue: QueuedEvent[] = [];
  private batchInterval: NodeJS.Timeout | null = null;
  private sessionId: string | null = null;
  private profileId: string | null = null;
  private supabase = createClient();
  private isProcessing = false;

  constructor() {
    this.initializeBatchQueue();
    this.setupBeforeUnload();
  }

  private initializeBatchQueue() {
    // Batch send every 5 seconds
    this.batchInterval = setInterval(() => {
      this.flushEvents();
    }, 5000);
  }

  private setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flushEvents();
      });
    }
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  setProfileId(profileId: string) {
    this.profileId = profileId;
  }

  private async flushEvents() {
    if (this.eventQueue.length === 0 || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: eventsToSend,
        }),
      });

      if (!response.ok) {
        // Re-queue events if send failed
        this.eventQueue = eventsToSend.concat(this.eventQueue);
      }
    } catch (error) {
      // Silently fail - never block UI
      // Re-queue events for retry
      this.eventQueue = eventsToSend.concat(this.eventQueue);
    } finally {
      this.isProcessing = false;
    }
  }

  trackEvent(eventType: EventType, metadata?: Record<string, any>) {
    if (!this.sessionId) {
      return;
    }

    const event: QueuedEvent = {
      eventType,
      metadata: metadata || {},
      sessionId: this.sessionId,
      profileId: this.profileId || undefined,
      timestamp: Date.now(),
    };

    this.eventQueue.push(event);

    // Flush if queue gets too large
    if (this.eventQueue.length >= 20) {
      this.flushEvents();
    }
  }

  trackPageView(page: string, module?: string) {
    this.trackEvent('page_view', {
      page,
      module,
    });
  }

  trackModuleStart(module: string, childId?: string) {
    this.trackEvent('module_start', {
      module,
      childId,
    });
  }

  trackModuleComplete(module: string, score?: number, childId?: string) {
    this.trackEvent('module_complete', {
      module,
      score,
      childId,
    });
  }

  trackGameEvent(module: string, action: string, metadata?: Record<string, any>) {
    this.trackEvent('game_event', {
      module,
      action,
      ...metadata,
    });
  }

  trackSessionStart() {
    this.trackEvent('session_start');
  }

  trackSessionEnd() {
    this.trackEvent('session_end');
    // Immediately flush on session end
    this.flushEvents();
  }

  destroy() {
    if (this.batchInterval) {
      clearInterval(this.batchInterval);
    }
    this.flushEvents();
  }
}

// Singleton instance
let trackerInstance: AnalyticsTracker | null = null;

export function initializeAnalytics(): AnalyticsTracker {
  if (!trackerInstance) {
    trackerInstance = new AnalyticsTracker();
  }
  return trackerInstance;
}

export function getAnalytics(): AnalyticsTracker {
  if (!trackerInstance) {
    trackerInstance = new AnalyticsTracker();
  }
  return trackerInstance;
}
