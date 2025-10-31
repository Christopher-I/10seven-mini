/**
 * Module and Unit Configuration
 * Centralized configuration for all educational modules
 */

export interface ModuleUnit {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // minutes
  totalPages: number;
  activities: string[];
  prerequisites?: string[];
  unlocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind color class
  icon: string; // Icon identifier
  estimatedHours: number;
  units: ModuleUnit[];
  status: 'coming-soon' | 'available' | 'beta';
  launchDate?: Date;
}

/**
 * All available modules configuration
 */
export const MODULES: Module[] = [
  {
    id: 'intro-fund-your-future',
    title: 'Intro to Fund Your Future',
    description:
      'Explore the fundamentals of wealth justice and what you'll gain from this course.',
    color: 'slate',
    icon: 'rocket',
    estimatedHours: 1,
    status: 'coming-soon',
    launchDate: new Date('2025-12-01'),
    units: [
      {
        id: 'unit-1-welcome',
        title: 'Welcome to Fund Your Future',
        description: 'Introduction to the course and financial literacy basics.',
        estimatedTime: 30,
        totalPages: 10,
        activities: ['goal-setting', 'course-overview'],
        unlocked: false,
      },
      {
        id: 'unit-2-mindset',
        title: 'Financial Mindset',
        description: 'Building a healthy relationship with money and finances.',
        estimatedTime: 30,
        totalPages: 12,
        activities: ['reflection-exercise', 'values-assessment'],
        unlocked: false,
      },
    ],
  },
  {
    id: 'banking-fees',
    title: "It's a Big Bank World",
    description:
      'Explore how banking institutions work, what drives their practices, and how to navigate them.',
    color: 'stone',
    icon: 'bank',
    estimatedHours: 2.5,
    status: 'beta',
    units: [
      {
        id: 'unit-1-basics',
        title: 'Banking Basics',
        description:
          'Learn essential banking vocabulary through interactive flashcards and drag-and-drop quizzes.',
        estimatedTime: 45,
        totalPages: 8,
        activities: ['flashcard-system', 'drag-drop-quiz', 'vocabulary-review'],
        unlocked: true,
      },
      {
        id: 'unit-2-fees',
        title: "It's a Fee-for-All",
        description: 'Interactive games and tools to understand banking fees.',
        estimatedTime: 60,
        totalPages: 42,
        activities: [
          'whack-a-mole-fees',
          'statement-viewer',
          'fee-calculator',
          'resequencing-demo',
        ],
        unlocked: true,
      },
      {
        id: 'unit-3-accounts',
        title: 'How Banking Affects You',
        description:
          'Understanding the psychological and emotional impacts of banking experiences and common responses to financial challenges.',
        estimatedTime: 45,
        totalPages: 10,
        activities: [
          'response-spectrum',
          'scenario-analysis',
          'self-reflection',
        ],
        unlocked: true,
      },
      {
        id: 'unit-4-neobanks',
        title: 'Neobank Nation',
        description:
          'Learn about neobanks and digital-first banking through interactive Tinder-style matching and detailed comparisons.',
        estimatedTime: 40,
        totalPages: 6,
        activities: ['neobank-tinder', 'profile-explorer', 'comparison-tool'],
        unlocked: true,
      },
      {
        id: 'unit-5-student-banking',
        title: 'Banking As a Smithie',
        description:
          'Learn about student banking accounts and managing finances while studying abroad as a Smith College student.',
        estimatedTime: 40,
        totalPages: 9,
        activities: [
          'student-account-explorer',
          'study-abroad-planner',
          'bank-comparison',
        ],
        unlocked: true,
      },
    ],
  },
  {
    id: 'credit-building',
    title: 'The Credit System',
    description: 'Unpack the credit system and its impact on your financial life.',
    color: 'gray',
    icon: 'trending-up',
    estimatedHours: 3,
    status: 'coming-soon',
    launchDate: new Date('2026-01-15'),
    units: [
      {
        id: 'unit-1-basics',
        title: 'Credit Fundamentals',
        description: 'Understanding credit scores, reports, and factors.',
        estimatedTime: 45,
        totalPages: 25,
        activities: ['credit-simulation', 'score-calculator'],
        unlocked: false,
      },
      {
        id: 'unit-2-strategy',
        title: 'Building Strategy',
        description: 'Practical steps to build credit responsibly.',
        estimatedTime: 60,
        totalPages: 30,
        activities: ['strategy-planner', 'timeline-builder'],
        prerequisites: ['unit-1-basics'],
        unlocked: false,
      },
    ],
  },
];

/**
 * Get module by ID
 */
export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((m) => m.id === moduleId);
}

/**
 * Get unit by module and unit ID
 */
export function getUnit(
  moduleId: string,
  unitId: string
): ModuleUnit | undefined {
  const moduleData = getModule(moduleId);
  return moduleData?.units.find((u) => u.id === unitId);
}

/**
 * Get available modules (not coming-soon)
 */
export function getAvailableModules(): Module[] {
  return MODULES.filter((m) => m.status === 'available' || m.status === 'beta');
}

/**
 * Get unlocked units for a module
 */
export function getUnlockedUnits(moduleId: string): ModuleUnit[] {
  const moduleData = getModule(moduleId);
  if (!moduleData) return [];

  return moduleData.units.filter((unit) => unit.unlocked);
}

/**
 * Check if a unit is unlocked based on prerequisites
 */
export function isUnitUnlocked(
  moduleId: string,
  unitId: string,
  completedUnits: string[] = []
): boolean {
  const unit = getUnit(moduleId, unitId);
  if (!unit) return false;

  // If unit is explicitly marked as unlocked
  if (unit.unlocked) return true;

  // Check prerequisites
  if (!unit.prerequisites || unit.prerequisites.length === 0) return true;

  return unit.prerequisites.every((prereq) => completedUnits.includes(prereq));
}

/**
 * Get color classes for a module
 */
export function getModuleColorClasses(color: string) {
  const colorMap: Record<
    string,
    {
      bg: string;
      bgLight: string;
      text: string;
      border: string;
      hover: string;
    }
  > = {
    stone: {
      bg: 'bg-stone-600',
      bgLight: 'bg-stone-50',
      text: 'text-stone-600',
      border: 'border-stone-200',
      hover: 'hover:bg-stone-700',
    },
    gray: {
      bg: 'bg-gray-600',
      bgLight: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-700',
    },
    purple: {
      bg: 'bg-purple-800',
      bgLight: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-900',
    },
    slate: {
      bg: 'bg-slate-600',
      bgLight: 'bg-slate-50',
      text: 'text-slate-600',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-700',
    },
  };

  return colorMap[color] || colorMap.stone;
}
