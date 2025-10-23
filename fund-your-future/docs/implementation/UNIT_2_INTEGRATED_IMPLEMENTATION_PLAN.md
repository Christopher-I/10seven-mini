# Unit 2 Complete Implementation Plan
## Integrated Design System for All 22 Pages (Excluding Whack-a-Mole)

---

## **Executive Summary**

This plan provides a comprehensive, step-by-step implementation strategy for transforming all 22 Unit 2 pages to the new design system. It integrates web design patterns (A, B, C) with mobile-first patterns (D, E, F, G, H, I) to create a cohesive, accessible, and engaging user experience.

**Key Metrics:**
- **22 pages** redesigned with new visual system
- **9 design patterns** (3 web + 6 mobile) unified
- **50+ sub-steps** added for granular progress tracking
- **100% content preservation** with enhanced presentation
- **15+ new SVG icons** for visual consistency

---

## **Design System Architecture**

### **Core Web Patterns**
- **Pattern A**: Learning Objectives (8 pages) - Checklist format with purple checkmarks
- **Pattern B**: Narrative with Icon (3 pages) - Story-based content with visual anchors
- **Pattern C**: Educational Interactive (11 pages) - Complex content with tooltips and citations

### **Mobile-First Enhancements**
- **Pattern D**: Fee Definition Modal - Full-screen overlays for definitions
- **Pattern E**: Mobile Fee Grid - Touch-optimized card layouts
- **Pattern F**: Enhanced Statement - Clean transaction lists with fee highlights
- **Pattern G**: Survey Introduction - Checkmarked key points with privacy notes
- **Pattern H**: Survey Questions - Simple inputs with alternative actions
- **Pattern I**: Progress Breaks - Motivational check-ins between sections

### **Universal Elements**
- **Purple Theme**: #2E1E72 (primary), #8577B7 (medium), #E5DEEF (light)
- **8-Dot Progress Bar**: Horizontal indicator matching all designs
- **Typography**: Playfair Display (headings) + Red Hat Display (body)
- **Icons**: Consistent SVG style with purple fills
- **Touch Targets**: 44px+ minimum for mobile accessibility

---

## **Page-by-Page Implementation Guide**

### **📝 PAGE 1: Unit Introduction**
**Current**: Hero card with bullet points + animated button
**New Design**: **Pattern A** + **Pattern G** (Mobile Survey Intro)

**Implementation Details**:
```typescript
export function Page1({ onStepComplete }: PageProps) {
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);

  const learningObjectives = [
    { id: 'banks-exist', text: 'Why banks exist' },
    { id: 'fee-types', text: 'Common types of bank fees' },
    { id: 'fee-reasons', text: 'Why bank fees exist' },
    { id: 'challenging-situations', text: 'How to handle challenging bank situations like overdraft charges and account closures' },
    { id: 'student-accounts', text: 'What to keep in mind when transitioning out of a "student" bank account' }
  ];

  return (
    <LearningObjectivesTemplate
      title="Let's talk about how banks operate. In this Unit, you'll learn:"
      objectives={learningObjectives}
      completedObjectives={completedObjectives}
      onObjectiveComplete={handleObjectiveComplete}
      onAllComplete={() => onStepComplete?.({ allObjectivesReviewed: true })}
      variant="intro"
      icon={<BankBuildingIcon className="w-16 h-16 text-purple-600" />}
    />
  );
}
```

**Progress Steps**: 5 (one per objective)
**Content Changes**: Bullet points → Interactive checklist
**Mobile Enhancements**: Purple checkmarks, single-column layout

---

### **📖 PAGE 2: Bank Scenario (Replaces Whack-a-Mole)**
**Current**: Game interface
**New Design**: **Pattern B** + **Pattern F** (Statement visual)

**Implementation Details**:
```typescript
export function Page2({ onStepComplete }: PageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const scenarioSteps = [
    {
      icon: <CalendarIcon className="w-12 h-12 text-purple-600" />,
      title: "It's Friday morning!",
      content: "You check your bank account. You see that your available balance is $200, and the $500 check from dogwalking was deposited into your account."
    },
    {
      icon: <BankBuildingIcon className="w-12 h-12 text-purple-600" />,
      title: "Your current balance is $700",
      content: "Everything looks good for your weekend plans and upcoming expenses."
    }
  ];

  return (
    <NarrativeTemplate
      icon={scenarioSteps[currentStep].icon}
      title={scenarioSteps[currentStep].title}
      content={scenarioSteps[currentStep].content}
      onNext={() => {
        if (currentStep < scenarioSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          onStepComplete?.({ scenarioCompleted: true });
        }
      }}
      layout="icon-center"
    />
  );
}
```

**Progress Steps**: 2 (scenario introduction + setup)
**Content Changes**: Game → Story narrative
**Mobile Enhancements**: Large touch targets, clean typography

---

### **📊 PAGE 3: Statement Display**
**Current**: Bank statement with alert styling
**New Design**: **Pattern F** (Enhanced Statement) + **Pattern D** (Fee Modals)

**Implementation Details**:
```typescript
export function Page3({ onStepComplete }: PageProps) {
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);

  const transactions = [
    { description: 'ATM withdrawal', amount: '-$100.00', isFee: false },
    { description: 'ATM fee', amount: '-$3.50', isFee: true, definition: 'A bank fee charged for using an out-of-network ATM...' },
    { description: 'Utilities', amount: '-$50.00', isFee: false },
    // ... rest of transactions
    { description: 'Overdraft Fee', amount: '-$35.00', isFee: true, definition: 'If you don\'t have enough money...' },
    { description: 'Monthly Maintenance Fee', amount: '-$12.00', isFee: true, definition: 'A bank fee typically charged...' }
  ];

  return (
    <>
      <MobileStatement
        title="Here's your latest statement!"
        transactions={transactions}
        currentBalance={396.50}
        onFeeClick={(fee) => setSelectedFee(fee)}
        showUserQuote="Where the heck did all these fees come from? Why did I overdraft twice if I made sure of once?"
      />

      <FeeDefinitionModal
        title={selectedFee?.name || ''}
        definition={selectedFee?.definition || ''}
        isOpen={!!selectedFee}
        onClose={() => setSelectedFee(null)}
        onNext={() => {
          setSelectedFee(null);
          onStepComplete?.({ statementReviewed: true, feesExplored: true });
        }}
      />
    </>
  );
}
```

**Progress Steps**: 3 (statement review + fee exploration + understanding)
**Content Changes**: Enhanced with clickable fee definitions
**Mobile Enhancements**: Purple fee badges, touch-friendly info buttons

---

### **🏦 PAGE 4: The Hard Truth About Banking**
**Current**: Text + survey component
**New Design**: **Pattern C** + **Pattern G** + **Pattern H** (Mobile Survey)

