/**
 * Transaction Row Component
 * Individual row in the statement table
 */

'use client';

import type { Transaction } from '@/core/types';

interface TransactionRowProps {
  transaction: Transaction;
  isSelected: boolean;
  highlightFees: boolean;
  showBalance: boolean;
  onClick: () => void;
}

export function TransactionRow({
  transaction,
  isSelected,
  highlightFees,
  showBalance,
  onClick,
}: TransactionRowProps) {
  const isFee = transaction.category === 'fee';
  const isDebit = transaction.type === 'debit';

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format amount with color
  const getAmountColor = () => {
    if (isFee) return 'text-red-600 font-semibold';
    if (isDebit) return 'text-gray-900';
    return 'text-green-600';
  };

  // Get row background
  const getRowBackground = () => {
    if (isSelected) return 'bg-blue-50';
    if (isFee && highlightFees) return 'bg-red-50 hover:bg-red-100';
    return 'hover:bg-gray-50';
  };

  // Get balance color
  const getBalanceColor = () => {
    if (!transaction.balance) return 'text-gray-900';
    return transaction.balance < 0
      ? 'text-red-600 font-semibold'
      : 'text-gray-900';
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer transition-colors ${getRowBackground()}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
        {formatDate(transaction.date)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {transaction.description}
            </div>
            {isFee && (
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                  {transaction.feeType?.toUpperCase() || 'FEE'}
                </span>
              </div>
            )}
            {transaction.category === 'purchase' && (
              <span className="text-xs text-gray-500">Purchase</span>
            )}
            {transaction.category === 'deposit' && (
              <span className="text-xs text-gray-500">Deposit</span>
            )}
          </div>
          {isFee && highlightFees && (
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
      </td>
      <td
        className={`px-4 py-3 text-right text-sm whitespace-nowrap ${getAmountColor()}`}
      >
        {isDebit ? '-' : '+'}
        {formatCurrency(transaction.amount)}
      </td>
      {showBalance && (
        <td
          className={`px-4 py-3 text-right text-sm whitespace-nowrap ${getBalanceColor()}`}
        >
          {transaction.balance !== undefined
            ? formatCurrency(transaction.balance)
            : '-'}
        </td>
      )}
    </tr>
  );
}
