export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          role: 'parent' | 'teacher' | 'admin';
          country: string | null;
          language_code: string;
          email_verified: boolean;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          supabase_id: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: 'parent' | 'teacher' | 'admin';
          country?: string | null;
          language_code?: string;
          email_verified?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          supabase_id: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: 'parent' | 'teacher' | 'admin';
          country?: string | null;
          language_code?: string;
          email_verified?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          supabase_id?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          tier: 'explore' | 'save' | 'flourish';
          status: 'active' | 'canceled' | 'past_due' | 'unpaid';
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          tier: 'explore' | 'save' | 'flourish';
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string;
          tier?: 'explore' | 'save' | 'flourish';
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          module_id: string;
          progress_percentage: number;
          last_accessed: string;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id: string;
          progress_percentage?: number;
          last_accessed?: string;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          module_id?: string;
          progress_percentage?: number;
          last_accessed?: string;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: 'parent' | 'teacher' | 'admin';
      subscription_tier: 'explore' | 'save' | 'flourish';
      subscription_status: 'active' | 'canceled' | 'past_due' | 'unpaid';
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
