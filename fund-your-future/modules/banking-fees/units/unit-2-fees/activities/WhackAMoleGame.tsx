/**
 * Whack-A-Mole Banking Fees Game - Redesigned
 * Clean, simple implementation matching the design mockup
 */

'use client';

import { useState, useEffect } from 'react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  fee?: number;
  day: 'T' | 'F'; // Thursday or Friday
}

interface GameState {
  currentExpenseIndex: number;
  currentMolePosition: number | null;
  balance: number;
  startingBalance: number;
  transactions: Array<{
    description: string;
    amount: number;
    fee?: number;
    day: string;
  }>;
  gameCompleted: boolean;
  fridayDeposit: boolean;
  showFridayMessage: boolean;
  callbackCalled: boolean;
}

// Exact moles from documentation
const expenses: Expense[] = [
  { id: 1, description: 'Out-of-network ATM withdrawal', amount: 100, day: 'T' },
  { id: 2, description: 'Utilities bill', amount: 50, day: 'T' },
  { id: 3, description: 'Gas fill-up', amount: 50, day: 'T' },
  { id: 4, description: 'Internet bill', amount: 50, day: 'T' },
  { id: 5, description: 'Phone bill', amount: 50, day: 'T' },
  { id: 6, description: 'Rent', amount: 500, day: 'T' },
  // Friday morning popup appears after mole 6
  { id: 7, description: 'Credit card payment', amount: 250, day: 'F' },
  { id: 8, description: 'Dinner with friends', amount: 50, day: 'F' },
];

