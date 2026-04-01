import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  const response: {
    status: 'ok' | 'degraded';
    timestamp: string;
    checks: Record<string, boolean>;
  } = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      api: true,
      supabase: true,
    },
  };

  try {
    const supabase = await createServerSupabaseClient();
    await supabase.from('profiles').select('id').limit(1);
  } catch (error) {
    console.error('Health check: Supabase connection failed', error);
    response.checks.supabase = false;
    response.status = 'degraded';
  }

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
