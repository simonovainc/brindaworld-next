'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Profile } from '@/types/database';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

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
          setFormData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: user.email || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
        })
        .eq('supabase_id', user?.id);

      if (error) throw error;

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-brinda-purple mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your account and preferences</p>

      {/* Profile Settings */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-brinda-purple">Profile Settings</h2>
        </CardHeader>
        <CardBody>
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-6">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label="First Name"
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              placeholder="Your first name"
              disabled={isSaving}
            />

            <Input
              label="Last Name"
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              placeholder="Your last name"
              disabled={isSaving}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              disabled
              placeholder="your@email.com"
            />

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Language Preference */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-brinda-purple">Language & Region</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brinda-purple"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="pt-4">
              <Button variant="primary">Save Preference</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Notification Preferences */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-brinda-purple">Notification Preferences</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Receive text messages' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser notifications' },
            ].map((pref) => (
              <label key={pref.key} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  checked={notifications[pref.key as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      [pref.key]: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-brinda-purple rounded cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{pref.label}</p>
                  <p className="text-sm text-gray-600">{pref.desc}</p>
                </div>
              </label>
            ))}

            <div className="pt-4">
              <Button variant="primary">Save Preferences</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Subscription Management */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-brinda-purple">Subscription Management</h2>
        </CardHeader>
        <CardBody>
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Current Plan</p>
            <p className="text-2xl font-bold text-brinda-purple">Free</p>
            <p className="text-sm text-gray-600 mt-2">Unlimited access to free content</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Next Billing Date</p>
            <p className="text-lg font-semibold text-gray-700">N/A</p>
          </div>

          <div className="flex gap-4">
            <Link href="/pricing">
              <Button variant="primary">Upgrade Plan</Button>
            </Link>
            <Button variant="outline">View Invoice History</Button>
          </div>
        </CardBody>
      </Card>

      {/* Data & Privacy */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold text-brinda-purple">Data & Privacy</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Your Privacy:</strong> We take your privacy seriously. Read our{' '}
                <Link href="/legal/privacy" className="text-brinda-purple hover:underline">
                  Privacy Policy
                </Link>
                {' '}for details on how we handle your data.
              </p>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full">
                View Data Usage
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Account Actions */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <h2 className="text-2xl font-bold text-red-700">Account Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <p className="font-semibold text-gray-700 mb-3">Danger Zone</p>
              <p className="text-sm text-gray-600 mb-4">
                These actions cannot be undone. Please proceed with caution.
              </p>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  Change Password
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                      console.log('Account deletion initiated');
                    }
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="border-0 pt-0">
          <Button
            variant="outline"
            onClick={signOut}
            className="w-full"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
