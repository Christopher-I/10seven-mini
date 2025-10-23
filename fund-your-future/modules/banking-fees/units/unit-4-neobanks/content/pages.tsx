/**
 * Unit 4: Neobank Nation - Page Configuration
 * Based on the official module documentation pages 30-36
 */

import React, { useState } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import { NeobankSwiper } from '../components/NeobankSwiper';
import {
  Stack,
  Center,
  Text,
  ContentBox,
  UnifiedHeading,
  UnitTitle,
  AccentHeading,
  Badge,
  Grid,
  UnifiedCard,
  List,
  ListItem,
  HeroCard
} from '@/core/design-system';

// Page 1: Introduction to Neobanks (Based on official documentation)
const Page1 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="md">
    <HeroCard>
      <UnitTitle level="h2">Neobank Nation</UnitTitle>
      <Text variant="large" semantic="white" className="mb-4 sm:mb-6">
        Neobanks and fintech brands have experienced astronomical rise in popularity in recent years.
      </Text>
      <Text semantic="white" className="mb-4">
        In many ways, this is not a bad thing. These companies tout that they are making banking and financial
        services accessible to everyone and responding to a need for increased digitization in the slow-moving financial industry.
      </Text>
      <Text semantic="white" className="mb-6">
        In this unit we'll talk about some of the more well-known neobanks and what you need to know if you
        are thinking of creating a relationship with them.
      </Text>
    </HeroCard>

    <ContentBox variant="callout" semantic="warning" border="accent" title="What is a neobank?">
      <Text>
        A neobank is <Text weight="bold" as="span">not an actual bank</Text>. Instead, they provide "banking-like" services without
        complying with the same regulatory and operational standards as licensed financial institutions.
      </Text>
    </ContentBox>

    <Text>
      They promise ease, convenience, and access. If you just had [insert app name here], your entire
      financial situation could change for the better!
    </Text>

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

// Page 2: Neobank Tinder Activity Setup
const Page2 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">Let's Play Neobank Tinder</UnifiedHeading>

    <Stack spacing="md">
      <Text>
        Just like the popular dating app, we're going to swipe through different neobanks to see which ones
        might be a good match for you.
      </Text>

      <ContentBox variant="callout" semantic="info" gradient title="How it works:">
        <Stack spacing="sm">
          <Stack direction="row" spacing="sm" align="center">
            <Badge variant="soft" semantic="error" size="sm">👈 Swipe Left</Badge>
            <Text className="text-white">Not interested / "Not for me"</Text>
          </Stack>
          <Stack direction="row" spacing="sm" align="center">
            <Badge variant="soft" semantic="success" size="sm">👉 Swipe Right</Badge>
            <Text className="text-white">Interested / "Tell me more"</Text>
          </Stack>
        </Stack>
      </ContentBox>

      <Text>
        We'll show you four popular neobanks: Chime, Dave, PayPal, and Cash App.
        Swipe based on your first impression!
      </Text>
    </Stack>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        🔥 Start Swiping
      </AnimatedButton>
    </Center>
  </Stack>
);

// Page 3: Interactive Tinder-Style Interface
const Page3 = ({ onStepComplete, stepData }: any) => {
  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2" className="text-center">
        Neobank Tinder
      </UnifiedHeading>
      <Text className="text-center" semantic="muted">
        Swipe right if you're interested, left if not!
      </Text>

      <NeobankSwiper
        onSwipingComplete={(results) => {
          onStepComplete({
            swipingComplete: true,
            swipeResults: results
          });
        }}
      />
    </Stack>
  );
};

