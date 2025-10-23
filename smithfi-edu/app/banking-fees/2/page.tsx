/**
 * Banking Fees Module - Unit 2
 * Cleaner URL: /banking-fees/2
 */

import { Suspense } from 'react';
import Unit2Container from '@/modules/banking-fees/units/unit-2-fees';

export const metadata = {
  title: "It's a Fee-for-All - Fund Your Future",
  description:
    'Learn about banking fees through interactive activities and games.',
};

export default function BankingFeesUnit2Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Unit2Container />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">
          Loading Unit 2: It&apos;s a Fee-for-All...
        </p>
      </div>
    </div>
  );
}
