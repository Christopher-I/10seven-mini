/**
 * Test Authentication Page
 * Simple page to test and debug authentication flow
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

export default function TestAuthPage() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    console.log('Signing out...');
    try {
      await signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>

        {/* Current State Display */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Loading:</span>
              <span className={loading ? 'text-yellow-600' : 'text-green-600'}>
                {loading ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">User:</span>
              <span className={user ? 'text-green-600' : 'text-red-600'}>
                {user ? user.email : 'No user'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">User ID:</span>
              <span className="text-sm text-gray-600">
                {user?.uid || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Display Name:</span>
              <span>
                {userProfile?.displayName || user?.displayName || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Email Verified:</span>
              <span className={user?.emailVerified ? 'text-green-600' : 'text-yellow-600'}>
                {user?.emailVerified ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-medium">Profile Loaded:</span>
              <span className={userProfile ? 'text-green-600' : 'text-red-600'}>
                {userProfile ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          
          <div className="space-y-4">
            {!user ? (
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Open Login Modal
                </button>
                <div className="text-sm text-gray-600 text-center">
                  Use test credentials from the modal
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
                <div className="text-sm text-gray-600 text-center">
                  Click to sign out and test auth state changes
                </div>
              </>
            )}
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(
                {
                  loading,
                  user: user ? {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified
                  } : null,
                  userProfile: userProfile ? {
                    displayName: userProfile.displayName,
                    level: userProfile.progress?.level,
                    xp: userProfile.progress?.totalXP
                  } : null
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        {/* Test Credentials Reference */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Test Accounts</h3>
          <div className="space-y-1 text-sm text-blue-800">
            <div>• Student: student@fundyourfuture.edu / SmithFi123!</div>
            <div>• Instructor: instructor@fundyourfuture.edu / Teach123!</div>
            <div>• Admin: admin@fundyourfuture.edu / Admin123!</div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultMode="signin"
      />
    </div>
  );
}