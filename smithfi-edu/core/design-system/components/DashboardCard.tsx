/**
 * Dashboard Card Component
 * Pixel-perfect implementation of module cards with exact design specifications
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { ProgressDots } from './ProgressDots';

export interface DashboardCardProps {
  moduleNumber?: string;
  title: string;
  description?: string;
  progress?: {
    completed: number;
    total: number;
  };
  isLocked?: boolean;
  isAvailable?: boolean;
  status?: 'beta' | 'coming-soon' | 'available';
  href?: string;
  onClick?: () => void;
  buttonText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DashboardCard({
  moduleNumber,
  title,
  description,
  progress,
  isLocked = false,
  isAvailable = true,
  status,
  href,
  onClick,
  buttonText,
  className,
  children
}: DashboardCardProps) {
  const cardContent = (
    <div
      className={cn(
        // Responsive card dimensions
        'relative flex flex-col bg-white rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer',
        'w-full max-w-xs lg:max-w-sm xl:max-w-md p-6',
        {
          'opacity-60': isLocked,
          'hover:shadow-lg': isAvailable && !isLocked
        },
        className
      )}
      onClick={onClick}
    >
      {/* Lock Icon for Unavailable Modules */}
      {isLocked && (
        <div className="absolute top-4 right-4">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Module Number Text */}
      {moduleNumber && (
        <div className="mb-3">
          <span
            className="text-left"
            style={{
              fontFamily: 'var(--font-red-hat)',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0px',
              color: '#8577B7'
            }}
          >
            {moduleNumber}
          </span>
        </div>
      )}

      {/* Module Title */}
      <div className="mb-4">
        <h3
          className="text-left line-clamp-1"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: '600',
            fontSize: '28px',
            lineHeight: '130%',
            letterSpacing: '0px',
            color: '#0F2D52'
          }}
        >
          {title}
        </h3>
      </div>

      {/* Description (if provided) */}
      {description && (
        <p className="text-sm text-gray-600 text-left mb-4 font-red-hat line-clamp-2">
          {description}
        </p>
      )}


      {/* Progress Circles - Enhanced ProgressDots component */}
      {progress && (
        <ProgressDots
          completed={progress.completed}
          total={progress.total}
          size="md"
          variant="dashboard"
          showPartial={true}
          className="mt-4 mb-2"
        />
      )}


      {/* Custom Children */}
      {children}
    </div>
  );

  // Wrap in link if href is provided
  if (href && isAvailable && !isLocked) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}