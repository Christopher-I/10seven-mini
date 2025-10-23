/**
 * Learning Objectives Component
 * Template pattern for checklist-style learning objectives (Design Pattern A)
 * Features:
 * - Interactive checklist with progress tracking
 * - Purple theme with checkmark animations
 * - Mobile-first responsive design
 * - Auto-completion tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../utils/classNames';

export interface LearningObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface LearningObjectivesProps {
  objectives: LearningObjective[];
  title?: string;
  subtitle?: string;
  onObjectiveToggle?: (objectiveId: string, completed: boolean) => void;
  onAllComplete?: () => void;
  autoAdvance?: boolean;
  className?: string;
}

export function LearningObjectives({
  objectives,
  title = "Learning Objectives",
  subtitle,
  onObjectiveToggle,
  onAllComplete,
  autoAdvance = true,
  className
}: LearningObjectivesProps) {
  const [localObjectives, setLocalObjectives] = useState(objectives);

  // Update local state when props change
  useEffect(() => {
    setLocalObjectives(objectives);
  }, [objectives]);

  // Check for completion
  useEffect(() => {
    const allCompleted = localObjectives.every(obj => obj.completed);
    if (allCompleted && localObjectives.length > 0 && autoAdvance) {
      onAllComplete?.();
    }
  }, [localObjectives, autoAdvance, onAllComplete]);

  const handleToggle = (objectiveId: string) => {
    const updated = localObjectives.map(obj =>
      obj.id === objectiveId
        ? { ...obj, completed: !obj.completed }
        : obj
    );

    setLocalObjectives(updated);

    const toggledObjective = updated.find(obj => obj.id === objectiveId);
    if (toggledObjective) {
      onObjectiveToggle?.(objectiveId, toggledObjective.completed);
    }
  };

  const completedCount = localObjectives.filter(obj => obj.completed).length;
  const progressPercentage = localObjectives.length > 0
    ? (completedCount / localObjectives.length) * 100
    : 0;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#2E1E72] font-red-hat">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span>{completedCount} of {localObjectives.length} completed</span>
          <div className="w-20 h-2 bg-[#E5DEEF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E1E72] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Objectives List */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {localObjectives.map((objective, index) => (
          <div
            key={objective.id}
            className={cn(
              "group flex items-start space-x-4 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer",
              objective.completed
                ? "bg-[#E5DEEF] border-[#2E1E72] shadow-sm"
                : "bg-white border-gray-200 hover:border-[#8577B7] hover:bg-gray-50"
            )}
            onClick={() => handleToggle(objective.id)}
          >
            {/* Checkbox */}
            <div className={cn(
              "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300",
              objective.completed
                ? "bg-[#2E1E72] border-[#2E1E72]"
                : "bg-white border-gray-300 group-hover:border-[#8577B7]"
            )}>
              {objective.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            {/* Objective Text */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-base leading-relaxed transition-all duration-300",
                objective.completed
                  ? "text-[#2E1E72] font-medium"
                  : "text-gray-700 group-hover:text-gray-900"
              )}>
                {objective.text}
              </p>
            </div>

            {/* Number indicator */}
            <div className={cn(
              "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
              objective.completed
                ? "bg-[#2E1E72] text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-[#8577B7] group-hover:text-white"
            )}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completedCount === localObjectives.length && localObjectives.length > 0 && (
        <div className="text-center p-6 bg-[#E5DEEF] rounded-lg border border-[#2E1E72]">
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-[#2E1E72] font-semibold text-lg">
            Great work! You've completed all learning objectives.
          </p>
        </div>
      )}
    </div>
  );
}