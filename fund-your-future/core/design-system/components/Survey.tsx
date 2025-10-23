/**
 * Survey Component
 * Mobile-first survey interface based on design mockups
 * Features:
 * - Single question per screen
 * - Touch-friendly input controls
 * - Purple theme with clean typography
 * - Support for text input, multiple choice, and range inputs
 * - Progress tracking and validation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../utils/classNames';

export interface SurveyOption {
  id: string;
  label: string;
  value: string;
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'number' | 'multiple-choice' | 'single-choice' | 'range' | 'yes-no';
  question: string;
  subtitle?: string;
  placeholder?: string;
  options?: SurveyOption[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export interface SurveyResponse {
  questionId: string;
  value: string | number;
  timestamp: Date;
}

export interface SurveyProps {
  questions: SurveyQuestion[];
  currentQuestionIndex: number;
  responses: Record<string, any>;
  onResponse: (questionId: string, value: any) => void;
  onNext: () => void;
  onPrevious?: () => void;
  onComplete?: (responses: SurveyResponse[]) => void;
  showProgress?: boolean;
  className?: string;
}

export function Survey({
  questions,
  currentQuestionIndex,
  responses,
  onResponse,
  onNext,
  onPrevious,
  onComplete,
  showProgress = true,
  className
}: SurveyProps) {
  const [currentValue, setCurrentValue] = useState<any>('');
  const [validationError, setValidationError] = useState<string>('');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Load existing response for current question
  useEffect(() => {
    if (currentQuestion) {
      const existingResponse = responses[currentQuestion.id];
      setCurrentValue(existingResponse || '');
      setValidationError('');
    }
  }, [currentQuestion, responses]);

  const validateInput = (value: any): boolean => {
    if (currentQuestion.required && (!value || value === '')) {
      setValidationError('This field is required');
      return false;
    }

    if (currentQuestion.validation?.pattern && value) {
      const regex = new RegExp(currentQuestion.validation.pattern);
      if (!regex.test(value)) {
        setValidationError(currentQuestion.validation.message || 'Invalid input');
        return false;
      }
    }

    if (currentQuestion.type === 'number') {
      const numValue = Number(value);
      if (currentQuestion.min !== undefined && numValue < currentQuestion.min) {
        setValidationError(`Value must be at least ${currentQuestion.min}`);
        return false;
      }
      if (currentQuestion.max !== undefined && numValue > currentQuestion.max) {
        setValidationError(`Value must be no more than ${currentQuestion.max}`);
        return false;
      }
    }

    setValidationError('');
    return true;
  };

  const handleNext = () => {
    if (validateInput(currentValue)) {
      onResponse(currentQuestion.id, currentValue);

      if (isLastQuestion) {
        // Collect all responses
        const allResponses: SurveyResponse[] = questions.map(q => ({
          questionId: q.id,
          value: q.id === currentQuestion.id ? currentValue : responses[q.id],
          timestamp: new Date()
        }));
        onComplete?.(allResponses);
      } else {
        onNext();
      }
    }
  };

  const handleInputChange = (value: any) => {
    setCurrentValue(value);
    setValidationError('');
  };

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className={cn(
              "w-full p-4 text-lg border-2 rounded-lg transition-colors",
              "focus:outline-none focus:ring-0 font-red-hat",
              validationError
                ? "border-red-400 bg-red-50"
                : "border-gray-300 focus:border-[#2E1E72] bg-white"
            )}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            min={currentQuestion.min}
            max={currentQuestion.max}
            step={currentQuestion.step}
            className={cn(
              "w-full p-4 text-lg border-2 rounded-lg transition-colors",
              "focus:outline-none focus:ring-0 font-red-hat",
              validationError
                ? "border-red-400 bg-red-50"
                : "border-gray-300 focus:border-[#2E1E72] bg-white"
            )}
          />
        );

      case 'range':
        return (
          <div className="space-y-4">
            <input
              type="range"
              value={currentValue}
              onChange={(e) => handleInputChange(e.target.value)}
              min={currentQuestion.min || 0}
              max={currentQuestion.max || 100}
              step={currentQuestion.step || 1}
              className="w-full h-3 bg-[#E5DEEF] rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentQuestion.min || 0}</span>
              <span className="font-semibold text-[#2E1E72]">{currentValue}</span>
              <span>{currentQuestion.max || 100}</span>
            </div>
          </div>
        );

      case 'single-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleInputChange(option.value)}
                className={cn(
                  "w-full p-4 text-left border-2 rounded-lg transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2",
                  currentValue === option.value
                    ? "border-[#2E1E72] bg-[#E5DEEF] text-[#2E1E72] font-semibold"
                    : "border-gray-300 bg-white hover:border-[#8577B7] hover:bg-gray-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{option.label}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    currentValue === option.value
                      ? "border-[#2E1E72] bg-[#2E1E72]"
                      : "border-gray-300"
                  )}>
                    {currentValue === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'multiple-choice':
        const selectedValues = Array.isArray(currentValue) ? currentValue : [];
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    const newValues = isSelected
                      ? selectedValues.filter(v => v !== option.value)
                      : [...selectedValues, option.value];
                    handleInputChange(newValues);
                  }}
                  className={cn(
                    "w-full p-4 text-left border-2 rounded-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2",
                    isSelected
                      ? "border-[#2E1E72] bg-[#E5DEEF] text-[#2E1E72] font-semibold"
                      : "border-gray-300 bg-white hover:border-[#8577B7] hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{option.label}</span>
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center",
                      isSelected
                        ? "border-[#2E1E72] bg-[#2E1E72]"
                        : "border-gray-300"
                    )}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'yes-no':
        return (
          <div className="grid grid-cols-2 gap-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange(option.toLowerCase())}
                className={cn(
                  "p-6 text-lg font-semibold border-2 rounded-lg transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2",
                  currentValue === option.toLowerCase()
                    ? "border-[#2E1E72] bg-[#E5DEEF] text-[#2E1E72]"
                    : "border-gray-300 bg-white hover:border-[#8577B7] hover:bg-gray-50"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className={cn("space-y-8 max-w-lg mx-auto", className)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-[#E5DEEF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E1E72] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Question */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#2E1E72] font-red-hat leading-tight">
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtitle && (
          <p className="text-gray-600 text-base leading-relaxed">
            {currentQuestion.subtitle}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="space-y-4">
        {renderInput()}

        {/* Validation Error */}
        {validationError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{validationError}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <button
          onClick={onPrevious}
          disabled={!onPrevious || currentQuestionIndex === 0}
          className={cn(
            "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors",
            onPrevious && currentQuestionIndex > 0
              ? "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              : "text-gray-400 cursor-not-allowed"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-8 py-3 bg-[#2E1E72] text-white rounded-lg font-semibold hover:bg-[#8577B7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2"
        >
          <span>{isLastQuestion ? 'Complete' : 'Next'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2E1E72;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2E1E72;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}