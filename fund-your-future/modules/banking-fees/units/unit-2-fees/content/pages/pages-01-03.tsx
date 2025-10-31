/**
 * Pages 1-3: Introduction and Survey Setup
 * Contains the unit introduction and survey introduction pages
 */

'use client';

import { useState } from 'react';
import { WhackAMoleGame } from '../../activities/WhackAMoleGame';
import { BankStatement } from '../../activities/BankStatement';
import {
  Stack,
  UnifiedHeading
} from '@/core/design-system';
import {
  FinancialExclusionIllustration
} from '../../components/FinancialIllustrations';
import { PageNumber } from '@/core/components/PageNumber';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// Page 1: Introduction - Exact content from documentation
export function Page1({ onStepComplete }: PageProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleGetStarted = () => {
    setIsClicked(true);
    onStepComplete?.({ pageViewed: true });
  };

  return (
    <Stack spacing="lg">
      {/* Overview Card - Similar to mobile design but for desktop */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2E1E72] via-[#3B2A8F] to-[#4A2FAA] p-8 lg:p-12 text-white shadow-2xl">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <h2 className="text-[28px] font-playfair font-semibold mb-4">
              Unit 2: It's a Fee-for-All
            </h2>
            <p className="text-lg lg:text-xl text-purple-100 mb-8">
              Let's talk about how banks operate. In this unit, you'll learn:
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg">Why banks exist</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg">Common types of bank fees</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg">Why bank fees exist</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg">How to handle challenging bank situations like overdraft charges and account closures</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-lg">What to keep in mind when transitioning out of a "student" bank account</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20">
            <button
              onClick={handleGetStarted}
              disabled={isClicked}
              className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                isClicked
                  ? 'bg-white/20 text-white/70 scale-95 cursor-not-allowed'
                  : 'bg-white text-[#2E1E72] hover:bg-white/90 hover:scale-105 active:scale-95 shadow-lg cursor-pointer'
              }`}
            >
              {isClicked ? (
                <>
                  <svg className="inline w-5 h-5 mr-2 animate-spin text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting...
                </>
              ) : (
                'Let\'s Get Started! →'
              )}
            </button>
          </div>
        </div>
      </div>

      <PageNumber current={1} total={43} />
    </Stack>
  );
}

// Page 2: Whack-A-Mole Game with Statement as Subpage
export function WhackAMolePages({ onStepComplete, stepData }: PageProps) {
  const [currentView, setCurrentView] = useState<'intro' | 'game' | 'statement' | 'reflection' | 'completed'>(
    stepData?.pageCompleted ? 'completed' : 'intro'
  );
  const [gameTransactions, setGameTransactions] = useState<any[]>(stepData?.transactions || []);

  // Handler functions
  const handleGameComplete = (transactions: any[]) => {
    setGameTransactions(transactions);
    setCurrentView('statement');
  };

  const handleStatementContinue = () => {
    setCurrentView('reflection');
  };

  const handleReflectionContinue = () => {
    setCurrentView('completed');
    onStepComplete?.({
      pageCompleted: true,
      gameCompleted: true,
      statementViewed: true,
      reflectionViewed: true,
      transactions: gameTransactions
    });
  };

  // Show intro view - exact text from documentation
  if (currentView === 'intro') {
    return (
      <Stack spacing="lg">
        <div className="max-w-4xl mx-auto text-center pt-4 pb-32 md:pb-6 px-4">
          <UnifiedHeading level="h2" variant="default" className="mb-4 md:mb-6">
            Whack-A-Mole
          </UnifiedHeading>
          <div className="text-base md:text-lg text-[#2E1E72] space-y-3 md:space-y-4 mb-24 md:mb-8">
            <p>
              Woohoo! It's Thursday, and you just got paid.
            </p>
            <p>
              Let's play a quick game. On <strong>Thursday</strong>, you have <strong>$1000 in your account</strong>. You are expecting to receive a <strong>direct deposit</strong> of $500 to your account on <strong>Friday afternoon</strong> from your dog-walking side hustle.
            </p>
            <p>
              <strong>Directions:</strong> Hit the moles as they pop up. Each mole represents an expense or charge that will come up over the next couple of days. Your <strong>available balance</strong> will decrease as you whack each mole.
            </p>
          </div>
          {/* Start Game and Back Buttons - Mobile First Design */}
          <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto md:max-w-md md:mx-auto z-50 space-y-3">
            <button
              onClick={() => setCurrentView('game')}
              className="w-full py-4 px-8 rounded-full font-medium text-base md:text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer shadow-lg md:shadow-none"
            >
              Start
            </button>

            {/* Back Button */}
            <button
              onClick={() => onStepComplete?.({ goBackOnePage: true })}
              className="w-full py-4 px-8 rounded-full font-medium text-base md:text-lg border-2 border-[#2E1E72] bg-white text-[#2E1E72] hover:bg-[#E5DEEF] transition-all duration-200 cursor-pointer shadow-sm"
            >
              Back
            </button>
          </div>
        </div>

      <PageNumber current={2} total={43} />
      </Stack>
    );
  }

  // Show game view
  if (currentView === 'game') {
    return (
      <Stack spacing="lg">
        <WhackAMoleGame onComplete={handleGameComplete} />

      <PageNumber current={2} total={43} />
      </Stack>
    );
  }

  // Show bank statement (subpage)
  if (currentView === 'statement') {
    return (
      <Stack spacing="lg">
        <BankStatement onContinue={handleStatementContinue} />

      <PageNumber current={2} total={43} />
      </Stack>
    );
  }

  // Show reflection page with three questions
  if (currentView === 'reflection') {
    return (
      <Stack spacing="lg">
        <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
          <div className="space-y-8">
            <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72] mb-6">
              You might be thinking:
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-[#2E1E72]">Where the heck did all these fees come from?</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-[#2E1E72]">Why did I overdraft so many times?</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-[#2E1E72]">What happened to the $500 that was deposited on Friday afternoon?</p>
              </div>
            </div>

            <div className="bg-[#E5DEEF] border border-[#8577B7] rounded-lg p-6 mt-8">
              <p className="text-lg text-[#2E1E72]">
                We'll talk more about what happened soon. First, let's zoom out and look at banking as an industry in the US.
              </p>
            </div>

            {/* Continue Button - Mobile First Design */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50">
              <button
                onClick={handleReflectionContinue}
                className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>

          <PageNumber current={2} total={43} />
        </div>
      </Stack>
    );
  }

  // Show completion view
  if (currentView === 'completed') {
    return (
      <Stack spacing="lg">
        <div className="text-center space-y-6 px-4 pb-48 md:pb-6">
          <div className="space-y-4">
            <h3 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">
              Activity Complete!
            </h3>
            <p className="text-lg text-[#2E1E72] leading-relaxed max-w-2xl mx-auto">
              You've experienced how banking fees can quickly accumulate when transactions are processed in a certain order.
            </p>
            <p className="text-base text-[#2E1E72]">
              Continue to the next page to explore your reaction to these fees.
            </p>
          </div>

          {/* Next and Restart buttons */}
          <div className="mt-4 space-y-3">
            {/* Next Button - Mobile First Design */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3">
              <button
                onClick={() => onStepComplete?.({ gameCompleted: true, statementViewed: true, transactions: gameTransactions })}
                className="w-full py-4 px-8 rounded-full font-medium text-base md:text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer shadow-lg md:shadow-none"
              >
                Next
              </button>

              {/* Restart button - now visible on both mobile and desktop */}
              <button
                onClick={() => setCurrentView('intro')}
                className="w-full py-4 px-8 rounded-full font-medium text-base md:text-lg border-2 border-[#2E1E72] bg-white text-[#2E1E72] hover:bg-[#E5DEEF] transition-all duration-200 cursor-pointer shadow-sm"
              >
                Restart Game
              </button>
            </div>
          </div>
        </div>

        <PageNumber current={2} total={43} />
      </Stack>
    );
  }

  // Default fallback
  return null;
}

// Page 3: Banking Context - Introduction to survey
export function Page3({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-48 md:pb-6">
      <div className="mb-8">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
          It's difficult to navigate the world without a banking account.
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-8 mb-6">
          <div className="flex-1 text-lg text-gray-700 space-y-4">
            <p>
              Having a bank account and a relationship with a banking institution is an essential part of participating in the US financial system. Bank accounts allow us to receive direct deposits, access credit, make investments, save money, buy a home, and more. Do you absolutely need a bank to do any of those things? Not technically. But modern society has made being "unbanked" more challenging.
            </p>
          </div>
          <div className="flex-shrink-0">
            <FinancialExclusionIllustration size="xl" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Let's take the Your Banking History Survey
        </h3>
        <p className="text-gray-700 mb-4">
          Let's learn a little bit more about your banking history.
        </p>
        <p className="text-sm text-gray-600">
          All answers are anonymous and you may consent or decline to share your answers with us. These kinds of surveys will appear throughout the course and help us better understand where students are coming from when they take the course.
        </p>
      </div>

      {/* Survey Buttons - New Design */}
      <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3">
        {/* Take Survey Button */}
        <button
          onClick={() => onStepComplete?.({ takeSurvey: true })}
          className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
        >
          Take Survey
        </button>

        {/* Skip Survey Button */}
        <button
          onClick={() => onStepComplete?.({ takeSurvey: false, skippedSurvey: true })}
          className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-[#2E1E72] bg-white text-[#2E1E72] hover:bg-[#E5DEEF] transition-all duration-200 cursor-pointer"
        >
          Skip Survey
        </button>

        {/* Back Button */}
        <button
          onClick={() => onStepComplete?.({ goBackOnePage: true })}
          className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
        >
          Back
        </button>
      </div>

      <PageNumber current={3} total={43} />
    </div>
  );
}