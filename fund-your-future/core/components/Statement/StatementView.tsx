/**
 * Statement View Component
 * Displays banking transactions with running balance and fee highlighting
 */

'use client';

import { useState, useMemo } from 'react';
import type { Statement, Transaction } from '@/core/types';
import { TransactionRow } from './TransactionRow';
import { BalanceDisplay } from './BalanceDisplay';

interface StatementViewProps {
  statement: Statement;
  onTransactionClick?: (transaction: Transaction) => void;
  highlightFees?: boolean;
  showRunningBalance?: boolean;
}

export function StatementView({
  statement,
  onTransactionClick,
  highlightFees = true,
  showRunningBalance = true,
}: StatementViewProps) {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [filter, setFilter] = useState<
    'all' | 'fees' | 'purchases' | 'deposits'
  >('all');

  // Filter transactions based on selected filter
  const filteredTransactions = useMemo(() => {
    switch (filter) {
      case 'fees':
        return statement.transactions.filter((t) => t.category === 'fee');
      case 'purchases':
        return statement.transactions.filter(
          (t) => t.type === 'debit' && t.category !== 'fee'
        );
      case 'deposits':
        return statement.transactions.filter((t) => t.type === 'credit');
      default:
        return statement.transactions;
    }
  }, [statement.transactions, filter]);

  // Calculate totals
  const totals = useMemo(() => {
    const fees = statement.transactions
      .filter((t) => t.category === 'fee')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const deposits = statement.transactions
      .filter((t) => t.type === 'credit')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const purchases = statement.transactions
      .filter((t) => t.type === 'debit' && t.category !== 'fee')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { fees, deposits, purchases };
  }, [statement.transactions]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransactionId(
      transaction.id === selectedTransactionId ? null : transaction.id
    );
    onTransactionClick?.(transaction);
  };

  return (
    <div className="space-y-4">
      {/* Balance Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <BalanceDisplay
          label="Starting Balance"
          amount={statement.startingBalance}
          variant="neutral"
        />
        <BalanceDisplay
          label="Current Balance"
          amount={statement.currentBalance}
          variant={statement.currentBalance >= 0 ? 'positive' : 'negative'}
        />
        <BalanceDisplay
          label="Total Fees"
          amount={-totals.fees}
          variant="negative"
          highlight={highlightFees}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({statement.transactions.length})
        </button>
        <button
          onClick={() => setFilter('fees')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'fees'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Fees ({statement.fees.count})
        </button>
        <button
          onClick={() => setFilter('purchases')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'purchases'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Purchases
        </button>
        <button
          onClick={() => setFilter('deposits')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'deposits'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Deposits
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                Amount
              </th>
              {showRunningBalance && (
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  Balance
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={showRunningBalance ? 4 : 3}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  isSelected={transaction.id === selectedTransactionId}
                  highlightFees={highlightFees}
                  showBalance={showRunningBalance}
                  onClick={() => handleTransactionClick(transaction)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Fee Summary */}
      {statement.fees.count > 0 && (
        <div className="rounded-lg bg-red-50 p-4">
          <h4 className="mb-2 font-semibold text-red-900">Fee Breakdown</h4>
          <div className="space-y-1 text-sm">
            {statement.fees.byType.overdraft > 0 && (
              <div className="flex justify-between">
                <span className="text-red-700">Overdraft Fees:</span>
                <span className="font-medium text-red-900">
                  ${statement.fees.byType.overdraft.toFixed(2)}
                </span>
              </div>
            )}
            {statement.fees.byType.maintenance > 0 && (
              <div className="flex justify-between">
                <span className="text-red-700">Maintenance Fees:</span>
                <span className="font-medium text-red-900">
                  ${statement.fees.byType.maintenance.toFixed(2)}
                </span>
              </div>
            )}
            {statement.fees.byType.atm > 0 && (
              <div className="flex justify-between">
                <span className="text-red-700">ATM Fees:</span>
                <span className="font-medium text-red-900">
                  ${statement.fees.byType.atm.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t pt-1">
              <span className="font-medium text-red-800">Total Fees:</span>
              <span className="font-bold text-red-900">
                ${statement.fees.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
