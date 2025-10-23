/**
 * Enhanced Neobank Swiper Component with Progressive Consideration Flow
 * Interactive swipe interface with detailed considerations for each neobank
 */

'use client';

import React, { useState, useRef } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import {
  Stack,
  Text,
  UnifiedHeading,
  UnifiedCard,
  Grid,
  Badge
} from '@/core/design-system';
import {
  NEOBANKS,
  type NeobankSwiperProps,
  type NeobankResult,
  type Neobank,
  type FlowState
} from '../data/neobankData';

export function NeobankSwiper({ onSwipingComplete }: NeobankSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flowState, setFlowState] = useState<FlowState>('swiping');
  const [swipeResults, setSwipeResults] = useState<Record<string, NeobankResult>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentConsiderationIndex, setCurrentConsiderationIndex] = useState(0);
  const [currentNeobankForConsiderations, setCurrentNeobankForConsiderations] = useState<Neobank | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Touch handling for mobile swipes
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentNeobank = NEOBANKS[currentIndex];
  const isSwipingComplete = currentIndex >= NEOBANKS.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || isSwipingComplete) return;

    setIsAnimating(true);

    // Initialize result for this neobank
    const newResults = {
      ...swipeResults,
      [currentNeobank.id]: {
        initialSwipe: direction,
        considerationsViewed: []
      }
    };
    setSwipeResults(newResults);

    // Animate card exit
    if (cardRef.current) {
      const translateX = direction === 'right' ? '100%' : '-100%';
      const rotate = direction === 'right' ? '15deg' : '-15deg';

      cardRef.current.style.transform = `translateX(${translateX}) rotate(${rotate})`;
      cardRef.current.style.opacity = '0';
    }

    setTimeout(() => {
      setIsAnimating(false);

      // If swiped right, show considerations
      if (direction === 'right') {
        setCurrentNeobankForConsiderations(currentNeobank);
        setCurrentConsiderationIndex(0);
        setFlowState('considerations');
      } else {
        // If swiped left, move to next card
        moveToNextCard();
      }

      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0)';
        cardRef.current.style.opacity = '1';
      }
    }, 300);
  };

  const moveToNextCard = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= NEOBANKS.length) {
      setFlowState('complete');
      setTimeout(() => {
        onSwipingComplete(swipeResults);
      }, 500);
    } else {
      setFlowState('swiping');
    }
  };

  const handleConsiderationNext = () => {
    if (!currentNeobankForConsiderations) return;

    const considerations = currentNeobankForConsiderations.considerations;
    const nextConsiderationIndex = currentConsiderationIndex + 1;

    // Track that this consideration was viewed
    const currentResult = swipeResults[currentNeobankForConsiderations.id];
    if (currentResult) {
      currentResult.considerationsViewed = [
        ...(currentResult.considerationsViewed || []),
        considerations[currentConsiderationIndex].id
      ];
    }

    if (nextConsiderationIndex >= considerations.length) {
      // All considerations viewed, show final decision
      setFlowState('final-decision');
    } else {
      setCurrentConsiderationIndex(nextConsiderationIndex);
    }
  };

  const handleFinalDecision = (decision: 'match' | 'pass') => {
    if (!currentNeobankForConsiderations) return;

    // Record final decision
    const currentResult = swipeResults[currentNeobankForConsiderations.id];
    if (currentResult) {
      currentResult.finalDecision = decision;
    }

    // Move to next card
    setCurrentNeobankForConsiderations(null);
    setCurrentConsiderationIndex(0);
    moveToNextCard();
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (flowState !== 'swiping' || isAnimating || isSwipingComplete) return;

    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || flowState !== 'swiping' || isAnimating) return;

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;

    setTouchEnd({ x: currentX, y: currentY });

    // Calculate the difference
    const diffX = currentX - touchStart.x;
    const diffY = currentY - touchStart.y;

    // Only start dragging if horizontal movement is greater than vertical (to avoid interfering with scrolling)
    if (!isDragging && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      setIsDragging(true);
      // Prevent scrolling when dragging horizontally
      e.preventDefault();
    }

    // Apply visual feedback during drag
    if (isDragging && cardRef.current) {
      const maxRotation = 15;
      const maxTranslation = 100;

      const rotation = (diffX / 300) * maxRotation;
      const translation = Math.min(Math.max(diffX, -maxTranslation), maxTranslation);
      const opacity = 1 - Math.abs(diffX) / 300;

      cardRef.current.style.transform = `translateX(${translation}px) rotate(${rotation}deg)`;
      cardRef.current.style.opacity = Math.max(opacity, 0.3).toString();
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      // Reset card position if no valid swipe
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0)';
        cardRef.current.style.opacity = '1';
      }
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
      return;
    }

    const diffX = touchEnd.x - touchStart.x;
    const diffY = touchEnd.y - touchStart.y;

    // Check if horizontal swipe was significant enough and greater than vertical movement
    const minSwipeDistance = 50;
    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);

    if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance) {
      // Determine swipe direction
      const swipeDirection = diffX > 0 ? 'right' : 'left';
      handleSwipe(swipeDirection);
    } else {
      // Reset card position if swipe wasn't significant enough
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0) rotate(0)';
        cardRef.current.style.opacity = '1';
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Render different states
  if (flowState === 'complete') {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="text-6xl mb-4">✨</div>
          <UnifiedHeading variant="default" level="h3" className="mb-2">All Done!</UnifiedHeading>
          <Text semantic="muted">
            Here are your final neobank matches...
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6">
          {NEOBANKS.map((bank) => {
            const result = swipeResults[bank.id];
            const isMatch = result?.finalDecision === 'match' || (result?.initialSwipe === 'left' ? false : result?.finalDecision !== 'pass');
            const wasConsidered = result?.initialSwipe === 'right';

            return (
              <div key={bank.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">{bank.logo}</div>
                <Text variant="small" weight="medium" className="mb-2">{bank.name}</Text>
                <div className={`text-xs px-3 py-1 rounded-full ${
                  isMatch
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isMatch ? '✅ Match!' : '❌ No Match'}
                </div>
                {wasConsidered && (
                  <Text variant="xs" semantic="muted" className="mt-1">
                    Considered {result?.considerationsViewed?.length || 0} factors
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (flowState === 'considerations' && currentNeobankForConsiderations) {
    const consideration = currentNeobankForConsiderations.considerations[currentConsiderationIndex];
    const progress = currentConsiderationIndex + 1;
    const total = currentNeobankForConsiderations.considerations.length;

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar with Neobank Profile */}
          <div className="lg:col-span-1">
            <div className={`bg-gradient-to-br ${currentNeobankForConsiderations.color} rounded-2xl p-6 text-white sticky top-4`}>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{currentNeobankForConsiderations.logo}</div>
                <h3 className="text-xl font-bold">{currentNeobankForConsiderations.name}</h3>
                <p className="text-sm opacity-90">{currentNeobankForConsiderations.tagline}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Quick Facts:</h4>
                {currentNeobankForConsiderations.quickFacts.map((fact, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-300 text-xs mt-1">✓</span>
                    <span className="text-xs leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-xs opacity-75 text-center">
                  Considering {progress} of {total} factors
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(progress / total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Consideration Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    consideration.type === 'feature' ? 'bg-green-100 text-green-800' :
                    consideration.type === 'limitation' ? 'bg-orange-100 text-orange-800' :
                    consideration.type === 'cost' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {consideration.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {progress} of {total}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {consideration.title}
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {consideration.content}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Click continue to see the next consideration
                </div>

                <AnimatedButton
                  onClick={handleConsiderationNext}
                  variant="primary"
                  size="lg"
                >
                  Continue →
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (flowState === 'final-decision' && currentNeobankForConsiderations) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar with Neobank Profile - Same as considerations */}
          <div className="lg:col-span-1">
            <div className={`bg-gradient-to-br ${currentNeobankForConsiderations.color} rounded-2xl p-6 text-white sticky top-4`}>
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{currentNeobankForConsiderations.logo}</div>
                <h3 className="text-xl font-bold">{currentNeobankForConsiderations.name}</h3>
                <p className="text-sm opacity-90">{currentNeobankForConsiderations.tagline}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Quick Facts:</h4>
                {currentNeobankForConsiderations.quickFacts.map((fact, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-300 text-xs mt-1">✓</span>
                    <span className="text-xs leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-xs opacity-75 text-center">
                  ✅ All considerations reviewed
                </div>
              </div>
            </div>
          </div>

          {/* Final Decision Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Make Your Final Decision
                </h2>
                <p className="text-gray-600 text-lg">
                  After reviewing all the considerations, would you like to match with {currentNeobankForConsiderations.name}?
                </p>
              </div>

              <div className="flex justify-center space-x-6">
                <AnimatedButton
                  onClick={() => handleFinalDecision('pass')}
                  variant="secondary"
                  size="lg"
                  className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300"
                >
                  ❌ Pass
                </AnimatedButton>

                <AnimatedButton
                  onClick={() => handleFinalDecision('match')}
                  variant="primary"
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  ✅ It's a Match!
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-center space-x-2 mb-2">
          {NEOBANKS.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentIndex
                  ? 'bg-green-500'
                  : index === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          {currentIndex + 1} of {NEOBANKS.length}
        </p>
      </div>

      {/* Swipeable Card */}
      <div className="relative h-[500px] mb-8">
        <div
          ref={cardRef}
          className={`absolute inset-0 bg-gradient-to-br ${currentNeobank.color} rounded-2xl shadow-2xl p-6 text-white transition-all duration-300 transform cursor-pointer select-none`}
          style={{
            transform: 'translateX(0) rotate(0)',
            opacity: 1
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{currentNeobank.logo}</div>
              <h2 className="text-2xl font-bold mb-2">{currentNeobank.name}</h2>
              <p className="text-lg opacity-90">{currentNeobank.tagline}</p>
            </div>

            {/* Quick Facts */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Key Features:</h3>
              <ul className="space-y-3">
                {currentNeobank.quickFacts.map((fact, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span className="text-sm leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Swipe instruction */}
            <div className="text-center text-sm opacity-75">
              <div className="block sm:hidden">
                👆 Swipe left if not interested, right if you want to learn more
              </div>
              <div className="hidden sm:block">
                Swipe left if not interested, right if you want to learn more
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8">
        <button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p className="block sm:hidden">💡 Swipe the card or use the buttons below</p>
        <p className="hidden sm:block">💡 Use the ❌ and ❤️ buttons to make your choice</p>
      </div>
    </div>
  );
}