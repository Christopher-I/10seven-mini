/**
 * Layout - Design System Component
 * Standardized spacing, alignment, and responsive layout patterns
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig, type MobileConfig } from '../utils/responsive';

export interface LayoutProps {
  /** Layout variant - determines spacing and arrangement */
  variant?: 'stack' | 'center' | 'flow' | 'section' | 'grid' | 'flex';

  /** Spacing between children */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Alignment for centered layouts */
  align?: 'left' | 'center' | 'right';

  /** Responsive grid columns (for grid variant) */
  cols?: 1 | 2 | 3 | 4;

  /** Grid columns for small screens (sm:) */
  smCols?: 1 | 2 | 3 | 4;

  /** Grid columns for medium screens (md:) */
  mdCols?: 1 | 2 | 3 | 4;

  /** Grid columns for large screens (lg:) */
  lgCols?: 1 | 2 | 3 | 4;

  /** Grid gap size */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Flex direction (for flex variant) */
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Mobile-specific configuration */
  mobile?: MobileConfig;

  /** Additional CSS classes */
  className?: string;

  /** Layout content */
  children: React.ReactNode;
}

/**
 * Spacing mappings - responsive by default
 */
const spacingStyles = {
  xs: 'space-y-2 sm:space-y-3',
  sm: 'space-y-3 sm:space-y-4',
  md: 'space-y-4 sm:space-y-6',
  lg: 'space-y-6 sm:space-y-8',
  xl: 'space-y-8 sm:space-y-12'
} as const;

/**
 * Variant style mappings
 */
const variantStyles = {
  // Vertical stack (most common pattern)
  stack: {
    base: 'flex flex-col',
    spacing: true
  },

  // Centered content
  center: {
    base: 'text-center',
    spacing: true
  },

  // Natural flow (no flex)
  flow: {
    base: '',
    spacing: true
  },

  // Section with padding
  section: {
    base: '',
    spacing: true,
    padding: 'py-4 sm:py-6'
  },

  // Grid layout
  grid: {
    base: 'grid gap-4 sm:gap-6',
    spacing: false
  },

  // Flex layout
  flex: {
    base: 'flex',
    spacing: false
  }
} as const;

/**
 * Grid column mappings
 */
const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
} as const;

/**
 * Responsive grid column mappings for precise control
 */
const responsiveGridCols = {
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4'
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4'
  }
} as const;

/**
 * Grid gap mappings
 */
const gridGaps = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8'
} as const;

/**
 * Flex direction mappings
 */
const flexDirections = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse'
} as const;

/**
 * Alignment mappings
 */
const alignmentStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
} as const;

export function Layout({
  variant = 'stack',
  spacing = 'md',
  align,
  cols = 2,
  smCols,
  mdCols,
  lgCols,
  gap,
  direction = 'col',
  responsive,
  mobile,
  className,
  children,
  ...props
}: LayoutProps) {
  // Get variant styles
  const variantStyle = variantStyles[variant];

  // Build layout classes
  const layoutClasses = cn(
    // Base variant styles
    variantStyle.base,

    // Spacing (only if variant supports it)
    variantStyle.spacing && spacingStyles[spacing],

    // Section padding
    'padding' in variantStyle && variantStyle.padding,

    // Grid-specific styles
    variant === 'grid' && [
      gridCols[cols],
      smCols && responsiveGridCols.sm[smCols],
      mdCols && responsiveGridCols.md[mdCols],
      lgCols && responsiveGridCols.lg[lgCols],
      gap && gridGaps[gap]
    ],

    // Flex-specific styles
    variant === 'flex' && [
      flexDirections[direction],
      spacing && (direction.includes('col') ? spacingStyles[spacing] : `gap-4 sm:gap-6`)
    ],

    // Alignment
    align && alignmentStyles[align],

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Mobile optimization
    mobile?.touchOptimized && 'min-h-[44px]',
    mobile?.fullWidthMobile && 'w-full sm:w-auto',

    // Custom classes
    className
  );

  return (
    <div className={layoutClasses} {...props}>
      {children}
    </div>
  );
}

// Convenience components for common patterns
export function Stack({ spacing = 'md', children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="stack" spacing={spacing} {...props}>
      {children}
    </Layout>
  );
}

export function Center({ spacing = 'md', children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="center" spacing={spacing} {...props}>
      {children}
    </Layout>
  );
}

export function Flow({ spacing = 'md', children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="flow" spacing={spacing} {...props}>
      {children}
    </Layout>
  );
}

export function Section({ spacing = 'lg', children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="section" spacing={spacing} {...props}>
      {children}
    </Layout>
  );
}

export function Grid({ cols = 2, smCols, mdCols, lgCols, gap, children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="grid" cols={cols} smCols={smCols} mdCols={mdCols} lgCols={lgCols} gap={gap} {...props}>
      {children}
    </Layout>
  );
}

export function Flex({ direction = 'col', spacing = 'md', children, ...props }: Omit<LayoutProps, 'variant'>) {
  return (
    <Layout variant="flex" direction={direction} spacing={spacing} {...props}>
      {children}
    </Layout>
  );
}

// Export types
export type LayoutVariant = LayoutProps['variant'];
export type LayoutSpacing = LayoutProps['spacing'];
export type LayoutAlign = LayoutProps['align'];