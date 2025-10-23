/**
 * Checkbox Component
 * Custom checkbox for interactive activities with design system integration
 */

'use client';

import React from 'react';
import { ContentBox } from './ContentBox';
import { Stack } from './Layout';
import { Badge } from './Badge';
import { Text } from './Text';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;

  /** Callback when checkbox state changes */
  onChange: (checked: boolean) => void;

  /** Checkbox content/label */
  children: React.ReactNode;

  /** Semantic color scheme for checked state */
  semantic?: 'success' | 'info' | 'warning' | 'error';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  children,
  semantic = 'success',
  size = 'md',
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      className={`inline-flex items-center px-4 py-3 border rounded-lg cursor-pointer transition-all hover:scale-[1.01] ${
        checked
          ? `border-${semantic === 'success' ? 'green' : semantic === 'info' ? 'blue' : semantic === 'warning' ? 'yellow' : 'red'}-500 bg-${semantic === 'success' ? 'green' : semantic === 'info' ? 'blue' : semantic === 'warning' ? 'yellow' : 'red'}-50`
          : 'border-gray-300 hover:border-gray-400 bg-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
        checked
          ? `border-${semantic === 'success' ? 'green' : semantic === 'info' ? 'blue' : semantic === 'warning' ? 'yellow' : 'red'}-500 bg-${semantic === 'success' ? 'green' : semantic === 'info' ? 'blue' : semantic === 'warning' ? 'yellow' : 'red'}-500`
          : 'border-gray-300'
      }`}>
        {checked && <span className="text-white text-xs">✓</span>}
      </div>
      <Text
        variant={size === 'lg' ? 'body' : size === 'sm' ? 'small' : 'body'}
        weight={checked ? "semibold" : "normal"}
      >
        {children}
      </Text>
    </div>
  );
}

// Export type for better TypeScript support
export type CheckboxSemantic = CheckboxProps['semantic'];
export type CheckboxSize = CheckboxProps['size'];