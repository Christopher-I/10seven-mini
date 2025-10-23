/**
 * Hybrid Storage Service
 * Uses Firebase Firestore for authenticated users and localStorage for guests
 */

import { getCurrentUser } from '@/lib/auth';
import { updateUnitProgress as updateFirestoreProgress, getUserProfile } from '@/lib/firestore';
import { trackUnitProgress, trackUnitComplete } from '@/lib/analytics';
import type { UserProgress, Progress } from '@/core/types';
import type { UnitProgress as FirestoreUnitProgress } from '@/lib/firestore';

// Legacy localStorage service for fallback
import * as legacyStorage from './storage';

/**
 * Convert Firebase UnitProgress to local Progress type
 */
function convertFirestoreToLocal(firestoreProgress: FirestoreUnitProgress): Progress {
  return {
    moduleId: firestoreProgress.unitId.split('-')[0] || 'unknown',
    unitId: firestoreProgress.unitId,
    currentPage: firestoreProgress.currentPage,
    totalPages: firestoreProgress.totalPages,
    completedActivities: Object.keys(firestoreProgress.activities || {}),
    startedAt: firestoreProgress.startedAt.toDate(),
    lastUpdated: firestoreProgress.lastUpdated.toDate(),
    completed: firestoreProgress.completed,
  };
}

/**
 * Convert local Progress to Firebase UnitProgress type
 */
function convertLocalToFirestore(localProgress: Progress): Partial<FirestoreUnitProgress> {
  // Convert completed activities array to activities object
  const activities: Record<string, any> = {};
  localProgress.completedActivities.forEach(activityId => {
    activities[activityId] = {
      completed: true,
      completedAt: new Date(),
      score: 100
    };
  });

  return {
    unitId: localProgress.unitId,
    currentPage: localProgress.currentPage,
    totalPages: localProgress.totalPages,
    activities,
    completed: localProgress.completed,
    score: 0, // Default score, can be updated separately
    timeSpent: 0, // Will be calculated based on session time
  };
}

/**
 * Check if user is authenticated
 */
function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Load user progress (Firebase or localStorage)
 */
export async function loadProgress(): Promise<UserProgress | null> {
  try {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (!user) return null;

      const userProfile = await getUserProfile(user.uid);
      if (!userProfile?.progress) return null;

      // Convert Firebase format to local format
      const localProgress: UserProgress = {
        version: '2.0.0',
        modules: {},
      };

      // Convert each module's units
      if (userProfile.progress.modules) {
        for (const [moduleId, moduleProgress] of Object.entries(userProfile.progress.modules)) {
          localProgress.modules[moduleId] = {
            units: {},
          };

          if (moduleProgress.units) {
            for (const [unitId, unitProgress] of Object.entries(moduleProgress.units)) {
              localProgress.modules[moduleId].units[unitId] = convertFirestoreToLocal(unitProgress);
            }
          }
        }
      }

      return localProgress;
    } else {
      // Use localStorage for guests
      return legacyStorage.loadProgress();
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    // Fallback to localStorage
    return legacyStorage.loadProgress();
  }
}

/**
 * Get progress for a specific unit
 */
export async function getUnitProgress(
  moduleId: string,
  unitId: string
): Promise<Progress | null> {
  try {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (!user) return null;

      const userProfile = await getUserProfile(user.uid);
      const firestoreProgress = userProfile?.progress?.modules[moduleId]?.units[unitId];
      
      if (firestoreProgress) {
        return convertFirestoreToLocal(firestoreProgress);
      }
      return null;
    } else {
      // Use localStorage for guests
      return legacyStorage.getUnitProgress(moduleId, unitId);
    }
  } catch (error) {
    console.error('Error getting unit progress:', error);
    return legacyStorage.getUnitProgress(moduleId, unitId);
  }
}

/**
 * Update progress for a specific unit
 */
