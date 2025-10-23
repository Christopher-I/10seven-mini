/**
 * Fee Modal Component
 * Mobile-first modal for displaying banking fee information
 * Features:
 * - Full-screen mobile modal
 * - Purple theme with clean typography
 * - Swipe-to-dismiss functionality
 * - Keyboard navigation support
 */

'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../utils/classNames';

export interface FeeInfo {
  id: string;
  name: string;
  amount: string;
  description: string;
  frequency?: string;
  category?: 'account' | 'transaction' | 'overdraft' | 'service';
  isAvoidable?: boolean;
  tips?: string[];
}

export interface FeeModalProps {
  fee: FeeInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export function FeeModal({
  fee,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  className
}: FeeModalProps) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Touch handlers for swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const current = e.touches[0].clientY;
    setCurrentY(current - startY);
  };

  const handleTouchEnd = () => {
    if (currentY > 100) { // Swipe down threshold
      onClose();
    }
    setIsDragging(false);
    setCurrentY(0);
    setStartY(0);
  };

  if (!isOpen || !fee) return null;

  const categoryColors = {
    account: 'bg-blue-50 text-blue-700 border-blue-200',
    transaction: 'bg-green-50 text-green-700 border-green-200',
    overdraft: 'bg-red-50 text-red-700 border-red-200',
    service: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const categoryColor = categoryColors[fee.category || 'service'];

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center sm:justify-center",
      className
    )}>
      {/* Modal Content */}
      <div
        className={cn(
          "bg-white w-full sm:w-[90%] sm:max-w-lg sm:rounded-lg shadow-xl",
          "max-h-[90vh] flex flex-col",
          "transform transition-transform duration-300",
          isDragging && currentY > 0 && "transition-none"
        )}
        style={{
          transform: isDragging ? `translateY(${Math.max(0, currentY)}px)` : 'translateY(0)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-[#2E1E72] font-red-hat">
              Fee Details
            </h2>
            {fee.category && (
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full border",
                categoryColor
              )}>
                {fee.category}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Swipe indicator for mobile */}
        <div className="sm:hidden flex justify-center py-2">
          <div className="w-8 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Fee Name and Amount */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#2E1E72] font-red-hat">
              {fee.name}
            </h3>
            <div className="text-3xl font-bold text-[#2E1E72]">
              {fee.amount}
            </div>
            {fee.frequency && (
              <p className="text-gray-600 text-sm">
                {fee.frequency}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">What is this fee?</h4>
            <p className="text-gray-700 leading-relaxed">
              {fee.description}
            </p>
          </div>

          {/* Avoidability */}
          {fee.isAvoidable !== undefined && (
            <div className={cn(
              "p-4 rounded-lg border-l-4",
              fee.isAvoidable
                ? "bg-green-50 border-green-400"
                : "bg-yellow-50 border-yellow-400"
            )}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-lg">
                  {fee.isAvoidable ? '✅' : '⚠️'}
                </div>
                <h4 className="font-semibold text-gray-900">
                  {fee.isAvoidable ? 'Avoidable Fee' : 'Difficult to Avoid'}
                </h4>
              </div>
              <p className="text-sm text-gray-700">
                {fee.isAvoidable
                  ? 'This fee can typically be avoided with proper planning.'
                  : 'This fee is harder to avoid but understanding it can help you budget better.'
                }
              </p>
            </div>
          )}

          {/* Tips */}
          {fee.tips && fee.tips.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">💡 Tips to Avoid This Fee</h4>
              <ul className="space-y-2">
                {fee.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {(onNext || onPrevious) && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors",
                onPrevious
                  ? "text-[#2E1E72] hover:bg-[#E5DEEF]"
                  : "text-gray-400 cursor-not-allowed"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>

            <button
              onClick={onNext}
              disabled={!onNext}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors",
                onNext
                  ? "text-[#2E1E72] hover:bg-[#E5DEEF]"
                  : "text-gray-400 cursor-not-allowed"
              )}
            >
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}