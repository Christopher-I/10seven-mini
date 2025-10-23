/**
 * Progress Break Component
 * Encouraging break screen between learning sections
 * Features:
 * - Purple-themed motivational design
 * - Mobile-first responsive layout
 * - Optional timer functionality
 * - Customizable messaging and actions
 * - Progress celebration elements
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../utils/classNames';

export interface ProgressBreakProps {
  title?: string;
  message?: string;
  progressCompleted?: number; // Percentage 0-100
  totalSteps?: number;
  currentStep?: number;
  encouragementText?: string;
  onContinue?: () => void;
  onTakeBreak?: () => void;
  showTimer?: boolean;
  timerMinutes?: number;
  achievements?: string[];
  nextSectionTitle?: string;
  className?: string;
}

export function ProgressBreak({
  title = "Great Progress! 🎉",
  message = "You're doing amazing! Take a moment to celebrate your learning.",
  progressCompleted = 50,
  totalSteps,
  currentStep,
  encouragementText,
  onContinue,
  onTakeBreak,
  showTimer = false,
  timerMinutes = 5,
  achievements = [],
  nextSectionTitle,
  className
}: ProgressBreakProps) {
  const [timeRemaining, setTimeRemaining] = useState(timerMinutes * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

  // Celebration animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsTimerActive(true);
    onTakeBreak?.();
  };

  const handleStopTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(timerMinutes * 60);
  };

  const getEncouragementMessage = () => {
    if (encouragementText) return encouragementText;

    if (progressCompleted < 25) {
      return "Every expert was once a beginner. Keep going! 🌱";
    } else if (progressCompleted < 50) {
      return "You're building momentum! Great work so far! 🚀";
    } else if (progressCompleted < 75) {
      return "More than halfway there! You're crushing it! 💪";
    } else {
      return "Almost there! You're doing incredible work! ⭐";
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-[#E5DEEF] to-white flex items-center justify-center p-4",
      className
    )}>
      <div className="max-w-md w-full space-y-8">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="text-center">
            <div className="text-6xl animate-bounce mb-4">
              🎉
            </div>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-[#2E1E72] rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#E5DEEF] space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-[#2E1E72] font-red-hat">
              {title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {message}
            </p>
          </div>

          {/* Progress Visualization */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Learning Progress</span>
                <span>{progressCompleted}% Complete</span>
              </div>
              <div className="w-full h-3 bg-[#E5DEEF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2E1E72] to-[#8577B7] transition-all duration-1000 ease-out"
                  style={{ width: `${progressCompleted}%` }}
                />
              </div>
            </div>

            {/* Step Counter */}
            {totalSteps && currentStep && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>Step {currentStep} of {totalSteps}</span>
                <div className="flex space-x-1">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        i < currentStep ? "bg-[#2E1E72]" : "bg-[#E5DEEF]"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Encouragement */}
          <div className="bg-[#E5DEEF] p-4 rounded-lg border border-[#2E1E72]">
            <p className="text-[#2E1E72] font-medium text-center">
              {getEncouragementMessage()}
            </p>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-center">
                🏆 What You've Accomplished
              </h3>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timer Section */}
          {showTimer && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Take a Break</h3>
                <div className="text-4xl font-bold text-[#2E1E72] font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <div className="flex space-x-3">
                {!isTimerActive ? (
                  <button
                    onClick={handleStartTimer}
                    className="flex-1 bg-[#8577B7] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#2E1E72] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2"
                  >
                    Start {timerMinutes} Min Break
                  </button>
                ) : (
                  <button
                    onClick={handleStopTimer}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Stop Timer
                  </button>
                )}
              </div>

              {timeRemaining === 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-700 font-medium">
                    ⏰ Break time is up! Ready to continue?
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {nextSectionTitle && (
              <div className="text-center text-sm text-gray-600 mb-3">
                <span>Up next: </span>
                <span className="font-semibold text-[#2E1E72]">{nextSectionTitle}</span>
              </div>
            )}

            <button
              onClick={onContinue}
              className="w-full bg-[#2E1E72] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-[#8577B7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2"
            >
              Continue Learning
            </button>

            {onTakeBreak && !showTimer && (
              <button
                onClick={onTakeBreak}
                className="w-full bg-white text-[#2E1E72] py-3 px-6 border-2 border-[#2E1E72] rounded-lg font-semibold hover:bg-[#E5DEEF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2"
              >
                I'll Take a Break First
              </button>
            )}
          </div>
        </div>

        {/* Bottom encouragement */}
        <div className="text-center text-sm text-gray-600">
          Remember: Learning is a journey, not a race. 🌟
        </div>
      </div>
    </div>
  );
}