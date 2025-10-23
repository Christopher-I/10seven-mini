# Fund Your Future Platform Documentation

## Quick Navigation for AI

### Setup & Configuration
- [Firebase Setup](setup/FIREBASE_SETUP.md) - Database and auth configuration

### Architecture & Design
- [Design System Migration](architecture/DESIGN_SYSTEM_MIGRATION.md) - Component library strategy
- [CMS Proposal](architecture/CMS_PROPOSAL.md) - Content management approach
- [Design Analysis](architecture/DESIGN_ANALYSIS.md) - UI/UX architecture

### Implementation Plans
- [Unit Design Guide](implementation/unit-design-guide.md) - How to build units
- [Fund Your Future Strategy](implementation/FUND_YOUR_FUTURE_DESIGN_IMPLEMENTATION_STRATEGY.md) - Overall approach
- [Unit 2 Integration Plan](implementation/UNIT_2_INTEGRATED_IMPLEMENTATION_PLAN.md) - Unit 2 implementation
- [Unit 2 Design Update](implementation/UNIT_2_DESIGN_UPDATE_PLAN.md) - Design updates for Unit 2
- [Unit View Redesign](implementation/UNIT_VIEW_REDESIGN_PLAN.md) - Unit view improvements
- [Module 2 Implementation](implementation/MODULE_2_IMPLEMENTATION_PLAN.md) - Module 2 development

### Project Management
- [Progress Report](project-management/PROGRESS_REPORT.md) - Current status
- [Session History](project-management/SESSION_HISTORY.md) - Development timeline
- [Project Context](project-management/PROJECT_CONTEXT.md) - Goals and requirements

## Code Organization

### Main Structure
- **Main code**: `/modules/banking-fees/units/` - Educational content organized by units
- **Shared components**: `/core/design-system/` - Reusable UI components
- **Documentation**: `/docs/` - All project documentation

### Unit Structure Pattern
Each unit follows this pattern:
```
unit-X-name/
├── content/pages/       # Page components split by ranges
├── content/components/  # Unit-specific components
├── activities/         # Interactive elements (games, quizzes)
├── data/              # Data definitions and types
└── index.tsx          # Unit orchestration
```

### Finding Specific Content
- **Page X**: Look in appropriate unit, then `pages-{range}.tsx` files
- **Components**: Check unit's `/components/` or shared `/core/design-system/`
- **Data**: Check unit's `/data/` directory
- **Interactive elements**: Check unit's `/activities/` directory

## AI Navigation Tips
- All page components follow `PageX` naming pattern
- Files split by logical page ranges (4-6 pages per file)
- Each file has header comments describing contents
- Consistent TypeScript patterns across all units