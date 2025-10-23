/**
 * Design System Tokens
 * Central export for all design tokens
 */

export { colors, type ColorToken, type SemanticColor, type BrandColor } from './colors';
export {
  typography,
  getResponsiveText,
  type TypographyWeight,
  type TypographySize,
  type ResponsiveVariant
} from './typography';
export {
  spacing,
  getResponsiveSpacing,
  type SpacingScale,
  type CardSpacing,
  type ResponsiveSpacing
} from './spacing';

// Additional design tokens
export const borderRadius = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px'
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  colors: 'color 200ms ease-in-out, background-color 200ms ease-in-out, border-color 200ms ease-in-out'
} as const;

// Responsive breakpoints (matches Tailwind defaults)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Type definitions
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
export type Transition = keyof typeof transitions;