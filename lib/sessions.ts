import { createClient } from '@/lib/supabase/client';
import { createAdminClient } from '@/lib/supabase/admin';
import { v4 as uuidv4 } from 'uuid';

const SESSION_ID_KEY = 'brinda_session_id';
const ANON_SESSION_KEY = 'brinda_anon_session';

interface AnonSession {
  id: string;
  createdAt: number;
}

class SessionManager {
  private supabase = createClient();
  private adminClient = createAdminClient();
  private currentSessionId: string | null = null;

  async getOrCreateSession(): Promise<string> {
    if (this.currentSessionId) {
      return this.currentSessionId;
    }

    // Try to get existing session from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SESSION_ID_KEY);
      if (stored) {
        this.currentSessionId = stored;
        return stored;
      }

      // Check if user is authenticated
      const {
        data: { session },
      } = await this.supabase.auth.getSession();

      if (session?.user) {
        // Authenticated user - use their profile ID
        this.currentSessionId = session.user.id;
        localStorage.setItem(SESSION_ID_KEY, this.currentSessionId);
        return this.currentSessionId;
      }

      // Anonymous user - create new session
      const sessionId = await this.createAnonSession();
      localStorage.setItem(SESSION_ID_KEY, sessionId);
      this.currentSessionId = sessionId;
      return sessionId;
    }

    return '';
  }

  private async createAnonSession(): Promise<string> {
    const sessionId = uuidv4();
    const now = new Date();

    try {
      // Insert into anon_sessions table
      await this.adminClient.from('anon_sessions').insert({
        id: sessionId,
        created_at: now.toISOString(),
        expires_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          created_at_timestamp: Date.now(),
        },
      });
    } catch (error) {
      // Graceful failure - user can still continue with session ID in memory
      console.error('Failed to create anon session:', error);
    }

    return sessionId;
  }

  async migrateAnonToProfile(profileId: string): Promise<void> {
    const sessionId = await this.getOrCreateSession();

    try {
      // Update anon_sessions to link to profile
      await this.adminClient
        .from('anon_sessions')
        .update({
          profile_id: profileId,
          migrated_at: new Date().toISOString(),
        })
        .eq('id', sessionId);

      // Update localStorage with profile ID
      localStorage.setItem(SESSION_ID_KEY, profileId);
      this.currentSessionId = profileId;
    } catch (error) {
      console.error('Failed to migrate anon session to profile:', error);
    }
  }

  getSessionId(): string | null {
    return this.currentSessionId;
  }

  async clearSession(): Promise<void> {
    try {
      const sessionId = await this.getOrCreateSession();

      // Mark session as ended
      await this.adminClient
        .from('anon_sessions')
        .update({
          ended_at: new Date().toISOString(),
        })
        .eq('id', sessionId);
    } catch (error) {
      // Graceful failure
      console.error('Failed to clear session:', error);
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_ID_KEY);
    }
    this.currentSessionId = null;
  }
}

// Singleton instance
let sessionManagerInstance: SessionManager | null = null;

export function getSessionManager(): SessionManager {
  if (!sessionManagerInstance) {
    sessionManagerInstance = new SessionManager();
  }
  return sessionManagerInstance;
}

export async function getOrCreateSession(): Promise<string> {
  return getSessionManager().getOrCreateSession();
}

export async function migrateAnonToProfile(profileId: string): Promise<void> {
  return getSessionManager().migrateAnonToProfile(profileId);
}

export function getSessionId(): string | null {
  return getSessionManager().getSessionId();
}

export async function clearSession(): Promise<void> {
  return getSessionManager().clearSession();
}
