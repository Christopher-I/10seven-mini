/**
 * RadioGroup Component
 * Custom radio group for single-selection activities with design system integration
 */

'use client';

import React from 'react';
import { ContentBox } from './ContentBox';
import { Stack } from './Layout';
import { Badge } from './Badge';
import { Text } from './Text';

export interface RadioOption {
  /** Unique value for this option */
  value: string;

  /** Display label for this option */
  label: string;

  /** Optional description/subtitle */
  description?: string;
}

export interface RadioGroupProps {
  /** Array of radio options */
  options: RadioOption[];

  /** Currently selected value */
  value: string;

  /** Callback when selection changes */
  onChange: (value: string) => void;

  /** Semantic color scheme for selected state */
  semantic?: 'info' | 'success' | 'warning' | 'error';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  semantic = 'info',
  size = 'md',
  disabled = false,
  className,
  ...props
}: RadioGroupProps) {
  const handleOptionClick = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  return (
    <Stack spacing={size === 'lg' ? 'md' : 'sm'} className={className} {...props}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <div
            key={option.value}
            className={`inline-flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all hover:scale-[1.01] ${
              isSelected
                ? `border-${semantic === 'info' ? 'blue' : semantic === 'success' ? 'green' : semantic === 'warning' ? 'yellow' : 'red'}-500 bg-${semantic === 'info' ? 'blue' : semantic === 'success' ? 'green' : semantic === 'warning' ? 'yellow' : 'red'}-50`
                : 'border-gray-300 hover:border-gray-400 bg-white'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleOptionClick(option.value)}
          >
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              isSelected
                ? `border-${semantic === 'info' ? 'blue' : semantic === 'success' ? 'green' : semantic === 'warning' ? 'yellow' : 'red'}-500 bg-${semantic === 'info' ? 'blue' : semantic === 'success' ? 'green' : semantic === 'warning' ? 'yellow' : 'red'}-500`
                : 'border-gray-300'
            }`}>
              {isSelected && <span className="text-white text-xs">●</span>}
            </div>
            <Stack spacing="xs" className="flex-1">
              <Text
                variant={size === 'lg' ? 'body' : size === 'sm' ? 'small' : 'body'}
                weight={isSelected ? "semibold" : "medium"}
              >
                {option.label}
              </Text>
              {option.description && (
                <Text
                  semantic="muted"
                  variant={size === 'lg' ? 'small' : 'small'}
                >
                  {option.description}
                </Text>
              )}
            </Stack>
          </div>
        );
      })}
    </Stack>
  );
}

// Export types for better TypeScript support
export type RadioGroupSemantic = RadioGroupProps['semantic'];
export type RadioGroupSize = RadioGroupProps['size'];