export async function updateUnitProgress(
  moduleId: string,
  unitId: string,
  updates: Partial<Progress>
): Promise<boolean> {
  try {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (!user) return false;

      // Get current progress to merge updates
      const currentProgress = await getUnitProgress(moduleId, unitId);
      const mergedProgress = currentProgress ? { ...currentProgress, ...updates } : {
        moduleId,
        unitId,
        currentPage: 1,
        totalPages: 0,
        completedActivities: [],
        startedAt: new Date(),
        lastUpdated: new Date(),
        completed: false,
        ...updates
      };

      // Convert to Firestore format
      const firestoreUpdates = convertLocalToFirestore(mergedProgress);

      // Update in Firebase
      await updateFirestoreProgress(user.uid, moduleId, unitId, firestoreUpdates);

      // Track analytics
      const progressPercentage = mergedProgress.totalPages > 0 
        ? (mergedProgress.currentPage / mergedProgress.totalPages) * 100 
        : 0;

      trackUnitProgress({
        module_id: moduleId,
        unit_id: unitId,
        progress_percentage: progressPercentage,
        user_id: user.uid
      });

      // Track completion if unit is completed
      if (updates.completed && !currentProgress?.completed) {
        trackUnitComplete(moduleId, unitId, firestoreUpdates.score);
      }

      return true;
    } else {
      // Use localStorage for guests
      const success = legacyStorage.updateUnitProgress(moduleId, unitId, updates);
      
      // Track analytics for guests (without user_id)
      if (success) {
        const progressPercentage = updates.totalPages && updates.currentPage 
          ? (updates.currentPage / updates.totalPages) * 100 
          : 0;

        trackUnitProgress({
          module_id: moduleId,
          unit_id: unitId,
          progress_percentage: progressPercentage
        });

        if (updates.completed) {
          trackUnitComplete(moduleId, unitId, 0);
        }
      }

      return success;
    }
  } catch (error) {
    console.error('Error updating unit progress:', error);
    // Fallback to localStorage
    return legacyStorage.updateUnitProgress(moduleId, unitId, updates);
  }
}

/**
 * Mark an activity as completed
 */
export async function markActivityCompleted(
  moduleId: string,
  unitId: string,
  activityId: string
): Promise<boolean> {
  try {
    const currentProgress = await getUnitProgress(moduleId, unitId);
    
    if (!currentProgress) {
      // Create new progress entry
      return updateUnitProgress(moduleId, unitId, {
        completedActivities: [activityId],
      });
    }

    if (!currentProgress.completedActivities.includes(activityId)) {
      const updatedActivities = [...currentProgress.completedActivities, activityId];
      return updateUnitProgress(moduleId, unitId, {
        completedActivities: updatedActivities,
      });
    }

    return true;
  } catch (error) {
    console.error('Error marking activity completed:', error);
    return legacyStorage.markActivityCompleted(moduleId, unitId, activityId);
  }
}

/**
 * Clear all progress
 */
export async function clearProgress(): Promise<boolean> {
  try {
    if (isAuthenticated()) {
      // For authenticated users, we don't clear Firebase data
      // This would require a more careful approach with user confirmation
      console.warn('Cannot clear progress for authenticated users from client');
      return false;
    } else {
      // Clear localStorage for guests
      return legacyStorage.clearProgress();
    }
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
}

/**
 * Reset progress for a specific module
 */
export async function resetModuleProgress(moduleId: string): Promise<boolean> {
  try {
    if (isAuthenticated()) {
      // For authenticated users, we don't reset Firebase data from client
      // This would require server-side function or admin SDK
      console.warn('Cannot reset module progress for authenticated users from client');
      return false;
    } else {
      // Reset localStorage for guests
      return legacyStorage.resetModuleProgress(moduleId);
    }
  } catch (error) {
    console.error('Error resetting module progress:', error);
    return false;
  }
}

/**
 * Export progress data for backup
 */
export async function exportProgress(): Promise<string | null> {
  try {
    const progress = await loadProgress();
    if (!progress) return null;

    return JSON.stringify(progress, null, 2);
  } catch (error) {
    console.error('Error exporting progress:', error);
    return null;
  }
}

/**
 * Migrate guest progress to authenticated user account
 */
export async function migrateGuestProgress(): Promise<boolean> {
  try {
    const user = getCurrentUser();
    if (!user) return false;

    // Get guest progress from localStorage
    const guestProgress = legacyStorage.loadProgress();
    if (!guestProgress?.modules) return true; // Nothing to migrate

    // Migrate each module/unit to Firebase
    for (const [moduleId, moduleData] of Object.entries(guestProgress.modules)) {
      if (moduleData.units) {
        for (const [unitId, unitProgress] of Object.entries(moduleData.units)) {
          const firestoreUpdates = convertLocalToFirestore(unitProgress);
          await updateFirestoreProgress(user.uid, moduleId, unitId, firestoreUpdates);
        }
      }
    }

    // Clear localStorage after successful migration
    legacyStorage.clearProgress();
    
    console.log('Successfully migrated guest progress to user account');
    return true;
  } catch (error) {
    console.error('Error migrating guest progress:', error);
    return false;
  }
}

// Re-export functions that don't need modification
export { importProgress } from './storage';