# Fund Your Future - Design System Analysis

## Overview

Based on Figma analysis of **45 mobile screens** (402x874px) focused on financial literacy education with interactive banking simulations.

## Design Tokens

### Color Palette

```scss
// Primary - Purple theme (Education/Learning)
$primary-main: #9c70fa;     // Vibrant purple
$primary-dark: #8577b7;     // Muted purple
$primary-light: #e5deef;    // Light purple background

// Secondary - Blue theme (Finance/Banking)
$secondary-dark: #2e1e72;   // Deep purple-blue
$secondary-main: #0f2d52;   // Navy blue

// Neutral
$neutral-white: #ffffff;
$neutral-light: #f8f8f8;    // Off-white background
$neutral-gray: #666666;      // Text secondary
$neutral-dark: #000000;      // Text primary

// Semantic Colors
$success: #4caf50;           // Green (to be confirmed)
$error: #f44336;             // Red for negative balances
$warning: #ff9800;           // Orange for warnings
```

### Typography

```scss
// Font Families
$font-display: 'Playfair Display', serif;    // Headers, impact text
$font-heading: 'Oswald', sans-serif;         // Module titles
$font-primary: 'Red Hat Display', sans-serif; // Primary UI text
$font-secondary: 'Mulish', sans-serif;       // Body text
$font-system: 'SF Pro', system-ui;           // System UI elements

// Font Sizes (Mobile First)
$text-xs: 14px;    // Small labels
$text-sm: 16px;    // Body text
$text-base: 17px;  // Default
$text-lg: 20px;    // Subheadings
$text-xl: 24px;    // Section headers
$text-2xl: 28px;   // Module titles
$text-3xl: 32px;   // Main headers
```

### Spacing System

```scss
// Based on 8px grid
$space-1: 4px;
$space-2: 8px;
$space-3: 12px;
$space-4: 16px;
$space-5: 20px;
$space-6: 24px;
$space-8: 32px;
$space-10: 40px;
$space-12: 48px;
$space-16: 64px;
```

## Screen Types Identified

### 1. Module Overview Screens
- Module selection grid
- Unit listing within modules
- Progress indicators
- Introduction screens

### 2. Learning Content Screens
- Educational text content
- Visual explanations
- Banking concepts
- Fee structures

### 3. Interactive Simulation Screens
- Bank balance displays
- Transaction flows
- ATM interactions
- Statement views
- Real-time balance updates

### 4. Navigation Screens
- Progress tracking
- Next/Previous buttons
- Module completion states
- Navigation breadcrumbs

## Key UI Patterns

### Financial Display Components

```typescript
// Balance Display Pattern
interface BalanceDisplay {
  label: string;          // "Available Balance"
  amount: number;         // 1000.00
  currency: string;       // "$"
  highlight?: boolean;    // For emphasis
  negative?: boolean;     // Red text for overdrafts
}

// Transaction Item Pattern
interface TransactionItem {
  description: string;    // "ATM Withdrawal"
  amount: number;         // -50.00
  balance: number;        // 950.00
  date?: string;         // "Thursday"
  fee?: boolean;         // Show fee indicator
}
```

### Learning Flow Components

```typescript
// Module Card Pattern
interface ModuleCard {
  number: number;        // Module 1
  title: string;         // "Banking & Fees"
  units: number;         // 5 units
  progress: number;      // 60% complete
  locked?: boolean;      // Progression gating
}

// Unit Content Pattern
interface UnitContent {
  title: string;         // "It's a Fee-for-All"
  content: string;       // Educational text
  interactive?: boolean; // Has simulation
  navigation: {
    previous?: string;
    next?: string;
  };
}
```

## Mobile-First Responsive Strategy

### Breakpoints
```scss
// Mobile First Approach
$mobile: 402px;        // Base design
$tablet: 768px;        // Scale up
$desktop: 1024px;      // Multi-column
$wide: 1440px;         // Max width

// Container Widths
$container-mobile: 100%;
$container-tablet: 720px;
$container-desktop: 960px;
$container-wide: 1200px;
```

### Layout Patterns

1. **Mobile (Base)**
   - Single column
   - Full-width cards
   - Stacked navigation
   - Bottom sheet interactions

2. **Tablet**
   - 2-column grid for modules
   - Side-by-side comparisons
   - Expanded transaction views

3. **Desktop**
   - 3-column module grid
   - Sidebar navigation
   - Modal overlays for simulations
   - Persistent progress bar

## Interactive Elements

### Banking Simulation Features
- **ATM Interface**: Withdrawal/deposit flows
- **Balance Tracker**: Real-time updates during scenarios
- **Fee Calculator**: Show impact of various fees
- **Statement Viewer**: Monthly statement visualization
- **Transaction Timeline**: Chronological event display

### Gamification Elements
- **Progress Bars**: Visual completion tracking
- **Achievement Badges**: Milestone rewards
- **Interactive Scenarios**: Choose-your-own banking adventure
- **Quiz Components**: Knowledge checks
- **Score Display**: Points/XP system

## Animation & Transitions

```scss
// Transition Timing
$transition-fast: 150ms;
$transition-base: 250ms;
$transition-slow: 350ms;

// Easing Functions
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-out: cubic-bezier(0.0, 0, 0.2, 1);
$ease-in: cubic-bezier(0.4, 0, 1, 1);

// Common Animations
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes balanceUpdate {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); color: $primary-main; }
  100% { transform: scale(1); }
}
```

## Component Library Structure

```
/components
  /core
    - Button.tsx
    - Card.tsx
    - Text.tsx
    - Input.tsx
  /banking
    - BalanceDisplay.tsx
    - TransactionList.tsx
    - ATMInterface.tsx
    - StatementView.tsx
  /learning
    - ModuleCard.tsx
    - UnitContent.tsx
    - ProgressBar.tsx
    - NavigationControls.tsx
  /interactive
    - Simulation.tsx
    - Quiz.tsx
    - ScenarioPlayer.tsx
```

## Implementation Priorities

### Phase 1: Foundation
1. Design token system in Tailwind config
2. Core component library
3. Mobile-responsive layouts
4. Basic navigation flow

### Phase 2: Learning Features
1. Module/unit structure
2. Content display components
3. Progress tracking
4. Navigation between units

### Phase 3: Interactive Elements
1. Banking simulation engine
2. Balance/transaction displays
3. Interactive scenarios
4. Fee calculations

### Phase 4: Enhancements
1. Animations and transitions
2. Gamification features
3. Achievement system
4. Analytics integration

## Accessibility Considerations

- **Color Contrast**: Ensure WCAG AA compliance
- **Touch Targets**: Minimum 44x44px for mobile
- **Screen Readers**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Text Sizing**: Responsive and zoomable

## Next Steps

1. Create Tailwind configuration with design tokens
2. Build component library based on patterns
3. Implement mobile-first responsive layouts
4. Develop interactive simulation engine
5. Test across devices and screen sizes

---

*Analysis Date: 2024-09-23*
*Figma File: Design (Copy)*
*Total Screens Analyzed: 45*