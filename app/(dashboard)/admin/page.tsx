'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) return;

      try {
        const supabase = createClient();
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('supabase_id', user.id)
          .single();

        if (profile?.role !== 'admin') {
          // Redirect if not admin
          window.location.href = '/dashboard/parent';
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
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
      <h1 className="text-3xl font-bold text-brinda-purple mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8">Platform analytics and management</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-purple">0</div>
            <p className="text-gray-600 text-sm mt-2">Total Users</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-brinda-gold">0</div>
            <p className="text-gray-600 text-sm mt-2">Active Children</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-gray-600 text-sm mt-2">Subscriptions</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600">$0</div>
            <p className="text-gray-600 text-sm mt-2">Revenue</p>
          </CardBody>
        </Card>
      </div>

      {/* Charts Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">User Growth</h2>
          </CardHeader>
          <CardBody>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Chart placeholder - User growth over time
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">Module Usage</h2>
          </CardHeader>
          <CardBody>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Chart placeholder - Module usage breakdown
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-brinda-purple">Recent Signups</h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center py-8 text-gray-500">
                  <td colSpan={3}>No recent signups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-brinda-purple">API Status</h3>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 font-semibold">Operational</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-brinda-purple">Database</h3>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 font-semibold">Healthy</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-brinda-purple">Storage</h3>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 font-semibold">Available</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-brinda-purple">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full">Manage Users</Button>
            <Button variant="outline" className="w-full">View Analytics</Button>
            <Button variant="outline" className="w-full">Content Management</Button>
            <Button variant="outline" className="w-full">System Settings</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