**Implementation Details**:
```typescript
export function Page4({ onStepComplete }: PageProps) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  return (
    <div className="space-y-8">
      <EducationalTemplate
        icon={<BankBuildingIcon className="w-16 h-16 text-purple-600" />}
        title="The hard truth: It's difficult to navigate the world without a banking account"
        content="Having a bank account is an essential part of participating in the US financial system..."
        glossaryTerms={[
          { term: "financial system", definition: "The network of institutions, markets, and intermediaries..." },
          { term: "direct deposits", definition: "Electronic transfer of funds directly into your account..." }
        ]}
      />

      {!showSurvey ? (
        <MobileSurveyIntro
          title="Let's take the Your Banking History Survey"
          keyPoints={[
            "Let's learn a little bit more about your banking history",
            "All answers are anonymous and will only be reported in aggregate",
            "These kinds of surveys will appear throughout the program"
          ]}
          onStart={() => setShowSurvey(true)}
        />
      ) : (
        <MobileSurveyQuestion
          question="At what age did you first open a bank account? It's okay to guess if you don't remember."
          inputType="number"
          placeholder="Enter age"
          alternativeAction={{
            label: "I don't have a bank account",
            onClick: () => handleNoAccount()
          }}
          onSubmit={(data) => {
            setSurveyData(data);
            onStepComplete?.({ surveyCompleted: true, data });
          }}
        />
      )}
    </div>
  );
}
```

**Progress Steps**: 3 (content reading + survey intro + survey completion)
**Content Changes**: Enhanced survey with mobile-first design
**Mobile Enhancements**: Purple checkmarks, clean form inputs, dual action buttons

---

### **💰 PAGE 5: Banks Are More Than Places to Put Money**
**Current**: Text + profit quiz
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page5({ onStepComplete }: PageProps) {
  const [quizAnswered, setQuizAnswered] = useState(false);

  return (
    <EducationalTemplate
      icon={<MoneyFlowIcon className="w-16 h-16 text-purple-600" />}
      title="Banks are more than just places to put your money"
      content="The companies' primary objectives are to make a profit. Not just make money in revenue—but profit, which means taking in more money than expenses."
      interactive={
        <EnhancedQuiz
          question="What is the primary objective of banks?"
          options={[
            "To help customers save money",
            "To make a profit", // correct
            "To provide free services",
            "To store money safely"
          ]}
          correctAnswer={1}
          onAnswer={(correct) => {
            setQuizAnswered(true);
            onStepComplete?.({ quizAnswered: true, correct });
          }}
          explanation="Banks are businesses that need to make profit to operate and grow."
        />
      }
      glossaryTerms={[
        { term: "profit", definition: "Revenue minus expenses; the money left over after all costs are paid" },
        { term: "revenue", definition: "Total amount of money brought in by a business's operations" }
      ]}
    />
  );
}
```

**Progress Steps**: 2 (concept understanding + quiz completion)
**Content Changes**: Enhanced quiz with explanations
**Mobile Enhancements**: Touch-friendly quiz buttons, clear feedback

---

### **📈 PAGE 6: Investment Portfolios, Fees, and Interest**
**Current**: Text + definitions + stats box
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page6({ onStepComplete }: PageProps) {
  const [definitionsViewed, setDefinitionsViewed] = useState<string[]>([]);

  return (
    <EducationalTemplate
      icon={<InvestmentChartIcon className="w-16 h-16 text-purple-600" />}
      title="Investment portfolios, fees, and interest are the biggest drivers of a bank's profit"
      content={
        <div className="space-y-6">
          <p>
            Investment portfolios typically make up the biggest share of profit, however{' '}
            <GlossaryTooltip
              term="Bank Fees"
              definition="Fees make up 10-40% of a bank's revenue, according to the New York Federal Reserve. Bank fees and interest are a significant driver and are most likely to impact you on a day-to-day basis."
              citation="New York Federal Reserve"
            >
              fees make up 10-40% of a bank's revenue
            </GlossaryTooltip>, according to the New York Federal Reserve.
          </p>

          <StatisticsCard
            title="Banking Revenue Reality"
            statistics={[
              { label: "Fee Revenue", value: "10-40%", description: "of total bank revenue" },
              { label: "Impact", value: "Daily", description: "basis for most customers" }
            ]}
            source="New York Federal Reserve"
          />

          <DefinitionGrid
            definitions={[
              {
                term: "Bank Fee",
                definition: "A charge from a bank or financial institution for various services, activities, or penalties, such as credit card transactions or account maintenance.",
                viewed: definitionsViewed.includes('bank-fee'),
                onView: () => handleDefinitionView('bank-fee')
              },
              {
                term: "Interest",
                definition: "An amount that's paid on bank accounts or owed on loans.",
                viewed: definitionsViewed.includes('interest'),
                onView: () => handleDefinitionView('interest')
              }
            ]}
          />
        </div>
      }
    />
  );
}
```

**Progress Steps**: 3 (concept + statistics + definitions)
**Content Changes**: Enhanced with citations and interactive definitions
**Mobile Enhancements**: Expandable definition cards, clear statistics display

---

### **🔍 PAGE 7: Let's Think Back to Fees**
**Current**: Fee breakdown with tooltips
**New Design**: **Pattern C** + **Pattern D** (Fee Modals)

**Implementation Details**:
```typescript
export function Page7({ onStepComplete }: PageProps) {
  const [selectedFee, setSelectedFee] = useState<DetailedFee | null>(null);
  const [feesExplored, setFeesExplored] = useState<string[]>([]);

  const feeBreakdown = [
    {
      id: 'overdraft',
      name: 'Overdraft Fee (3x)',
      amount: '$105.00',
      description: 'You went into overdraft three times to pay your credit card bill and your portion of dinner with friends.',
      fullDefinition: 'If you don\'t have enough money in your bank account to pay a bill, the bank will cover the cost. Most banks charge a fee for the overdraft in addition to the transaction cost.',
      impactExplanation: 'Multiple overdrafts can quickly accumulate, turning a small shortage into a significant expense.'
    },
    {
      id: 'maintenance',
      name: 'Monthly Maintenance Fee',
      amount: '$12.00',
      description: 'Your bank requires you to have a minimum balance of $500 or you will be charged a monthly maintenance fee.',
      fullDefinition: 'A bank fee typically charged to your checking, savings, or money market account if you do not meet certain requirements, such as maintaining a minimum monthly balance or making direct deposits.',
      impactExplanation: 'This fee compounds monthly, making it expensive for those who cannot maintain high balances.'
    },
    {
      id: 'atm',
      name: 'ATM Fee',
      amount: '$3.50',
      description: 'You needed to get cash in a pinch but were not near a network ATM.',
      fullDefinition: 'A bank fee charged for using an out-of-network ATM.',
      impactExplanation: 'ATM fees can add up quickly for those without easy access to in-network machines.'
    }
  ];

  return (
    <div className="space-y-6">
      <EducationalTemplate
        icon={<CalculatorIcon className="w-16 h-16 text-purple-600" />}
        title="Let's think back to the fees you incurred in the earlier activity"
      />

      <FeeBreakdownList
        fees={feeBreakdown}
        onFeeClick={(fee) => {
          setSelectedFee(fee);
          if (!feesExplored.includes(fee.id)) {
            setFeesExplored([...feesExplored, fee.id]);
          }
        }}
        exploredFees={feesExplored}
      />

      <FeeDefinitionModal
        title={selectedFee?.name || ''}
        definition={selectedFee?.fullDefinition || ''}
        impact={selectedFee?.impactExplanation || ''}
        amount={selectedFee?.amount || ''}
        isOpen={!!selectedFee}
        onClose={() => setSelectedFee(null)}
        onNext={() => {
          setSelectedFee(null);
          if (feesExplored.length === feeBreakdown.length) {
            onStepComplete?.({ allFeesExplored: true });
          }
        }}
      />

      {feesExplored.length === feeBreakdown.length && (
        <CompletionCard
          title="Great! You've explored all the fees"
          message="Understanding these fees helps you make informed banking decisions."
          onContinue={() => onStepComplete?.({ feesAnalyzed: true })}
        />
      )}
    </div>
  );
}
```

