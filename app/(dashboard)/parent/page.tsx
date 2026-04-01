'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Profile } from '@/types/database';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('supabase_id', user.id)
          .single();

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  const modules = [
    { name: 'Chess', icon: '♟️', href: '/chess' },
    { name: 'Coding', icon: '💻', href: '/coding' },
    { name: 'She Can Be', icon: '🎯', href: '/quiz' },
    { name: 'Geography', icon: '🌍', href: '/geography' },
    { name: 'Leadership', icon: '👑', href: '/leadership' },
    { name: 'Wellness', icon: '💪', href: '/wellness' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brinda-purple mb-2">
        Welcome, {profile?.first_name || 'Parent'}!
      </h1>
      <p className="text-gray-600 mb-8">Track your children's learning progress and achievements.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-purple">0</div>
            <p className="text-gray-600 text-sm mt-2">Children</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-gold">0%</div>
            <p className="text-gray-600 text-sm mt-2">Avg Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-gray-600 text-sm mt-2">Achievements</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-gray-600 text-sm mt-2">Modules Unlocked</p>
          </CardBody>
        </Card>
      </div>

      {/* Children Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-brinda-purple">Your Children</h2>
            </CardHeader>
            <CardBody>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">You haven't added any children yet.</p>
                <Button variant="primary">Add Your First Child</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-brinda-purple">Subscription</h3>
          </CardHeader>
          <CardBody>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Plan</p>
              <p className="font-bold text-brinda-purple">Free</p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <p className="font-bold text-green-600">Active</p>
            </div>
            <Button variant="outline" className="w-full">
              Upgrade Plan
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-brinda-purple">Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <div className="text-center py-8 text-gray-600">
            <p>No recent activity yet.</p>
            <p className="text-sm mt-2">Activity will appear here once your children start learning.</p>
          </div>
        </CardBody>
      </Card>

      {/* Quick Links to Modules */}
      <div>
        <h2 className="text-2xl font-bold text-brinda-purple mb-6">Learning Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <Card hoverable className="h-full text-center cursor-pointer">
                <CardBody className="flex flex-col items-center justify-center min-h-[120px]">
                  <div className="text-3xl mb-2">{module.icon}</div>
                  <p className="font-semibold text-brinda-purple text-sm">{module.name}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
