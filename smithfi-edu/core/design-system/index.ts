/**
 * Fund Your Future Education Design System
 * Main entry point for the design system
 */

// Export everything from components
export * from './components';

// Export tokens directly
export * from './tokens';

// Export utilities
export * from './utils/classNames';
export * from './utils/responsive';

// Design system metadata
export const designSystem = {
  name: 'Fund Your Future Education Design System',
  version: '2.0.0',
  description: 'Unified design system with new dashboard redesign implementation',
  features: {
    newDesignImplementation: true,
    responsiveModuleCards: true,
    proportionalProgressCircles: true,
    brandColorIntegration: true,
    modernTypography: true,
    updatedNavigation: true
  },
  componentsCount: {
    unified: 15,
    replaced: 40,
    reductionPercentage: '73%'
  },
  designTokens: {
    colors: {
      brandPrimary: '#2E1E72',
      brandSecondary: '#8577B7',
      brandAccent: '#DBE250',
      brandDark: '#0F2D52',
      brandLight: '#E5DEEF',
      brandWhite: '#FFFFFF'
    },
    typography: {
      headings: 'Playfair Display',
      body: 'Red Hat Display'
    },
    newComponents: [
      'DashboardCard - Responsive module cards with proportional progress',
      'TrackSection - Organized module groupings with edge-to-edge layout',
      'ProgressDots - Advanced circular progress with partial fill capability',
      'AnnouncementBar - Brand-styled notification system'
    ]
  }
} as const;