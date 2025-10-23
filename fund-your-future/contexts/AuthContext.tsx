/**
 * Authentication Context
 * Provides Firebase auth state management across the application
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile, updateUserStreak } from '@/lib/firestore';
import type { UserProfile } from '@/lib/firestore';
import { shouldSkipAuth, getDemoUser } from '@/lib/demoMode';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile when user changes
  const loadUserProfile = async (currentUser: User | null) => {
    if (currentUser) {
      try {
        console.log('Loading profile for:', currentUser.email);
        let profile = await getUserProfile(currentUser.uid);
        
        // If profile doesn't exist, create it
        if (!profile) {
          console.log('Profile not found, creating new profile...');
          const { createUserProfile } = await import('@/lib/firestore');
          await createUserProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
            emailVerified: currentUser.emailVerified,
            photoURL: currentUser.photoURL,
            createdAt: new Date()
          });
          
          // Try to load the profile again
          profile = await getUserProfile(currentUser.uid);
          console.log('Profile created successfully:', profile?.email);
        }
        
        setUserProfile(profile);
        
        // Update user streak on login
        if (profile) {
          try {
            await updateUserStreak(currentUser.uid);
          } catch (err) {
            console.log('Could not update streak:', err);
          }
        }
      } catch (error) {
        console.error('Error loading/creating user profile:', error);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  };

  // Auth state listener
  useEffect(() => {
    // Check demo mode first
    if (shouldSkipAuth()) {
      console.log('Demo mode - bypassing authentication');
      const demoUserData = getDemoUser();
      setUser(demoUserData as any);
      setUserProfile(null); // Demo users don't have profiles
      setLoading(false);
      return;
    }

    // Normal Firebase auth flow
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email || 'No user');
      setUser(user);

      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    const { signIn: firebaseSignIn } = await import('@/lib/auth');
    const authUser = await firebaseSignIn({ email, password });
    // The onAuthStateChanged listener will handle setting the user
    console.log('Sign in successful:', authUser.email);
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName: string) => {
    const { signUp: firebaseSignUp } = await import('@/lib/auth');
    const authUser = await firebaseSignUp({ email, password, displayName });
    // The onAuthStateChanged listener will handle setting the user
    console.log('Sign up successful:', authUser.email);
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { logOut } = await import('@/lib/auth');
      await logOut();
      // Explicitly clear user state
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    const { resetPassword: firebaseResetPassword } = await import('@/lib/auth');
    await firebaseResetPassword(email);
  };

  // Refresh user profile
  const refreshUserProfile = async () => {
    if (user) {
      await loadUserProfile(user);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to get current user (shorthand)
export function useUser() {
  const { user, userProfile, loading } = useAuth();
  return { user, userProfile, loading };
}