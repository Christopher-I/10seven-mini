# Unit 2 Design Update Plan - Phase Implementation

## Design Pattern Analysis

Based on careful study of the design images, I've identified three core design patterns to implement across all Unit 2 pages:

### **Pattern A: Learning Objectives Overview (Unit Design 1)**

- **Clean checklist format** with purple checkmarks (#2E1E72)
- **Hierarchical typography**: Large title + subtitle + bulleted objectives
- **Minimal visual elements**: Clean white background with focused content
- **Single CTA button**: Purple rounded button at bottom

### **Pattern B: Narrative with Icon (Unit Design 3)**

- **Central icon placement**: Large SVG icon as visual anchor
- **Story-based content**: Conversational narrative text
- **Balanced layout**: Icon + text in harmonious proportion
- **Progressive disclosure**: Content builds conceptually

### **Pattern C: Educational with Interactive Elements (Unit Design 4)**

- **Multiple contextual icons**: Payment system, money flow diagrams
- **Interactive glossary terms**: "Legal tender" with info icon tooltips
- **Complex layouts**: Text interwoven with multiple visual elements
- **Educational citations**: Source references and definitions

## Page-by-Page Mapping Strategy

### **Phase 1: Foundation Pages (Pages 1-5)**

#### **Page 1: Unit Introduction**

- **Current**: Simple intro with animated button
- **Update to Pattern A**: Learning objectives checklist
- **Content Translation**:

  ```
  "Let's talk about how banks operate. In this Unit, you'll learn:"

  ✓ Why banks exist
  ✓ Common types of bank fees
  ✓ Why bank fees exist
  ✓ How to handle challenging bank situations like overdraft charges and account closures
  ✓ What to keep in mind when transitioning out of a "student" bank account
  ```

- **Progress Enhancement**: Single step, full completion on "Next"

#### **Page 2: Bank Scenario Introduction**

- **Skip Whack-a-Mole game per instructions**
- **Update to Pattern B**: Narrative with bank building icon
- **Icon**: Use `unit design 3 image.svg` (bank building)
- **Content Translation**: Transform game intro into narrative scenario
- **Progress Enhancement**: Single step completion

#### **Page 3: Why Banks Exist Overview**

- **Update to Pattern C**: Educational with icons
- **Icons Needed**:
  - Payment system icon (use `unit design 4 icon 1.svg`)
  - Money flow icon (use `unit design 4 icon 2.svg`)
- **Interactive Elements**: Add glossary tooltips for "chartered financial institution", "deposits", "loans"
- **Progress Enhancement**: 3 sub-steps (definition, payment function, lending function)

#### **Page 4: Banking Definition Deep Dive**

- **Update to Pattern C**: Educational with citation
- **Quote Integration**: Bradford 2020, Barone 2020 citations as in design
- **Interactive Elements**: "Legal tender" tooltip as shown in Unit Design 4
- **Icon**: Money/payment system icons from existing SVGs
- **Progress Enhancement**: 2 sub-steps (definition understanding, legal framework)

#### **Page 5: Payment Systems Function**

- **Update to Pattern B**: Narrative with payment icon
- **Icon**: Payment system icon (`unit design 4 icon 1.svg`)
- **Content**: Focus on "First and foremost, they allow us to pay for things"
- **Interactive Elements**: Payment method examples with tooltips
- **Progress Enhancement**: Single step completion

### **Phase 2: Analysis Pages (Pages 6-12)**

#### **Page 6-8: Fee Types Introduction**

- **Pattern A**: Checklist format for different fee categories
- **Content Translation**: Transform existing fee content into organized checklists
- **Progress Enhancement**: Each page has 2-3 sub-steps for fee category mastery

#### **Page 9-12: Fee Analysis and Examples**

- **Pattern C**: Educational with multiple icons and interactive elements
- **Icons Needed**:
  - ATM machine icon (create based on existing style)
  - Overdraft warning icon (create)
  - Account maintenance icon (create)
- **Interactive Elements**: Fee amount tooltips, calculation examples

### **Phase 3: Education Pages (Pages 13-20)**

#### **Page 13-16: Banking Business Model**

- **Pattern C**: Complex educational content with financial flow diagrams
- **Icons**: Money flow diagrams from `unit design 4 icon 2.svg`
- **Interactive Elements**: Profit calculation tooltips, business model explanations

#### **Page 17-20: Fee Avoidance Strategies**

- **Pattern A**: Checklist format for actionable strategies
- **Content Translation**: Transform tips into checkable action items
- **Progress Enhancement**: Strategy mastery tracking

### **Phase 4: Action Pages (Pages 21-23)**

#### **Page 21-22: Student Account Transition**

- **Pattern B**: Narrative with transition-focused icons
- **Icons Needed**: Student-to-adult transition icon (create)
- **Content**: Story-based guidance on account transitions

#### **Page 23: Unit Completion**

- **Pattern A**: Summary checklist of learned concepts
- **Final assessment integration**

## Enhanced Progress Bar Implementation

### **Multi-Step Page Progress**

For pages with multiple learning objectives or sub-concepts:

```typescript
interface PageProgress {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  completedSteps: boolean[];
}
```

### **Visual Progress Enhancement**

- **Partial Fill**: Progress bar fills incrementally within each page
- **Step Indicators**: Small dots or lines showing sub-progress
- **Smooth Transitions**: 300ms easing between step completions
- **Color Coding**:
  - Empty: #E5DEEF (light purple)
  - In Progress: #8577B7 (medium purple)
  - Completed: #2E1E72 (brand purple)

### **Progress Calculation Examples**

- **Page 3** (3 sub-steps): 33% → 66% → 100%
- **Page 4** (2 sub-steps): 50% → 100%
- **Page 6** (fee categories): 25% → 50% → 75% → 100%

## Icon System and Creation Strategy

### **Existing Icons Available**

1. **Bank Building** (`unit design 3 image.svg`): Classical bank with columns
2. **Payment System** (`unit design 4 icon 1.svg`): Credit card and payment flows
3. **Money Flow** (`unit design 4 icon 2.svg`): Currency with directional arrows

### **Icons to Create (Based on Content Needs)**

Following the established design style (#2E1E72 fill, clean line art):

#### **Priority 1 Icons**

1. **ATM Machine**: Simple ATM terminal icon
2. **Overdraft Warning**: Warning triangle with dollar sign
3. **Account Maintenance**: Gear/settings icon with bank symbol
4. **Student Transition**: Graduation cap transitioning to briefcase
5. **Fee Calculator**: Calculator with dollar symbols

#### **Priority 2 Icons**

6. **Mobile Banking**: Phone with bank interface
7. **Interest Rates**: Percentage symbol with arrows
8. **Financial Security**: Shield with bank building
9. **Account Types**: Multiple card/account representations
10. **Banking Relationship**: Handshake with bank symbol

### **Icon Creation Process**

- **Design Tool**: Create SVG icons matching the existing style
- **Specifications**:
  - Color: #2E1E72 fill
  - Style: Clean line art with selective fills
  - Size: Scalable vector, optimized for 64px-200px display
  - Format: Individual SVG files in `/public/design/web/icons/`

## Navigation and Progress System Replacement

### **Complete Navigation Overhaul**

#### **Current System Removal**

**Files to Completely Replace**:

1. **`core/components/SectionProgress.tsx`** → **DELETE and replace**
2. **`core/components/Navigation.tsx`** → **ENHANCE existing functionality**

#### **New Progress Bar System (Based on Unit Design Headers)**

**New File**: `core/design-system/components/UnitProgressHeader.tsx`

**Visual Design from Unit Designs**:

- **Progress Dots**: 8 segmented progress dots in header (as seen in designs)
- **Colors**:
  - Completed: #2E1E72 (dark purple - solid fills)
  - Current: #8577B7 (medium purple - partial fill)
  - Remaining: #E5DEEF (light purple - empty outlines)
- **Layout**: Horizontal row in header, NOT separate section

**Functionality Retention**:

```typescript
interface UnitProgressHeaderProps {
  currentPage: number;
  totalPages: number;
  currentStep?: number; // NEW: Sub-step within page
  totalSteps?: number; // NEW: Total steps in current page
  onPageJump?: (page: number) => void; // RETAIN: Direct page navigation
  title: string; // Unit title display
}
```

**Key Changes**:

- **REMOVE**: Entire SectionProgress component and its complex section logic
- **REPLACE**: With simple, clean progress dots matching design exactly
- **RETAIN**: All navigation functionality (keyboard, swipe, page jumping)
- **ENHANCE**: Add sub-step progress within individual pages

#### **Enhanced Navigation Component**

**File**: `core/components/Navigation.tsx` (MODIFY, don't replace)

**Retain All Existing Functionality**:

- ✅ Keyboard navigation (arrow keys)
- ✅ Touch/swipe gestures
- ✅ Mobile-optimized layout
- ✅ Desktop bottom bar
- ✅ Page dot indicators
- ✅ Hover states and cursor behavior

**Visual Updates Only**:

- **Update Colors**: Change blue accents to purple (#2E1E72)
- **Simplify Page Dots**: Match header progress dot style
- **Remove Complexity**: Eliminate section-based logic
- **Clean Typography**: Match new design system fonts

### **Old Design Element Removal Plan**

#### **Icons and Graphics to Remove**

**Search and Replace in All Files**:

1. **Remove Old Emoji Icons**:

   ```bash
   # Find all emoji usage
   grep -r "🏛️\|📝\|🎯\|🎮\|📊\|📚\|🛡️" modules/banking-fees/
   ```

   - Replace with new SVG icons or remove entirely
   - Update all section icons in SectionProgress

2. **Remove Old Color Schemes**:

   ```bash
   # Find old color references
   grep -r "blue-600\|purple-600\|gray-800" core/components/
   ```

   - Replace all with purple brand colors (#2E1E72, #8577B7, #E5DEEF)

3. **Remove Complex Section Logic**:
   - **Delete**: `getSectionsForUnit()` function entirely
   - **Delete**: All section-based progress calculations
   - **Delete**: Section icon mappings and descriptions

#### **Component Cleanup Strategy**

**Files to Audit and Clean**:

1. **`core/components/SectionProgress.tsx`**:
   - **DELETE ENTIRELY** → Replace with UnitProgressHeader

2. **`core/components/Navigation.tsx`**:
   - **REMOVE**: Complex section awareness
   - **REMOVE**: Blue color scheme
   - **RETAIN**: All functional behavior
   - **UPDATE**: Visual design only

3. **`modules/banking-fees/units/unit-2-fees/index.tsx`**:
   - **REMOVE**: SectionProgress component import
   - **ADD**: UnitProgressHeader component
   - **RETAIN**: All state management and page logic

### **Component Updates Required**

#### **1. New UnitProgressHeader Component**

**File**: `core/design-system/components/UnitProgressHeader.tsx`

**Exact Visual Match to Designs**:

```typescript
interface UnitProgressHeaderProps {
  currentPage: number;
  totalPages: number;
  currentStep?: number;
  totalSteps?: number;
  unitTitle: string;
  onPageJump?: (page: number) => void;
}

// Visual: Horizontal dots, purple theme, clean typography
```

#### **2. Simplified Navigation Component**

**File**: `core/components/Navigation.tsx` (ENHANCED)

**Specific Changes**:

```typescript
// REMOVE all these imports and functions:
- getCurrentSection()
- getSectionsForUnit()
- All section-based logic

// UPDATE colors:
- blue-600 → #2E1E72
- purple-600 → #8577B7
- gray-800 → #2E1E72

// SIMPLIFY page dots:
- Remove section-aware styling
- Use consistent purple theming
- Maintain click/touch functionality

// RETAIN all existing functionality:
- Keyboard navigation ✅
- Swipe gestures ✅
- Mobile optimization ✅
- Hover states ✅
```

## Complete Old Element Removal Checklist

### **Step 1: Remove SectionProgress Component**

```bash
# Delete the entire file
rm core/components/SectionProgress.tsx

# Remove all imports
grep -r "SectionProgress" modules/ core/ --include="*.tsx" --include="*.ts"
# Manual removal from each file found
```

### **Step 2: Clean Navigation Component**

**File**: `core/components/Navigation.tsx`

**Lines to Delete**:

- All section-related state and logic
- `getCurrentSection()` function calls
- Blue/purple color references
- Complex progress calculations

**Lines to Update**:

- Color values to purple theme
- Simplified page dot rendering
- Clean button styling

### **Step 3: Remove Old Icons and Emojis**

**Search and Replace Operations**:

```bash
# Find all emoji usage
grep -r "🏛️\|📝\|🎯\|🎮\|📊\|📚\|🛡️\|🔍\|⚖️\|✅\|🤝\|💬\|🔄\|🌟\|🚀" modules/banking-fees/

# Find old color references
grep -r "blue-600\|blue-700\|purple-500\|purple-600\|purple-700\|purple-800" core/components/ modules/banking-fees/

# Find complex section logic
grep -r "getSectionsForUnit\|currentSection\|sectionIndex" core/components/ modules/banking-fees/
```

**Replacement Strategy**:

- **Emojis** → Replace with appropriate SVG icons or remove
- **Blue colors** → #2E1E72 (brand purple)
- **purple colors** → #8577B7 (medium purple) or #E5DEEF (light purple)
- **Section logic** → Simple page-based logic

### **Step 4: Update Unit2Container**

**File**: `modules/banking-fees/units/unit-2-fees/index.tsx`

**Changes Required**:

```typescript
// REMOVE this import:
import { SectionProgress } from '@/core/components/SectionProgress';

// ADD this import:
import { UnitProgressHeader } from '@/core/design-system/components/UnitProgressHeader';

// REPLACE in JSX:
<SectionProgress
  currentPage={currentPage}
  totalPages={TOTAL_PAGES}
  title="It's a Fee-for-All"
  onPageChange={handlePageChange}
/>

// WITH:
<UnitProgressHeader
  currentPage={currentPage}
  totalPages={TOTAL_PAGES}
  unitTitle="It's a Fee-for-All"
  onPageJump={handlePageChange}
/>
```

### **Step 5: Clean Page Components**

**File**: `modules/banking-fees/units/unit-2-fees/content/pages.tsx`

**Remove Old Design Elements**:

- Any emoji icons in content
- Old color scheme references
- Complex interactive elements that don't match new designs
- Replace with new Pattern A/B/C templates

### **2. New LearningObjectives Component**

**File**: `core/design-system/components/LearningObjectives.tsx`

**Specifications**:

```typescript
interface LearningObjectivesProps {
  title: string;
  subtitle?: string;
  objectives: Array<{
    id: string;
    text: string;
    completed?: boolean;
  }>;
  onNext: () => void;
  variant: 'intro' | 'summary' | 'checklist';
}
```

### **3. Enhanced NarrativeWithIcon Component**

**File**: `core/design-system/components/NarrativeWithIcon.tsx`

**Specifications**:

```typescript
interface NarrativeWithIconProps {
  icon: string; // SVG path or component
  title: string;
  content: string | React.ReactNode;
  layout: 'icon-top' | 'icon-left' | 'icon-center';
  iconSize: 'sm' | 'md' | 'lg' | 'xl';
}
```

### **4. New InteractiveEducational Component**

**File**: `core/design-system/components/InteractiveEducational.tsx`

**Specifications**:

```typescript
interface InteractiveEducationalProps {
  title: string;
  content: React.ReactNode;
  icons: Array<{
    component: React.ComponentType;
    position: 'inline' | 'side' | 'center';
    tooltip?: string;
  }>;
  glossaryTerms: Array<{
    term: string;
    definition: string;
    trigger: React.ReactNode;
  }>;
  citations?: Array<{
    author: string;
    year: number;
    title?: string;
  }>;
}
```

### **5. Enhanced GlossaryTooltip Component**

**File**: `core/design-system/components/GlossaryTooltip.tsx`

**Specifications**:

```typescript
interface GlossaryTooltipProps {
  term: string;
  definition: string;
  trigger: React.ReactNode;
  placement: 'top' | 'bottom' | 'left' | 'right';
  showIcon?: boolean; // Info icon like in Unit Design 4
}
```

## Content Migration Strategy

### **Phase 1: Template Creation**

1. Build the three core page templates (A, B, C)
2. Create enhanced progress tracking system
3. Implement icon system and missing icon creation

### **Phase 2: Content Extraction and Translation**

1. **Extract existing content** from current pages
2. **Translate to new formats**:
   - Lists → Checklists with checkmarks
   - Paragraphs → Story narratives with icons
   - Complex concepts → Interactive educational content
3. **Enhance with interactivity**:
   - Add glossary terms where appropriate
   - Include relevant icons for visual anchoring
   - Break multi-concept pages into sub-steps

### **Phase 3: Progressive Enhancement**

1. **Update pages 1-5** first (foundation)
2. **Test progress tracking** with sub-steps
3. **Gather feedback** and refine templates
4. **Roll out remaining pages** in batches

## Function and File Changes

### **Major Function Updates**

#### **Unit2Container (`modules/banking-fees/units/unit-2-fees/index.tsx`)**

```typescript
// Enhanced state for sub-step tracking
interface UnitState {
  currentPage: number;
  currentStep: number; // NEW: Track sub-steps within pages
  pageProgress: Record<number, PageProgress>; // NEW: Per-page step tracking
  completedObjectives: string[]; // NEW: Track learning objective completion
}

// Enhanced step completion handler
const handleStepComplete = (data: {
  pageId: number;
  stepId: number;
  totalSteps: number;
  objectiveId?: string;
}) => {
  // Update page progress
  // Calculate partial progress fill
  // Handle objective completion tracking
};
```

#### **Page Components (`modules/banking-fees/units/unit-2-fees/content/pages.tsx`)**

```typescript
// Each page component enhanced with sub-step tracking
export function Page1({ onStepComplete }: PageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const objectives = [
    { id: 'banks-exist', text: 'Why banks exist' },
    { id: 'fee-types', text: 'Common types of bank fees' },
    // ...
  ];

  const handleObjectiveComplete = (objectiveId: string) => {
    setCurrentStep((prev) => prev + 1);
    onStepComplete?.({
      pageId: 1,
      stepId: currentStep + 1,
      totalSteps: objectives.length,
      objectiveId,
    });
  };
}
```

### **New Files to Create**

1. **`core/design-system/components/LearningObjectives.tsx`**
2. **`core/design-system/components/NarrativeWithIcon.tsx`**
3. **`core/design-system/components/InteractiveEducational.tsx`**
4. **`core/design-system/components/GlossaryTooltip.tsx`**
5. **`public/design/web/icons/[icon-name].svg`** (for missing icons)

### **Modified Files**

1. **`core/components/SectionProgress.tsx`**: Enhanced with sub-step tracking
2. **`modules/banking-fees/units/unit-2-fees/index.tsx`**: Enhanced state management
3. **`modules/banking-fees/units/unit-2-fees/content/pages.tsx`**: All page components updated
4. **`core/design-system/components/ProgressDots.tsx`**: Enhanced for partial fills

## Success Metrics

### **Progress Tracking Accuracy**

- Sub-step progress accurately reflects learning completion
- Smooth visual transitions between progress states
- No progress bar jumping or inconsistent states

### **Content Fidelity**

- All existing educational content preserved and enhanced
- New interactive elements add value without distraction
- Consistent visual language across all pages

### **Icon Integration**

- All pages have appropriate visual anchors
- Icon style consistent with brand guidelines
- Missing icons created and seamlessly integrated

### **Performance**

- No performance degradation with enhanced progress tracking
- Smooth animations and transitions
- Responsive design maintained across all devices

This comprehensive plan transforms all 23 pages (excluding the whack-a-mole game) to the new design system while maintaining educational effectiveness and enhancing user engagement through improved progress tracking and visual design.
