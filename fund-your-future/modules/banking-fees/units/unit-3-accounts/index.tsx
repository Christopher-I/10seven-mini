/**
 * Unit 3: How Banking Affects You
 * Banking Module - Understanding psychological and emotional impacts of banking
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/core/components/AppHeader';
import { SectionProgress } from '@/core/components/SectionProgress';
import { Navigation } from '@/core/components/Navigation';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { loadProgress, updateUnitProgress } from '@/core/services/storage';
import { trackPageView } from '@/core/services/analytics';
import { UNIT_3_PAGES } from './content/pages';
import { CardContainer } from '@/core/design-system';

const MODULE_ID = 'banking-fees';
const UNIT_ID = 'unit-3-accounts';
const TOTAL_PAGES = 10;

export default function Unit3Container() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [canAdvance, setCanAdvance] = useState(false);

  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced progress tracking
  const { trackPageView: trackPageViewNew } = useProgressTracking({
    moduleId: MODULE_ID,
    moduleTitle: 'Banking & Fees',
    unitId: UNIT_ID,
    unitTitle: 'How Banking Affects You',
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
    }
    setIsLoading(false);
  }, []);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
      setCanAdvance(false);

      // Track page view
      trackPageViewNew(page);
      trackPageView(MODULE_ID, UNIT_ID, page);

      // Calculate progress and update storage
      const progress = Math.round((page / TOTAL_PAGES) * 100);
      updateUnitProgress(MODULE_ID, UNIT_ID, {
        currentPage: page,
        completed: progress >= 100
      });
    }
  };

  const handleStepComplete = (data: any) => {
    setCanAdvance(true);

    // Update step data
    const updatedStepData = { ...stepData, [`page_${currentPage}`]: data };
    setStepData(updatedStepData);

    // Save to localStorage
    localStorage.setItem(`unit-${UNIT_ID}-step-data`, JSON.stringify(updatedStepData));

    // Track completion
    trackPageView(MODULE_ID, UNIT_ID, currentPage);

    // Auto-advance to next page after completion
    if (currentPage < TOTAL_PAGES) {
      if (data.pageViewed || data.completed) {
        // Standard advance for content pages
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 1500);
      }
    } else if (currentPage === TOTAL_PAGES) {
      // Final page - return to module overview
      setTimeout(() => {
        router.push('/banking-fees');
      }, 2000);
    }
  };

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/banking-fees', label: 'Banking & Fees' },
    { href: '/banking-fees/unit-3-accounts', label: 'Unit 3: How Banking Affects You' }
  ];

  const CurrentPageContent = UNIT_3_PAGES[currentPage - 1]?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Unit 3: How Banking Affects You"
        description="Understanding the psychological and emotional impacts of banking experiences"
        breadcrumbs={breadcrumbs}
        variant="unit"
      />

      <main className="mx-auto w-[90%] max-w-4xl px-4 py-6">
        {/* Progress indicator */}
        <SectionProgress
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          title="How Banking Affects You"
        />

        {/* Content */}
        <CardContainer>
          {CurrentPageContent ? (
            <CurrentPageContent
              onStepComplete={handleStepComplete}
              stepData={currentPage === 9 ? stepData : stepData[`page_${currentPage}`] || {}}
            />
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Page {currentPage}
              </h3>
              <p className="text-gray-600">
                Content for this page is being developed.
              </p>
            </div>
          )}
        </CardContainer>

        {/* Navigation */}
        <Navigation
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
          canGoBack={currentPage > 1}
          canGoForward={currentPage < TOTAL_PAGES}
        />
      </main>
    </div>
  );
}