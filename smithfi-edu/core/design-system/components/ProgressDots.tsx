/**
 * Progress Dots Component
 * Enhanced circular progress visualization with pixel-perfect specifications
 * Supports proportional fills and accurate progress representation
 *
 * Features:
 * - Fixed 5-circle layout for consistency
 * - Proportional progress display with partial fills
 * - Brand color integration (#2E1E72)
 * - Conic gradient partial fills for accurate progress
 * - Multiple size variants and dashboard integration
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';

export interface ProgressDotsProps {
  completed: number;      // Number of completed units
  total: number;          // Total number of units
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dashboard' | 'overview';
  showPartial?: boolean;  // Enable partial circle fills
  className?: string;
}

// Enhanced logic for accurate progress representation
const getCircleStates = (completed: number, total: number) => {
  const progressPercent = Math.min((completed / total) * 100, 100);

  return Array.from({ length: 5 }, (_, index) => {
    const circleStart = index * 20; // 0%, 20%, 40%, 60%, 80%
    const circleEnd = (index + 1) * 20; // 20%, 40%, 60%, 80%, 100%

    let state: 'empty' | 'partial' | 'complete' = 'empty';
    let fillPercentage = 0;

    if (progressPercent > circleStart) {
      if (progressPercent >= circleEnd) {
        state = 'complete';
        fillPercentage = 100;
      } else {
        state = 'partial';
        fillPercentage = ((progressPercent - circleStart) / 20) * 100;
      }
    }

    return { state, fillPercentage };
  });
};

export function ProgressDots({
  completed,
  total,
  size = 'md',
  variant = 'dashboard',
  showPartial = true,
  className
}: ProgressDotsProps) {
  const sizeConfig = {
    sm: { diameter: 16, border: 3, gap: 8 },
    md: { diameter: 24, border: 4, gap: 12 },
    lg: { diameter: 32, border: 5, gap: 16 }
  };

  const config = sizeConfig[size];
  const circleStates = getCircleStates(completed, total);

  return (
    <div
      className={cn('flex items-center', className)}
      style={{ gap: `${config.gap}px` }}
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemax={total}
      aria-label={`Progress: ${completed} of ${total} completed`}
    >
      {circleStates.map((circle, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 transition-all duration-300"
          style={{
            width: `${config.diameter}px`,
            height: `${config.diameter}px`
          }}
        >
          {/* Background circle (outline) */}
          <div
            className="w-full h-full rounded-full"
            style={{
              borderWidth: circle.state === 'complete' ? '0px' : `${config.border}px`,
              borderColor: '#2E1E72',
              borderStyle: 'solid',
              backgroundColor: circle.state === 'complete' ? '#2E1E72' : 'transparent'
            }}
          />

          {/* Partial fill overlay - horizontal progress */}
          {circle.state === 'partial' && showPartial && (
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ borderRadius: '50%' }}
            >
              <div
                className="h-full bg-[#2E1E72] transition-all duration-300"
                style={{
                  width: `${circle.fillPercentage}%`,
                  borderRadius: '50%'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}