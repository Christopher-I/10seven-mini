/**
 * Local storage service with versioning and schema migration
 */

import { UserProgress, Progress } from '@/core/types';
import { shouldSkipProgressTracking } from '@/lib/demoMode';

const STORAGE_KEY = 'smith_conway_progress';
const CURRENT_VERSION = '1.0.0';

/**
 * Load user progress from localStorage
 */
export function loadProgress(): UserProgress | null {
  // Skip progress loading in demo mode
  if (shouldSkipProgressTracking()) {
    console.log('[Demo Mode] Progress loading skipped');
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);

    // Check version and migrate if needed
    if (data.version !== CURRENT_VERSION) {
      return migrateProgress(data);
    }

    // Convert date strings back to Date objects
    return hydrateDates(data);
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
}

/**
 * Save user progress to localStorage
 */
export function saveProgress(progress: UserProgress): boolean {
  // Skip progress saving in demo mode
  if (shouldSkipProgressTracking()) {
    console.log('[Demo Mode] Progress saving skipped');
    return true; // Return true to avoid errors
  }

  try {
    const data = {
      ...progress,
      version: CURRENT_VERSION,
      lastSaved: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
}

/**
 * Get progress for a specific unit
 */
export function getUnitProgress(
  moduleId: string,
  unitId: string
): Progress | null {
  const userProgress = loadProgress();
  if (!userProgress) return null;

  return userProgress.modules[moduleId]?.units[unitId] || null;
}

/**
 * Update progress for a specific unit (new signature with updates object)
 */
export function updateUnitProgress(
  moduleId: string,
  unitId: string,
  updates: Partial<Progress>
): boolean;

/**
 * Update progress for a specific unit (legacy signature with separate params)
 */
export function updateUnitProgress(
  moduleId: string,
  unitId: string,
  currentPage: number,
  completed: boolean
): boolean;

/**
 * Update progress for a specific unit (implementation)
 */
export function updateUnitProgress(
  moduleId: string,
  unitId: string,
  updatesOrCurrentPage: Partial<Progress> | number,
  completed?: boolean
): boolean {
  const userProgress = loadProgress() || {
    version: CURRENT_VERSION,
    modules: {},
  };

  // Ensure module structure exists
  if (!userProgress.modules[moduleId]) {
    userProgress.modules[moduleId] = { units: {} };
  }

  // Get existing progress or create new
  const existingProgress = userProgress.modules[moduleId].units[unitId] || {
    moduleId,
    unitId,
    currentPage: 1,
    totalPages: 0,
    completedActivities: [],
    startedAt: new Date(),
    lastUpdated: new Date(),
    completed: false,
  };

  // Handle both old and new function signatures
  let updates: Partial<Progress>;
  if (typeof updatesOrCurrentPage === 'number') {
    // Legacy signature: (moduleId, unitId, currentPage, completed)
    updates = {
      currentPage: updatesOrCurrentPage,
      completed: completed || false,
    };
  } else {
    // New signature: (moduleId, unitId, updates)
    updates = updatesOrCurrentPage;
  }

  // Update progress
  userProgress.modules[moduleId].units[unitId] = {
    ...existingProgress,
    ...updates,
    lastUpdated: new Date(),
  };

  return saveProgress(userProgress);
}

/**
 * Mark an activity as completed
 */
export function markActivityCompleted(
  moduleId: string,
  unitId: string,
  activityId: string
): boolean {
  const progress = getUnitProgress(moduleId, unitId);
  if (!progress) {
    // Create new progress entry
    return updateUnitProgress(moduleId, unitId, {
      completedActivities: [activityId],
    });
  }

  if (!progress.completedActivities.includes(activityId)) {
    progress.completedActivities.push(activityId);
    return updateUnitProgress(moduleId, unitId, progress);
  }

  return true;
}

/**
 * Clear all progress (with confirmation)
 */
export function clearProgress(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
}

/**
 * Reset progress for a specific module
 */
export function resetModuleProgress(moduleId: string): boolean {
  try {
    const userProgress = loadProgress();
    if (!userProgress) return true; // Nothing to reset

    // Remove the module from progress
    if (userProgress.modules[moduleId]) {
      delete userProgress.modules[moduleId];
      
      // Also clear any related localStorage data for activities
      // Check for items that start with unit- and contain the moduleId OR unit-specific patterns
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.includes(`unit-${moduleId}`) ||
          key.includes(`${moduleId}-survey`) ||
          // Also clear unit-specific keys for banking-fees module
          (moduleId === 'banking-fees' && (
            key.includes('unit-1-') ||
            key.includes('unit-2-') ||
            key.includes('unit-unit-1-basics') ||
            key.includes('unit-unit-2-fees')
          ))
        )) {
          keysToRemove.push(key);
        }
      }

      // Remove the activity-specific data
      console.log('Module reset: Clearing localStorage keys:', keysToRemove);
      keysToRemove.forEach(key => {
        console.log('Removing key:', key);
        localStorage.removeItem(key);
      });
      console.log('Module reset: Saving updated progress:', userProgress);
      
      return saveProgress(userProgress);
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting module progress:', error);
    return false;
  }
}

/**
 * Export progress data for backup
 */
export function exportProgress(): string | null {
  const progress = loadProgress();
  if (!progress) return null;

  return JSON.stringify(progress, null, 2);
}

/**
 * Import progress data from backup
 */
export function importProgress(data: string): boolean {
  try {
    const progress = JSON.parse(data);
    return saveProgress(progress);
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
}

/**
 * Migrate progress data from older versions
 */
function migrateProgress(data: Record<string, unknown>): UserProgress {
  console.log(
    `Migrating progress from version ${data.version} to ${CURRENT_VERSION}`
  );

  // Handle migration logic here based on version
  // For now, just return the data with new version and ensure modules exist
  return {
    ...data,
    version: CURRENT_VERSION,
    modules: (data.modules as Record<string, unknown>) || {},
  } as UserProgress;
}

/**
 * Convert date strings back to Date objects
 */
function hydrateDates(data: Record<string, unknown>): UserProgress {
  const hydrated = { ...data } as unknown as UserProgress;

  // Recursively convert date strings
  if (hydrated.modules) {
    for (const moduleId in hydrated.modules) {
      const moduleData = hydrated.modules[moduleId];
      if (moduleData && moduleData.units) {
        for (const unitId in moduleData.units) {
          const unit = moduleData.units[unitId] as any;
          if (unit.startedAt && typeof unit.startedAt === 'string') {
            unit.startedAt = new Date(unit.startedAt);
          }
          if (unit.lastUpdated && typeof unit.lastUpdated === 'string') {
            unit.lastUpdated = new Date(unit.lastUpdated);
          }
        }
      }
    }
  }

  return hydrated;
}
