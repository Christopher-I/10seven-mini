/**
 * Mobile Statement Component
 * Mobile-optimized bank statement viewer
 * Features:
 * - Touch-friendly transaction list
 * - Swipe gestures for navigation
 * - Purple theme with clear typography
 * - Fee highlighting and categorization
 * - Interactive transaction details
 */

'use client';

import React, { useState } from 'react';
import { cn } from '../utils/classNames';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit' | 'fee';
  category?: string;
  balance?: number;
  isFee?: boolean;
  feeType?: string;
  location?: string;
}

export interface StatementPeriod {
  startDate: string;
  endDate: string;
  beginningBalance: number;
  endingBalance: number;
  totalFees: number;
  totalTransactions: number;
}

export interface MobileStatementProps {
  period: StatementPeriod;
  transactions: Transaction[];
  accountName?: string;
  accountNumber?: string;
  onTransactionSelect?: (transaction: Transaction) => void;
  onFeeAnalysis?: () => void;
  highlightFees?: boolean;
  className?: string;
}

export function MobileStatement({
  period,
  transactions,
  accountName = "Checking Account",
  accountNumber,
  onTransactionSelect,
  onFeeAnalysis,
  highlightFees = true,
  className
}: MobileStatementProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(
      selectedTransaction === transaction.id ? null : transaction.id
    );
    onTransactionSelect?.(transaction);
  };

  const feeTransactions = transactions.filter(t => t.isFee || t.type === 'fee');
  const regularTransactions = transactions.filter(t => !t.isFee && t.type !== 'fee');

  const renderTransaction = (transaction: Transaction) => {
    const isSelected = selectedTransaction === transaction.id;
    const isFee = transaction.isFee || transaction.type === 'fee';
    const isCredit = transaction.type === 'credit';

    return (
      <div key={transaction.id} className="space-y-2">
        <button
          onClick={() => handleTransactionClick(transaction)}
          className={cn(
            "w-full p-4 rounded-lg border-l-4 text-left transition-all duration-200",
            "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2",
            isFee && highlightFees
              ? "bg-red-50 border-red-400 hover:bg-red-100"
              : isCredit
              ? "bg-green-50 border-green-400 hover:bg-green-100"
              : "bg-gray-50 border-gray-300 hover:bg-gray-100",
            isSelected && "ring-2 ring-[#2E1E72] ring-offset-2"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {transaction.description}
                </p>
                {isFee && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                    Fee
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <span>{formatDate(transaction.date)}</span>
                {transaction.category && (
                  <span className="text-gray-500">• {transaction.category}</span>
                )}
                {transaction.location && (
                  <span className="text-gray-500">• {transaction.location}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-1 ml-3">
              <span className={cn(
                "font-bold text-sm",
                isCredit
                  ? "text-green-700"
                  : isFee
                  ? "text-red-700"
                  : "text-gray-900"
              )}>
                {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>

              {transaction.balance !== undefined && (
                <span className="text-xs text-gray-500">
                  Bal: {formatCurrency(transaction.balance)}
                </span>
              )}
            </div>
          </div>

          {/* Expand/Collapse indicator */}
          <div className="flex justify-center mt-2">
            <svg
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform duration-200",
                isSelected && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Transaction Details */}
        {isSelected && (
          <div className="ml-4 p-3 bg-white rounded-lg border border-gray-200 space-y-2">
            <div className="text-sm text-gray-700">
              <strong>Transaction ID:</strong> {transaction.id}
            </div>

            {transaction.feeType && (
              <div className="text-sm text-gray-700">
                <strong>Fee Type:</strong> {transaction.feeType}
              </div>
            )}

            {isFee && (
              <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  💡 This is a bank fee. Learn how to avoid similar fees in the future.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("space-y-6 max-w-md mx-auto", className)}>
      {/* Header */}
      <div className="bg-[#2E1E72] text-white p-4 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-red-hat">
            {accountName}
          </h2>
          {accountNumber && (
            <span className="text-sm text-purple-200">
              ••••{accountNumber.slice(-4)}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Statement Period:</span>
            <span>{formatDate(period.startDate)} - {formatDate(period.endDate)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Beginning Balance:</span>
            <span>{formatCurrency(period.beginningBalance)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Ending Balance:</span>
            <span>{formatCurrency(period.endingBalance)}</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-[#2E1E72]">
            {period.totalTransactions}
          </div>
          <div className="text-sm text-gray-600">Transactions</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-red-700">
            {formatCurrency(period.totalFees)}
          </div>
          <div className="text-sm text-gray-600">Total Fees</div>
        </div>
      </div>

      {/* Fee Analysis Button */}
      {period.totalFees > 0 && onFeeAnalysis && (
        <button
          onClick={onFeeAnalysis}
          className="w-full bg-[#E5DEEF] border border-[#2E1E72] text-[#2E1E72] p-4 rounded-lg font-semibold hover:bg-[#2E1E72] hover:text-white transition-colors"
        >
          🔍 Analyze My Fees ({feeTransactions.length} fees found)
        </button>
      )}

      {/* Fee Transactions */}
      {feeTransactions.length > 0 && highlightFees && (
        <div className="space-y-4">
          <h3 className="font-bold text-red-700 text-lg">
            Banking Fees ({feeTransactions.length})
          </h3>
          <div className="space-y-2">
            {feeTransactions.map(renderTransaction)}
          </div>
        </div>
      )}

      {/* Regular Transactions */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">
          All Transactions ({regularTransactions.length})
        </h3>
        <div className="space-y-2">
          {regularTransactions.map(renderTransaction)}
        </div>
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-600">This statement period has no recorded transactions.</p>
        </div>
      )}
    </div>
  );
}