/**
 * Admin Login Page
 * Special login for administrators with direct access to admin dashboard
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Admin credentials - matching the main login page
const ADMIN_EMAIL = 'admin@fundyourfuture.edu';
const ADMIN_PASSWORD = 'Admin123!';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleQuickLogin = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if using admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Sign in with Firebase (we'll create this user if it doesn't exist)
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (authError: unknown) {
          const firebaseError = authError as AuthError;
          if (firebaseError.code === 'auth/user-not-found') {
            // Admin user doesn't exist yet, redirect to setup
            setError(
              'Admin account not set up yet. Please use the debug page to create test users first.'
            );
            setLoading(false);
            return;
          }
          throw authError;
        }

        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setError(
          'Invalid admin credentials. Please use the correct admin email and password.'
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Admin login error:', error);
      setError(errorMessage || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-orange-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 text-4xl">🔐</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600">Fund Your Future Platform</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              placeholder="admin@fundyourfuture.edu"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Access Admin Dashboard'}
          </button>
        </form>

        {/* Demo Credentials - Same style as main login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Demo Credentials
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 p-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-900">
              <span>🔑</span>
              <span>Admin Login Credentials</span>
            </h4>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="hover:bg-orange-25 w-full cursor-pointer rounded border border-orange-200 bg-white p-3 transition-colors hover:border-orange-400"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                  ADMIN
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Fund Your Future Admin
                </span>
              </div>
              <div className="space-y-1 text-left text-xs">
                <div>
                  <strong>Email:</strong>{' '}
                  <code className="rounded bg-gray-100 px-1 text-orange-700">
                    {ADMIN_EMAIL}
                  </code>
                </div>
                <div>
                  <strong>Password:</strong>{' '}
                  <code className="rounded bg-gray-100 px-1 text-orange-700">
                    {ADMIN_PASSWORD}
                  </code>
                </div>
              </div>
            </button>

            <div className="mt-3 flex items-center gap-2 text-xs text-orange-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Click the admin card above to auto-fill login credentials
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}
