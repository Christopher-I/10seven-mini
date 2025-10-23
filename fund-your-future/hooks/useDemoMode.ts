/**
 * React Hook for Demo Mode
 * Custom hook for using demo mode in components
 */

'use client';

import { useEffect, useState } from 'react';
import { isDemoMode, getDemoConfig } from '@/lib/demoMode';

export function useDemoMode() {
  const [isDemo, setIsDemo] = useState(false);
  const [config, setConfig] = useState(getDemoConfig());

  useEffect(() => {
    setIsDemo(isDemoMode());
    setConfig(getDemoConfig());
  }, []);

  return {
    isDemoMode: isDemo,
    demoConfig: config,
  };
}
