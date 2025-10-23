/**
 * UnifiedHeading - Unified Component
 * Replaces 9 components: AccentHeading, StatusHeading, AlertHeading, AlertSubheader,
 * EmpowermentHeading, DefinitionHeader, UnitTitle, FeeSectionHeader, CenteredMessage
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { textPatterns, unit2Patterns, type ResponsiveConfig } from '../utils/responsive';

export interface UnifiedHeadingProps {
  /** HTML heading level */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Visual variant - determines styling approach */
  variant: 'accent' | 'status' | 'alert' | 'centered' | 'default' | 'unit' | 'section' | 'empowerment';

  /** Semantic color scheme */
  semantic?: 'error' | 'warning' | 'success' | 'info' | 'neutral' | 'white' | 'inverse';

  /** Add accent border (left border styling) */
  accent?: boolean;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** Size override (independent of level) */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** Heading content */
  children: React.ReactNode;
}

/**
 * Variant style mappings based on Unit 2 analysis
 */
const variantStyles = {
  // AccentHeading - Most common heading pattern with border
  accent: {
    base: textPatterns.heading, // 'text-lg sm:text-2xl'
    weight: 'font-extrabold',
    color: 'text-purple-800',
    spacing: 'mb-4'
  },

  // StatusHeading - Completion and status messages
  status: {
    base: 'text-xl',
    weight: 'font-bold',
    color: '', // Color determined by semantic
    spacing: 'mb-4'
  },

  // AlertHeading - Warning and error headings
  alert: {
    base: 'text-xl',
    weight: 'font-bold',
    color: '', // Color determined by semantic
    spacing: 'mb-4'
  },

  // CenteredMessage - Important announcements
  centered: {
    base: textPatterns.heading,
    weight: 'font-bold',
    color: 'text-gray-900',
    spacing: 'mb-6'
  },

  // Default heading
  default: {
    base: textPatterns.base,
    weight: 'font-semibold',
    color: 'text-gray-900',
    spacing: 'mb-3'
  },

  // UnitTitle - Large unit introductions
  unit: {
    base: textPatterns.headingLg, // 'text-xl sm:text-2xl'
    weight: 'font-bold',
    color: 'text-white', // Usually in hero cards
    spacing: 'mb-3 sm:mb-4'
  },

  // FeeSectionHeader - Section headers in fee breakdowns
  section: {
    base: textPatterns.base,
    weight: 'font-semibold',
    color: '', // Color determined by semantic
    spacing: 'mb-2 sm:mb-3'
  },

  // EmpowermentHeading - Final message headings
  empowerment: {
    base: 'text-xl',
    weight: 'font-bold',
    color: 'text-gray-900',
    spacing: 'mb-4'
  }
} as const;

/**
 * Semantic color mappings
 */
const semanticColors = {
  error: {
    text: 'text-red-900',
    border: 'border-red-600'
  },
  warning: {
    text: 'text-purple-900',
    border: 'border-purple-600'
  },
  success: {
    text: 'text-green-900',
    border: 'border-green-600'
  },
  info: {
    text: 'text-blue-900',
    border: 'border-blue-600'
  },
  neutral: {
    text: 'text-gray-900',
    border: 'border-gray-600'
  },
  white: {
    text: 'text-white',
    border: 'border-white'
  },
  inverse: {
    text: 'text-gray-100',
    border: 'border-gray-100'
  }
} as const;

/**
 * Size override mappings
 */
const sizeOverrides = {
  sm: textPatterns.sm,
  md: textPatterns.base,
  lg: textPatterns.heading,
  xl: textPatterns.headingLg
} as const;

/**
 * Accent border styling (from Unit 2 analysis)
 */
const accentBorderStyle = unit2Patterns.borderAccent; // 'border-l-4 pl-3 sm:pl-4'

export function UnifiedHeading({
  level: Level = 'h2',
  variant = 'default',
  semantic,
  accent = false,
  align = 'left',
  size,
  responsive,
  className,
  children,
  ...props
}: UnifiedHeadingProps) {
  // Get variant styles with fallback
  const variantStyle = variantStyles[variant] || variantStyles.default;
  const semanticStyle = semantic ? semanticColors[semantic] : null;

  // Determine final color
  const textColor = semanticStyle?.text || variantStyle?.color;

  // Build heading classes
  const headingClasses = cn(
    // Base size (can be overridden by size prop)
    size ? sizeOverrides[size] : variantStyle?.base,

    // Font weight
    variantStyle?.weight,

    // Text color
    textColor,

    // Spacing
    variantStyle?.spacing,

    // Alignment
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    variant === 'centered' && 'text-center', // Centered variant alignment

    // Accent border styling
    accent && [
      accentBorderStyle,
      semanticStyle?.border || 'border-purple-600'
    ],

    // Custom classes
    className
  );

  return (
    <Level className={headingClasses} {...props}>
      {children}
    </Level>
  );
}

// Convenience components for common patterns
export function AccentHeading({ children, semantic = 'warning', ...props }: Omit<UnifiedHeadingProps, 'variant' | 'accent'>) {
  return (
    <UnifiedHeading variant="accent" accent semantic={semantic} {...props}>
      {children}
    </UnifiedHeading>
  );
}

export function StatusHeading({ children, semantic = 'success', ...props }: Omit<UnifiedHeadingProps, 'variant'>) {
  return (
    <UnifiedHeading variant="status" semantic={semantic} {...props}>
      {children}
    </UnifiedHeading>
  );
}

export function AlertHeading({ children, semantic = 'error', ...props }: Omit<UnifiedHeadingProps, 'variant'>) {
  return (
    <UnifiedHeading variant="alert" semantic={semantic} {...props}>
      {children}
    </UnifiedHeading>
  );
}

export function UnitTitle({ children, level = 'h2', ...props }: Omit<UnifiedHeadingProps, 'variant'>) {
  return (
    <UnifiedHeading variant="unit" level={level} {...props}>
      {children}
    </UnifiedHeading>
  );
}

// Export types
export type HeadingVariant = UnifiedHeadingProps['variant'];
export type HeadingLevel = UnifiedHeadingProps['level'];
export type HeadingSemantic = UnifiedHeadingProps['semantic'];