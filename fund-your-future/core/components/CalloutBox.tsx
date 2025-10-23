/**
 * Enhanced Callout Box Component
 * For highlighting key information, statistics, and important concepts
 */

'use client';

import { ReactNode } from 'react';

interface CalloutBoxProps {
  type?:
    | 'info'
    | 'warning'
    | 'success'
    | 'highlight'
    | 'statistic'
    | 'definition';
  title?: string;
  children: ReactNode;
  icon?: string;
  className?: string;
}

export function CalloutBox({
  type = 'info',
  title,
  children,
  icon,
  className = '',
}: CalloutBoxProps) {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return {
          container: 'bg-red-50 border border-red-200 text-red-900',
          title: 'text-red-900 font-semibold',
          icon: '⚠️',
        };
      case 'success':
        return {
          container: 'bg-purple-50 border border-purple-200 text-purple-900',
          title: 'text-purple-900 font-semibold',
          icon: '✅',
        };
      case 'highlight':
        return {
          container: 'bg-gray-100 border border-gray-300 text-gray-900',
          title: 'text-gray-900 font-semibold',
          icon: '💡',
        };
      case 'statistic':
        return {
          container:
            'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 text-gray-900',
          title: 'text-gray-900 font-bold text-lg',
          icon: '📊',
        };
      case 'definition':
        return {
          container:
            'bg-white border-l-4 border-gray-800 shadow-sm text-gray-900',
          title: 'text-gray-900 font-semibold',
          icon: '📖',
        };
      default: // info
        return {
          container: 'bg-gray-50 border border-gray-300 text-gray-900',
          title: 'text-gray-900 font-semibold',
          icon: 'ℹ️',
        };
    }
  };

  const styles = getStyles();
  const displayIcon = icon || styles.icon;

  return (
    <div className={`rounded-lg p-6 ${styles.container} ${className}`}>
      {title && (
        <div className="mb-3 flex items-center gap-2">
          {displayIcon && <span className="text-lg">{displayIcon}</span>}
          <h4 className={styles.title}>{title}</h4>
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
