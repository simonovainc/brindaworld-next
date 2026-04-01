import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  try {
    // Get user profile with role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('supabase_id', user.id)
      .single();

    // Redirect based on role
    if (profile?.role === 'parent') {
      redirect('/dashboard/parent');
    } else if (profile?.role === 'teacher') {
      redirect('/dashboard/teacher');
    } else if (profile?.role === 'admin') {
      redirect('/admin/analytics');
    }

    // Default to parent if no role set
    redirect('/dashboard/parent');
  } catch (error) {
    console.error('Error fetching user role:', error);
    // Default redirect on error
    redirect('/dashboard/parent');
  }
}
