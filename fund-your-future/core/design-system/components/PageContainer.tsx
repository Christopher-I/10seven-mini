/**
 * PageContainer - Design System Component
 * Standardized page container with consistent styling across all units
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig } from '../utils/responsive';

export interface PageContainerProps {
  /** Container variant - determines styling approach */
  variant?: 'card' | 'minimal' | 'elevated' | 'page' | 'constrained';

  /** Background color scheme */
  background?: 'white' | 'gray' | 'transparent' | 'neutral';

  /** Padding size */
  padding?: 'sm' | 'md' | 'lg' | 'xl';

  /** Whether to add shadow */
  shadow?: boolean;

  /** Whether to add border */
  border?: boolean;

  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** Page content */
  children: React.ReactNode;
}

/**
 * Variant style mappings
 */
const variantStyles = {
  // Card container (Unit 3 style) - elevated with shadow and border
  card: {
    base: 'shadow-sm border',
    background: 'bg-white',
    padding: 'p-6 sm:p-8',
    radius: 'rounded-xl',
    spacing: 'mb-6'
  },

  // Minimal container (Unit 1 & 2 style) - no card styling
  minimal: {
    base: '',
    background: '',
    padding: '',
    radius: '',
    spacing: ''
  },

  // Elevated container - enhanced shadow and border
  elevated: {
    base: 'shadow-lg border-2',
    background: 'bg-white',
    padding: 'p-6 sm:p-8 lg:p-10',
    radius: 'rounded-2xl',
    spacing: 'mb-8'
  },

  // Page container - full page layout with gray background
  page: {
    base: 'min-h-screen',
    background: 'bg-gray-50',
    padding: '',
    radius: '',
    spacing: ''
  },

  // Constrained container - responsive width with padding
  constrained: {
    base: 'mx-auto w-[90%] max-w-4xl px-4 py-6',
    background: '',
    padding: '',
    radius: '',
    spacing: ''
  }
} as const;

/**
 * Background color mappings
 */
const backgroundStyles = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  transparent: 'bg-transparent',
  neutral: 'bg-gray-50'
} as const;

/**
 * Padding size mappings
 */
const paddingStyles = {
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10 lg:p-12'
} as const;

/**
 * Border radius mappings
 */
const radiusStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
} as const;

export function PageContainer({
  variant = 'minimal',
  background,
  padding,
  shadow,
  border,
  radius,
  responsive,
  className,
  children,
  ...props
}: PageContainerProps) {
  // Get variant styles with fallback
  const variantStyle = variantStyles[variant] || variantStyles.minimal;

  // Build container classes
  const containerClasses = cn(
    // Base variant styles
    variantStyle?.base,

    // Background (variant default or override)
    background ? backgroundStyles[background] : variantStyle?.background,

    // Padding (variant default or override)
    padding ? paddingStyles[padding] : variantStyle?.padding,

    // Border radius (variant default or override)
    radius ? radiusStyles[radius] : variantStyle?.radius,

    // Spacing
    variantStyle?.spacing,

    // Optional shadow and border overrides
    shadow && 'shadow-sm',
    border && 'border',

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Custom classes
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
}

// Convenience components for common patterns
export function CardContainer({ children, ...props }: Omit<PageContainerProps, 'variant'>) {
  return (
    <PageContainer variant="card" {...props}>
      {children}
    </PageContainer>
  );
}

export function MinimalContainer({ children, ...props }: Omit<PageContainerProps, 'variant'>) {
  return (
    <PageContainer variant="minimal" {...props}>
      {children}
    </PageContainer>
  );
}

export function ElevatedContainer({ children, ...props }: Omit<PageContainerProps, 'variant'>) {
  return (
    <PageContainer variant="elevated" {...props}>
      {children}
    </PageContainer>
  );
}

// Export types
export type PageContainerVariant = PageContainerProps['variant'];
export type PageContainerBackground = PageContainerProps['background'];