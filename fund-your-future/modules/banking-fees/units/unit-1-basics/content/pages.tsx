/**
 * Content Pages for Unit 1: Banking Basics
 * Complete implementation of all educational content based on specifications
 */

'use client';

import { useState } from 'react';
import { FlashcardSystem } from '../activities/FlashcardSystem';
import { DragDropQuiz } from '../activities/DragDropQuiz';
import { EmojiSurvey } from '../activities/EmojiSurvey';
import { DefinitionTooltip, StatsCallout, BigFourBanks } from '../activities/InteractiveElements';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import { ContentRenderer } from '@/core/components/student/ContentRenderer';
import {
  HeroCard,
  UnitTitle,
  ContentBox,
  AccentHeading,
  SummaryCard,
  AlertCard,
  CompletionCard,
  StatusHeading,
  DemoBox,
  Layout,
  Stack,
  Center,
  Text,
  Small,
  Subtitle,
  BulletList,
  ListItem
} from '@/core/design-system';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// Page 1: Introduction - "What's in a Bank?"
export function Page1({ onStepComplete }: PageProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleGetStarted = () => {
    setIsClicked(true);
    onStepComplete?.({ pageViewed: true });
  };

  return (
    <Stack spacing="md">
      <HeroCard>
        <UnitTitle level="h2">What's in a Bank?</UnitTitle>
        <Text variant="large" className="text-white">
          A lot, actually! This unit will focus specifically on how to navigate the US banking system and provide you with the information you need to make more informed decisions.
        </Text>
        <Text className="text-white">We will cover:</Text>
        <BulletList>
          <ListItem className="text-white">Why banking institutions exist and how they operate</ListItem>
          <ListItem className="text-white">What you can expect to encounter as a customer</ListItem>
          <ListItem className="text-white">Banking practices that could cause socioeconomic harm and how to handle them</ListItem>
        </BulletList>
      </HeroCard>

      <Center>
        <AnimatedButton
          onClick={handleGetStarted}
          variant="primary"
          size="lg"
          disabled={isClicked}
        >
          {isClicked ? 'Starting...' : 'Continue to Banking Basics →'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 2: Banks are more than money holders (with CMS Integration)
export function Page2({ onStepComplete }: PageProps) {
  const [viewed, setViewed] = useState(false);

  const handleContinue = () => {
    setViewed(true);
    onStepComplete?.({ pageViewed: true });
  };

  // Static content as fallback
  const staticContent = (
    <Stack spacing="lg">
        <ContentBox variant="callout" semantic="info" title="You might be thinking..." icon="🤔">
          <p className="mb-3">
            "I already know how to bank!" Yes! A lot of you may have had your own bank accounts, debit cards, and credit cards for a while now.
          </p>
          <p>
            This module is meant to provide you with information you may not know or that is not always mentioned when you sign up for your first <DefinitionTooltip term="Checking Account" definition="An account meant for everyday transactions and withdrawals">checking account</DefinitionTooltip>.
          </p>
        </ContentBox>

        <SummaryCard>
          <Text semantic="neutral" className="mb-4">
            In order to participate in the US economy, it is likely you will have to, at the very least, open a checking account that will allow you to deposit the money that you earn.
          </Text>
          <Text semantic="neutral" className="mb-4">
            The day we open a bank account marks a transitional moment in each of our lives. Many of us open our first checking account with our first job and our first time away from home.
          </Text>
          <Text semantic="neutral">
            Maintaining a relationship with a bank seems simple in theory–open an account, put money in, and take it out when you need it. That's it, right?
          </Text>
        </SummaryCard>

        <ContentBox variant="empowerment" title="Banks do more than hold your money" icon="🏦" gradient>
          <Text semantic="neutral" className="mb-4">
            In the US, they are for-profit companies that serve a variety of audiences, including consumers, investors, companies, governments, and most importantly, their <DefinitionTooltip term="Shareholders" definition="For corporations, shareholders are those who own stocks of the company. They have the ultimate power because, by law, they have the right to vote for who sits on the board of directors and sit in leadership positions">shareholders</DefinitionTooltip>.
          </Text>

          <ContentBox variant="stats" title="Banking Industry Profits" semantic="info" icon="📊">
            <Text semantic="neutral" className="mb-3">
              In 2024 alone, the Federal Deposit Insurance Corporation (FDIC–the government agency that insures the deposits of banks) reported that the US banking industry had a collective <DefinitionTooltip term="Net Income" definition="For companies, it is the money left over after taking out expenses. Net income and profit are often used interchangeably">net income</DefinitionTooltip> of <strong>$268.2 billion</strong> in 2024, a $14.1B or 5.6% increase from the prior year.
            </Text>
          </ContentBox>

          <div className="mt-4">
            <BigFourBanks />
          </div>

          <Small semantic="muted" className="mt-4">
            The "Big 4" banks–JP Morgan Chase, Bank of America, Wells Fargo, and Citigroup–collectively have $10 trillion in consolidated assets under management as of June 30, 2025.
          </Small>
        </ContentBox>
    </Stack>
  );

  return (
    <Stack spacing="md">
      {/* Admin-managed content with fallback to static content */}
      <ContentRenderer
        moduleId="banking-fees"
        unitId="unit-1-basics"
        pageId="page-2"
        fallbackContent={staticContent}
      />

      {!viewed && (
        <Center>
          <AnimatedButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
          >
            Continue Learning →
          </AnimatedButton>
        </Center>
      )}
    </Stack>
  );
}

// Page 3: Context and transition
export function Page3({ onStepComplete }: PageProps) {
  const [viewed, setViewed] = useState(false);

  const handleContinue = () => {
    setViewed(true);
    onStepComplete?.({ pageViewed: true });
  };

  return (
    <Stack spacing="md">
      <Stack spacing="lg">
        <ContentBox variant="alert" semantic="warning" title="Important Context" icon="⚠️">
          <Text className="mb-4">
            In addition to holding your money, they make money. A lot of it. Because of this, banks inevitably have considerable bargaining power and influence in American society.
          </Text>
          <Text className="mb-4">
            They influence our political and social landscape. We'll talk about this more in Unit 2, but this context cannot be lost as we navigate the banking system in hopes of creating our own version of wealth and contentment.
          </Text>
          <Text>
            Banking as an individual is often presented as a positive or neutral experience. But for many, banking can be fraught with challenges, especially if someone is already in a vulnerable financial position.
          </Text>
        </ContentBox>

        <HeroCard>
          <Center spacing="sm">
            <div className="text-3xl mb-4">📚</div>
            <UnitTitle level="h3">Ready to dive in?</UnitTitle>
            <Text semantic="white">
              Before we explore more complex topics, let's start with the basics of banking vocabulary!
            </Text>
          </Center>
        </HeroCard>
      </Stack>

      {!viewed && (
        <Center>
          <AnimatedButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
          >
            Let's Start with the Basics →
          </AnimatedButton>
        </Center>
      )}
    </Stack>
  );
}

// Page 4: Vocabulary introduction
export function Page4({ onStepComplete }: PageProps) {
  const [viewed, setViewed] = useState(false);

  const handleContinue = () => {
    setViewed(true);
    onStepComplete?.({ pageViewed: true });
  };

  return (
    <Stack spacing="md">
      <Stack spacing="lg">
        <Center spacing="sm">
          <div className="text-4xl mb-4">🤔</div>
          <UnitTitle level="h2" className="text-gray-900">
            So, how robust is your banking vocab?
          </UnitTitle>
        </Center>

        <SummaryCard>
          <Text className="mb-4">
            We know a lot of you are banking and have a relationship with a bank already. Some of you may not, and that's okay!
          </Text>
          <Text>
            Before diving into more complex topics, we will go over foundational banking terminology that you may or may not be familiar with.
          </Text>
        </SummaryCard>

        <ContentBox variant="callout" semantic="info" title="How it works" icon="ℹ️">
          <div className="space-y-3">
            <p>
              <strong>Directions:</strong> You'll see each term on a digital flashcard and the corresponding definition on the back.
            </p>
            <p>
              You can come back to these flashcards and flip through the stack as many times as you want.
            </p>
            <p>
              <strong>Requirement:</strong> You must flip through the cards at least once to move on to the quiz.
            </p>
            <Small semantic="muted">
              We'll also highlight key terminology throughout the course, so don't worry about having to memorize everything right now.
            </Small>
          </div>
        </ContentBox>

        <Center spacing="xs">
          <div className="text-3xl mb-3">📖</div>
          <Subtitle semantic="muted">Ready to learn some banking terminology?</Subtitle>
        </Center>
      </Stack>

      {!viewed && (
        <Center>
          <AnimatedButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
          >
            Let's go! →
          </AnimatedButton>
        </Center>
      )}
    </Stack>
  );
}

// Page 5: Flashcard System
export function Page5({ onStepComplete, stepData }: PageProps) {
  const flashcardsCompleted = stepData?.flashcardsCompleted || false;
  const [showFeedback, setShowFeedback] = useState(false);

  if (flashcardsCompleted) {
    return (
      <Stack spacing="lg">
        <ContentBox variant="callout" semantic="success">
          <Center spacing="sm">
            <div className="text-4xl mb-4">✅</div>
            <AccentHeading level="h3">Flashcards completed!</AccentHeading>
            <Text>
              You've reviewed all the banking terms. Great work! You can review them again or continue to the quiz.
            </Text>
          </Center>
          <Stack direction="row" spacing="sm" className="flex-col sm:flex-row justify-center">
            <AnimatedButton
              onClick={() => {
                // Clear flashcard progress
                localStorage.removeItem('unit-1-flashcards-progress');
                // Reset the step completion by calling onStepComplete with reset data
                onStepComplete?.({ flashcardsCompleted: false, termsReviewed: 0, reset: true });
              }}
              variant="outline"
              size="md"
            >
              🔄 Reset & Play Again
            </AnimatedButton>
            <AnimatedButton
              onClick={() => {
                // Continue to next page (quiz)
                onStepComplete?.({ continueToQuiz: true });
              }}
              variant="primary"
              size="md"
            >
              Continue to Quiz →
            </AnimatedButton>
          </Stack>
        </ContentBox>

        {/* Feedback Survey - always show */}
        {!showFeedback ? (
          <ContentBox variant="callout">
            <EmojiSurvey
              onComplete={(data) => {
                setShowFeedback(true);
                // Could save feedback data here if needed
              }}
            />
          </ContentBox>
        ) : (
          <ContentBox variant="callout" semantic="success">
            <Center>
              <Small semantic="muted">Thanks for your feedback!</Small>
            </Center>
          </ContentBox>
        )}
      </Stack>
    );
  }

  return (
    <Stack spacing="md">
      <Center spacing="sm">
        <UnitTitle level="h2" className="text-gray-900">
          Banking Vocabulary Flashcards
        </UnitTitle>
        <Subtitle semantic="muted">
          Review all the terms to unlock the quiz
        </Subtitle>
      </Center>

      <FlashcardSystem onComplete={(data) => onStepComplete?.(data)} />
    </Stack>
  );
}

// Page 6: Quiz introduction
export function Page6({ onStepComplete }: PageProps) {
  const [viewed, setViewed] = useState(false);

  const handleContinue = () => {
    setViewed(true);
    onStepComplete?.({ pageViewed: true });
  };

  return (
    <Stack spacing="md">
      <Stack spacing="lg">
        <Center spacing="sm">
          <div className="text-4xl mb-4">🎯</div>
          <UnitTitle level="h2" semantic="neutral">
            Now that you've practiced, let's test your knowledge!
          </UnitTitle>
        </Center>

        <ContentBox variant="callout" semantic="info" title="How the quiz works" icon="ℹ️">
          <Stack spacing="sm">
            <Text>
              <strong>Instructions:</strong> Drag and drop the terms from the bottom half of the screen to their correct definitions at the top of the screen.
            </Text>
            <Text>
              <strong>On mobile:</strong> Tap a term, then tap the definition box where it belongs.
            </Text>
            <Small semantic="muted">
              Don't worry if you get something wrong – this is about learning, not perfection!
            </Small>
          </Stack>
        </ContentBox>

        <DemoBox variant="visual-guide" semantic="instructional">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-800 text-white rounded text-xs flex items-center justify-center font-medium">
                Term
              </div>
              <span>→</span>
              <div className="w-16 h-8 border-2 border-dashed border-gray-300 rounded text-xs flex items-center justify-center text-gray-700">
                Drop here
              </div>
            </div>
            <Small semantic="muted">Drag and drop visualization</Small>
          </div>
        </DemoBox>

        <Center spacing="xs">
          <div className="text-2xl mb-3">🧠</div>
          <Subtitle semantic="muted">Ready to test your banking knowledge?</Subtitle>
        </Center>
      </Stack>

      {!viewed && (
        <Center>
          <AnimatedButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
          >
            Start Quiz →
          </AnimatedButton>
        </Center>
      )}
    </Stack>
  );
}

// Page 7: Drag-Drop Quiz
export function Page7({ onStepComplete, stepData }: PageProps) {
  const quizCompleted = stepData?.quizCompleted || false;

  if (quizCompleted) {
    const score = stepData?.score || 0;
    const percentage = Math.round((score / 5) * 100);

    return (
      <Stack spacing="lg">
        <CompletionCard semantic="success">
          <Center spacing="sm">
            <div className="text-4xl mb-4">🎉</div>
            <StatusHeading level="h3" semantic="success">Quiz completed!</StatusHeading>
            <Text semantic="success">
              You got {score} out of 5 questions correct ({percentage}%). Well done!
            </Text>
          </Center>
        </CompletionCard>
      </Stack>
    );
  }

  return (
    <Stack spacing="md">
      <Center spacing="sm">
        <UnitTitle level="h2">
          Banking Knowledge Quiz
        </UnitTitle>
        <Subtitle semantic="muted">
          Match the terms with their definitions
        </Subtitle>
      </Center>

      <DragDropQuiz onComplete={(data) => onStepComplete?.(data)} allowTestOut={true} />
    </Stack>
  );
}

// Page 8: Completion celebration
export function Page8({ onStepComplete }: PageProps) {
  return (
    <Stack spacing="md">
      <Center spacing="lg">
        <div className="text-6xl mb-4">🎉</div>

        <div>
          <StatusHeading level="h2" semantic="success">
            Yay! You completed Unit 1: Banking Basics
          </StatusHeading>
          <Text variant="large" semantic="neutral">
            You've learned essential banking vocabulary and tested your knowledge. Great work!
          </Text>
        </div>

        <ContentBox variant="callout" semantic="warning" title="How are you feeling?">
          <EmojiSurvey onComplete={(data) => onStepComplete?.(data)} />
        </ContentBox>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <AnimatedButton
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Return Home
          </AnimatedButton>
          <AnimatedButton
            onClick={() => window.location.href = '/banking-fees/2'}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Start Unit 2: It's a fee for all →
          </AnimatedButton>
        </div>
      </Center>
    </Stack>
  );
}

// Export pages array
export const UNIT_1_PAGES = [
  { id: 1, component: Page1, title: "What's in a Bank?" },
  { id: 2, component: Page2, title: "Banks Do More Than Hold Money" },
  { id: 3, component: Page3, title: "Important Context" },
  { id: 4, component: Page4, title: "Banking Vocabulary Introduction" },
  { id: 5, component: Page5, title: "Interactive Flashcards" },
  { id: 6, component: Page6, title: "Quiz Introduction" },
  { id: 7, component: Page7, title: "Banking Knowledge Quiz" },
  { id: 8, component: Page8, title: "Unit Complete!" }
];