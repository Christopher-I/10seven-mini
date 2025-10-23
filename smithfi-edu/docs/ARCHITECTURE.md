# Fund Your Futureal Platform - Architecture Documentation

## Project Overview

Financial literacy e-learning platform for Smith College students, starting with Module 2, Unit 2: "It's a Fee-for-All"

## Current Status (Day 1 Complete)

✅ Next.js application initialized with TypeScript
✅ Development environment configured (ESLint, Prettier, Husky)
✅ Core architecture established
✅ Banking services implemented (fee calculations, transaction processing)
✅ Storage service with localStorage persistence
✅ Analytics tracking (privacy-first, no PII)
✅ Statement view component with live balance updates
✅ Progress tracking and navigation
✅ Routing for `/module/banking-fees/unit/2`

## Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context (planned)
- **Storage**: localStorage with versioning
- **Deployment**: Vercel (configured)
- **Testing**: Vitest + React Testing Library (planned)

## Project Structure

```
smithfi-edu/
├── app/                     # Next.js app router
│   └── module/
│       └── banking-fees/
│           └── unit/
│               └── 2/       # Unit 2 route
├── core/                    # Reusable core functionality
│   ├── activity-engine/     # Activity system (WIP)
│   ├── components/          # Shared UI components
│   │   ├── Statement/       # Banking statement components
│   │   ├── ProgressBar.tsx
│   │   └── Navigation.tsx
│   ├── services/            # Business logic
│   │   ├── banking.ts       # Banking calculations
│   │   ├── storage.ts       # Progress persistence
│   │   └── analytics.ts     # Event tracking
│   └── types/               # TypeScript definitions
├── modules/                 # Module-specific code
│   └── banking-fees/
│       └── units/
│           └── unit-2-fees/ # Unit 2 implementation
└── docs/                    # Documentation
```

## Key Features Implemented

### 1. Statement View

- Real-time transaction display with running balance
- Fee highlighting and categorization
- Filter by transaction type (fees, purchases, deposits)
- Responsive table/card layout
- Accessibility: Full keyboard navigation

### 2. Banking Logic Engine

- Accurate fee calculations (overdraft, ATM, maintenance)
- Transaction resequencing simulation
- Balance tracking with fee impacts
- Configurable fee rules

### 3. Progress Tracking

- Per-unit progress persistence
- Resume where you left off
- Activity completion tracking
- Version migration support

### 4. Analytics (Privacy-First)

- No PII collection
- Session-based tracking only
- Event batching for performance
- Local debugging tools

## Next Steps (Day 2-3)

1. Build Whack-a-Mole game engine
2. Integrate game with statement updates
3. Add accessibility features for the game
4. Implement keyboard controls

## Accessibility Compliance

Target: WCAG 2.1 AA

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ⏳ Screen reader testing (pending)
- ⏳ Color contrast verification (pending)

## Performance Targets

- Initial JS: <250KB gzipped (current: ~200KB)
- 60fps interactions
- <3s load time on 4G
- Lighthouse score >90

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npx prettier --write .
```

## Environment Variables

Currently none required. SSO integration will require:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_SECRET`

## Deployment

Configured for Vercel deployment:

- Preview deployments on PR
- Production deployment on main branch
- Environment variables managed in Vercel dashboard
