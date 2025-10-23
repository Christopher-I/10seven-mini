/**
 * TypeScript type definitions for Demo Mode
 */

export interface DemoConfig {
  enabled: boolean;
  card: DemoCardConfig;
  routes: DemoRoutes;
  navigation: DemoNavigationConfig;
  features: DemoFeatures;
}

export interface DemoCardConfig {
  moduleNumber: string;
  title: string;
  description: string;
  route: string;
}

export interface DemoRoutes {
  allowed: string[];
}

export interface DemoNavigationConfig {
  showItems: string[]; // IDs of nav items to show
  hideItems: string[]; // IDs to hide
  showIndicator: boolean;
  indicatorText: string;
  indicatorPosition: 'header' | 'nav';
}

export interface DemoFeatures {
  skipAuth: boolean;
  skipAnalytics: boolean;
  skipProgressTracking: boolean;
}

export interface DemoUser {
  id: string;
  email: string;
  displayName: string;
  isDemo: true;
}
