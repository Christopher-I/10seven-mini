/**
 * Interactive Elements for Unit 1
 * Reusable components for hover tooltips and interactive content
 */

'use client';

import { useState } from 'react';

// Hover tooltip for definitions
export function DefinitionTooltip({
  term,
  definition,
  children
}: {
  term: string;
  definition: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="cursor-help underline decoration-dashed underline-offset-2 text-gray-800 hover:text-gray-900"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)} // For mobile
      >
        {children}
      </span>
      {isVisible && (
        <div className="absolute z-10 bottom-full left-0 right-0 mx-auto mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg w-72 max-w-[calc(100vw-2rem)] sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-80 md:w-96">
          <div className="font-semibold mb-1">{term}</div>
          <div className="text-gray-200 leading-relaxed">{definition}</div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

// Stats callout box
export function StatsCallout({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <h4 className="text-gray-900 font-bold text-lg">{title}</h4>
      </div>
      <div className="text-sm text-gray-900 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// Big 4 banks display
export function BigFourBanks() {
  const banks = [
    { name: 'JP Morgan Chase', amount: '$58.5B' },
    { name: 'Bank of America', amount: '$27.1B' },
    { name: 'Wells Fargo', amount: '$19.7B' },
    { name: 'CitiGroup', amount: '$12.7B' }
  ];

  return (
    <div className="bg-white border rounded-lg p-4">
      <h5 className="font-semibold text-gray-900 mb-3">The "Big 4" Bank Profits (2024)</h5>
      <div className="space-y-2">
        {banks.map((bank) => (
          <div key={bank.name} className="flex justify-between items-center text-sm text-gray-900">
            <span className="text-gray-700">• <strong>{bank.name}:</strong></span>
            <span className="font-medium text-gray-900">{bank.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Their profits continue to increase while consumer confidence remains low amid concerns about inflation and the job market.
        </p>
      </div>
    </div>
  );
}