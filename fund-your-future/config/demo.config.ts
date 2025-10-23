/**
 * Demo Mode Configuration
 * Central configuration for all demo mode settings
 */

import { DemoConfig, DemoUser } from '@/types/demo.types';

export const demoConfig: DemoConfig = {
  enabled: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',

  card: {
    moduleNumber: 'Demo Module',
    title: 'Demo App',
    description: 'Explore our interactive financial literacy platform through this guided demo experience.',
    route: '/about',
  },

  routes: {
    allowed: [
      '/',               // Dashboard
      '/about',          // About page
      '/demo/whackamole', // Game page
      '/_next',          // Next.js internals
      '/api',            // API routes
      '/favicon.ico',
      '/public',
    ],
  },

  navigation: {
    // Only show these navigation items
    showItems: ['about'], // Just "About" link

    // Hide these navigation items
    hideItems: [
      'resources',
      'ask-question',
      'events',
      'appointment',
      'profile',
    ],

    showIndicator: true,
    indicatorText: 'DEMO MODE',
    indicatorPosition: 'header',
  },

  features: {
    skipAuth: process.env.NEXT_PUBLIC_DEMO_SKIP_AUTH === 'true',
    skipAnalytics: process.env.NEXT_PUBLIC_DEMO_SKIP_ANALYTICS === 'true',
    skipProgressTracking: process.env.NEXT_PUBLIC_DEMO_SKIP_PROGRESS === 'true',
  },
};

export const demoUser: DemoUser = {
  id: 'demo-user-001',
  email: 'demo@fundyourfuture.edu',
  displayName: 'Demo User',
  isDemo: true,
};
