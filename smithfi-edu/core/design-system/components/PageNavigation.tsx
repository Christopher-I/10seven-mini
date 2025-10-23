/**
 * PageNavigation Component
 * Reusable navigation buttons for educational pages
 * Mobile-first design with responsive behavior
 */

'use client';

import React, { useState } from 'react';

export interface PageNavigationProps {
  /** Handler for continue button click */
  onContinue?: (data?: any) => void;
  /** Handler for back button click */
  onBack?: (data?: any) => void;
  /** Custom text for continue button */
  continueText?: string;
  /** Custom text for back button */
  backText?: string;
  /** Whether to show the back button */
  showBack?: boolean;
  /** Whether to show the continue button */
  showContinue?: boolean;
  /** Whether buttons are disabled */
  disabled?: boolean;
  /** Custom data to pass with continue click */
  continueData?: any;
  /** Custom data to pass with back click */
  backData?: any;
  /** Additional CSS classes */
  className?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  onContinue,
  onBack,
  continueText = 'Continue',
  backText = 'Back',
  showBack = true,
  showContinue = true,
  disabled = false,
  continueData = { pageViewed: true },
  backData = { goBackOnePage: true },
  className = ''
}) => {
  const [continuePressed, setContinuePressed] = useState(false);
  const [backPressed, setBackPressed] = useState(false);

  const handleContinue = async () => {
    if (!disabled && onContinue) {
      setContinuePressed(true);

      // Visual feedback delay
      setTimeout(() => {
        setContinuePressed(false);
      }, 150);

      await onContinue(continueData);
    }
  };

  const handleBack = async () => {
    if (!disabled && onBack) {
      setBackPressed(true);

      // Visual feedback delay
      setTimeout(() => {
        setBackPressed(false);
      }, 150);

      await onBack(backData);
    }
  };

  // Don't render if no buttons should be shown
  if (!showBack && !showContinue) {
    return null;
  }

  return (
    <div className={`fixed bottom-6 left-2 right-2 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 mt-8 ${className}`}>
      {showContinue && (
        <button
          onClick={handleContinue}
          onTouchStart={() => !disabled && setContinuePressed(true)}
          onTouchEnd={() => setContinuePressed(false)}
          onTouchCancel={() => setContinuePressed(false)}
          disabled={disabled}
          className={`w-full py-4 px-8 rounded-full font-medium text-lg transition-all duration-200 cursor-pointer border-2 transform touch-manipulation select-none ${
            disabled
              ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
              : `bg-[#2E1E72] text-white hover:bg-[#3B2A8F] border-[#2E1E72] active:scale-95 md:hover:scale-105 ${
                  continuePressed ? 'scale-95 bg-[#1E1147]' : ''
                }`
          }`}
        >
          {continueText}
        </button>
      )}

      {showBack && (
        <button
          onClick={handleBack}
          onTouchStart={() => !disabled && setBackPressed(true)}
          onTouchEnd={() => setBackPressed(false)}
          onTouchCancel={() => setBackPressed(false)}
          disabled={disabled}
          className={`w-full py-4 px-8 rounded-full font-medium text-lg transition-all duration-200 cursor-pointer border-2 transform touch-manipulation select-none ${
            disabled
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : `border-gray-300 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 md:hover:scale-105 ${
                  backPressed ? 'scale-95 bg-gray-100' : ''
                }`
          }`}
        >
          {backText}
        </button>
      )}
    </div>
  );
};

export default PageNavigation;