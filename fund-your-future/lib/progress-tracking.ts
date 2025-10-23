/**
 * Progress Tracking Service
 * Comprehensive system for tracking student progress across modules, units, and activities
 */

import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  UserProgress,
  ModuleProgress,
  UnitProgress,
  ActivityProgress
} from './firestore';

export interface ActivityResult {
  score?: number;
  completed: boolean;
  timeSpent: number; // in minutes
  data?: Record<string, unknown>;
}

export interface ProgressUpdate {
  moduleId: string;
  unitId?: string;
  activityId?: string;
  pageNumber?: number;
  result?: ActivityResult;
  timeSpent?: number;
}

export class ProgressTracker {

  /**
   * Track page view and navigation
   */
  static async trackPageView(
    userId: string,
    moduleId: string,
    unitId: string,
    pageNumber: number,
    totalPages: number
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const timestamp = serverTimestamp();

      const updates: Record<string, unknown> = {
        [`progress.modules.${moduleId}.units.${unitId}.currentPage`]: pageNumber,
        [`progress.modules.${moduleId}.units.${unitId}.totalPages`]: totalPages,
        [`progress.modules.${moduleId}.units.${unitId}.lastUpdated`]: timestamp,
        'progress.lastActive': timestamp,
        updatedAt: timestamp
      };

      // Calculate unit completion rate based on pages
      const completionRate = Math.round((pageNumber / totalPages) * 100);
      updates[`progress.modules.${moduleId}.units.${unitId}.completionRate`] = completionRate;

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error tracking page view:', error);
      throw error;
    }
  }

  /**
   * Track activity completion
   */
  static async trackActivityCompletion(
    userId: string,
    moduleId: string,
    unitId: string,
    activityId: string,
    activityType: ActivityProgress['type'],
    result: ActivityResult
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const timestamp = serverTimestamp();

      const activityPath = `progress.modules.${moduleId}.units.${unitId}.activities.${activityId}`;

      const updates: Record<string, unknown> = {
        [`${activityPath}.activityId`]: activityId,
        [`${activityPath}.type`]: activityType,
        [`${activityPath}.completed`]: result.completed,
        [`${activityPath}.timeSpent`]: increment(result.timeSpent),
        [`${activityPath}.attempts`]: increment(1),
        [`progress.modules.${moduleId}.units.${unitId}.lastUpdated`]: timestamp,
        'progress.lastActive': timestamp,
        updatedAt: timestamp
      };

      if (result.completed) {
        updates[`${activityPath}.completedAt`] = timestamp;
      }

      if (result.score !== undefined) {
        updates[`${activityPath}.score`] = result.score;
      }

      if (result.data) {
        updates[`${activityPath}.data`] = result.data;
      }

      // Add XP for completed activities
      if (result.completed) {
        const xpGain = result.score || 50; // Base XP or score-based
        updates['progress.totalXP'] = increment(xpGain);
      }

      await updateDoc(userRef, updates);

      // Recalculate completion rates
      await this.recalculateCompletionRates(userId, moduleId, unitId);

    } catch (error) {
      console.error('Error tracking activity completion:', error);
      throw error;
    }
  }

  /**
   * Initialize module progress when user starts a module
   */
  static async initializeModuleProgress(
    userId: string,
    moduleId: string,
    moduleTitle: string
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const timestamp = serverTimestamp();

      const updates: Record<string, unknown> = {
        [`progress.modules.${moduleId}.moduleId`]: moduleId,
        [`progress.modules.${moduleId}.title`]: moduleTitle,
        [`progress.modules.${moduleId}.units`]: {},
        [`progress.modules.${moduleId}.completed`]: false,
        [`progress.modules.${moduleId}.score`]: 0,
        [`progress.modules.${moduleId}.attempts`]: 0,
        [`progress.modules.${moduleId}.startedAt`]: timestamp,
        [`progress.modules.${moduleId}.timeSpent`]: 0,
        [`progress.modules.${moduleId}.completionRate`]: 0,
        'progress.lastActive': timestamp,
        updatedAt: timestamp
      };

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error initializing module progress:', error);
      throw error;
    }
  }

  /**
   * Initialize unit progress when user starts a unit
   */
  static async initializeUnitProgress(
    userId: string,
    moduleId: string,
    unitId: string,
    unitTitle: string,
    totalPages: number
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const timestamp = serverTimestamp();

      const updates: Record<string, unknown> = {
        [`progress.modules.${moduleId}.units.${unitId}.unitId`]: unitId,
        [`progress.modules.${moduleId}.units.${unitId}.title`]: unitTitle,
        [`progress.modules.${moduleId}.units.${unitId}.currentPage`]: 1,
        [`progress.modules.${moduleId}.units.${unitId}.totalPages`]: totalPages,
        [`progress.modules.${moduleId}.units.${unitId}.activities`]: {},
        [`progress.modules.${moduleId}.units.${unitId}.completed`]: false,
        [`progress.modules.${moduleId}.units.${unitId}.startedAt`]: timestamp,
        [`progress.modules.${moduleId}.units.${unitId}.lastUpdated`]: timestamp,
        [`progress.modules.${moduleId}.units.${unitId}.score`]: 0,
        [`progress.modules.${moduleId}.units.${unitId}.timeSpent`]: 0,
        [`progress.modules.${moduleId}.units.${unitId}.completionRate`]: 0,
        'progress.lastActive': timestamp,
        updatedAt: timestamp
      };

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error initializing unit progress:', error);
      throw error;
    }
  }

  /**
   * Track time spent in a unit
   */
  static async trackTimeSpent(
    userId: string,
    moduleId: string,
    unitId: string,
    timeSpentMinutes: number
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);

      const updates: Record<string, unknown> = {
        [`progress.modules.${moduleId}.units.${unitId}.timeSpent`]: increment(timeSpentMinutes),
        [`progress.modules.${moduleId}.timeSpent`]: increment(timeSpentMinutes),
        [`progress.modules.${moduleId}.units.${unitId}.lastUpdated`]: serverTimestamp(),
        'progress.lastActive': serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error tracking time spent:', error);
      throw error;
    }
  }

  /**
   * Recalculate completion rates for unit and module
   */
  static async recalculateCompletionRates(
    userId: string,
    moduleId: string,
    unitId: string
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const userData = userSnap.data();
      const progress = userData.progress as UserProgress;
      const moduleProgress = progress?.modules?.[moduleId];
      const unitProgress = moduleProgress?.units?.[unitId];

      if (!unitProgress) return;

      // Calculate unit completion rate
      const activities = unitProgress.activities || {};
      const totalActivities = Object.keys(activities).length;
      const completedActivities = Object.values(activities).filter(
        (activity: ActivityProgress) => activity.completed
      ).length;

      const unitCompletionRate = totalActivities > 0
        ? Math.round((completedActivities / totalActivities) * 100)
        : 0;

      // Calculate average unit score
      const activityScores = Object.values(activities)
        .filter((activity: ActivityProgress) => activity.score !== undefined)
        .map((activity: ActivityProgress) => activity.score!);

      const unitScore = activityScores.length > 0
        ? Math.round(activityScores.reduce((sum, score) => sum + score, 0) / activityScores.length)
        : 0;

      // Check if unit is completed (all activities done OR completion rate >= 80%)
      const unitCompleted = unitCompletionRate >= 80;

      const updates: Record<string, unknown> = {
        [`progress.modules.${moduleId}.units.${unitId}.completionRate`]: unitCompletionRate,
        [`progress.modules.${moduleId}.units.${unitId}.score`]: unitScore,
        [`progress.modules.${moduleId}.units.${unitId}.completed`]: unitCompleted,
        updatedAt: serverTimestamp()
      };

      if (unitCompleted && !unitProgress.completed) {
        updates[`progress.modules.${moduleId}.units.${unitId}.completedAt`] = serverTimestamp();
      }

      // Calculate module completion rate
      const allUnits = moduleProgress?.units || {};
      const totalUnits = Object.keys(allUnits).length;
      const completedUnits = Object.values(allUnits).filter(
        (unit: UnitProgress) => unit.completed || unit.completionRate >= 80
      ).length;

      const moduleCompletionRate = totalUnits > 0
        ? Math.round((completedUnits / totalUnits) * 100)
        : 0;

      // Calculate module score
      const unitScores = Object.values(allUnits)
        .filter((unit: UnitProgress) => unit.score > 0)
        .map((unit: UnitProgress) => unit.score);

      const moduleScore = unitScores.length > 0
        ? Math.round(unitScores.reduce((sum, score) => sum + score, 0) / unitScores.length)
        : 0;

      const moduleCompleted = moduleCompletionRate >= 80;

      updates[`progress.modules.${moduleId}.completionRate`] = moduleCompletionRate;
      updates[`progress.modules.${moduleId}.score`] = moduleScore;
      updates[`progress.modules.${moduleId}.completed`] = moduleCompleted;

      if (moduleCompleted && !moduleProgress?.completed) {
        updates[`progress.modules.${moduleId}.completedAt`] = serverTimestamp();
      }

      // Calculate overall completion rate
      const allModules = progress?.modules || {};
      const totalModules = Object.keys(allModules).length;
      const completedModules = Object.values(allModules).filter(
        (module: ModuleProgress) => module.completed || module.completionRate >= 80
      ).length;

      const overallCompletionRate = totalModules > 0
        ? Math.round((completedModules / totalModules) * 100)
        : 0;

      updates['progress.overallCompletionRate'] = overallCompletionRate;

      await updateDoc(userRef, updates);

    } catch (error) {
      console.error('Error recalculating completion rates:', error);
      throw error;
    }
  }

  /**
   * Get user progress for a specific module
   */
  static async getModuleProgress(
    userId: string,
    moduleId: string
  ): Promise<ModuleProgress | null> {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return null;

      const userData = userSnap.data();
      const progress = userData.progress as UserProgress;

      return progress?.modules?.[moduleId] || null;
    } catch (error) {
      console.error('Error getting module progress:', error);
      return null;
    }
  }

  /**
   * Get user progress for a specific unit
   */
  static async getUnitProgress(
    userId: string,
    moduleId: string,
    unitId: string
  ): Promise<UnitProgress | null> {
    try {
      const moduleProgress = await this.getModuleProgress(userId, moduleId);
      return moduleProgress?.units?.[unitId] || null;
    } catch (error) {
      console.error('Error getting unit progress:', error);
      return null;
    }
  }
}