**Progress Steps**: 3 (one per fee type)
**Content Changes**: Enhanced with modal explanations and impact descriptions
**Mobile Enhancements**: Full-screen fee modals, clear breakdown visualization

---

### **⚡ PAGE 8: But Wait, There's More Fees!**
**Current**: Grid of fee cards
**New Design**: **Pattern E** (Mobile Fee Grid) + **Pattern D** (Modals)

**Implementation Details**:
```typescript
export function Page8({ onStepComplete }: PageProps) {
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [exploredFees, setExploredFees] = useState<string[]>([]);

  const feeTypes = [
    { id: 'check', name: 'Check Fees', definition: 'May occur when you cash a check at a bank or credit union that you do not have an account with.' },
    { id: 'nsf', name: 'Insufficient Funds Fees (NSF)', definition: 'May occur when you don\'t have enough money in your checking account to cover an attempted charge or online payment.' },
    { id: 'foreign', name: 'Foreign Transaction Fees', definition: 'Fees charged to credit cards for purchases made in foreign countries, usually 1% of the transaction cost.' },
    { id: 'transfer', name: 'Transfer Fees', definition: 'Occur when you move money from one bank account to another, either domestically or internationally.' },
    { id: 'excessive', name: 'Excessive Transaction Fees', definition: 'May occur if your bank sets a limit for the number of withdrawals per month out of your savings account.' },
    { id: 'research', name: 'Account Research Fees', definition: 'May occur if you request an investigation of a specific transaction or issue in your account.' },
    { id: 'dormancy', name: 'Dormancy/Inactivity Fees', definition: 'May occur when there is no activity in an account for an extended period of time.' },
    { id: 'closing', name: 'Account Closing Fees', definition: 'May occur if you close an account quickly after opening it.' }
  ];

  return (
    <div className="space-y-6">
      <EducationalTemplate
        title="That's just the tip of the iceberg"
        content="Overdraft fees and ATM fees are often ones that people are most familiar with, but there are even more that you might not encounter until they happen."
        subtitle="Every bank is different, but each bank is required to publish out their fee structure. However, these documents can be hidden on their website or tedious to read. Here, we give you a detailed overview of what kinds of fees exist."
      />

      <MobileFeeGrid
        fees={feeTypes}
        onFeeClick={(fee) => {
          setSelectedFee(fee);
          if (!exploredFees.includes(fee.id)) {
            setExploredFees([...exploredFees, fee.id]);
          }
        }}
        exploredFees={exploredFees}
        layout="mobile-first" // 1 col mobile, 2 col tablet, 3 col desktop
      />

      <ProgressIndicator
        current={exploredFees.length}
        total={feeTypes.length}
        label="fees explored"
      />

      <FeeDefinitionModal
        title={selectedFee?.name || ''}
        definition={selectedFee?.definition || ''}
        isOpen={!!selectedFee}
        onClose={() => setSelectedFee(null)}
        onNext={() => {
          setSelectedFee(null);
          if (exploredFees.length === feeTypes.length) {
            onStepComplete?.({ allFeeTypesExplored: true });
          }
        }}
      />
    </div>
  );
}
```

**Progress Steps**: 8 (one per fee type)
**Content Changes**: Grid → Mobile-first expandable cards
**Mobile Enhancements**: Single-column layout, clear exploration tracking

---

### **🧮 PAGE 9: Fee Calculator & Comparison Tool**
**Current**: Interactive calculator
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page9({ onStepComplete }: PageProps) {
  const [calculatorData, setCalculatorData] = useState(null);
  const [comparisonComplete, setComparisonComplete] = useState(false);

  return (
    <EducationalTemplate
      icon={<CalculatorIcon className="w-16 h-16 text-purple-600" />}
      title="Calculate Your Potential Fee Impact"
      interactive={
        <EnhancedFeeCalculator
          onCalculate={(data) => {
            setCalculatorData(data);
            setComparisonComplete(true);
            onStepComplete?.({ calculatorUsed: true, feeImpact: data.totalFees });
          }}
          bankOptions={[
            { name: 'Traditional Bank A', overdraftFee: 35, maintenanceFee: 12, atmFee: 3.50 },
            { name: 'Traditional Bank B', overdraftFee: 30, maintenanceFee: 15, atmFee: 2.50 },
            { name: 'Fee-Free Bank', overdraftFee: 0, maintenanceFee: 0, atmFee: 0 }
          ]}
          scenarios={[
            { name: 'Light Usage', overdrafts: 0, outOfNetworkATM: 2 },
            { name: 'Moderate Usage', overdrafts: 1, outOfNetworkATM: 4 },
            { name: 'Heavy Usage', overdrafts: 3, outOfNetworkATM: 8 }
          ]}
        />
      }
    />
  );
}
```

**Progress Steps**: 2 (fee calculation + comparison analysis)
**Content Changes**: Enhanced with bank comparison features
**Mobile Enhancements**: Touch-friendly calculator, clear results display

---

### **📚 PAGE 10: Historical Context**
**Current**: Text + historical carousel
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page10({ onStepComplete }: PageProps) {
  const [timelineViewed, setTimelineViewed] = useState<string[]>([]);

  return (
    <EducationalTemplate
      icon={<HistoryIcon className="w-16 h-16 text-purple-600" />}
      title="And this is common business practice"
      content="As we said previously, fees can account for up to 40% of a bank's revenue. Let's take a quick look at the history and reasoning behind this."
      interactive={
        <HistoricalTimeline
          events={[
            {
              id: 'deregulation',
              year: '1980s',
              title: 'Banking Deregulation',
              description: 'Banks gained more freedom to set fees and interest rates',
              impact: 'Led to increased competition but also more complex fee structures'
            },
            {
              id: 'fee-rise',
              year: '1990s-2000s',
              title: 'Rise of Fee-Based Revenue',
              description: 'Banks increasingly relied on fees as interest margins compressed',
              impact: 'Overdraft and ATM fees became major revenue sources'
            },
            {
              id: 'financial-crisis',
              year: '2008',
              title: 'Financial Crisis Impact',
              description: 'Banks faced pressure to increase fee revenue during economic downturn',
              impact: 'Led to more aggressive fee practices and customer complaints'
            },
            {
              id: 'regulatory-response',
              year: '2010s',
              title: 'Regulatory Response',
              description: 'CFPB created to protect consumers from predatory banking practices',
              impact: 'Some fee practices were curtailed, but many remain legal'
            }
          ]}
          onEventView={(eventId) => {
            if (!timelineViewed.includes(eventId)) {
              setTimelineViewed([...timelineViewed, eventId]);
            }
          }}
          viewedEvents={timelineViewed}
        />
      }
    />
  );
}
```

