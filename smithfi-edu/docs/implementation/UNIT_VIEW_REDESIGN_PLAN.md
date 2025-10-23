# Unit View Redesign Implementation Plan

## Executive Summary

This plan outlines the comprehensive redesign of the Unit 2 view based on the new design specifications found in `public/design/web/unit design 1-4.png`. The redesign will transform the current unit flow into a more engaging, visually cohesive, and educationally effective experience.

## Current Architecture Analysis

### Existing Components

- **Unit2Container** (`modules/banking-fees/units/unit-2-fees/index.tsx`): Main container managing state and flow
- **SectionProgress** (`core/components/SectionProgress.tsx`): Current progress tracking with desktop/mobile variants
- **Navigation** (`core/components/Navigation.tsx`): Bottom navigation with swipe support
- **AppHeader** (`core/components/AppHeader.tsx`): Top navigation with breadcrumbs

### Current Flow Structure

- 23 total pages across 4 sections (Experience, Analysis, Education, Action)
- State management for page progression and step completion
- localStorage persistence for progress tracking
- Dynamic page component loading from `UNIT_2_PAGES` configuration

## Design Vision & New Requirements

Based on the design study, the redesigned unit view should incorporate:

### Unit Design 1 - Learning Objectives Overview

- Clean checklist-style learning objectives presentation
- Purple brand color integration (#2E1E72)
- Simple, scannable list format with checkmarks
- Clear "Next" button progression

### Unit Design 2 - Interactive Game Interface

- Whack-a-mole game mechanics
- Cartoon purple mole character with speech bubbles
- Educational content embedded within gameplay
- Fee information display during interactions

### Unit Design 3 - Narrative Text with Icons

- Bank building icon integration
- Story-based scenario presentation
- Enhanced typography hierarchy
- Visual content anchoring with icons

### Unit Design 4 - Interactive Glossary System

- Multiple contextual icons throughout content
- Tooltip/popup definitions for key terms
- Interactive learning aids
- Complex layouts with glossary integration

## Implementation Plan

### Phase 1: Enhanced Progress System

#### 1.1 New Progress Bar Component

**File**: `core/design-system/components/UnitProgressBar.tsx`

**Specifications**:

```typescript
interface UnitProgressBarProps {
  currentPage: number;
  totalPages: number;
  sectionBreakpoints: number[];
  variant: 'horizontal' | 'radial';
  showPartialFill: boolean;
  fillStyle: 'smooth' | 'stepped';
  colorScheme: 'purple' | 'purple' | 'blue';
}
```

**Features**:

- **Partial Fill Capability**: Smooth gradient fills between discrete steps
- **Section Awareness**: Visual breaks at major section transitions
- **Multiple Visual Styles**:
  - Horizontal bar with smooth transitions
  - Radial progress circles (like current ProgressDots but enhanced)
  - Stepped progress with distinct phases
- **Responsive Design**: Adapts to mobile/desktop contexts
- **Animation Support**: Smooth transitions between states

**Technical Implementation**:

- CSS custom properties for dynamic theming
- SVG-based radial progress for precision
- Intersection Observer for scroll-based progress updates
- Touch-friendly interaction targets (44px minimum)

#### 1.2 Section Progress Enhancement

**File**: `core/components/SectionProgress.tsx` (Enhanced)

**New Features**:

- Integration with new progress bar component
- Section-specific color theming
- Preview of upcoming content
- Estimated time remaining display
- Achievement unlocking animations

### Phase 2: Navigation System Overhaul

#### 2.1 Enhanced Navigation Component

**File**: `core/components/Navigation.tsx` (Enhanced)

**Maintain Existing Functionality**:

- ✅ Keyboard navigation (arrow keys)
- ✅ Touch/swipe gestures
- ✅ Mobile-optimized layout
- ✅ Desktop bottom bar
- ✅ Page dot indicators

**New Enhancements**:

- **Improved Hover States**: Subtle animations and feedback
- **Enhanced Cursor Behavior**:
  - `cursor: pointer` for actionable elements
  - `cursor: not-allowed` for disabled states
  - `cursor: grab` for swipeable areas
- **Progress-Aware Styling**: Navigation adapts to current section context
- **Breadcrumb Integration**: Mini-breadcrumb in navigation for context
- **Accessibility Improvements**: Better ARIA labels and keyboard focus management

#### 2.2 Navigation Interaction Patterns

```typescript
// Enhanced hover states
.nav-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(46, 30, 114, 0.15);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }
}
```

### Phase 3: Design System Updates

#### 3.1 Typography System

**File**: `core/design-system/typography/index.ts`

**New Typography Scale**:

```typescript
export const typography = {
  // Headlines for major sections
  display: {
    large: 'text-3xl lg:text-4xl font-bold font-playfair',
    medium: 'text-2xl lg:text-3xl font-bold font-playfair',
    small: 'text-xl lg:text-2xl font-bold font-playfair',
  },

  // Content headings
  heading: {
    h1: 'text-xl lg:text-2xl font-semibold font-red-hat',
    h2: 'text-lg lg:text-xl font-semibold font-red-hat',
    h3: 'text-base lg:text-lg font-medium font-red-hat',
  },

  // Body text
  body: {
    large: 'text-base lg:text-lg font-red-hat leading-relaxed',
    medium: 'text-sm lg:text-base font-red-hat leading-relaxed',
    small: 'text-xs lg:text-sm font-red-hat leading-normal',
  },

  // Interactive elements
  interactive: {
    button: 'text-sm lg:text-base font-medium font-red-hat',
    link: 'text-sm lg:text-base font-medium font-red-hat underline',
    label:
      'text-xs lg:text-sm font-medium font-red-hat uppercase tracking-wide',
  },
};
```

#### 3.2 Color System Enhancement

**File**: `core/design-system/colors/index.ts`

**Expanded Color Palette**:

```typescript
export const colors = {
  // Primary brand colors
  primary: {
    50: '#F8F6FF',
    100: '#E5DEEF',
    200: '#D1C4E9',
    500: '#8577B7',
    600: '#2E1E72',
    700: '#1A0F4A',
    900: '#0D0825',
  },

  // Accent colors
  accent: {
    yellow: '#DBE250',
    blue: '#0F2D52',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  // Contextual colors
  interactive: {
    hover: 'rgba(46, 30, 114, 0.05)',
    pressed: 'rgba(46, 30, 114, 0.10)',
    disabled: 'rgba(107, 114, 128, 0.30)',
  },
};
```

#### 3.3 Component Spacing & Layout

**File**: `core/design-system/spacing/index.ts`

**Standardized Spacing System**:

```typescript
export const spacing = {
  // Component internal spacing
  component: {
    xs: '8px', // 0.5rem
    sm: '12px', // 0.75rem
    md: '16px', // 1rem
    lg: '24px', // 1.5rem
    xl: '32px', // 2rem
  },

  // Layout spacing
  layout: {
    section: '48px', // 3rem
    page: '64px', // 4rem
    content: '80px', // 5rem
  },

  // Interactive targets
  touch: {
    minimum: '44px', // iOS/Android standard
    comfortable: '48px',
    large: '56px',
  },
};
```

### Phase 4: New Component Development

#### 4.1 Learning Objectives Checklist

**File**: `core/design-system/components/LearningObjectives.tsx`

**Component Specifications**:

```typescript
interface LearningObjectivesProps {
  title: string;
  objectives: Array<{
    id: string;
    text: string;
    completed?: boolean;
    locked?: boolean;
  }>;
  onObjectiveClick?: (id: string) => void;
  variant: 'compact' | 'detailed';
  showProgress?: boolean;
}
```

**Features**:

- Animated checkmark transitions
- Progress-aware objective states
- Accessibility-compliant focus management
- Mobile-optimized touch targets

#### 4.2 Interactive Icon System

**File**: `core/design-system/components/InteractiveIcon.tsx`

**Component Specifications**:

```typescript
interface InteractiveIconProps {
  icon: IconType;
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant: 'outline' | 'filled' | 'gradient';
  colorScheme: 'purple' | 'blue' | 'purple' | 'neutral';
  interactive?: boolean;
  tooltip?: string;
  ariaLabel: string;
  onClick?: () => void;
}
```

**Icon Library**:

- Bank building (various styles)
- Money flow indicators
- Payment system icons
- Educational concept icons
- Interactive state icons (info, help, external)

#### 4.3 Glossary Tooltip System

**File**: `core/design-system/components/GlossaryTooltip.tsx`

**Component Specifications**:

```typescript
interface GlossaryTooltipProps {
  term: string;
  definition: string;
  examples?: string[];
  relatedTerms?: string[];
  trigger: React.ReactNode;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  delay?: number;
}
```

**Features**:

- Floating UI positioning
- Mobile-friendly modal fallback
- Rich content support (examples, related terms)
- Keyboard navigation support
- Analytics tracking for term interactions

#### 4.4 Game Interface Components

**File**: `core/design-system/components/GameInterface.tsx`

**Component Specifications**:

```typescript
interface GameInterfaceProps {
  gameType: 'whack-a-mole' | 'drag-drop' | 'quiz' | 'scenario';
  gameState: GameState;
  onGameAction: (action: GameAction) => void;
  theme: 'purple' | 'blue' | 'green';
  difficulty: 'easy' | 'medium' | 'hard';
}
```

**Features**:

- Responsive game area sizing
- Touch and mouse input handling
- Animation and sound integration hooks
- Progress tracking and scoring
- Accessibility considerations for games

### Phase 5: Content Architecture Updates

#### 5.1 Enhanced Page Component Structure

**File**: `modules/banking-fees/units/unit-2-fees/content/pages.tsx` (Enhanced)

**New Page Type System**:

```typescript
interface UnitPage {
  id: number;
  type: 'overview' | 'game' | 'narrative' | 'interactive' | 'assessment';
  component: React.ComponentType<PageProps>;
  title: string;
  description: string;
  estimatedTime: number; // minutes
  objectives: string[];
  prerequisites?: number[]; // page IDs
  resources?: Resource[];
}
```

#### 5.2 Content Template System

**Files**: `modules/banking-fees/units/unit-2-fees/templates/`

**Template Components**:

- `OverviewTemplate.tsx` - For learning objective pages
- `GameTemplate.tsx` - For interactive game content
- `NarrativeTemplate.tsx` - For story-based content
- `InteractiveTemplate.tsx` - For glossary-rich content
- `AssessmentTemplate.tsx` - For quiz and evaluation content

### Phase 6: Integration & State Management

#### 6.1 Enhanced State Management

**File**: `modules/banking-fees/units/unit-2-fees/index.tsx` (Enhanced)

**New State Structure**:

```typescript
interface UnitState {
  // Current navigation
  currentPage: number;
  currentSection: string;

  // Progress tracking
  pageProgress: Record<number, PageProgress>;
  objectiveCompletion: Record<string, boolean>;
  gameScores: Record<string, GameScore>;

  // User interactions
  glossaryTermsViewed: string[];
  timeSpentPerPage: Record<number, number>;

  // Accessibility
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
}
```

#### 6.2 Progress Persistence

**Enhanced localStorage Strategy**:

```typescript
// More granular progress tracking
const progressSchema = {
  unitId: string;
  version: string; // for migration handling
  lastUpdated: Date;
  completion: {
    pages: Record<number, PageCompletion>;
    objectives: Record<string, ObjectiveCompletion>;
    games: Record<string, GameCompletion>;
  };
  analytics: {
    totalTimeSpent: number;
    averagePageTime: number;
    strugglingAreas: string[];
  };
};
```

## Technical Considerations

### Performance Optimization

- **Lazy Loading**: Game components and heavy assets loaded on demand
- **Virtual Scrolling**: For long content pages
- **Image Optimization**: WebP format with fallbacks
- **Bundle Splitting**: Separate chunks for games vs. content

### Accessibility Standards

- **WCAG 2.1 AA Compliance**: All interactive elements
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full functionality without mouse
- **Motion Sensitivity**: Respect prefers-reduced-motion
- **Color Contrast**: Minimum 4.5:1 ratio for text

### Mobile Optimization

- **Touch Targets**: Minimum 44px for all interactive elements
- **Viewport Handling**: Safe area awareness for notched devices
- **Performance**: 60fps animations on mid-range devices
- **Network Awareness**: Graceful degradation on slow connections

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Polyfills**: Minimal set for essential features only

## Migration Strategy

### Phase 1: Foundation (Week 1)

1. Implement new progress bar component
2. Enhance existing navigation with improved hover states
3. Update design system foundations (colors, typography, spacing)

### Phase 2: Core Components (Week 2)

1. Build learning objectives checklist component
2. Create interactive icon system
3. Implement glossary tooltip system

### Phase 3: Game Integration (Week 3)

1. Develop game interface components
2. Update whack-a-mole game with new design
3. Create game template system

### Phase 4: Content Templates (Week 4)

1. Build page template components
2. Migrate existing content to new templates
3. Enhance state management system

### Phase 5: Polish & Testing (Week 5)

1. Accessibility audit and fixes
2. Performance optimization
3. Cross-browser testing
4. User testing and feedback integration

## Success Metrics

### User Engagement

- **Time on Page**: Increase average page completion time
- **Progression Rate**: Reduce page abandonment rate
- **Return Visits**: Increase session return rate

### Learning Effectiveness

- **Objective Completion**: Track individual learning objective mastery
- **Knowledge Retention**: Assessment scores before/after
- **Concept Interaction**: Glossary term engagement rates

### Technical Performance

- **Page Load Speed**: Sub-2 second initial load
- **Interaction Responsiveness**: Sub-100ms UI response time
- **Error Rates**: Zero critical accessibility violations
- **Cross-Device Consistency**: 99% feature parity across devices

## Risk Mitigation

### Technical Risks

- **Backward Compatibility**: Feature flags for gradual rollout
- **Performance Regression**: Continuous monitoring and alerts
- **Accessibility Compliance**: Automated testing in CI/CD pipeline

### User Experience Risks

- **Learning Curve**: Progressive disclosure of new features
- **Content Migration**: Staged content updates with user feedback
- **Device Compatibility**: Comprehensive device testing matrix

## Conclusion

This redesign plan provides a comprehensive roadmap for transforming the Unit 2 experience into a more engaging, accessible, and educationally effective learning environment. The phased approach ensures minimal disruption while delivering meaningful improvements to both user experience and technical architecture.

The new design system components will be reusable across other units, providing a scalable foundation for future educational content development.
