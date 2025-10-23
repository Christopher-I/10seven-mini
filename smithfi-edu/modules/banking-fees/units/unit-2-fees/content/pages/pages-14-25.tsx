/**
 * Pages 14-25: Banking History and Context
 * Educational content about banking history, institutions, and fee structures
 */

'use client';

import { useState } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import {
  ContentBox,
  Text,
  Stack,
  Center,
  UnifiedHeading,
  PageNavigation
} from '@/core/design-system';
import {
  BankingEmotionsIllustration,
  BankingHistoryIllustration,
  BankEcosystemIllustration,
  BankProfitsIllustration,
  BankFeesIllustration
} from '../../components/FinancialIllustrations';
import { BankStatement } from '../../activities/BankStatement';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// Page 14: Banking Emotions Transition
export function Page14({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="text-center space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          Banking can bring up a range of emotions! And that's ok.
        </h2>

        <div className="flex justify-center mb-8">
          <BankingEmotionsIllustration size="xl" />
        </div>

        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Maybe you're new to banking or maybe you already have a history engaging with banks.
            No matter where you're at, this unit aims to give you helpful information so you can
            understand the history of banks and how they've become central to participating in the economy.
          </p>
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 14 of 43</p>
        </div>
      </div>
    </div>
  );
}

// Page 15: Banking History Introduction
export function Page15({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-40 md:pb-6">
      <div className="text-center space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          Banking in the US has a long and complex history.
        </h2>

        <div className="flex justify-center mb-8">
          <BankingHistoryIllustration size="lg" />
        </div>

        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Here's a quick overview. Understanding the origins of banking in the US helps put the content of this unit in perspective.
          </p>
        </div>

      </div>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 15 of 43</p>
      </div>
    </div>
  );
}

