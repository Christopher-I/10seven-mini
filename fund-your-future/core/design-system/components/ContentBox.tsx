/**
 * ContentBox - Unified Component
 * Replaces 15 components: CalloutBox, AlertCard, QuoteCard, DefinitionBox,
 * JudgeQuoteBox, StatisticBox, EmpowermentCard, CompletionCard, SummaryCard, etc.
 */

'use client';

import React from 'react';
import { cn, semanticColor, variant } from '../utils/classNames';
import {
  createResponsiveClasses,
  unit2Patterns,
  type ResponsiveConfig,
} from '../utils/responsive';

export interface ContentBoxProps {
  /** Content box variant - determines layout and styling */
  variant:
    | 'callout'
    | 'alert'
    | 'quote'
    | 'definition'
    | 'stats'
    | 'empowerment'
    | 'completion'
    | 'summary';

  /** Semantic color scheme */
  semantic?: 'info' | 'warning' | 'error' | 'success' | 'neutral';

  /** Optional title/heading */
  title?: string;

  /** Optional icon (emoji or icon component) */
  icon?: string | React.ReactNode;

  /** Apply gradient background (for hero/empowerment variants) */
  gradient?: boolean;

  /** Border styling */
  border?: 'default' | 'thick' | 'accent' | 'none';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;

  /** Click handler for interactive content boxes */
  onClick?: () => void;

  /** Content */
  children: React.ReactNode;
}

/**
 * Variant style mappings based on Unit 2 analysis
 */
const variantStyles = {
  // CalloutBox variants (most common)
  callout: {
    base: 'rounded-lg border',
    padding: 'p-4 sm:p-6',
  },

  // Alert/Warning cards
  alert: {
    base: 'rounded-xl border',
    padding: 'p-6',
  },

  // Quote cards (testimonials, user quotes)
  quote: {
    base: 'rounded-lg border',
    padding: 'p-3 sm:p-4',
  },

  // Definition boxes (gray neutral style)
  definition: {
    base: 'rounded-lg border',
    padding: 'p-6',
  },

  // Statistics boxes (highlighted data)
  stats: {
    base: 'rounded-lg border',
    padding: 'p-4 sm:p-6',
  },

  // Empowerment cards (final messages, gradients)
  empowerment: {
    base: 'rounded-xl border',
    padding: 'p-8',
  },

  // Completion cards (success messages)
  completion: {
    base: 'rounded-xl border-2',
    padding: 'p-8',
  },

  // Summary cards (data display, white backgrounds)
  summary: {
    base: 'rounded-lg border',
    padding: 'p-4',
  },
} as const;

/**
 * Semantic color mappings based on Unit 2 patterns
 */
const semanticStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    titleText: 'text-blue-900',
  },
  warning: {
    bg: 'bg-transparent',
    border: 'border-none',
    text: 'text-gray-900',
    titleText: 'text-gray-900',
  },
  error: {
    bg: 'bg-transparent',
    border: 'border-none',
    text: 'text-gray-900',
    titleText: 'text-gray-900',
  },
  success: {
    bg: 'bg-transparent',
    border: 'border-none',
    text: 'text-gray-900',
    titleText: 'text-gray-900',
  },
  neutral: {
    bg: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    titleText: 'text-black',
  },
} as const;

/**
 * Border style mappings
 */
const borderStyles = {
  default: '',
  thick: 'border-2',
  accent: 'border-l-4 border-purple-600', // From accent heading pattern
  none: 'border-0',
} as const;

/**
 * Gradient backgrounds for special variants
 */
const gradientStyles = {
  empowerment: 'bg-gradient-to-br from-gray-100 to-gray-200',
  hero: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white',
} as const;

export function ContentBox({
  variant = 'callout',
  semantic = 'neutral',
  title,
  icon,
  gradient = false,
  border = 'default',
  size = 'md',
  responsive,
  className,
  onClick,
  children,
  ...props
}: ContentBoxProps) {
  // Get base variant styles with fallback
  const variantStyle = variantStyles[variant] || variantStyles.callout;
  const semanticStyle = semanticStyles[semantic];

  // Build container classes
  const containerClasses = cn(
    // Base variant styles
    variantStyle?.base,
    variantStyle?.padding,

    // Semantic colors (unless gradient is applied)
    !gradient &&
      semanticStyle && [
        semanticStyle.bg,
        semanticStyle.border,
        variant !== 'empowerment' && semanticStyle.text,
      ],

    // Gradient backgrounds
    gradient && variant === 'empowerment' && gradientStyles.empowerment,
    gradient && variant === 'callout' && gradientStyles.hero,

    // Border styles
    borderStyles[border],

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Custom classes
    className
  );

  // Title classes
  const titleClasses = cn(
    'font-bold mb-3',
    variant === 'empowerment'
      ? 'text-xl text-gray-900'
      : variant === 'completion'
        ? 'text-xl'
        : variant === 'definition'
          ? 'font-semibold text-black'
          : 'text-lg',

    !gradient && semanticStyle?.titleText,
    gradient && variant === 'callout' && 'text-white'
  );

  // Icon classes
  const iconClasses = cn(
    'inline-block',
    typeof icon === 'string' ? 'text-lg mr-2' : 'mr-2'
  );

  return (
    <div className={containerClasses} onClick={onClick} {...props}>
      {/* Title with optional icon */}
      {(title || icon) && (
        <div className="mb-3 flex items-start gap-2">
          {icon && <span className={iconClasses}>{icon}</span>}
          {title && <h3 className={titleClasses}>{title}</h3>}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          variant === 'quote' && 'font-medium italic',
          variant === 'definition' && 'space-y-4',
          variant === 'stats' && 'space-y-2'
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Export variant types for better TypeScript support
export type ContentBoxVariant = ContentBoxProps['variant'];
export type ContentBoxSemantic = ContentBoxProps['semantic'];
