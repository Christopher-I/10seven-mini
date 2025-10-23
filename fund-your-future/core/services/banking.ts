/**
 * Banking calculations and business logic
 */

import { Transaction, Statement, FeesSummary } from '@/core/types';

/**
 * Calculate running balance for a list of transactions
 */
export function calculateRunningBalance(
  transactions: Transaction[],
  startingBalance: number
): Transaction[] {
  let balance = startingBalance;

  return transactions.map((transaction) => {
    if (transaction.type === 'debit') {
      balance -= Math.abs(transaction.amount);
    } else {
      balance += Math.abs(transaction.amount);
    }

    return {
      ...transaction,
      balance: balance,
    };
  });
}

/**
 * Check if a transaction would cause an overdraft
 */
export function wouldCauseOverdraft(
  currentBalance: number,
  transactionAmount: number,
  transactionType: 'debit' | 'credit'
): boolean {
  if (transactionType === 'credit') return false;
  return currentBalance - Math.abs(transactionAmount) < 0;
}

/**
 * Calculate overdraft fee based on bank rules
 */
export function calculateOverdraftFee(
  overdraftAmount: number,
  dailyOverdraftCount: number = 0
): number {
  const BASE_FEE = 35;
  const MAX_DAILY_FEES = 4;

  if (dailyOverdraftCount >= MAX_DAILY_FEES) {
    return 0; // No more fees after 4 per day
  }

  if (overdraftAmount <= 5) {
    return 0; // No fee for small overdrafts
  }

  return BASE_FEE;
}

/**
 * Process transactions with fee application
 */
export function processTransactionsWithFees(
  transactions: Transaction[],
  startingBalance: number,
  applyFees: boolean = true
): { transactions: Transaction[]; fees: Transaction[] } {
  let balance = startingBalance;
  const processedTransactions: Transaction[] = [];
  const fees: Transaction[] = [];
  const dailyOverdraftCount: { [date: string]: number } = {};

  for (const transaction of transactions) {
    const dateKey = transaction.date.toISOString().split('T')[0];

    // Process the transaction
    if (transaction.type === 'debit') {
      const newBalance = balance - Math.abs(transaction.amount);

      // Check for overdraft
      if (applyFees && newBalance < 0) {
        const overdraftCount = dailyOverdraftCount[dateKey] || 0;
        const fee = calculateOverdraftFee(Math.abs(newBalance), overdraftCount);

        if (fee > 0) {
          dailyOverdraftCount[dateKey] = overdraftCount + 1;

          const feeTransaction: Transaction = {
            id: `fee-${transaction.id}`,
            date: transaction.date,
            description: 'Overdraft Fee',
            amount: fee,
            type: 'debit',
            category: 'fee',
            feeType: 'overdraft',
          };

          fees.push(feeTransaction);
          balance -= fee;
        }
      }

      balance = newBalance;
    } else {
      balance += Math.abs(transaction.amount);
    }

    processedTransactions.push({
      ...transaction,
      balance: balance,
    });
  }

  return { transactions: processedTransactions, fees };
}

/**
 * Resequence transactions to minimize fees (high-to-low processing)
 */
export function resequenceTransactions(
  transactions: Transaction[],
  method: 'chronological' | 'high-to-low' | 'low-to-high'
): Transaction[] {
  const sorted = [...transactions];

  switch (method) {
    case 'high-to-low':
      // Group by date, then sort debits high-to-low, credits last
      return sorted.sort((a, b) => {
        const dateCompare = a.date.getTime() - b.date.getTime();
        if (dateCompare !== 0) return dateCompare;

        // Credits come last
        if (a.type !== b.type) {
          return a.type === 'credit' ? 1 : -1;
        }

        // For debits, sort high to low
        if (a.type === 'debit') {
          return b.amount - a.amount;
        }

        return 0;
      });

    case 'low-to-high':
      // Group by date, then sort debits low-to-high, credits first
      return sorted.sort((a, b) => {
        const dateCompare = a.date.getTime() - b.date.getTime();
        if (dateCompare !== 0) return dateCompare;

        // Credits come first
        if (a.type !== b.type) {
          return a.type === 'credit' ? -1 : 1;
        }

        // For debits, sort low to high
        if (a.type === 'debit') {
          return a.amount - b.amount;
        }

        return 0;
      });

    case 'chronological':
    default:
      return sorted.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}

/**
 * Calculate total fees from a statement
 */
export function calculateFeesSummary(transactions: Transaction[]): FeesSummary {
  const fees = transactions.filter((t) => t.category === 'fee');

  const summary: FeesSummary = {
    total: 0,
    byType: {
      overdraft: 0,
      maintenance: 0,
      atm: 0,
      foreign: 0,
      nsf: 0,
      other: 0,
    },
    count: fees.length,
  };

  for (const fee of fees) {
    const amount = Math.abs(fee.amount);
    summary.total += amount;

    if (fee.feeType && fee.feeType in summary.byType) {
      summary.byType[fee.feeType] += amount;
    } else {
      summary.byType.other += amount;
    }
  }

  return summary;
}

/**
 * Generate a statement from transactions
 */
export function generateStatement(
  transactions: Transaction[],
  startingBalance: number,
  accountInfo?: {
    accountNumber?: string;
    accountType?: 'checking' | 'savings';
    period?: { start: Date; end: Date };
  }
): Statement {
  const processedTransactions = calculateRunningBalance(
    transactions,
    startingBalance
  );
  const fees = calculateFeesSummary(processedTransactions);
  const currentBalance =
    processedTransactions.length > 0
      ? processedTransactions[processedTransactions.length - 1].balance ||
        startingBalance
      : startingBalance;

  return {
    transactions: processedTransactions,
    startingBalance,
    currentBalance,
    fees,
    ...accountInfo,
  };
}