// Page 16: Banking History Details
export function Page16({ onStepComplete }: PageProps) {
  const timelineEvents = [
    { year: '1781', event: 'Bank of North America', description: 'First commercial bank in the U.S.' },
    { year: '1791', event: 'First Bank of the United States', description: 'Central bank to manage government debt and currency.' },
    { year: '1863', event: 'National Banking Act', description: 'Established national banks and a uniform currency.' },
    { year: '1913', event: 'Federal Reserve Act', description: 'Created the Federal Reserve System for monetary regulation.' },
    { year: '1999', event: 'Repeal of Glass-Steagall Act', description: 'Allowed commercial and investment banks to merge.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6 pb-32 md:pb-6">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            The History of Banking in the U.S.
          </h2>
          <p className="text-lg text-gray-700">
            The history of banking in the U.S. dates back to the late 1700s, beginning with the establishment
            of the Bank of North America in 1782. Over the years, the banking system evolved through various phases,
            including the creation of the First and Second Banks of the United States, the rise of state-chartered banks,
            and significant reforms like the establishment of the Federal Reserve in 1913 and the Glass-Steagall Act in 1933.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-transparent rounded-xl px-2 sm:px-4 md:px-6 py-4 md:py-6 space-y-8">
              {/* YouTube Video */}
              <div className="mb-8">
                <h3 className="text-[28px] font-playfair font-semibold text-gray-900 mb-4">Watch: The History of Banking</h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/CfqFZJUcW1g"
                    title="The History of Banking"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[28px] font-playfair font-semibold text-gray-900 mb-3">Early Beginnings (1780s-1800s)</h3>
                <p className="text-gray-700 mb-2">
                  <strong>First Banks:</strong> The first bank, the Bank of Pennsylvania, was established in 1780 to fund the Revolutionary War.
                  The Bank of North America followed in 1782 as the first commercial bank.
                </p>
                <p className="text-gray-700">
                  <strong>Central Banking:</strong> In 1791, the First Bank of the United States was created under Treasury Secretary
                  Alexander Hamilton to stabilize the economy and manage government debt.
                </p>
              </div>

              <div>
                <h3 className="text-[28px] font-playfair font-semibold text-gray-900 mb-3">Expansion and Regulation (1800s-1900s)</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Free Banking Era:</strong> From 1837 to 1863, the "free banking" era allowed states to charter banks
                  without federal oversight, leading to instability and bank failures.
                </p>
                <p className="text-gray-700">
                  <strong>National Banking Act of 1863:</strong> This act established a system of national banks and a uniform
                  national currency, addressing the chaos of state-chartered banks.
                </p>
              </div>

              <div>
                <h3 className="text-[28px] font-playfair font-semibold text-gray-900 mb-3">The Federal Reserve and Modern Banking (1913-Present)</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Federal Reserve System:</strong> Established in 1913, the Federal Reserve serves as the central bank,
                  regulating monetary policy and providing financial stability.
                </p>
                <p className="text-gray-700">
                  <strong>Deregulation:</strong> The late 20th century saw significant deregulation, including the repeal of the
                  Glass-Steagall Act in 1999, which had separated commercial and investment banking.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-transparent rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Events Timeline</h3>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-[#2E1E72] pl-4">
                    <div className="text-sm font-semibold text-[#2E1E72]">{event.year}</div>
                    <div className="text-sm font-medium text-gray-900">{event.event}</div>
                    <div className="text-xs text-gray-600">{event.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center my-6">
          <p className="text-lg text-gray-700">
            The banking system has continually adapted to meet the economic demands of the nation, reflecting changes in regulation, technology, and market dynamics.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Banks Grew Large</h3>
          <p className="text-gray-700 mb-4">
            Banks grew large for two main reasons (Servon, 2017):
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900">Deregulation:</h4>
              <p className="text-gray-700 text-sm">
                After the Great Crash of 1929, the Glass-Steagall Act prevented banks from engaging in both investment
                and commercial banking to minimize risk. However, in 1999, the Gramm-Leach-Bliley Act effectively nullified
                Glass-Steagall, allowing commercial banks, investment banks, securities firms, and insurance companies to merge and grow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Relaxed Branching Restrictions:</h4>
              <p className="text-gray-700 text-sm">
                Historically, nearly all states restricted bank branching to protect consumers from monopolies. Most of these laws remained until the early 1980s. Once allowed
                to branch, banks expanded by opening new locations and acquiring smaller banks, leading to a significant decrease in very small banks and a tripling of very large banks between 1985 and 2013. This shift resulted in large multinational
                organizations with less connection to the communities and customers they served, often prioritizing profit over customer well-being.
              </p>
            </div>
          </div>
        </div>

      </div>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 16 of 43</p>
      </div>
    </div>
  );
}

// Page 17: Your Reaction
export function Page17({ onStepComplete }: PageProps) {
  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">Let's take a step back. Why do we have banks, anyway?</h2>

        <div className="flex justify-center my-8">
          <BankEcosystemIllustration size="xl" />
        </div>

        <Text className="text-gray-900">
          By definition, banks are "a chartered financial institution licensed to receive deposits and make loans, and may also provide other financial services such as wealth management, currency exchange, and safe deposit boxes" (Bradford 2020; Barone 2020).
        </Text>

        <ContentBox variant="definition" className="bg-transparent border-none">
          <Text className="text-gray-900">
            <strong>Reminder:</strong> The Federal Deposit Insurance Corporation is an independent agency that "insures deposits, examines and supervises financial institutions for safety and soundness and consumer protection, works to make large and complex financial institutions resolvable, and manages receiverships" (FDIC, 2020, para 1.). It was created after the bank failures of the Great Depression and insures bank deposits up to $250,000. Consumers are encouraged to verify that the bank you choose is FDIC-insured, but if that is not something you want to do, that's ok! At a minimum, it is important to understand that without FDIC insurance, you will not get to enjoy this insurance protection.
          </Text>
        </ContentBox>

        <Text className="text-gray-900">
          First and foremost, they allow us to pay for things.
        </Text>

        <div className="flex justify-center my-8">
          <img src="/Design/web/unit deisgn 4 icon 1.svg" alt="Payment icon" className="w-64 h-64" />
        </div>

        <Text className="text-gray-900">
          "[Banks] operate a payments system, and a modern economy cannot function well without an efficient payments system. We make most of our payments by writing checks, swiping credit cards issued by banks or tied to them, and by paying bills via online banking… We have confidence in bank money because we can exchange it at the bank or an ATM for legal tender. Banks are obligated to hold reserves of legal tender to make these exchanges when we request them" (Sylla, 2010, para. 2).
        </Text>

        <ContentBox variant="definition" className="bg-transparent border-none">
          <Text className="text-gray-900">
            <strong>Legal tender:</strong> "United States coins and currency (including Federal Reserve notes and circulating notes of Federal Reserve banks and national banks) are legal tender for all debts, public charges, taxes, and dues. Foreign gold or silver coins are not legal tender for debts" ("31 USC 5103: Legal Tender" 2024).
          </Text>
        </ContentBox>

        <Text className="text-gray-900">
          But they also enable lending and investing via financial intermediation.
        </Text>

        <div className="flex justify-center my-8">
          <img src="/Design/web/unit design 4, icon 2.svg" alt="Investing icon" className="w-64 h-64" />
        </div>

        <Text className="text-gray-900">
          "The second key function of banks is financial intermediation, lending or investing the money we deposit with them or credit they themselves create to business enterprises, households, and governments. This is the business side of banking. Most banks are profit-seeking corporations with stockholders who provide the equity capital needed to start and maintain a banking business. Banks make their profits and cover their expenses by charging borrowers more for loans than they pay depositors for keeping money in the bank" (Sylla, 2010, para 2.).
        </Text>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 17 of 43</p>
      </div>
    </Stack>
  );
}

// Page 18: Banks serve a variety of audiences, including you!
export function Page18({ onStepComplete }: PageProps) {
  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">Banks serve a variety of audiences, including you!</h2>

        <Text className="text-gray-900">
          Banks have relationships with individual consumers, small businesses, large corporations, and governments. They offer a variety of services that enable those groups to save, invest, and make payments.
        </Text>

        <Text className="text-gray-900">
          These days, consumer-focused advertising from banks has leaned heavily into themes of "empowering" their customers, being there "every step of the way," and making banking easy.
        </Text>

        <Stack spacing="lg" className="my-8">
          <div>
            <Text weight="bold" className="text-lg mb-3">U.S. Bank</Text>
            <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/CfqFZJUcW1g"
                title="U.S. Bank Commercial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <Text weight="bold" className="text-lg mb-3">Citizens</Text>
            <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/TxOSaTkOVq8"
                title="Citizens Bank Commercial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <Text weight="bold" className="text-lg mb-3">Wells Fargo:</Text>
            <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/a25L_ToVhD4"
                title="Wells Fargo Commercial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <Text weight="bold" className="text-lg mb-3">Bank of America</Text>
            <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/OrJZrXLaQJQ"
                title="Bank of America Commercial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <Text weight="bold" className="text-lg mb-3">ABC Bank.</Text>
            <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/xM9u96uk2mM"
                title="ABC Bank Parody Commercial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <Text className="italic text-gray-600">Okay, this is a parody…but eerily reminiscent of the other ads.</Text>
          </div>
        </Stack>

        <Text className="text-gray-900">
          With messages like this, it may seem as though the average person–and their hopes and dreams–are the main priority. This is very strategic marketing in a time when Americans' trust in US institutions, including banks, continues to decline (Deane, 2024).
        </Text>

        <Text className="text-gray-900">
          This is not to say that all banks automatically have ulterior motives, nor is it to say they aren't deserving of Americans' distrust. However, it is a good reminder that banks have a vested interest (no pun intended) in making themselves seem like approachable, accessible institutions. This helps them attract new customers and deepen existing customer relationships with services that contribute to their bottom line. These messages also make it seem less likely that you could have an adverse experience with your bank. And if you do, it's probably something you did.
        </Text>

        <Text className="text-gray-900">
          After all, getting to manage your money as you shift tax brackets, make investments, or start a business? That's valuable and worth competing for.
        </Text>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 18 of 43</p>
      </div>
    </Stack>
  );
}

// Page 19: But ultimately, banks answer to shareholders
export function Page19({ onStepComplete }: PageProps) {
  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
          But ultimately, banks answer to shareholders.
        </h2>

        <Text className="text-lg text-gray-900 mb-6">
          On an episode of The Office, Michael Scott travels to New York City. He's being recognized as a top manager at the Dunder Mifflin shareholder meeting, but the company is heading for bankruptcy, and shareholders are angry.
        </Text>

        {/* The Office Video */}
        <div className="my-8">
          <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/BNDmaJwDmeo"
              title="The Office - Shareholder Meeting"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="space-y-4">
          <Text className="text-lg text-gray-900">
            While the booing crowd might be exaggerated, the importance of shareholders is not. American corporate governance is rooted in a concept called shareholder capitalism, particularly since the turbulent business era of the 1980s (Brandt and Georgiou, 2016).
          </Text>

          <Text className="text-lg text-gray-900">
            Shareholder capitalism is defined as "a system, which gives the interests of shareholders the highest priority and will therefore first and foremost try to create maximum value for them" (Brandt and Georgiou, 2016, p. 5). This is often presented in contrast with stakeholder capitalism, which "considers interests of corporate groups other than just those of shareholders" (Brandt and Georgiou, 2016, pg. 6).
          </Text>

          <Text className="text-lg text-gray-900">
            In the US, the practice of shareholder capitalism is more commonly known as shareholder primacy. Banks have an obligation to maximize shareholder value–while there is no "one" law singularly encapsulates this, court decisions over the last few decades have legitimized this as the expected order of operations (Rhee, 2018).
          </Text>

          <Text className="text-lg text-gray-900">
            Because of shareholder primacy, regular consumers–the ones that those ads are speaking to–are secondary. Banks are beholden to this legal ideology, as shareholders can sue their own company if they feel like the company is not participating or acting on the idea of maximizing shareholder value (Barandan, 2017; Barandan, 2015; Martin, 2010).
          </Text>

          <ContentBox variant="callout" className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
            <Text className="text-lg text-gray-900 font-semibold">
              This is NOT excusing the behavior of banks or corporations, but it is important context for why banks operate the way they do. Pleasing shareholders means turning a profit.
            </Text>
          </ContentBox>
        </div>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 19 of 43</p>
      </div>
    </Stack>
  );
}

