'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brinda-purple mb-8">
        Welcome, {profile?.first_name || 'Parent'}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-purple">0</div>
            <p className="text-gray-600 text-sm">Children</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-gold">0%</div>
            <p className="text-gray-600 text-sm">Avg Progress</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-gray-600 text-sm">Achievements</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-gray-600 text-sm">Modules Unlocked</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-brinda-purple">Children Overview</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">No children added yet. Add children to track their learning progress.</p>
        </CardBody>
      </Card>
    </div>
  );
}
