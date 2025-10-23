/**
 * DemoBox - Design System Component
 * For demonstrating UI patterns, drag-drop visualizations, and interactive previews
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig, type MobileConfig } from '../utils/responsive';

export interface DemoBoxProps {
  /** Demo variant - determines visual styling */
  variant?: 'preview' | 'interactive' | 'visual-guide' | 'example';

  /** Semantic context */
  semantic?: 'info' | 'neutral' | 'instructional';

  /** Background style */
  background?: 'subtle' | 'minimal' | 'none';

  /** Size of the demo area */
  size?: 'sm' | 'md' | 'lg';

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Mobile-specific configuration */
  mobile?: MobileConfig;

  /** Additional CSS classes */
  className?: string;

  /** Demo content */
  children: React.ReactNode;
}

/**
 * Variant style mappings
 */
const variantStyles = {
  preview: {
    background: 'bg-gray-50',
    border: 'border border-gray-200',
    padding: 'p-4',
    radius: 'rounded-lg'
  },
  interactive: {
    background: 'bg-blue-50',
    border: 'border border-blue-200',
    padding: 'p-4',
    radius: 'rounded-lg'
  },
  'visual-guide': {
    background: 'bg-gray-50',
    border: 'border border-gray-200',
    padding: 'p-4',
    radius: 'rounded-lg'
  },
  example: {
    background: 'bg-gray-50',
    border: 'border border-gray-300',
    padding: 'p-4 sm:p-6',
    radius: 'rounded-lg'
  }
} as const;

/**
 * Semantic style mappings
 */
const semanticStyles = {
  info: {
    background: 'bg-blue-50',
    border: 'border-blue-200'
  },
  neutral: {
    background: 'bg-gray-50',
    border: 'border-gray-200'
  },
  instructional: {
    background: 'bg-gray-50',
    border: 'border-gray-300'
  }
} as const;

/**
 * Size mappings
 */
const sizeStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-4 sm:p-6'
} as const;

export function DemoBox({
  variant = 'preview',
  semantic = 'neutral',
  background = 'subtle',
  size = 'md',
  responsive,
  mobile,
  className,
  children,
  ...props
}: DemoBoxProps) {
  // Get variant and semantic styles
  const variantStyle = variantStyles[variant];
  const semanticStyle = semanticStyles[semantic];

  // Build demo box classes
  const demoClasses = cn(
    // Base styles
    'relative',

    // Background and border (semantic overrides variant)
    semanticStyle?.background || variantStyle.background,
    semanticStyle?.border || variantStyle.border,

    // Radius and spacing
    variantStyle.radius,
    size && sizeStyles[size],

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Mobile optimization
    mobile?.touchOptimized && 'min-h-[44px]',
    mobile?.fullWidthMobile && 'w-full sm:w-auto',

    // Custom classes
    className
  );

  return (
    <div className={demoClasses} {...props}>
      {children}
    </div>
  );
}

// Convenience components for common patterns
export function InteractiveDemo({ children, ...props }: Omit<DemoBoxProps, 'variant'>) {
  return (
    <DemoBox variant="interactive" semantic="info" {...props}>
      {children}
    </DemoBox>
  );
}

export function VisualGuide({ children, ...props }: Omit<DemoBoxProps, 'variant'>) {
  return (
    <DemoBox variant="visual-guide" semantic="instructional" {...props}>
      {children}
    </DemoBox>
  );
}

export function PreviewBox({ children, ...props }: Omit<DemoBoxProps, 'variant'>) {
  return (
    <DemoBox variant="preview" semantic="neutral" {...props}>
      {children}
    </DemoBox>
  );
}

// Export types
export type DemoVariant = DemoBoxProps['variant'];
export type DemoSemantic = DemoBoxProps['semantic'];