// Page 20: Shareholder primacy requires that banks prioritize profit over consumers' interests
export function Page20({ onStepComplete }: PageProps) {
  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">Shareholder primacy requires that banks prioritize profit over consumers' interests</h2>

        <Text className="text-lg text-gray-900 mb-4">
          This means that banks' board-appointed leaders are expected to take in more money than expenses. Banks make money in three main ways: the interest from lending to borrowers (i.e., interest paid to the bank from borrowers who got a mortgage or personal loan), bank fees, and other "nontraditional" services.
        </Text>

        {/* Academic Quote */}
        <ContentBox variant="callout" className="bg-gray-50 border-l-4 border-[#2E1E72] p-6 my-6">
          <Text className="text-gray-900 italic mb-2">
            "…The interest margin banks earn by intermediating between depositors and borrowers continues to be the primary source of profits for most banking companies. But banks also earn substantial amounts of noninterest income by charging their customers fees in exchange for a variety of financial services. Many of these financial services are traditional banking services: transaction services like checking and cash management; safekeeping services like insured deposit accounts and safety deposit boxes; investment services like trust accounts and long-run certificates of deposit (CDs); and insurance services like annuity contracts. In other traditional areas of banking—such as consumer lending and retail payments—the widespread application of new financial processes and pricing methods is generating increased amounts of fee income for many banks. And in recent years, banking companies have taken advantage of deregulation to generate substantial amounts of noninterest income from nontraditional activities like investment banking, securities brokerage, insurance agency and underwriting, and mutual fund sales"
          </Text>
          <Text className="text-sm text-gray-600 mt-2">
            (DeYoung and Rice, 2004, p. 34)
          </Text>
        </ContentBox>

        <Text className="text-lg text-gray-900">
          This unit is specifically about how bank fees may impact you as a bank customer, as they can have an immediate and often unexpected impact on your day-to-day finances.
        </Text>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 20 of 43</p>
      </div>
    </Stack>
  );
}

