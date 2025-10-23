/**
 * Whackamole Game Page
 * Demo mode page featuring the whackamole banking fees game
 */

'use client';

import { useState } from 'react';
import { WhackAMolePages } from '@/modules/banking-fees/units/unit-2-fees/content/pages/pages-01-03';
import { GameNavigation } from '@/components/demo/GameNavigation';

export default function WhackamolePage() {
  const [gameData, setGameData] = useState<unknown>(null);

  const handleStepComplete = (data: unknown) => {
    console.log('Game step completed:', data);
    setGameData(data);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E5DEEF' }}>
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <h1
            className="font-playfair text-[32px] font-bold text-center"
            style={{ color: '#0F2D52' }}
          >
            Whackamole Banking Fees Game
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <GameNavigation />

      {/* Game Container */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <WhackAMolePages
            onStepComplete={handleStepComplete}
            stepData={gameData}
          />
        </div>
      </main>
    </div>
  );
}
