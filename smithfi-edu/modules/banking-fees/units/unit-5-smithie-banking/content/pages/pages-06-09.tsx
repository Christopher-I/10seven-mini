/**
 * Unit 5: Banking As a Smithie - Pages 6-9
 * Pre-departure banking, long-term considerations, emergency resources, and works cited (4 pages)
 */

'use client';

import { useState } from 'react';
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

// Page 6: Pre-Departure Banking Preparation
export function Page6({ onStepComplete }: PageProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const preparationItems = [
    'Set up US bank account for Smith stipends',
    'Check foreign transaction fees on current accounts',
    'Notify bank of travel abroad to prevent account freezing',
    'Research bank relationships in destination country',
    'Plan primary spending method (cash vs card)',
    'Understand ATM withdrawal fees abroad'
  ];

  const toggleItem = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleComplete = () => {
    if (checkedItems.length >= 4) {
      setCompleted(true);
      onStepComplete({
        page: 6,
        checkedItems,
        topic: 'Pre-Departure Banking',
        completed: true
      });
    }
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading level="h2" variant="default">
        Before you take off, it's important to ensure your financial ducks are in a row.
      </UnifiedHeading>

      <Stack spacing="lg">
        <ContentBox variant="callout" semantic="info" title="US Bank Account for Stipends">
          <Stack spacing="sm">
            <Text weight="bold">Have I received or will I receive any stipends or funding from Smith or other sources in the US?</Text>
            <Stack spacing="xs" className="ml-4">
              <Text>■ You'll need a US bank account to receive any stipends or payments through Smith, which will come via direct deposit.</Text>
              <Text>■ Any other funding sources (e.g., a job, family/friends) coming from the US should be directed to your US bank account.</Text>
            </Stack>
          </Stack>
        </ContentBox>

        <ContentBox variant="callout" semantic="warning" title="How does my current bank account work abroad?">
          <Stack spacing="sm">
            <Text>■ Most major US banks will allow you to use your credit and debit cards and withdraw cash from foreign ATMs, however the fees for these transactions can add up quickly.</Text>
            <Text>■ Some banks may require a heads up that you are traveling abroad so they don't see any foreign transactions as suspicious.</Text>
            <Text>■ Check to see if your bank has locations or relationships with local banks where you are headed.</Text>
            <Stack spacing="xs" className="ml-4">
              <Text>● Your bank may have a relationship in place that allows for saving on various fees or may allow you to easily access your bank account without having to go through another institution. For example, Bank of America has relationships with international banks that will allow you to save on certain fees. Citibank ATMs can be accessed in the US and many places abroad.</Text>
            </Stack>
          </Stack>
        </ContentBox>

        <ContentBox variant="callout" semantic="success" title="How will I be primarily spending my money?">
          <Stack spacing="sm">
            <Text>This will also depend on where you are studying abroad. If you are going to London, you won't have a problem using a card. If you are going to a less developed area, you may need to deal in the local currency.</Text>

            <Stack spacing="sm" className="ml-4">
              <Stack spacing="xs">
                <Text weight="bold">■ Cash</Text>
                <Stack spacing="xs" className="ml-4">
                  <Text>● Most US banks will conveniently allow you to withdraw cash in the local currency from a local ATM, but there are fees to do this. As such, we encourage you to look up what the fees may be so you can plan ahead.</Text>
                  <Text>● Currency exchanges can be helpful in a pinch and if you have significant American dollars on hand, but these also come with significant fees, which are typically higher than your bank's fees.</Text>
                </Stack>
              </Stack>

              <Stack spacing="xs">
                <Text weight="bold">■ Card</Text>
                <Stack spacing="xs" className="ml-4">
                  <Text>● Visa and Mastercard credit and debit cards are accepted virtually everywhere–200+ countries. If you don't have a Visa or Mastercard, check with your bank and credit card issuer where they might not be accepted.</Text>
                  <Text>● Check with your bank if your card will incur transaction fees with foreign charges. Cards billed as "travel" credit cards often have no foreign transaction fees, but check the fine print.</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </ContentBox>
      </Stack>

      <UnifiedHeading level="h3" variant="default">Pre-Departure Banking Checklist</UnifiedHeading>
      <Text>Check off items to prepare (complete at least 4):</Text>

      <Stack spacing="sm">
        {preparationItems.map((item, index) => (
          <Checkbox
            key={index}
            checked={checkedItems.includes(item)}
            onChange={() => toggleItem(item)}
          >
            {item}
          </Checkbox>
        ))}
      </Stack>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={checkedItems.length < 4 || completed}
          variant="success"
          size="lg"
        >
          {completed ? '✓ Complete' : `Complete ${Math.max(0, 4 - checkedItems.length)} More Items`}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 7: Long-term Abroad Considerations
export function Page7({ onStepComplete }: PageProps) {
  const [duration, setDuration] = useState<string>('');
  const [openForeignAccount, setOpenForeignAccount] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (duration) {
      setCompleted(true);
      onStepComplete({
        page: 7,
        duration,
        openForeignAccount,
        topic: 'Long-term Abroad Banking',
        completed: true
      });
    }
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading level="h2" variant="default">
        How long will I be away?
      </UnifiedHeading>

      <Text>
        You may be going for a semester or even a year. If you are going for longer, it may be helpful to open up a bank account abroad to manage your money without the fees.
      </Text>

      <ContentBox variant="callout" semantic="info" title="How long will you be abroad?">
        <RadioGroup
          options={[
            { value: 'One semester', label: 'One semester' },
            { value: 'One year', label: 'One year' },
            { value: 'Longer than one year', label: 'Longer than one year' },
            { value: 'Summer/interim program', label: 'Summer/interim program' }
          ]}
          value={duration}
          onChange={setDuration}
          semantic="info"
        />
      </ContentBox>

      <ContentBox variant="callout" semantic="info" title="Opening a bank account abroad could be helpful if…">
        <Stack spacing="xs">
          <Text>■ You are planning on staying for more than a semester.</Text>
          <Text>■ You risk accumulating foreign transaction fees with your credit card, debit card, or when you withdraw cash.</Text>
          <Text>■ You plan to work or earn money in the country you're traveling to. Maybe you've secured a cool internship or job that will take you abroad for a certain period of time. Many Smith students also participate in summer and interim programs abroad. Funding for these works differently but you should ask yourselves.</Text>
        </Stack>
      </ContentBox>

      {duration && (
        <Stack spacing="md">
          <ContentBox variant="callout" semantic="success" title="If you opt to open a bank account abroad, here's some general steps to follow">
            <Stack spacing="sm">
              <Stack spacing="xs">
                <Text weight="bold">Check the local banks' relationship with US institutions.</Text>
                <Text className="ml-4">■ If you have an existing US bank account, see which or plan to receive funds from US sources, you'll want to ensure that you can easily move money to your new bank account when needed or people can send you money from home.</Text>
              </Stack>

              <Stack spacing="xs">
                <Text weight="bold">Have documentation ready.</Text>
                <Text className="ml-4">You'll probably need</Text>
                <Stack spacing="xs" className="ml-8">
                  <Text>● A valid ID</Text>
                  <Text>● Proof of address</Text>
                  <Text>● Your visa documentation depending on the financial institution and what country you are in</Text>
                  <Text>● Money to deposit for you minimum requirement</Text>
                </Stack>
              </Stack>
            </Stack>
          </ContentBox>

          <Text variant="small" semantic="muted" className="italic">
            [Note: We can review opening and closing instructions as well as any fees that may arise if you think this is necessary or the Abroad office doesn't already have materials on this]
          </Text>
        </Stack>
      )}

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={!duration || completed}
          variant="success"
          size="lg"
        >
          {completed ? '✓ Complete' : 'Continue to Emergency Resources'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 8: Emergency Financial Assistance Reference
export function Page8({ onStepComplete }: PageProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 8,
      topic: 'Emergency Financial Assistance',
      completed: true
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading level="h2" variant="default">
        Emergency Financial Assistance
      </UnifiedHeading>

      <Text>
        If something happens where you run out of money or need more funds that are currently available to you, you have options.
      </Text>

      <ContentBox variant="callout" semantic="info" title="Smith College Emergency Resources">
        <Stack spacing="sm">
          <Text>
            Smith College provides several emergency financial assistance options for students facing unexpected financial difficulties:
          </Text>
          <Stack spacing="xs" className="ml-4">
            <Text>• <Text weight="bold" as="span">Student Financial Services:</Text> Contact for emergency loans and hardship funds</Text>
            <Text>• <Text weight="bold" as="span">Student Aid Office:</Text> Available for urgent financial counseling and assistance</Text>
            <Text>• <Text weight="bold" as="span">Dean of Students Office:</Text> Can help coordinate emergency support services</Text>
            <Text>• <Text weight="bold" as="span">International Students & Scholars Office:</Text> Specialized support for international students</Text>
          </Stack>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="success" title="When Studying Abroad">
        <Stack spacing="xs">
          <Text>• Contact the Study Abroad Office immediately if you encounter financial difficulties</Text>
          <Text>• Know your emergency contacts both at Smith and in your host country</Text>
          <Text>• Understand the process for emergency fund transfers</Text>
          <Text>• Keep backup payment methods and emergency cash accessible</Text>
          <Text>• Know how to contact your US bank's international support line</Text>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="error" title="Important Emergency Contacts">
        <Stack spacing="xs">
          <Text variant="small"><Text weight="bold" as="span">Smith Study Abroad Office:</Text> (413) 585-4905</Text>
          <Text variant="small"><Text weight="bold" as="span">Smith Campus Safety (24/7):</Text> (413) 585-2490</Text>
          <Text variant="small"><Text weight="bold" as="span">Student Financial Services:</Text> (413) 585-2530</Text>
          <Text variant="small"><Text weight="bold" as="span">Dean of Students Office:</Text> (413) 585-2130</Text>
          <Text variant="small"><Text weight="bold" as="span">Your Bank's International Support:</Text> [Check your specific bank's number]</Text>
          <Text variant="xs" className="pt-2">Save these numbers in your phone before departure and know the international dialing format.</Text>
        </Stack>
      </ContentBox>

      <Center>
        <AnimatedButton
          onClick={handleComplete}
          disabled={completed}
          variant="primary"
          size="lg"
        >
          {completed ? '✓ Complete' : 'Continue to Works Cited'}
        </AnimatedButton>
      </Center>
    </Stack>
  );
}

// Page 9: Works Cited
export function Page9({ onStepComplete }: PageProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onStepComplete({
      page: 9,
      topic: 'Banking As a Smithie Complete',
      unitCompleted: true,
      completed: true
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading level="h2" variant="default">
        Works Cited and Consulted for this Unit
      </UnifiedHeading>

      <ContentBox variant="summary">
        <Stack spacing="md">
          <UnifiedHeading level="h3" variant="default">Alphabetical Order</UnifiedHeading>
          <Stack spacing="xs">
            <Text variant="small">Consumer Financial Protection Bureau. (2024). "Banking products and services." Retrieved from https://www.consumerfinance.gov/consumer-tools/</Text>
            <Text variant="small">Smith College Student Financial Services. (2024). "Banking and financial resources for students." Smith College Official Documentation.</Text>
            <Text variant="small">Smith College Study Abroad Office. (2024). "Financial planning for study abroad." Smith College Official Documentation.</Text>
          </Stack>
        </Stack>
      </ContentBox>

      <ContentBox variant="summary">
        <Stack spacing="md">
          <UnifiedHeading level="h3" variant="default">Order of Appearance</UnifiedHeading>
          <Stack spacing="xs">
            <Text variant="small">Smith College Student Financial Services. (2024). "Banking and financial resources for students." Smith College Official Documentation.</Text>
            <Text variant="small">Smith College Study Abroad Office. (2024). "Financial planning for study abroad." Smith College Official Documentation.</Text>
            <Text variant="small">Consumer Financial Protection Bureau. (2024). "Banking products and services." Retrieved from https://www.consumerfinance.gov/consumer-tools/</Text>
          </Stack>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="success" title="Unit 5: Banking As a Smithie - Complete!">
        <Text>
          You've completed Unit 5 and learned about student banking accounts and managing finances while studying abroad as a Smith College student. You now understand account transitions, study abroad financial preparation, and emergency resources.
        </Text>
      </ContentBox>

      <ContentBox variant="completion">
        <Stack spacing="md" align="center">
          <UnifiedHeading level="h3" variant="default">Banking & Fees Module Complete! 🎊</UnifiedHeading>
          <Text align="center">
            You've completed all five units of the Banking & Fees module with Smith College-specific content.
          </Text>

          <AnimatedButton
            onClick={handleComplete}
            disabled={completed}
            variant="success"
            size="lg"
          >
            {completed ? '🎉 Module Complete!' : 'Complete Banking & Fees Module'}
          </AnimatedButton>
        </Stack>
      </ContentBox>
    </Stack>
  );
}