/**
 * Homepage Dashboard
 * Overview of all modules and user progress
 */

'use client';

import { useState, useEffect } from 'react';
import { MODULES } from '@/core/config/modules';
import { loadProgress } from '@/core/services/storage';
import { AppHeader } from '@/core/components/AppHeader';
import { FloatingQuestionButton } from '@/core/components/FloatingQuestionButton';
import { AnnouncementBar } from '@/core/components/AnnouncementBar';
import { DashboardCard, TrackSection } from '@/core/design-system';
import { useAuth } from '@/contexts/AuthContext';
import type { UserProgress } from '@/core/types';

export default function HomePage() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    const progress = loadProgress();
    setUserProgress(progress);
    setIsLoading(false);
  }, []);

  const getModuleProgress = (moduleId: string) => {
    const moduleData = MODULES.find((m) => m.id === moduleId);
    const totalUnits = moduleData?.units.length || 0;

    if (!userProgress?.modules[moduleId]) {
      return {
        completed: 0,
        total: totalUnits,
        percentage: 0,
        hasStarted: false,
        lastUnit: null,
      };
    }

    if (!moduleData)
      return {
        completed: 0,
        total: 0,
        percentage: 0,
        hasStarted: false,
        lastUnit: null,
      };

    const units = moduleData.units;
    const userUnits = Object.values(userProgress.modules[moduleId].units);
    const completed = userUnits.filter((unit) => unit.completed).length;
    const total = units.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    const hasStarted = userUnits.length > 0;

    // Find the last active unit (most recent lastUpdated)
    const lastUnit =
      userUnits.length > 0
        ? userUnits.reduce((latest, current) =>
            current.lastUpdated > latest.lastUpdated ? current : latest
          )
        : null;

    return { completed, total, percentage, hasStarted, lastUnit };
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <AppHeader variant="dashboard" />

      <main className="mx-auto w-[90%] max-w-none px-4 py-6">
        {/* Announcement Bar */}
        <div className="mb-6">
          <AnnouncementBar />
        </div>



        {/* Track 1 Section */}
        <TrackSection trackNumber={1} title="Track 1: Financial Foundations">
          {MODULES.map((module, index) => {
            const progress = getModuleProgress(module.id);
            const isAvailable = module.status === 'available' || module.status === 'beta';
            const isLocked = module.status === 'coming-soon';

            return (
              <DashboardCard
                key={module.id}
                moduleNumber={`Module ${index + 1}`}
                title={module.title}
                description={module.description}
                progress={{
                  completed: progress.completed,
                  total: progress.total
                }}
                isLocked={isLocked}
                isAvailable={isAvailable}
                status={module.status}
                href={isAvailable ? `/${module.id}` : undefined}
                buttonText={progress.hasStarted ? 'Continue' : 'Start'}
              />
            );
          })}
        </TrackSection>
      </main>

      {/* Floating Question Button */}
      <FloatingQuestionButton />
    </div>
  );
}

