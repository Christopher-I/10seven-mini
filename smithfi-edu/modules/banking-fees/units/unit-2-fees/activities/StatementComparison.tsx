/**
 * Statement Comparison Component
 * Shows the difference between actual transaction order and bank's resequenced order
 */

'use client';

import { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  fee?: number;
  balance: number;
  isOverdraft: boolean;
}

const YOUR_ORDER_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    description: 'ATM withdrawal',
    amount: 100,
    fee: 3.5,
    balance: 896.5,
    isOverdraft: false,
  },
  {
    id: 2,
    description: 'Utilities',
    amount: 50,
    balance: 846.5,
    isOverdraft: false,
  },
  { id: 3, description: 'Gas', amount: 50, balance: 796.5, isOverdraft: false },
  {
    id: 4,
    description: 'Internet',
    amount: 50,
    balance: 746.5,
    isOverdraft: false,
  },
  {
    id: 5,
    description: 'Phone',
    amount: 50,
    balance: 696.5,
    isOverdraft: false,
  },
  {
    id: 6,
    description: 'Rent',
    amount: 500,
    balance: 196.5,
    isOverdraft: false,
  },
  {
    id: 7,
    description: 'Credit card bill',
    amount: 250,
    fee: 35,
    balance: -88.5,
    isOverdraft: true,
  },
  {
    id: 8,
    description: 'Dinner with friends',
    amount: 50,
    fee: 35,
    balance: -173.5,
    isOverdraft: true,
  },
];

const BANK_ORDER_TRANSACTIONS: Transaction[] = [
  { id: 1, description: 'Rent', amount: 500, balance: 500, isOverdraft: false },
  {
    id: 2,
    description: 'Credit card bill',
    amount: 250,
    balance: 250,
    isOverdraft: false,
  },
  {
    id: 3,
    description: 'ATM withdrawal',
    amount: 100,
    fee: 3.5,
    balance: 146.5,
    isOverdraft: false,
  },
  {
    id: 4,
    description: 'Utilities',
    amount: 50,
    balance: 96.5,
    isOverdraft: false,
  },
  { id: 5, description: 'Gas', amount: 50, balance: 46.5, isOverdraft: false },
  {
    id: 6,
    description: 'Internet',
    amount: 50,
    fee: 35,
    balance: -38.5,
    isOverdraft: true,
  },
  {
    id: 7,
    description: 'Phone',
    amount: 50,
    fee: 35,
    balance: -123.5,
    isOverdraft: true,
  },
  {
    id: 8,
    description: 'Dinner with friends',
    amount: 50,
    fee: 35,
    balance: -208.5,
    isOverdraft: true,
  },
];

export function StatementComparison() {
  const [activeView, setActiveView] = useState<'your' | 'bank'>('your');

  const activeTransactions =
    activeView === 'your' ? YOUR_ORDER_TRANSACTIONS : BANK_ORDER_TRANSACTIONS;
  const yourOrderFees = YOUR_ORDER_TRANSACTIONS.reduce(
    (sum, t) => sum + (t.fee || 0),
    0
  );
  const bankOrderFees = BANK_ORDER_TRANSACTIONS.reduce(
    (sum, t) => sum + (t.fee || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header with explanation */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <h3 className="mb-3 text-xl font-bold text-purple-900">
          Review: Wait, something else happened on your statement!
        </h3>
        <p className="text-purple-800">
          Did you notice that the order of transactions was rearranged? That's
          not the order you paid for things! This is called{' '}
          <strong>Debit Resequencing</strong>.
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveView('your')}
          className={`flex-1 rounded-md px-4 py-3 font-medium transition-all ${
            activeView === 'your'
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-800 hover:text-gray-900'
          }`}
        >
          📝 Your Order
        </button>
        <button
          onClick={() => setActiveView('bank')}
          className={`flex-1 rounded-md px-4 py-3 font-medium transition-all ${
            activeView === 'bank'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-gray-800 hover:text-gray-900'
          }`}
        >
          🏦 Bank's Order
        </button>
      </div>

      {/* Statement view */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <div
          className={`px-6 py-4 ${activeView === 'your' ? 'border-gray-300 bg-gray-50' : 'border-red-200 bg-red-50'} border-b`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-gray-900">
              {activeView === 'your'
                ? '📝 The Order You Actually Paid'
                : "🏦 Bank's Resequenced Order"}
            </h4>
            <div className="text-right">
              <div className="text-sm text-gray-800">Starting Balance</div>
              <div className="text-lg font-bold text-purple-700">$1,000.00</div>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {activeTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between px-6 py-4 ${
                transaction.isOverdraft ? 'bg-red-50' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm text-gray-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium text-gray-900">
                    {transaction.description}
                  </span>
                  {transaction.isOverdraft && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                      OVERDRAFT
                    </span>
                  )}
                </div>
                {transaction.fee && (
                  <div className="ml-8 mt-1 text-sm text-red-600">
                    + ${transaction.fee} overdraft fee
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="font-semibold text-red-600">
                  -${transaction.amount + (transaction.fee || 0)}
                </div>
                <div
                  className={`text-sm ${transaction.balance < 0 ? 'font-semibold text-red-600' : 'text-gray-800'}`}
                >
                  Balance: ${transaction.balance}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className={`px-6 py-4 ${activeView === 'your' ? 'bg-gray-50' : 'bg-red-50'} border-t`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">
                Total Overdraft Fees:
                <span
                  className={`ml-2 ${activeView === 'your' ? 'text-gray-800' : 'text-red-600'}`}
                >
                  ${activeView === 'your' ? yourOrderFees : bankOrderFees}
                </span>
              </div>
              <div className="text-sm text-gray-800">
                {activeView === 'your'
                  ? 'You would have gotten charged TWO overdraft fees'
                  : 'You got charged THREE overdraft fees'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">Final Balance:</div>
              <div
                className={`text-lg font-bold ${
                  activeView === 'your' ? 'text-gray-800' : 'text-red-600'
                }`}
              >
                $
                {activeView === 'your'
                  ? YOUR_ORDER_TRANSACTIONS[7].balance
                  : BANK_ORDER_TRANSACTIONS[7].balance}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact explanation */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h4 className="mb-3 text-lg font-bold text-red-900">
          Cost Impact: The Impact of Debit Resequencing
        </h4>
        <div className="space-y-2 text-red-800">
          <p>
            <strong>Your order:</strong> 2 overdraft fees = ${yourOrderFees}
          </p>
          <p>
            <strong>Bank's order:</strong> 3 overdraft fees = ${bankOrderFees}
          </p>
          <p className="font-semibold">
            <strong>Extra cost to you:</strong> ${bankOrderFees - yourOrderFees}
          </p>
        </div>
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="text-sm text-gray-900">
            <strong>Learning: Definition:</strong> Debit resequencing is a legal
            banking practice that involves reordering your transactions, taking
            the largest transaction first. This causes your account balance to
            fall faster, boosting potential overdraft fees.
          </p>
        </div>
      </div>
    </div>
  );
}
