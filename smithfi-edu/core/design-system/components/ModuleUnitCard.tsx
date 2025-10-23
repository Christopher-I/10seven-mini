/**
 * Module Unit Card Component
 * Pixel-perfect implementation for module overview grid layout
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';
import { ProgressDots } from './ProgressDots';

export interface ModuleUnitCardProps {
  unitNumber: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
  progress?: {
    completed: number;
    total: number;
  };
  href?: string;
  onClick?: () => void;
  className?: string;
}

// Status Icon Components
const CheckmarkIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

export function ModuleUnitCard({
  unitNumber,
  title,
  status,
  progress,
  href,
  onClick,
  className
}: ModuleUnitCardProps) {
  const isInteractive = status !== 'locked';

  const statusConfig = {
    completed: {
      bgColor: '#22C55E',
      icon: CheckmarkIcon,
      label: 'Completed'
    },
    current: {
      bgColor: '#2E1E72',
      icon: ArrowRightIcon,
      label: 'Available'
    },
    locked: {
      bgColor: '#9CA3AF',
      icon: LockIcon,
      label: 'Locked'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const cardContent = (
    <div
      className={cn(
        'relative flex flex-col bg-white rounded-2xl transition-all duration-200',
        {
          'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 active:scale-98 active:shadow-sm': isInteractive,
          'cursor-not-allowed opacity-60 bg-gray-50': status === 'locked'
        },
        className
      )}
      style={{
        cursor: isInteractive ? 'pointer' : 'not-allowed',
        width: '100%',
        maxWidth: '325.33px',
        height: '204px',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid transparent',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
      }}
      onClick={isInteractive ? onClick : undefined}
    >
      {/* Unit Number */}
      <div className="mb-2">
        <span
          className="font-red-hat font-semibold text-sm leading-[21px]"
          style={{
            color: '#8577B7',
            letterSpacing: '0px',
            fontSize: '14px'
          }}
        >
          Unit {unitNumber}
        </span>
      </div>

      {/* Unit Title */}
      <div className="flex-1 mb-4" style={{ maxWidth: '260px' }}>
        <h3
          className="font-playfair font-semibold leading-[130%] text-left"
          style={{
            color: '#0F2D52',
            fontSize: '20px',
            letterSpacing: '0px',
            lineHeight: '26px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {title}
        </h3>
      </div>

      {/* Progress Circles */}
      {progress && (
        <div className="mb-2">
          <ProgressDots
            completed={progress.completed}
            total={progress.total}
            size="sm"
            variant="overview"
            showPartial={true}
          />
        </div>
      )}

      {/* Status Icon */}
      <div className="absolute bottom-6 right-6">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform duration-150"
          style={{
            backgroundColor: config.bgColor,
            transform: isInteractive && status === 'current' ? 'scale(1)' : 'scale(1)'
          }}
        >
          <StatusIcon />
        </div>
      </div>
    </div>
  );

  // Wrap in link if href is provided and unit is interactive
  if (href && isInteractive) {
    return (
      <a href={href} className="block" aria-label={`${config.label}: Unit ${unitNumber} - ${title}`}>
        {cardContent}
      </a>
    );
  }

  return (
    <div aria-label={`${config.label}: Unit ${unitNumber} - ${title}`}>
      {cardContent}
    </div>
  );
}