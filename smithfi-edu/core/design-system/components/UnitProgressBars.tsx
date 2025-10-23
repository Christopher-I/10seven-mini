/**
 * Unit Progress Bars Component
 * Matches the exact desktop design with thin horizontal progress bars
 * Features:
 * - 8 thin horizontal bars at the top
 * - Purple theme (#2E1E72 filled, #E5DEEF unfilled)
 * - Clean minimalist design matching desktop mockup
 * - Responsive layout with proper spacing
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';

export interface UnitProgressBarsProps {
  currentPage: number;
  totalPages: number;
  currentStep?: number;
  totalSteps?: number;
  unitTitle: string;
  onPageJump?: (page: number) => void;
  onPageChange?: (page: number) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  className?: string;
}

export function UnitProgressBars({
  currentPage,
  totalPages,
  currentStep = 0,
  totalSteps = 1,
  unitTitle,
  onPageJump,
  onPageChange,
  canGoBack = true,
  canGoForward = true,
  className
}: UnitProgressBarsProps) {
  // Calculate progress for 8 bars (matching design exactly)
  const totalBars = 8;

  // Calculate which bars should be filled
  const getPageProgress = () => {
    const baseProgress = (currentPage - 1) / totalPages;
    const stepProgress = totalSteps > 1 ? currentStep / totalSteps : 1;
    const currentPageProgress = baseProgress + (stepProgress / totalPages);

    return Math.min(currentPageProgress, 1);
  };

  const progress = getPageProgress();
  const filledBars = Math.floor(progress * totalBars);
  const partialProgress = (progress * totalBars) % 1;

  // Navigation handlers
  const handlePrevious = () => {
    if (canGoBack && currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward && currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={cn("bg-white border-b border-gray-100 sticky top-0 z-40", className)}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Header with back arrow, title, and avatar */}
        <div className="flex items-center justify-between mb-6">
          {/* Left side - Back arrow and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="text-[#2E1E72] hover:text-[#8577B7] transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h1 className="text-xl font-semibold text-[#2E1E72] font-red-hat">
              {unitTitle}
            </h1>
          </div>

          {/* Right side - Avatar placeholder */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* 8 Progress Bars - matching desktop design exactly */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalBars }, (_, index) => {
            let barState: 'empty' | 'partial' | 'complete' = 'empty';

            if (index < filledBars) {
              barState = 'complete';
            } else if (index === filledBars && partialProgress > 0) {
              barState = 'partial';
            }

            return (
              <button
                key={index}
                onClick={() => {
                  if (onPageJump) {
                    const targetPage = Math.ceil(((index + 1) / totalBars) * totalPages);
                    onPageJump(Math.min(targetPage, totalPages));
                  }
                }}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300 relative overflow-hidden",
                  onPageJump ? "cursor-pointer hover:h-2" : "cursor-default",
                  barState === 'complete'
                    ? "bg-[#2E1E72]"
                    : "bg-[#E5DEEF]"
                )}
                aria-label={`Progress bar ${index + 1} of ${totalBars}`}
              >
                {/* Partial fill for current bar */}
                {barState === 'partial' && (
                  <div
                    className="absolute inset-0 bg-[#8577B7] transition-all duration-300"
                    style={{
                      width: `${partialProgress * 100}%`
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress info for screen readers only */}
        <div className="sr-only">
          Progress: {Math.round(progress * 100)}% complete
        </div>
      </div>

      {/* Floating Navigation - only show if onPageChange is provided */}
      {onPageChange && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-4 bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2">
            <button
              onClick={handlePrevious}
              disabled={!canGoBack || currentPage === 1}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all",
                canGoBack && currentPage > 1
                  ? "text-[#2E1E72] hover:bg-[#E5DEEF]"
                  : "text-gray-400 cursor-not-allowed"
              )}
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>

            <div className="text-sm text-gray-500 px-2">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoForward || currentPage === totalPages}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all",
                canGoForward && currentPage < totalPages
                  ? "bg-[#2E1E72] text-white hover:bg-[#8577B7]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
              aria-label="Next page"
            >
              <span className="text-sm">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}