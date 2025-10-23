/**
 * Unit 3: How Banking Affects You - Page Configuration
 * Based on the official module documentation
 */

import React, { useState } from 'react';
import { ResponseSpectrum } from '../components/ResponseSpectrum';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import {
  Stack,
  Layout,
  Center,
  Grid,
  UnifiedHeading,
  UnitTitle,
  AccentHeading,
  Text,
  ContentBox,
  HeroCard,
  InteractiveSpectrum,
  BulletList,
  ListItem,
  type SpectrumResponse
} from '@/core/design-system';

// Placeholder components for each page until they are implemented
const Page1 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="md">
    <HeroCard>
      <UnitTitle level="h2">How Banking Affects You</UnitTitle>
      <Text variant="large" className="text-white">
        Banking over the course of your life will be nonlinear. For many of us, banking is a
        critical piece of funding our vision of wealth. And for many more of us, banking can
        be a journey of ups and downs.
      </Text>
      <Text className="text-white">
        In this unit, we'll explore the psychological and emotional impacts of banking experiences,
        and help you understand common responses to financial challenges.
      </Text>
    </HeroCard>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        Continue Learning →
      </AnimatedButton>
    </Center>
  </Stack>
);

const Page2 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">Three Common Experiences</UnifiedHeading>

    <Layout spacing="md">
      <Text>
        As we discussed in Module 1, 10Seven's research suggests that people face three
        predominant experiences when participating in the economy. How does this relate to banking?
        Participating in the economy typically includes maintaining an account at a bank or credit union.
      </Text>

      <Layout spacing="sm">
        <ContentBox variant="callout" semantic="success" border="accent" icon="🛡️">
          <AccentHeading level="h3" semantic="success">Material Safety</AccentHeading>
          <Text>The feeling or inner knowing that you are protected from experiencing socioeconomic harm.</Text>
        </ContentBox>

        <ContentBox variant="callout" semantic="warning" border="accent" icon="😔">
          <AccentHeading level="h3" semantic="warning">Financial Shame</AccentHeading>
          <Text>The mental and emotional impact of being told you are to blame for your socioeconomic experiences.</Text>
        </ContentBox>

        <ContentBox variant="callout" semantic="error" border="accent" icon="😟">
          <AccentHeading level="h3" semantic="error">Financial Trauma</AccentHeading>
          <Text>The effect of being continually harmed by the economic system and feeling betrayed by the economic system and its institutions.</Text>
        </ContentBox>
      </Layout>
    </Layout>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        Continue Learning →
      </AnimatedButton>
    </Center>
  </Stack>
);

const Page3 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">Self-Protective Responses</UnifiedHeading>

    <Layout spacing="md">
      <Text>
        When you have a bad experience with a bank, your responses may vary. There are typically
        three self-protective responses to adverse experiences that we may have while participating
        in the economy, including while we are in an active relationship with a bank.
      </Text>

      <Layout spacing="sm">
        <ContentBox variant="callout" semantic="info" icon="⚡">
          <AccentHeading level="h3" semantic="info">Hypervigilance</AccentHeading>
          <Text>Dedicating more time and effort than what may be usual for you because you feel the need to keep up and be on top of things.</Text>
        </ContentBox>

        <ContentBox variant="callout" semantic="warning" icon="🚪">
          <AccentHeading level="h3" semantic="warning">Non-participation</AccentHeading>
          <Text>Retreating and removing yourself from participating in the economy.</Text>
        </ContentBox>

        <ContentBox variant="callout" semantic="error" icon="😔">
          <AccentHeading level="h3" semantic="error">Self-blame or Shame</AccentHeading>
          <Text>Immediately thinking you are to blame or it is your fault when experiencing socioeconomic harm.</Text>
        </ContentBox>
      </Layout>
    </Layout>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        Continue Learning →
      </AnimatedButton>
    </Center>
  </Stack>
);

const Page4 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">All Responses Are Normal</UnifiedHeading>

    <Layout spacing="md">
      <Text>
        All of these responses are normal and logical. There is nothing wrong about applying
        any of these self-protective approaches.
      </Text>

      <Text>
        As you walked through Unit 2, it is likely you had or anticipated a response to the
        information we shared:
      </Text>

      <BulletList spacing="sm">
        <ListItem>Maybe when we talked about bank fees, you started to tell yourself you need to watch your bank account like a hawk (hypervigilance).</ListItem>
        <ListItem>Maybe when we talked about shareholder primacy, you thought about breaking up with your bank (nonparticipation).</ListItem>
        <ListItem>Maybe when you went through the simulated whack-a-mole exercise, you wanted to blame yourself, even though this exact scenario didn't actually happen (self-blame).</ListItem>
      </BulletList>

      <ContentBox variant="callout" semantic="info">
        <Text weight="semibold">We're here to say: It is completely normal and logical to have one or multiple self-protective responses when something bad happens or you anticipate something bad happening.</Text>
      </ContentBox>
    </Layout>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        Continue Learning →
      </AnimatedButton>
    </Center>
  </Stack>
);

