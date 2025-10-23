/**
 * Unit 5: Banking As a Smithie - Pages 1-5
 * Student accounts and study abroad banking introduction (5 pages)
 */

'use client';

import { useState } from 'react';
import { CalloutBox } from '@/core/components/CalloutBox';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import {
  Stack,
  UnifiedHeading,
  Text,
  ContentBox,
  RadioGroup,
  Checkbox,
  Center,
  type RadioOption
} from '@/core/design-system';

interface PageProps {
  onStepComplete: (stepData: any) => void;
  stepData?: any;
}

// Page 1: Student Account Introduction
export function Page1({ onStepComplete }: PageProps) {
  const [heardOfStudent, setHeardOfStudent] = useState<string>('');
  const [hasStudent, setHasStudent] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  const heardOfStudentOptions: RadioOption[] = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const hasStudentOptions: RadioOption[] = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const handleComplete = () => {
    if (heardOfStudent && hasStudent) {
      setCompleted(true);
      onStepComplete({
        page: 1,
        heardOfStudent,
        hasStudent,
        topic: 'Student Account Introduction',
        completed: true
      });
    }
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading level="h2" variant="default">
        Beyond the Big Four and Neobanks
      </UnifiedHeading>

      <Text variant="body">
        We just talked a lot about how bank accounts work with the likes of the Big Four and Neo banks. But, those aren't the only places that offer bank accounts. In fact, Smith College students have access to specific banking resources and partnerships.
      </Text>

      <Stack spacing="xl">
        <ContentBox variant="callout" semantic="info" title="Have you heard of a student account?">
          <RadioGroup
            options={heardOfStudentOptions}
            value={heardOfStudent}
            onChange={setHeardOfStudent}
            semantic="info"
          />
        </ContentBox>

        <ContentBox variant="callout" semantic="success" title="Do you have a student account?">
          <RadioGroup
            options={hasStudentOptions}
            value={hasStudent}
            onChange={setHasStudent}
            semantic="success"
          />
        </ContentBox>
      </Stack>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={!heardOfStudent || !hasStudent || completed}
          variant="primary"
          size="lg"
          showSuccessState={true}
        >
          {completed ? '✓ Complete' : 'Continue to Learn About Student Accounts'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 2: What's the Deal with Student Accounts?
export function Page2({ onStepComplete }: PageProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 2,
      topic: 'Student Account Details',
      completed: true
    });
  };

  return (
    <Stack spacing="xl">
      <UnifiedHeading level="h2" variant="default">
        What's the deal with student accounts?
      </UnifiedHeading>

      <ContentBox variant="callout" semantic="info">
        <Stack spacing="sm">
          <Text weight="semibold">
            Student accounts are widely marketed by financial institutions as introductory banking products.
          </Text>
          <Text variant="small" semantic="muted">
            Understanding the terms and automatic transitions is crucial for long-term financial planning.
          </Text>
        </Stack>
      </ContentBox>

      <Stack spacing="md">
        <Text variant="body">
          Many banks offer checking accounts for students that don't have monthly maintenance fees and introduce young people to banking tools. For many, this is often their first official banking account.
        </Text>

        <Text variant="body">
          This is an option that may feel more manageable for students who are just starting to engage with the financial system. But it is important to understand the terms and conditions of these accounts as they are not a long-term option.
        </Text>
      </Stack>

      <ContentBox variant="callout" semantic="warning" title="Important: Automatic Account Transitions">
        <Stack spacing="sm">
          <Text>
            <Text weight="bold" as="span">Most student accounts will automatically transfer over to a standard checking account upon your graduation date or within four to five years of opening the account</Text> (CFPB, 2024 Source).
          </Text>
          <Text>
            Standard checking accounts have different rules and fees associated with them and will automatically switch you over. While there is typically no fee for the transition itself, you will likely find that a fee will start to be applied if your account balance does not meet the minimum (Zhen, 2014).
          </Text>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="info" title="Key Features of Student Accounts">
        <Stack spacing="xs">
          <Text>• No monthly maintenance fees (during student status)</Text>
          <Text>• Introduction to basic banking tools</Text>
          <Text>• Often your first official banking account</Text>
          <Text>• More manageable for new banking users</Text>
          <Text>• Temporary - designed for student years only</Text>
        </Stack>
      </ContentBox>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={completed}
          variant="secondary"
          size="lg"
          showSuccessState={true}
        >
          {completed ? '✓ Complete' : 'See Specific Bank Examples'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 3: Specific Bank Examples
export function Page3({ onStepComplete }: PageProps) {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  const bankOptions: RadioOption[] = [
    {
      value: 'smith-resources',
      label: 'Smith College Banking Resources',
      description: 'Smith College provides guidance on local banking options and maintains relationships with area financial institutions to support student banking needs. Contact Student Financial Services for current recommendations.'
    },
    {
      value: 'local-options',
      label: 'Local Banking Partners',
      description: 'Several local banks and credit unions in the Northampton area offer student-friendly accounts and services tailored to college students. Verify current terms and conditions.'
    },
    {
      value: 'transition-planning',
      label: 'Account Transition Planning',
      description: 'Most student accounts automatically convert to standard accounts upon graduation or after 4-5 years. Plan ahead to understand the terms of your specific account. Review your account agreement for specific timelines.'
    }
  ];

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 3,
      selectedBank,
      topic: 'Bank Examples',
      completed: true
    });
  };

  return (
    <Stack spacing="xl">
      <UnifiedHeading level="h2" variant="default">
        Check Your Account Terms
      </UnifiedHeading>

      <Stack spacing="md">
        <Text variant="body">
          If you have a student account or are planning to open one, check the terms for when you will no longer qualify so the automatic switch doesn't come as a surprise.
        </Text>

        <Text variant="body">
          Below are some examples, but these are not endorsements.
        </Text>
      </Stack>

      <RadioGroup
        options={bankOptions}
        value={selectedBank}
        onChange={setSelectedBank}
        semantic="info"
        size="lg"
      />

      <ContentBox variant="callout" semantic="info" title="Smith-Specific Materials">
        <Text>
          <Text weight="bold" as="span">Team notes:</Text> waiting on smith specific materials here, but we've started to gather some general resources and information - we can plan for this unit to have both smith and non-smith info
        </Text>
      </ContentBox>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={completed}
          variant="success"
          size="lg"
          showSuccessState={true}
        >
          {completed ? '✓ Complete' : 'Continue to Study Abroad'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 4: Study Abroad Introduction
export function Page4({ onStepComplete }: PageProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 4,
      topic: 'Study Abroad Introduction',
      completed: true
    });
  };

  return (
    <Stack spacing="xl">
      <UnifiedHeading level="h2" variant="default">
        🎉 Great news! You got accepted to that study abroad program you applied for.
      </UnifiedHeading>

      <Text variant="body">
        Get ready for seeing the world and studying. Before you head off, here are some considerations for banking and managing your finances abroad. This unit will dive into some considerations for banking and managing finances abroad.
      </Text>

      <ContentBox variant="callout" semantic="info" title="Study Abroad at Smith">
        <Stack spacing="sm">
          <Text>
            Many Smith students take advantage of the numerous opportunities to study abroad through our programs.
          </Text>
          <Text>
            Detailed information is available on the Smith website, but we wanted to give some additional context on what it means to bank while abroad.
          </Text>
        </Stack>
      </ContentBox>

      <ContentBox variant="empowerment" gradient title="What's Coming Next">
        <Stack spacing="xs">
          <Text className="text-gray-900">• What Smith covers financially for study abroad</Text>
          <Text className="text-gray-900">• What you'll be responsible for funding</Text>
          <Text className="text-gray-900">• Banking preparation before departure</Text>
          <Text className="text-gray-900">• Managing money while abroad</Text>
          <Text className="text-gray-900">• Emergency financial resources</Text>
        </Stack>
      </ContentBox>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={completed}
          variant="primary"
          size="lg"
          showSuccessState={true}
        >
          {completed ? '✓ Complete' : 'Learn About Smith Study Abroad Funding'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 5: Smith Study Abroad Financial Details
export function Page5({ onStepComplete }: PageProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 5,
      topic: 'Smith Study Abroad Funding',
      completed: true
    });
  };

  return (
    <Stack spacing="xl">
      <UnifiedHeading level="h2" variant="default">
        For study abroad programs Smith typically helps with:
      </UnifiedHeading>

      <Stack spacing="lg">
        <ContentBox variant="callout" semantic="success" title="What Smith Covers">
          <Stack spacing="sm">
            <Text>
              <Text weight="bold" as="span">• Tuition, room, and board:</Text> Students studying abroad are billed the Smith comprehensive fee (tuition, room and board), and Smith will pay the tuition, room and board charges assessed by the study abroad program
            </Text>
            <Text>
              <Text weight="bold" as="span">• Food and housing stipends</Text> to cover the cost of food and housing that's not otherwise provided by the study abroad program. Transit stipends may also be an option in special circumstances
            </Text>
            <Text>
              <Text weight="bold" as="span">• Health insurance</Text> provided through the Smith student health plan
            </Text>
            <Text>
              <Text weight="bold" as="span">• Confirm any special exceptions or rules</Text> for your specific program or financial aid status
            </Text>
          </Stack>
        </ContentBox>

        <ContentBox variant="callout" semantic="warning" title="What You're Responsible For">
          <Stack spacing="xs">
            <Text>■ Application fees</Text>
            <Text>■ Damage and security deposits</Text>
            <Text>■ Passport and visa costs</Text>
            <Text>■ Airfare/travel</Text>
            <Text>■ Room and board during program breaks</Text>
            <Text>■ Books and other course expenses (e.g., field trips)</Text>
            <Text>■ Personal expenses (e.g., amenities, phone plans)</Text>
            <Text>■ Health insurance, if not receiving through Smith</Text>
          </Stack>
        </ContentBox>
      </Stack>

      <ContentBox variant="callout" semantic="info" title="Important Financial Planning">
        <Text>
          Understanding what Smith covers versus what you need to budget for is crucial for financial planning. Make sure to confirm the details for your specific program, as exceptions and special circumstances may apply.
        </Text>
      </ContentBox>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={completed}
          variant="secondary"
          size="lg"
          showSuccessState={true}
        >
          {completed ? '✓ Complete' : 'Prepare Your Banking for Departure'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}