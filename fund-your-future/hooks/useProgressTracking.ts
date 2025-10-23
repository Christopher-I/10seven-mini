/**
 * Progress Tracking Hooks
 * React hooks for tracking student progress in modules, units, and activities
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressTracker, type ActivityResult } from '@/lib/progress-tracking';
import type { ActivityProgress } from '@/lib/firestore';

interface UseProgressTrackingOptions {
  moduleId: string;
  moduleTitle: string;
  unitId: string;
  unitTitle: string;
  totalPages: number;
  autoInitialize?: boolean;
}

/**
 * Hook for tracking progress in a specific module/unit
 */
export function useProgressTracking({
  moduleId,
  moduleTitle,
  unitId,
  unitTitle,
  totalPages,
  autoInitialize = true
}: UseProgressTrackingOptions) {
  const { user } = useAuth();
  const sessionStartTime = useRef<Date>(new Date());
  const lastPageTime = useRef<Date>(new Date());

  // Initialize module and unit progress when component mounts
  useEffect(() => {
    if (!user || !autoInitialize) return;

    const initializeProgress = async () => {
      try {
        // Initialize module if not exists
        await ProgressTracker.initializeModuleProgress(user.uid, moduleId, moduleTitle);

        // Initialize unit if not exists
        await ProgressTracker.initializeUnitProgress(
          user.uid,
          moduleId,
          unitId,
          unitTitle,
          totalPages
        );
      } catch (error) {
        console.error('Error initializing progress:', error);
      }
    };

    initializeProgress();
  }, [user, moduleId, moduleTitle, unitId, unitTitle, totalPages, autoInitialize]);

  // Track time spent when component unmounts
  useEffect(() => {
    return () => {
      if (!user) return;

      const timeSpent = Math.round((new Date().getTime() - sessionStartTime.current.getTime()) / (1000 * 60));
      if (timeSpent > 0) {
        ProgressTracker.trackTimeSpent(user.uid, moduleId, unitId, timeSpent);
      }
    };
  }, [user, moduleId, unitId]);

  /**
   * Track page navigation
   */
  const trackPageView = useCallback(async (pageNumber: number) => {
    if (!user) return;

    try {
      await ProgressTracker.trackPageView(
        user.uid,
        moduleId,
        unitId,
        pageNumber,
        totalPages
      );

      lastPageTime.current = new Date();
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [user, moduleId, unitId, totalPages]);

  /**
   * Track activity completion
   */
  const trackActivityCompletion = useCallback(async (
    activityId: string,
    activityType: ActivityProgress['type'],
    result: ActivityResult
  ) => {
    if (!user) return;

    try {
      await ProgressTracker.trackActivityCompletion(
        user.uid,
        moduleId,
        unitId,
        activityId,
        activityType,
        result
      );
    } catch (error) {
      console.error('Error tracking activity completion:', error);
    }
  }, [user, moduleId, unitId]);

  /**
   * Track time spent manually
   */
  const trackTimeSpent = useCallback(async (minutes: number) => {
    if (!user) return;

    try {
      await ProgressTracker.trackTimeSpent(user.uid, moduleId, unitId, minutes);
    } catch (error) {
      console.error('Error tracking time spent:', error);
    }
  }, [user, moduleId, unitId]);

  /**
   * Get current progress for this unit
   */
  const getProgress = useCallback(async () => {
    if (!user) return null;

    try {
      return await ProgressTracker.getUnitProgress(user.uid, moduleId, unitId);
    } catch (error) {
      console.error('Error getting progress:', error);
      return null;
    }
  }, [user, moduleId, unitId]);

  return {
    trackPageView,
    trackActivityCompletion,
    trackTimeSpent,
    getProgress
  };
}

/**
 * Hook for tracking time spent on a page or component
 */
export function useTimeTracking(
  moduleId: string,
  unitId: string,
  options?: {
    trackOnUnmount?: boolean;
    minimumTime?: number; // minimum seconds before tracking
  }
) {
  const { user } = useAuth();
  const startTime = useRef<Date>(new Date());
  const { trackOnUnmount = true, minimumTime = 10 } = options || {};

  useEffect(() => {
    startTime.current = new Date();

    if (trackOnUnmount) {
      return () => {
        if (!user) return;

        const timeSpent = Math.round((new Date().getTime() - startTime.current.getTime()) / (1000 * 60));

        if (timeSpent >= minimumTime / 60) { // Convert minimum seconds to minutes
          ProgressTracker.trackTimeSpent(user.uid, moduleId, unitId, timeSpent);
        }
      };
    }
  }, [user, moduleId, unitId, trackOnUnmount, minimumTime]);

  /**
   * Manually track time spent
   */
  const trackCurrentTime = useCallback(() => {
    if (!user) return;

    const timeSpent = Math.round((new Date().getTime() - startTime.current.getTime()) / (1000 * 60));

    if (timeSpent >= minimumTime / 60) {
      ProgressTracker.trackTimeSpent(user.uid, moduleId, unitId, timeSpent);
      startTime.current = new Date(); // Reset start time
    }
  }, [user, moduleId, unitId, minimumTime]);

  return {
    trackCurrentTime,
    getTimeSpent: () => Math.round((new Date().getTime() - startTime.current.getTime()) / 1000)
  };
}

/**
 * Hook for activity-specific progress tracking
 */
export function useActivityTracking(
  moduleId: string,
  unitId: string,
  activityId: string,
  activityType: ActivityProgress['type']
) {
  const { user } = useAuth();
  const startTime = useRef<Date>(new Date());

  /**
   * Mark activity as completed
   */
  const completeActivity = useCallback(async (
    result: Omit<ActivityResult, 'timeSpent'> & { timeSpent?: number }
  ) => {
    if (!user) return;

    const timeSpent = result.timeSpent ||
      Math.round((new Date().getTime() - startTime.current.getTime()) / (1000 * 60));

    try {
      await ProgressTracker.trackActivityCompletion(
        user.uid,
        moduleId,
        unitId,
        activityId,
        activityType,
        {
          ...result,
          timeSpent
        }
      );
    } catch (error) {
      console.error('Error completing activity:', error);
    }
  }, [user, moduleId, unitId, activityId, activityType]);

  /**
   * Track attempt without completing
   */
  const trackAttempt = useCallback(async (data?: Record<string, unknown>) => {
    if (!user) return;

    const timeSpent = Math.round((new Date().getTime() - startTime.current.getTime()) / (1000 * 60));

    try {
      await ProgressTracker.trackActivityCompletion(
        user.uid,
        moduleId,
        unitId,
        activityId,
        activityType,
        {
          completed: false,
          timeSpent,
          data
        }
      );
    } catch (error) {
      console.error('Error tracking attempt:', error);
    }
  }, [user, moduleId, unitId, activityId, activityType]);

  return {
    completeActivity,
    trackAttempt,
    getTimeSpent: () => Math.round((new Date().getTime() - startTime.current.getTime()) / 1000)
  };
}