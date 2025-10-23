/**
 * Core types for the Fund Your Future Educational Platform
 */

// Transaction types for banking module
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category?: 'fee' | 'purchase' | 'deposit' | 'transfer';
  feeType?: 'overdraft' | 'maintenance' | 'atm' | 'foreign' | 'nsf';
  balance?: number; // Balance after this transaction
}

// Statement interface
export interface Statement {
  transactions: Transaction[];
  startingBalance: number;
  currentBalance: number;
  fees: FeesSummary;
  accountNumber?: string;
  accountType?: 'checking' | 'savings';
  period?: {
    start: Date;
    end: Date;
  };
}

// Fees summary
export interface FeesSummary {
  total: number;
  byType: {
    overdraft: number;
    maintenance: number;
    atm: number;
    foreign: number;
    nsf: number;
    other: number;
  };
  count: number;
}

// Activity Engine types
export interface Activity {
  id: string;
  type: 'game' | 'calculator' | 'demo' | 'quiz' | 'survey';
  title: string;
  description?: string;
  config: ActivityConfig;
  onComplete?: (result: ActivityResult) => void;
}

export interface ActivityConfig {
  [key: string]: unknown; // Flexible config for different activity types
}

export interface ActivityResult {
  activityId: string;
  completed: boolean;
  score?: number;
  data?: Record<string, unknown>;
  timestamp: Date;
}

// Progress tracking
export interface Progress {
  moduleId: string;
  unitId: string;
  currentPage: number;
  totalPages: number;
  completedActivities: string[];
  startedAt: Date;
  lastUpdated: Date;
  completed: boolean;
  assessmentScore?: number;
}

// User progress store
export interface UserProgress {
  version: string;
  modules: {
    [moduleId: string]: {
      units: {
        [unitId: string]: Progress;
      };
    };
  };
}

// Analytics event
export interface AnalyticsEvent {
  eventType:
    | 'page_view'
    | 'activity_start'
    | 'activity_complete'
    | 'assessment_submit'
    | 'module_complete'
    | 'error';
  eventData: {
    moduleId?: string;
    unitId?: string;
    activityId?: string;
    page?: number;
    score?: number;
    error?: string;
    [key: string]: unknown;
  };
  timestamp: Date;
  sessionId: string;
}
