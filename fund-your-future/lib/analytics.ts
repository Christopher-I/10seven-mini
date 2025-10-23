/**
 * Analytics Service
 * Handles user interaction tracking and learning analytics
 */

import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { Timestamp } from 'firebase/firestore';
import { analytics } from './firebase';
import { saveGameSession } from './firestore';
import type { GameSession } from './firestore';

// Custom event types for Fund Your Future Education
export interface LearningEvent {
  module_id: string;
  unit_id: string;
  page_number: number;
  time_spent?: number;
  user_id?: string;
}

export interface GameEvent {
  game_type: string;
  module_id: string;
  unit_id: string;
  score: number;
  time_spent: number;
  completed: boolean;
  user_id?: string;
}

export interface ProgressEvent {
  module_id: string;
  unit_id: string;
  progress_percentage: number;
  user_id?: string;
}

/**
 * Initialize analytics for a user
 */
export function initializeAnalytics(userId: string, userProperties?: Record<string, unknown>) {
  if (!analytics) return;
  
  try {
    setUserId(analytics, userId);
    
    if (userProperties) {
      setUserProperties(analytics, userProperties);
    }
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(moduleId: string, unitId: string, pageNumber: number) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'page_view', {
      page_title: `${moduleId} - Unit ${unitId} - Page ${pageNumber}`,
      page_location: window.location.href,
      module_id: moduleId,
      unit_id: unitId,
      page_number: pageNumber
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track learning session start
 */
export function trackLearningStart(event: LearningEvent) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'learning_start', {
      module_id: event.module_id,
      unit_id: event.unit_id,
      page_number: event.page_number,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking learning start:', error);
  }
}

/**
 * Track learning session completion
 */
export function trackLearningComplete(event: LearningEvent) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'learning_complete', {
      module_id: event.module_id,
      unit_id: event.unit_id,
      page_number: event.page_number,
      time_spent: event.time_spent,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking learning complete:', error);
  }
}

/**
 * Track game session and save to Firestore
 */
export async function trackGameSession(
  userId: string,
  gameData: Omit<GameSession, 'id' | 'userId' | 'completedAt'>
) {
  // Save to Firestore
  try {
    await saveGameSession({
      ...gameData,
      userId,
      completedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving game session:', error);
  }

  // Track in Analytics
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'game_complete', {
      game_type: gameData.gameType,
      module_id: gameData.moduleId,
      unit_id: gameData.unitId,
      score: gameData.score,
      time_spent: gameData.timeSpent,
      success: gameData.score > 0
    });
  } catch (error) {
    console.error('Error tracking game session:', error);
  }
}

/**
 * Track unit progress
 */
export function trackUnitProgress(event: ProgressEvent) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'unit_progress', {
      module_id: event.module_id,
      unit_id: event.unit_id,
      progress_percentage: event.progress_percentage,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking unit progress:', error);
  }
}

/**
 * Track unit completion
 */
export function trackUnitComplete(moduleId: string, unitId: string, score?: number) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'unit_complete', {
      module_id: moduleId,
      unit_id: unitId,
      score: score,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking unit completion:', error);
  }
}

/**
 * Track module completion
 */
export function trackModuleComplete(moduleId: string, totalScore: number, timeSpent: number) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'module_complete', {
      module_id: moduleId,
      total_score: totalScore,
      time_spent: timeSpent,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking module completion:', error);
  }
}

/**
 * Track user engagement events
 */
export function trackEngagement(action: string, details?: Record<string, unknown>) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'user_engagement', {
      engagement_action: action,
      timestamp: Date.now(),
      ...details
    });
  } catch (error) {
    console.error('Error tracking engagement:', error);
  }
}

/**
 * Track errors for debugging
 */
export function trackError(error: string, context?: Record<string, unknown>) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'app_error', {
      error_message: error,
      timestamp: Date.now(),
      ...context
    });
  } catch (error) {
    console.error('Error tracking error:', error);
  }
}

/**
 * Track feature usage
 */
export function trackFeatureUsage(feature: string, details?: Record<string, unknown>) {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'feature_usage', {
      feature_name: feature,
      timestamp: Date.now(),
      ...details
    });
  } catch (error) {
    console.error('Error tracking feature usage:', error);
  }
}