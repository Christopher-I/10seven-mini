/**
 * Premium Flashcard System Component for Unit 1
 * Advanced interactive vocabulary learning with premium animations, gestures, and gamification
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import { BANKING_VOCABULARY, getRandomizedTerms } from '../data/vocabulary';
import type { VocabularyTerm } from '../data/vocabulary';
import { EmojiSurvey } from './EmojiSurvey';

interface FlashcardSystemProps {
  onComplete: (data: {
    flashcardsCompleted: boolean;
    termsReviewed: number;
  }) => void;
}

const STORAGE_KEY = 'unit-1-flashcards-progress';

interface FlashcardProgress {
  reviewedTerms: string[];
  currentIndex: number;
  completed: boolean;
  shuffledTerms: VocabularyTerm[];
}

export function FlashcardSystem({ onComplete }: FlashcardSystemProps) {
  const [terms, setTerms] = useState<VocabularyTerm[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedTerms, setReviewedTerms] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionState, setShowCompletionState] = useState(false);
  const [cardAnimation, setCardAnimation] = useState('');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [deckAnimation, setDeckAnimation] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const progress: FlashcardProgress = JSON.parse(savedProgress);
      if (progress.completed && progress.shuffledTerms.length > 0) {
        setTerms(progress.shuffledTerms);
        setReviewedTerms(progress.reviewedTerms);
        setCurrentIndex(0);
        setIsCompleted(true);
        setShowCompletionState(true);
        return;
      } else if (progress.shuffledTerms.length > 0) {
        setTerms(progress.shuffledTerms);
        setCurrentIndex(progress.currentIndex);
        setReviewedTerms(progress.reviewedTerms);
      }
    } else {
      // Initialize with randomized terms
      const shuffled = getRandomizedTerms();
      setTerms(shuffled);
      saveProgress(shuffled, 0, []);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (
    shuffledTerms: VocabularyTerm[],
    index: number,
    reviewed: string[]
  ) => {
    const progress: FlashcardProgress = {
      shuffledTerms,
      currentIndex: index,
      reviewedTerms: reviewed,
      completed: reviewed.length >= shuffledTerms.length,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  };

  // Handle card flip - simple version
  const handleFlip = () => {
    setCardAnimation('flip');
    setTimeout(() => setCardAnimation(''), 600);
    setIsFlipped(!isFlipped);

    // Mark term as reviewed if not already (first time viewing definition)
    if (!isFlipped && !reviewedTerms.includes(terms[currentIndex]?.term)) {
      const newReviewed = [...reviewedTerms, terms[currentIndex]?.term];
      setReviewedTerms(newReviewed);
      saveProgress(terms, currentIndex, newReviewed);
    }
  };

  // Handle next card
  const handleNext = () => {
    setCardAnimation('slide-left');
    setTimeout(() => setCardAnimation(''), 300);

    if (currentIndex < terms.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
      saveProgress(terms, nextIndex, reviewedTerms);
    } else {
      // Completed all cards
      handleComplete();
    }
  };

  // Handle previous card
  const handlePrevious = () => {
    setCardAnimation('slide-right');
    setTimeout(() => setCardAnimation(''), 300);

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setIsFlipped(false);
      saveProgress(terms, prevIndex, reviewedTerms);
    }
  };

  // Handle completion
  const handleComplete = () => {
    setIsCompleted(true);
    setShowCompletionState(true);
    saveProgress(terms, currentIndex, reviewedTerms);
    onComplete({
      flashcardsCompleted: true,
      termsReviewed: reviewedTerms.length,
    });
  };

  // Premium shuffle - only shuffles card order, keeps progress
  const handleShuffle = () => {
    setIsShuffling(true);
    setDeckAnimation('shuffle');
    setCardAnimation('deck-flip');

    // Animate the deck shuffle
    setTimeout(() => {
      const shuffled = getRandomizedTerms();
      setTerms(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      // Keep progress: reviewedTerms

      // Clear animations
      setTimeout(() => {
        setCardAnimation('');
        setDeckAnimation('');
        setIsShuffling(false);
      }, 600);
    }, 1200);
  };

  // Full reset - clears all progress (for debugging/testing)
  const handleFullReset = () => {
    const shuffled = getRandomizedTerms();
    setTerms(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedTerms([]);
    setIsCompleted(false);
    setShowCompletionState(false);
    setCardAnimation('');
    localStorage.removeItem(STORAGE_KEY);
    saveProgress(shuffled, 0, []);
  };

  // Touch/Swipe gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart || !isDragging) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;

      // Only allow horizontal swipes, prevent vertical scrolling
      if (Math.abs(deltaX) > Math.abs(touch.clientY - touchStart.y)) {
        e.preventDefault();
        setDragOffset(deltaX);
      }

      setTouchEnd({ x: touch.clientX, y: touch.clientY });
    },
    [touchStart, isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const minSwipeDistance = 50;

    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > minSwipeDistance
    ) {
      if (deltaX > 0) {
        // Swipe right - previous card
        handlePrevious();
      } else {
        // Swipe left - next card
        handleNext();
      }
    }

    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragOffset(0);
  }, [touchStart, touchEnd, isDragging, handleNext, handlePrevious]);

  if (terms.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"></div>
      </div>
    );
  }

  const currentTerm = terms[currentIndex];
  const progressPercentage = Math.round(
    (reviewedTerms.length / terms.length) * 100
  );

  if (showCompletionState) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
          <div className="mb-4 text-4xl">🎉</div>
          <h3 className="mb-2 text-xl font-bold text-purple-900">Great job!</h3>
          <p className="mb-4 text-purple-800">
            You've reviewed all {terms.length} banking terms. You're ready for
            the quiz!
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <AnimatedButton onClick={handleShuffle} variant="outline" size="md">
              Review Again
            </AnimatedButton>
          </div>
        </div>

        {/* Completion confirmation */}
        <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-600">
          ✅ Flashcards completed! You've reviewed all the banking terms. Great
          work! You can review them again or continue to the quiz.
        </div>

        {/* Feedback Survey - always show */}
        {!showFeedback ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <EmojiSurvey
              onComplete={(data) => {
                setShowFeedback(true);
                // Could save feedback data here if needed
              }}
            />
          </div>
        ) : (
          <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-gray-600">
            Thanks for your feedback!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Simple Progress indicator */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {reviewedTerms.length} of {terms.length} reviewed (
            {progressPercentage}%)
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gray-800 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Premium Layered Deck Flashcard System */}
      <div className="flex justify-center">
        <div
          className="relative h-72 w-full max-w-md"
          style={{ perspective: '1200px' }}
        >
          {/* Background deck layers */}
          <div
            className={`absolute inset-0 ${deckAnimation === 'shuffle' ? 'animate-pulse' : ''}`}
          >
            {/* Clean layered deck cards */}
            {[...Array(3)].map((_, index) => {
              const offset = 3 + index * 3; // Clean 3px spacing between layers
              const opacity = 0.95 - index * 0.15; // Subtle opacity reduction

              return (
                <div
                  key={`deck-layer-${index}`}
                  className={`absolute h-full w-full rounded-xl border border-gray-600 bg-gray-800 transition-all duration-1000 ${
                    deckAnimation === 'shuffle' ? 'deck-layer-bounce' : ''
                  }`}
                  style={
                    {
                      transform: `translateX(-${offset}px) translateY(-${offset}px)`,
                      zIndex: -3 + index,
                      opacity: opacity,
                      animationDelay: `${index * 150}ms`,
                      '--deck-x': `-${offset}px`,
                      '--deck-y': `-${offset}px`,
                      '--deck-rotate': `0deg`,
                    } as React.CSSProperties
                  }
                >
                  {/* Simple clean card back design */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-700 to-gray-900"></div>

                  {/* Subtle edge highlight */}
                  <div className="absolute inset-0 rounded-xl border border-gray-600"></div>

                  {/* Clean corner indicator */}
                  <div className="absolute right-3 top-3 font-mono text-xs font-bold text-gray-400">
                    {terms.length - index * 3}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active flashcard */}
          <div
            ref={cardRef}
            className={`relative h-72 w-full cursor-pointer select-none transition-all duration-300 hover:scale-105 ${
              cardAnimation === 'flip' ? 'animate-pulse' : ''
            } ${
              cardAnimation === 'slide-left'
                ? '-translate-x-2 transform opacity-90'
                : ''
            } ${
              cardAnimation === 'slide-right'
                ? 'translate-x-2 transform opacity-90'
                : ''
            } ${
              cardAnimation === 'deck-flip'
                ? 'deck-shuffle-animation card-flip-from-deck'
                : ''
            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
              isShuffling ? 'pointer-events-none' : ''
            }`}
            onClick={!isDragging && !isShuffling ? handleFlip : undefined}
            onTouchStart={!isShuffling ? handleTouchStart : undefined}
            onTouchMove={!isShuffling ? handleTouchMove : undefined}
            onTouchEnd={!isShuffling ? handleTouchEnd : undefined}
            style={{
              perspective: '1200px',
              transform: isDragging
                ? `translateX(${dragOffset * 0.3}px) rotate(${dragOffset * 0.02}deg)`
                : undefined,
              zIndex: 10,
              filter: isShuffling ? 'brightness(1.1)' : undefined,
            }}
          >
            <div
              className={`transform-style-preserve-3d absolute inset-0 h-full w-full transition-all duration-700 ${
                isFlipped ? 'rotate-y-180' : ''
              } hover:shadow-2xl`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card (Term) - Simple layout with safe spacing */}
              <div
                className="backface-hidden absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 text-center text-white shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Header with safe positioning */}
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-300">
                    Banking Term
                  </div>
                  <div className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-400">
                    {currentIndex + 1}/{terms.length}
                  </div>
                </div>

                {/* Main content with safe margins */}
                <div className="mb-8 mt-8 flex flex-1 flex-col items-center justify-center">
                  <h3 className="mb-4 break-words text-center text-xl font-bold leading-tight sm:text-2xl">
                    {currentTerm.term}
                  </h3>
                  {reviewedTerms.includes(currentTerm.term) && (
                    <div className="mb-2">
                      <span className="inline-flex items-center rounded-full bg-purple-600 px-2 py-1 text-xs text-white">
                        ✓ Reviewed
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer with safe positioning */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="text-xs text-gray-400">
                    Tap to see definition
                  </div>
                </div>
              </div>

              {/* Back of card (Definition) - Simple with proper padding */}
              <div
                className="rotate-y-180 absolute inset-0 h-full w-full transform rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Header */}
                <div className="absolute left-4 top-4">
                  <div className="rounded bg-gray-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {currentTerm.category}
                  </div>
                </div>

                {/* Content area with large top padding to avoid header */}
                <div className="h-full overflow-y-auto px-6 pb-12 pt-16">
                  <div className="flex min-h-full flex-col justify-center text-center">
                    <p className="text-base font-medium leading-relaxed text-gray-900 sm:text-lg">
                      {currentTerm.definition}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="text-xs text-gray-500">
                    Tap to see term again
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {terms.length}
        </div>
        {reviewedTerms.includes(currentTerm.term) && (
          <div className="mt-1 text-xs text-purple-700">✓ Reviewed</div>
        )}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedButton
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
          size="md"
        >
          ← Previous
        </AnimatedButton>

        <div className="flex gap-2">
          <AnimatedButton
            onClick={handleShuffle}
            variant="outline"
            size="sm"
            disabled={isShuffling}
            className={`relative overflow-hidden ${isShuffling ? 'animate-pulse' : ''}`}
          >
            <div className="flex items-center space-x-1">
              <div className="relative">
                {isShuffling ? (
                  <span className="inline-block animate-spin">🔄</span>
                ) : (
                  <div className="flex">
                    <div className="h-3 w-2 -translate-x-0.5 -rotate-12 transform rounded-sm bg-gray-400"></div>
                    <div className="h-3 w-2 rounded-sm bg-gray-600"></div>
                    <div className="h-3 w-2 translate-x-0.5 rotate-12 transform rounded-sm bg-gray-800"></div>
                  </div>
                )}
              </div>
              <span>{isShuffling ? 'Shuffling...' : 'Shuffle'}</span>
            </div>
          </AnimatedButton>

          <AnimatedButton onClick={handleComplete} variant="success" size="md">
            {reviewedTerms.length >= terms.length
              ? 'Finish ✓'
              : 'Finish Early ✓'}
          </AnimatedButton>
        </div>

        <AnimatedButton
          onClick={handleNext}
          disabled={currentIndex === terms.length - 1}
          variant="primary"
          size="md"
        >
          Next →
        </AnimatedButton>
      </div>

      {/* Instructions */}
      <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-600">
        <p className="mb-2">
          <strong>Instructions:</strong> Tap the card to flip between term and
          definition. Use the buttons to navigate between cards. You must review
          all cards at least once to continue.
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span>👆</span>
            <span>Tap to flip</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👈</span>
            <span>Swipe for next</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👉</span>
            <span>Swipe for previous</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced CSS for premium 3D animations and effects
const cardStyles = `
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }

  /* Premium card hover effects */
  .flashcard-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
  }

  /* Smooth scale animation */
  .scale-hover:hover {
    transform: scale(1.02);
  }

  /* Subtle glow effect for streaks */
  .streak-glow {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
  }

  /* XP gain animation */
  @keyframes xp-gain {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-20px); opacity: 0; }
  }

  .xp-animation {
    animation: xp-gain 1s ease-out forwards;
  }

  /* Card flip enhancement */
  .flip-enhanced {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Confidence rating bounce */
  .confidence-bounce:active {
    animation: bounce 0.3s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* Shimmer effect for mastered cards */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-effect {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }

  /* Clean deck layering effects */
  .deck-layer {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  /* Deck shuffle animation */
  @keyframes deck-shuffle {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
    25% {
      transform: rotate(-5deg) scale(1.02);
      opacity: 0.9;
    }
    50% {
      transform: rotate(180deg) scale(1.05);
      opacity: 0.7;
    }
    75% {
      transform: rotate(185deg) scale(1.02);
      opacity: 0.9;
    }
    100% {
      transform: rotate(360deg) scale(1);
      opacity: 1;
    }
  }

  .deck-shuffle-animation {
    animation: deck-shuffle 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Card flip from deck */
  @keyframes card-flip-from-deck {
    0% {
      transform: rotateY(0deg) translateY(0px) scale(1);
      opacity: 1;
    }
    50% {
      transform: rotateY(90deg) translateY(-10px) scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: rotateY(0deg) translateY(0px) scale(1);
      opacity: 1;
    }
  }

  .card-flip-from-deck {
    animation: card-flip-from-deck 0.6s ease-out;
  }

  /* Deck layer bounce on shuffle */
  @keyframes deck-layer-bounce {
    0%, 100% {
      transform: translateX(var(--deck-x)) translateY(var(--deck-y)) rotate(var(--deck-rotate));
    }
    50% {
      transform: translateX(var(--deck-x)) translateY(calc(var(--deck-y) - 4px)) rotate(var(--deck-rotate));
    }
  }

  .deck-layer-bounce {
    animation: deck-layer-bounce 0.4s ease-in-out;
  }
`;

// Inject enhanced styles
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#flashcard-premium-styles');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'flashcard-premium-styles';
    style.textContent = cardStyles;
    document.head.appendChild(style);
  }
}
