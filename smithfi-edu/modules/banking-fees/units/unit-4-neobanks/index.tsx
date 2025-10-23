/**
 * Unit 4: Neobank Nation
 * Banking Module - Understanding neobanks and digital banking
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
import { UNIT_4_PAGES } from './content/pages';
import {
  PageContainer,
  UnifiedCard,
  UnifiedHeading,
  Text,
  Stack
} from '@/core/design-system';

const MODULE_ID = 'banking-fees';
const UNIT_ID = 'unit-4-neobanks';
const TOTAL_PAGES = 6;

export default function Unit4Container() {
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
    unitTitle: 'Neobank Nation',
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

      // Update storage
      updateUnitProgress(MODULE_ID, UNIT_ID, {
        currentPage: page,
        completed: page === TOTAL_PAGES
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
      if (data.pageViewed || data.completed || data.swipingComplete) {
        setTimeout(() => {
          handlePageChange(currentPage + 1);
        }, 1500);
      }
    } else if (currentPage === TOTAL_PAGES) {
      // Final page - return to module overview
      updateUnitProgress(MODULE_ID, UNIT_ID, {
        currentPage: TOTAL_PAGES,
        completed: true
      });
      setTimeout(() => {
        router.push('/banking-fees');
      }, 2000);
    }
  };

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/banking-fees', label: 'Banking & Fees' },
    { href: '/banking-fees/unit-4-neobanks', label: 'Unit 4: Neobank Nation' }
  ];

  const CurrentPageContent = UNIT_4_PAGES[currentPage - 1]?.component;

  return (
    <PageContainer variant="page" background="neutral">
      <AppHeader
        title="Unit 4: Neobank Nation"
        description="Understanding neobanks and digital-first banking"
        breadcrumbs={breadcrumbs}
        variant="unit"
      />

      <PageContainer variant="constrained" className="pb-20 sm:pb-16">
        <Stack spacing="md">
          {/* Progress indicator */}
          <SectionProgress
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            title="Neobank Nation"
          />

          {/* Content */}
          <UnifiedCard variant="elevated" size="lg">
            {CurrentPageContent ? (
              <CurrentPageContent
                onStepComplete={handleStepComplete}
                stepData={stepData}
              />
            ) : (
              <Stack spacing="sm" className="text-center py-8">
                <UnifiedHeading variant="default" level="h3">
                  Page {currentPage}
                </UnifiedHeading>
                <Text semantic="muted">
                  Content for this page is being developed.
                </Text>
              </Stack>
            )}
          </UnifiedCard>
        </Stack>
      </PageContainer>

      {/* Navigation - outside constrained container */}
      <Navigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        canGoBack={currentPage > 1}
        canGoForward={currentPage < TOTAL_PAGES}
      />
    </PageContainer>
  );
}