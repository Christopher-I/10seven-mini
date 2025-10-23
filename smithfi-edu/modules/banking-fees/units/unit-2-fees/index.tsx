/**
 * Unit 2 Container - It's a Fee-for-All
 * Manages the flow and state for the entire unit
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/core/components/AppHeader';
import { loadProgress, updateUnitProgress } from '@/core/services/storage';
import { trackPageView } from '@/core/services/analytics';
import { UNIT_2_PAGES } from './content';
import type { Progress } from '@/core/types';

const MODULE_ID = 'banking-fees';
const UNIT_ID = 'unit-2-fees';
const TOTAL_PAGES = 43;

export default function Unit2Container() {
  // Debug: Log page registry on mount
  console.log('📚 Unit 2 Page Registry:', {
    totalPages: UNIT_2_PAGES.length,
    pageIds: UNIT_2_PAGES.map(p => p.id),
    lastPage: UNIT_2_PAGES[UNIT_2_PAGES.length - 1],
    TOTAL_PAGES_CONSTANT: TOTAL_PAGES
  });

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

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

    // Track page view
    trackPageView(MODULE_ID, UNIT_ID, 1);
  }, []);

  // Handle page navigation
  const handlePageChange = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;

    setCurrentPage(page);

    // Calculate progress and check for completion
    const progress = Math.round((page / TOTAL_PAGES) * 100);
    updateUnitProgress(MODULE_ID, UNIT_ID, {
      currentPage: page,
      completed: progress >= 100
    });
    trackPageView(MODULE_ID, UNIT_ID, page);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle step completion from interactive elements
  const handleStepComplete = (data: any) => {
    console.log('🔍 handleStepComplete called:', {
      currentPage,
      TOTAL_PAGES,
      data,
      canAdvance: currentPage < TOTAL_PAGES
    });

    const updatedStepData = { ...stepData, ...data };
    setStepData(updatedStepData);

    // Save step data to localStorage
    localStorage.setItem(`unit-${UNIT_ID}-step-data`, JSON.stringify(updatedStepData));

    // Special handling for back button - go back one page
    if (data.goBackOnePage) {
      console.log('⬅️ Going back one page from', currentPage);
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
      return;
    }

    // Auto-advance to next page after completion
    console.log('📊 Checking auto-advance condition:', {
      currentPage,
      TOTAL_PAGES,
      willAdvance: currentPage < TOTAL_PAGES
    });

    if (currentPage < TOTAL_PAGES) {
      // Special handling for skipping survey - jump to page 14
      if (data.skippedSurvey && currentPage === 3) {
        console.log('⏭️ Skipping survey, jumping to page 14');
        setTimeout(() => {
          handlePageChange(14);
        }, 300); // Quick jump to page 14
      }
      // Special handling for game completion - advance to next page (page 3)
      else if (data.gameCompleted && currentPage === 2) {
        console.log('🎮 Game completed, advancing to page 3');
        setTimeout(() => {
          handlePageChange(3);
        }, 2500); // Longer delay for game completion
      } else if (currentPage === 1 && data.pageViewed) {
        console.log('👁️ Page 1 viewed, advancing to page 2');
        // Immediate advance for intro page button
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 300); // Very short delay just for button feedback
      } else {
        console.log('➡️ Standard advance from page', currentPage, 'to page', currentPage + 1);
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 1500); // Small delay to let user see completion
      }
    } else {
      console.log('🛑 Cannot advance: currentPage >= TOTAL_PAGES', {
        currentPage,
        TOTAL_PAGES
      });
    }

  };

  // Find current page component with better error handling
  const getCurrentPageComponent = () => {
    try {
      // Direct lookup is simpler and more reliable
      const page = UNIT_2_PAGES.find(p => p.id === currentPage);
      console.log('🔎 Getting page component:', {
        currentPage,
        foundPage: page ? `Page ${page.id}: ${page.title}` : 'NOT FOUND',
        totalPagesInRegistry: UNIT_2_PAGES.length,
        hasComponent: !!page?.component
      });
      return page?.component || null;
    } catch (error) {
      console.error('❌ Error finding page component:', error);
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
    <div className="min-h-screen bg-[#E5DEEF] overflow-y-auto">
      <AppHeader
        variant="unit"
        unitTitle="It's a Fee-for-All"
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageJump={handlePageChange}
        onPageChange={handlePageChange}
        canGoBack={currentPage > 1}
        canGoForward={currentPage < TOTAL_PAGES}
      />

      {/* Main content area - Mobile optimized */}
      <main className="mx-auto w-full sm:w-[95%] md:w-[90%] max-w-6xl px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6 lg:py-8">
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

    </div>
  );
}
