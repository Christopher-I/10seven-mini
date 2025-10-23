/**
 * Text - Design System Component
 * Standardized typography with consistent sizing, colors, and responsive behavior
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { textPatterns, type ResponsiveConfig } from '../utils/responsive';

export interface TextProps {
  /** Text variant - determines size and styling */
  variant?: 'body' | 'small' | 'large' | 'subtitle' | 'xs' | 'xl';

  /** Semantic color scheme */
  semantic?:
    | 'neutral'
    | 'muted'
    | 'emphasis'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'white'
    | 'inverse';

  /** Text weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;

  /** Text content */
  children: React.ReactNode;
}

/**
 * Unified variant style mappings - responsive by default
 * Consolidates all text patterns from across the system
 */
const variantStyles = {
  // Standard body text (most common)
  body: {
    responsive: textPatterns.base, // 'text-sm sm:text-base'
  },

  // Small text (disclaimers, notes, captions - unified)
  small: {
    responsive: textPatterns.sm, // 'text-xs sm:text-sm'
  },

  // Large text (introductions, emphasis - unified with lead)
  large: {
    responsive: textPatterns.lg, // 'text-base sm:text-lg'
  },

  // Subtitle/muted text (unified pattern)
  subtitle: {
    responsive: 'text-sm sm:text-base',
  },

  // Extra small for fine print
  xs: {
    responsive: 'text-xs',
  },

  // Extra large for hero text
  xl: {
    responsive: 'text-lg sm:text-xl lg:text-2xl',
  },
} as const;

/**
 * Semantic color mappings
 */
const semanticStyles = {
  neutral: 'text-gray-900',
  muted: 'text-gray-600',
  emphasis: 'text-gray-900',
  success: 'text-green-700',
  warning: 'text-purple-800',
  error: 'text-red-800',
  info: 'text-blue-700',
  white: 'text-white',
  inverse: 'text-gray-100',
} as const;

/**
 * Weight mappings
 */
const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

/**
 * Alignment mappings
 */
const alignmentStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export function Text({
  variant = 'body',
  semantic = 'neutral',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  responsive,
  className,
  children,
  style,
  ...props
}: TextProps) {
  // Get variant and semantic styles
  const variantStyle = variantStyles[variant] || variantStyles.body;

  // Build text classes
  const textClasses = cn(
    // Base responsive size
    variantStyle.responsive,

    // Semantic color
    semanticStyles[semantic],

    // Weight and alignment
    weightStyles[weight],
    alignmentStyles[align],

    // Custom classes
    className
  );

  // Ensure style is an object if provided
  const validStyle = style && typeof style === 'object' ? style : undefined;

  return (
    <Component className={textClasses} style={validStyle} {...props}>
      {children}
    </Component>
  );
}

// Convenience components for common unified patterns
export function Body({
  children,
  semantic = 'neutral',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="body" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

export function Small({
  children,
  semantic = 'muted',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="small" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

export function Large({
  children,
  semantic = 'neutral',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="large" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

export function Subtitle({
  children,
  semantic = 'muted',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="subtitle" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

// Unified shortcuts (replaces Caption, Lead, etc.)
export function XSmall({
  children,
  semantic = 'muted',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="xs" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

export function XLarge({
  children,
  semantic = 'neutral',
  ...props
}: Omit<TextProps, 'variant'>) {
  return (
    <Text variant="xl" semantic={semantic} {...props}>
      {children}
    </Text>
  );
}

// Export types
export type TextVariant = TextProps['variant'];
export type TextSemantic = TextProps['semantic'];
export type TextWeight = TextProps['weight'];
