/**
 * Unit Progress Header Component
 * Replaces SectionProgress with clean 8-dot progress bar matching new designs
 * Features:
 * - 8-dot horizontal progress indicator
 * - Purple theme (#2E1E72, #8577B7, #E5DEEF)
 * - Sub-step partial progress support
 * - Mobile-first responsive design
 * - Maintains navigation functionality
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';

export interface UnitProgressHeaderProps {
  currentPage: number;
  totalPages: number;
  currentStep?: number;
  totalSteps?: number;
  unitTitle: string;
  onPageJump?: (page: number) => void;
  className?: string;
}

export function UnitProgressHeader({
  currentPage,
  totalPages,
  currentStep = 0,
  totalSteps = 1,
  unitTitle,
  onPageJump,
  className
}: UnitProgressHeaderProps) {
  // Calculate progress for 8 dots (matching design exactly)
  const totalDots = 8;

  // Calculate which dots should be filled
  const getPageProgress = () => {
    const baseProgress = (currentPage - 1) / totalPages;
    const stepProgress = totalSteps > 1 ? currentStep / totalSteps : 1;
    const currentPageProgress = baseProgress + (stepProgress / totalPages);

    return Math.min(currentPageProgress, 1);
  };

  const progress = getPageProgress();
  const filledDots = Math.floor(progress * totalDots);
  const partialDot = (progress * totalDots) % 1;

  return (
    <div className={cn("bg-white border-b border-gray-100 sticky top-0 z-40", className)}>
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Unit Title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900 font-red-hat">
            {unitTitle}
          </h1>

          {/* Page indicator for desktop */}
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            Page {currentPage} of {totalPages}
            {totalSteps > 1 && (
              <span className="ml-2 text-xs">
                (Step {currentStep + 1}/{totalSteps})
              </span>
            )}
          </div>
        </div>

        {/* 8-Dot Progress Bar */}
        <div className="flex items-center justify-center space-x-3">
          {Array.from({ length: totalDots }, (_, index) => {
            let dotState: 'empty' | 'partial' | 'complete' = 'empty';

            if (index < filledDots) {
              dotState = 'complete';
            } else if (index === filledDots && partialDot > 0) {
              dotState = 'partial';
            }

            return (
              <button
                key={index}
                onClick={() => {
                  if (onPageJump) {
                    const targetPage = Math.ceil(((index + 1) / totalDots) * totalPages);
                    onPageJump(Math.min(targetPage, totalPages));
                  }
                }}
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 relative overflow-hidden",
                  onPageJump ? "cursor-pointer hover:scale-110" : "cursor-default",
                  dotState === 'complete'
                    ? "bg-[#2E1E72]"
                    : "bg-[#E5DEEF] border-2 border-[#2E1E72]"
                )}
                aria-label={`Progress dot ${index + 1} of ${totalDots}`}
              >
                {/* Partial fill for current dot */}
                {dotState === 'partial' && (
                  <div
                    className="absolute inset-0 bg-[#8577B7] transition-all duration-300"
                    style={{
                      clipPath: `inset(0 ${(1 - partialDot) * 100}% 0 0)`
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile page indicator */}
        <div className="sm:hidden flex justify-center mt-3">
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
            {totalSteps > 1 && ` • Step ${currentStep + 1}/${totalSteps}`}
          </span>
        </div>
      </div>
    </div>
  );
}