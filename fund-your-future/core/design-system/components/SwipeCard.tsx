/**
 * SwipeCard - Design System Component
 * Touch-gesture enabled card component for swipe interactions
 * Preserves existing NeobankSwiper while providing a standardized alternative
 */

'use client';

import React, { useState, useRef } from 'react';
import { cn } from '../utils/classNames';
import { createResponsiveClasses, type ResponsiveConfig, type MobileConfig } from '../utils/responsive';

export interface SwipeCardProps {
  /** Card variant - determines visual styling */
  variant?: 'elevated' | 'flat' | 'outlined' | 'gradient';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Enable swipe gestures */
  swipeable?: boolean;

  /** Swipe threshold (pixels) before triggering action */
  swipeThreshold?: number;

  /** Callback for swipe left action */
  onSwipeLeft?: () => void;

  /** Callback for swipe right action */
  onSwipeRight?: () => void;

  /** Callback for swipe up action */
  onSwipeUp?: () => void;

  /** Callback for swipe down action */
  onSwipeDown?: () => void;

  /** Show swipe indicators */
  showIndicators?: boolean;

  /** Custom responsive configuration */
  responsive?: ResponsiveConfig;

  /** Mobile-specific configuration */
  mobile?: MobileConfig;

  /** Additional CSS classes */
  className?: string;

  /** Card content */
  children: React.ReactNode;
}

/**
 * Variant style mappings
 */
const variantStyles = {
  elevated: 'bg-white rounded-xl shadow-lg border',
  flat: 'bg-white rounded-lg border',
  outlined: 'bg-transparent rounded-lg border-2',
  gradient: 'bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border'
} as const;

/**
 * Size mappings
 */
const sizeStyles = {
  sm: 'p-4 max-w-sm',
  md: 'p-6 max-w-md',
  lg: 'p-8 max-w-lg',
  xl: 'p-10 max-w-xl'
} as const;

export function SwipeCard({
  variant = 'elevated',
  size = 'md',
  swipeable = true,
  swipeThreshold = 100,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  showIndicators = false,
  responsive,
  mobile,
  className,
  children,
  ...props
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;

    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeable || !isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!swipeable || !isDragging) return;

    const { x, y } = dragOffset;

    // Determine swipe direction based on threshold
    if (Math.abs(x) > swipeThreshold || Math.abs(y) > swipeThreshold) {
      if (Math.abs(x) > Math.abs(y)) {
        // Horizontal swipe
        if (x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (y > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (y < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    // Reset state
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!swipeable) return;

    setStartPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!swipeable || !isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!swipeable || !isDragging) return;

    const { x, y } = dragOffset;

    if (Math.abs(x) > swipeThreshold || Math.abs(y) > swipeThreshold) {
      if (Math.abs(x) > Math.abs(y)) {
        if (x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        if (y > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (y < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Build card classes
  const cardClasses = cn(
    // Base styles
    'relative transition-all duration-200 ease-out select-none',

    // Variant styles
    variantStyles[variant],

    // Size styles
    sizeStyles[size],

    // Interaction states
    swipeable && [
      'cursor-grab',
      isDragging && 'cursor-grabbing scale-105'
    ],

    // Responsive classes
    responsive && createResponsiveClasses(responsive),

    // Mobile optimization
    mobile?.touchOptimized && 'min-h-[44px] touch-manipulation',
    mobile?.fullWidthMobile && 'w-full sm:w-auto',

    // Custom classes
    className
  );

  // Transform style for drag effect
  const cardStyle = swipeable && isDragging ? {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
    opacity: 1 - Math.abs(dragOffset.x) / 300
  } : {};

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      style={cardStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      {/* Swipe indicators */}
      {showIndicators && swipeable && isDragging && (
        <>
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-4xl">👍</span>
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-4xl">👎</span>
            </div>
          )}
        </>
      )}

      {children}
    </div>
  );
}

// Export types
export type SwipeCardVariant = SwipeCardProps['variant'];
export type SwipeCardSize = SwipeCardProps['size'];