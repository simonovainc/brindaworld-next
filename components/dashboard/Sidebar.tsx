'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('supabase_id', user.id)
          .single();
        if (data) {
          setUserRole(data.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [user]);

  const modules: SidebarItem[] = [
    { href: '/chess', label: 'Chess', icon: '♟️' },
    { href: '/coding', label: 'Coding', icon: '💻' },
    { href: '/quiz', label: 'She Can Be', icon: '🎯' },
    { href: '/geography', label: 'Geography', icon: '🌍' },
  ];

  const dashboardItems: SidebarItem[] =
    userRole === 'parent'
      ? [{ href: '/dashboard/parent', label: 'Parent Dashboard', icon: '👨‍👩‍👧' }]
      : userRole === 'teacher'
        ? [{ href: '/dashboard/teacher', label: 'Teacher Dashboard', icon: '👩‍🏫' }]
        : userRole === 'admin'
          ? [{ href: '/admin/analytics', label: 'Admin Panel', icon: '⚙️' }]
          : [];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-brinda-purple text-white h-screen flex flex-col">
      <div className="p-6 border-b border-purple-400">
        <h1 className="text-2xl font-bold">BrindaWorld</h1>
        <p className="text-sm text-purple-200">{user?.email || 'Welcome'}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-purple-200 uppercase mb-3">Dashboard</h3>
          {dashboardItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors mb-2',
                isActive(item.href)
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-100 hover:bg-purple-500'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-purple-200 uppercase mb-3">Modules</h3>
          {modules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors mb-2',
                isActive(item.href)
                  ? 'bg-brinda-gold text-brinda-purple'
                  : 'text-purple-100 hover:bg-purple-500'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-purple-400">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={signOut}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