**Progress Steps**: 4 (one per historical period)
**Content Changes**: Enhanced timeline with interactive exploration
**Mobile Enhancements**: Swipeable timeline, expandable event details

---

### **🔄 PAGE 11: Debit Resequencing Introduction**
**Current**: Text + statement comparison
**New Design**: **Pattern C** + **Pattern F** (Enhanced Statement Comparison)

**Implementation Details**:
```typescript
export function Page11({ onStepComplete }: PageProps) {
  const [comparisonStep, setComparisonStep] = useState(0);

  const comparisonSteps = [
    {
      title: "Your Expected Order",
      transactions: [
        { description: 'Dinner with Friends', amount: '-$50.00', order: 1 },
        { description: 'Phone bill', amount: '-$50.00', order: 2 },
        { description: 'Credit card bill', amount: '-$250.00', order: 3 }
      ],
      fees: 1,
      explanation: "You expected only one overdraft fee from the credit card bill"
    },
    {
      title: "Bank's Actual Order (Resequencing)",
      transactions: [
        { description: 'Credit card bill', amount: '-$250.00', order: 1, resequenced: true },
        { description: 'Phone bill', amount: '-$50.00', order: 2, resequenced: true },
        { description: 'Dinner with Friends', amount: '-$50.00', order: 3, resequenced: true }
      ],
      fees: 3,
      explanation: "By processing largest first, the bank triggered three overdraft fees"
    }
  ];

  return (
    <div className="space-y-6">
      <EducationalTemplate
        icon={<ReorderIcon className="w-16 h-16 text-purple-600" />}
        title="Fees will always exist, because banks need to make money"
        content="One of the best ways to protect yourself is to know they exist and know that it's not your fault if you feel you are being unfairly charged."
      />

      <TransactionComparisonView
        step={comparisonStep}
        comparisonData={comparisonSteps[comparisonStep]}
        onNext={() => {
          if (comparisonStep < comparisonSteps.length - 1) {
            setComparisonStep(comparisonStep + 1);
          } else {
            onStepComplete?.({ resequencingUnderstood: true });
          }
        }}
        onPrevious={comparisonStep > 0 ? () => setComparisonStep(comparisonStep - 1) : undefined}
      />

      <LegalNoticeCard
        title="This is called Debit Resequencing. And this is also perfectly legal."
        content="Banks can legally reorder your transactions to maximize overdraft fees, even if it means processing larger transactions before smaller ones to trigger more overdrafts."
        source="Consumer Financial Protection Bureau"
      />
    </div>
  );
}
```

**Progress Steps**: 3 (intro + comparison + legal understanding)
**Content Changes**: Enhanced comparison with step-by-step visualization
**Mobile Enhancements**: Swipeable comparison, clear fee impact display

---

### **❓ PAGE 12: What Is Debit Resequencing?**
**Current**: Definition + explanation
**New Design**: **Pattern C** + **Pattern I** (Progress Break after)

**Implementation Details**:
```typescript
export function Page12({ onStepComplete }: PageProps) {
  const [definitionSteps, setDefinitionSteps] = useState(0);

  const steps = [
    {
      title: "What is Debit Resequencing?",
      content: "Debit resequencing is a legal banking practice that involves reordering your transactions, taking the largest transaction first.",
      visual: <ResequencingDiagram step={1} />
    },
    {
      title: "How Does It Work?",
      content: "This causes your account balance to fall faster, boosting potential overdraft fees.",
      visual: <ResequencingDiagram step={2} />
    },
    {
      title: "Real Impact",
      content: "As a result, you got charged three fees of $35 instead of two - an extra $35 because of resequencing.",
      visual: <FeeImpactVisualization before={70} after={105} />
    }
  ];

  return (
    <>
      <EducationalTemplate
        icon={<QuestionIcon className="w-16 h-16 text-purple-600" />}
        title="Wait, what is that, and why does this happen?"
        interactive={
          <SteppedExplanation
            steps={steps}
            currentStep={definitionSteps}
            onStepComplete={(step) => {
              if (step < steps.length - 1) {
                setDefinitionSteps(step + 1);
              } else {
                onStepComplete?.({ resequencingExplained: true });
              }
            }}
          />
        }
        glossaryTerms={[
          { term: "debit resequencing", definition: "A legal banking practice that involves reordering your transactions, taking the largest transaction first" }
        ]}
      />

      {/* Add progress break after this complex topic */}
      <ProgressBreak
        title="Okay, let's take a break to see if you are tracking"
        illustration={<QuizIllustration className="w-32 h-32 text-purple-600" />}
        onContinue={() => onStepComplete?.({ breakCompleted: true })}
      />
    </>
  );
}
```

**Progress Steps**: 3 (definition + mechanism + impact) + 1 (break)
**Content Changes**: Step-by-step explanation with visuals
**Mobile Enhancements**: Swipeable steps, progress break for engagement

---

