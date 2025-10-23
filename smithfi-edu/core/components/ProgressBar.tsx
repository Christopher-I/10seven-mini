/**
 * Progress Bar Component
 * Shows progress through a unit or module
 */

'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  current,
  total,
  label,
  showPercentage = true,
  height = 'md',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  const getHeight = () => {
    switch (height) {
      case 'sm':
        return 'h-2';
      case 'lg':
        return 'h-6';
      default:
        return 'h-4';
    }
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && <span className="text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="font-medium text-gray-900">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`relative overflow-hidden rounded-full bg-gray-200 ${getHeight()}`}
      >
        <div
          className={`absolute top-0 left-0 ${getHeight()} bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={label || `Progress: ${current} of ${total}`}
        >
          {height === 'lg' && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
