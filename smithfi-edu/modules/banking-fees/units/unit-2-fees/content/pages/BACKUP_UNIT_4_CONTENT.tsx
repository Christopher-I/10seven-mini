/**
 * BACKUP: Unit 4 Content (Neobank Nation)
 * This content was incorrectly placed in Unit 2, pages 36-41
 * Saved here for future use in Unit 4
 * Date: 2025-10-15
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
  DigitalBankingIllustration
} from '../../components/FinancialIllustrations';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// UNIT 4 - Page 36: Digital Banking Alternatives
export function Unit4_Page36({ onStepComplete }: PageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const digitalOptions = [
    {
      id: 'neobanks',
      name: 'Neobanks (Digital-Only Banks)',
      examples: ['Chime', 'Current', 'Varo', 'Ally'],
      pros: ['Lower overhead costs', 'Often fee-free', 'Modern mobile apps', 'Quick account opening'],
      cons: ['Limited physical locations', 'Fewer services', 'Newer companies with less history'],
      bestFor: 'People comfortable with mobile banking who want to avoid fees'
    },
    {
      id: 'fintech',
      name: 'Fintech Payment Apps',
      examples: ['Venmo', 'Cash App', 'PayPal', 'Zelle'],
      pros: ['Easy peer-to-peer payments', 'Quick transfers', 'Social payment features', 'Wide acceptance'],
      cons: ['Limited banking features', 'Potential fees for instant transfers', 'Less regulatory protection'],
      bestFor: 'Young adults who prioritize convenience and social features'
    },
    {
      id: 'online-banks',
      name: 'Online-Only Traditional Banks',
      examples: ['Capital One 360', 'Marcus', 'Discover Bank'],
      pros: ['Higher interest rates', 'Lower fees', 'Full banking services', 'FDIC insured'],
      cons: ['No physical branches', 'May require other bank for cash deposits', 'Phone/chat support only'],
      bestFor: 'Tech-savvy customers who want full banking without fees'
    }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Digital banking alternatives are changing the landscape
        </h2>

        <div className="flex justify-center my-8">
          <DigitalBankingIllustration size="xl" />
        </div>

        <Text className="text-gray-900 mb-6">
          Technology has created new options that often have lower fees and more transparent pricing
          than traditional banks.
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Digital Banking Options:
        </Text>

        <div className="space-y-4">
          {digitalOptions.map((option) => (
            <ContentBox
              key={option.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-gray-200 ${
                selectedOption === option.id ? 'bg-purple-50 border-purple-300' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">{option.name}</Text>
              <Text className="text-gray-900 mb-2">
                Examples: {option.examples.join(', ')}
              </Text>

              {selectedOption === option.id && (
                <div className="mt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text className="text-base font-semibold text-gray-900 mb-2">Pros:</Text>
                      <Stack spacing="xs">
                        {option.pros.map((pro, index) => (
                          <Stack key={index} direction="row" align="center" spacing="sm">
                            <Text className="text-purple-600">+</Text>
                            <Text className="text-gray-900">{pro}</Text>
                          </Stack>
                        ))}
                      </Stack>
                    </div>
                    <div>
                      <Text className="text-base font-semibold text-gray-900 mb-2">Cons:</Text>
                      <Stack spacing="xs">
                        {option.cons.map((con, index) => (
                          <Stack key={index} direction="row" align="center" spacing="sm">
                            <Text className="text-purple-600">-</Text>
                            <Text className="text-gray-900">{con}</Text>
                          </Stack>
                        ))}
                      </Stack>
                    </div>
                  </div>
                  <ContentBox variant="callout" className="bg-transparent border border-purple-400">
                    <Text className="text-gray-900">
                      <Text weight="bold" as="span">Best For:</Text> {option.bestFor}
                    </Text>
                  </ContentBox>
                </div>
              )}
            </ContentBox>
          ))}
        </div>

        {selectedOption && (
          <ContentBox variant="callout" className="bg-transparent border border-purple-400">
            <Text className="text-gray-900">
              <Text weight="bold" as="span">Remember:</Text> Always research any financial institution thoroughly,
              including reading reviews and understanding their fee structure before opening an account.
            </Text>
          </ContentBox>
        )}
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}

// UNIT 4 - Page 37: Credit Union Comparison and Benefits
export function Unit4_Page37({ onStepComplete }: PageProps) {
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);

  const comparisons = [
    {
      id: 'ownership',
      category: 'Ownership Structure',
      creditUnion: 'Member-owned cooperative',
      traditionalBank: 'Shareholder-owned corporation',
      impact: 'Credit unions focus on member benefits rather than maximizing shareholder profits'
    },
    {
      id: 'fees',
      category: 'Fees and Rates',
      creditUnion: 'Lower fees, higher savings rates',
      traditionalBank: 'Higher fees, lower savings rates',
      impact: 'Members often save hundreds of dollars per year in fees'
    },
    {
      id: 'service',
      category: 'Customer Service',
      creditUnion: 'Personal, community-focused',
      traditionalBank: 'Standardized, efficiency-focused',
      impact: 'Credit unions often provide more personalized financial guidance'
    },
    {
      id: 'access',
      category: 'Access and Convenience',
      creditUnion: 'Fewer branches, shared ATM networks',
      traditionalBank: 'More branches and ATMs',
      impact: 'May require planning for banking needs, but often worth the trade-off'
    }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Credit unions often provide better deals than traditional banks
        </h2>

        <Text className="text-gray-900 mb-6">
          Credit unions are nonprofit financial cooperatives that exist to serve their members,
          not to maximize profits for shareholders.
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Credit Unions vs. Traditional Banks:
        </Text>

        <div className="space-y-4">
          {comparisons.map((comparison) => (
            <ContentBox
              key={comparison.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-gray-200 ${
                selectedComparison === comparison.id ? 'bg-purple-50 border-purple-300' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedComparison(selectedComparison === comparison.id ? null : comparison.id)}
            >
              <Text className="text-lg font-bold text-gray-900 mb-3">{comparison.category}</Text>

              {selectedComparison === comparison.id ? (
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <ContentBox variant="callout" className="bg-transparent border border-purple-400">
                      <Text className="text-base font-semibold text-gray-900 mb-2">Credit Union:</Text>
                      <Text className="text-gray-900">{comparison.creditUnion}</Text>
                    </ContentBox>
                    <ContentBox variant="callout" className="bg-transparent border border-gray-200">
                      <Text className="text-base font-semibold text-gray-900 mb-2">Traditional Bank:</Text>
                      <Text className="text-gray-900">{comparison.traditionalBank}</Text>
                    </ContentBox>
                  </div>
                  <ContentBox variant="callout" className="bg-transparent border border-purple-400">
                    <Text className="text-gray-900">
                      <Text weight="bold" as="span">Why This Matters:</Text> {comparison.impact}
                    </Text>
                  </ContentBox>
                </div>
              ) : (
                <Text className="text-gray-900">Click to compare credit unions vs. traditional banks</Text>
              )}
            </ContentBox>
          ))}
        </div>

        <ContentBox variant="callout" className="bg-transparent border border-purple-400">
          <Text className="text-lg font-semibold text-gray-900 mb-3">How to Find a Credit Union:</Text>
          <Stack spacing="xs">
            <Text className="text-gray-900">• Use the National Credit Union Locator at mycreditunion.gov</Text>
            <Text className="text-gray-900">• Check if your employer, school, or community has a credit union</Text>
            <Text className="text-gray-900">• Look for credit unions that serve your geographic area</Text>
            <Text className="text-gray-900">• Ask about membership requirements - they're often easier to meet than you think</Text>
          </Stack>
        </ContentBox>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}

// UNIT 4 - Page 38: Consumer Protection and Regulatory Resources
export function Unit4_Page38({ onStepComplete }: PageProps) {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const protectionResources = [
    {
      id: 'cfpb',
      name: 'Consumer Financial Protection Bureau (CFPB)',
      website: 'consumerfinance.gov',
      description: 'Federal agency that regulates banks and protects consumers',
      services: ['File complaints against banks', 'Free financial education resources', 'Track banking industry trends', 'Get help with financial problems'],
      howToUse: 'Submit complaints online, access free tools and guides, check if your bank has been fined'
    },
    {
      id: 'fdic',
      name: 'Federal Deposit Insurance Corporation (FDIC)',
      website: 'fdic.gov',
      description: 'Insures bank deposits and provides consumer information',
      services: ['Deposit insurance information', 'Bank safety ratings', 'Consumer guides', 'Help with bank problems'],
      howToUse: 'Check if your bank is FDIC insured, research bank safety ratings, access financial education'
    },
    {
      id: 'state-regulators',
      name: 'State Banking Regulators',
      website: 'varies by state',
      description: 'State agencies that oversee banks chartered in their state',
      services: ['Handle complaints about state banks', 'License and regulate banks', 'Consumer protection', 'Local oversight'],
      howToUse: 'Find your state banking regulator online, file complaints about local banks'
    },
    {
      id: 'nonprofit-counseling',
      name: 'Nonprofit Credit Counseling',
      website: 'nfcc.org',
      description: 'Free or low-cost financial counseling and education',
      services: ['Budget counseling', 'Debt management', 'Housing counseling', 'Financial education'],
      howToUse: 'Find local nonprofit counselors, schedule free consultations, get help with financial planning'
    }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Know your rights and where to get help
        </h2>

        <Text className="text-gray-900 mb-6">
          Several government agencies and nonprofit organizations exist to protect consumers
          and provide help when you're having problems with banks.
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Consumer Protection Resources:
        </Text>

        <div className="space-y-4">
          {protectionResources.map((resource) => (
            <ContentBox
              key={resource.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-gray-200 ${
                selectedResource === resource.id ? 'bg-purple-50 border-purple-300' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">{resource.name}</Text>
              <Text className="text-gray-900 mb-2">Website: {resource.website}</Text>
              <Text className="text-gray-900">{resource.description}</Text>

              {selectedResource === resource.id && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Text className="text-base font-semibold text-gray-900 mb-2">Services Available:</Text>
                    <Stack spacing="xs">
                      {resource.services.map((service, index) => (
                        <Stack key={index} direction="row" align="center" spacing="sm">
                          <Text className="text-purple-600">•</Text>
                          <Text className="text-gray-900">{service}</Text>
                        </Stack>
                      ))}
                    </Stack>
                  </div>
                  <ContentBox variant="callout" className="bg-transparent border border-purple-400">
                    <Text className="text-gray-900">
                      <Text weight="bold" as="span">How to Use:</Text> {resource.howToUse}
                    </Text>
                  </ContentBox>
                </div>
              )}
            </ContentBox>
          ))}
        </div>

        <ContentBox variant="callout" className="bg-transparent border border-purple-400">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Your Rights as a Banking Customer:</Text>
          <Stack spacing="xs">
            <Text className="text-gray-900">• Right to receive clear information about fees and terms</Text>
            <Text className="text-gray-900">• Right to file complaints without retaliation</Text>
            <Text className="text-gray-900">• Right to dispute errors on your account</Text>
            <Text className="text-gray-900">• Right to request account information and transaction history</Text>
            <Text className="text-gray-900">• Right to close your account if you're unsatisfied</Text>
          </Stack>
        </ContentBox>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}

// UNIT 4 - Page 39: Real-World Scenarios and Case Studies
export function Unit4_Page39({ onStepComplete }: PageProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'maria',
      name: 'Maria\'s Story: Overdraft Fees',
      situation: 'Single mother, tight budget, got hit with multiple overdraft fees in one day',
      challenge: '$175 in fees from 5 transactions that were all under $10',
      action: 'Called bank, researched alternatives, switched to credit union',
      outcome: 'New credit union refunded fees as goodwill gesture, now saves $300/year in fees',
      lesson: 'It\'s worth advocating for yourself and shopping around for better options'
    },
    {
      id: 'james',
      name: 'James\'s Story: ChexSystems',
      situation: 'Account closed due to unpaid overdraft fees, couldn\'t open new account anywhere',
      challenge: 'Blacklisted by ChexSystems, forced to use expensive check-cashing services',
      action: 'Found nonprofit counselor, learned about second chance banking, disputed ChexSystems report',
      outcome: 'Opened account at credit union, gradually rebuilt banking relationship',
      lesson: 'Second chance banking and nonprofit help can break the cycle of financial exclusion'
    },
    {
      id: 'student',
      name: 'College Student Scenario',
      situation: 'Away from home, parents set up account with fees the student didn\'t understand',
      challenge: 'Monthly maintenance fees, ATM fees, minimum balance requirements',
      action: 'Researched student banking options, compared fee structures, talked to parents',
      outcome: 'Switched to online bank with no fees, learned to budget and track spending',
      lesson: 'Young adults need to understand banking terms and shop for accounts that fit their needs'
    },
    {
      id: 'elderly',
      name: 'Elderly Customer Scenario',
      situation: 'Senior on fixed income facing increasing bank fees and confusing policies',
      challenge: 'Fees kept changing, hard to understand statements, felt pressured by bank staff',
      action: 'Brought adult child to bank meeting, researched senior banking options',
      outcome: 'Found bank with senior-friendly policies and transparent fee structure',
      lesson: 'Banks should serve customers of all ages fairly, and it\'s okay to ask for help'
    }
  ];

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Real stories from people who faced banking challenges
        </h2>

        <Text className="text-gray-900 mb-6">
          These scenarios are based on real experiences people have shared about dealing
          with banking fees and finding better solutions.
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Case Studies:
        </Text>

        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <ContentBox
              key={scenario.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-gray-200 ${
                selectedScenario === scenario.id ? 'bg-purple-50 border-purple-300' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
            >
              <Text className="text-lg font-bold text-gray-900 mb-2">{scenario.name}</Text>
              <Text className="text-gray-900">{scenario.situation}</Text>

              {selectedScenario === scenario.id && (
                <div className="mt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text className="text-base font-semibold text-gray-900 mb-2">The Challenge:</Text>
                      <Text className="text-gray-900">{scenario.challenge}</Text>
                    </div>
                    <div>
                      <Text className="text-base font-semibold text-gray-900 mb-2">Action Taken:</Text>
                      <Text className="text-gray-900">{scenario.action}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-base font-semibold text-gray-900 mb-2">Outcome:</Text>
                    <Text className="text-gray-900">{scenario.outcome}</Text>
                  </div>
                  <ContentBox variant="callout" className="bg-transparent border border-purple-400">
                    <Text className="text-gray-900">
                      <Text weight="bold" as="span">Key Lesson:</Text> {scenario.lesson}
                    </Text>
                  </ContentBox>
                </div>
              )}
            </ContentBox>
          ))}
        </div>

        {selectedScenario && (
          <ContentBox variant="callout" className="bg-transparent border border-purple-400">
            <Text className="text-gray-900">
              <Text weight="bold" as="span">Remember:</Text> You have options and rights as a banking customer.
              Don't be afraid to advocate for yourself, ask questions, and shop around for better deals.
            </Text>
          </ContentBox>
        )}
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}

// UNIT 4 - Page 40: Action Planning and Personal Finance Assessment
export function Unit4_Page40({ onStepComplete }: PageProps) {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [currentBankingSituation, setCurrentBankingSituation] = useState<string | null>(null);

  const actionPlanItems = [
    {
      id: 'review-fees',
      action: 'Review my current bank\'s fee structure',
      timeframe: 'This week',
      difficulty: 'Easy',
      description: 'Look at recent statements and fee schedules'
    },
    {
      id: 'shop-alternatives',
      action: 'Research credit unions and alternative banks',
      timeframe: 'Next 2 weeks',
      difficulty: 'Medium',
      description: 'Compare fees, services, and requirements'
    },
    {
      id: 'opt-out-overdraft',
      action: 'Opt out of overdraft "protection"',
      timeframe: 'This week',
      difficulty: 'Easy',
      description: 'Call bank or visit branch to opt out'
    },
    {
      id: 'check-chexsystems',
      action: 'Check my ChexSystems report',
      timeframe: 'This week',
      difficulty: 'Easy',
      description: 'Request free annual report from ChexSystems'
    },
    {
      id: 'budget-review',
      action: 'Set up a budget to track spending',
      timeframe: 'Next month',
      difficulty: 'Medium',
      description: 'Use apps or tools to monitor cash flow'
    },
    {
      id: 'educate-others',
      action: 'Share this knowledge with family/friends',
      timeframe: 'Ongoing',
      difficulty: 'Easy',
      description: 'Help others avoid expensive banking fees'
    }
  ];

  const bankingSituations = [
    { id: 'current-happy', label: 'Happy with current bank', priority: 'Monitor fees and stay informed' },
    { id: 'high-fees', label: 'Paying too many fees', priority: 'Research alternatives immediately' },
    { id: 'no-account', label: 'Don\'t have a bank account', priority: 'Explore second chance banking options' },
    { id: 'chexsystems', label: 'Having trouble opening accounts', priority: 'Check ChexSystems and find second chance banks' },
    { id: 'confused', label: 'Confused about banking options', priority: 'Get help from nonprofit counselor' }
  ];

  const toggleAction = (actionId: string) => {
    setSelectedActions(prev =>
      prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Create your personal action plan
        </h2>

        <Text className="text-gray-900 mb-6">
          Based on what you've learned, create a plan to improve your banking situation.
          Start by identifying where you are now, then choose actions that make sense for you.
        </Text>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          What describes your current banking situation?
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {bankingSituations.map((situation, index) => (
            <ContentBox
              key={situation.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-purple-400 h-full flex ${
                currentBankingSituation === situation.id ? 'bg-purple-50' : 'hover:bg-purple-50/30'
              }`}
              onClick={() => setCurrentBankingSituation(situation.id)}
            >
              <div className="w-full">
                <Stack direction="row" align="center" spacing="sm">
                  <button
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      currentBankingSituation === situation.id
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {currentBankingSituation === situation.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                  <Text className="text-gray-900 flex-1">{situation.label}</Text>
                </Stack>
                {currentBankingSituation === situation.id && (
                  <Text className="text-purple-600 mt-2 ml-6">
                    <Text weight="bold" as="span">Priority:</Text> {situation.priority}
                  </Text>
                )}
              </div>
            </ContentBox>
          ))}
        </div>

        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Choose actions for your personal plan:
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionPlanItems.map((item, index) => (
            <ContentBox
              key={item.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-purple-400 h-full flex ${
                selectedActions.includes(item.id) ? 'bg-purple-50' : 'hover:bg-purple-50/30'
              }`}
              onClick={() => toggleAction(item.id)}
            >
              <Stack direction="row" align="left" spacing="sm" className="w-full">
                <button
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    selectedActions.includes(item.id)
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {selectedActions.includes(item.id) && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
                <Stack spacing="xs" className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">{item.action}</Text>
                  <Text className="text-gray-900">{item.description}</Text>
                  <div className="flex flex-col gap-1 text-sm">
                    <Text className="text-purple-600">Timeline: {item.timeframe}</Text>
                    <Text className="text-purple-600">Difficulty: {item.difficulty}</Text>
                  </div>
                </Stack>
              </Stack>
            </ContentBox>
          ))}
        </div>

        {selectedActions.length > 0 && (
          <ContentBox variant="callout" className="bg-transparent border border-purple-400">
            <Text className="text-gray-900">
              <Text weight="bold" as="span">Your Action Plan:</Text> You've selected {selectedActions.length} action{selectedActions.length !== 1 ? 's' : ''} to improve your banking situation.
              Start with the easiest ones first to build momentum!
            </Text>
          </ContentBox>
        )}
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}

// UNIT 4 - Page 41: Unit Summary and Key Takeaways
export function Unit4_Page41({ onStepComplete }: PageProps) {
  const [checkedTakeaways, setCheckedTakeaways] = useState<string[]>([]);

  const keyTakeaways = [
    {
      id: 'system-design',
      title: 'Banking fees are not accidents - they\'re by design',
      description: 'Banks profit billions from fees, especially from vulnerable customers. The complexity is intentional.'
    },
    {
      id: 'not-your-fault',
      title: 'Financial struggles with banking are NOT your fault',
      description: 'The system is designed to be confusing and extract fees from people who can least afford them.'
    },
    {
      id: 'alternatives-exist',
      title: 'You have more options than you think',
      description: 'Credit unions, digital banks, and second chance banking provide alternatives to traditional banks.'
    },
    {
      id: 'knowledge-power',
      title: 'Knowledge is your best protection',
      description: 'Understanding how fees work and your rights as a consumer helps you make better decisions.'
    },
    {
      id: 'advocacy-works',
      title: 'Speaking up can make a difference',
      description: 'You can dispute fees, file complaints, and advocate for yourself. Many people successfully get fees reversed.'
    },
    {
      id: 'systemic-change',
      title: 'This is about more than individual choices',
      description: 'Banking fees disproportionately harm communities of color and low-income families. We need systemic changes.'
    }
  ];

  const toggleTakeaway = (takeawayId: string) => {
    setCheckedTakeaways(prev =>
      prev.includes(takeawayId)
        ? prev.filter(id => id !== takeawayId)
        : [...prev, takeawayId]
    );
  };

  return (
    <Stack spacing="lg" className="pb-40 md:pb-6">
      <ContentBox variant="callout" className="bg-transparent border-none">
        <h2 className="text-[28px] font-playfair font-semibold text-gray-900">
          Key takeaways from this unit
        </h2>

        <Text className="text-gray-900 mb-6">
          Let's review the most important things to remember. Check off each takeaway
          as you reflect on what you've learned:
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ marginBottom: '10px' }}>
          {keyTakeaways.map((takeaway) => (
            <ContentBox
              key={takeaway.id}
              variant="callout"
              className={`transition-all cursor-pointer bg-transparent border border-purple-400 h-full flex ${
                checkedTakeaways.includes(takeaway.id) ? 'bg-purple-50' : 'hover:bg-purple-50/30'
              }`}
              onClick={() => toggleTakeaway(takeaway.id)}
            >
              <Stack direction="row" align="left" spacing="sm" className="w-full">
                <button
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    checkedTakeaways.includes(takeaway.id)
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {checkedTakeaways.includes(takeaway.id) && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
                <Stack spacing="xs" className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">{takeaway.title}</Text>
                  <Text className="text-gray-900">{takeaway.description}</Text>
                </Stack>
              </Stack>
            </ContentBox>
          ))}
        </div>

        {checkedTakeaways.length > 0 && (
          <ContentBox variant="callout" className="bg-transparent border border-purple-400">
            <Text className="text-gray-900">
              <Text weight="bold" as="span">Progress:</Text> You've reviewed {checkedTakeaways.length}/{keyTakeaways.length} key takeaways.
              {checkedTakeaways.length === keyTakeaways.length && (
                <span> Excellent! You've reviewed all the key concepts from this unit.</span>
              )}
            </Text>
          </ContentBox>
        )}

        <ContentBox variant="callout" className="bg-transparent border border-purple-400">
          <Text className="text-lg font-semibold text-gray-900 mb-3">What You Can Do Next:</Text>
          <Stack spacing="xs">
            <Text className="text-gray-900">• Start with your action plan from the previous page</Text>
            <Text className="text-gray-900">• Share this knowledge with friends and family</Text>
            <Text className="text-gray-900">• Stay informed about banking practices and consumer rights</Text>
            <Text className="text-gray-900">• Support policy changes that protect all consumers</Text>
            <Text className="text-gray-900">• Remember: you deserve fair and transparent financial services</Text>
          </Stack>
        </ContentBox>
      </ContentBox>

      <PageNavigation
        onContinue={onStepComplete}
        onBack={onStepComplete}
      />
    </Stack>
  );
}
