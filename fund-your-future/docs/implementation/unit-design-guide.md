# Fund Your Future Unit Design Guide

**A Comprehensive Guide to Designing Educational Units with the Design System**

_Based on learnings from Units 1-5 migration and design system development_

---

## Table of Contents

1. [Overview & Philosophy](#overview--philosophy)
2. [Unit Structure Patterns](#unit-structure-patterns)
3. [Component Selection Guide](#component-selection-guide)
4. [Page Layout Patterns](#page-layout-patterns)
5. [Content Organization](#content-organization)
6. [Interactive Elements](#interactive-elements)
7. [Common Patterns & Templates](#common-patterns--templates)
8. [Design System Best Practices](#design-system-best-practices)
9. [Migration Patterns & Component Replacements](#migration-patterns--component-replacements)
10. [Troubleshooting & Common Issues](#troubleshooting--common-issues)

---

## Overview & Philosophy

### Design Principles

1. **Consistency**: All units should feel cohesive and part of the same educational experience
2. **Progressive Disclosure**: Information should be revealed in logical, digestible chunks
3. **Accessibility**: Dark backgrounds with white text for hero sections, proper contrast throughout
4. **Mobile-First**: All components are responsive and touch-optimized
5. **Semantic Meaning**: Use components that match the content's purpose

### Visual Hierarchy

```
HeroCard (Dark background, white text)
├── Unit introduction and overview
├── Key learning objectives
└── Call-to-action to begin

ContentBox Variants
├── Definitions and key concepts
├── Warnings and important notes
└── Interactive instructions

Regular Content Flow
├── Explanatory text
├── Examples and scenarios
└── Progress indicators
```

---

## Unit Structure Patterns

### Standard Unit Flow

Every unit should follow this proven structure:

#### 1. **Overview/Introduction Page**

```tsx
const Page1 = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="md">
    <HeroCard>
      <UnitTitle level="h2">Unit Title</UnitTitle>
      <p className="mb-4 text-base text-white sm:mb-6 sm:text-lg">
        Main introduction paragraph with engaging hook.
      </p>
      <p className="mb-4 text-white">
        Additional context and learning objectives.
      </p>
      <p className="mb-6 text-white">
        What students will accomplish in this unit.
      </p>
    </HeroCard>

    <ContentBox variant="callout" semantic="info" title="Key Concept">
      <Text>Definition or important foundational knowledge.</Text>
    </ContentBox>

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
```

#### 2. **Concept Pages (2-3 pages)**

Focus on teaching core concepts with clear explanations and visual aids.

#### 3. **Interactive/Activity Pages (1-2 pages)**

Hands-on activities, simulations, or decision-making exercises.

#### 4. **Application/Reflection Pages (1-2 pages)**

Help students apply what they've learned to real scenarios.

#### 5. **Completion Page**

Celebrate progress and transition to next unit.

---

## Component Selection Guide

### When to Use Each Component

#### **HeroCard**

- **Use for**: Unit introductions, major section overviews
- **Styling**: Dark gradient background, white text
- **Content**: Unit title, overview, learning objectives

```tsx
<HeroCard>
  <UnitTitle level="h2">Unit Title</UnitTitle>
  <p className="text-white">White text content...</p>
</HeroCard>
```

#### **ContentBox Variants**

##### `variant="callout"`

- **Use for**: Definitions, key concepts, important notes
- **Semantic options**: `info`, `warning`, `error`, `success`, `neutral`
- **Border options**: `default`, `thick`, `accent`, `none`

```tsx
<ContentBox
  variant="callout"
  semantic="warning"
  border="accent"
  title="Important"
>
  <Text>Key information students must understand.</Text>
</ContentBox>
```

##### `variant="callout" gradient={true}`

- **Use for**: Instructions for interactive activities
- **Important**: Add `className="text-white"` to child Text components

```tsx
<ContentBox variant="callout" semantic="info" gradient title="How it works:">
  <Text className="text-white">Instructions with white text</Text>
</ContentBox>
```

##### `variant="summary"`

- **Use for**: Data displays, clean information cards
- **Styling**: White background, minimal styling

```tsx
<ContentBox variant="summary">
  <AccentHeading level="h3">Summary Title</AccentHeading>
  <Text>Clean, organized information.</Text>
</ContentBox>
```

#### **UnifiedCard Variants**

##### `variant="elevated"`

- **Use for**: Main content containers, important sections
- **Styling**: Enhanced shadow, prominent appearance

```tsx
<UnifiedCard variant="elevated" size="lg">
  <Stack spacing="md">{/* Main content */}</Stack>
</UnifiedCard>
```

##### `variant="interactive"`

- **Use for**: Clickable cards, case studies
- **Features**: Hover effects, transition animations

```tsx
<UnifiedCard variant="interactive" onClick={handleClick}>
  <Text>Clickable content</Text>
</UnifiedCard>
```

#### **Typography Components**

##### **UnitTitle**

- **Use for**: Main unit titles (h1, h2)
- **Styling**: Large, bold, attention-grabbing

```tsx
<UnitTitle level="h1">Main Unit Title</UnitTitle>
<UnitTitle level="h2">Section Title</UnitTitle>
```

##### **UnifiedHeading**

- **Use for**: Standard section headings
- **Variants**: `default`, `accent`, `muted`

```tsx
<UnifiedHeading variant="default" level="h2">Section Title</UnifiedHeading>
<UnifiedHeading variant="accent" level="h3">Subsection</UnifiedHeading>
```

##### **AccentHeading**

- **Use for**: Highlighted subsections
- **Semantic options**: Match the parent container's semantic meaning

```tsx
<AccentHeading level="h3" semantic="success">
  Success Story
</AccentHeading>
```

##### **Text**

- **Use for**: All body text
- **Variants**: `body` (default), `small`, `large`, `subtitle`
- **Weights**: `normal`, `medium`, `semibold`, `bold`

```tsx
<Text variant="body">Standard paragraph text</Text>
<Text variant="small" semantic="muted">Caption or fine print</Text>
<Text weight="bold" className="inline">Inline emphasis</Text>
```

#### **Layout Components**

##### **Stack**

- **Use for**: Vertical spacing between elements
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`

```tsx
<Stack spacing="lg">{/* Vertically spaced content */}</Stack>
```

##### **Grid**

- **Use for**: Multi-column layouts
- **Responsive**: `cols`, `smCols`, `mdCols`, `lgCols`
- **Gap**: `xs`, `sm`, `md`, `lg`, `xl`

```tsx
<Grid cols={1} mdCols={2} lgCols={3} gap="md">
  {/* Grid items */}
</Grid>
```

##### **Center**

- **Use for**: Centering buttons and important elements

```tsx
<Center>
  <AnimatedButton>Centered Button</AnimatedButton>
</Center>
```

#### **Interactive Components**

##### **Badge**

- **Use for**: Status indicators, labels, small tags
- **Variants**: `filled`, `outline`, `soft`
- **Semantic**: `success`, `error`, `warning`, `info`, `neutral`

```tsx
<Badge variant="soft" semantic="success" size="sm">
  ✓ Complete
</Badge>
```

##### **AnimatedButton**

- **Use for**: Primary actions, navigation
- **Variants**: `primary`, `secondary`, `success`
- **Features**: Loading states, success animation

```tsx
<AnimatedButton
  onClick={handleClick}
  variant="primary"
  size="lg"
  showSuccessState={true}
>
  Continue →
</AnimatedButton>
```

---

## Page Layout Patterns

### Container Structure

Every page should use this nested container pattern:

```tsx
// Unit Index (Main Container)
<PageContainer variant="page" background="neutral">
  <AppHeader {...headerProps} />

  <PageContainer variant="constrained">
    <Stack spacing="md">
      <SectionProgress {...progressProps} />

      <UnifiedCard variant="elevated" size="lg">
        {/* Page Content Goes Here */}
      </UnifiedCard>

      <Navigation {...navProps} />
    </Stack>
  </PageContainer>
</PageContainer>
```

### Page Content Patterns

#### **Information-Heavy Pages**

```tsx
<Stack spacing="lg">
  <UnifiedHeading variant="default" level="h2">
    Page Title
  </UnifiedHeading>

  <Stack spacing="md">
    <Text>Main explanatory content...</Text>

    <ContentBox variant="callout" semantic="info">
      <Text>Important supplementary information</Text>
    </ContentBox>

    <Text>Additional context...</Text>
  </Stack>

  <Center>
    <AnimatedButton>Continue →</AnimatedButton>
  </Center>
</Stack>
```

#### **Interactive Activity Pages**

```tsx
<Stack spacing="lg">
  <UnifiedHeading variant="default" level="h2">
    Activity Title
  </UnifiedHeading>

  <Stack spacing="md">
    <Text>Activity introduction...</Text>

    <ContentBox
      variant="callout"
      semantic="info"
      gradient
      title="Instructions:"
    >
      <Text className="text-white">Activity instructions with white text</Text>
    </ContentBox>
  </Stack>

  {/* Interactive Component */}
  <InteractiveComponent onComplete={handleComplete} />

  {/* Conditional Continue Button */}
  {isComplete && (
    <Center>
      <AnimatedButton variant="success">🎯 Complete Activity</AnimatedButton>
    </Center>
  )}
</Stack>
```

#### **Results/Summary Pages**

```tsx
<Stack spacing="lg">
  <UnifiedHeading variant="default" level="h2">
    Your Results
  </UnifiedHeading>

  <Stack spacing="md">
    <Text>Results introduction...</Text>

    <Grid cols={1} mdCols={2} lgCols={3} gap="md">
      {results.map((result, index) => (
        <ContentBox key={index} variant="summary">
          <AccentHeading level="h3">{result.title}</AccentHeading>
          <Text>{result.description}</Text>
        </ContentBox>
      ))}
    </Grid>

    <ContentBox variant="callout" semantic="success">
      <Text>Encouraging message or key takeaway</Text>
    </ContentBox>
  </Stack>

  <Center>
    <AnimatedButton>Continue →</AnimatedButton>
  </Center>
</Stack>
```

---

## Content Organization

### Information Hierarchy

#### **Primary Information**

- Use `HeroCard` for unit introductions
- Use `UnifiedHeading` for main sections
- Use `Text` with default styling for primary content

#### **Secondary Information**

- Use `ContentBox variant="callout"` for definitions
- Use `AccentHeading` for subsections
- Use `Badge` for status indicators

#### **Supplementary Information**

- Use `Text variant="small"` for captions
- Use `Text semantic="muted"` for less important content
- Use `ContentBox variant="summary"` for data displays

### Content Flow Guidelines

1. **Start with Context**: Always begin with a clear explanation of what the page covers
2. **Introduce Before Interact**: Explain concepts before asking students to apply them
3. **Provide Feedback**: Give immediate feedback on interactive elements
4. **Summarize Learning**: End with key takeaways or progress acknowledgment

### Text Color Guidelines & Implementation

#### **Critical Text Contrast Requirements**

Based on extensive migration work across Units 1-5, proper text contrast is essential for accessibility and readability.

#### **Dark Backgrounds** (HeroCard, gradient ContentBox)

- **Always use**: `className="text-white"` on ALL text elements
- **Components requiring white text**:
  - All `<Text>` components inside `<HeroCard>`
  - All text inside `<ContentBox variant="callout" gradient>`
  - Any text on dark gradient backgrounds

**✅ Correct Implementation:**

```tsx
<HeroCard>
  <UnitTitle level="h2">Unit Title</UnitTitle>
  <Text variant="large" className="text-white">
    Main introduction paragraph with white text for contrast.
  </Text>
  <Text className="text-white">Additional context paragraph.</Text>
  <BulletList>
    <ListItem>Bullet points automatically inherit white text</ListItem>
  </BulletList>
</HeroCard>
```

**❌ Common Mistake:**

```tsx
<HeroCard>
  <UnitTitle level="h2">Unit Title</UnitTitle>
  <Text variant="large">This text will be invisible on dark background!</Text>
  <Text>This text will also be invisible!</Text>
</HeroCard>
```

#### **Light Backgrounds** (Default)

- **Use**: `text-gray-900` for maximum contrast and readability
- **Avoid**: `text-gray-700` or lighter grays that may appear too light
- **Semantic colors**: Available through component props

**✅ Correct Implementation for Headings:**

```tsx
<UnitTitle level="h2" className="text-gray-900">
  Banking Vocabulary Flashcards
</UnitTitle>

<UnitTitle level="h2" className="text-gray-900">
  So, how robust is your banking vocab?
</UnitTitle>
```

**✅ Correct Implementation for Body Text:**

```tsx
<Text variant="body">Default text uses proper contrast</Text>
<Text className="text-gray-900">Explicit black text for emphasis</Text>
```

#### **Component-Specific Text Color Patterns**

##### **HeroCard Text Requirements**

Every HeroCard in unit introductions MUST have white text:

```tsx
// Unit 1 Pattern
<HeroCard>
  <UnitTitle level="h2">What's in a Bank?</UnitTitle>
  <Text variant="large" className="text-white">
    A lot, actually! This unit will focus specifically on how to navigate...
  </Text>
  <Text className="text-white">We will cover:</Text>
  <BulletList>
    <ListItem>Why banking institutions exist and how they operate</ListItem>
  </BulletList>
</HeroCard>

// Unit 3 Pattern
<HeroCard>
  <UnitTitle level="h2">How Banking Affects You</UnitTitle>
  <Text variant="large" className="text-white">
    Banking over the course of your life will be nonlinear...
  </Text>
  <Text className="text-white">
    In this unit, we'll explore the psychological and emotional impacts...
  </Text>
</HeroCard>
```

##### **UnitTitle Color Enforcement**

UnitTitle components should explicitly use black text to override any inherited styling:

```tsx
// Page headings - always black for maximum readability
<UnitTitle level="h2" className="text-gray-900">
  Banking Vocabulary Flashcards
</UnitTitle>

<UnitTitle level="h2" className="text-gray-900">
  So, how robust is your banking vocab?
</UnitTitle>
```

##### **ContentBox Gradient Text**

When using gradient ContentBox for instructions:

```tsx
<ContentBox variant="callout" semantic="info" gradient title="Instructions:">
  <Text className="text-white">
    Step-by-step instructions with proper white text contrast.
  </Text>
  <Text className="text-white">
    Additional instruction details also in white.
  </Text>
</ContentBox>
```

#### **Text Contrast Debugging Checklist**

When encountering text visibility issues:

1. **Identify Background Type**:
   - Dark (HeroCard, gradient) → Use `text-white`
   - Light (default) → Use `text-gray-900` or default

2. **Check Component Context**:
   - Inside HeroCard → ALL text needs `text-white`
   - Inside gradient ContentBox → ALL text needs `text-white`
   - Regular content → Use `text-gray-900` for headings

3. **Verify Implementation**:

   ```tsx
   // ✅ Good - Explicit white text on dark background
   <Text className="text-white">Visible text</Text>

   // ❌ Bad - No text color specified on dark background
   <Text>Invisible text</Text>

   // ✅ Good - Explicit black text for headings
   <UnitTitle className="text-gray-900">Visible heading</UnitTitle>

   // ⚠️ Potentially problematic - May inherit lighter color
   <UnitTitle>Heading that might be too light</UnitTitle>
   ```

#### **Common Text Color Issues Found in Migration**

1. **Missing white text in HeroCards** (Units 1 & 3)
   - **Issue**: Text invisible on dark gradient backgrounds
   - **Fix**: Add `className="text-white"` to all Text components

2. **Light gray text for headings** (Unit 1)
   - **Issue**: UnitTitle headings too light against white backgrounds
   - **Fix**: Add `className="text-gray-900"` for maximum contrast

3. **Inconsistent module page text** (Banking overview)
   - **Issue**: text-gray-700 not dark enough for optimal readability
   - **Fix**: Change to text-gray-900 throughout

#### **Accessibility Standards**

- **WCAG AA compliance**: Text must have 4.5:1 contrast ratio minimum
- **White on dark**: Always use pure white (`text-white`) not gray tints
- **Black on light**: Use `text-gray-900` for maximum contrast, avoid `text-gray-700`
- **Interactive elements**: Ensure proper focus states maintain contrast

#### **Migration Pattern Summary**

| Background Type     | Text Component | Required Class              | Example            |
| ------------------- | -------------- | --------------------------- | ------------------ |
| HeroCard (dark)     | `<Text>`       | `className="text-white"`    | Unit introductions |
| Gradient ContentBox | `<Text>`       | `className="text-white"`    | Instructions       |
| Default (light)     | `<UnitTitle>`  | `className="text-gray-900"` | Page headings      |
| Default (light)     | `<Text>`       | Default or `text-gray-900`  | Body content       |

---

## Interactive Elements

### Activity Types & Components

#### **Decision-Making Activities**

```tsx
// Use InteractiveSpectrum for complex decision mapping
<InteractiveSpectrum
  onResponseSelect={handleResponse}
  selectedResponse={selectedResponse}
  title="Response Spectrum"
  instructions="Click to plot your response"
  layout="compact"
/>
```

#### **Card-Based Activities**

```tsx
// Use SwipeContainer for Tinder-style interactions
<SwipeContainer
  items={cardData}
  onSwipeLeft={handleReject}
  onSwipeRight={handleAccept}
  onComplete={handleAllComplete}
  showProgress={true}
/>
```

#### **Multi-Step Processes**

```tsx
// Use conditional rendering with state management
{
  currentStep === 1 && <StepOneComponent />;
}
{
  currentStep === 2 && <StepTwoComponent />;
}
{
  currentStep === 3 && <ResultsComponent />;
}
```

### Button Patterns

#### **Primary Actions**

```tsx
<AnimatedButton
  variant="primary"
  size="lg"
  showSuccessState={true}
  onClick={handlePrimaryAction}
>
  Primary Action →
</AnimatedButton>
```

#### **Activity Completion**

```tsx
<AnimatedButton
  variant="success"
  size="lg"
  showSuccessState={true}
  onClick={handleComplete}
>
  🎯 Complete Activity
</AnimatedButton>
```

#### **Final Completion**

```tsx
<AnimatedButton
  variant="success"
  size="lg"
  showSuccessState={true}
  onClick={handleUnitComplete}
>
  🎉 Complete Unit
</AnimatedButton>
```

---

## Common Patterns & Templates

### Template: Standard Learning Page

```tsx
const LearningPage = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">
      [Page Title]
    </UnifiedHeading>

    <Stack spacing="md">
      <Text>[Main explanatory content]</Text>

      <ContentBox variant="callout" semantic="info" title="[Key Concept]">
        <Text>[Definition or important information]</Text>
      </ContentBox>

      <Text>[Additional context or examples]</Text>
    </Stack>

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
```

### Template: Interactive Activity Page

```tsx
const ActivityPage = ({ onStepComplete, stepData }: any) => {
  const [isComplete, setIsComplete] = useState(false);
  const [activityData, setActivityData] = useState(null);

  const handleActivityComplete = (data) => {
    setActivityData(data);
    setIsComplete(true);
    onStepComplete({
      activityComplete: true,
      activityData: data,
    });
  };

  return (
    <Stack spacing="lg">
      <UnifiedHeading variant="default" level="h2">
        [Activity Title]
      </UnifiedHeading>

      <Stack spacing="md">
        <Text>[Activity introduction and context]</Text>

        <ContentBox
          variant="callout"
          semantic="info"
          gradient
          title="Instructions:"
        >
          <Text className="text-white">[Clear, step-by-step instructions]</Text>
        </ContentBox>
      </Stack>

      <InteractiveComponent
        onComplete={handleActivityComplete}
        data={stepData?.activityData}
      />

      {isComplete && (
        <Center>
          <AnimatedButton
            onClick={() =>
              onStepComplete({
                pageViewed: true,
                completed: true,
                data: activityData,
              })
            }
            variant="success"
            size="lg"
            showSuccessState={true}
          >
            🎯 Continue to Results
          </AnimatedButton>
        </Center>
      )}
    </Stack>
  );
};
```

### Template: Unit Completion Page

```tsx
const CompletionPage = ({ onStepComplete, stepData }: any) => (
  <Stack spacing="lg">
    <UnifiedHeading variant="default" level="h2">
      Unit [X] Complete!
    </UnifiedHeading>

    <Stack spacing="md">
      <Text>[Congratulatory message and summary of learning]</Text>

      <Text>[Reflection prompt or connection to next unit]</Text>

      <ContentBox variant="callout" semantic="success" title="Key Takeaway:">
        <Text>[Main learning objective achieved]</Text>
      </ContentBox>
    </Stack>

    <Center>
      <AnimatedButton
        onClick={() => onStepComplete({ completed: true })}
        variant="success"
        size="lg"
        showSuccessState={true}
      >
        🎉 Complete Unit [X]
      </AnimatedButton>
    </Center>
  </Stack>
);
```

---

## Migration Patterns & Component Replacements

### Common Hardcoded Patterns → Design System Replacements

Based on comprehensive Units 2, 4-5 migration analysis (500+ converted elements), here are the most common patterns that need replacing:

#### **Container & Layout Patterns**

| Hardcoded Pattern                                | Design System Replacement                | Notes                     |
| ------------------------------------------------ | ---------------------------------------- | ------------------------- |
| `<div className="space-y-6">`                    | `<Stack spacing="large">`                | Primary container pattern |
| `<div className="space-y-4">`                    | `<Stack spacing="md">`                   | Standard content spacing  |
| `<div className="space-y-3">`                    | `<Stack spacing="sm">`                   | Compact content spacing   |
| `<div className="text-center">`                  | `<Center>` or `<Box textAlign="center">` | Element centering         |
| `<div className="grid gap-6 md:grid-cols-2">`    | `<Grid cols={1} mdCols={2} gap="large">` | Responsive grid layouts   |
| `<main className="mx-auto max-w-4xl px-4 py-6">` | `<PageContainer variant="constrained">`  | Page-level containers     |

#### **Typography Patterns**

| Hardcoded Pattern                                      | Design System Replacement                       | Notes                |
| ------------------------------------------------------ | ----------------------------------------------- | -------------------- |
| `<h2 className="text-2xl font-bold text-gray-900">`    | `<UnifiedHeading level="h2" variant="default">` | Standard page titles |
| `<h3 className="text-lg font-semibold text-blue-900">` | `<UnifiedHeading level="h3" semantic="info">`   | Section headers      |
| `<p className="text-gray-900 leading-relaxed">`        | `<Text variant="body">`                         | Body text content    |
| `<p className="text-sm text-gray-600">`                | `<Text size="sm" semantic="muted">`             | Caption/helper text  |
| `<p className="font-bold">`                            | `<Text weight="bold">`                          | Emphasized text      |

#### **Interactive Component Patterns**

| Hardcoded Pattern                | Design System Replacement              | Notes                     |
| -------------------------------- | -------------------------------------- | ------------------------- |
| Custom checkbox divs             | `<Checkbox>` component                 | Create reusable checkbox  |
| Custom radio button divs         | `<RadioGroup>` component               | Create radio group system |
| `CalloutBox` components          | `<ContentBox variant="callout">`       | Direct replacement        |
| Hardcoded AnimatedButton classes | `<Button variant="primary/secondary">` | Standardized buttons      |

#### **Card & Information Patterns**

| Hardcoded Pattern                                                    | Design System Replacement                        | Notes                   |
| -------------------------------------------------------------------- | ------------------------------------------------ | ----------------------- |
| `<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">` | `<ContentBox variant="callout" semantic="info">` | Information cards       |
| `<div className="bg-red-50 border border-red-200 rounded-lg p-4">`   | `<ContentBox variant="alert" semantic="error">`  | Warning/error cards     |
| `<div className="bg-gradient-to-r from-blue-50 to-purple-50">`       | `<ContentBox variant="empowerment" gradient>`    | Gradient backgrounds    |
| Custom selection cards                                               | `<UnifiedCard variant="interactive">`            | Clickable content cards |

### Unit Container Structure Migration

#### **Before (Hardcoded):**

```tsx
// Unit 5 original structure
<div className="min-h-screen bg-gray-50">
  <AppHeader ... />
  <main className="mx-auto w-[90%] max-w-4xl px-4 py-6 pb-32 sm:pb-20">
    <SectionProgress ... />
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border mb-6">
      {/* Content */}
    </div>
    <Navigation
      canAdvance={canAdvance}
      showNext={currentPage < TOTAL_PAGES}
      showPrevious={currentPage > 1}
    />
  </main>
</div>
```

#### **After (Design System):**

```tsx
// Proper design system structure
<PageContainer variant="page" background="neutral">
  <AppHeader ... />

  <PageContainer variant="constrained" className="pb-20 sm:pb-16">
    <Stack spacing="md">
      <SectionProgress ... />

      {currentPage === 1 ? (
        <HeroCard variant="primary">
          <UnifiedHeading level="h2" semantic="white">Unit Title</UnifiedHeading>
          <Text className="text-white">Overview content...</Text>
        </HeroCard>
      ) : (
        <UnifiedCard variant="elevated" size="lg">
          <CurrentPageContent ... />
        </UnifiedCard>
      )}

      <Navigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        canGoBack={currentPage > 1}
        canGoForward={currentPage < TOTAL_PAGES}
      />
    </Stack>
  </PageContainer>
</PageContainer>
```

### Page Content Migration Patterns

#### **Information Page Migration:**

**Before:**

```tsx
<div className="space-y-6">
  <h2 className="text-2xl font-bold text-gray-900">Page Title</h2>
  <p className="leading-relaxed text-gray-900">Content...</p>
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
    <h3 className="mb-4 text-lg font-semibold text-blue-900">Important Note</h3>
    <p className="text-blue-700">Information...</p>
  </div>
  <div className="text-center">
    <button className="rounded-lg bg-blue-600 px-6 py-3 text-white">
      Continue
    </button>
  </div>
</div>
```

**After:**

```tsx
<Stack spacing="large">
  <UnifiedHeading level="h2" variant="default">
    Page Title
  </UnifiedHeading>
  <Text variant="body">Content...</Text>
  <ContentBox variant="callout" semantic="info" title="Important Note">
    <Text>Information...</Text>
  </ContentBox>
  <Center>
    <Button variant="primary" size="lg">
      Continue
    </Button>
  </Center>
</Stack>
```

#### **Interactive Page Migration:**

**Before:**

```tsx
<div className="space-y-6">
  <h2 className="text-2xl font-bold text-gray-900">Activity Title</h2>
  <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
    <h3 className="mb-3 font-semibold text-gray-900">Instructions:</h3>
    <p className="text-gray-700">Step-by-step guide...</p>
  </div>
  {/* Custom interactive elements */}
</div>
```

**After:**

```tsx
<Stack spacing="large">
  <UnifiedHeading level="h2" variant="default">
    Activity Title
  </UnifiedHeading>
  <ContentBox variant="callout" semantic="info" gradient title="Instructions:">
    <Text className="text-white">Step-by-step guide...</Text>
  </ContentBox>
  <InteractiveComponent />
</Stack>
```

### Critical Migration Fixes

#### **1. Navigation Props Fix**

Many units use incorrect Navigation component props:

**Wrong:**

```tsx
<Navigation
  canAdvance={canAdvance}
  showNext={currentPage < TOTAL_PAGES}
  showPrevious={currentPage > 1}
/>
```

**Correct:**

```tsx
<Navigation
  currentPage={currentPage}
  totalPages={TOTAL_PAGES}
  onPageChange={handlePageChange}
  canGoBack={currentPage > 1}
  canGoForward={currentPage < TOTAL_PAGES}
/>
```

#### **2. Text Color on Dark Backgrounds**

Always add `text-white` class for dark/gradient backgrounds:

**Wrong:**

```tsx
<ContentBox variant="callout" gradient>
  <Text>Invisible text</Text>
</ContentBox>
```

**Correct:**

```tsx
<ContentBox variant="callout" gradient>
  <Text className="text-white">Visible text</Text>
</ContentBox>
```

#### **3. Overview Page Consistency**

All units should use HeroCard for Page 1:

**Add to Page 1:**

```tsx
{currentPage === 1 ? (
  <HeroCard variant="primary">
    <UnifiedHeading level="h2" semantic="white">Unit Title</UnifiedHeading>
    <Text className="text-white">Overview content...</Text>
  </HeroCard>
) : (
  <UnifiedCard variant="elevated" size="lg">
    <CurrentPageContent ... />
  </UnifiedCard>
)}
```

### Unit 2 Advanced Migration Patterns

Unit 2 provided extensive learnings due to its complex content with 18+ pages and 300+ hardcoded elements:

#### **Complex Statement/Transaction Displays**

```tsx
// Before: Hardcoded transaction rows
<div className="flex justify-between text-xs sm:text-sm">
  <span className="text-gray-900">ATM withdrawal</span>
  <span className="text-red-700 font-medium">-$100.00</span>
</div>

// After: Design system approach
<Stack direction="row" justify="between">
  <Text variant="small">ATM withdrawal</Text>
  <Text variant="small" weight="medium" semantic="error">-$100.00</Text>
</Stack>
```

#### **Interactive Lawsuit Case Studies**

```tsx
// Before: Complex hardcoded buttons
<button className={`w-full text-left p-4 rounded-lg border ${isSelected ? 'border-gray-600 bg-gray-50' : 'border-gray-200'}`}>

// After: ContentBox with interactions
<ContentBox
  variant={selectedCase === case_.id ? "elevated" : "default"}
  className="cursor-pointer transition-all hover:shadow-md"
  onClick={() => setSelectedCase(case_.id)}
>
  <Stack direction="row" justify="between" align="center">
    {/* Content */}
  </Stack>
</ContentBox>
```

#### **Multi-Paragraph Quote Sections**

```tsx
// Before: Multiple hardcoded p tags
<p className="text-purple-900 mb-4">Paragraph 1</p>
<p className="text-purple-900 mb-4">Paragraph 2</p>
<p className="text-purple-900">Paragraph 3</p>

// After: Stack with consistent spacing
<Stack spacing="md">
  <Text semantic="warning">Paragraph 1</Text>
  <Text semantic="warning">Paragraph 2</Text>
  <Text semantic="warning">Paragraph 3</Text>
</Stack>
```

#### **Complex Checkbox Lists for Protection Tips**

```tsx
// Before: Custom hardcoded interactive elements
<div className={`border rounded-lg p-4 ${checked ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>

// After: ContentBox with semantic states
<ContentBox
  variant={checkedTips.includes(tip.id) ? "elevated" : "default"}
  semantic={checkedTips.includes(tip.id) ? "warning" : undefined}
  className="transition-all"
>
  <Stack direction="row" align="start" spacing="sm">
    {/* Checkbox and content */}
  </Stack>
</ContentBox>
```

### New Components Needed for Complex Patterns

Based on Units 2 & 5 analysis, these new components should be created:

#### **1. Checkbox Component**

```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  semantic?: 'success' | 'info' | 'warning';
}

export function Checkbox({
  checked,
  onChange,
  children,
  semantic = 'info',
}: CheckboxProps) {
  return (
    <ContentBox
      variant="callout"
      semantic={checked ? 'success' : 'neutral'}
      className="cursor-pointer transition-all hover:scale-[1.01]"
      onClick={() => onChange(!checked)}
    >
      <Stack direction="horizontal" spacing="sm" align="center">
        <Badge variant={checked ? 'success' : 'neutral'} size="sm">
          {checked ? '✓' : ''}
        </Badge>
        <Text>{children}</Text>
      </Stack>
    </ContentBox>
  );
}
```

#### **2. RadioGroup Component**

```tsx
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  semantic?: 'info' | 'success' | 'warning';
}

export function RadioGroup({
  options,
  value,
  onChange,
  semantic = 'info',
}: RadioGroupProps) {
  return (
    <Stack spacing="sm">
      {options.map((option) => (
        <ContentBox
          key={option.value}
          variant="callout"
          semantic={value === option.value ? semantic : 'neutral'}
          className="cursor-pointer transition-all hover:scale-[1.01]"
          onClick={() => onChange(option.value)}
        >
          <Stack direction="horizontal" spacing="sm" align="center">
            <Badge
              variant={value === option.value ? semantic : 'neutral'}
              size="sm"
            >
              {value === option.value ? '✓' : ''}
            </Badge>
            <Stack spacing="xs">
              <Text weight="semibold">{option.label}</Text>
              {option.description && (
                <Text semantic="muted" size="sm">
                  {option.description}
                </Text>
              )}
            </Stack>
          </Stack>
        </ContentBox>
      ))}
    </Stack>
  );
}
```

#### **3. GradientBox Component**

```tsx
interface GradientBoxProps {
  gradient: 'blue-purple' | 'success' | 'hero';
  children: React.ReactNode;
  className?: string;
}

export function GradientBox({
  gradient,
  children,
  className,
}: GradientBoxProps) {
  const gradients = {
    'blue-purple': 'bg-gradient-to-r from-blue-50 to-purple-50',
    success: 'bg-gradient-to-r from-green-50 to-blue-50',
    hero: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
  };

  return (
    <div className={cn('rounded-lg p-6', gradients[gradient], className)}>
      {children}
    </div>
  );
}
```

---

## Design System Best Practices

### Component Usage Rules

#### **DO:**

- Use semantic variants that match content meaning
- Add `text-white` class for text on dark backgrounds
- Use consistent spacing with Stack components
- Provide clear instructions for interactive elements
- Use AnimatedButton for all primary actions
- Test responsive behavior on mobile devices

#### **DON'T:**

- Mix semantic meanings within the same section
- Use hardcoded spacing or colors
- Forget to handle loading/success states
- Create inconsistent button styles
- Use complex layouts without proper testing
- Ignore accessibility considerations

### Performance Guidelines

#### **Optimize for:**

- Fast loading on mobile devices
- Smooth animations and transitions
- Efficient state management
- Progressive disclosure of content

#### **Avoid:**

- Heavy animations on mobile
- Excessive component nesting
- Unnecessary re-renders
- Large bundle sizes

### Accessibility Guidelines

#### **Text Contrast**

- Dark backgrounds: Always use white text
- Light backgrounds: Use default semantic colors
- Interactive elements: Ensure proper focus states

#### **Navigation**

- Provide clear progress indicators
- Enable keyboard navigation
- Use semantic HTML elements
- Include ARIA labels where needed

---

## Advanced Migration Patterns (Recent Learnings)

### JSX Structure Debugging

Based on the comprehensive Unit 2 migration involving 300+ element conversions and complex JSX error resolution:

#### **Common JSX Structure Errors**

1. **Mismatched Opening/Closing Tags**

   ```tsx
   // Error: Opening with div, closing with design system component
   <div className="text-center">
     <AnimatedButton>Click me</AnimatedButton>
   </Center> // ❌ Wrong - should be </div>

   // Fixed: Use design system components consistently
   <Center>
     <AnimatedButton>Click me</AnimatedButton>
   </Center> // ✅ Correct
   ```

2. **Incomplete Component Migrations**

   ```tsx
   // Error: CalloutBox doesn't exist in design system
   <CalloutBox type="definition" title="Definition">
     <p className="text-gray-700">Content</p>
   </CalloutBox> // ❌ Non-existent component

   // Fixed: Use proper ContentBox component
   <ContentBox variant="callout" semantic="info" title="Definition">
     <Text>Content</Text>
   </ContentBox> // ✅ Correct design system usage
   ```

3. **Missing Stack Closing Tags**
   ```tsx
   // Error: Stack opened but never closed
   <Stack spacing="lg">
     <ContentBox>Content</ContentBox>
     // Missing </Stack> - common in large migrations
   ```

#### **JSX Error Resolution Process**

1. **Identify Error Location**: Use build output line numbers to locate issues
2. **Check Component Nesting**: Ensure proper opening/closing tag pairs
3. **Verify Component Imports**: Confirm all used components are properly imported
4. **Replace Legacy Components**: Convert any remaining hardcoded elements

#### **Component Replacement Validation**

Always verify these patterns during migration:

| Legacy Pattern                       | Valid Replacement                | Invalid/Problematic          |
| ------------------------------------ | -------------------------------- | ---------------------------- |
| `<div className="space-y-6">`        | `<Stack spacing="lg">`           | ❌ Mixed div/Stack closing   |
| `<CalloutBox>`                       | `<ContentBox variant="callout">` | ❌ CalloutBox doesn't exist  |
| `<p className="text-gray-700">`      | `<Text>`                         | ❌ Keeping hardcoded classes |
| `<h3 className="text-lg font-bold">` | `<AccentHeading level="h3">`     | ❌ Mixed heading approaches  |

### Build Error Debugging Workflow

#### **Step 1: Identify Error Type**

```bash
npm run build
```

Common error patterns:

- `Expected '</', got 'jsx text'` → Mismatched tags
- `Cannot find name 'CalloutBox'` → Non-existent component
- `Property 'variant' does not exist` → Wrong component interface

#### **Step 2: Locate and Fix**

```tsx
// Use line numbers from error output to find:
// 1. Missing closing tags
// 2. Incorrect component names
// 3. Hardcoded className usage
// 4. Improper component nesting
```

#### **Step 3: Validate Fix**

```bash
npm run build  # Should compile successfully
npm run dev    # Verify UI renders correctly
```

### Complex Page Structure Patterns

#### **Multi-Section Page Layout**

```tsx
const ComplexPage = ({ onStepComplete }: PageProps) => {
  return (
    <Stack spacing="lg">
      {/* Page Header */}
      <Layout spacing="md">
        <AccentHeading level="h3" semantic="warning">
          Section Title
        </AccentHeading>

        <ContentBox variant="callout" semantic="info">
          <Text>Key definition or concept</Text>
        </ContentBox>

        <ContentBox variant="alert" semantic="warning">
          <Text>Important warning or note</Text>
        </ContentBox>
      </Layout>

      {/* Interactive Section */}
      <InteractiveComponent />

      {/* Action Section */}
      <Center>
        <AnimatedButton
          onClick={() => onStepComplete({ pageViewed: true })}
          variant="primary"
          size="lg"
        >
          Continue →
        </AnimatedButton>
      </Center>
    </Stack>
  );
};
```

#### **Proper Container Hierarchy**

```tsx
// Correct nesting for complex pages
<Stack spacing="lg">
  {' '}
  // Main page container
  <Layout spacing="md">
    {' '}
    // Content grouping
    <AccentHeading /> // Section title
    <ContentBox /> // Information blocks
    <ContentBox />
  </Layout>
  <SpecialComponent /> // Standalone components
  <Center>
    {' '}
    // Action area
    <AnimatedButton />
  </Center>
</Stack>
```

### New Interactive Components

Based on Unit 2 migration, these reusable components were created:

#### **Checkbox Component**

```tsx
// File: /core/design-system/components/Checkbox.tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  semantic?: 'success' | 'warning' | 'info';
}

// Usage in complex selection activities
{
  takeaways.map((takeaway) => (
    <Checkbox
      key={takeaway.id}
      checked={checkedTakeaways.includes(takeaway.id)}
      onChange={() => toggleTakeaway(takeaway.id)}
      semantic="warning"
    >
      <Stack spacing="xs">
        <AccentHeading level="h4">{takeaway.title}</AccentHeading>
        <Small>{takeaway.description}</Small>
      </Stack>
    </Checkbox>
  ));
}
```

#### **RadioGroup Component**

```tsx
// Usage for single-selection activities
<RadioGroup
  options={responseOptions}
  value={selectedResponse}
  onChange={setSelectedResponse}
  semantic="info"
/>
```

### Migration Quality Assurance

#### **Pre-Migration Checklist**

- [ ] Identify all hardcoded className usage
- [ ] Map legacy components to design system equivalents
- [ ] Plan interactive component replacements
- [ ] Review responsive design considerations

#### **Post-Migration Validation**

- [ ] `npm run build` succeeds without errors
- [ ] All pages render correctly in browser
- [ ] Interactive elements function properly
- [ ] Mobile responsive design works
- [ ] Navigation flows properly
- [ ] No console errors in development

#### **Common Migration Oversights**

1. **Forgetting to close Layout tags** when restructuring complex content
2. **Using legacy component names** like CalloutBox instead of ContentBox
3. **Missing text-white classes** on gradient backgrounds
4. **Inconsistent spacing patterns** mixing hardcoded and Stack spacing
5. **Improper button variants** using hardcoded styles instead of AnimatedButton

---

## Troubleshooting & Common Issues

### Component Errors

#### **"Cannot read properties of undefined (reading 'base')"**

- **Cause**: Using invalid variant prop
- **Solution**: Check component interface for valid variants
- **Prevention**: Add fallback with optional chaining

```tsx
// Good: Add safety checks
const variantStyle = variantStyles[variant] || variantStyles.default;
const classes = cn(variantStyle?.base /* other classes */);
```

#### **Text Not Visible on Dark Backgrounds**

- **Cause**: Missing `text-white` class
- **Solution**: Add `className="text-white"` to text elements
- **Prevention**: Always check contrast when using gradient/dark components

```tsx
// Good: White text on dark background
<ContentBox variant="callout" gradient>
  <Text className="text-white">Visible text</Text>
</ContentBox>
```

### Layout Issues

#### **Inconsistent Spacing**

- **Cause**: Using hardcoded margins/padding
- **Solution**: Use Stack component with spacing prop
- **Prevention**: Always use design system spacing

```tsx
// Good: Consistent spacing
<Stack spacing="md">
  <ComponentA />
  <ComponentB />
</Stack>

// Bad: Hardcoded spacing
<div className="space-y-6">
  <ComponentA />
  <ComponentB />
</div>
```

#### **Mobile Layout Problems**

- **Cause**: Not using responsive props
- **Solution**: Use responsive grid and container components
- **Prevention**: Test on mobile devices during development

### State Management

#### **Lost Activity Data**

- **Cause**: Not properly saving state in stepData
- **Solution**: Always save to stepData and localStorage
- **Prevention**: Follow established patterns for data persistence

```tsx
// Good: Proper state management
const handleComplete = (data) => {
  onStepComplete({
    activityComplete: true,
    activityData: data,
    timestamp: Date.now(),
  });
};
```

---

## Quick Reference

### Most Used Components

1. `Stack` - Vertical spacing
2. `Text` - All body text
3. `ContentBox` - Information containers
4. `UnifiedHeading` - Section titles
5. `AnimatedButton` - User actions
6. `Center` - Element centering
7. `HeroCard` - Unit introductions
8. `Grid` - Multi-column layouts

### Common Semantic Patterns

- `info` - Educational content, instructions
- `warning` - Important notes, cautions
- `error` - Mistakes, problems to avoid
- `success` - Achievements, positive outcomes
- `neutral` - General information, definitions

### Responsive Breakpoints

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

---

_This guide is based on the comprehensive analysis and migration of Units 1-4, incorporating all lessons learned about component usage, layout patterns, and user experience design. Use this as your primary reference when designing new educational units._
