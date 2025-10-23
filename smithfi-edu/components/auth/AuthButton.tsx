/**
 * Authentication Button Component
 * Shows user status and provides login/logout functionality
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

export function AuthButton() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Debug logging
  console.log('AuthButton render - user:', user?.email, 'loading:', loading);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple clicks
    
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Always show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  // Check if user exists and is authenticated
  if (user && user.uid) {
    return (
      <div className="flex items-center space-x-4">
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {userProfile?.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">
              {userProfile?.displayName || 'User'}
            </div>
            <div className="text-xs text-gray-500">
              Level {userProfile?.progress?.level || 1} • {userProfile?.progress?.totalXP || 0} XP
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={`text-sm px-3 py-1 rounded border transition-colors ${
            isSigningOut 
              ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400'
          }`}
        >
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
          className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
          className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors"
        >
          Sign Up
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
}