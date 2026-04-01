export interface Module {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tier: 'explore' | 'save' | 'flourish';
  enabled: boolean;
}

export interface UserRole {
  role: 'parent' | 'teacher' | 'admin';
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}

export interface SubscriptionTier {
  name: 'explore' | 'save' | 'flourish';
  label: string;
  features: string[];
  price?: {
    monthly: number;
    annual: number;
  };
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
}

export interface StripeSubscription {
  id: string;
  customer: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  current_period_start: number;
  current_period_end: number;
}
