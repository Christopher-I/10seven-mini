/**
 * Navigation Component
 * Mobile-optimized with gesture support and safe area handling
 */

'use client';

import { useEffect, useState } from 'react';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function Navigation({
  currentPage,
  totalPages,
  onPageChange,
  canGoBack = true,
  canGoForward = true,
}: NavigationProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrevious = () => {
    if (canGoBack && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Touch/swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg sm:hidden safe-bottom">
        <div className="px-4 py-2">
          {/* Page Progress - Top row with breathing room */}
          <div className="text-center mb-3">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-1.5 justify-center items-center">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                // Show fewer pages on mobile to prevent crowding
                const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;
                const isEdge = pageNum === 1 || pageNum === totalPages;
                
                if (!isNearCurrent && !isEdge && totalPages > 5) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="text-gray-400 text-sm px-1">•••</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`transition-all touch-feedback ${
                      pageNum === currentPage
                        ? 'w-6 h-2.5 bg-[#2E1E72] rounded-full'
                        : 'w-2.5 h-2.5 bg-[#E5DEEF] rounded-full active:bg-[#8577B7] hover:bg-[#8577B7]'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons - Bottom row with proper spacing */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canGoBack || currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all transform active:scale-95 touch-feedback ${
                canGoBack && currentPage > 1
                  ? 'bg-gray-100 text-gray-700 active:bg-gray-200'
                  : 'bg-gray-50 text-gray-300'
              }`}
              aria-label="Previous page"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Swipe Hint */}
            <div className="text-xs text-gray-400">
              Swipe to navigate
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoForward || currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all transform active:scale-95 touch-feedback ${
                canGoForward && currentPage < totalPages
                  ? 'bg-[#2E1E72] text-white active:bg-[#8577B7]'
                  : 'bg-gray-50 text-gray-300'
              }`}
              aria-label="Next page"
            >
              <span className="text-sm font-medium">Next</span>
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden sm:block fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-3">
          {/* Compact Navigation Row */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canGoBack || currentPage === 1}
              className={`flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                canGoBack && currentPage > 1
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'cursor-not-allowed bg-gray-50 text-gray-400'
              }`}
              aria-label="Previous page"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Inline Page Progress and Stepper */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Page {currentPage} / {totalPages}
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  const isNearCurrent = Math.abs(pageNum - currentPage) <= 2;
                  const isEdge = pageNum === 1 || pageNum === totalPages;
                  
                  if (!isNearCurrent && !isEdge && totalPages > 7) {
                    if ((pageNum === 2 && currentPage > 4) || (pageNum === totalPages - 1 && currentPage < totalPages - 3)) {
                      return <span key={pageNum} className="text-gray-400 text-xs px-1">•••</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`transition-all ${
                        pageNum === currentPage
                          ? 'w-6 h-3 bg-[#2E1E72] rounded-full'
                          : 'w-3 h-3 bg-[#E5DEEF] hover:bg-[#8577B7] rounded-full'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    />
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoForward || currentPage === totalPages}
              className={`flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                canGoForward && currentPage < totalPages
                  ? 'bg-[#2E1E72] text-white hover:bg-[#8577B7]'
                  : 'cursor-not-allowed bg-gray-50 text-gray-400'
              }`}
              aria-label="Next page"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Tip text below */}
          <div className="text-center mt-2">
            <div className="text-xs text-gray-500">
              Tip: Use ← → arrow keys to navigate
            </div>
          </div>
        </div>
      </nav>

      {/* Swipe area for gesture navigation - avoid blocking interactive elements */}
      <div 
        className="fixed inset-x-0 top-20 bottom-20 -z-10 sm:hidden"
        style={{ touchAction: 'pan-x' }}
        onTouchStart={(e) => {
          // Only handle swipe if not touching an interactive element
          const target = e.target as HTMLElement;
          if (!target.closest('button, a, input, select, textarea, [role="button"]')) {
            onTouchStart(e);
          }
        }}
        onTouchMove={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('button, a, input, select, textarea, [role="button"]')) {
            onTouchMove(e);
          }
        }}
        onTouchEnd={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('button, a, input, select, textarea, [role="button"]')) {
            onTouchEnd();
          }
        }}
      />
    </>
  );
}