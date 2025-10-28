/**
 * Demo Card Component
 * The single card shown on dashboard in demo mode
 */

'use client';

import { useEffect, useState } from 'react';
import { getDemoConfig } from '@/lib/demoMode';
import { DashboardCard } from '@/core/design-system';

export function DemoCard() {
  const config = getDemoConfig();
  const { card } = config;
  const [demoProgress, setDemoProgress] = useState(0);

  useEffect(() => {
    // Load demo progress from localStorage
    const progress = localStorage.getItem('demo-progress');
    if (progress) {
      setDemoProgress(parseInt(progress, 10));
    }
  }, []);

  return (
    <DashboardCard
      moduleNumber={card.moduleNumber}
      title={card.title}
      description={card.description}
      progress={{
        completed: demoProgress,
        total: 3
      }}
      href={card.route}
      isAvailable={true}
      isLocked={false}
      buttonText={demoProgress === 0 ? "Start Demo" : "Continue Demo"}
    />
  );
}
