/**
 * Bank Statement Display
 * Shows the statement after whack-a-mole game as a subpage
 * According to documentation, this is "[New Subpage]: You see the statement"
 */

'use client';

import React, { useState } from 'react';

interface StatementTransaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'debit' | 'credit' | 'fee';
  feeNote?: string;
}

interface BankStatementProps {
  onContinue?: () => void;
}

export function BankStatement({ onContinue }: BankStatementProps) {
  const [hoveredFee, setHoveredFee] = useState<number | null>(null);

  // Fee definitions with citations
  const atmFeeNote = "This is the average ATM fee in the United States as of 2025 (Bennet, 2025). You had to withdraw from an out-of-network ATM in a pinch, and your bank charges a fee for that.";
  const overdraftFeeNote1 = "This is the average overdraft fee in the United States as of 2025 (Bennet, 2025). Your account balance dropped below $0, so you were charged an overdraft fee.";
  const overdraftFeeNote2 = "This is the average overdraft fee in the United States as of 2025 (Bennet, 2025). Your account balance remained below $0, so you were charged another overdraft fee when you paid your next bill.";
  const overdraftFeeNote3 = "This is the average overdraft fee in the United States as of 2025 (Bennet, 2025). Your account balance remained below $0, so you were charged another overdraft fee when you paid your share of dinner.";

  // Exact transactions from source document - largest to smallest (debit resequencing)
  const transactions: StatementTransaction[] = [
    { date: 'Thu', description: 'Starting Balance', amount: 1000, balance: 1000, type: 'credit' },
    { date: 'Thu', description: 'Rent', amount: -500, balance: 500, type: 'debit' },
    { date: 'Fri', description: 'Credit card bill', amount: -250, balance: 250, type: 'debit' },
    { date: 'Thu', description: 'Out-of-network ATM withdrawal', amount: -100, balance: 150, type: 'debit' },
    { date: 'Thu', description: 'Out-of-network ATM Fee', amount: -5.46, balance: 144.54, type: 'fee', feeNote: atmFeeNote },
    { date: 'Thu', description: 'Utilities bill', amount: -50, balance: 94.54, type: 'debit' },
    { date: 'Thu', description: 'Gas fill-up', amount: -50, balance: 44.54, type: 'debit' },
    { date: 'Thu', description: 'Internet bill', amount: -50, balance: -5.46, type: 'debit' },
    { date: 'Thu', description: 'Overdraft fee', amount: -26.77, balance: -32.23, type: 'fee', feeNote: overdraftFeeNote1 },
    { date: 'Thu', description: 'Phone bill', amount: -50, balance: -82.23, type: 'debit' },
    { date: 'Thu', description: 'Overdraft fee', amount: -26.77, balance: -109, type: 'fee', feeNote: overdraftFeeNote2 },
    { date: 'Fri', description: 'Dinner with friends', amount: -50, balance: -159, type: 'debit' },
    { date: 'Fri', description: 'Overdraft fee', amount: -26.77, balance: -185.77, type: 'fee', feeNote: overdraftFeeNote3 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Intro Heading */}
      <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6 text-center">
        Here's your latest statement!
      </h2>

      {/* Bank Header */}
      <div className="bg-[#2E1E72] text-white p-4 rounded-t-lg">
        <h3 className="text-xl font-bold">Your Bank Statement</h3>
        <p className="text-sm opacity-90 mt-1">Thursday - Friday</p>
      </div>

      {/* Statement Table */}
      <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={
                    transaction.type === 'fee' ? 'bg-red-50' :
                    transaction.balance < 0 ? 'bg-orange-50' : ''
                  }
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 relative">
                    {transaction.description}
                    {transaction.type === 'fee' && (
                      <>
                        <span
                          className="ml-2 text-xs text-red-600 font-semibold cursor-help"
                          onMouseEnter={() => setHoveredFee(index)}
                          onMouseLeave={() => setHoveredFee(null)}
                        >
                          FEE *
                        </span>
                        {hoveredFee === index && transaction.feeNote && (
                          <div className="absolute z-10 w-80 p-3 mt-2 bg-white border-2 border-[#2E1E72] rounded-lg shadow-xl left-0 top-full">
                            <p className="text-xs text-gray-900">{transaction.feeNote}</p>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className={`px-4 py-2 text-sm text-right font-medium ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className={`px-4 py-2 text-sm text-right font-bold ${
                    transaction.balance < 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    ${transaction.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Fees:</span>
              <span className="font-semibold text-red-600">-$85.77</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t">
              <span className="text-gray-900">Available Balance:</span>
              <span className="text-red-600">-$185.77</span>
            </div>
          </div>
        </div>

        {/* Fee Note */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="text-red-600 font-semibold">* Hover over fees</span> to see explanations and sources
          </p>
        </div>
      </div>

      {/* Continue Button - only show if onContinue is provided */}
      {onContinue && (
        <div className="mt-6 text-center">
          <button
            onClick={onContinue}
            className="bg-[#2E1E72] hover:bg-[#3B2A8F] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}