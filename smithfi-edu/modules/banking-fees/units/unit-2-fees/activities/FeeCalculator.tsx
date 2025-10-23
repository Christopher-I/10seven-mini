/**
 * Fee Calculator & Comparison Tool
 * Interactive component for comparing bank fee structures and calculating costs
 */

'use client';

import { useState, useMemo } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';

interface BankProfile {
  name: string;
  overdraftFee: number;
  maintenanceFee: number;
  minimumBalance: number;
  atmFee: number;
  nsfFee: number;
  color: string;
}

interface UserScenario {
  monthlyTransactions: number;
  averageBalance: number;
  overdraftEvents: number;
  outOfNetworkATM: number;
  nsfEvents: number;
}

const DEFAULT_BANKS: BankProfile[] = [
  {
    name: 'Traditional Bank A',
    overdraftFee: 35,
    maintenanceFee: 12,
    minimumBalance: 500,
    atmFee: 3.5,
    nsfFee: 35,
    color: 'red',
  },
  {
    name: 'Traditional Bank B',
    overdraftFee: 30,
    maintenanceFee: 15,
    minimumBalance: 300,
    atmFee: 2.5,
    nsfFee: 30,
    color: 'blue',
  },
  {
    name: 'Credit Union',
    overdraftFee: 25,
    maintenanceFee: 5,
    minimumBalance: 100,
    atmFee: 1.0,
    nsfFee: 25,
    color: 'green',
  },
  {
    name: 'Online Bank',
    overdraftFee: 0,
    maintenanceFee: 0,
    minimumBalance: 0,
    atmFee: 0,
    nsfFee: 0,
    color: 'purple',
  },
];

const DEFAULT_SCENARIO: UserScenario = {
  monthlyTransactions: 20,
  averageBalance: 250,
  overdraftEvents: 1,
  outOfNetworkATM: 2,
  nsfEvents: 0,
};

