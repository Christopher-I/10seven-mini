/**
 * Demo Card Component
 * The single card shown on dashboard in demo mode
 */

'use client';

import { getDemoConfig } from '@/lib/demoMode';
import { DashboardCard } from '@/core/design-system';

export function DemoCard() {
  const config = getDemoConfig();
  const { card } = config;

  return (
    <DashboardCard
      moduleNumber={card.moduleNumber}
      title={card.title}
      description={card.description}
      href={card.route}
      isAvailable={true}
      isLocked={false}
      buttonText="Start Demo"
    />
  );
}
