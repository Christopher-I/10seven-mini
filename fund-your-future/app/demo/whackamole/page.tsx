/**
 * Whackamole Game Page
 * Demo mode page featuring the whackamole banking fees game
 */

'use client';

import { useState, useEffect } from 'react';
import { Page1, WhackAMolePages } from '@/modules/banking-fees/units/unit-2-fees/content/pages/pages-01-03';
import { GameNavigation } from '@/components/demo/GameNavigation';

export default function WhackamolePage() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'game'>('intro');
  const [gameData, setGameData] = useState<unknown>(null);

  useEffect(() => {
    // Mark step 2 as complete when visiting the game page
    const currentProgress = parseInt(localStorage.getItem('demo-progress') || '0', 10);
    if (currentProgress < 2) {
      localStorage.setItem('demo-progress', '2');
    }
  }, []);

  const handleIntroComplete = () => {
    setCurrentPage('game');
  };

  const handleStepComplete = (data: any) => {
    console.log('Game step completed:', data);

    // Handle back navigation
    if (data?.goBackOnePage) {
      setCurrentPage('intro');
      return;
    }

    setGameData(data);

    // Mark step 3 as complete when game finishes
    localStorage.setItem('demo-progress', '3');
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
            Whack-A-Mole Bank Fees Game
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <GameNavigation />

      {/* Game Container */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentPage === 'intro' ? (
            <Page1 onStepComplete={handleIntroComplete} />
          ) : (
            <WhackAMolePages
              onStepComplete={handleStepComplete}
              stepData={gameData}
            />
          )}
        </div>
      </main>
    </div>
  );
}
