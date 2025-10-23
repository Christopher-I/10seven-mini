/**
 * Unit 1 Container - Banking Basics
 * Manages the flow and state for the entire unit with enhanced progress tracking
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/core/components/Navigation';
import { SectionProgress } from '@/core/components/SectionProgress';
import { AppHeader } from '@/core/components/AppHeader';
import { loadProgress, updateUnitProgress } from '@/core/services/storage';
import { trackPageView } from '@/core/services/analytics';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { UNIT_1_PAGES } from './content/pages';
import type { Progress } from '@/core/types';

const MODULE_ID = 'banking-fees';
const UNIT_ID = 'unit-1-basics';
const TOTAL_PAGES = 8;

export default function Unit1Container() {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced progress tracking
  const { trackPageView: trackPageViewNew } = useProgressTracking({
    moduleId: MODULE_ID,
    moduleTitle: 'Banking & Fees',
    unitId: UNIT_ID,
    unitTitle: 'Banking Basics',
    totalPages: TOTAL_PAGES,
    autoInitialize: true
  });

  // Load progress on mount
  useEffect(() => {
    const userProgress = loadProgress();
    const unitProgress = userProgress?.modules[MODULE_ID]?.units[UNIT_ID];

    if (unitProgress) {
      setCurrentPage(unitProgress.currentPage);
      // Load any saved step data
      const savedStepData = localStorage.getItem(`unit-${UNIT_ID}-step-data`);
      if (savedStepData) {
        setStepData(JSON.parse(savedStepData));
      }
    } else {
      // Initialize new progress
      const newProgress: Progress = {
        moduleId: MODULE_ID,
        unitId: UNIT_ID,
        currentPage: 1,
        totalPages: TOTAL_PAGES,
        completedActivities: [],
        startedAt: new Date(),
        lastUpdated: new Date(),
        completed: false,
      };
      updateUnitProgress(MODULE_ID, UNIT_ID, newProgress);
    }

    setIsLoading(false);

    // Track page view with both systems
    trackPageView(MODULE_ID, UNIT_ID, 1);
    trackPageViewNew(1);
  }, [trackPageViewNew]);

  // Handle page navigation
  const handlePageChange = async (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;

    setCurrentPage(page);

    // Calculate progress and check for completion
    const progress = Math.round((page / TOTAL_PAGES) * 100);
    updateUnitProgress(MODULE_ID, UNIT_ID, {
      currentPage: page,
      completed: progress >= 100
    });

    // Track with both old and new systems during transition
    trackPageView(MODULE_ID, UNIT_ID, page);
    await trackPageViewNew(page);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle step completion from interactive elements
  const handleStepComplete = (data: any) => {
    // Handle reset request
    if (data.reset) {
      // Clear step data and reset to flashcard page
      const resetStepData = {};
      setStepData(resetStepData);
      localStorage.removeItem(`unit-${UNIT_ID}-step-data`);
      localStorage.removeItem('unit-1-flashcards-progress');
      // Don't advance page, stay on current page but with reset state
      return;
    }

    const updatedStepData = { ...stepData, ...data };
    setStepData(updatedStepData);

    // Save step data to localStorage
    localStorage.setItem(`unit-${UNIT_ID}-step-data`, JSON.stringify(updatedStepData));

    // Auto-advance to next page after completion
    if (currentPage < TOTAL_PAGES) {
      // Special handling for different page types
      if (data.flashcardsCompleted && currentPage === 5) {
        // Don't auto-advance - let user give feedback and manually continue
        // The completion page will show feedback survey and continue options
        return;
      } else if (data.continueToQuiz && currentPage === 5) {
        // Manual continue to quiz after flashcard completion
        setTimeout(() => {
          handlePageChange(6);
        }, 300);
      } else if (data.quizCompleted && currentPage === 7) {
        // Longer delay for quiz completion to show celebration
        setTimeout(() => {
          handlePageChange(8);
        }, 2500);
      } else if (currentPage === 1 && data.pageViewed) {
        // Quick advance for intro page button
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 300);
      } else if (data.pageViewed || data.continueClicked) {
        // Standard advance for content pages
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 1500);
      }
    }

  };

  // Find current page component with error handling
  const getCurrentPageComponent = () => {
    try {
      const page = UNIT_1_PAGES.find(p => p.id === currentPage);
      return page?.component || null;
    } catch (error) {
      console.error('Error finding page component:', error);
      return null;
    }
  };

  const PageComponent = getCurrentPageComponent();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto pb-32 sm:pb-40">
      <AppHeader
        variant="unit"
        breadcrumbs={[
          { href: '/', label: 'Dashboard' },
          { href: '/', label: 'Track 1' },
          { href: '/banking-fees', label: 'Banking & Fees' },
          { href: '/banking-fees/1', label: 'Banking Basics' }
        ]}
      />

      {/* Section Progress Indicator */}
      <SectionProgress
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        title="Banking Basics"
        onPageChange={handlePageChange}
      />

      {/* Main content area - Mobile optimized */}
      <main className="mx-auto w-full sm:w-[90%] max-w-7xl px-3 sm:px-6 py-2 sm:py-6 lg:py-8">
        <div>
          {PageComponent ? (
            <div key={currentPage}>
              <PageComponent
                onStepComplete={handleStepComplete}
                stepData={stepData}
              />
            </div>
          ) : (
            // Placeholder for unimplemented pages
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                <div className="text-center">
                  <div className="mb-4 text-4xl">🚧</div>
                  <div className="mb-2 font-semibold text-gray-700">
                    Page {currentPage} Content Coming Soon
                  </div>
                  <div className="text-sm text-gray-800 mb-4">
                    This page will contain interactive activities and learning content.
                  </div>
                  <div className="text-xs text-gray-700">
                    Current page: {currentPage} of {TOTAL_PAGES}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => handlePageChange(1)}
                  className="text-sm text-gray-800 hover:text-gray-900"
                >
                  ← Back to Page 1
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        canGoBack={currentPage > 1}
        canGoForward={currentPage < TOTAL_PAGES}
      />
    </div>
  );
}