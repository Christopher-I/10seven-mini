/**
 * Badge - Design System Component
 * Semantic badge component for status indicators, labels, and categorization
 * Used in Unit 4 for bank types, swipe indicators, and status displays
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import {
  createResponsiveClasses,
  type ResponsiveConfig,
} from '../utils/responsive';

export interface BadgeProps {
  /** Badge variant - determines styling approach */
  variant?: 'filled' | 'outline' | 'soft';

  /** Semantic color scheme */
  semantic?: 'success' | 'error' | 'warning' | 'info' | 'neutral';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Optional icon (emoji or component) */
  icon?: string | React.ReactNode;

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** Badge content */
  children: React.ReactNode;
}

/**
 * Variant style mappings
 */
const variantStyles = {
  filled: {
    base: 'text-white font-medium',
    border: '',
  },
  outline: {
    base: 'bg-transparent font-medium border-2',
    border: 'border-current',
  },
  soft: {
    base: 'font-medium',
    border: '',
  },
} as const;

/**
 * Semantic color mappings
 */
const semanticStyles = {
  filled: {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-purple-600 text-white',
    info: 'bg-blue-600 text-white',
    neutral: 'bg-gray-600 text-white',
  },
  outline: {
    success: 'text-green-700 border-green-600',
    error: 'text-red-700 border-red-600',
    warning: 'text-purple-700 border-purple-600',
    info: 'text-blue-700 border-blue-600',
    neutral: 'text-gray-700 border-gray-600',
  },
  soft: {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-purple-100 text-purple-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
  },
} as const;

/**
 * Size mappings
 */
const sizeStyles = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    iconSize: 'text-xs',
    radius: 'rounded-sm',
  },
  md: {
    padding: 'px-3 py-1',
    text: 'text-sm',
    iconSize: 'text-sm',
    radius: 'rounded',
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
    iconSize: 'text-base',
    radius: 'rounded-md',
  },
} as const;

export function Badge({
  variant = 'soft',
  semantic = 'neutral',
  size = 'md',
  icon,
  responsive,
  className,
  children,
  ...props
}: BadgeProps) {
  // Get style configurations
  const variantStyle = variantStyles[variant];
  const semanticStyle = semanticStyles[variant][semantic];
  const sizeStyle = sizeStyles[size];

  // Build badge classes
  const badgeClasses = cn(
    // Base styles
    'inline-flex items-center justify-center font-medium transition-colors',

    // Variant styles
    variantStyle.base,
    variantStyle.border,

    // Semantic colors
    semanticStyle,

    // Size styles
    sizeStyle.padding,
    sizeStyle.text,
    sizeStyle.radius,

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Custom classes
    className
  );

  // Icon classes
  const iconClasses = cn(
    'inline-block',
    sizeStyle.iconSize,
    children && 'mr-1.5'
  );

  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className={iconClasses}>{icon}</span>}
      {children}
    </span>
  );
}

// Export types
export type BadgeVariant = BadgeProps['variant'];
export type BadgeSemantic = BadgeProps['semantic'];
export type BadgeSize = BadgeProps['size'];
