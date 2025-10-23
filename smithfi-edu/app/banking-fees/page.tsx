/**
 * Banking & Fees Module Overview - New Design
 * Pixel-perfect implementation of the redesigned module overview page
 */

'use client';

import { useState, useEffect } from 'react';
import { getModule } from '@/core/config/modules';
import { loadProgress, resetModuleProgress } from '@/core/services/storage';
import { getUnitUrl } from '@/core/utils/urls';
import { AppHeader } from '@/core/components/AppHeader';
import { ModuleUnitCard } from '@/core/design-system/components';
import type { UserProgress } from '@/core/types';

export default function BankingFeesModulePage() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const moduleData = getModule('banking-fees')!;

  useEffect(() => {
    document.title = 'Banking & Fees - Smith College | CONWAY';

    console.log('=== MODULE OVERVIEW LOADING ===');

    // Debug: Show all localStorage keys
    console.log('All localStorage keys:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        console.log(`- ${key}:`, localStorage.getItem(key));
      }
    }

    const progress = loadProgress();
    console.log('Loaded progress from storage:', progress);
    setUserProgress(progress);
    setIsLoading(false);
  }, []);

  const getUnitStatus = (unitId: string, index: number): 'completed' | 'current' | 'locked' => {
    // If userProgress is null or no module/unit data exists, check if it's the first unit
    if (!userProgress?.modules?.['banking-fees']?.units?.[unitId]) {
      return index === 0 ? 'current' : 'locked';
    }

    const unit = userProgress.modules['banking-fees'].units[unitId];

    // If unit is completed
    if (unit.completed) {
      return 'completed';
    }

    // If unit has progress or is unlocked, it's current
    if (unit.currentPage > 0 || index === 0) {
      return 'current';
    }

    // Check if previous units are completed
    for (let i = 0; i < index; i++) {
      const prevUnitId = moduleData.units[i].id;
      const prevUnit = userProgress?.modules?.['banking-fees']?.units?.[prevUnitId];
      if (!prevUnit?.completed) {
        return 'locked';
      }
    }

    return 'current';
  };

  const getUnitProgress = (unitId: string) => {
    // Get the correct totalPages from module configuration
    const moduleUnit = moduleData.units.find(u => u.id === unitId);
    const totalPages = moduleUnit?.totalPages || 0;

    // If userProgress is null or no module/unit data exists, return zero progress
    if (!userProgress?.modules?.['banking-fees']?.units?.[unitId]) {
      return { completed: 0, total: totalPages };
    }

    const unit = userProgress.modules['banking-fees'].units[unitId];
    return { completed: unit.currentPage, total: totalPages };
  };

  const handleResetModule = async () => {
    setIsResetting(true);
    try {
      const success = resetModuleProgress('banking-fees');
      if (success) {
        console.log('Reset successful, clearing state and reloading...');

        // First clear the state immediately
        setUserProgress(null);

        // Then reload fresh progress
        setTimeout(() => {
          const updatedProgress = loadProgress();
          console.log('Fresh progress after reset:', updatedProgress);
          setUserProgress(updatedProgress);
        }, 100);

        setShowResetDialog(false);

        // Show success message
        setTimeout(() => {
          alert('Module progress has been reset successfully!');
        }, 200);
      } else {
        alert('Failed to reset module progress. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting module:', error);
      alert('Failed to reset module progress. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  // Check if module has any progress to reset
  const hasProgress = userProgress?.modules['banking-fees'] &&
    Object.keys(userProgress.modules['banking-fees'].units).length > 0;

  // Reset Module Button Component
  const ResetModuleButton = () => (
    <button
      onClick={() => setShowResetDialog(true)}
      disabled={!hasProgress}
      className="w-[200px] h-12 bg-white border-2 rounded-lg font-red-hat font-medium text-sm transition-all duration-150 flex items-center justify-center gap-2"
      style={{
        borderColor: hasProgress ? '#2E1E72' : '#D1D5DB',
        color: hasProgress ? '#2E1E72' : '#9CA3AF',
        backgroundColor: hasProgress ? '#FFFFFF' : '#F9FAFB',
        cursor: hasProgress ? 'pointer' : 'not-allowed'
      }}
      onMouseEnter={(e) => {
        if (hasProgress) {
          const target = e.target as HTMLElement;
          target.style.backgroundColor = '#F8F9FF';
          target.style.borderColor = '#3B2A8F';
          target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hasProgress) {
          const target = e.target as HTMLElement;
          target.style.backgroundColor = '#FFFFFF';
          target.style.borderColor = '#2E1E72';
          target.style.transform = 'translateY(0px)';
        }
      }}
      onMouseDown={(e) => {
        if (hasProgress) {
          const target = e.target as HTMLElement;
          target.style.transform = 'translateY(0px) scale(0.98)';
          target.style.backgroundColor = '#F0F1FF';
        }
      }}
      onMouseUp={(e) => {
        if (hasProgress) {
          const target = e.target as HTMLElement;
          target.style.transform = 'translateY(-1px) scale(1)';
        }
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {hasProgress ? 'Reset Module' : 'No Progress to Reset'}
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading module...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E5DEEF' }}>
      {/* Updated Header with new module-overview variant */}
      <AppHeader
        variant="module-overview"
        moduleNumber="Module 2"
        moduleName="It's A Big Bank World"
      />

      {/* Main Content */}
      <main className="mx-auto max-w-[1200px] px-6 md:px-6 py-12 md:py-16">
        {/* Unit Cards Grid */}
        <div
          className="grid justify-center max-w-4xl mx-auto"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 325.33px))',
            gap: '24px'
          }}
        >
          {moduleData.units.slice(0, 4).map((unit, index) => (
            <ModuleUnitCard
              key={unit.id}
              unitNumber={index + 1}
              title={unit.title}
              status={getUnitStatus(unit.id, index)}
              progress={getUnitProgress(unit.id)}
              href={getUnitUrl('banking-fees', unit.id)}
            />
          ))}
        </div>

        {/* Reset Module Section */}
        <div className="mt-16 flex justify-center">
          <ResetModuleButton />
        </div>
      </main>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-0 sm:p-4 text-center sm:items-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowResetDialog(false)}></div>

            <div className="relative transform overflow-hidden rounded-t-2xl sm:rounded-lg bg-[#E5DEEF] text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg border border-[#2E1E72]">
              <div className="bg-[#E5DEEF] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#8577B7] bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-[#2E1E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-bold leading-6 text-[#2E1E72]">
                      Reset Module Progress
                    </h3>
                    <div className="mt-3">
                      <p className="text-sm text-gray-900">
                        Are you sure you want to reset all progress for this module? This action cannot be undone.
                        You will lose all completed activities, survey responses, and game results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#E5DEEF] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                <button
                  type="button"
                  disabled={isResetting}
                  onClick={handleResetModule}
                  className="inline-flex w-full justify-center rounded-lg bg-[#2E1E72] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3B2A8F] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto transition-colors"
                >
                  {isResetting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    'Yes, Reset Module'
                  )}
                </button>
                <button
                  type="button"
                  disabled={isResetting}
                  onClick={() => setShowResetDialog(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-lg bg-transparent px-4 py-2.5 text-sm font-semibold text-[#2E1E72] shadow-sm border border-[#2E1E72] hover:bg-[#8577B7] hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:w-auto transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
