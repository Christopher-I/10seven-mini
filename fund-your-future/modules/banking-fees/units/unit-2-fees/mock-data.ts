/**
 * Mock data generator for Unit 2 demonstrations
 */

import type { Transaction, Statement } from '@/core/types';
import { generateStatement } from '@/core/services/banking';

/**
 * Generate realistic mock transactions for the statement view
 */
export function generateMockTransactions(): Statement {
  const today = new Date();
  const transactions: Transaction[] = [];

  // Start 30 days ago
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 30);

  // Initial deposit
  transactions.push({
    id: 'txn-001',
    date: new Date(startDate),
    description: 'Direct Deposit - Paycheck',
    amount: 2500.0,
    type: 'credit',
    category: 'deposit',
  });

  // Add various transactions throughout the month

  // Day 3: Small purchases
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 2);

  transactions.push({
    id: 'txn-002',
    date: new Date(currentDate),
    description: 'Coffee Shop',
    amount: 5.75,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-003',
    date: new Date(currentDate),
    description: 'Lunch Restaurant',
    amount: 15.5,
    type: 'debit',
    category: 'purchase',
  });

  // Day 5: Grocery shopping
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-004',
    date: new Date(currentDate),
    description: 'Grocery Store',
    amount: 127.83,
    type: 'debit',
    category: 'purchase',
  });

  // Day 8: ATM withdrawal with fee
  currentDate.setDate(currentDate.getDate() + 3);
  transactions.push({
    id: 'txn-005',
    date: new Date(currentDate),
    description: 'ATM Withdrawal - Out of Network',
    amount: 200.0,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-006',
    date: new Date(currentDate),
    description: 'ATM Fee - Out of Network',
    amount: 3.5,
    type: 'debit',
    category: 'fee',
    feeType: 'atm',
  });

  // Day 10: Large purchase
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-007',
    date: new Date(currentDate),
    description: 'Electronics Store',
    amount: 599.99,
    type: 'debit',
    category: 'purchase',
  });

  // Day 12: Another deposit
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-008',
    date: new Date(currentDate),
    description: 'Transfer from Savings',
    amount: 500.0,
    type: 'credit',
    category: 'deposit',
  });

  // Day 15: Monthly subscription
  currentDate.setDate(currentDate.getDate() + 3);
  transactions.push({
    id: 'txn-009',
    date: new Date(currentDate),
    description: 'Streaming Service Monthly',
    amount: 14.99,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-010',
    date: new Date(currentDate),
    description: 'Gym Membership',
    amount: 49.99,
    type: 'debit',
    category: 'purchase',
  });

  // Day 18: More shopping
  currentDate.setDate(currentDate.getDate() + 3);
  transactions.push({
    id: 'txn-011',
    date: new Date(currentDate),
    description: 'Clothing Store',
    amount: 89.5,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-012',
    date: new Date(currentDate),
    description: 'Pharmacy',
    amount: 23.45,
    type: 'debit',
    category: 'purchase',
  });

  // Day 20: Rent payment (large debit)
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-013',
    date: new Date(currentDate),
    description: 'Rent Payment',
    amount: 1200.0,
    type: 'debit',
    category: 'purchase',
  });

  // Day 22: Multiple small transactions that might trigger overdraft
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-014',
    date: new Date(currentDate),
    description: 'Gas Station',
    amount: 45.0,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-015',
    date: new Date(currentDate),
    description: 'Fast Food',
    amount: 12.3,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-016',
    date: new Date(currentDate),
    description: 'Convenience Store',
    amount: 8.75,
    type: 'debit',
    category: 'purchase',
  });

  // Day 24: Overdraft scenario
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-017',
    date: new Date(currentDate),
    description: 'Online Shopping',
    amount: 125.0,
    type: 'debit',
    category: 'purchase',
  });

  // This will trigger overdraft
  transactions.push({
    id: 'txn-018',
    date: new Date(currentDate),
    description: 'Restaurant - Dinner',
    amount: 67.5,
    type: 'debit',
    category: 'purchase',
  });

  // Overdraft fee
  transactions.push({
    id: 'txn-019',
    date: new Date(currentDate),
    description: 'Overdraft Fee',
    amount: 35.0,
    type: 'debit',
    category: 'fee',
    feeType: 'overdraft',
  });

  // Day 25: Small deposit to cover overdraft
  currentDate.setDate(currentDate.getDate() + 1);
  transactions.push({
    id: 'txn-020',
    date: new Date(currentDate),
    description: 'Mobile Deposit',
    amount: 100.0,
    type: 'credit',
    category: 'deposit',
  });

  // Day 27: More normal transactions
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-021',
    date: new Date(currentDate),
    description: 'Grocery Store',
    amount: 78.25,
    type: 'debit',
    category: 'purchase',
  });

  // Day 28: Monthly maintenance fee
  currentDate.setDate(currentDate.getDate() + 1);
  transactions.push({
    id: 'txn-022',
    date: new Date(currentDate),
    description: 'Monthly Maintenance Fee',
    amount: 12.0,
    type: 'debit',
    category: 'fee',
    feeType: 'maintenance',
  });

  // Day 30: Final transactions
  currentDate.setDate(currentDate.getDate() + 2);
  transactions.push({
    id: 'txn-023',
    date: new Date(currentDate),
    description: 'Coffee Shop',
    amount: 4.5,
    type: 'debit',
    category: 'purchase',
  });

  transactions.push({
    id: 'txn-024',
    date: new Date(currentDate),
    description: 'Bookstore',
    amount: 32.99,
    type: 'debit',
    category: 'purchase',
  });

  // Generate the statement with calculated balances
  const startingBalance = 500.0; // Starting with $500
  const statement = generateStatement(transactions, startingBalance, {
    accountNumber: '****1234',
    accountType: 'checking',
    period: {
      start: startDate,
      end: today,
    },
  });

  return statement;
}

