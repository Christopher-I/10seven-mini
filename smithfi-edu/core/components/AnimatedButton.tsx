/**
 * Enhanced Animated Button Component
 * Provides smooth micro-interactions and feedback
 */

'use client';

import { ReactNode, useState } from 'react';

interface AnimatedButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  showSuccessState?: boolean;
  successDuration?: number;
  allowMultipleClicks?: boolean;
}

export function AnimatedButton({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  showSuccessState = false,
  successDuration = 2000,
  allowMultipleClicks = false,
}: AnimatedButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  const handleInteraction = () => {
    if (disabled || loading || (!allowMultipleClicks && hasBeenTriggered)) return;

    if (!allowMultipleClicks) {
      setHasBeenTriggered(true);
      setTimeout(() => setHasBeenTriggered(false), 300);
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    if (showSuccessState) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), successDuration);
    }

    onClick();
  };

  const getVariantStyles = () => {
    if (isSuccess) {
      return 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700';
    }

    if (disabled) {
      return 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed';
    }

    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 hover:border-gray-400';
      case 'success':
        return 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:border-purple-700';
      case 'outline':
        return 'bg-transparent text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400';
      default: // primary
        return 'bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default: // md
        return 'px-6 py-3 text-base';
    }
  };

  const baseStyles =
    'font-semibold rounded-lg border transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-200 touch-manipulation relative z-20';
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const scaleStyle = isPressed ? 'scale-95' : 'hover:scale-105';

  return (
    <button
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      disabled={disabled || loading}
      style={{ touchAction: 'manipulation' }}
      className={` ${baseStyles} ${variantStyles} ${sizeStyles} ${scaleStyle} ${className} `}
    >
      <div className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : isSuccess ? (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Success!</span>
          </>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
