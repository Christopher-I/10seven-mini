/**
 * Design System Utilities - Class Name Management
 * Helper functions for conditional classes and responsive patterns
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names with proper deduplication
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate responsive classes based on breakpoint values
 * @param base - Base (mobile-first) classes
 * @param responsive - Object with breakpoint keys and class values
 */
export function responsive(
  base: string,
  responsive?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  }
) {
  const classes = [base];

  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, value]) => {
      if (value) {
        classes.push(`${breakpoint}:${value}`);
      }
    });
  }

  return classes.join(' ');
}

/**
 * Generate semantic color classes based on variant and type
 * @param semantic - Semantic color variant (error, warning, success, info, neutral)
 * @param type - Type of element (bg, text, border)
 * @param shade - Color shade (50, 200, 600, etc.)
 */
export function semanticColor(
  semantic: 'error' | 'warning' | 'success' | 'info' | 'neutral',
  type: 'bg' | 'text' | 'border',
  shade: '50' | '200' | '600' | '700' | '800' | '900' = '600'
) {
  const colorMap = {
    error: 'red',
    warning: 'purple',
    success: 'green',
    info: 'blue',
    neutral: 'gray',
  };

  const colorName = colorMap[semantic];
  return `${type}-${colorName}-${shade}`;
}

/**
 * Generate variant classes for components
 * @param variants - Object mapping variant names to class strings
 * @param selected - Currently selected variant
 * @param defaultVariant - Fallback variant if selected is not found
 */
export function variant<T extends Record<string, string>>(
  variants: T,
  selected: keyof T | undefined,
  defaultVariant: keyof T
): string {
  return variants[selected || defaultVariant] || variants[defaultVariant];
}

/**
 * Create responsive spacing classes
 * @param spacing - Spacing value (sm, md, lg, xl)
 * @param type - Spacing type (p, m, px, py, etc.)
 */
export function responsiveSpacing(
  spacing: 'sm' | 'md' | 'lg' | 'xl',
  type: 'p' | 'm' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr' = 'p'
) {
  const spacingMap = {
    sm: { base: '3', sm: '4' },
    md: { base: '4', sm: '6' },
    lg: { base: '6', sm: '8' },
    xl: { base: '8', sm: '10' },
  };

  const values = spacingMap[spacing];
  return `${type}-${values.base} sm:${type}-${values.sm}`;
}

/**
 * Create conditional classes for interactive states
 * @param base - Base classes
 * @param states - Object with state conditions and classes
 */
export function interactiveStates(
  base: string,
  states: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
  } = {}
) {
  const classes = [base];

  if (states.hover) classes.push(`hover:${states.hover}`);
  if (states.focus) classes.push(`focus:${states.focus}`);
  if (states.active) classes.push(`active:${states.active}`);
  if (states.disabled) classes.push(`disabled:${states.disabled}`);

  return classes.join(' ');
}

/**
 * Generate responsive text classes
 * @param size - Text size variant (sm, base, lg)
 * @param weight - Font weight (normal, medium, semibold, bold)
 */
export function responsiveText(
  size: 'sm' | 'base' | 'lg' = 'base',
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
) {
  const sizeMap = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };

  const classes = [sizeMap[size]];
  if (weight) classes.push(`font-${weight}`);

  return classes.join(' ');
}

// Export type definitions for better TypeScript support
export type SemanticColorType =
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'neutral';
export type ColorElementType = 'bg' | 'text' | 'border';
export type SpacingSize = 'sm' | 'md' | 'lg' | 'xl';
export type TextSize = 'sm' | 'base' | 'lg';