// Page 21: JPMorgan Chase Revenue Quiz
export function Page21({ onStepComplete }: PageProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onStepComplete?.({ quizAnswer: answer });
  };

  const answerOptions = [
    '10-20B',
    '20-30B',
    '30-40B',
    '40-50B',
    '50B+'
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">[Activity - mini quiz] Take a guess.</h2>

        <div className="flex justify-center my-8">
          <BankProfitsIllustration size="xl" />
        </div>

        <Text className="text-gray-900 mb-6">
          How much in revenue did JPMorgan Chase, the largest bank in the United States and in the world (Klebnikov, 2025), make in 2024? Select one.
        </Text>

        <Stack spacing="sm">
          {answerOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                selectedAnswer === option
                  ? 'border-[#2E1E72] bg-[#F8F6FF] text-[#2E1E72]'
                  : 'border-gray-200 hover:border-[#8577B7] hover:bg-[#F8F6FF]'
              }`}
            >
              <Text className={`font-medium ${selectedAnswer === option ? 'text-[#2E1E72]' : 'text-gray-900'}`}>
                {option}
              </Text>
            </button>
          ))}
        </Stack>
      </ContentBox>

      {selectedAnswer && (
        <Center>
          <AnimatedButton
            onClick={() => onStepComplete?.({ quizCompleted: true, selectedAnswer })}
            variant="primary"
            size="lg"
          >
            See the Answer →
          </AnimatedButton>
        </Center>
      )}

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 21 of 43</p>
      </div>
    </Stack>
  );
}

// Page 22: Bank Revenue Data
export function Page22({ onStepComplete }: PageProps) {
  const bankData = [
    {
      name: 'JP Morgan Chase',
      logo: '🏦',
      revenue: '$180.6B',
      netIncome: '$58.5B',
      source: '(JP Morgan Chase, 2025)'
    },
    {
      name: 'Bank of America',
      logo: '🏛️',
      revenue: '$101.9B',
      netIncome: '$27.1B',
      source: '(Bank of America, 2025)'
    },
    {
      name: 'Wells Fargo',
      logo: '🏦',
      revenue: '$82.3B',
      netIncome: '$19.7B',
      source: '(Wells Fargo, 2025)'
    },
    {
      name: 'CitiGroup',
      logo: '🏛️',
      revenue: '$81.1B',
      netIncome: '$12.7B',
      source: '(CitiGroup, 2025)'
    }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">[Show answer - as a new page or sub-page - consider including a table with the bank logo] The top 4 US banks made the following in revenue and net income in 2024.</h2>

        <div className="mt-6 bg-transparent rounded-lg border border-gray-200 overflow-hidden">
          {bankData.map((bank, index) => (
            <div
              key={index}
              className={`p-4 ${index !== bankData.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <Text weight="bold" className="text-gray-900">{bank.name}</Text>
                  <Text className="text-xs text-gray-600">{bank.source}</Text>
                </div>
                <div>
                  <Text className="text-sm text-gray-700 font-medium">Revenue</Text>
                  <Text className="text-gray-900 font-semibold">{bank.revenue}</Text>
                </div>
                <div>
                  <Text className="text-sm text-gray-700 font-medium">Net Income</Text>
                  <Text className="text-gray-900 font-semibold">{bank.netIncome}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Text className="text-gray-900 mt-6 mb-4">
          And their profits are only increasing.
        </Text>


        <Text className="text-gray-900 mb-4">
          [If possible, it would be great to show the graph titled "Chart 1 - Full Year Net Income" and add "Source: FDIC"]
        </Text>

        <Text className="text-gray-900 mb-4">
          Banks are seeing some of their biggest profits ever thanks to favorable market conditions, an administration friendly to corporations, and consumer spending (Saeedy, 2025). And as we reported, much of that is from bank fees directly affecting the individual consumer. Bank of America stated in their 2024 Annual Report that 45% of their 2024 total revenue came from fees (Bank of America, 2025).
        </Text>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 22 of 43</p>
      </div>
    </Stack>
  );
}

