/**
 * Centralized Glossary System
 * Contains all financial terms and definitions used throughout the platform
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'banking' | 'fees' | 'accounts' | 'transactions' | 'general';
  unit?: string;
  examples?: string[];
  relatedTerms?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Unit 1 Terms
  {
    id: 'checking-account',
    term: 'Checking Account',
    definition: 'A bank account that allows you to deposit and withdraw money, write checks, and use a debit card for daily transactions.',
    category: 'accounts',
    unit: 'Unit 1',
    examples: ['Used for paying bills', 'Daily spending with debit card', 'Direct deposit of salary'],
    relatedTerms: ['debit-card', 'bank-fees', 'overdraft-fee']
  },
  {
    id: 'shareholders',
    term: 'Shareholders',
    definition: 'People who own shares (pieces) of a company and therefore have a financial interest in the company\'s success.',
    category: 'general',
    unit: 'Unit 1',
    examples: ['Bank shareholders profit when the bank makes money', 'Shareholders vote on major company decisions'],
    relatedTerms: ['net-income']
  },
  {
    id: 'net-income',
    term: 'Net Income',
    definition: 'The profit a company makes after paying all its expenses. For banks, this includes money from fees, interest, and other services.',
    category: 'general',
    unit: 'Unit 1',
    examples: ['Banks\' net income comes from fees and interest', 'Higher net income means more profit for shareholders'],
    relatedTerms: ['shareholders', 'bank-fees']
  },

  // Unit 2 Terms - Core Banking Fees
  {
    id: 'bank-fees',
    term: 'Bank Fees',
    definition: 'Charges that banks impose on customers for various services and account activities.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['Overdraft fees', 'Monthly maintenance fees', 'ATM fees'],
    relatedTerms: ['overdraft-fee', 'monthly-maintenance-fee', 'atm-fee']
  },
  {
    id: 'overdraft-fee',
    term: 'Overdraft Fee',
    definition: 'A fee charged when you spend more money than you have in your account, causing your balance to go negative.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$35 fee for a $5 coffee when account has $0', 'Multiple fees can be charged in one day'],
    relatedTerms: ['bank-fees', 'nsf-fee', 'account-balance']
  },
  {
    id: 'monthly-maintenance-fee',
    term: 'Monthly Maintenance Fee',
    definition: 'A recurring fee that banks charge to maintain your account, often waived if you meet certain requirements like minimum balance.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$12 monthly fee waived with $500 minimum balance', 'Free checking with direct deposit'],
    relatedTerms: ['bank-fees', 'minimum-balance']
  },
  {
    id: 'atm-fee',
    term: 'ATM Fee',
    definition: 'A charge for using an ATM outside of your bank\'s network, often charged by both your bank and the ATM owner.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$3.50 fee for using competitor bank ATM', 'Double fees: your bank + ATM owner'],
    relatedTerms: ['bank-fees', 'out-of-network']
  },

  // Unit 2 Terms - Additional Fee Types
  {
    id: 'check-fees',
    term: 'Check Fees',
    definition: 'Charges for ordering new checks, processing bounced checks, or other check-related services.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$25 for a box of checks', '$35 for a bounced check'],
    relatedTerms: ['nsf-fee', 'bank-fees']
  },
  {
    id: 'nsf-fee',
    term: 'Insufficient Funds Fees (NSF)',
    definition: 'A fee charged when a check or payment is returned due to insufficient funds in your account.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$35 fee for bounced check', 'Same amount as overdraft fee at most banks'],
    relatedTerms: ['overdraft-fee', 'check-fees', 'bank-fees']
  },
  {
    id: 'foreign-transaction-fee',
    term: 'Foreign Transaction Fees',
    definition: 'Charges applied when you make purchases or withdrawals in a foreign country or foreign currency.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['3% fee on purchases abroad', 'Additional fees for currency conversion'],
    relatedTerms: ['atm-fee', 'bank-fees']
  },
  {
    id: 'transfer-fees',
    term: 'Transfer Fees',
    definition: 'Costs associated with moving money between accounts, banks, or sending money to others.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$3 for wire transfer', '$25 for same-day transfer'],
    relatedTerms: ['bank-fees', 'wire-transfer']
  },
  {
    id: 'wire-transfer-fee',
    term: 'Wire Transfer Fees',
    definition: 'Premium charges for sending money electronically, typically same-day and more secure than regular transfers.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$25 domestic wire transfer', '$50 international wire transfer'],
    relatedTerms: ['transfer-fees', 'bank-fees']
  },
  {
    id: 'cashier-check-fee',
    term: 'Cashier\'s Check Fees',
    definition: 'Charges for issuing a guaranteed check backed by the bank\'s funds rather than your personal account.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$10 fee for cashier\'s check', 'Required for large purchases like cars'],
    relatedTerms: ['check-fees', 'bank-fees']
  },
  {
    id: 'stop-payment-fee',
    term: 'Stop Payment Fees',
    definition: 'Cost to cancel a check or automatic payment before it processes.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$35 to stop a check payment', '$15 to stop ACH payment'],
    relatedTerms: ['check-fees', 'bank-fees']
  },
  {
    id: 'account-closure-fee',
    term: 'Account Closure Fees',
    definition: 'A penalty charge for closing your account within a certain timeframe after opening, typically within 90-180 days.',
    category: 'fees',
    unit: 'Unit 2',
    examples: ['$25 fee for closing account within 90 days', 'Encourages customers to keep accounts longer'],
    relatedTerms: ['bank-fees', 'account-maintenance']
  },

  // Supporting Terms
  {
    id: 'minimum-balance',
    term: 'Minimum Balance',
    definition: 'The lowest amount of money you must keep in your account to avoid fees or qualify for benefits.',
    category: 'accounts',
    unit: 'Unit 2',
    examples: ['$500 minimum to waive monthly fee', '$25 minimum to keep account open'],
    relatedTerms: ['monthly-maintenance-fee', 'bank-fees']
  },
  {
    id: 'account-balance',
    term: 'Account Balance',
    definition: 'The current amount of money in your bank account at any given time.',
    category: 'accounts',
    examples: ['Check balance before making purchases', 'Negative balance triggers overdraft fees'],
    relatedTerms: ['overdraft-fee', 'minimum-balance']
  }
];

// Helper functions for glossary search and filtering
export const searchGlossary = (query: string): GlossaryTerm[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return GLOSSARY_TERMS;

  return GLOSSARY_TERMS.filter(term =>
    term.term.toLowerCase().includes(searchTerm) ||
    term.definition.toLowerCase().includes(searchTerm) ||
    term.examples?.some(example => example.toLowerCase().includes(searchTerm)) ||
    term.relatedTerms?.some(related => related.toLowerCase().includes(searchTerm))
  );
};

export const getTermsByCategory = (category: GlossaryTerm['category']): GlossaryTerm[] => {
  return GLOSSARY_TERMS.filter(term => term.category === category);
};

export const getTermsByUnit = (unit: string): GlossaryTerm[] => {
  return GLOSSARY_TERMS.filter(term => term.unit === unit);
};

export const getTermById = (id: string): GlossaryTerm | undefined => {
  return GLOSSARY_TERMS.find(term => term.id === id);
};

export const getRelatedTerms = (termId: string): GlossaryTerm[] => {
  const term = getTermById(termId);
  if (!term?.relatedTerms) return [];

  return term.relatedTerms
    .map(relatedId => getTermById(relatedId))
    .filter(Boolean) as GlossaryTerm[];
};

export const GLOSSARY_CATEGORIES = [
  { id: 'banking', label: 'Banking', icon: '🏦' },
  { id: 'fees', label: 'Fees', icon: '💰' },
  { id: 'accounts', label: 'Accounts', icon: '💳' },
  { id: 'transactions', label: 'Transactions', icon: '💸' },
  { id: 'general', label: 'General', icon: '📚' }
] as const;