### **⚖️ PAGE 13: If It Seems Unfair**
**Current**: Text + statistics reveal
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page13({ onStepComplete }: PageProps) {
  const [statisticsRevealed, setStatisticsRevealed] = useState<string[]>([]);

  const unfairnessStats = [
    {
      id: 'fee-increase',
      title: 'Fee Increases Over Time',
      stats: [
        { label: '1998', value: '$21.57', description: 'Average overdraft fee' },
        { label: 'Today', value: '$35.00', description: 'Standard overdraft fee' },
        { label: 'Increase', value: '62%', description: 'Rise over 25+ years' }
      ]
    },
    {
      id: 'unbanked-impact',
      title: 'Impact on Vulnerable Communities',
      stats: [
        { label: '4.2%', value: '5.6M households', description: 'US households unbanked' },
        { label: '33.4%', value: 'Fee-related reasons', description: 'Why people avoid banks' },
        { label: 'Higher rates', value: 'Minority communities', description: 'Disproportionate impact' }
      ],
      source: 'Federal Deposit Insurance Corporation, 2023'
    }
  ];

  return (
    <EducationalTemplate
      icon={<ScaleIcon className="w-16 h-16 text-purple-600" />}
      title="If it seems unfair, that's because it is"
      content="Practices like debit resequencing mean you pay them more often, and banks can make more money off of your vulnerable financial situation."
      interactive={
        <RevealableStatistics
          statisticsGroups={unfairnessStats}
          onReveal={(statId) => {
            if (!statisticsRevealed.includes(statId)) {
              setStatisticsRevealed([...statisticsRevealed, statId]);
            }
          }}
          revealedStats={statisticsRevealed}
        />
      }
    />
  );
}
```

**Progress Steps**: 3 (unfairness acknowledgment + fee increases + unbanked impact)
**Content Changes**: Interactive statistics with reveal functionality
**Mobile Enhancements**: Touch-friendly reveal buttons, clear data visualization

---

### **🏛️ PAGE 14: Is Anything Being Done?**
**Current**: Lawsuits + CFPB info
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page14({ onStepComplete }: PageProps) {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [casesViewed, setCasesViewed] = useState<string[]>([]);

  const lawsuitCases = [
    {
      id: 'wells-fargo',
      bank: 'Wells Fargo',
      year: '2010',
      settlement: '$203M',
      icon: <BankIcon className="w-8 h-8 text-purple-600" />,
      details: {
        issue: 'Manipulated transactions to charge more overdraft fees (debit resequencing)',
        judgeQuote: 'Wells Fargo has devised a bookkeeping device to turn what would ordinarily be one overdraft into as many as ten overdrafts...',
        impact: 'In California alone, Wells Fargo assessed over $1.4 billion in overdraft penalties between 2005 and 2007.'
      }
    },
    // ... other cases
  ];

  return (
    <EducationalTemplate
      icon={<GavelIcon className="w-16 h-16 text-purple-600" />}
      title="Is anything being done about this?"
      content="Public pressure, lawsuits, and CFPB action have caused some major banks to step away from predatory fees and practices such as debit resequencing."
      interactive={
        <div className="space-y-6">
          <LawsuitCaseGrid
            cases={lawsuitCases}
            selectedCase={selectedCase}
            onCaseSelect={(caseId) => {
              setSelectedCase(caseId === selectedCase ? null : caseId);
              if (!casesViewed.includes(caseId)) {
                setCasesViewed([...casesViewed, caseId]);
              }
            }}
            viewedCases={casesViewed}
          />

          <RegulatoryActionCard
            title="Recent CFPB Action"
            actions={[
              {
                year: '2022',
                action: 'Guidance on surprise overdraft fees',
                impact: 'May violate Consumer Financial Protection Act'
              },
              {
                year: '2024',
                action: 'Attempt to cap overdraft fees at $5',
                impact: 'Reversed by Trump administration'
              }
            ]}
          />
        </div>
      }
    />
  );
}
```

**Progress Steps**: 4 (intro + 3 lawsuit cases + regulatory action)
**Content Changes**: Interactive case exploration with detailed information
**Mobile Enhancements**: Expandable case cards, clear settlement information

---

### **✅ PAGE 15: Some Banks Have Eliminated Fees**
**Current**: Text + bank list
**New Design**: **Pattern A** (Learning Objectives - Bank Checklist)

**Implementation Details**:
```typescript
export function Page15({ onStepComplete }: PageProps) {
  const [exploredBanks, setExploredBanks] = useState<string[]>([]);

  const feeFreeOptions = [
    { id: 'capital-one', name: 'Capital One', feature: 'No overdraft fees', details: 'Eliminated overdraft fees entirely in 2022' },
    { id: 'ally', name: 'Ally Bank', feature: 'No overdraft fees', details: 'Online bank with fee-friendly policies' },
    { id: 'citibank', name: 'Citibank', feature: 'No overdraft fees', details: 'Major bank that eliminated most overdraft fees' },
    { id: 'alliant', name: 'Alliant Credit Union', feature: 'No overdraft fees', details: 'Credit union with member-focused approach' }
  ];

  return (
    <LearningObjectivesTemplate
      title="Some banks have eliminated overdraft fees altogether or significantly reduced them"
      subtitle="Revenue across banks from overdraft fees has been cut significantly in recent years due to many larger banks changing their fee practices."
      objectives={feeFreeOptions.map(bank => ({
        id: bank.id,
        text: `${bank.name} - ${bank.feature}`,
        details: bank.details
      }))}
      completedObjectives={exploredBanks}
      onObjectiveComplete={(bankId) => {
        if (!exploredBanks.includes(bankId)) {
          setExploredBanks([...exploredBanks, bankId]);
        }
      }}
      onAllComplete={() => onStepComplete?.({ allBanksExplored: true })}
      variant="bank-list"
      icon={<CheckCircleIcon className="w-16 h-16 text-green-600" />}
      actionText="Should You Switch?"
      actionContent="If you tend to overdraft, it's not a bad idea to go with a bank that does not engage with this practice."
    />
  );
}
```

**Progress Steps**: 4 (one per fee-free bank)
**Content Changes**: List → Interactive checklist with details
**Mobile Enhancements**: Expandable bank information, clear feature highlighting

---

### **🛡️ PAGE 16: Is There Anything I Can Do to Protect Myself?**
**Current**: Text + protection tips checkboxes
**New Design**: **Pattern A** (Learning Objectives - Protection Checklist)

**Implementation Details**:
```typescript
export function Page16({ onStepComplete }: PageProps) {
  const [implementedStrategies, setImplementedStrategies] = useState<string[]>([]);

  const protectionStrategies = [
    {
      id: 'learn-fees',
      title: 'Learn more about the fees your bank charges',
      description: 'Banks will typically list what they may charge for different types of accounts they offer.',
      actionSteps: ['Visit your bank\'s website', 'Review fee schedules', 'Compare account types'],
      difficulty: 'Easy'
    },
    {
      id: 'opt-out',
      title: 'Opt-out of overdraft',
      description: 'When you open an online bank account, it automatically opts you into overdraft protection.',
      actionSteps: ['Contact your bank', 'Request overdraft opt-out', 'Confirm in writing'],
      difficulty: 'Easy'
    },
    {
      id: 'link-accounts',
      title: 'Link your accounts',
      description: 'Link your savings account to your checking account as a fail-safe.',
      actionSteps: ['Open savings account', 'Set up account linking', 'Maintain minimum balance'],
      difficulty: 'Medium'
    },
    {
      id: 'notifications',
      title: 'Turn on notifications and turn off auto-payments',
      description: 'Get notified when your account balance is low and control automatic payments.',
      actionSteps: ['Enable low balance alerts', 'Review auto-payments', 'Set up spending controls'],
      difficulty: 'Easy'
    }
  ];

  return (
    <div className="space-y-6">
      <EmpowermentMessage
        title="Is there anything I can do to protect myself?"
        message="Yes! While there may be times where fees are inevitable, there are some ways you can protect yourself."
        reminder="Just remember that these fees and systems are designed to keep you in vulnerable situations and make banks money and the fees you incur are NOT your fault."
      />

      <ProtectionStrategiesChecklist
        strategies={protectionStrategies}
        implementedStrategies={implementedStrategies}
        onStrategyImplement={(strategyId) => {
          if (!implementedStrategies.includes(strategyId)) {
            setImplementedStrategies([...implementedStrategies, strategyId]);
          }
        }}
        onAllImplemented={() => onStepComplete?.({
          protectionStrategiesReviewed: true,
          strategiesImplemented: implementedStrategies.length
        })}
      />

      <ProgressSummary
        completed={implementedStrategies.length}
        total={protectionStrategies.length}
        message="protection strategies reviewed"
        encouragement="These practical steps can significantly reduce your exposure to banking fees."
      />
    </div>
  );
}
```

