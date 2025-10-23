/**
 * Design System Components
 * Central export for all unified components
 */

// Core unified components
export {
  ContentBox,
  type ContentBoxProps,
  type ContentBoxVariant,
  type ContentBoxSemantic
} from './ContentBox';

export {
  UnifiedHeading,
  AccentHeading,
  StatusHeading,
  AlertHeading,
  UnitTitle,
  type UnifiedHeadingProps,
  type HeadingVariant,
  type HeadingLevel,
  type HeadingSemantic
} from './UnifiedHeading';

export {
  UnifiedCard,
  HeroCard,
  AlertCard,
  CompletionCard,
  SummaryCard,
  InteractiveCard,
  type UnifiedCardProps,
  type CardVariant,
  type CardSemantic,
  type CardBorder
} from './UnifiedCard';

// New unified components for Unit 1 completion
export {
  DemoBox,
  InteractiveDemo,
  VisualGuide,
  PreviewBox,
  type DemoBoxProps,
  type DemoVariant,
  type DemoSemantic
} from './DemoBox';

export {
  Layout,
  Stack,
  Center,
  Flow,
  Section,
  Grid,
  Flex,
  type LayoutProps,
  type LayoutVariant,
  type LayoutSpacing,
  type LayoutAlign
} from './Layout';

export {
  Text,
  Body,
  Small,
  Large,
  Subtitle,
  XSmall,
  XLarge,
  type TextProps,
  type TextVariant,
  type TextSemantic,
  type TextWeight
} from './Text';

export {
  List,
  ListItem,
  BulletList,
  NumberedList,
  Checklist,
  type ListProps,
  type ListItemProps,
  type ListVariant,
  type ListSpacing,
  type ListSize
} from './List';

export {
  InteractiveSpectrum,
  type SpectrumResponse,
  type InteractiveSpectrumProps
} from './InteractiveSpectrum';

export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSemantic,
  type BadgeSize
} from './Badge';

export {
  Checkbox,
  type CheckboxProps,
  type CheckboxSemantic,
  type CheckboxSize
} from './Checkbox';

export {
  RadioGroup,
  type RadioGroupProps,
  type RadioOption,
  type RadioGroupSemantic,
  type RadioGroupSize
} from './RadioGroup';

export {
  SwipeCard,
  type SwipeCardProps,
  type SwipeCardVariant,
  type SwipeCardSize
} from './SwipeCard';

export {
  SwipeContainer,
  type SwipeContainerProps,
  type SwipeContainerItem
} from './SwipeContainer';

export {
  SwipeActionButtons,
  type SwipeActionButtonsProps,
  type SwipeActionButtonsSize,
  type SwipeActionButtonsLayout
} from './SwipeActionButtons';

// Dashboard specific components
export {
  DashboardCard,
  type DashboardCardProps
} from './DashboardCard';

export {
  TrackSection,
  type TrackSectionProps
} from './TrackSection';

export {
  ModuleUnitCard,
  type ModuleUnitCardProps
} from './ModuleUnitCard';

export {
  ProgressDots,
  type ProgressDotsProps
} from './ProgressDots';

export {
  UnitProgressHeader,
  type UnitProgressHeaderProps
} from './UnitProgressHeader';

export {
  UnitProgressBars,
  type UnitProgressBarsProps
} from './UnitProgressBars';

// Foundation template components for Unit 2
export {
  LearningObjectives,
  type LearningObjectivesProps,
  type LearningObjective
} from './LearningObjectives';

export {
  Narrative,
  type NarrativeProps,
  type NarrativeBlock
} from './Narrative';

export {
  Educational,
  type EducationalProps,
  type InteractiveElement,
  type GlossaryTerm
} from './Educational';

// Mobile-first components for Unit 2
export {
  FeeModal,
  type FeeModalProps,
  type FeeInfo
} from './FeeModal';

export {
  FeeGrid,
  type FeeGridProps,
  type FeeItem
} from './FeeGrid';

export {
  MobileStatement,
  type MobileStatementProps,
  type Transaction,
  type StatementPeriod
} from './MobileStatement';

export {
  Survey,
  type SurveyProps,
  type SurveyQuestion,
  type SurveyOption,
  type SurveyResponse
} from './Survey';

export {
  ProgressBreak,
  type ProgressBreakProps
} from './ProgressBreak';

export {
  PageNavigation,
  type PageNavigationProps
} from './PageNavigation';

// SVG Icon Library
export {
  Icons,
  BankIcon,
  CreditCardIcon,
  MoneyIcon,
  FeeIcon,
  TransactionIcon,
  BookIcon,
  LightbulbIcon,
  GlossaryIcon,
  QuizIcon,
  CheckIcon,
  XIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InfoIcon,
  AlertIcon,
  GameIcon,
  TargetIcon,
  TrophyIcon,
  DocumentIcon,
  ChartIcon,
  CalendarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  StarIcon,
  SearchIcon,
  FilterIcon,
  SettingsIcon,
  MenuIcon,
  type IconProps,
  type IconName
} from '../icons';

export {
  PageContainer,
  CardContainer,
  MinimalContainer,
  ElevatedContainer,
  type PageContainerProps,
  type PageContainerVariant,
  type PageContainerBackground
} from './PageContainer';

// Re-export tokens and utils for convenience
export {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  type ColorToken,
  type SemanticColor,
  type TypographyWeight,
  type SpacingScale
} from '../tokens';

export {
  cn,
  semanticColor,
  variant,
  responsiveSpacing,
  interactiveStates,
  responsiveText,
  type SemanticColorType,
  type SpacingSize,
  type TextSize
} from '../utils/classNames';

export {
  createResponsiveClasses,
  createMobileClasses,
  gridPatterns,
  textPatterns,
  spacingPatterns,
  unit2Patterns,
  type ResponsiveConfig,
  type MobileConfig,
  type GridPattern,
  type TextPattern,
  type SpacingPattern
} from '../utils/responsive';