// Page 23: Content Check-in Quiz
export function Page23({ onStepComplete, stepData }: PageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(stepData?.currentQuestion || 0);
  const [answers, setAnswers] = useState<Record<number, any>>(stepData?.answers || {});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFeelingsWheel, setShowFeelingsWheel] = useState(false);

  const questions = [
    {
      id: 1,
      text: 'When a bank says it is FDIC-insured, that means____',
      type: 'single',
      options: [
        { text: 'They have special, protected bank accounts you can open.', correct: false },
        { text: 'Your credit card is insured in case you lose it.', correct: false },
        { text: 'Your deposits are insured for up to $250,000.', correct: true },
        { text: 'You can take money out of any bank or ATM without fees.', correct: false }
      ]
    },
    {
      id: 2,
      text: 'Banks earn revenue predominately from ______. Select all that apply.',
      type: 'multiple',
      options: [
        { text: 'Interest', correct: true },
        { text: 'Bank fees', correct: true },
        { text: 'Non-traditional activities like investment banking', correct: true },
        { text: 'Advertising', correct: false },
        { text: 'Cafes', correct: false }
      ]
    },
    {
      id: 3,
      text: 'American corporations are traditionally beholden to ______',
      type: 'single',
      options: [
        { text: 'Consumers', correct: false },
        { text: 'Business clients', correct: false },
        { text: 'The Shareholders', correct: true }
      ]
    },
    {
      id: 4,
      text: 'True or false. Banks are legally obligated to put their customers\' interest over all other business interests.',
      type: 'single',
      options: [
        { text: 'True', correct: false },
        { text: 'False', correct: true }
      ]
    },
    {
      id: 5,
      text: 'Let\'s check in to see how you\'re feeling about this. Look at this color wheel and identify what emotions you are experiencing having learned all of this.',
      type: 'text',
      hasFeelingsWheel: true
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    if (currentQ.type === 'single') {
      setAnswers({ ...answers, [currentQuestion]: optionIndex });
      setShowFeedback(true);
    } else if (currentQ.type === 'multiple') {
      const current = answers[currentQuestion] || [];
      const newAnswers = current.includes(optionIndex)
        ? current.filter((i: number) => i !== optionIndex)
        : [...current, optionIndex];
      setAnswers({ ...answers, [currentQuestion]: newAnswers });
    }
  };

  const handleTextChange = (text: string) => {
    setAnswers({ ...answers, [currentQuestion]: text });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      // Internal navigation - stay on Page 23
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      // Don't call onStepComplete - this keeps us on Page 23
    } else {
      // Quiz complete - move to Page 24
      onStepComplete?.({ quizCompleted: true, answers });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      // Internal navigation - stay on Page 23
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
      // Don't call onStepComplete - this keeps us on Page 23
    } else {
      // On first question - go back to Page 22
      onStepComplete?.({ goBackOnePage: true });
    }
  };

  const isAnswered = () => {
    if (currentQ.type === 'text') {
      return answers[currentQuestion]?.trim().length > 0;
    } else if (currentQ.type === 'multiple') {
      return answers[currentQuestion]?.length > 0;
    } else {
      return answers[currentQuestion] !== undefined;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        {currentQuestion === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-4">
              Okay, let's take a break to see if you are tracking.
            </h2>
            <p className="text-lg text-gray-700">
              This is a quick check-in to assess the content you've reviewed.
            </p>
          </div>
        )}

        <ContentBox variant="callout" className="bg-transparent border-none">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-[#2E1E72]">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex space-x-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-1 rounded ${
                      idx <= currentQuestion ? 'bg-[#2E1E72]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.text}
            </h3>

            {currentQ.type === 'text' ? (
              <div className="space-y-4">
                {currentQ.hasFeelingsWheel && (
                  <div className="mb-4">
                    <button
                      onClick={() => setShowFeelingsWheel(!showFeelingsWheel)}
                      className="text-[#2E1E72] underline hover:text-[#3B2A8F] font-medium"
                    >
                      Click here to view the Feelings Wheel
                    </button>
                    {showFeelingsWheel && (
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          The Feelings Wheel is a tool to help identify and articulate emotions. You can explore the full interactive wheel at{' '}
                          <a
                            href="https://feelingswheel.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2E1E72] underline hover:text-[#3B2A8F]"
                          >
                            FeelingsWheel.com
                          </a>
                        </p>
                        <div className="text-xs text-gray-500 italic">
                          Source: FeelingsWheel.com
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Share your thoughts here..."
                  className="w-full min-h-[150px] p-4 border-2 border-gray-300 rounded-lg focus:border-[#2E1E72] focus:outline-none resize-y"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {currentQ.options?.map((option, idx) => {
                  const isSelected = currentQ.type === 'multiple'
                    ? (answers[currentQuestion] || []).includes(idx)
                    : answers[currentQuestion] === idx;
                  const showCorrect = showFeedback && option.correct;
                  const showIncorrect = showFeedback && isSelected && !option.correct;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50'
                          : isSelected
                          ? 'border-[#2E1E72] bg-[#F8F6FF]'
                          : 'border-gray-200 hover:border-[#8577B7] hover:bg-[#F8F6FF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Text className={`font-medium ${
                          showCorrect
                            ? 'text-green-700'
                            : showIncorrect
                            ? 'text-red-700'
                            : isSelected
                            ? 'text-[#2E1E72]'
                            : 'text-gray-900'
                        }`}>
                          {option.text}
                        </Text>
                        {showCorrect && (
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {showIncorrect && (
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
                {currentQ.type === 'multiple' && (
                  <button
                    onClick={() => setShowFeedback(true)}
                    disabled={!isAnswered() || showFeedback}
                    className={`mt-4 px-6 py-3 rounded-lg font-medium ${
                      !isAnswered() || showFeedback
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#2E1E72] text-white hover:bg-[#3B2A8F] cursor-pointer'
                    }`}
                  >
                    Check Answers
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-[#2E1E72] text-[#2E1E72] hover:bg-[#F8F6FF] cursor-pointer'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered()}
              className={`px-6 py-3 rounded-lg font-medium ${
                !isAnswered()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2E1E72] text-white hover:bg-[#3B2A8F] cursor-pointer'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next →'}
            </button>
          </div>
        </ContentBox>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 23 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 24: Bank Fees Overview
export function Page24({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">Alright, let's talk bank fees.</h2>

        <div className="flex justify-center my-8">
          <BankFeesIllustration size="xl" />
        </div>

        <Text className="text-lg text-gray-900 mb-6">
          Let's think back to the fees you incurred in the earlier activity.
        </Text>

        {/* Bank Statement from Whack-A-Mole - using the same component as Page 2 */}
        <div className="my-8">
          <BankStatement />
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 24 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 25: Additional Bank Fees Overview
export function Page25({ onStepComplete }: PageProps) {
  const [hoveredFee, setHoveredFee] = useState<string | null>(null);

  const additionalFeeDefinitions = {
    maintenance: "A bank fee typically charged to your checking, savings, or money market account if you do not meet certain requirements, such as maintaining a minimum monthly balance or making direct deposits. However, some banks may charge a monthly maintenance fee automatically.",
    check: "Check Fees may occur when you cash a check at a bank or credit union that you do not have an account with.",
    nsf: "Insufficient Funds Fees (aka Returned Item Fees or Non-Sufficient Funds (NSF) fees) may occur when you don't have enough money in your checking account to cover an attempted check or online payment. Banks will usually charge a fee and reject the transaction (NSF Fees & Overdraft Protection, 2025).",
    foreign: "Foreign transaction fees are fees charged to credit cards for purchases made in foreign countries, usually 1% of the transaction cost (CFPB \"Financial Terms Glossary,\" 2025).",
    transfer: "Transfer fees occur when you move money from one bank account to another, either domestically or internationally, such as via wire transfer.",
    excessive: "Excessive transaction fees may occur if your bank sets a limit for the number of withdrawals per month out of your savings account. If you reach the maximum amount, the bank could charge you a fee. The fee may increase per withdrawal.",
    research: "Account Research fees may occur if you request an investigation of a specific transaction or issue in your account, usually upon request. This could include account history, transaction disputes, or lost deposits.",
    dormancy: "Dormancy fees or inactivity fees may occur when there is no activity in an account for an extended period of time (CFPB \"Financial Terms Glossary,\" 2025).",
    closing: "Account closing fees may occur if you close an account quickly after opening it. They may also charge a fee if you have outstanding balances (checks, fees, or automatic payments) that may bounce after an account closure."
  };

  const feesList = [
    { key: 'maintenance', title: 'Monthly maintenance fee' },
    { key: 'check', title: 'Check Fees' },
    { key: 'nsf', title: 'Insufficient Funds Fees' },
    { key: 'foreign', title: 'Foreign transaction fees' },
    { key: 'transfer', title: 'Transfer fees' },
    { key: 'excessive', title: 'Excessive transaction fees' },
    { key: 'research', title: 'Account Research fees' },
    { key: 'dormancy', title: 'Dormancy fees or inactivity fees' },
    { key: 'closing', title: 'Account closing fees' }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">[New sub Page] That's just the tip of the iceberg.</h2>

        <Text className="text-gray-900 mb-4">
          Overdraft fees and ATMs fees are often ones that people are most familiar with, but there are even more that you might not encounter until they happen.
        </Text>

        <Text className="text-gray-900 mb-6">
          Every bank is different, but each bank is required to publish out their fee structure. However, these documents can be hidden on their website or tedious and difficult to read. Here, we give you a detailed overview of what kinds of fees exist. Keep in mind that banks may use different terminology or even change the names of fees unexpectedly ("Overdraft and Account Fees | FDIC" 2024; Grandoni, 2011).
        </Text>

        <Text className="text-gray-900 mb-4">
          [Show as a continuation of the previous page of definitions; show the fee definition, allow user to roll over with their mouse, and bring up the full definition]
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feesList.map((fee) => (
            <ContentBox key={fee.key} variant="definition" className="bg-transparent border border-gray-200 rounded-lg p-4 h-fit">
              <div
                onMouseEnter={() => setHoveredFee(fee.key)}
                onMouseLeave={() => setHoveredFee(null)}
                className="cursor-help relative"
              >
                <Text weight="bold" className="text-gray-900 text-sm mb-2 block">{fee.title}</Text>
                <Text className="text-gray-600 text-xs">Hover for full definition</Text>

                {hoveredFee === fee.key && (
                  <div className="absolute z-10 w-80 max-w-sm p-4 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg left-0 top-full">
                    <Text className="text-sm text-gray-900">{additionalFeeDefinitions[fee.key as keyof typeof additionalFeeDefinitions]}</Text>
                    <div className="absolute top-0 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white transform -translate-y-2"></div>
                  </div>
                )}
              </div>
            </ContentBox>
          ))}
        </div>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />

      {/* Desktop Page Number */}
      <div className="hidden md:block text-center mt-8">
        <p className="text-sm text-gray-500">Page 25 of 43</p>
      </div>
    </Stack>
  );
}