**Progress Steps**: 4 (one per protection strategy)
**Content Changes**: Enhanced with action steps and difficulty levels
**Mobile Enhancements**: Clear implementation tracking, encouraging feedback

---

### **⚠️ PAGE 17: Let's Talk About Account Closures**
**Current**: Text about closure possibility
**New Design**: **Pattern B** (Narrative with Icon)

**Implementation Details**:
```typescript
export function Page17({ onStepComplete }: PageProps) {
  return (
    <NarrativeTemplate
      icon={<WarningIcon className="w-16 h-16 text-red-600" />}
      title="Let's talk about something else that could have happened"
      content={
        <div className="space-y-4">
          <p className="text-lg">
            In some cases, the bank may just close your account after hitting overdraft or leaving it inactive.
          </p>

          <AlertCard
            variant="error"
            title="What?!"
            content="Common reasons this can happen include inactivity or low usage. Unresolved overdrafts can also lead to account closure. If your account remains in the negative for too many days, you may get charged additional overdraft fees."
          />

          <AlertCard
            variant="warning"
            title="How can they do this?"
            content="Generally, banks may close accounts for any reason and without notice. That is not fair or just, but it happens more often than you think."
          />
        </div>
      }
      onNext={() => onStepComplete?.({ closureRealityIntroduced: true })}
      layout="icon-top"
    />
  );
}
```

**Progress Steps**: 1 (closure introduction)
**Content Changes**: Enhanced with alert cards for impact
**Mobile Enhancements**: Clear warning hierarchy, touch-friendly alerts

---

### **😱 PAGE 18: Wait, They Can Just Close My Account?**
**Current**: Text about closure legality
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page18({ onStepComplete }: PageProps) {
  const [factsRevealed, setFactsRevealed] = useState<string[]>([]);

  const legalFacts = [
    {
      id: 'no-notification',
      title: 'No Federal Law Requiring Notification',
      fact: 'There is no federal law requiring banks to notify account holders if they plan to close their accounts.',
      impact: 'You might not know your account is closed until you try to use it.'
    },
    {
      id: 'money-return',
      title: 'Money Must Be Returned',
      fact: 'The bank is required to return any money that may have been in the account.',
      impact: 'Usually sent as a check to your last known address.'
    },
    {
      id: 'credit-impact',
      title: 'Potential Credit Score Impact',
      fact: 'Account closure doesn\'t directly impact credit, but unpaid overdraft fees can.',
      impact: 'Debts sent to collections can appear on credit reports and lower your score.'
    }
  ];

  return (
    <EducationalTemplate
      icon={<LegalDocumentIcon className="w-16 h-16 text-purple-600" />}
      title="Wait, they can just close my account without telling me?"
      interactive={
        <LegalFactsExplorer
          facts={legalFacts}
          revealedFacts={factsRevealed}
          onFactReveal={(factId) => {
            if (!factsRevealed.includes(factId)) {
              setFactsRevealed([...factsRevealed, factId]);
            }
          }}
          onAllRevealed={() => onStepComplete?.({ legalRealityUnderstood: true })}
        />
      }
      citation="Consumer Financial Protection Bureau Guidelines"
    />
  );
}
```

**Progress Steps**: 3 (one per legal fact)
**Content Changes**: Interactive fact exploration with impact explanations
**Mobile Enhancements**: Expandable fact cards, clear legal information

---

### **📊 PAGE 19: But How Common Is This?**
**Current**: Text + statistics reveal
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page19({ onStepComplete }: PageProps) {
  const [statisticsViewed, setStatisticsViewed] = useState(false);

  return (
    <EducationalTemplate
      icon={<ChartIcon className="w-16 h-16 text-purple-600" />}
      title="But how common is this?"
      content="Unfortunately, account closures happen more often than you'd think, especially to people who are already in vulnerable financial situations."
      interactive={
        <div className="space-y-6">
          <ImpactStatement
            statement="While exact numbers are hard to come by (banks don't like to publicize this information), consumer advocacy groups and financial counselors report that involuntary account closures disproportionately affect low-income individuals and communities of color."
          />

          {!statisticsViewed ? (
            <RevealButton
              text="Show Impact Statistics"
              onReveal={() => setStatisticsViewed(true)}
            />
          ) : (
            <StatisticsGrid
              title="Key Statistics"
              statistics={[
                { label: 'ChexSystems Impact', value: '1M+', description: 'people added annually due to account problems' },
                { label: 'Recovery Time', value: '5+ years', description: 'for negative banking records to be removed' },
                { label: 'Subsequent Banking', value: '80%', description: 'with ChexSystems records denied new accounts' },
                { label: 'Fee Burden', value: '3x more', description: 'low-income households pay relative to income' }
              ]}
              source="Various consumer advocacy groups and banking industry reports"
            />
          )}
        </div>
      }
    />
  );
}
```

**Progress Steps**: 2 (reality acknowledgment + statistics)
**Content Changes**: Interactive statistics reveal with context
**Mobile Enhancements**: Clear data presentation, touch-friendly reveal

---

### **🗃️ PAGE 20: What Is ChexSystems?**
**Current**: Definition + impact explanation
**New Design**: **Pattern C** (Educational Interactive)

