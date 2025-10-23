/**
 * SVG Icon Library for Unit 2
 * Centralized collection of all icons used across Unit 2 pages
 * Features:
 * - Consistent purple theme styling
 * - Responsive sizing
 * - Accessible with proper ARIA labels
 * - Optimized SVG paths
 */

import React from 'react';
import { cn } from '../utils/classNames';

export interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  className?: string;
  'aria-label'?: string;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10'
};

const colorClasses = {
  primary: 'text-[#2E1E72]',
  secondary: 'text-[#8577B7]',
  accent: 'text-[#DBE250]',
  neutral: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-orange-600',
  error: 'text-red-600'
};

const createIcon = (
  displayName: string,
  viewBox: string,
  path: React.ReactNode
) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 'md', color = 'primary', className, 'aria-label': ariaLabel, ...props }, ref) => (
      <svg
        ref={ref}
        className={cn(
          sizeClasses[size],
          colorClasses[color],
          'inline-block fill-current',
          className
        )}
        viewBox={viewBox}
        aria-label={ariaLabel || displayName}
        role="img"
        {...props}
      >
        {path}
      </svg>
    )
  );

  Icon.displayName = displayName;
  return Icon;
};

// Bank and Financial Icons
export const BankIcon = createIcon(
  'BankIcon',
  '0 0 24 24',
  <>
    <path d="M2 21h20v-2H2v2z"/>
    <path d="M4 18h16V6H4v12zm2-10h12v8H6V8z"/>
    <path d="M12 2L2 7h20L12 2z"/>
    <path d="M8 10h2v6H8v-6z"/>
    <path d="M12 10h2v6h-2v-6z"/>
    <path d="M16 10h2v6h-2v-6z"/>
  </>
);

export const CreditCardIcon = createIcon(
  'CreditCardIcon',
  '0 0 24 24',
  <>
    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
    <path d="M2 10h20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M6 14h4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </>
);

export const MoneyIcon = createIcon(
  'MoneyIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12h8"/>
    <path d="M12 8v8"/>
    <path d="M8.5 8.5L15.5 15.5"/>
    <path d="M15.5 8.5L8.5 15.5"/>
  </>
);

export const FeeIcon = createIcon(
  'FeeIcon',
  '0 0 24 24',
  <>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    <path d="M9 11H7v2h2v-2z"/>
    <path d="M13 11h-2v2h2v-2z"/>
    <path d="M17 11h-2v2h2v-2z"/>
  </>
);

export const TransactionIcon = createIcon(
  'TransactionIcon',
  '0 0 24 24',
  <>
    <path d="M19 14V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2z"/>
    <path d="M3 10h18"/>
    <path d="M8 6h.01"/>
    <path d="M12 6h.01"/>
  </>
);

// Learning and Education Icons
export const BookIcon = createIcon(
  'BookIcon',
  '0 0 24 24',
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </>
);

export const LightbulbIcon = createIcon(
  'LightbulbIcon',
  '0 0 24 24',
  <>
    <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/>
    <path d="M9 21h6"/>
    <path d="M10 3h4"/>
  </>
);

export const GlossaryIcon = createIcon(
  'GlossaryIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
    <path d="M8.5 8.5h7"/>
    <path d="M8.5 15.5h7"/>
  </>
);

export const QuizIcon = createIcon(
  'QuizIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </>
);

// Navigation and Interface Icons
export const CheckIcon = createIcon(
  'CheckIcon',
  '0 0 24 24',
  <>
    <path d="M20 6L9 17l-5-5"/>
  </>
);

export const XIcon = createIcon(
  'XIcon',
  '0 0 24 24',
  <>
    <path d="M18 6L6 18"/>
    <path d="M6 6l12 12"/>
  </>
);

export const ArrowLeftIcon = createIcon(
  'ArrowLeftIcon',
  '0 0 24 24',
  <>
    <path d="M19 12H5"/>
    <path d="M12 19l-7-7 7-7"/>
  </>
);

export const ArrowRightIcon = createIcon(
  'ArrowRightIcon',
  '0 0 24 24',
  <>
    <path d="M5 12h14"/>
    <path d="M12 5l7 7-7 7"/>
  </>
);

export const InfoIcon = createIcon(
  'InfoIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </>
);

export const AlertIcon = createIcon(
  'AlertIcon',
  '0 0 24 24',
  <>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </>
);

// Activity and Game Icons
export const GameIcon = createIcon(
  'GameIcon',
  '0 0 24 24',
  <>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <circle cx="8" cy="12" r="2"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
  </>
);

export const TargetIcon = createIcon(
  'TargetIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </>
);

export const TrophyIcon = createIcon(
  'TrophyIcon',
  '0 0 24 24',
  <>
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
    <path d="M6 9a6 6 0 1012 0"/>
    <path d="M12 15v6"/>
    <path d="M8 21h8"/>
  </>
);

// Statement and Report Icons
export const DocumentIcon = createIcon(
  'DocumentIcon',
  '0 0 24 24',
  <>
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </>
);

export const ChartIcon = createIcon(
  'ChartIcon',
  '0 0 24 24',
  <>
    <path d="M3 3v18h18"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  </>
);

export const CalendarIcon = createIcon(
  'CalendarIcon',
  '0 0 24 24',
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </>
);

// Emotion and Feedback Icons
export const ThumbsUpIcon = createIcon(
  'ThumbsUpIcon',
  '0 0 24 24',
  <>
    <path d="M7 10v12"/>
    <path d="M15 5.88L14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2h0a3.13 3.13 0 013 3.88z"/>
  </>
);

export const ThumbsDownIcon = createIcon(
  'ThumbsDownIcon',
  '0 0 24 24',
  <>
    <path d="M17 14V2"/>
    <path d="M9 18.12L10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H20a2 2 0 012 2v8a2 2 0 01-2 2h-2.76a2 2 0 00-1.79 1.11L12 22h0a3.13 3.13 0 01-3-3.88z"/>
  </>
);

export const StarIcon = createIcon(
  'StarIcon',
  '0 0 24 24',
  <>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </>
);

// Utility Icons
export const SearchIcon = createIcon(
  'SearchIcon',
  '0 0 24 24',
  <>
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </>
);

export const FilterIcon = createIcon(
  'FilterIcon',
  '0 0 24 24',
  <>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </>
);

export const SettingsIcon = createIcon(
  'SettingsIcon',
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </>
);

export const MenuIcon = createIcon(
  'MenuIcon',
  '0 0 24 24',
  <>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </>
);

// Export all icons for easy importing
export const Icons = {
  Bank: BankIcon,
  CreditCard: CreditCardIcon,
  Money: MoneyIcon,
  Fee: FeeIcon,
  Transaction: TransactionIcon,
  Book: BookIcon,
  Lightbulb: LightbulbIcon,
  Glossary: GlossaryIcon,
  Quiz: QuizIcon,
  Check: CheckIcon,
  X: XIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,
  Info: InfoIcon,
  Alert: AlertIcon,
  Game: GameIcon,
  Target: TargetIcon,
  Trophy: TrophyIcon,
  Document: DocumentIcon,
  Chart: ChartIcon,
  Calendar: CalendarIcon,
  ThumbsUp: ThumbsUpIcon,
  ThumbsDown: ThumbsDownIcon,
  Star: StarIcon,
  Search: SearchIcon,
  Filter: FilterIcon,
  Settings: SettingsIcon,
  Menu: MenuIcon,
} as const;

export type IconName = keyof typeof Icons;