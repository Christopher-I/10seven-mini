/**
 * Pages 26-30: Banking History, Fee Context, and Overdraft Mechanics
 * Educational content per Track 1 / Module 2: "It's a Big Bank World"
 *
 * NOTE: Old content (lawsuits, overdraft elimination) WILL BE MOVED to pages 34-35 in next batch
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

interface Transaction {
  description: string;
  amount: number;
  balance: number;
  isOverdraft?: boolean;
  isFee?: boolean;
  note?: string;
}

// Page 26: Fees Are Embedded and Inevitable - S&L Crisis History
export function Page26({ onStepComplete }: PageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      content: 'In the 1980s, a major financial crisis hit a group of small banks called the Savings and Loan associations (S&Ls) (Robinson, 2013).'
    },
    {
      content: 'These banks mainly gave out home loans and were supposed to be "low-risk." But when interest rates suddenly rose in the late 1970s and early 1980s, S&Ls found themselves in a tough spot: they had to pay higher interest to depositors, but the money they were earning from older, low-interest home loans wasn\'t enough to cover it.'
    },
    {
      content: 'To help them survive, the government loosened the rules, allowing S&Ls to invest in riskier things. Unfortunately, that backfired. Many made poor choices or committed fraud, and more than 1,000 S&Ls failed, costing the government—and ultimately taxpayers—billions of dollars to fix the mess.'
    },
    {
      content: 'After the crisis, regulators forced banks to follow stricter rules, and many banks realized they couldn\'t rely just on interest from loans to make money. Consulting firms in the mid-nineties were able to convince their banking clients that charging customers fees for services like overdraft "protection" could be a huge moneymaker. Once they started seeing the revenue roll in from overdrafts, fees (for overdrafts and other everyday services) became standard practice (Servon 2017).'
    },
    {
      content: 'If we think back to what shareholder primacy dictates, we can better understand why banks would continue to add or raise fees to drive profits. In 2024, Bank of America reported that 45% of its $101.9B in revenues came from fees (Bank of America, 2024)!'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          In short, fees are embedded and inevitable in the banking experience.
        </h2>

        <div className="text-lg text-gray-700 mb-8">
          <p>Let's take a quick look at the history and reasoning behind this.</p>
        </div>

        {/* Carousel */}
        <div className="relative bg-gradient-to-br from-[#2E1E72] to-[#4A2FAA] rounded-2xl p-8 text-white shadow-xl">
          <div className="min-h-[250px] flex flex-col justify-between">
            <div className="mb-6">
              <p className="text-lg leading-relaxed">{slides[currentSlide].content}</p>
            </div>

            <div className="space-y-4">
              {/* Progress indicators */}
              <div className="flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    currentSlide === 0
                      ? 'bg-white/20 text-white/40 cursor-not-allowed'
                      : 'bg-white/20 text-white hover:bg-white/30 cursor-pointer'
                  }`}
                >
                  ← Previous
                </button>

                <span className="text-sm text-white/80">
                  {currentSlide + 1} of {slides.length}
                </span>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    currentSlide === slides.length - 1
                      ? 'bg-white/20 text-white/40 cursor-not-allowed'
                      : 'bg-white text-[#2E1E72] hover:bg-white/90 cursor-pointer'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg text-gray-700 mt-6">
          <p>
            Fees have become so rampant and excessive that financial institutions have faced new regulations and lawsuits. In response, many banks have implemented new practices and fee structures. More on that in a second.
          </p>
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 26 of 43</p>
        </div>
      </div>
    </div>
  );
}

// Page 27: Bank Fees Will Always Exist
export function Page27({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
            Bank fees will always exist...
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            …because banks strive to make a profit to satisfy their shareholders.
          </p>
        </div>

        {/* Big, Bold Text Block */}
        <div className="bg-[#2E1E72] text-white p-8 rounded-lg my-8">
          <p className="text-2xl font-bold mb-4">
            It's not your fault if you accumulate bank fees. It is not necessarily your fault if you overdraft.
          </p>
          <p className="text-lg">
            These practices are put in place to profit from people in vulnerable situations. Some people may rarely come up against bank fees. But others may get hit with them constantly. In fact, the CFPB has shown that fees disproportionately occur more for low-income, younger, and racially minoritized groups (CFPB, 2023).
          </p>
        </div>

        {/* Trevor Noah Introduction */}
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            While this clip is from 2022, Trevor Noah gave a darkly humorous overview of bank fees and the adverse impact it has on unsuspecting customers on the Daily Show. Towards the end of this unit, we'll discuss how these practices may elicit different emotional responses when they happen to us.
          </p>
        </div>

        {/* Video Embed */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Z0tx5e5Aoqk"
            title="Trevor Noah on Bank Fees"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 27 of 43</p>
        </div>
      </div>
    </div>
  );
}

// Page 28: Whack A Mole Statement - Debit Resequencing Revealed
export function Page28({ onStepComplete }: PageProps) {
  const [selectedView, setSelectedView] = useState<'actual' | 'bank'>('actual');

  const startingBalance = 1000;
  const atmFee = 4.86;
  const overdraftFee = 26.77;

  // Actual chronological order
  const actualTransactions: Transaction[] = [
    { description: 'Out-of-network ATM withdrawal', amount: -100, balance: 900 },
    { description: 'Utilities bill', amount: -50, balance: 850 },
    { description: 'Gas fill-up', amount: -50, balance: 800 },
    { description: 'Internet bill', amount: -50, balance: 750 },
    { description: 'Phone bill', amount: -50, balance: 700 },
    { description: 'Rent', amount: -500, balance: 200 },
    { description: 'Credit card payment', amount: -250, balance: -50, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -76.77, isFee: true },
    { description: 'Dinner with friends', amount: -50, balance: -126.77, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -153.54, isFee: true }
  ];

  // Bank's resequenced order (highest to lowest)
  const bankTransactions: Transaction[] = [
    { description: 'Rent', amount: -500, balance: 500 },
    { description: 'Credit card bill', amount: -250, balance: 250 },
    { description: 'Out-of-network ATM withdrawal', amount: -100, balance: 150 },
    { description: 'Out-of-network ATM Fee', amount: -4.86, balance: 145.14, note: 'This is the average ATM fee in the United States as of 2025. (Bennet, 2025). You had to withdraw from an out-of-network ATM in a pinch, and your bank charges a fee for that.' },
    { description: 'Utilities bill', amount: -50, balance: 95.14 },
    { description: 'Gas fill-up', amount: -50, balance: 45.14 },
    { description: 'Internet bill', amount: -50, balance: -4.86, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -31.63, isFee: true, note: 'This is the average overdraft fee in the United States as of 2025. (Bennet, 2025). Your account balance dropped below $0, so you were charged an overdraft fee.' },
    { description: 'Phone', amount: -50, balance: -81.63, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -108.40, isFee: true, note: 'This is the average overdraft fee in the United States as of 2025. (Bennet, 2025). Your account balance remained below $0, so you were charged another overdraft fee when you paid your next bill.' },
    { description: 'Dinner with Friends', amount: -50, balance: -158.40, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -185.17, isFee: true, note: 'This is the average overdraft fee in the United States as of 2025. (Bennet, 2025). Your account balance remained below $0, so you were charged another overdraft fee when you paid your share of dinner.' }
  ];

  const transactions = selectedView === 'actual' ? actualTransactions : bankTransactions;

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          Going back to the Whack A Mole activity and your resulting bank statement.
        </h2>

        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Did you notice that something else happened on your bank statement?
          </p>
          <p>
            Did you notice that the order of your purchases was rearranged? That's not the order you paid for things.
          </p>
        </div>

        {/* Toggle between views */}
        <div className="bg-[#E5DEEF] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compare the statements:</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={() => setSelectedView('actual')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                selectedView === 'actual'
                  ? 'bg-[#2E1E72] text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Actual Order (2 overdraft fees)
            </button>
            <button
              onClick={() => setSelectedView('bank')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                selectedView === 'bank'
                  ? 'bg-[#2E1E72] text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              Bank's Reordered (3 overdraft fees)
            </button>
          </div>
        </div>

        {/* Statement header */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b-2 border-gray-300">
            <h3 className="font-semibold text-gray-900">
              {selectedView === 'actual'
                ? "Here's the actual order of your expenses. In this case, you should have gotten charged only 2 overdraft fees."
                : "Here is the order of your expenses provided by your bank. The charges were ordered from highest to lowest and you got charged 3 overdraft fees."}
            </h3>
            <p className="text-sm text-gray-600 mt-2">Starting Balance: ${startingBalance.toFixed(2)}</p>
          </div>

          {/* Transactions */}
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className={`p-4 ${transaction.isOverdraft ? 'bg-red-50' : transaction.isFee ? 'bg-yellow-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className={`font-medium ${transaction.isFee ? 'text-red-600' : 'text-gray-900'}`}>
                      {transaction.description}
                    </p>
                    {transaction.note && (
                      <p className="text-sm text-gray-600 mt-2 italic border-l-2 border-gray-300 pl-3">
                        {transaction.note}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className={`font-semibold ${transaction.isFee ? 'text-red-600' : 'text-gray-900'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className={`text-sm mt-1 ${transaction.balance < 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                      Balance: ${transaction.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final balance */}
          <div className="bg-gray-100 p-4 border-t-2 border-gray-300">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Available Balance:</span>
              <span className="font-bold text-red-600">
                ${transactions[transactions.length - 1].balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-700">
            The reordering of purchases to raise the probability of overdrafts is a legal practice called <strong>Debit Resequencing</strong>.
          </p>
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 28 of 43</p>
        </div>
      </div>
    </div>
  );
}

// Page 29: What is that and why does this happen?
export function Page29({ onStepComplete }: PageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'weekday',
      title: 'Weekday limitations',
      content: 'When money is deposited into your bank account, it will only clear funds on weekdays. If it is deposited on a weekend, it will not clear until the next business day. Until then, it\'s just a hold and is not part of your available balance. It may, however, register as part of your current balance (Servon, 2017).'
    },
    {
      id: 'opt-in',
      title: 'Overdraft services are opt-in',
      content: 'The 2010 Electronic Transfer Fund Transfer Act, which the Credit Card Act and Dodd-Frank Act made substantial amendments to, requires banks to let customers opt in to overdraft protection. Yes, you choose to turn on this service, and you can turn it off at any time. You may not remember turning it on when you signed up for the bank account because, as Trevor Noah mentioned, you had to sign a bunch of paperwork. And the words "overdraft protection" or "overdraft coverage" sound very reassuring. Many people don\'t realize that they have opted in, nor do they realize they can opt out (Servon, 2017).'
    },
    {
      id: 'loophole',
      title: 'This started with a loophole',
      content: 'The CFPB states, "When Congress passed the Truth in Lending Act (TILA) in 1968, many families used mail to send and receive checks, and were subject to various bank processing times for their deposits and withdrawals to clear. In 1969, the Federal Reserve Board exempted banks from TILA protections for infrequent cases where a bank was honoring a check that had not cleared and subjected the customer to overdraft fees. At the time, overdraft services were not considered profit drivers but courtesy services extended by the bank when, for instance, a paper check sent through the mail may have arrived late" (CFPB, 2024, para. 3).'
    },
    {
      id: 'upfront',
      title: 'Banks have to be upfront',
      content: 'The Overdraft Protection Act of 2021 "prohibits a financial institution from engaging in unfair or deceptive acts in connection with overdraft coverage. Each financial institution that offers overdraft coverage for accounts must disclose overdraft coverage fees. It must also disclose that the consumer\'s transaction may be declined if there are insufficient funds in the related account, and the consumer will not be charged a fee if such transaction is declined" (D-NY-12, 2021).'
    },
    {
      id: 'multiple',
      title: 'They can charge you multiple times a day',
      content: 'Banks and credit unions can charge you for each overdraft, which means you can incur multiple overdraft fees in one day. Although some financial institutions set daily maximums—typically if there are maximums, banks will stop charging after three or four overdrafts in the same day (CFPB, 2023).',
      subpoint: 'Many financial institutions also charge an additional fee if you fail to repay the shortfall in your balance within a few days (CFPB, 2023).'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          What is that and why does this happen?
        </h2>

        <div className="text-lg text-gray-700 mb-6">
          <p>In the US, a few things are true.</p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`border-2 rounded-lg transition-all duration-200 ${
                expandedSection === section.id
                  ? 'border-[#2E1E72] bg-[#F8F6FF]'
                  : 'border-gray-200'
              }`}
            >
              <div
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="p-5 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{section.title}</h3>
                  <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {expandedSection === section.id && (
                  <div className="mt-4 text-gray-700 space-y-3">
                    <p>{section.content}</p>
                    {section.subpoint && (
                      <div className="pl-4 border-l-2 border-[#2E1E72]">
                        <p className="text-gray-700">{section.subpoint}</p>
                      </div>
                    )}
                  </div>
                )}

                {expandedSection !== section.id && (
                  <p className="text-gray-600 text-sm mt-2">Click to learn more</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 29 of 43</p>
        </div>
      </div>
    </div>
  );
}

// Page 30: So what does that mean for your statement?
export function Page30({ onStepComplete }: PageProps) {
  // Using the same bank statement from Whack-A-Mole (bank's reordered view)
  const bankTransactions: Transaction[] = [
    { description: 'Rent', amount: -500, balance: 500 },
    { description: 'Credit card bill', amount: -250, balance: 250 },
    { description: 'Out-of-network ATM withdrawal', amount: -100, balance: 150 },
    { description: 'Out-of-network ATM Fee', amount: -4.86, balance: 145.14 },
    { description: 'Utilities bill', amount: -50, balance: 95.14 },
    { description: 'Gas fill-up', amount: -50, balance: 45.14 },
    { description: 'Internet bill', amount: -50, balance: -4.86, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -31.63, isFee: true },
    { description: 'Phone', amount: -50, balance: -81.63, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -108.40, isFee: true },
    { description: 'Dinner with Friends', amount: -50, balance: -158.40, isOverdraft: true },
    { description: 'Overdraft fee', amount: -26.77, balance: -185.17, isFee: true }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <div className="space-y-6">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8">
          So what does that mean for your statement?
        </h2>

        {/* Bank Statement */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 border-b-2 border-gray-300">
            <h3 className="font-semibold text-gray-900">Bank Statement</h3>
            <p className="text-sm text-gray-600 mt-2">Starting Balance: $1000.00</p>
          </div>

          {/* Transactions */}
          <div className="divide-y divide-gray-200">
            {bankTransactions.map((transaction, index) => (
              <div
                key={index}
                className={`p-4 ${transaction.isOverdraft ? 'bg-red-50' : transaction.isFee ? 'bg-yellow-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className={`font-medium ${transaction.isFee ? 'text-red-600' : 'text-gray-900'}`}>
                      {transaction.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`font-semibold ${transaction.isFee ? 'text-red-600' : 'text-gray-900'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className={`text-sm mt-1 ${transaction.balance < 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                      Balance: ${transaction.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final balance */}
          <div className="bg-gray-100 p-4 border-t-2 border-gray-300">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Available Balance:</span>
              <span className="font-bold text-red-600">
                ${bankTransactions[bankTransactions.length - 1].balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Explanations */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700">
              Your additional $500 was still pending on Friday and was not part of your available balance. Debit resequencing ordered your purchases from biggest to smallest, and you went into overdraft.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-gray-700">
              Debit resequencing is a legal banking practice that involves reordering your transactions, taking the largest transaction first. This causes your account balance to fall faster, boosting potential overdraft fees (Servon, 2017).
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-gray-700 font-semibold">
              As a result, you got charged three fees of $26.77 instead of two.
            </p>
          </div>
        </div>

        <PageNavigation
          onContinue={onStepComplete}
          onBack={onStepComplete}
        />

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 30 of 43</p>
        </div>
      </div>
    </div>
  );
}