**Implementation Details**:
```typescript
export function Page20({ onStepComplete }: PageProps) {
  const [sectionsExplored, setSectionsExplored] = useState<string[]>([]);

  const chexSections = [
    {
      id: 'definition',
      title: 'What is ChexSystems?',
      content: 'ChexSystems is a consumer reporting agency that tracks your banking history, similar to how credit bureaus track your credit history.',
      icon: <DatabaseIcon className="w-12 h-12 text-purple-600" />
    },
    {
      id: 'impact',
      title: 'The Hidden Impact',
      content: 'If you\'re in ChexSystems, most banks will automatically reject your application for a new checking or savings account.',
      icon: <BlockIcon className="w-12 h-12 text-red-600" />
    },
    {
      id: 'exclusion-cycle',
      title: 'The Cycle of Financial Exclusion',
      content: 'Being in ChexSystems often forces people to use expensive alternatives like check-cashing services and prepaid cards.',
      icon: <CycleIcon className="w-12 h-12 text-orange-600" />
    }
  ];

  return (
    <EducationalTemplate
      title="What is ChexSystems?"
      interactive={
        <ExplorationSections
          sections={chexSections}
          exploredSections={sectionsExplored}
          onSectionExplore={(sectionId) => {
            if (!sectionsExplored.includes(sectionId)) {
              setSectionsExplored([...sectionsExplored, sectionId]);
            }
          }}
          onAllExplored={() => onStepComplete?.({ chexSystemsUnderstood: true })}
        />
      }
      glossaryTerms={[
        { term: "consumer reporting agency", definition: "A company that collects and sells credit or other information about consumers" },
        { term: "ChexSystems", definition: "A consumer reporting agency that tracks banking history and account problems" }
      ]}
    />
  );
}
```

**Progress Steps**: 3 (definition + impact + exclusion cycle)
**Content Changes**: Section-based exploration with clear explanations
**Mobile Enhancements**: Visual section cards, progressive disclosure

---

### **🌟 PAGE 21: The Good News: Second Chance Banking**
**Current**: Text + bank list reveal
**New Design**: **Pattern A** (Learning Objectives - Second Chance Checklist)

**Implementation Details**:
```typescript
export function Page21({ onStepComplete }: PageProps) {
  const [exploredOptions, setExploredOptions] = useState<string[]>([]);

  const secondChanceOptions = [
    {
      id: 'chime',
      name: 'Chime',
      features: ['No ChexSystems check', 'No monthly fees', 'Mobile-first banking'],
      type: 'Online Bank'
    },
    {
      id: 'capital-one-360',
      name: 'Capital One 360',
      features: ['Second chance checking', 'No minimum balance', 'Fee-friendly policies'],
      type: 'Traditional Bank'
    },
    {
      id: 'lending-club',
      name: 'LendingClub',
      features: ['Second chance accounts', 'No overdraft fees', 'Financial education resources'],
      type: 'Online Bank'
    },
    {
      id: 'gobank',
      name: 'GoBank',
      features: ['No ChexSystems required', 'Low fees', 'Mobile banking'],
      type: 'Online Bank'
    },
    {
      id: 'credit-unions',
      name: 'Local Credit Unions',
      features: ['Community focus', 'Often more flexible', 'Financial counseling'],
      type: 'Credit Union'
    }
  ];

  return (
    <div className="space-y-6">
      <HopeMessage
        title="The good news: 'Second chance' banking"
        message="Fortunately, there's a growing movement in banking called 'second chance banking.' These are banks and credit unions that either don't use ChexSystems at all, or are willing to work with people who have had banking problems in the past."
      />

      <SecondChanceBankingGrid
        options={secondChanceOptions}
        exploredOptions={exploredOptions}
        onOptionExplore={(optionId) => {
          if (!exploredOptions.includes(optionId)) {
            setExploredOptions([...exploredOptions, optionId]);
          }
        }}
        onAllExplored={() => onStepComplete?.({
          secondChanceBankingLearned: true,
          optionsExplored: exploredOptions.length
        })}
      />

      <DisclaimerNote
        text="Always verify current policies as banking requirements can change."
      />
    </div>
  );
}
```

**Progress Steps**: 5 (one per second chance option)
**Content Changes**: Enhanced with bank types and detailed features
**Mobile Enhancements**: Grid layout optimized for mobile, clear feature lists

---

### **📝 PAGE 22: Key Takeaways**
**Current**: 6 takeaways with checkboxes
**New Design**: **Pattern A** (Learning Objectives - Takeaways Checklist)

**Implementation Details**:
```typescript
export function Page22({ onStepComplete }: PageProps) {
  const [acknowledgedTakeaways, setAcknowledgedTakeaways] = useState<string[]>([]);

  const keyTakeaways = [
    {
      id: 'fees-revenue',
      title: 'Banking fees are a major source of bank revenue',
      description: 'Fees can account for up to 40% of a bank\'s revenue. This means banks have a financial incentive to charge fees, even if they hurt customers.',
      importance: 'Critical'
    },
    {
      id: 'resequencing-legal',
      title: 'Debit resequencing is legal but harmful',
      description: 'Banks can reorder your transactions to maximize overdraft fees. This practice is perfectly legal but can significantly increase the fees you pay.',
      importance: 'Critical'
    },
    {
      id: 'account-closure',
      title: 'Banks can close your account without notice',
      description: 'There\'s no federal law requiring banks to notify you before closing your account. This can happen due to overdrafts, inactivity, or other reasons.',
      importance: 'Important'
    },
    {
      id: 'chexsystems-impact',
      title: 'ChexSystems can lock you out of banking',
      description: 'If you end up in ChexSystems due to banking problems, it can be nearly impossible to open a new bank account at most traditional banks.',
      importance: 'Important'
    },
    {
      id: 'not-your-fault',
      title: 'These systems are designed to be confusing',
      description: 'Banking fee structures and policies are intentionally complex. If you\'ve been caught by surprise fees, it\'s not because you\'re bad with money.',
      importance: 'Critical'
    },
    {
      id: 'alternatives-exist',
      title: 'Alternatives and protections exist',
      description: 'Second chance banking, fee-free banks, and consumer protections are available. You have options even if you\'ve had banking problems.',
      importance: 'Hopeful'
    }
  ];

  return (
    <KeyTakeawaysTemplate
      title="Key takeaways"
      subtitle="Let's review the most important things to remember from this unit. Check off each takeaway as you read through them:"
      takeaways={keyTakeaways}
      acknowledgedTakeaways={acknowledgedTakeaways}
      onTakeawayAcknowledge={(takeawayId) => {
        if (!acknowledgedTakeaways.includes(takeawayId)) {
          setAcknowledgedTakeaways([...acknowledgedTakeaways, takeawayId]);
        }
      }}
      onAllAcknowledged={() => onStepComplete?.({
        keyTakeawaysReviewed: true,
        takeawaysAcknowledged: acknowledgedTakeaways.length,
        allTakeawaysComplete: acknowledgedTakeaways.length === keyTakeaways.length
      })}
    />
  );
}
```

**Progress Steps**: 6 (one per key takeaway)
**Content Changes**: Enhanced with importance levels and better organization
**Mobile Enhancements**: Clear importance indicators, progress tracking

---

### **💪 PAGE 23: Remember (Final Empowerment)**
**Current**: Final empowerment message + action items
**New Design**: **Pattern A** (Learning Objectives - Action Checklist)

