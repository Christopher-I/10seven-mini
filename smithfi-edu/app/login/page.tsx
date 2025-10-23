/**
 * Login Page
 * Simple authentication that accepts any username/password
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Removed unused Link import
import { useAuth } from '@/contexts/AuthContext';
import { formatAuthError } from '@/lib/auth';
import { AuthError } from 'firebase/auth';
import { getUserWithRole, getDashboardRoute } from '@/lib/roles';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    if (showSignUp && !displayName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    try {
      if (showSignUp) {
        await signUp(email, password, displayName);
        setError('');
        router.push('/');
      } else {
        await signIn(email, password);

        // Get user role from Firebase and redirect accordingly
        // We need to wait for Firebase auth to complete, then get the current user
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for auth state to update

        const currentUser = auth.currentUser;
        if (currentUser) {
          const userWithRole = await getUserWithRole(currentUser);
          const dashboardRoute = getDashboardRoute(userWithRole.role);

          console.log(`User role: ${userWithRole.role}, redirecting to: ${dashboardRoute}`);
          router.push(dashboardRoute);
        } else {
          // Fallback to default route
          router.push('/');
        }
      }
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(formatAuthError(authError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-stone-600 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Smith College | CONWAY
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Financial Education Partnership
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {showSignUp && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 text-black"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 text-black"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 text-black"
                  placeholder="Enter your password"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-stone-400 cursor-not-allowed' 
                    : 'bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  showSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Test Credentials - Always visible */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Test Accounts</span>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <span>🧪</span>
                <span>Demo Login Credentials</span>
              </h4>
              
              <div className="space-y-3">
                <button 
                  type="button"
                  onClick={() => {
                    setEmail('student@fundyourfuture.edu');
                    setPassword('SmithFi123!');
                  }}
                  className="w-full bg-white rounded p-3 border border-blue-200 hover:border-blue-400 hover:bg-blue-25 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">STUDENT</span>
                    <span className="text-sm font-medium text-gray-900">Jane Student</span>
                  </div>
                  <div className="text-xs space-y-1 text-left">
                    <div><strong>Email:</strong> <code className="bg-gray-100 px-1 rounded text-blue-700">student@fundyourfuture.edu</code></div>
                    <div><strong>Password:</strong> <code className="bg-gray-100 px-1 rounded text-blue-700">SmithFi123!</code></div>
                  </div>
                </button>
                
                <button 
                  type="button"
                  onClick={() => {
                    setEmail('instructor@fundyourfuture.edu');
                    setPassword('Teach123!');
                  }}
                  className="w-full bg-white rounded p-3 border border-blue-200 hover:border-blue-400 hover:bg-blue-25 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">INSTRUCTOR</span>
                    <span className="text-sm font-medium text-gray-900">Prof. Smith</span>
                  </div>
                  <div className="text-xs space-y-1 text-left">
                    <div><strong>Email:</strong> <code className="bg-gray-100 px-1 rounded text-blue-700">instructor@fundyourfuture.edu</code></div>
                    <div><strong>Password:</strong> <code className="bg-gray-100 px-1 rounded text-blue-700">Teach123!</code></div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@fundyourfuture.edu');
                    setPassword('Admin123!');
                  }}
                  className="w-full bg-white rounded p-3 border border-orange-200 hover:border-orange-400 hover:bg-orange-25 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-semibold">ADMIN</span>
                    <span className="text-sm font-medium text-gray-900">Admin User</span>
                  </div>
                  <div className="text-xs space-y-1 text-left">
                    <div><strong>Email:</strong> <code className="bg-gray-100 px-1 rounded text-orange-700">admin@fundyourfuture.edu</code></div>
                    <div><strong>Password:</strong> <code className="bg-gray-100 px-1 rounded text-orange-700">Admin123!</code></div>
                    <div className="text-orange-600 font-medium mt-1">→ Redirects to Admin Dashboard</div>
                  </div>
                </button>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Click on any user card above to auto-fill login credentials</span>
              </div>
            </div>
          </div>

          {/* Sign Up Toggle */}
          <div className="mt-6 text-center">
            <div className="text-gray-600 text-sm">
              {showSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setShowSignUp(!showSignUp);
                  setError('');
                }}
                className="text-stone-600 hover:text-stone-800 font-medium cursor-pointer"
              >
                {showSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}