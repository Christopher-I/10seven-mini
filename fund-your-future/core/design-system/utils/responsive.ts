/**
 * Design System Responsive Utilities
 * Helper functions for responsive behavior and mobile optimization
 */

import { breakpoints } from '../tokens';

/**
 * Responsive configuration interface for components
 */
export interface ResponsiveConfig {
  /** Mobile-first base configuration */
  base?: string;
  /** Small screens and up (640px+) */
  sm?: string;
  /** Medium screens and up (768px+) */
  md?: string;
  /** Large screens and up (1024px+) */
  lg?: string;
  /** Extra large screens and up (1280px+) */
  xl?: string;
}

/**
 * Mobile interaction configuration
 */
export interface MobileConfig {
  /** Optimize touch targets for mobile (minimum 44px) */
  touchOptimized?: boolean;
  /** Enable mobile gestures (swipe, pinch) */
  mobileGestures?: boolean;
  /** Full width on mobile */
  fullWidthMobile?: boolean;
  /** Stack content vertically on mobile */
  stackOnMobile?: boolean;
  /** Use compact spacing on mobile */
  compactSpacing?: boolean;
  /** Hide specific elements on mobile */
  hideOnMobile?: string[];
}

/**
 * Generate responsive classes from configuration
 * @param config - Responsive configuration object
 * @returns Combined responsive class string
 */
export function createResponsiveClasses(config: ResponsiveConfig): string {
  const classes: string[] = [];

  if (config.base) classes.push(config.base);
  if (config.sm) classes.push(`sm:${config.sm}`);
  if (config.md) classes.push(`md:${config.md}`);
  if (config.lg) classes.push(`lg:${config.lg}`);
  if (config.xl) classes.push(`xl:${config.xl}`);

  return classes.join(' ');
}

/**
 * Create mobile-optimized classes
 * @param config - Mobile configuration
 * @returns Mobile optimization class string
 */
export function createMobileClasses(config: MobileConfig): string {
  const classes: string[] = [];

  if (config.touchOptimized) {
    // Ensure minimum touch target size (44px)
    classes.push('min-h-[44px] min-w-[44px]');
  }

  if (config.fullWidthMobile) {
    classes.push('w-full sm:w-auto');
  }

  if (config.stackOnMobile) {
    classes.push('flex-col sm:flex-row');
  }

  if (config.compactSpacing) {
    classes.push('p-2 sm:p-4');
  }

  return classes.join(' ');
}

/**
 * Grid responsive patterns from Unit 2 analysis
 */
export const gridPatterns = {
  /** Single column mobile, 2 columns tablet+ */
  cols2: 'grid-cols-1 sm:grid-cols-2',
  /** Single column mobile, 2 columns tablet, 3 columns desktop */
  cols3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  /** Single column mobile, 2 columns tablet, 4 columns desktop */
  cols4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  /** Responsive fee grid pattern from Unit 2 */
  feeGrid: 'grid gap-2 sm:gap-3 sm:grid-cols-2',
  /** Feature grid pattern */
  featureGrid: 'grid gap-2 sm:gap-3 sm:grid-cols-2'
} as const;

/**
 * Text responsive patterns from Unit 2 analysis
 */
export const textPatterns = {
  /** Small responsive text */
  sm: 'text-xs sm:text-sm',
  /** Base responsive text */
  base: 'text-sm sm:text-base',
  /** Large responsive text */
  lg: 'text-base sm:text-lg',
  /** Heading responsive text */
  heading: 'text-lg sm:text-2xl',
  /** Large heading responsive text */
  headingLg: 'text-xl sm:text-2xl'
} as const;

/**
 * Spacing responsive patterns from Unit 2 analysis
 */
export const spacingPatterns = {
  /** Page container spacing */
  page: 'space-y-4 sm:space-y-6',
  /** Card padding small */
  cardSm: 'p-3 sm:p-4',
  /** Card padding medium */
  cardMd: 'p-4 sm:p-6',
  /** Card padding large */
  cardLg: 'p-4 sm:p-8',
  /** Grid gaps */
  gridSm: 'gap-2 sm:gap-3',
  gridMd: 'gap-3 sm:gap-4',
  /** List spacing */
  list: 'space-y-2 sm:space-y-3',
  /** Margin bottom */
  marginSm: 'mb-3 sm:mb-4',
  marginMd: 'mb-4 sm:mb-6'
} as const;

/**
 * Check if current screen size matches breakpoint
 * Note: This is for client-side usage only
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  const width = window.innerWidth;

  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width
  };
}

/**
 * Create responsive container classes
 * @param variant - Container size variant
 */
export function createContainerClasses(variant: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg'): string {
  const variants = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  return `mx-auto w-full ${variants[variant]} px-4 sm:px-6 lg:px-8`;
}

/**
 * Unit 2 specific responsive patterns
 * These preserve the exact responsive behavior from the analysis
 */
export const unit2Patterns = {
  /** Hero card responsive pattern */
  heroCard: 'rounded-lg sm:rounded-xl p-4 sm:p-8',
  /** Alert card pattern */
  alertCard: 'rounded-xl p-6',
  /** Button responsive pattern */
  button: 'px-6 sm:px-8 py-3',
  /** Data table pattern */
  dataTable: 'px-3 sm:px-4 py-2',
  /** Content spacing */
  content: 'p-3 sm:p-4 space-y-2 sm:space-y-3',
  /** Border accent pattern */
  borderAccent: 'border-l-4 pl-3 sm:pl-4'
} as const;

// Type exports
export type GridPattern = keyof typeof gridPatterns;
export type TextPattern = keyof typeof textPatterns;
export type SpacingPattern = keyof typeof spacingPatterns;
export type Unit2Pattern = keyof typeof unit2Patterns;