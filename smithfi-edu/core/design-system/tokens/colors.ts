/**
 * Design System Color Tokens
 * Extracted from Unit 2 comprehensive analysis
 */

export const colors = {
  // Brand Colors - New dashboard design palette
  brand: {
    primary: '#2E1E72',    // Main brand color
    secondary: '#8577B7',  // Secondary brand color
    accent: '#DBE250',     // Yellow accent color
    dark: '#0F2D52',       // Dark blue for text/headings
    light: '#E5DEEF',      // Light purple background
    white: '#FFFFFF'       // Pure white
  },

  // Semantic Colors - Error, Warning, Success, Info (preserved for forms/alerts)
  semantic: {
    error: {
      50: '#fef2f2',   // Alert backgrounds
      200: '#fecaca',  // Alert borders
      600: '#dc2626',  // Error amounts, critical text
      700: '#b91c1c', // Error text
      800: '#991b1b', // Error body text
      900: '#7f1d1d'  // Error headings
    },
    warning: {
      50: '#fffbeb',   // Warning backgrounds
      200: '#fed7aa',  // Warning borders
      600: '#d97706',  // Warning elements
      700: '#b45309',  // Warning text
      800: '#92400e',  // Warning body
      900: '#78350f'   // Warning headings
    },
    success: {
      50: '#f0fdf4',   // Success backgrounds
      200: '#bbf7d0',  // Success borders
      600: '#059669',  // Success elements
      700: '#15803d'   // Success text
    },
    info: {
      50: '#eff6ff',   // Info backgrounds
      200: '#bfdbfe',  // Info borders
      600: '#2563eb',  // Info elements
      700: '#1d4ed8'   // Info text
    }
  },

  // Neutral Scale - Text, backgrounds, borders
  neutral: {
    50: '#f9fafb',   // Light backgrounds
    100: '#f3f4f6',  // Subtle backgrounds
    200: '#e5e7eb',  // Borders
    300: '#d1d5db',  // Dividers
    400: '#9ca3af',  // Placeholders, disabled
    500: '#6b7280',  // Secondary text
    600: '#4b5563',  // Primary text alternative
    700: '#374151',  // Body text
    800: '#1f2937',  // Dark text
    900: '#111827',  // Headings
    white: '#ffffff',
    black: '#000000'
  }
} as const;

// Color utility type for TypeScript
export type ColorToken = typeof colors;
export type SemanticColor = keyof typeof colors.semantic;
export type BrandColor = keyof typeof colors.brand;