/**
 * Generate a scenario for the resequencing demo
 */
export function generateResequencingScenario(): {
  chronological: Statement;
  highToLow: Statement;
  lowToHigh: Statement;
} {
  const startingBalance = 100.0; // Low balance to trigger fees
  const date = new Date();

  // Create transactions that will trigger different fees based on order
  const baseTransactions: Transaction[] = [
    {
      id: 'reseq-001',
      date: date,
      description: 'Morning Coffee',
      amount: 5.0,
      type: 'debit',
      category: 'purchase',
    },
    {
      id: 'reseq-002',
      date: date,
      description: 'Lunch',
      amount: 15.0,
      type: 'debit',
      category: 'purchase',
    },
    {
      id: 'reseq-003',
      date: date,
      description: 'Gas',
      amount: 40.0,
      type: 'debit',
      category: 'purchase',
    },
    {
      id: 'reseq-004',
      date: date,
      description: 'Groceries',
      amount: 60.0,
      type: 'debit',
      category: 'purchase',
    },
    {
      id: 'reseq-005',
      date: date,
      description: 'Direct Deposit',
      amount: 50.0,
      type: 'credit',
      category: 'deposit',
    },
  ];

  // Process in different orders
  const chronological = generateStatement(baseTransactions, startingBalance, {
    accountType: 'checking',
  });

  // High-to-low: Larger debits first (banks often do this)
  const highToLowTransactions = [...baseTransactions].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'credit' ? 1 : -1;
    if (a.type === 'debit') return b.amount - a.amount;
    return 0;
  });

  const highToLow = generateStatement(highToLowTransactions, startingBalance, {
    accountType: 'checking',
  });

  // Low-to-high: Smaller debits first (customer-friendly)
  const lowToHighTransactions = [...baseTransactions].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'credit' ? -1 : 1;
    if (a.type === 'debit') return a.amount - b.amount;
    return 0;
  });

  const lowToHigh = generateStatement(lowToHighTransactions, startingBalance, {
    accountType: 'checking',
  });

  return {
    chronological,
    highToLow,
    lowToHigh,
  };
}
