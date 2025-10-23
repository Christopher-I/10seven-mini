/**
 * Role-based Authentication System
 * Handles user roles and permissions from Firebase
 */

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  displayName?: string;
  email?: string;
  createdAt?: Date;
  lastLogin?: Date;
  [key: string]: unknown;
}

export interface UserWithRole {
  user: User;
  role: UserRole;
  profile?: UserProfile;
}

/**
 * Get user role from Firebase Firestore
 */
export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role || 'student'; // Default to student if no role specified
    }

    return 'student'; // Default role if document doesn't exist
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'student'; // Default to student on error
  }
}

/**
 * Get user profile with role information
 */
export async function getUserWithRole(user: User): Promise<UserWithRole> {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    let role: UserRole = 'student';
    let profile = null;

    if (userDoc.exists()) {
      const userData = userDoc.data();
      role = userData.role || 'student';
      profile = userData;
    }

    return {
      user,
      role,
      profile: profile || undefined
    };
  } catch (error) {
    console.error('Error fetching user with role:', error);
    return {
      user,
      role: 'student',
      profile: undefined
    };
  }
}

/**
 * Check if user has specific role
 */
export async function hasRole(userId: string, requiredRole: UserRole): Promise<boolean> {
  try {
    const userRole = await getUserRole(userId);
    return userRole === requiredRole;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  return await hasRole(userId, 'admin');
}

/**
 * Check if user is instructor
 */
export async function isInstructor(userId: string): Promise<boolean> {
  return await hasRole(userId, 'instructor');
}

/**
 * Get the appropriate dashboard route based on user role
 */
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'instructor':
      return '/instructor'; // Future instructor dashboard
    case 'student':
    default:
      return '/';
  }
}

/**
 * Update user role in Firebase (admin function)
 */
export async function updateUserRole(userId: string, newRole: UserRole): Promise<void> {
  try {
    const { updateDoc, doc, Timestamp } = await import('firebase/firestore');
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw new Error('Failed to update user role');
  }
}