// Page 4: Detailed Neobank Profiles
const Page4 = ({ onStepComplete, stepData }: any) => {
  const swipeResults = stepData?.page_3?.swipeResults || {};

  // Handle new enhanced result format
  const getInterestedBanks = () => {
    return Object.entries(swipeResults)
      .filter(([_, result]: [string, any]) => {
        // Check if it's the old format (string) or new format (object)
        if (typeof result === 'string') {
          return result === 'right';
        }
        // New format: check for initial swipe right
        return result?.initialSwipe === 'right';
      })
      .map(([bank, _]) => bank);
  };

  const getMatchedBanks = () => {
    return Object.entries(swipeResults)
      .filter(([_, result]: [string, any]) => {
        if (typeof result === 'string') {
          return result === 'right';
        }
        // New format: check for final match decision
        return result?.finalDecision === 'match' ||
               (result?.initialSwipe === 'right' && result?.finalDecision !== 'pass');
      })
      .map(([bank, _]) => bank);
  };

  const interestedBanks = getInterestedBanks();
  const matchedBanks = getMatchedBanks();

  const neobankDetails = {
    chime: {
      name: "Chime",
      description: "Chime markets itself as 'uniting everyday people to unlock financial progress.' The #1 most loved banking app.",
      marketingClaims: [
        "Everyday, fee-free banking",
        "The #1 most loved banking app",
        "Get up to $500 of your pay with MyPay",
        "Get paid up to 2 days early with direct deposit",
        "Build credit history with no annual fees or interest"
      ],
      reality: [
        "Fee-free ATMs: Chime boasts over 50k+ fee-free ATMs. However, there are an estimated 520K-540K ATMs in the US, meaning you will likely still encounter ATMs where you have to pay an out-of-network ATM fee.",
        "Fee-free Cash Deposits: You can deposit cash for free at Walgreens. Other retail partners that provide this service will incur a fee.",
        "SpotMe service is essentially an overdraft coverage plan where they will allow you to overdraft up to $200 if you have Chime+. Chime+ members have to meet certain direct deposit requirements.",
        "'Get paid 2 days early' really only means that the bank provides the funds when your employer provides the deposit information vs. waiting for the funds to clear."
      ],
      controversies: [
        "Over the past few years, Chime has closed thousands of customer accounts without warning.",
        "In 2024, the CFPB got involved after finding that Chime was withholding account closure refunds after 14 days.",
        "In 2019, after an outage prevented customers from accessing their accounts, the California Department of Financial Protection and Innovation found that Chime had illegally described itself as a bank.",
        "Bancorp Bank and Stride Bank, which are both FDIC-insured, do the actual banking and money-holding. Chime is essentially just a digital app."
      ]
    },
    dave: {
      name: "Dave",
      description: "Dave markets itself as 'building products that level the financial playing field.'",
      marketingClaims: [
        "Up to $500 in 5 min or less",
        "Get cash instantly with Dave Checking",
        "Spend on your terms",
        "Find 1K+ ways to earn",
        "No hidden fees"
      ],
      reality: [
        "ExtraCash™ program: You can access 'interest-free money' (cash advance). You do not get $500 just for joining Dave. You will have to pay it back eventually, and there are penalties if you don't.",
        "Using ExtraCash™ will cost you $1 a month, and there's an 'Express Fee' to get instant access to the money. This could also impact your credit.",
        "'Get $500 of your pay' is a cash advance. They will allow you to borrow money for 'unexpected' expenses if you are waiting on a paycheck, then deduct the amount when your direct deposit comes through.",
        "The Surveys feature lets customers take surveys and earn cash. This survey feature is through a partnership with inBrain.ai, an AI-powered app monetization company owned by Dyanta, one of the world's biggest data collection companies."
      ],
      controversies: [
        "The FTC came after Dave in 2024, claiming Dave misled customers about cash advance amounts, charging undisclosed fees, and charging 'tips' to customers without their knowledge.",
        "In response, Dave announced a simplified fee structure in 2025. So there are fees, they just aren't hidden anymore.",
        "Both InBrain.ai and Dynata claim they are legally allowed to sell your data, according to their privacy policies.",
        "Banking is handled by FDIC-insured banks, Evolve Bank and Trust. Dave is not actually a bank."
      ]
    },
    paypal: {
      name: "PayPal",
      description: "PayPal leverages its brand familiarity in payments to offer banking services: 'manage all your money with our app.'",
      marketingClaims: [
        "Get your paycheck early",
        "Shop securely and earn cash back",
        "Put money aside in PayPal Savings and watch your money grow",
        "Enjoy now, pay later with PayPal Pay in 4",
        "Crypto the easy way"
      ],
      reality: [
        "PayPal Debit and Credit Cards: You will still have to pay an ATM fee if the ATM is not a Moneypass ATM.",
        "In terms of credit cards, the average APR in the US is about 22% but PayPal's is 30.39% as of 3/31/2025.",
        "Savings accounts: PayPal Savings is made possible by FDIC-insured Synchrony Bank. Neobanks typically have lower overhead costs, which allows them to offer higher interest rates than the average bank because they aren't actually banks.",
        "PayPal partners with FDIC-insured banks like Wells Fargo, Goldman Sachs, and JPMorgan Chase.",
        "Venmo was purchased by PayPal in 2013 and offers similar banking-like products."
      ],
      controversies: [
        "Brand familiarity and existing trust is a key factor in convincing customers to 'bank' with PayPal.",
        "PayPal is still not a bank. It partners with FDIC-insured banks like Wells Fargo, Goldman Sachs, and JPMorgan Chase.",
        "The reason they have lower overhead is because they aren't actually banks."
      ]
    },
    cashapp: {
      name: "Cash App",
      description: "Cash App markets itself as 'redefining the world's relationship with money by making it more relatable, instantly available, and universally accessible.'",
      marketingClaims: [
        "Bank without all the fees–send, save, spend and grow your money how you want",
        "A better way to manage your money",
        "Get the best parts of Cash App when you direct deposit $300 in paychecks each month",
        "Choose the most flexible way to pay over time with no hidden fees or impact on your credit score",
        "A no-hidden-fee debit card with instant discounts"
      ],
      reality: [
        "Cash App is extending its brand credibility in the send/receive money space to banking.",
        "Cash App is not a bank–it partners with FDIC-insured banks to provide these services.",
        "Cash App does not require a bank account to use in the first place–so many people who do not have bank accounts may use Cash App as a bank-like service already.",
        "The CEO of Block, which owns Cash App, said in 2024 that they are specifically targeting existing Cash App users, who tend to be younger and lower income, with these banking offerings."
      ],
      controversies: [
        "In 2021, Cash App paid out $15M to customers after a data breach.",
        "In 2025, the CFPB ordered Cash App to pay $175M due to failure to properly investigate fraud claims.",
        "Recent lawsuits raise concerns around privacy, security, and fraud disputes."
      ]
    }
  };

  return (
    <Stack spacing="md">
      <UnifiedHeading variant="default" level="h2">Your Neobank Results</UnifiedHeading>

      {matchedBanks.length > 0 && (
        <UnifiedCard variant="neutral" semantic="success" border="default">
          <Stack spacing="sm">
            <UnifiedHeading variant="section" level="h3">🎉 Your Final Matches!</UnifiedHeading>
            <Text semantic="success">
              After considering all factors, you matched with {matchedBanks.length} neobank{matchedBanks.length > 1 ? 's' : ''}:
            </Text>
            <Stack spacing="sm">
              {matchedBanks.map((bankKey) => {
                const bank = neobankDetails[bankKey as keyof typeof neobankDetails];
                const result = swipeResults[bankKey];
                return (
                  <UnifiedCard key={bankKey} variant="summary" border="thick" semantic="success">
                    <Stack spacing="xs">
                      <UnifiedHeading variant="default" level="h4">{bank.name}</UnifiedHeading>
                      <Text variant="small" semantic="muted">{bank.description}</Text>
                      {result && typeof result === 'object' && result.considerationsViewed && (
                        <Text variant="xs" semantic="success">
                          ✓ Reviewed {result.considerationsViewed.length} consideration{result.considerationsViewed.length > 1 ? 's' : ''}
                        </Text>
                      )}
                    </Stack>
                  </UnifiedCard>
                );
              })}
            </Stack>
          </Stack>
        </UnifiedCard>
      )}

      {interestedBanks.length === 0 ? (
        <UnifiedCard variant="neutral" className="text-center py-8">
          <Text semantic="muted" className="mb-4">
            You didn't show interest in any neobanks. That's okay!
            Let's learn about them anyway.
          </Text>
          <Stack spacing="md">
            {Object.values(neobankDetails).map((bank, index) => (
              <UnifiedCard key={index} variant="summary">
                <Stack spacing="sm">
                  <UnifiedHeading variant="section" level="h3">{bank.name}</UnifiedHeading>
                  <Text semantic="muted" className="mb-4">{bank.description}</Text>
                  <Grid cols={2} gap="md">
                    <Stack spacing="xs">
                      <Text weight="medium" semantic="success" variant="small">Marketing Claims:</Text>
                      <List variant="bullet" spacing="xs">
                        {bank.marketingClaims.map((claim, i) => (
                          <ListItem key={i}>
                            <Text variant="small" semantic="success">{claim}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                    <Stack spacing="xs">
                      <Text weight="medium" semantic="warning" variant="small">Reality:</Text>
                      <List variant="bullet" spacing="xs">
                        {bank.reality.map((reality, i) => (
                          <ListItem key={i}>
                            <Text variant="small" semantic="warning">{reality}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </Grid>
                </Stack>
              </UnifiedCard>
            ))}
          </Stack>
        </UnifiedCard>
      ) : (
        <Stack spacing="md">
          {/* Show detailed information for all banks */}
          <Stack spacing="sm">
            <UnifiedHeading variant="section" level="h3">The Reality Behind the Marketing</UnifiedHeading>
            <Text semantic="muted" className="mb-6">
              Now that you've made your initial impressions, let's break down what these neobanks are really offering:
            </Text>
            <Stack spacing="lg">
              {Object.values(neobankDetails).map((bank, index) => (
                <UnifiedCard key={index} variant="elevated">
                  <ContentBox variant="empowerment" className="border-b">
                    <Stack spacing="xs">
                      <UnifiedHeading variant="section" level="h3">{bank.name}</UnifiedHeading>
                      <Text semantic="muted">{bank.description}</Text>
                    </Stack>
                  </ContentBox>

                  <Stack spacing="md" className="p-6">
                    <Grid cols={2} gap="md" >
                      <Stack spacing="sm">
                        <Text weight="semibold" semantic="success" className="flex items-center">
                          📢 What They Claim
                        </Text>
                        <List variant="bullet" spacing="xs">
                          {bank.marketingClaims.map((claim, i) => (
                            <ListItem key={i}>
                              <Text variant="small" semantic="success">{claim}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Stack>

                      <Stack spacing="sm">
                        <Text weight="semibold" semantic="warning" className="flex items-center">
                          🔍 The Reality
                        </Text>
                        <List variant="bullet" spacing="xs">
                          {bank.reality.map((reality, i) => (
                            <ListItem key={i}>
                              <Text variant="small" semantic="warning">{reality}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Stack>
                    </Grid>

                    {bank.controversies && bank.controversies.length > 0 && (
                      <ContentBox variant="callout" semantic="error" border="accent" className="mt-6">
                        <Stack spacing="sm">
                          <Text weight="semibold" semantic="error" className="flex items-center">
                            ⚠️ Important Considerations & Controversies
                          </Text>
                          <List variant="bullet" spacing="xs">
                            {bank.controversies.map((controversy, i) => (
                              <ListItem key={i}>
                                <Text variant="small" semantic="error">{controversy}</Text>
                              </ListItem>
                            ))}
                          </List>
                        </Stack>
                      </ContentBox>
                    )}
                  </Stack>
                </UnifiedCard>
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}

      <div className="text-center">
        <AnimatedButton
          onClick={() => onStepComplete({ pageViewed: true })}
          variant="primary"
          size="lg"
          showSuccessState={true}
        >
          Continue Learning →
        </AnimatedButton>
      </div>
    </Stack>
  );
};

// Page 5: Decision Framework (Based on documentation pages 35-36)
const Page5 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="md">
    <UnifiedHeading variant="default" level="h2">Important Things to Consider</UnifiedHeading>
    <Stack spacing="md">
      <Text variant="large">
        It's important to note that both traditional banks and neobanks have their fair share of lawsuits and concerns.
        In the US financial system, the goal is always to produce a profit, even if that is at the expense of customers.
      </Text>

      <Text>
        However, banking with a neobank comes with additional things to consider that could be mitigated with a traditional bank.
      </Text>

      <ContentBox variant="callout" semantic="warning" border="accent">
        <Text weight="semibold" semantic="warning">If you are considering banking with a Chime or Dave, consider these questions:</Text>
      </ContentBox>

      <Stack spacing="md">
        <UnifiedCard variant="summary">
          <Stack spacing="sm">
            <Text weight="semibold" variant="large">🤔 Does this feel too good to be true or make me feel nervous?</Text>
            <Text semantic="muted" className="leading-relaxed">
              Snappy branding and messaging make banking with a neobank seem easy and painless. Note how the examples we showed all
              use some of the same language, but with heavy asterisks. If you are intrigued by a particular offering, we encourage you to read
              the Terms and Conditions in detail. What will happen if you default on a cash advance? There are no hidden fees, but what fees can I
              expect? Do I have a fee-free ATM near me? Read everything before you sign up. And as we've seen with the examples
              provided, there could still be some unexpected fees and practices that weren't made clear before. Becoming a customer of a
              neobank is totally fine. We hope that you now just feel more equipped to participate as a customer given the reduced
              protections you are afforded.
            </Text>
          </Stack>
        </UnifiedCard>

        <UnifiedCard variant="summary">
          <Stack spacing="sm">
            <Text weight="semibold" variant="large">💰 What is my financial situation right now?</Text>
            <Text semantic="muted" className="leading-relaxed">
              Consider how you manage money and bank right now. Do you need regular access to cash and ATMs? Then a neobank might be
              limiting if you can't afford the fees for ATMs that aren't in their network. Do you have a negative past experience with Cash
              Advances? Engaging with a platform that makes them "simple" could feel anxiety-inducing or risky. Do you live in an area where
              you don't have ready access to physical banking services? Then a digital-forward option could be useful. It could be a neobank, but it
              could also be a direct bank like Ally Bank or Discover, which are online-only but FDIC-insured. And they have pretty high rates of
              satisfaction compared to traditional banks and neobanks. Plus, most banks have caught up with the times and provide digital apps and experiences that include features like budgeting tools, send/receive options, early direct deposit, and more.
            </Text>
          </Stack>
        </UnifiedCard>

        <UnifiedCard variant="summary">
          <Stack spacing="sm">
            <Text weight="semibold" variant="large">🆘 How much support do I think I will need, especially if something goes wrong?</Text>
            <Text semantic="muted" className="leading-relaxed">
              Neobanks are still behind traditional banks when it comes to security measures, customer support, fraud prevention, and
              advisory services. If you are someone who needs to be able to talk to a live human–either in person, on the phone, or via chat–a
              traditional bank will likely have better access to these services. Access to this kind of well-rounded support is essential in the
              event that something goes wrong, like a fraudulent charge or an account closure.
            </Text>
          </Stack>
        </UnifiedCard>

        <UnifiedCard variant="summary">
          <Stack spacing="sm">
            <Text weight="semibold" variant="large">🏦 Can a traditional bank offer me this same thing?</Text>
            <Text semantic="muted" className="leading-relaxed">
              Yes, neobanks offer cool apps, streamlined visuals, and in some cases, high interest rates on savings accounts. But most direct
              and traditional banks can offer you similar services, plus a larger apparatus of support and security.
            </Text>
            <Text semantic="muted" className="mt-3">
              Again, this is not to say that neobanks are bad and traditional/direct banks are good. It's merely to say that neobanks
              give the illusion of sophistication, but more often than not do not have enough protections in place for their customers, namely
              because they are not governed by the laws and regulations that traditional banks are. For example, are you still enticed by getting
              paid 2 days early? Major banks like Ally, Wells Fargo, Capital One, and more also offer this too. This ties back to really reading into
              the claims that neobanks make. Is it really that special–or is it just the really awesome branding?
            </Text>
          </Stack>
        </UnifiedCard>
      </Stack>
    </Stack>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ pageViewed: true })}
        variant="primary"
        size="lg"
        showSuccessState={true}
      >
        Complete Unit →
      </AnimatedButton>
    </Center>
  </Stack>
);

// Page 6: Unit Completion (Based on documentation conclusion)
const Page6 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="md">
    <UnifiedHeading variant="default" level="h2">Unit 4 Complete!</UnifiedHeading>
    <Stack spacing="md">
      <ContentBox variant="callout" semantic="info" border="accent">
        <Stack spacing="sm">
          <Text weight="semibold" semantic="info">What's the most important thing to remember?</Text>
          <Text variant="large" semantic="info">
            Do what you feel is in your financial best interest. Now that you have a better sense of the "fine print", we hope
            you feel better equipped to make a decision.
          </Text>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="success">
        <Stack spacing="sm">
          <Text weight="semibold" semantic="success">Key Takeaways:</Text>
          <List variant="bullet" spacing="sm">
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">A neobank is not an actual bank</Text> – they provide "banking-like" services without the same regulatory standards</Text>
            </ListItem>
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">Marketing vs Reality:</Text> Snappy branding often masks important limitations and fees</Text>
            </ListItem>
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">Reduced Protections:</Text> Neobanks operate with fewer consumer protections than traditional banks</Text>
            </ListItem>
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">Hidden Complexities:</Text> "Fee-free" and "early pay" claims often have significant asterisks</Text>
            </ListItem>
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">Support Limitations:</Text> Customer service and fraud protection are often inferior to traditional banks</Text>
            </ListItem>
            <ListItem>
              <Text semantic="success"><Text weight="bold" as="span">Alternative Options:</Text> Traditional banks now offer many similar digital features with better protections</Text>
            </ListItem>
          </List>
        </Stack>
      </ContentBox>

      <ContentBox variant="callout" semantic="warning" border="accent">
        <Stack spacing="sm">
          <Text weight="semibold" semantic="warning">💡 Remember</Text>
          <Text semantic="warning">
            Becoming a customer of a neobank is totally fine. We hope that you now just feel more
            equipped to participate as a customer given the reduced protections you are afforded.
            Always read the Terms and Conditions in detail and understand what you're agreeing to.
          </Text>
        </Stack>
      </ContentBox>

      <Text align="center" semantic="muted">
        Whether you choose a neobank or traditional bank, make sure your choice aligns with your financial
        situation and you understand exactly what you're signing up for.
      </Text>
    </Stack>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ completed: true })}
        variant="success"
        size="lg"
        showSuccessState={true}
      >
        🎉 Complete Unit 4
      </AnimatedButton>
    </Center>
  </Stack>
);

export const UNIT_4_PAGES = [
  { id: 1, title: "Neobank Nation", component: Page1 },
  { id: 2, title: "Let's Play Neobank Tinder", component: Page2 },
  { id: 3, title: "Neobank Tinder", component: Page3 },
  { id: 4, title: "The Reality Behind the Marketing", component: Page4 },
  { id: 5, title: "Important Things to Consider", component: Page5 },
  { id: 6, title: "Unit 4 Complete!", component: Page6 }
];