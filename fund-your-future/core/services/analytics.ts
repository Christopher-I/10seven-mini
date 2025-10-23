/**
 * Analytics service for tracking user interactions
 * Integrates with Firebase Analytics and maintains backward compatibility
 * No PII is collected - only anonymous event data
 */

import { AnalyticsEvent } from '@/core/types';
import * as FirebaseAnalytics from '@/lib/analytics';
import { shouldSkipAnalytics } from '@/lib/demoMode';

// Generate a session ID that persists for the browser session
const SESSION_ID = generateSessionId();

/**
 * Track an analytics event
 */
export function trackEvent(
  eventType: AnalyticsEvent['eventType'],
  eventData: AnalyticsEvent['eventData']
): void {
  // Skip analytics in demo mode
  if (shouldSkipAnalytics()) {
    console.log('[Demo Mode] Analytics skipped:', eventType, eventData);
    return;
  }

  const event: AnalyticsEvent = {
    eventType,
    eventData,
    timestamp: new Date(),
    sessionId: SESSION_ID,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }

  // Queue event for sending
  queueEvent(event);
}

/**
 * Track page view
 */
export function trackPageView(
  moduleId: string,
  unitId: string,
  page: number
): void {
  // Skip analytics in demo mode
  if (shouldSkipAnalytics()) {
    console.log('[Demo Mode] Page view skipped:', moduleId, unitId, page);
    return;
  }

  // Track in legacy system
  trackEvent('page_view', {
    moduleId,
    unitId,
    page,
  });

  // Track in Firebase Analytics
  FirebaseAnalytics.trackPageView(moduleId, unitId, page);
}

/**
 * Track activity start
 */
export function trackActivityStart(
  moduleId: string,
  unitId: string,
  activityId: string
): void {
  trackEvent('activity_start', {
    moduleId,
    unitId,
    activityId,
  });
}

/**
 * Track activity completion
 */
export function trackActivityComplete(
  moduleId: string,
  unitId: string,
  activityId: string,
  score?: number
): void {
  trackEvent('activity_complete', {
    moduleId,
    unitId,
    activityId,
    score,
  });
}

/**
 * Track assessment submission
 */
export function trackAssessment(
  moduleId: string,
  unitId: string,
  score: number,
  passed: boolean
): void {
  trackEvent('assessment_submit', {
    moduleId,
    unitId,
    score,
    passed,
  });
}

/**
 * Track errors
 */
export function trackError(
  error: string,
  context?: Record<string, unknown>
): void {
  trackEvent('error', {
    error,
    context,
  });
}

/**
 * Generate a random session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Event queue management
let eventQueue: AnalyticsEvent[] = [];
let flushTimer: NodeJS.Timeout | null = null;

/**
 * Queue an event for batch sending
 */
function queueEvent(event: AnalyticsEvent): void {
  eventQueue.push(event);

  // Schedule flush if not already scheduled
  if (!flushTimer) {
    flushTimer = setTimeout(flushEvents, 5000); // Flush every 5 seconds
  }

  // Flush immediately if queue is large
  if (eventQueue.length >= 10) {
    flushEvents();
  }
}

/**
 * Send queued events to analytics endpoint
 */
async function flushEvents(): Promise<void> {
  if (eventQueue.length === 0) return;

  const events = [...eventQueue];
  eventQueue = [];

  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  try {
    // In production, this would send to an analytics endpoint
    // For now, we'll just store in localStorage for debugging
    const storedEvents = localStorage.getItem('smith_conway_analytics') || '[]';
    const allEvents = JSON.parse(storedEvents);
    allEvents.push(...events);

    // Keep only last 100 events in localStorage
    const recentEvents = allEvents.slice(-100);
    localStorage.setItem(
      'smith_conway_analytics',
      JSON.stringify(recentEvents)
    );

    // TODO: When backend is ready, send events to API
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ events })
    // });
  } catch (error) {
    console.error('Error flushing analytics events:', error);
    // Re-queue events on error
    eventQueue.unshift(...events);
  }
}

/**
 * Flush events on page unload
 */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
}

/**
 * Get analytics summary for debugging
 */
export function getAnalyticsSummary(): Record<string, unknown> | null {
  try {
    const stored = localStorage.getItem('smith_conway_analytics');
    if (!stored) return null;

    const events = JSON.parse(stored);
    const summary = {
      totalEvents: events.length,
      byType: {} as Record<string, number>,
      sessions: new Set(),
      lastEvent: events[events.length - 1],
    };

    events.forEach((event: AnalyticsEvent) => {
      summary.byType[event.eventType] =
        (summary.byType[event.eventType] || 0) + 1;
      summary.sessions.add(event.sessionId);
    });

    return {
      ...summary,
      uniqueSessions: summary.sessions.size,
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return null;
  }
}
