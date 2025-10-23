/**
 * Demo Mode Utilities
 * Core utility functions for demo mode detection and behavior
 */

import { demoConfig, demoUser } from '@/config/demo.config';

/**
 * Check if app is currently in demo mode
 */
export function isDemoMode(): boolean {
  return demoConfig.enabled;
}

/**
 * Get demo configuration
 */
export function getDemoConfig() {
  return demoConfig;
}

/**
 * Check if a route is allowed in demo mode
 */
export function isRouteAllowed(pathname: string): boolean {
  if (!isDemoMode()) return true;

  return demoConfig.routes.allowed.some((route) => {
    return pathname === route || pathname.startsWith(route);
  });
}

/**
 * Get demo user object
 */
export function getDemoUser() {
  return demoUser;
}

/**
 * Check if navigation item should be visible
 */
export function isNavItemVisible(itemId: string): boolean {
  if (!isDemoMode()) return true;

  const { showItems, hideItems } = demoConfig.navigation;

  // If in hideItems, don't show
  if (hideItems.includes(itemId)) return false;

  // If showItems is defined and item not in it, don't show
  if (showItems.length > 0 && !showItems.includes(itemId)) return false;

  return true;
}

/**
 * Should skip authentication
 */
export function shouldSkipAuth(): boolean {
  return isDemoMode() && demoConfig.features.skipAuth;
}

/**
 * Should skip analytics
 */
export function shouldSkipAnalytics(): boolean {
  return isDemoMode() && demoConfig.features.skipAnalytics;
}

/**
 * Should skip progress tracking
 */
export function shouldSkipProgressTracking(): boolean {
  return isDemoMode() && demoConfig.features.skipProgressTracking;
}
