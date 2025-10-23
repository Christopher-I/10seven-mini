/**
 * SwipeContainer - Design System Component
 * Container for managing a stack of SwipeCard components
 * Handles card stack management, animation, and state tracking
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '../utils/classNames';
import { SwipeCard, type SwipeCardProps } from './SwipeCard';

export interface SwipeContainerProps {
  /** Array of items to display as swipe cards */
  items: Array<{
    id: string | number;
    content: React.ReactNode;
    data?: any;
  }>;

  /** Card configuration */
  cardProps?: Partial<SwipeCardProps>;

  /** Maximum number of cards visible in stack */
  maxVisible?: number;

  /** Enable card stacking effect */
  stackCards?: boolean;

  /** Callback when card is swiped left */
  onSwipeLeft?: (item: any, index: number) => void;

  /** Callback when card is swiped right */
  onSwipeRight?: (item: any, index: number) => void;

  /** Callback when all cards are completed */
  onComplete?: (results: Array<{ item: any; direction: 'left' | 'right' }>) => void;

  /** Show progress indicator */
  showProgress?: boolean;

  /** Container styling */
  className?: string;

  /** Children (optional - will be rendered below cards) */
  children?: React.ReactNode;
}

export function SwipeContainer({
  items,
  cardProps = {},
  maxVisible = 3,
  stackCards = true,
  onSwipeLeft,
  onSwipeRight,
  onComplete,
  showProgress = true,
  className,
  children,
  ...props
}: SwipeContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeResults, setSwipeResults] = useState<Array<{ item: any; direction: 'left' | 'right' }>>([]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (currentIndex >= items.length) return;

    const currentItem = items[currentIndex];
    const result = { item: currentItem, direction };

    // Update results
    const newResults = [...swipeResults, result];
    setSwipeResults(newResults);

    // Call appropriate callback
    if (direction === 'left' && onSwipeLeft) {
      onSwipeLeft(currentItem, currentIndex);
    } else if (direction === 'right' && onSwipeRight) {
      onSwipeRight(currentItem, currentIndex);
    }

    // Move to next card
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // Check if complete
    if (nextIndex >= items.length && onComplete) {
      setTimeout(() => onComplete(newResults), 300);
    }
  }, [currentIndex, items, swipeResults, onSwipeLeft, onSwipeRight, onComplete]);

  const handleSwipeLeft = useCallback(() => handleSwipe('left'), [handleSwipe]);
  const handleSwipeRight = useCallback(() => handleSwipe('right'), [handleSwipe]);

  // Calculate visible cards
  const visibleCards = items.slice(currentIndex, currentIndex + maxVisible);
  const isComplete = currentIndex >= items.length;

  const containerClasses = cn(
    'relative flex flex-col items-center justify-center min-h-[400px]',
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {/* Progress indicator */}
      {showProgress && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentIndex} / {items.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / items.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Card stack */}
      <div className="relative w-full max-w-md h-96 flex items-center justify-center">
        {!isComplete ? (
          visibleCards.map((item, index) => {
            const actualIndex = currentIndex + index;
            const isTopCard = index === 0;
            const stackOffset = index * 4;
            const scaleOffset = index * 0.05;

            return (
              <div
                key={`${item.id}-${actualIndex}`}
                className="absolute inset-0"
                style={{
                  zIndex: maxVisible - index,
                  transform: stackCards ? `translateY(${stackOffset}px) scale(${1 - scaleOffset})` : undefined,
                  opacity: stackCards ? 1 - (index * 0.2) : (isTopCard ? 1 : 0)
                }}
              >
                <SwipeCard
                  {...cardProps}
                  swipeable={isTopCard}
                  onSwipeLeft={isTopCard ? handleSwipeLeft : undefined}
                  onSwipeRight={isTopCard ? handleSwipeRight : undefined}
                  showIndicators={isTopCard}
                  className="w-full h-full"
                >
                  {item.content}
                </SwipeCard>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Done!
            </h3>
            <p className="text-gray-600">
              You've swiped through {items.length} cards
            </p>
          </div>
        )}
      </div>

      {/* Action buttons (optional) */}
      {!isComplete && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSwipeLeft}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            👈 Pass
          </button>
          <button
            onClick={handleSwipeRight}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            👉 Interested
          </button>
        </div>
      )}

      {/* Additional content */}
      {children}
    </div>
  );
}

// Export types
export type SwipeContainerItem = SwipeContainerProps['items'][0];