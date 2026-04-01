'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import type { Profile } from '@/types/database';

export default function AdminAnalytics() {
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

        if (data && data.role === 'admin') {
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

  if (profile?.role !== 'admin') {
    return (
      <div className="p-8">
        <p className="text-red-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brinda-purple mb-8">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-purple">0</div>
            <p className="text-gray-600 text-sm">Total Users</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-gold">0</div>
            <p className="text-gray-600 text-sm">Active Subscriptions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600">$0</div>
            <p className="text-gray-600 text-sm">Revenue</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600">0%</div>
            <p className="text-gray-600 text-sm">Growth</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">User Breakdown</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { role: 'Parents', count: 0 },
                { role: 'Teachers', count: 0 },
                { role: 'Admins', count: 1 },
              ].map((item) => (
                <div key={item.role} className="flex justify-between">
                  <span className="text-gray-700">{item.role}</span>
                  <span className="font-bold text-brinda-purple">{item.count}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">Subscription Tiers</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { tier: 'Explore', count: 0 },
                { tier: 'Save', count: 0 },
                { tier: 'Flourish', count: 0 },
              ].map((item) => (
                <div key={item.tier} className="flex justify-between">
                  <span className="text-gray-700">{item.tier}</span>
                  <span className="font-bold text-brinda-purple">{item.count}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
