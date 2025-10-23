/**
 * Fee Grid Component
 * Responsive grid layout for displaying banking fees
 * Features:
 * - Mobile-first responsive grid
 * - Interactive fee cards with tap/click
 * - Purple theme with hover animations
 * - Category-based organization
 * - Touch-friendly 44px+ targets
 */

'use client';

import React, { useState } from 'react';
import { cn } from '../utils/classNames';

export interface FeeItem {
  id: string;
  name: string;
  amount: string;
  description: string;
  category?: 'account' | 'transaction' | 'overdraft' | 'service';
  isAvoidable?: boolean;
  frequency?: string;
  isCommon?: boolean;
}

export interface FeeGridProps {
  fees: FeeItem[];
  title?: string;
  subtitle?: string;
  onFeeSelect?: (fee: FeeItem) => void;
  selectedFeeId?: string;
  showCategories?: boolean;
  gridCols?: 1 | 2 | 3 | 4;
  onComplete?: (selectedFees: FeeItem[]) => void;
  multiSelect?: boolean;
  className?: string;
}

export function FeeGrid({
  fees,
  title = "Banking Fees",
  subtitle,
  onFeeSelect,
  selectedFeeId,
  showCategories = true,
  gridCols = 2,
  onComplete,
  multiSelect = false,
  className
}: FeeGridProps) {
  const [selectedFees, setSelectedFees] = useState<Set<string>>(new Set());

  const handleFeeClick = (fee: FeeItem) => {
    if (multiSelect) {
      const newSelected = new Set(selectedFees);
      if (newSelected.has(fee.id)) {
        newSelected.delete(fee.id);
      } else {
        newSelected.add(fee.id);
      }
      setSelectedFees(newSelected);

      const selectedFeeItems = fees.filter(f => newSelected.has(f.id));
      onComplete?.(selectedFeeItems);
    } else {
      onFeeSelect?.(fee);
    }
  };

  const groupedFees = showCategories
    ? fees.reduce((groups, fee) => {
        const category = fee.category || 'service';
        if (!groups[category]) groups[category] = [];
        groups[category].push(fee);
        return groups;
      }, {} as Record<string, FeeItem[]>)
    : { all: fees };

  const categoryLabels = {
    account: 'Account Maintenance',
    transaction: 'Transaction Fees',
    overdraft: 'Overdraft & NSF',
    service: 'Other Services'
  };

  const categoryColors = {
    account: 'border-blue-200 bg-blue-50',
    transaction: 'border-green-200 bg-green-50',
    overdraft: 'border-red-200 bg-red-50',
    service: 'border-purple-200 bg-purple-50'
  };

  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const renderFeeCard = (fee: FeeItem) => {
    const isSelected = multiSelect
      ? selectedFees.has(fee.id)
      : selectedFeeId === fee.id;

    return (
      <button
        key={fee.id}
        onClick={() => handleFeeClick(fee)}
        className={cn(
          "p-4 rounded-lg border-2 text-left transition-all duration-200",
          "min-h-[120px] w-full flex flex-col justify-between",
          "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2E1E72] focus:ring-offset-2",
          isSelected
            ? "border-[#2E1E72] bg-[#E5DEEF] shadow-sm"
            : "border-gray-200 bg-white hover:border-[#8577B7] hover:bg-gray-50"
        )}
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className={cn(
              "font-semibold text-sm leading-tight font-red-hat",
              isSelected ? "text-[#2E1E72]" : "text-gray-900"
            )}>
              {fee.name}
            </h3>

            {fee.isCommon && (
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                Common
              </span>
            )}
          </div>

          <div className={cn(
            "text-lg font-bold",
            isSelected ? "text-[#2E1E72]" : "text-gray-900"
          )}>
            {fee.amount}
          </div>

          {fee.frequency && (
            <div className="text-xs text-gray-600">
              {fee.frequency}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {fee.description}
          </p>

          {/* Avoidability indicator */}
          {fee.isAvoidable !== undefined && (
            <div className="flex items-center space-x-1">
              <div className="text-xs">
                {fee.isAvoidable ? '✅' : '⚠️'}
              </div>
              <span className="text-xs text-gray-600">
                {fee.isAvoidable ? 'Avoidable' : 'Hard to avoid'}
              </span>
            </div>
          )}
        </div>

        {/* Selection indicator for multi-select */}
        {multiSelect && (
          <div className="flex justify-end mt-2">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
              isSelected
                ? "bg-[#2E1E72] border-[#2E1E72]"
                : "border-gray-300"
            )}>
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#2E1E72] font-red-hat">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Multi-select progress */}
        {multiSelect && selectedFees.size > 0 && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <span>{selectedFees.size} selected</span>
            <div className="w-16 h-1 bg-[#E5DEEF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E1E72] transition-all duration-300"
                style={{ width: `${Math.min((selectedFees.size / fees.length) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fee Grid */}
      <div className="space-y-8">
        {Object.entries(groupedFees).map(([category, categoryFees]) => (
          <div key={category} className="space-y-4">
            {/* Category Header */}
            {showCategories && category !== 'all' && (
              <div className={cn(
                "p-3 rounded-lg border",
                categoryColors[category as keyof typeof categoryColors] || 'border-gray-200 bg-gray-50'
              )}>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {categoryFees.length} {categoryFees.length === 1 ? 'fee' : 'fees'}
                </p>
              </div>
            )}

            {/* Grid */}
            <div className={cn(
              "grid gap-3",
              gridColsClasses[gridCols]
            )}>
              {categoryFees.map(renderFeeCard)}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {fees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No fees found</h3>
          <p className="text-gray-600">Check back later for fee information.</p>
        </div>
      )}
    </div>
  );
}