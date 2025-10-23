/**
 * Design System Typography Tokens
 * Based on Unit 2 analysis - preserving all responsive patterns
 */

export const typography = {
  // Font Families (dashboard design)
  family: {
    display: 'var(--font-playfair)',  // For track headings - Playfair Display
    primary: 'var(--font-red-hat)',   // For module content and UI - Red Hat Display
    body: 'var(--font-red-hat)'       // For body text - Red Hat Display
  },

  // Font Weights
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  // Font Sizes (base sizes)
  size: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem'   // 36px
  },

  // Responsive Typography Patterns (from Unit 2 analysis)
  responsive: {
    // Body text patterns
    body: {
      sm: 'text-xs sm:text-sm',      // Small body text
      base: 'text-sm sm:text-base',   // Standard body text
      lg: 'text-base sm:text-lg'     // Large body text
    },

    // Heading patterns
    heading: {
      sm: 'text-sm sm:text-lg',       // Small headings
      base: 'text-lg sm:text-xl',     // Standard headings
      lg: 'text-lg sm:text-2xl',      // Large headings
      xl: 'text-xl sm:text-2xl'       // Extra large headings
    },

    // Icon sizes
    icon: {
      sm: 'text-lg',     // Small icons
      base: 'text-2xl',  // Standard icons
      lg: 'text-4xl'     // Large icons (status icons)
    }
  },

  // Line Heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  },

  // Dashboard Design Specifications
  dashboard: {
    trackHeading: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: '700',
      fontSize: '32px',
      lineHeight: '130%',
      letterSpacing: '0px',
      color: '#0F2D52'
    },
    moduleNumber: {
      fontFamily: 'var(--font-red-hat)',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0px',
      textAlign: 'center',
      backgroundColor: '#8577B7'
    },
    moduleTitle: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: '600',
      fontSize: '28px',
      lineHeight: '130%',
      letterSpacing: '0px',
      textAlign: 'center',
      color: '#0F2D52'
    }
  },

  // Text Styles (commonly used combinations)
  styles: {
    // Dashboard specific styles
    trackHeading: 'font-bold text-[32px] leading-[130%] text-[#0F2D52]',
    moduleNumber: 'font-semibold text-[16px] leading-[150%] text-center bg-[#8577B7] text-white',
    moduleTitle: 'font-semibold text-[28px] leading-[130%] text-center text-[#0F2D52]',

    // Legacy styles (preserved for compatibility)
    accentHeading: 'text-lg sm:text-2xl font-extrabold',
    statusHeading: 'text-xl font-bold',
    alertHeading: 'text-xl font-bold',
    bodyText: 'text-sm sm:text-base',
    emphasisText: 'font-medium',
    quotedText: 'italic font-medium',

    // Interactive text
    buttonText: 'font-semibold',
    linkText: 'font-medium hover:font-semibold',

    // Data display
    dataLabel: 'font-medium',
    dataValue: 'font-bold',
    caption: 'text-xs'
  }
} as const;

// Typography utility functions
export const getResponsiveText = (variant: keyof typeof typography.responsive.body | keyof typeof typography.responsive.heading, type: 'body' | 'heading' = 'body') => {
  const typeMap = typography.responsive[type];
  if (variant in typeMap) {
    return typeMap[variant as keyof typeof typeMap];
  }
  return typeMap.base;
};

// Type definitions
export type TypographyWeight = keyof typeof typography.weight;
export type TypographySize = keyof typeof typography.size;
export type ResponsiveVariant = keyof typeof typography.responsive.body;