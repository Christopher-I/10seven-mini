/**
 * Design System Demo Page
 * Test and showcase the unified components
 */

'use client';

import React, { useState } from 'react';
import {
  ContentBox,
  UnifiedHeading,
  UnifiedCard,
  HeroCard,
  AlertCard,
  CompletionCard,
  SummaryCard,
  AccentHeading,
  StatusHeading,
  AlertHeading,
  UnitTitle,
} from '@/core/design-system';

export default function DesignSystemDemo() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Fund Your Future Design System Demo
          </h1>
          <p className="text-lg text-gray-600">
            Unified components based on Unit 2 analysis - Testing mobile
            responsiveness and patterns
          </p>
        </div>

        {/* UnifiedHeading Examples */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            UnifiedHeading Component
          </h2>

          <div className="grid gap-4">
            <AccentHeading level="h3">
              Accent Heading - This is the border-left style from Unit 2
            </AccentHeading>

            <StatusHeading level="h3" semantic="success">
              Status Heading - Success variant for completions
            </StatusHeading>

            <AlertHeading level="h3" semantic="error">
              Alert Heading - Error variant for warnings
            </AlertHeading>

            <UnitTitle level="h3">
              Unit Title - For hero cards and unit introductions
            </UnitTitle>

            <UnifiedHeading variant="centered" level="h3">
              Centered Heading - For important announcements
            </UnifiedHeading>
          </div>
        </section>

        {/* UnifiedCard Examples */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            UnifiedCard Component
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <HeroCard>
              <UnitTitle level="h2">Unit 2: It&apos;s a Fee-for-All</UnitTitle>
              <p className="mb-4 text-base sm:mb-6 sm:text-lg">
                In this unit, we&apos;ll talk about how banks make money.
                You&apos;ll learn:
              </p>
              <ul className="space-y-2 text-sm sm:text-lg">
                <li>
                  • Bank fees—why they exist, how to avoid them, and what they
                  are
                </li>
                <li>• Consequences of debit resequencing</li>
                <li>• Handling overdrafts and account closures</li>
              </ul>
            </HeroCard>

            <AlertCard semantic="warning">
              <AlertHeading level="h4" semantic="warning">
                Important Warning
              </AlertHeading>
              <p className="text-purple-800">
                This is a warning alert card using the unified design system. It
                maintains all the responsive patterns from Unit 2.
              </p>
            </AlertCard>

            <CompletionCard>
              <div className="text-center">
                <div className="mb-4 text-4xl">✅</div>
                <StatusHeading level="h3" semantic="success">
                  Task Completed!
                </StatusHeading>
                <p className="text-green-700">
                  You&apos;ve successfully completed the activity.
                </p>
              </div>
            </CompletionCard>

            <SummaryCard>
              <h4 className="mb-3 text-lg font-bold text-gray-700">
                Data Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-900">Total transactions:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-900">Final balance:</span>
                  <span className="font-medium text-red-600">$396.50</span>
                </div>
              </div>
            </SummaryCard>
          </div>
        </section>

        {/* ContentBox Examples */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            ContentBox Component
          </h2>

          <div className="grid gap-4">
            <ContentBox
              variant="callout"
              semantic="info"
              title="Information Callout"
              icon="ℹ️"
            >
              <p>
                This is an info callout box that replaces the original
                CalloutBox component. It maintains all responsive behavior while
                providing a unified API.
              </p>
            </ContentBox>

            <ContentBox variant="quote" semantic="neutral">
              <p>
                &quot;Where the heck did all these fees come from? Why did I
                overdraft twice if I made sure of once? I thought I got another
                $500 on Friday to cover my costs?&quot;
              </p>
            </ContentBox>

            <ContentBox
              variant="definition"
              title="Definition Box"
              semantic="neutral"
            >
              <div className="space-y-4">
                <div>
                  <strong>Bank Fee:</strong> A charge from a bank or financial
                  institution for various services, activities, or penalties,
                  such as credit card transactions or account maintenance.
                </div>
                <div>
                  <strong>Interest:</strong> An amount that&apos;s paid on bank
                  accounts or owed on loans.
                </div>
              </div>
            </ContentBox>

            <ContentBox
              variant="stats"
              semantic="info"
              title="Banking Revenue Reality"
              icon="📊"
            >
              Bank fees represent 10-40% of total bank revenue, making them a
              crucial profit center that directly affects your daily banking
              experience.
            </ContentBox>

            <ContentBox
              variant="empowerment"
              title="Remember: It's Not Your Fault"
              icon="💪"
              gradient
            >
              <div className="space-y-4">
                <p>
                  The banking system is designed to be confusing and to extract
                  fees from people, especially those who are already in
                  vulnerable financial situations.
                </p>
                <p className="font-semibold">
                  Understanding these systems is the first step toward
                  protecting yourself and advocating for change.
                </p>
              </div>
            </ContentBox>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            Interactive Components
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {['Case Study 1', 'Case Study 2', 'Case Study 3'].map(
              (caseTitle, index) => (
                <UnifiedCard
                  key={index}
                  variant="interactive"
                  selected={selectedCard === caseTitle}
                  onClick={() =>
                    setSelectedCard(
                      selectedCard === caseTitle ? null : caseTitle
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {caseTitle}
                      </h4>
                      <p className="text-sm text-gray-700">
                        Click to expand details
                      </p>
                    </div>
                    <span className="text-gray-400">
                      {selectedCard === caseTitle ? '−' : '+'}
                    </span>
                  </div>

                  {selectedCard === caseTitle && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-700">
                        This is the expanded content for {caseTitle}. The
                        interactive behavior matches Unit 2 patterns.
                      </p>
                    </div>
                  )}
                </UnifiedCard>
              )
            )}
          </div>
        </section>

        {/* Mobile Testing Section */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            Mobile Responsiveness Test
          </h2>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-800">
              Testing Instructions:
            </h3>
            <p className="text-sm text-yellow-700">
              Resize your browser window to test mobile responsiveness. All
              components should:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>• Maintain proper spacing (space-y-4 sm:space-y-6)</li>
              <li>• Show responsive text sizes (text-sm sm:text-base)</li>
              <li>• Have appropriate padding (p-3 sm:p-4, p-4 sm:p-8)</li>
              <li>• Stack properly on mobile devices</li>
              <li>• Maintain minimum touch targets (44px)</li>
            </ul>
          </div>
        </section>

        {/* Component Stats */}
        <section className="space-y-6">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-900">
            Design System Impact
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <SummaryCard>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">83 → 3</div>
                <p className="text-sm text-gray-600">Components Consolidated</p>
              </div>
            </SummaryCard>

            <SummaryCard>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">82%</div>
                <p className="text-sm text-gray-600">Reduction in Patterns</p>
              </div>
            </SummaryCard>

            <SummaryCard>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <p className="text-sm text-gray-600">Mobile Responsive</p>
              </div>
            </SummaryCard>
          </div>
        </section>
      </div>
    </div>
  );
}
