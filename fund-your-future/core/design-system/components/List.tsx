/**
 * List - Design System Component
 * Standardized list styling with consistent spacing and typography
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig } from '../utils/responsive';

export interface ListProps {
  /** List variant - determines styling approach */
  variant?: 'unordered' | 'ordered' | 'checklist' | 'bullet' | 'none';

  /** Spacing between list items */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';

  /** Text size for list items */
  size?: 'sm' | 'md' | 'lg';

  /** Semantic color scheme */
  semantic?: 'neutral' | 'muted' | 'emphasis';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** List content */
  children: React.ReactNode;
}

export interface ListItemProps {
  /** Additional CSS classes */
  className?: string;

  /** List item content */
  children: React.ReactNode;
}

/**
 * Spacing mappings - responsive by default
 */
const spacingStyles = {
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-2',
  lg: 'space-y-3'
} as const;

/**
 * Size mappings - responsive by default
 */
const sizeStyles = {
  sm: 'text-xs sm:text-sm',
  md: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg'
} as const;

/**
 * Semantic color mappings
 */
const semanticStyles = {
  neutral: 'text-gray-900',
  muted: 'text-gray-600',
  emphasis: 'text-gray-900'
} as const;

/**
 * Variant style mappings
 */
const variantStyles = {
  unordered: {
    element: 'ul',
    listStyle: 'list-disc list-inside'
  },
  ordered: {
    element: 'ol',
    listStyle: 'list-decimal list-inside'
  },
  checklist: {
    element: 'ul',
    listStyle: 'list-none'
  },
  bullet: {
    element: 'ul',
    listStyle: 'list-none'
  },
  none: {
    element: 'ul',
    listStyle: 'list-none'
  }
} as const;

export function List({
  variant = 'bullet',
  spacing = 'md',
  size = 'md',
  semantic = 'neutral',
  responsive,
  className,
  children,
  ...props
}: ListProps) {
  // Get variant styles
  const variantStyle = variantStyles[variant];
  const Component = variantStyle.element as React.ElementType;

  // Build list classes
  const listClasses = cn(
    // Base spacing and sizing
    spacingStyles[spacing],
    sizeStyles[size],

    // Semantic color
    semanticStyles[semantic],

    // Variant list styling
    variantStyle.listStyle,

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Custom classes
    className
  );

  return (
    <Component className={listClasses} {...props}>
      {children}
    </Component>
  );
}

export function ListItem({
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
}

// Convenience components for common patterns
export function BulletList({ children, ...props }: Omit<ListProps, 'variant'>) {
  return (
    <List variant="bullet" {...props}>
      {children}
    </List>
  );
}

export function NumberedList({ children, ...props }: Omit<ListProps, 'variant'>) {
  return (
    <List variant="ordered" {...props}>
      {children}
    </List>
  );
}

export function Checklist({ children, ...props }: Omit<ListProps, 'variant'>) {
  return (
    <List variant="checklist" {...props}>
      {children}
    </List>
  );
}

// Export types
export type ListVariant = ListProps['variant'];
export type ListSpacing = ListProps['spacing'];
export type ListSize = ListProps['size'];