const Page5 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">Banking Affects You Activity</UnifiedHeading>

    <Layout spacing="md">
      <Text>
        Let's check-in and make sure you're tracking. This activity will help you better
        understand the experiences you may have while banking and potential responses you
        may have when reacting to them.
      </Text>

      <Text>
        We understand that reading some of these scenarios may evoke certain reactions or
        feelings, especially if the scenario has happened to you before. You may always take
        a break and come back.
      </Text>

      <ContentBox variant="callout" semantic="warning" title="Instructions:">
        <Text>Read each scenario and you'll "plot" your response on our participatory style and response spectrum. At the end, you will be able to better visualize if your responses follow a pattern or not.</Text>
      </ContentBox>
    </Layout>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="success"
        size="lg"
        showSuccessState={true}
      >
        🎯 Start Activity
      </AnimatedButton>
    </Center>
  </Stack>
);

const Page6 = ({ onStepComplete, stepData }: any) => {
  const [selectedResponse, setSelectedResponse] = useState<SpectrumResponse | null>(
    stepData.scenario1Response || null
  );

  const handleResponseSelect = (response: SpectrumResponse) => {
    setSelectedResponse(response);
    onStepComplete({
      scenario1Response: response,
      scenarioCompleted: true
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2">Scenario 1</UnifiedHeading>

      <Layout spacing="md">
        <ContentBox variant="callout" semantic="info">
          <Text variant="body">
            You're asked whether you want overdraft protection. You opt in and you overdraft
            within the first week since opening your account. What type of response do you
            think you would have in this scenario?
          </Text>
        </ContentBox>

        <InteractiveSpectrum
          onResponseSelect={handleResponseSelect}
          selectedResponse={selectedResponse}
          title="Response Spectrum"
          instructions="Click anywhere inside the triangle to plot your response"
          layout="compact"
        />

        {selectedResponse && (
          <Center>
            <AnimatedButton
              onClick={() => onStepComplete({
                pageViewed: true,
                scenario1Complete: true,
                scenario1Response: selectedResponse
              })}
              variant="primary"
              size="lg"
              showSuccessState={true}
            >
              Continue to Scenario 2 →
            </AnimatedButton>
          </Center>
        )}
      </Layout>
    </Stack>
  );
};

const Page7 = ({ onStepComplete, stepData }: any) => {
  const [selectedResponse, setSelectedResponse] = useState<SpectrumResponse | null>(
    stepData.scenario2Response || null
  );

  const handleResponseSelect = (response: SpectrumResponse) => {
    setSelectedResponse(response);
    onStepComplete({
      scenario2Response: response,
      scenarioCompleted: true
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2">Scenario 2</UnifiedHeading>

      <Layout spacing="md">
        <ContentBox variant="callout" semantic="info">
          <Text variant="body">
            Your bank sets up linked accounts where if you overdraft your checking account,
            it will automatically pull from your savings account and charge you a fee for
            this service. What type of response do you think you would have in this scenario?
          </Text>
        </ContentBox>

        <InteractiveSpectrum
          onResponseSelect={handleResponseSelect}
          selectedResponse={selectedResponse}
          title="Response Spectrum"
          instructions="Click anywhere inside the triangle to plot your response"
          layout="compact"
        />

        {selectedResponse && (
          <Center>
            <AnimatedButton
              onClick={() => onStepComplete({
                pageViewed: true,
                scenario2Complete: true,
                scenario2Response: selectedResponse
              })}
              variant="primary"
              size="lg"
              showSuccessState={true}
            >
              Continue to Scenario 3 →
            </AnimatedButton>
          </Center>
        )}
      </Layout>
    </Stack>
  );
};

const Page8 = ({ onStepComplete, stepData }: any) => {
  const [selectedResponse, setSelectedResponse] = useState<SpectrumResponse | null>(
    stepData.scenario3Response || null
  );

  const handleResponseSelect = (response: SpectrumResponse) => {
    setSelectedResponse(response);
    onStepComplete({
      scenario3Response: response,
      scenarioCompleted: true
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2">Scenario 3</UnifiedHeading>

      <Layout spacing="md">
        <ContentBox variant="callout" semantic="info">
          <Text variant="body">
            Your bank begins sending you daily notifications about your account balance.
            You find these notifications helpful at first, but then realize they are coming
            multiple times a day and creating anxiety. What type of response do you think
            you would have in this scenario?
          </Text>
        </ContentBox>

        <InteractiveSpectrum
          onResponseSelect={handleResponseSelect}
          selectedResponse={selectedResponse}
          title="Response Spectrum"
          instructions="Click anywhere inside the triangle to plot your response"
          layout="compact"
        />

        {selectedResponse && (
          <Center>
            <AnimatedButton
              onClick={() => onStepComplete({
                pageViewed: true,
                scenario3Complete: true,
                scenario3Response: selectedResponse
              })}
              variant="success"
              size="lg"
              showSuccessState={true}
            >
              📊 View Your Response Pattern
            </AnimatedButton>
          </Center>
        )}
      </Layout>
    </Stack>
  );
};

const Page9 = ({ onStepComplete, stepData }: any) => {
  // Debug: log the stepData to see its structure
  console.log('Page9 stepData:', stepData);

  // Access scenario responses from their respective pages in the complete step data
  const scenario1 = stepData.page_6?.scenario1Response;
  const scenario2 = stepData.page_7?.scenario2Response;
  const scenario3 = stepData.page_8?.scenario3Response;

  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2">Your Response Pattern</UnifiedHeading>

      <Layout spacing="md">
        <Text>
          Here's a summary of how you responded to each banking scenario. Do you notice any patterns?
        </Text>

        <Grid cols={3} spacing="sm">
          <ContentBox variant="summary">
            <AccentHeading level="h3" semantic="neutral">Scenario 1: Overdraft Protection</AccentHeading>
            <Text variant="small" semantic="muted">Your response:</Text>
            <Text weight="medium">{scenario1?.type || 'Not completed'}</Text>
          </ContentBox>

          <ContentBox variant="summary">
            <AccentHeading level="h3" semantic="neutral">Scenario 2: Linked Accounts</AccentHeading>
            <Text variant="small" semantic="muted">Your response:</Text>
            <Text weight="medium">{scenario2?.type || 'Not completed'}</Text>
          </ContentBox>

          <ContentBox variant="summary">
            <AccentHeading level="h3" semantic="neutral">Scenario 3: Daily Notifications</AccentHeading>
            <Text variant="small" semantic="muted">Your response:</Text>
            <Text weight="medium">{scenario3?.type || 'Not completed'}</Text>
          </ContentBox>
        </Grid>

        <ContentBox variant="callout" semantic="info" title="Remember:">
          <Text>
            All of these responses are normal and logical. There is nothing wrong about applying
            any of these self-protective approaches. This exercise helps you understand your
            patterns so you can make informed decisions about your financial wellbeing.
          </Text>
        </ContentBox>
      </Layout>

      <Center>
        <AnimatedButton
          onClick={() => onStepComplete({ pageViewed: true })}
          variant="primary"
          size="lg"
          showSuccessState={true}
        >
          Continue to Completion →
        </AnimatedButton>
      </Center>
    </Stack>
  );
};

const Page10 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">Unit 3 Complete!</UnifiedHeading>

    <Layout spacing="md">
      <Text>
        We encourage you to reflect on your participatory style/response spectrum.
        Do you notice any patterns?
      </Text>

      <Text>
        Remember, however you feel and however you respond when engaging with financial
        institutions is understandable. This exercise is meant to help you begin to see how
        you may respond, and therefore, further empowers you to make decisions about what
        may be in your financial best interest.
      </Text>

      <ContentBox variant="callout" semantic="success" title="Key Takeaway:">
        <Text>Understanding your emotional and psychological responses to banking helps you make better financial decisions and protects your wellbeing.</Text>
      </ContentBox>
    </Layout>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ completed: true })}
        variant="success"
        size="lg"
        showSuccessState={true}
      >
        🎉 Complete Unit 3
      </AnimatedButton>
    </Center>
  </Stack>
);


export const UNIT_3_PAGES = [
  { id: 1, title: "How Banking Affects You", component: Page1 },
  { id: 2, title: "Three Common Experiences", component: Page2 },
  { id: 3, title: "Self-Protective Responses", component: Page3 },
  { id: 4, title: "All Responses Are Normal", component: Page4 },
  { id: 5, title: "Banking Affects You Activity", component: Page5 },
  { id: 6, title: "Scenario 1: Overdraft Protection", component: Page6 },
  { id: 7, title: "Scenario 2: Linked Accounts", component: Page7 },
  { id: 8, title: "Scenario 3: Daily Notifications", component: Page8 },
  { id: 9, title: "Your Response Pattern", component: Page9 },
  { id: 10, title: "Unit 3 Complete!", component: Page10 }
];