export function WhackAMoleGame({
  onComplete,
}: {
  onComplete: (transactions: any[]) => void;
}) {
  const [gameState, setGameState] = useState<GameState>({
    currentExpenseIndex: 0,
    currentMolePosition: null,
    balance: 1000,
    startingBalance: 1000,
    transactions: [],
    gameCompleted: false,
    fridayDeposit: false,
    showFridayMessage: false,
    callbackCalled: false,
  });

  const [currentDay, setCurrentDay] = useState<'T' | 'F'>('T');
  const [hitAnimation, setHitAnimation] = useState<number | null>(null);
  const [moleAnimations, setMoleAnimations] = useState<Record<number, 'emerging' | 'visible' | 'hiding' | 'hidden'>>({});

  // Show mole at random position with smooth animation
  useEffect(() => {
    if (
      gameState.currentExpenseIndex < expenses.length &&
      !gameState.showFridayMessage
    ) {
      // Pick a random hole position (0-8 for 9 holes in 3x3 grid)
      const randomPosition = Math.floor(Math.random() * 9);

      // Start emergence animation
      setMoleAnimations(prev => ({
        ...prev,
        [randomPosition]: 'emerging'
      }));

      // Set the position
      setGameState((prev) => ({
        ...prev,
        currentMolePosition: randomPosition,
      }));

      // After emergence animation, set to visible
      setTimeout(() => {
        setMoleAnimations(prev => ({
          ...prev,
          [randomPosition]: 'visible'
        }));
      }, 500); // 500ms emergence animation
    }
  }, [gameState.currentExpenseIndex, gameState.showFridayMessage]);

  const createHitEffect = (position: number | null) => {
    if (position === null) return;

    // Hit animation and mole hiding
    setHitAnimation(position);
    setMoleAnimations(prev => ({
      ...prev,
      [position]: 'hiding'
    }));

    // Clear hit animation after brief flash
    setTimeout(() => setHitAnimation(null), 200);

    // Complete hiding animation
    setTimeout(() => {
      setMoleAnimations(prev => ({
        ...prev,
        [position]: 'hidden'
      }));
    }, 400);
  };

  const hitMole = () => {
    const currentExpense = expenses[gameState.currentExpenseIndex];
    if (!currentExpense) return;

    // Add hit effect
    createHitEffect(gameState.currentMolePosition);

    const totalAmount = currentExpense.amount + (currentExpense.fee || 0);
    const newBalance = gameState.balance - totalAmount;

    const newTransaction = {
      description: currentExpense.description,
      amount: currentExpense.amount,
      fee: currentExpense.fee,
      day: currentExpense.day === 'T' ? 'Thursday' : 'Friday',
    };

    // Check if we're at the end of Thursday (after Rent)
    if (gameState.currentExpenseIndex === 5) {
      // Rent is index 5
      setGameState((prev) => ({
        ...prev,
        balance: newBalance,
        transactions: [...prev.transactions, newTransaction],
        currentMolePosition: null,
        showFridayMessage: true,
      }));
      // User will click Next button to continue - no auto-advance
    }
    // Check if game is complete
    else if (gameState.currentExpenseIndex === expenses.length - 1) {
      setGameState((prev) => ({
        ...prev,
        balance: newBalance,
        transactions: [...prev.transactions, newTransaction],
        currentMolePosition: null,
        gameCompleted: true,
      }));
      // User will click Next button to continue - no auto-advance
    }
    // Normal progression
    else {
      setGameState((prev) => ({
        ...prev,
        balance: newBalance,
        transactions: [...prev.transactions, newTransaction],
        currentExpenseIndex: prev.currentExpenseIndex + 1,
        currentMolePosition: null,
      }));
    }
  };

  const currentExpense = expenses[gameState.currentExpenseIndex];

  if (gameState.gameCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#E5DEEF' }}>
        <div className="max-w-md w-full text-center space-y-4 md:space-y-6 px-4">
          <div className="text-5xl md:text-6xl">😰</div>
          <h3 className="text-xl md:text-2xl font-bold text-[#2E1E72]" style={{ fontFamily: 'Playfair Display' }}>
            Game Complete!
          </h3>
          <p className="text-lg md:text-xl text-[#2E1E72]" style={{ fontFamily: 'Red Hat Display' }}>
            Your final balance:{' '}
            <span className="font-bold">${gameState.balance.toFixed(2)}</span>
          </p>
          <p className="text-base md:text-lg text-[#2E1E72]" style={{ fontFamily: 'Red Hat Display' }}>
            Wait... where did all that money go? Let's look at your statement to
            find out!
          </p>

          <button
            onClick={() => {
              onComplete(gameState.transactions);
              setGameState((prev) => ({ ...prev, callbackCalled: true }));
            }}
            className="w-full max-w-sm bg-[#2E1E72] hover:bg-[#3B2A8F] text-white font-bold py-4 px-8 rounded-full text-base md:text-lg transition-colors cursor-pointer shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Show Friday morning popup - exact design from unit design 3.png
  if (gameState.showFridayMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#E5DEEF' }}>
        <div className="max-w-md w-full text-center space-y-6 md:space-y-8 px-4">
          {/* Bank building icon */}
          <div className="flex justify-center">
            <svg className="w-36 h-40 md:w-44 md:h-48" viewBox="0 0 182 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91.985 74.8357C96.6911 81.5789 104.277 72.0596 106.642 75.4385C108.418 78.0001 103.228 81.1993 99.8294 81.5673C96.9982 81.9498 98.0907 85.8068 100.56 85.4359C102.608 85.1838 104.283 84.4535 105.831 83.5291L106.88 85.0331C108.247 86.9891 111.25 85.0012 109.847 82.9611L108.729 81.3587C111.818 78.3102 111.971 74.9893 110.244 72.5204C105.663 65.9511 98.027 75.453 95.645 72.0567C93.8657 69.5067 97.9342 66.661 101.226 66.1279C104.002 65.7164 103.324 62.3317 100.948 62.4245C99.3483 62.4129 97.8299 62.9461 96.4129 63.6908L95.3552 62.1724C93.9642 60.1816 91.0114 62.2535 92.3878 64.2443L93.5093 65.8526C90.2782 68.9271 90.2551 72.3552 91.985 74.8357Z" fill="#2E1E72"/>
              <mask id="mask0_90_1177" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="177" width="177" height="23">
                <path d="M0.165527 177.893H176.366V200H0.165527V177.893Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_90_1177)">
                <path d="M170.857 188.608H169.081V186.058C169.081 181.912 165.723 178.539 161.593 178.539H14.5417C10.4152 178.539 7.05669 181.912 7.05669 186.058V188.608H5.28034C2.52164 188.608 0.272949 190.857 0.272949 193.619V197.563C0.272949 198.823 1.29587 199.849 2.55931 199.849C3.81985 199.849 4.84567 198.823 4.84567 197.563V193.619C4.84567 193.378 5.03982 193.181 5.28034 193.181C177.673 193.387 171.292 192.746 171.292 193.619V197.563C171.292 198.823 172.315 199.849 173.576 199.849C174.839 199.849 175.862 198.823 175.862 197.563V193.619C175.862 190.857 173.616 188.608 170.857 188.608ZM11.6265 186.058C11.6265 184.436 12.9334 183.111 14.5417 183.111H161.593C163.201 183.111 164.508 184.436 164.508 186.058V188.608H11.6265V186.058Z" fill="#2E1E72"/>
              </g>
              <path d="M32.6353 113.886V171.697C32.6353 172.961 33.6582 173.984 34.9187 173.984C36.1822 173.984 37.2051 172.961 37.2051 171.697V113.886C37.2051 112.626 36.1822 111.6 34.9187 111.6C33.6582 111.6 32.6353 112.626 32.6353 113.886Z" fill="#2E1E72"/>
              <path d="M19.2505 113.886V171.697C19.2505 172.961 20.2763 173.984 21.5368 173.984C22.7974 173.984 23.8232 172.961 23.8232 171.697V113.886C23.8232 112.626 22.7974 111.6 21.5368 111.6C20.2763 111.6 19.2505 112.626 19.2505 113.886Z" fill="#2E1E72"/>
              <path d="M72.3237 113.886V171.697C72.3237 172.961 73.3467 173.984 74.6101 173.984C75.8706 173.984 76.8936 172.961 76.8936 171.697V113.886C76.8936 112.626 75.8706 111.6 74.6101 111.6C73.3467 111.6 72.3237 112.626 72.3237 113.886Z" fill="#2E1E72"/>
              <path d="M58.939 113.886V171.697C58.939 172.961 59.9648 173.984 61.2253 173.984C62.4888 173.984 63.5117 172.961 63.5117 171.697V113.886C63.5117 112.626 62.4888 111.6 61.2253 111.6C59.9648 111.6 58.939 112.626 58.939 113.886Z" fill="#2E1E72"/>
              <path d="M167.502 96.3056L146.577 83.251C145.507 82.5845 144.096 82.9091 143.43 83.9842C142.76 85.0534 143.088 86.4647 144.16 87.1341L165.079 100.186C166.151 100.855 165.679 102.472 164.436 102.472H11.6988C10.4615 102.472 9.98334 100.855 11.0526 100.189L45.9682 78.4001C47.0403 77.7307 47.3649 76.3195 46.6984 75.2502C46.0319 74.1751 44.6207 73.8593 43.5485 74.52L8.63007 96.3085C3.69513 99.3975 5.86847 107.045 11.6988 107.045H164.436C170.246 107.045 172.46 99.412 167.502 96.3056Z" fill="#2E1E72"/>
              <path d="M42.0532 92.8513C42.0532 94.1147 43.0761 95.1406 44.3367 95.1406H130.43C131.691 95.1406 132.717 94.1147 132.717 92.8513C132.717 91.5908 131.691 90.5649 130.43 90.5649H44.3367C43.0761 90.5649 42.0532 91.5908 42.0532 92.8513Z" fill="#2E1E72"/>
              <path d="M112.009 113.886V171.697C112.009 172.961 113.035 173.984 114.295 173.984C115.559 173.984 116.582 172.961 116.582 171.697V113.886C116.582 112.626 115.559 111.6 114.295 111.6C113.035 111.6 112.009 112.626 112.009 113.886Z" fill="#2E1E72"/>
              <path d="M98.627 113.886V171.697C98.627 172.961 99.6528 173.984 100.913 173.984C102.177 173.984 103.2 172.961 103.2 171.697V113.886C103.2 112.626 102.177 111.6 100.913 111.6C99.6528 111.6 98.627 112.626 98.627 113.886Z" fill="#2E1E72"/>
              <path d="M151.697 113.886V171.697C151.697 172.961 152.723 173.984 153.984 173.984C155.247 173.984 156.27 172.961 156.27 171.697V113.886C156.27 112.626 155.247 111.6 153.984 111.6C152.723 111.6 151.697 112.626 151.697 113.886Z" fill="#2E1E72"/>
              <path d="M138.318 113.886V171.697C138.318 172.961 139.341 173.984 140.601 173.984C141.865 173.984 142.888 172.961 142.888 171.697V113.886C142.888 112.626 141.865 111.6 140.601 111.6C139.341 111.6 138.318 112.626 138.318 113.886Z" fill="#2E1E72"/>
              <path d="M118.882 21.2381C115.761 25.1385 112.142 30.0619 110.215 34.6375C109.725 35.8024 110.273 37.1412 111.435 37.6338C112.585 38.1148 113.936 37.5875 114.428 36.4109C116.156 32.3019 119.656 27.5901 122.452 24.0982C123.756 22.461 125.628 21.3627 127.59 21.0816C135.965 19.8877 152.52 20.0413 152.694 20.0442C153.894 20.0413 154.989 19.0416 155.003 17.7839C155.018 16.5205 154.004 15.4831 152.74 15.4715C152.056 15.4715 135.663 15.3121 126.944 16.5553C123.797 17.0044 120.934 18.6706 118.882 21.2381Z" fill="#2E1E72"/>
              <path d="M162.002 35.8458C161.008 35.0663 159.57 35.243 158.794 36.2399C155.934 39.8969 151.202 44.6869 144.963 46.7038C137.396 48.8656 131.169 51.3026 125.321 56.197C122.884 58.3616 119.016 60.5292 117.578 57.84C117.086 56.9127 117.106 55.771 117.625 54.8553C120.16 50.4014 126.634 44.3566 133.609 38.0278C134.545 37.1788 134.615 35.7328 133.768 34.7968C132.925 33.8666 131.476 33.797 130.537 34.6403C123 41.4762 116.524 47.5471 113.652 52.5921C111 57.2576 113.843 63.6414 119.65 63.6414C122.415 63.6414 125.336 62.2939 128.303 59.6627C133.484 55.3276 139.21 53.105 146.293 51.0795C153.711 48.6801 159.141 43.2178 162.393 39.0565C163.172 38.0597 162.996 36.6224 162.002 35.8458Z" fill="#2E1E72"/>
              <mask id="mask1_90_1177" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="154" y="0" width="28" height="41">
                <path d="M154.111 0H181.834V40.6532H154.111V0Z" fill="white"/>
              </mask>
              <g mask="url(#mask1_90_1177)">
                <path d="M178.762 33.429L171.692 35.6255C170.698 35.9298 169.62 35.4169 169.243 34.4432L159.515 9.54534C159.112 8.51373 159.628 7.34592 160.669 6.95182L166.948 4.57852C168.127 4.13516 168.724 2.81377 168.278 1.63436C167.832 0.449165 166.51 -0.147781 165.331 0.301378L159.052 2.67467C155.629 3.96999 153.928 7.79797 155.258 11.2116L164.983 36.1065C166.224 39.2796 169.733 41.0096 173.048 39.9925L180.119 37.7988C181.324 37.425 181.996 36.1442 181.622 34.9358C181.252 33.7332 179.968 33.0581 178.762 33.429Z" fill="#2E1E72"/>
              </g>
              <path d="M113.119 43.3745C112.487 42.282 111.084 41.9053 109.998 42.5399L54.1081 74.804C51.8014 76.1051 51.0074 79 52.3317 81.3095L54.3689 84.8709C55.0006 85.9692 56.4002 86.343 57.4898 85.7171C58.5852 85.0912 58.9648 83.6915 58.3359 82.5962L56.3712 78.7769L112.281 46.4983C113.374 45.8666 113.75 44.4728 113.119 43.3745Z" fill="#2E1E72"/>
              <path d="M128.037 84.8763C128.674 85.9774 130.074 86.3396 131.161 85.7137L153.462 72.8243C155.792 71.5087 156.551 68.5443 155.233 66.313L149.73 56.7561C149.095 55.6636 147.698 55.284 146.606 55.9186C145.513 56.5474 145.137 57.9471 145.768 59.0395L151.196 68.8515L128.874 81.7524C127.779 82.3842 127.408 83.7838 128.037 84.8763Z" fill="#2E1E72"/>
              <path d="M59.2402 50.8012C60.1674 51.656 61.6134 51.5981 62.4683 50.6679C63.326 49.7377 63.2652 48.2917 62.3379 47.4368L54.6385 40.3459C53.7112 39.4911 52.2652 39.5461 51.4103 40.4792C50.5526 41.4065 50.6134 42.8554 51.5407 43.7103L59.2402 50.8012Z" fill="#2E1E72"/>
              <path d="M38.0309 57.356C37.6716 58.5702 38.3642 59.8394 39.5755 60.1988C49.5758 63.1284 49.5381 63.2298 50.1466 63.2298C52.7662 63.2298 53.3139 59.4975 50.7928 58.7528L40.8708 55.8144C39.6769 55.4551 38.3903 56.1447 38.0309 57.356Z" fill="#2E1E72"/>
              <path d="M175.413 61.6535C174.338 61.6332 179.305 61.7288 164.905 61.4478C163.662 61.4478 162.645 62.4417 162.619 63.6906C162.596 64.9512 163.599 65.9973 164.862 66.0205C165.937 66.0408 160.97 65.9451 175.369 66.2262C176.61 66.2262 177.627 65.2323 177.653 63.9833C177.676 62.7228 176.673 61.6767 175.413 61.6535Z" fill="#2E1E72"/>
              <path d="M174.659 82.3495L165.462 77.6087C164.34 77.0291 162.964 77.4754 162.384 78.5939C161.808 79.7154 162.248 81.0947 163.37 81.6743L172.567 86.4151C173.68 86.9888 175.065 86.5571 175.645 85.4298C176.221 84.3084 175.781 82.929 174.659 82.3495Z" fill="#2E1E72"/>
            </svg>
          </div>

          {/* Message text - exact from documentation */}
          <p className="text-base md:text-xl text-[#2E1E72] px-2" style={{ fontFamily: 'Playfair Display' }}>
            It's Friday afternoon! You've been checking your bank account and see that your <strong>available balance</strong> is $200, and the $500 from your dog walking side hustle was deposited after 3:00pm. Your <strong>current balance</strong> is $700.
          </p>

          {/* Next button - matches design */}
          <button
            onClick={() => {
              setCurrentDay('F');
              setGameState((prev) => ({
                ...prev,
                balance: prev.balance + 500,
                fridayDeposit: true,
                currentExpenseIndex: prev.currentExpenseIndex + 1,
                showFridayMessage: false,
              }));
            }}
            className="w-full max-w-sm bg-[#2E1E72] hover:bg-[#3B2A8F] text-white font-bold py-4 px-8 rounded-full text-base md:text-lg transition-colors cursor-pointer shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-3 py-4 sm:py-8 sm:space-y-6 sm:py-12">
      {/* Game Status */}
      <div className="rounded-lg border border-[#8577B7] bg-white p-4 shadow-sm">
        {/* Mobile: Stacked Layout */}
        <div className="flex flex-col gap-2 sm:hidden">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[#2E1E72]">
              {currentDay === 'T' ? '📅 Thursday' : '📅 Friday'}
            </span>
            {gameState.fridayDeposit && (
              <span className="rounded bg-green-50 px-2 py-1 text-sm text-green-800 whitespace-nowrap">
                $500 pending
              </span>
            )}
          </div>
          <div className="text-left">
            <span className="text-lg font-bold text-[#2E1E72]">
              Available Balance: ${gameState.fridayDeposit ? (gameState.balance - 500).toFixed(2) : gameState.balance.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-[#2E1E72]">
            {currentDay === 'T' ? '📅 Thursday' : '📅 Friday'}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#2E1E72]">
              Available Balance: ${gameState.fridayDeposit ? (gameState.balance - 500).toFixed(2) : gameState.balance.toFixed(2)}
            </span>
            {gameState.fridayDeposit && (
              <span className="rounded bg-green-50 px-2 py-1 text-lg text-green-800 whitespace-nowrap">
                $500 pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Current Expense Display */}
      {currentExpense && (
        <div className="text-center mb-2 px-2">
          <div className="text-[#8577B7] text-base sm:text-lg font-medium mb-1 line-clamp-2">
            {currentExpense.description}
          </div>
          <div className="text-[#2E1E72] text-xl sm:text-3xl font-bold">
            ${currentExpense.amount}
            {currentExpense.fee && (
              <span className="text-red-600 text-xs sm:text-sm ml-1">
                + ${currentExpense.fee} fee
              </span>
            )}
          </div>
        </div>
      )}

      {/* Clean 3x3 Game Grid */}
      <div className="mx-auto w-full sm:max-w-md bg-transparent p-2 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={index}
              className="relative aspect-square flex items-center justify-center"
            >
              {/* Hole with animated mole states */}
              <div className="w-full h-full flex items-end justify-center relative">
                {gameState.currentMolePosition === index && currentExpense ? (
                  // Mole UP state - animated mole emerging from hole
                  <div
                    className={`cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                      moleAnimations[index] === 'emerging' ? 'mole-emerge' :
                      moleAnimations[index] === 'hiding' ? 'mole-hide' :
                      'mole-visible'
                    }`}
                    onClick={hitMole}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      hitMole();
                    }}
                    style={{
                      filter: hitAnimation === index ? 'brightness(1.3) saturate(1.2) drop-shadow(0 0 8px rgba(157, 113, 250, 0.5))' : 'none',
                      transform: hitAnimation === index ? 'scale(1.1) rotate(-2deg)' : undefined,
                    }}
                  >
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 74 76"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mole-svg w-14 h-14 sm:w-20 sm:h-20"
                      style={{ display: 'block' }}
                    >
                      <mask id={`mask0_90_1007_${index}`} style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="64" width="74" height="12">
                        <path d="M0.929199 64.292H73.7187V75.9788H0.929199V64.292Z" fill="white"/>
                      </mask>
                      <g mask={`url(#mask0_90_1007_${index})`}>
                        <path d="M73.5713 73.9173V75.9282H0.929199V73.9173C0.929199 72.0143 2.47365 70.472 4.37892 70.472C26.5931 62.7167 48.5058 62.7981 70.1238 70.472C72.0268 70.472 73.5713 72.0143 73.5713 73.9173Z" fill="#2E1E72"/>
                      </g>
                      <path d="M69.9292 66.6074V70.021H3.9292V66.6074C3.9292 62.1327 7.58445 58.5064 12.0944 58.5064C28.2747 50.3111 44.7908 49.4188 61.764 58.5064C66.2717 58.5064 69.9292 62.1327 69.9292 66.6074Z" fill="#8577B7"/>
                      <path d="M55.7958 8.39604C51.3073 3.26082 44.7447 0.0209961 37.4303 0.0209961C30.6628 0.0209961 24.5403 2.79578 20.1063 7.27423C15.6702 11.7593 12.9292 17.9502 12.9292 24.7869V59.021H61.9292V24.7869C61.9292 18.5034 59.6131 12.7643 55.7958 8.39604Z" fill="#9D71FA"/>
                      <path d="M41.9292 28.021V34.9888C41.9292 36.6638 40.6478 38.021 39.069 38.021H35.7894C34.2085 38.021 32.9292 36.6638 32.9292 34.9888V28.021C34.1785 28.7042 35.7381 29.1104 37.4303 29.1104C39.1224 29.1104 40.6799 28.7042 41.9292 28.021Z" fill="#F8F8F8"/>
                      <path d="M42.9033 26.5417C42.9181 26.6998 42.9292 26.8579 42.9292 27.0193C42.9292 29.7808 40.4704 32.021 37.431 32.021C34.3917 32.021 31.9292 29.7808 31.9292 27.0193C31.9292 26.8612 31.9403 26.7031 31.9551 26.545C32.2176 24.0055 34.5655 22.021 37.431 22.021C40.2892 22.021 42.6371 24.0022 42.9033 26.5417Z" fill="#2E1E72"/>
                      {/* Animated blinking eyes */}
                      <g className="mole-eyes">
                        <circle cx="24" cy="16" r="3" fill="#2E1E72" className="blink-animation">
                          <animate attributeName="ry" values="3;0.5;3" dur="3s" repeatCount="indefinite" begin="0s"/>
                        </circle>
                        <circle cx="50" cy="16" r="3" fill="#2E1E72" className="blink-animation">
                          <animate attributeName="ry" values="3;0.5;3" dur="3s" repeatCount="indefinite" begin="0.1s"/>
                        </circle>
                        {/* Eye reflections */}
                        <circle cx="25" cy="15" r="1" fill="white" opacity="0.8"/>
                        <circle cx="51" cy="15" r="1" fill="white" opacity="0.8"/>
                      </g>
                    </svg>
                  </div>
                ) : (
                  // Mole DOWN state - show empty hole with subtle animation
                  <div className="hole-container">
                    <svg
                      width="60"
                      height="25"
                      viewBox="0 0 75 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hole-svg w-14 h-7 sm:w-20 sm:h-8"
                      style={{ display: 'block' }}
                    >
                      <mask id={`mask0_90_947_${index}`} style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="19" width="75" height="11">
                        <path d="M0.929199 19.4185H74.0707V29.9788H0.929199V19.4185Z" fill="white"/>
                      </mask>
                      <g mask={`url(#mask0_90_947_${index})`}>
                        <path d="M74.0708 27.9175V29.9284H1.42871V27.9175C1.42871 26.0144 2.97316 24.4722 4.87623 24.4722C27.7812 19.1172 49.958 17.7114 70.6233 24.4722C72.5285 24.4722 74.0708 26.0144 74.0708 27.9175Z" fill="#2E1E72"/>
                      </g>
                      <path d="M71.0708 20.6123V24.021H5.0708V20.6123C5.0708 16.144 8.72814 12.523 13.2358 12.523H16.5155C31.2994 5.78658 45.7433 4.61095 59.6239 12.523H62.9036C67.4157 12.523 71.0708 16.144 71.0708 20.6123Z" fill="#8577B7"/>
                      <path d="M59.0708 13.021H16.0708C18.2077 9.13618 21.2831 5.88618 24.973 3.60911C28.663 1.32974 32.9721 0.0209961 37.5719 0.0209961C46.7716 0.0209961 54.8014 5.25366 59.0708 13.021Z" fill="#9D71FA"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Progress Bar */}
      <div className="relative h-6 sm:h-4 overflow-hidden rounded-full bg-gray-200 shadow-sm">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${(gameState.currentExpenseIndex / expenses.length) * 100}%`,
            backgroundColor: '#8577B7',
          }}
        />
      </div>

      {/* Professional animations */}
      <style jsx>{`
        .touch-feedback {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          touch-action: manipulation;
        }

        /* Mole emergence animation */
        .mole-emerge {
          animation: mole-pop-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .mole-visible {
          animation: mole-idle 2s ease-in-out infinite;
        }

        .mole-hide {
          animation: mole-pop-down 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
        }

        /* Hole subtle breathing animation */
        .hole-container {
          animation: hole-breathe 4s ease-in-out infinite;
        }

        @keyframes mole-pop-up {
          0% {
            transform: translateY(100%) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(-10%) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
        }

        @keyframes mole-pop-down {
          0% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100%) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes mole-idle {
          0%, 100% {
            transform: translateY(0%) rotate(0deg);
          }
          25% {
            transform: translateY(-3%) rotate(-1deg);
          }
          75% {
            transform: translateY(3%) rotate(1deg);
          }
        }

        @keyframes hole-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        /* Enhanced hit effects */
        .mole-svg {
          transition: all 0.2s ease;
        }

        .mole-svg:hover {
          filter: brightness(1.1);
        }

        /* Blinking eyes animation - fallback for browsers that don't support SVG animate */
        .blink-animation {
          animation: blink-fallback 3s ease-in-out infinite;
        }

        @keyframes blink-fallback {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .mole-emerge, .mole-hide {
            animation-duration: 0.3s;
          }
        }
      `}</style>
    </div>
  );
}