export function FeeCalculator({
  onComplete,
}: {
  onComplete?: (data: any) => void;
}) {
  const [scenario, setScenario] = useState<UserScenario>(DEFAULT_SCENARIO);
  const [selectedBanks, setSelectedBanks] = useState<BankProfile[]>(
    DEFAULT_BANKS.slice(0, 2)
  );
  const [showResults, setShowResults] = useState(false);

  // Calculate monthly costs for each bank
  const calculations = useMemo(() => {
    return selectedBanks.map((bank) => {
      let monthlyCost = 0;

      // Maintenance fee (if balance is below minimum)
      if (scenario.averageBalance < bank.minimumBalance) {
        monthlyCost += bank.maintenanceFee;
      }

      // Overdraft fees
      monthlyCost += scenario.overdraftEvents * bank.overdraftFee;

      // ATM fees
      monthlyCost += scenario.outOfNetworkATM * bank.atmFee;

      // NSF fees
      monthlyCost += scenario.nsfEvents * bank.nsfFee;

      const yearlyCost = monthlyCost * 12;

      return {
        bank,
        monthlyCost,
        yearlyCost,
        breakdown: {
          maintenance:
            scenario.averageBalance < bank.minimumBalance
              ? bank.maintenanceFee
              : 0,
          overdraft: scenario.overdraftEvents * bank.overdraftFee,
          atm: scenario.outOfNetworkATM * bank.atmFee,
          nsf: scenario.nsfEvents * bank.nsfFee,
        },
      };
    });
  }, [scenario, selectedBanks]);

  const handleScenarioChange = (field: keyof UserScenario, value: number) => {
    setScenario((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankSelect = (bank: BankProfile) => {
    if (selectedBanks.find((b) => b.name === bank.name)) {
      setSelectedBanks((prev) => prev.filter((b) => b.name !== bank.name));
    } else if (selectedBanks.length < 3) {
      setSelectedBanks((prev) => [...prev, bank]);
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleComplete = () => {
    onComplete?.({
      calculatorUsed: true,
      scenarioTested: scenario,
      banksCompared: selectedBanks.length,
    });
  };

  const bestBank = calculations.reduce((best, current) =>
    current.monthlyCost < best.monthlyCost ? current : best
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-purple-900">
          Fee Calculator & Comparison Tool
        </h3>
        <p className="text-purple-800">
          See how different banking scenarios affect your monthly and yearly
          costs
        </p>
      </div>

      {/* Bank Selection */}
      <div className="rounded-xl border bg-white p-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-900">
          Select Banks to Compare (choose up to 3):
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DEFAULT_BANKS.map((bank) => (
            <button
              key={bank.name}
              onClick={() => handleBankSelect(bank)}
              className={`rounded-lg border-2 p-4 text-left transition-all ${
                selectedBanks.find((b) => b.name === bank.name)
                  ? `border-${bank.color}-500 bg-${bank.color}-50`
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{bank.name}</div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Overdraft: ${bank.overdraftFee}</div>
                <div>Monthly Fee: ${bank.maintenanceFee}</div>
                <div>Min Balance: ${bank.minimumBalance}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Selected: {selectedBanks.length} of 3 banks
        </p>
      </div>

      {/* Scenario Inputs */}
      <div className="rounded-xl border bg-white p-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-900">
          Your Banking Scenario:
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Average Monthly Balance
            </label>
            <input
              type="number"
              value={scenario.averageBalance}
              onChange={(e) =>
                handleScenarioChange('averageBalance', Number(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              min="0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Overdraft Events per Month
            </label>
            <input
              type="number"
              value={scenario.overdraftEvents}
              onChange={(e) =>
                handleScenarioChange('overdraftEvents', Number(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              min="0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Out-of-Network ATM Uses per Month
            </label>
            <input
              type="number"
              value={scenario.outOfNetworkATM}
              onChange={(e) =>
                handleScenarioChange('outOfNetworkATM', Number(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              min="0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              NSF (Bounced Check) Events per Month
            </label>
            <input
              type="number"
              value={scenario.nsfEvents}
              onChange={(e) =>
                handleScenarioChange('nsfEvents', Number(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              min="0"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <AnimatedButton
            onClick={handleCalculate}
            variant="primary"
            size="lg"
            disabled={selectedBanks.length === 0}
          >
            Calculate & Compare Costs
          </AnimatedButton>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="rounded-xl border bg-white p-6">
          <h4 className="mb-4 text-lg font-semibold text-gray-900">
            Cost Comparison Results:
          </h4>

          <div className="space-y-4">
            {calculations.map((calc, index) => (
              <div
                key={calc.bank.name}
                className={`rounded-lg border p-4 ${
                  calc.bank.name === bestBank.bank.name
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      {calc.bank.name}
                      {calc.bank.name === bestBank.bank.name && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Best Value
                        </span>
                      )}
                    </h5>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ${calc.monthlyCost.toFixed(2)}/month
                    </div>
                    <div className="text-sm text-gray-600">
                      ${calc.yearlyCost.toFixed(2)}/year
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  {calc.breakdown.maintenance > 0 && (
                    <div>
                      <span className="text-gray-600">Maintenance:</span>
                      <span className="ml-1 text-red-600">
                        ${calc.breakdown.maintenance}
                      </span>
                    </div>
                  )}
                  {calc.breakdown.overdraft > 0 && (
                    <div>
                      <span className="text-gray-600">Overdraft:</span>
                      <span className="ml-1 text-red-600">
                        ${calc.breakdown.overdraft}
                      </span>
                    </div>
                  )}
                  {calc.breakdown.atm > 0 && (
                    <div>
                      <span className="text-gray-600">ATM:</span>
                      <span className="ml-1 text-red-600">
                        ${calc.breakdown.atm}
                      </span>
                    </div>
                  )}
                  {calc.breakdown.nsf > 0 && (
                    <div>
                      <span className="text-gray-600">NSF:</span>
                      <span className="ml-1 text-red-600">
                        ${calc.breakdown.nsf}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h5 className="mb-2 font-semibold text-blue-900">
              💡 Key Insights:
            </h5>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>
                • The difference between highest and lowest cost: $
                {(
                  Math.max(...calculations.map((c) => c.monthlyCost)) -
                  Math.min(...calculations.map((c) => c.monthlyCost))
                ).toFixed(2)}
                /month
              </li>
              <li>
                • Over one year, this difference is: $
                {(
                  (Math.max(...calculations.map((c) => c.monthlyCost)) -
                    Math.min(...calculations.map((c) => c.monthlyCost))) *
                  12
                ).toFixed(2)}
              </li>
              <li>
                • Maintaining minimum balances can save significant money on
                maintenance fees
              </li>
              {scenario.overdraftEvents > 0 && (
                <li>
                  • Avoiding overdrafts is one of the biggest ways to reduce
                  banking costs
                </li>
              )}
            </ul>
          </div>

          <div className="mt-6 text-center">
            <AnimatedButton
              onClick={handleComplete}
              variant="success"
              size="lg"
            >
              Continue Learning →
            </AnimatedButton>
          </div>
        </div>
      )}
    </div>
  );
}
