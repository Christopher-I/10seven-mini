/**
 * Demo Mode Indicator Component
 * Badge that appears in header during demo mode
 */

'use client';

import { useDemoMode } from '@/hooks/useDemoMode';

export function DemoModeIndicator() {
  const { isDemoMode, demoConfig } = useDemoMode();

  if (!isDemoMode || !demoConfig.navigation.showIndicator) return null;

  return (
    <div className="demo-mode-indicator">
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-red-hat"
        style={{
          backgroundColor: '#DBE250',
          color: '#0F2D52',
        }}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        {demoConfig.navigation.indicatorText}
      </span>
    </div>
  );
}
