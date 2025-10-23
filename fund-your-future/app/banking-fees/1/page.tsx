/**
 * Banking Fees Module - Unit 1: Banking Basics
 * Route: /banking-fees/1
 */

import { Suspense } from 'react';
import Unit1Container from '@/modules/banking-fees/units/unit-1-basics';

export const metadata = {
  title: "Banking Basics - Fund Your Future",
  description:
    'Learn essential banking vocabulary through interactive flashcards and drag-and-drop quizzes.',
};

export default function BankingFeesUnit1Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Unit1Container />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-gray-600"></div>
        <p className="text-gray-600">
          Loading Unit 1: Banking Basics...
        </p>
      </div>
    </div>
  );
}
