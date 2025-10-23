/**
 * Firestore Database Service
 * Handles data operations for Fund Your Future platform
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  serverTimestamp,
  increment,
  arrayUnion
} from 'firebase/firestore';
import { db } from './firebase';
import type { AuthUser } from './auth';

// Type definitions
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  preferences?: UserPreferences;
  progress?: UserProgress;
  subscription?: UserSubscription;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  privacy: {
    shareProgress: boolean;
    publicProfile: boolean;
  };
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  totalXP: number;
  level: number;
  badges: string[];
  streakDays: number;
  lastActive: Timestamp;
  overallCompletionRate: number; // 0-100%
}

export interface ModuleProgress {
  moduleId: string;
  title: string;
  units: Record<string, UnitProgress>;
  completed: boolean;
  completedAt?: Timestamp;
  score: number;
  attempts: number;
  startedAt: Timestamp;
  timeSpent: number; // Total minutes spent
  completionRate: number; // 0-100%
}

export interface UnitProgress {
  unitId: string;
  title: string;
  currentPage: number;
  totalPages: number;
  activities: Record<string, ActivityProgress>;
  completed: boolean;
  completedAt?: Timestamp;
  startedAt: Timestamp;
  lastUpdated: Timestamp;
  score: number; // Average activity scores
  timeSpent: number; // Minutes spent
  completionRate: number; // 0-100%
}

export interface ActivityProgress {
  activityId: string;
  type: 'survey' | 'quiz' | 'game' | 'flashcard' | 'calculator' | 'reading';
  completed: boolean;
  completedAt?: Timestamp;
  score?: number; // If applicable
  attempts: number;
  timeSpent: number; // Minutes
  data?: Record<string, unknown>; // Activity-specific data
}

export interface UserSubscription {
  plan: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Timestamp;
  endDate?: Timestamp;
  features: string[];
}

export interface GameSession {
  id: string;
  userId: string;
  moduleId: string;
  unitId: string;
  gameType: string;
  score: number;
  completedAt: Timestamp;
  timeSpent: number;
  data: Record<string, unknown>;
}

// Collection references
const COLLECTIONS = {
  USERS: 'users',
  PROGRESS: 'progress',
  GAME_SESSIONS: 'gameSessions',
  ANALYTICS: 'analytics'
} as const;

/**
 * Create a new user profile
 */
export async function createUserProfile(authUser: AuthUser): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, authUser.uid);
    
    const userProfile: Partial<UserProfile> = {
      uid: authUser.uid,
      email: authUser.email!,
      displayName: authUser.displayName || '',
      emailVerified: authUser.emailVerified,
      photoURL: authUser.photoURL || undefined,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
      preferences: {
        theme: 'system',
        notifications: {
          email: true,
          push: true,
          reminders: true
        },
        privacy: {
          shareProgress: false,
          publicProfile: false
        }
      },
      progress: {
        modules: {},
        totalXP: 0,
        level: 1,
        badges: [],
        streakDays: 0,
        lastActive: serverTimestamp() as Timestamp,
        overallCompletionRate: 0
      },
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: serverTimestamp() as Timestamp,
        features: ['basic-modules', 'progress-tracking']
      }
    };

    await setDoc(userRef, userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Get user profile by UID
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    console.log('No profile found for UID:', uid);
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    // Return null instead of throwing to allow profile creation
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string, 
  updates: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Update user progress for a specific module/unit
 */
export async function updateUnitProgress(
  uid: string,
  moduleId: string,
  unitId: string,
  progress: Partial<UnitProgress>
): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    
    const updates: Record<string, unknown> = {
      [`progress.modules.${moduleId}.units.${unitId}`]: {
        ...progress,
        lastUpdated: serverTimestamp()
      },
      'progress.lastActive': serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // If unit is completed, update XP and level
    if (progress.completed) {
      const xpGain = progress.score || 100;
      updates['progress.totalXP'] = increment(xpGain);
      
      // Simple level calculation: level = floor(totalXP / 500) + 1
      // You might want to implement a more sophisticated leveling system
    }

    await updateDoc(userRef, updates);
  } catch (error) {
    console.error('Error updating unit progress:', error);
    throw error;
  }
}

/**
 * Save game session data
 */
export async function saveGameSession(sessionData: Omit<GameSession, 'id'>): Promise<string> {
  try {
    const sessionsRef = collection(db, COLLECTIONS.GAME_SESSIONS);
    const docRef = await addDoc(sessionsRef, {
      ...sessionData,
      completedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving game session:', error);
    throw error;
  }
}

/**
 * Get user's game sessions
 */
export async function getUserGameSessions(
  uid: string, 
  limitCount: number = 50
): Promise<GameSession[]> {
  try {
    const sessionsRef = collection(db, COLLECTIONS.GAME_SESSIONS);
    const q = query(
      sessionsRef,
      where('userId', '==', uid),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const sessions: GameSession[] = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      } as GameSession);
    });
    
    return sessions;
  } catch (error) {
    console.error('Error getting game sessions:', error);
    throw error;
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  uid: string,
  preferences: Partial<UserPreferences>
): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(userRef, {
      preferences: preferences,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
}

/**
 * Add badge to user profile
 */
export async function addUserBadge(uid: string, badgeId: string): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(userRef, {
      'progress.badges': arrayUnion(badgeId),
      'progress.lastActive': serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding badge:', error);
    throw error;
  }
}

/**
 * Update user streak
 */
export async function updateUserStreak(uid: string): Promise<void> {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile;
      const lastActive = userData.progress?.lastActive;
      const now = new Date();
      
      let streakDays = userData.progress?.streakDays || 0;
      
      if (lastActive) {
        const lastActiveDate = lastActive.toDate();
        const daysDiff = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day, increment streak
          streakDays += 1;
        } else if (daysDiff > 1) {
          // Streak broken, reset to 1
          streakDays = 1;
        }
        // If daysDiff === 0, same day activity, don't change streak
      } else {
        // First time activity
        streakDays = 1;
      }
      
      await updateDoc(userRef, {
        'progress.streakDays': streakDays,
        'progress.lastActive': serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error updating user streak:', error);
    throw error;
  }
}

/**
 * Get leaderboard data
 */
export async function getLeaderboard(limitCount: number = 100): Promise<UserProfile[]> {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(
      usersRef,
      where('preferences.privacy.shareProgress', '==', true),
      orderBy('progress.totalXP', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const users: UserProfile[] = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as UserProfile;
      // Only include necessary data for leaderboard
      users.push({
        uid: userData.uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        progress: userData.progress
      } as UserProfile);
    });
    
    return users;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
}

/**
 * Delete user data (GDPR compliance)
 */
export async function deleteUserData(uid: string): Promise<void> {
  try {
    // Delete user profile
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await deleteDoc(userRef);
    
    // Delete game sessions
    const sessionsRef = collection(db, COLLECTIONS.GAME_SESSIONS);
    const sessionQuery = query(sessionsRef, where('userId', '==', uid));
    const sessionSnapshot = await getDocs(sessionQuery);
    
    const deletePromises = sessionSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}