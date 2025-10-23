/**
 * Design System Spacing Tokens
 * Based on Unit 2 responsive patterns analysis
 */

export const spacing = {
  // Base spacing scale
  scale: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem'     // 80px
  },

  // Page-level spacing patterns (from Unit 2)
  page: {
    container: 'space-y-4 sm:space-y-6',    // Main page content spacing
    section: 'space-y-6',                    // Section spacing
    subsection: 'space-y-4'                  // Subsection spacing
  },

  // Card padding patterns (most common in Unit 2)
  card: {
    sm: 'p-3',                              // Small cards
    md: 'p-4',                              // Medium cards
    lg: 'p-6',                              // Large cards
    xl: 'p-8',                              // Extra large cards (hero, empowerment)
    responsive: {
      sm: 'p-3 sm:p-4',                     // Responsive small
      md: 'p-4 sm:p-6',                     // Responsive medium
      lg: 'p-4 sm:p-8'                      // Responsive large
    }
  },

  // Margin patterns (from Unit 2 analysis)
  margin: {
    bottom: {
      xs: 'mb-1',
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
      responsive: {
        sm: 'mb-2 sm:mb-3',                 // Small responsive margin
        md: 'mb-3 sm:mb-4',                 // Medium responsive margin
        lg: 'mb-4 sm:mb-6'                  // Large responsive margin
      }
    },
    top: {
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
      xl: 'mt-8'
    }
  },

  // Grid and layout gaps (from Unit 2 grid analysis)
  grid: {
    sm: 'gap-2 sm:gap-3',                   // Small grid gaps
    md: 'gap-3 sm:gap-4',                   // Medium grid gaps
    lg: 'gap-4 sm:gap-6'                    // Large grid gaps
  },

  // List spacing patterns
  list: {
    tight: 'space-y-1',                     // Tight lists (bank features)
    normal: 'space-y-2',                    // Normal lists (fee items)
    loose: 'space-y-4',                     // Loose lists (checklist items)
    responsive: {
      sm: 'space-y-2 sm:space-y-3',        // Responsive list spacing
      md: 'space-y-3 sm:space-y-4'         // Medium responsive spacing
    }
  },

  // Interactive element spacing
  interactive: {
    button: {
      padding: {
        sm: 'px-3 py-2',                    // Small buttons
        md: 'px-4 py-2',                    // Medium buttons
        lg: 'px-6 py-3',                    // Large buttons
        responsive: 'px-6 sm:px-8 py-3'    // Responsive button padding
      },
      gap: 'gap-2'                          // Gap between button elements
    },
    checkbox: {
      gap: 'gap-3'                          // Gap between checkbox and content
    }
  },

  // Border and outline spacing
  border: {
    left: {
      sm: 'pl-3',
      md: 'pl-4',
      responsive: 'pl-3 sm:pl-4'           // Accent border left padding
    }
  }
} as const;

// Utility functions for spacing
export const getResponsiveSpacing = (type: 'card' | 'margin' | 'grid' | 'list', variant: string) => {
  const spacingMap = spacing[type];
  if ('responsive' in spacingMap && variant in spacingMap.responsive) {
    return spacingMap.responsive[variant as keyof typeof spacingMap.responsive];
  }
  return spacingMap[variant as keyof typeof spacingMap] || spacing.scale[4];
};

// Type definitions
export type SpacingScale = keyof typeof spacing.scale;
export type CardSpacing = keyof typeof spacing.card;
export type ResponsiveSpacing = keyof typeof spacing.card.responsive;