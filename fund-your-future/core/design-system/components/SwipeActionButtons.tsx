/**
 * SwipeActionButtons - Design System Component
 * Action buttons for swipe interactions with semantic styling
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig } from '../utils/responsive';

export interface SwipeActionButtonsProps {
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Button layout variant */
  layout?: 'horizontal' | 'vertical' | 'floating';

  /** Left action configuration */
  leftAction?: {
    label?: string;
    icon?: string | React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  };

  /** Right action configuration */
  rightAction?: {
    label?: string;
    icon?: string | React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  };

  /** Up action configuration (optional) */
  upAction?: {
    label?: string;
    icon?: string | React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  };

  /** Down action configuration (optional) */
  downAction?: {
    label?: string;
    icon?: string | React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  };

  /** Show action labels */
  showLabels?: boolean;

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Size style mappings
 */
const sizeStyles = {
  sm: {
    button: 'w-12 h-12 text-xl',
    container: 'gap-3',
    label: 'text-xs'
  },
  md: {
    button: 'w-16 h-16 text-2xl',
    container: 'gap-4',
    label: 'text-sm'
  },
  lg: {
    button: 'w-20 h-20 text-3xl',
    container: 'gap-6',
    label: 'text-base'
  }
} as const;

/**
 * Layout style mappings
 */
const layoutStyles = {
  horizontal: 'flex-row justify-center items-center',
  vertical: 'flex-col justify-center items-center',
  floating: 'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex-row'
} as const;

/**
 * Action button semantic styles
 */
const actionStyles = {
  left: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:border-red-300',
  right: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:border-green-300',
  up: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300',
  down: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
} as const;

export function SwipeActionButtons({
  size = 'md',
  layout = 'horizontal',
  leftAction,
  rightAction,
  upAction,
  downAction,
  showLabels = true,
  responsive,
  className,
  ...props
}: SwipeActionButtonsProps) {
  const sizeStyle = sizeStyles[size];

  // Build container classes
  const containerClasses = cn(
    'flex',
    layoutStyles[layout],
    sizeStyle.container,

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Custom classes
    className
  );

  // Action button base classes
  const buttonBaseClasses = cn(
    'rounded-full border-2 transition-all duration-200 font-medium shadow-sm',
    'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeStyle.button
  );

  // Render individual action button
  const renderActionButton = (
    action: SwipeActionButtonsProps['leftAction'],
    direction: 'left' | 'right' | 'up' | 'down'
  ) => {
    if (!action) return null;

    const buttonClasses = cn(
      buttonBaseClasses,
      actionStyles[direction],
      direction === 'left' && 'focus:ring-red-500',
      direction === 'right' && 'focus:ring-green-500',
      direction === 'up' && 'focus:ring-blue-500',
      direction === 'down' && 'focus:ring-gray-500'
    );

    return (
      <div key={direction} className="flex flex-col items-center">
        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className={buttonClasses}
          aria-label={action.label || `Swipe ${direction}`}
        >
          {action.icon || getDefaultIcon(direction)}
        </button>
        {showLabels && action.label && (
          <span className={cn('mt-2 font-medium text-center', sizeStyle.label)}>
            {action.label}
          </span>
        )}
      </div>
    );
  };

  // Default icons for each direction
  const getDefaultIcon = (direction: string) => {
    const icons = {
      left: '👈',
      right: '👉',
      up: '👆',
      down: '👇'
    };
    return icons[direction as keyof typeof icons] || '❔';
  };

  // Determine which actions to show based on layout
  const renderActions = () => {
    if (layout === 'vertical') {
      return (
        <>
          {upAction && renderActionButton(upAction, 'up')}
          <div className="flex gap-4">
            {leftAction && renderActionButton(leftAction, 'left')}
            {rightAction && renderActionButton(rightAction, 'right')}
          </div>
          {downAction && renderActionButton(downAction, 'down')}
        </>
      );
    }

    // Horizontal layout
    return (
      <>
        {leftAction && renderActionButton(leftAction, 'left')}
        {upAction && renderActionButton(upAction, 'up')}
        {downAction && renderActionButton(downAction, 'down')}
        {rightAction && renderActionButton(rightAction, 'right')}
      </>
    );
  };

  return (
    <div className={containerClasses} {...props}>
      {renderActions()}
    </div>
  );
}

// Export types
export type SwipeActionButtonsSize = SwipeActionButtonsProps['size'];
export type SwipeActionButtonsLayout = SwipeActionButtonsProps['layout'];