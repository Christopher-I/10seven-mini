/**
 * UnifiedCard - Unified Component
 * Replaces 8 components: HeroCard, AlertCard, CompletionCard, SummaryCard,
 * FeeSummaryCard, FeeTypeCard, SuccessCard, BankCard
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import {
  createResponsiveClasses,
  unit2Patterns,
  type ResponsiveConfig,
  type MobileConfig,
} from '../utils/responsive';

export interface UnifiedCardProps {
  /** Card variant - determines layout and styling */
  variant:
    | 'hero'
    | 'alert'
    | 'completion'
    | 'summary'
    | 'neutral'
    | 'interactive'
    | 'elevated';

  /** Semantic color scheme */
  semantic?: 'info' | 'warning' | 'error' | 'success' | 'neutral';

  /** Border styling */
  border?: 'default' | 'thick' | 'none';

  /** Apply gradient background */
  gradient?: boolean;

  /** Card size */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Interactive state (for buttons/clickable cards) */
  interactive?: boolean;

  /** Selected state (for interactive cards) */
  selected?: boolean;

  /** Shadow level */
  shadow?: 'none' | 'sm' | 'base' | 'md';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Mobile-specific configuration */
  mobile?: MobileConfig;

  /** Click handler for interactive cards */
  onClick?: () => void;

  /** Additional CSS classes */
  className?: string;

  /** Card content */
  children: React.ReactNode;
}

/**
 * Variant style mappings based on Unit 2 analysis
 */
const variantStyles = {
  // HeroCard - Gradient intro cards
  hero: {
    base: unit2Patterns.heroCard, // 'rounded-lg sm:rounded-xl p-4 sm:p-8'
    background: 'bg-gradient-to-r from-gray-800 to-gray-900',
    textColor: 'text-white',
    border: '',
  },

  // AlertCard - Warning/error notifications
  alert: {
    base: unit2Patterns.alertCard, // 'rounded-xl p-6'
    background: '', // Determined by semantic
    textColor: '',
    border: 'border',
  },

  // CompletionCard - Success states
  completion: {
    base: 'rounded-xl p-8',
    background: '', // Determined by semantic
    textColor: '',
    border: 'border-2',
  },

  // SummaryCard - Data display, clean white cards
  summary: {
    base: 'rounded-lg p-4',
    background: 'bg-white',
    textColor: 'text-gray-900',
    border: 'border',
  },

  // Neutral - General purpose cards
  neutral: {
    base: 'rounded-lg p-4',
    background: 'bg-white',
    textColor: '',
    border: 'border',
  },

  // Interactive - Clickable cards (case buttons, etc.)
  interactive: {
    base: 'rounded-lg p-4',
    background: 'bg-white',
    textColor: 'text-gray-900',
    border: 'border',
    transition: 'transition-all',
  },

  // Elevated - Enhanced shadow and styling for important content
  elevated: {
    base: 'rounded-xl p-6 sm:p-8',
    background: 'bg-white',
    textColor: 'text-gray-900',
    border: 'border shadow-lg',
  },
} as const;

/**
 * Semantic color mappings for backgrounds and borders
 */
const semanticStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  warning: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
  },
  neutral: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-900',
  },
} as const;

/**
 * Border style mappings
 */
const borderStyles = {
  default: 'border',
  thick: 'border-2',
  none: 'border-0',
} as const;

/**
 * Shadow mappings
 */
const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
} as const;

/**
 * Interactive state styles
 */
const interactiveStyles = {
  base: 'cursor-pointer',
  hover: 'hover:border-gray-300 hover:shadow-sm',
  selected: 'border-gray-600 bg-gray-50',
  focus: 'focus:outline-none focus:ring-2 focus:ring-gray-300',
} as const;

export function UnifiedCard({
  variant = 'neutral',
  semantic,
  border = 'default',
  gradient = false,
  size = 'md',
  interactive = false,
  selected = false,
  shadow = 'none',
  responsive,
  mobile,
  onClick,
  className,
  children,
  ...props
}: UnifiedCardProps) {
  // Get variant styles with fallback
  const variantStyle = variantStyles[variant] || variantStyles.neutral;
  const semanticStyle = semantic ? semanticStyles[semantic] : null;

  // Determine if this should be a button element
  const Component = interactive && onClick ? 'button' : 'div';

  // Build card classes
  const cardClasses = cn(
    // Base variant styles
    variantStyle?.base,

    // Background (semantic overrides variant for alert/completion)
    gradient && variant === 'hero' && variantStyle?.background,
    !gradient && [
      semanticStyle?.bg || variantStyle?.background,
      semanticStyle?.text || variantStyle?.textColor,
    ],

    // Borders
    border !== 'none' && [
      borderStyles[border],
      semanticStyle?.border || variantStyle?.border,
    ],

    // Shadows
    shadowStyles[shadow],

    // Interactive styles
    interactive && [
      interactiveStyles.base,
      interactiveStyles.hover,
      interactiveStyles.focus,
      variant === 'interactive' && 'transition-all',
    ],

    // Selected state
    selected && interactiveStyles.selected,

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Mobile optimization
    mobile?.touchOptimized && 'min-h-[44px]',
    mobile?.fullWidthMobile && 'w-full sm:w-auto',

    // Custom classes
    className
  );

  return (
    <Component
      className={cardClasses}
      onClick={onClick}
      type={Component === 'button' ? 'button' : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

// Convenience components for common patterns
export function HeroCard({
  children,
  ...props
}: Omit<UnifiedCardProps, 'variant' | 'gradient'>) {
  return (
    <UnifiedCard variant="hero" gradient {...props}>
      {children}
    </UnifiedCard>
  );
}

export function AlertCard({
  children,
  semantic = 'error',
  ...props
}: Omit<UnifiedCardProps, 'variant'>) {
  return (
    <UnifiedCard variant="alert" semantic={semantic} {...props}>
      {children}
    </UnifiedCard>
  );
}

export function CompletionCard({
  children,
  semantic = 'success',
  ...props
}: Omit<UnifiedCardProps, 'variant' | 'border'>) {
  return (
    <UnifiedCard
      variant="completion"
      border="thick"
      semantic={semantic}
      {...props}
    >
      {children}
    </UnifiedCard>
  );
}

export function SummaryCard({
  children,
  ...props
}: Omit<UnifiedCardProps, 'variant'>) {
  return (
    <UnifiedCard variant="summary" shadow="sm" {...props}>
      {children}
    </UnifiedCard>
  );
}

export function InteractiveCard({
  children,
  onClick,
  selected,
  ...props
}: Omit<UnifiedCardProps, 'variant' | 'interactive'>) {
  return (
    <UnifiedCard
      variant="interactive"
      interactive
      onClick={onClick}
      selected={selected}
      mobile={{ touchOptimized: true }}
      {...props}
    >
      {children}
    </UnifiedCard>
  );
}

// Export types
export type CardVariant = UnifiedCardProps['variant'];
export type CardSemantic = UnifiedCardProps['semantic'];
export type CardBorder = UnifiedCardProps['border'];
