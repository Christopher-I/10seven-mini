/**
 * Balance Display Component
 * Shows a balance amount with label and styling
 */

'use client';

interface BalanceDisplayProps {
  label: string;
  amount: number;
  variant?: 'positive' | 'negative' | 'neutral';
  highlight?: boolean;
}

export function BalanceDisplay({
  label,
  amount,
  variant = 'neutral',
  highlight = false,
}: BalanceDisplayProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Get background and text colors based on variant
  const getStyles = () => {
    const base = 'rounded-lg p-4 text-center transition-all';

    if (highlight) {
      return `${base} bg-red-100 ring-2 ring-red-500 ring-offset-2`;
    }

    switch (variant) {
      case 'positive':
        return `${base} bg-green-50 border border-green-200`;
      case 'negative':
        return `${base} bg-red-50 border border-red-200`;
      default:
        return `${base} bg-gray-50 border border-gray-200`;
    }
  };

  const getAmountColor = () => {
    switch (variant) {
      case 'positive':
        return 'text-green-700';
      case 'negative':
        return 'text-red-700';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={getStyles()}>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${getAmountColor()}`}>
        {formatCurrency(amount)}
      </div>
      {highlight && (
        <div className="mt-2 text-xs text-red-600">
          Click to see fee details
        </div>
      )}
    </div>
  );
}
