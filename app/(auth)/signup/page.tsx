'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

const roles = ['parent', 'teacher', 'admin'];
const countries = ['United States', 'Canada', 'United Kingdom', 'France', 'Germany', 'Other'];

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'parent',
    country: 'United States',
    language: 'en',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!authData.user) {
        setError('Failed to create user');
        return;
      }

      // Create profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: crypto.randomUUID(),
            supabase_id: authData.user.id,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            country: formData.country,
            language_code: formData.language,
            email_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        setError(profileError.message);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brinda-pink via-white to-white px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold text-brinda-purple text-center">Join BrindaWorld</h1>
          <p className="text-center text-gray-600 mt-2">Create your account to get started</p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSignup} className="space-y-3">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brinda-purple"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brinda-purple"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brinda-purple"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-brinda-purple font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
