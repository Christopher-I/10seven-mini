/**
 * Pages 31-35: Historical Context, Unbanked, Predatory Lending, Community Solutions, and Takeaways
 * Educational content per Track 1 / Module 2: "It's a Big Bank World"
 *
 * NOTE: Old Page 31 "The Unbanked" content MOVED to Page 32
 * NOTE: Old Page 32 "Predatory Lending" content MOVED to Page 33
 * NOTE: Lawsuits and overdraft elimination content WILL BE ADDED to Pages 34-35
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
  BankFeesIllustration,
  AccountClosureIllustration,
  AlternativeFinancialIllustration,
  DigitalBankingIllustration
} from '../../components/FinancialIllustrations';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// Page 31: If it seems unfair, that's because it is
export function Page31({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            If it seems unfair, that's because it is.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              There has been a significant increase in the number of fees since the 1990s as banks continually put their profits over the well-being of their customers. The average overdraft charge in 1998 was $21.57; by the mid-2000s the standard fee was $35 (Servon, 2017); today the average overdraft is closer to $26 according to a study conducted by Bankrate. From fees for paper statements, checks, and replacement cards, banks have found many sneaky but legal ways to make extra money (Servon, 2017).
            </Text>

            <Text className="text-lg text-gray-700">
              Practices like debit resequencing mean you may end up paying them more often, and banks can make more money off of your vulnerable financial situation.
            </Text>

            <ContentBox variant="callout" className="bg-[#2E1E72] border-none p-6">
              <Text className="text-xl font-bold text-white text-center">
                You are not unsavvy–you are at the mercy of legalese and the supercomputer reordering your transactions. Your personal financial situation has been pitted against an institution that makes billions of dollars and reorders transactions to deliver more value for its shareholders.
              </Text>
            </ContentBox>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 31 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 32: The Unbanked - For many, these fees make them feel it's not worth it to open a traditional bank account
export function Page32({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            For many, these fees make them feel it's not worth it to open a traditional bank account.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Fees are one of the reasons that, for many, being "unbanked" is cheaper and easier (FDIC, 2023).
            </Text>

            <div className="space-y-4">
              <Text className="text-lg text-gray-700">
                The FDIC conducts a national survey every year on unbanked or underbanked households in the US. While the number has gone down over recent years, 4.2% of US households (or 5.6M households) are considered unbanked or underbanked. A household is considered unbanked if no one in the household has a savings or checking account with a bank or credit union.
              </Text>

              <Text className="text-lg text-gray-700">
                The rate is much higher among Black, Hispanic, and American Indian or Alaska Native households, as well as lower-income households, households with a disability, single-parent households, and/or households where income was more variable.
              </Text>

              <Text className="text-lg text-gray-700">
                33.4% of unbanked households cited a fee-related reason for not having a bank account, such as "Bank account fees are too high/unpredictable."
              </Text>

              <Text className="text-lg text-gray-700">
                Given what we just walked through, it makes a lot of sense that people would make this choice.
              </Text>
            </div>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 32 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 33: Alternative Financial Institutions - So what do the unbanked do instead?
export function Page33({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            So what do the unbanked do instead?
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Many go to alternative financial institutions (AFIs) or seek out alternative financial services (AFS).
            </Text>

            <Text className="text-lg text-gray-700">
              Alternative Financial Institutions (AFIs) and Alternative Financial Services (AFS) offer financial solutions outside traditional banking systems, often catering, even advertising, to low-income or unbanked populations. These institutions also cater to consumers who may just have no interest in engaging with the traditional banking systems.
            </Text>

            <div className="my-6">
              <Text className="text-xl font-semibold text-gray-900 mb-4">
                Types of AFIs and AFS include:
              </Text>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Payday Lenders:</Text>
                    <Text className="text-gray-700">Provide short-term loans with high interest rates.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Check Cashers:</Text>
                    <Text className="text-gray-700">Cash checks for a fee, primarily for those without bank accounts.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Pawnshops:</Text>
                    <Text className="text-gray-700">Offer secured loans where personal items serve as collateral.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Car Title Lenders:</Text>
                    <Text className="text-gray-700">Provide loans secured by a vehicle's title, often with high interest rates.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Rent-to-Own Stores:</Text>
                    <Text className="text-gray-700">Allow consumers to rent items with the option to purchase them later.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Money Orders and Bill Payment Services:</Text>
                    <Text className="text-gray-700">Used for sending money and paying bills without a traditional bank account.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Remittances:</Text>
                    <Text className="text-gray-700">Services for sending money internationally.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Prepaid Cards:</Text>
                    <Text className="text-gray-700">Marketed as alternatives to checking accounts, offering immediate liquidity.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Refund Anticipation Loans (RALs):</Text>
                    <Text className="text-gray-700">Short-term loans secured by expected tax refunds.</Text>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text className="font-semibold text-gray-900">Other Credit Products:</Text>
                    <Text className="text-gray-700">Such as buy-here-pay-here auto financing.</Text>
                  </div>
                </div>
              </div>
            </div>

            <ContentBox variant="callout" className="bg-blue-50 border border-blue-200">
              <Text className="text-xl font-semibold text-gray-900 mb-3">
                Characteristics of AFIs:
              </Text>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Text className="font-semibold text-gray-900">Accessibility:</Text>
                  <Text className="text-gray-700">Generally easier to access with fewer requirements for credit checks or income verification.</Text>
                </div>
                <div className="flex items-start space-x-2">
                  <Text className="font-semibold text-gray-900">Higher Costs:</Text>
                  <Text className="text-gray-700">Often charge significantly higher fees and interest rates, which can lead to debt traps.</Text>
                </div>
                <div className="flex items-start space-x-2">
                  <Text className="font-semibold text-gray-900">Regulatory Environment:</Text>
                  <Text className="text-gray-700">Typically operate with less strict regulations compared to traditional banks, raising consumer protection concerns.</Text>
                </div>
              </div>
            </ContentBox>

            <Text className="text-lg text-gray-700">
              AFIs and AFS play a role for individuals underserved by traditional banking, but it's important for consumers to be aware of the possible outcomes of engaging with these institutions. As we've learned, the traditional banking system can make it difficult for many consumers, so it makes sense why some choose AFIs and AFS. We hope this information will help you feel better equipped to navigate the experiences if you choose to engage with these types of institutions and the implications of doing so.
            </Text>
          </Stack>
        </ContentBox>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 33 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 34: Lawsuits and Regulatory Actions - Is anything being done about this?
export function Page34({ onStepComplete }: PageProps) {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const lawsuitCases = [
    {
      id: 'wells-fargo',
      bank: 'Wells Fargo',
      year: '2010',
      amount: '$203M',
      description: 'Wells Fargo paid $203M out to customers in California after a federal judge found that the bank had "manipulated transactions" to charge more overdraft fees. Essentially, they were practicing debit resequencing (Martin and Lieber, 2010; Alsup, 2010).',
      judgeQuote: `Overdraft fees are the second-largest source of revenue for Wells Fargo's consumer deposits group, the division of the bank dedicated to providing customers with checking accounts, savings accounts, and debit cards. The revenue generated from these fees has been massive. In California alone, Wells Fargo assessed over $1.4 billion in overdraft penalties between 2005 and 2007. Only spread income — money the bank generated using deposited funds — produced more revenue.

This "including and deleting" practice involved the inclusion and deletion of pending debit-card transactions in the calculation of a customer's available balance. This action does not challenge the amount of a single overdraft fee (currently $35). That is accepted as a given. Rather, the essence of this case is that Wells Fargo has devised a bookkeeping device to turn what would ordinarily be one overdraft into as many as ten overdrafts, thereby dramatically multiplying the number of fees the bank can extract from a single mistake. The draconian impact of this bookkeeping device has then been exacerbated through closely allied practices specifically "engineered" — as the bank put it — to multiply the adverse impact of this bookkeeping device. These neat tricks generated colossal sums per year in additional overdraft fees, just as the internal bank memos had predicted. The bank went to considerable effort to hide these manipulations while constructing a facade of phony disclosure. This order holds that these manipulations were and continue to be unfair and deceptive in violation of Section 17200 of the California Business and Professions Code. For the certified class of California depositors, the bookkeeping device will be enjoined and restitution ordered (Alsup, 2010).`
    },
    {
      id: 'jpmorgan-boa',
      bank: 'JP Morgan & Bank of America',
      year: '2012',
      amount: '$520M combined',
      description: 'JP Morgan, Bank of America, and several other banks were part of a nationwide lawsuit that accused them of reordering transactions from largest to smallest in order to maximize overdraft fees. JP Morgan paid out $110M and Bank of America paid out $410M (Stempel, 2012; Anderson, 2011).'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Is anything being done about this?
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Public pressure, lawsuits, and action from the Consumer Financial Protection Bureau have caused some major banks to think more critically about predatory fees and practices such as debit resequencing or reduce their occurrence altogether.
            </Text>

            <div className="space-y-4 my-6">
              {lawsuitCases.map((case_) => (
                <div
                  key={case_.id}
                  onClick={() => setSelectedCase(selectedCase === case_.id ? null : case_.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCase === case_.id
                      ? 'border-[#2E1E72] bg-[#F8F6FF]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{case_.bank}</h3>
                    <span className="text-sm font-medium text-[#2E1E72]">{case_.year}</span>
                  </div>
                  <p className="text-lg font-bold text-red-600 mb-3">{case_.amount}</p>

                  {selectedCase === case_.id && (
                    <div className="space-y-4">
                      <p className="text-gray-700">{case_.description}</p>
                      {case_.judgeQuote && (
                        <div className="bg-gray-50 border-l-4 border-[#2E1E72] p-4 rounded">
                          <p className="text-sm font-semibold text-gray-900 mb-2">The judge wrote in his summary:</p>
                          <p className="text-sm text-gray-700 italic whitespace-pre-line">{case_.judgeQuote}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedCase !== case_.id && (
                    <p className="text-[#2E1E72] font-medium">Click to learn more →</p>
                  )}
                </div>
              ))}
            </div>

            <ContentBox variant="callout" className="bg-blue-50 border border-blue-200">
              <Text className="font-semibold text-gray-900 mb-2">
                CFPB Actions
              </Text>
              <Text className="text-gray-700 mb-3">
                In 2022, the Consumer Financial Protection Bureau issued guidance around surprise overdraft fees and depositor fees, suggesting they may violate the Consumer Financial Protection Act if consumers cannot reasonably avoid getting charged (CFPB). A more recent move by the CFPB in 2024 sought to cap overdraft fees at $5 (CFPB, 2024), which was scheduled to take effect on 10/1/2025. However, the Trump administration reversed this ruling, and banks are still allowed to charge you what they want when they overdraft (Bell, 2025).
              </Text>
            </ContentBox>
          </Stack>
        </ContentBox>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 34 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 35: Banks Eliminating Overdraft Fees
export function Page35({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Some banks have eliminated overdraft fees altogether or significantly reduced them.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Revenue across banks from overdraft fees has been cut significantly in recent years due to many larger banks changing their fee practices (likely after getting hit with lawsuits and dealing with very unhappy customers) (CFPB 2024).
            </Text>

            <Text className="text-lg text-gray-700">
              Some banks that have eliminated overdraft fees and overdraft include Capital One, Ally Bank, Citibank and Alliant Credit Union (Vise, 2025).
            </Text>

            <ContentBox variant="callout" className="bg-yellow-50 border border-yellow-200">
              <Text className="font-semibold text-gray-900 mb-2">
                Something worth noting:
              </Text>
              <Text className="text-gray-700">
                These accounts may be advertised as completely fee-free, and that likely is the case. However, there are likely tradeoffs. For example, many of these accounts do not have all of the features of traditional checking accounts, such as they cannot complete money transfers like wires or you are not able to get checks for those accounts. While these are an alternative option, we invite you to compare these accounts to the other offered accounts and consider which account best meets your needs.
              </Text>
            </ContentBox>
          </Stack>
        </ContentBox>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 35 of 43</p>
        </div>
      </Stack>
    </div>
  );
}