**Implementation Details**:
```typescript
export function Page23({ onStepComplete }: PageProps) {
  const [committedActions, setCommittedActions] = useState<string[]>([]);

  const empowermentActions = [
    {
      id: 'share-knowledge',
      title: 'Share this knowledge with friends and family',
      description: 'Help others understand these banking practices',
      actionType: 'immediate'
    },
    {
      id: 'research-options',
      title: 'Research your banking options carefully',
      description: 'Compare fee structures and policies before choosing a bank',
      actionType: 'ongoing'
    },
    {
      id: 'transparent-banks',
      title: 'Consider banks with transparent, fair fee structures',
      description: 'Look for banks that have eliminated predatory practices',
      actionType: 'decision'
    },
    {
      id: 'support-policy',
      title: 'Support policy changes that protect consumers',
      description: 'Stay informed about financial regulations and advocate for fair practices',
      actionType: 'civic'
    },
    {
      id: 'self-worth',
      title: 'Remember that financial struggles don\'t reflect your worth',
      description: 'These systems are designed to be confusing - it\'s not your fault',
      actionType: 'mindset'
    }
  ];

  return (
    <FinalEmpowermentTemplate
      title="Remember: The fees you incur are NOT your fault"
      empowermentMessage="The banking system is designed to be confusing and to extract fees from people, especially those who are already in vulnerable financial situations. These practices disproportionately affect communities of color, low-income individuals, and people who are already struggling financially."
      keyMessage="Understanding these systems is the first step toward protecting yourself and advocating for change."
      actions={empowermentActions}
      committedActions={committedActions}
      onActionCommit={(actionId) => {
        if (!committedActions.includes(actionId)) {
          setCommittedActions([...committedActions, actionId]);
        }
      }}
      onCompletion={() => {
        onStepComplete?.({
          empowermentMessageSeen: true,
          actionsCommitted: committedActions.length
        });
        setTimeout(() => window.location.href = '/banking-fees', 500);
      }}
    />
  );
}
```

**Progress Steps**: 5 (one per empowerment action)
**Content Changes**: Enhanced with action types and commitment tracking
**Mobile Enhancements**: Clear action categories, inspiring final message

---

## **Component Architecture**

### **New Template Components**

#### **1. LearningObjectivesTemplate**
```typescript
interface LearningObjectivesTemplateProps {
  title: string;
  subtitle?: string;
  objectives: Array<{
    id: string;
    text: string;
    details?: string;
  }>;
  completedObjectives: string[];
  onObjectiveComplete: (id: string) => void;
  onAllComplete: () => void;
  variant: 'intro' | 'bank-list' | 'protection' | 'takeaways' | 'empowerment';
  icon?: React.ReactNode;
  actionText?: string;
  actionContent?: string;
}
```

#### **2. NarrativeTemplate**
```typescript
interface NarrativeTemplateProps {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  onNext: () => void;
  layout: 'icon-top' | 'icon-left' | 'icon-center';
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
}
```

#### **3. EducationalTemplate**
```typescript
interface EducationalTemplateProps {
  icon?: React.ReactNode;
  title: string;
  content?: string | React.ReactNode;
  subtitle?: string;
  interactive?: React.ReactNode;
  glossaryTerms?: Array<{
    term: string;
    definition: string;
    citation?: string;
  }>;
  citations?: string[];
}
```

#### **4. Mobile-First Components**
```typescript
// Fee Definition Modal
interface FeeDefinitionModalProps {
  title: string;
  definition: string;
  impact?: string;
  amount?: string;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
}

// Mobile Fee Grid
interface MobileFeeGridProps {
  fees: Array<{
    id: string;
    name: string;
    definition: string;
  }>;
  onFeeClick: (fee: Fee) => void;
  exploredFees: string[];
  layout: 'mobile-first' | 'desktop-optimized';
}

// Enhanced Statement
interface MobileStatementProps {
  title: string;
  transactions: Transaction[];
  currentBalance: number;
  onFeeClick: (fee: Fee) => void;
  showUserQuote?: string;
}

// Survey Components
interface MobileSurveyIntroProps {
  title: string;
  keyPoints: string[];
  onStart: () => void;
}

interface MobileSurveyQuestionProps {
  question: string;
  inputType: 'text' | 'number' | 'select';
  placeholder?: string;
  alternativeAction?: {
    label: string;
    onClick: () => void;
  };
  onSubmit: (value: string) => void;
}

// Progress Break
interface ProgressBreakProps {
  title: string;
  illustration?: React.ComponentType;
  onContinue: () => void;
}
```

---

## **Implementation Timeline**

### **Week 1: Foundation Components**
- ✅ Create template components (Learning Objectives, Narrative, Educational)
- ✅ Build mobile-first components (Modal, Grid, Statement, Survey, Break)
- ✅ Implement purple theme system and 8-dot progress bar
- ✅ Create SVG icon library (15+ icons)

### **Week 2: Page Implementation (Pages 1-12)**
- ✅ Implement Pages 1-6 with new templates
- ✅ Add mobile survey functionality to Page 4
- ✅ Enhance statement view in Page 3
- ✅ Create fee grid and modals for Pages 7-8
- ✅ Build calculator enhancement for Page 9
- ✅ Add progress break after Page 12

### **Week 3: Page Implementation (Pages 13-23)**
- ✅ Implement Pages 13-18 with interactive elements
- ✅ Add statistics and legal fact exploration
- ✅ Build second chance banking grid for Page 21
- ✅ Create key takeaways and empowerment templates
- ✅ Implement final action commitment system

### **Week 4: Integration & Testing**
- ✅ Integrate all pages with enhanced progress tracking
- ✅ Test responsive design across devices
- ✅ Optimize touch interactions and accessibility
- ✅ Performance testing and optimization

### **Week 5: Polish & Launch**
- ✅ Final visual polish and animation refinements
- ✅ Cross-browser testing and bug fixes
- ✅ User testing and feedback integration
- ✅ Production deployment

---

## **Success Metrics**

### **Educational Effectiveness**
- **100% content preservation** with enhanced engagement
- **50+ sub-steps** for granular progress tracking
- **Interactive exploration** of all key concepts
- **Mobile-first accessibility** for all users

### **User Experience**
- **Purple theme consistency** across all components
- **Touch-optimized interactions** (44px+ targets)
- **Smooth progress tracking** with visual feedback
- **Empowering final message** with actionable commitments

### **Technical Excellence**
- **Responsive design** working perfectly across devices
- **Fast load times** with optimized components
- **Accessibility compliance** (WCAG 2.1 AA)
- **Scalable architecture** for future units

This integrated plan transforms all 22 Unit 2 pages into a cohesive, engaging, and educationally effective experience that preserves 100% of the original content while dramatically improving the visual design and user interaction patterns.
