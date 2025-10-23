/**
 * Game Navigation Component
 * Navigation buttons for the game page (back to about/dashboard)
 */

'use client';

import Link from 'next/link';

export function GameNavigation() {
  return (
    <div className="game-navigation flex items-center justify-center gap-4 py-6">
      <Link
        href="/about"
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-red-hat transition-all hover:scale-105"
        style={{
          border: '2px solid #2E1E72',
          backgroundColor: 'white',
          color: '#2E1E72',
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Back to About</span>
      </Link>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-red-hat transition-all hover:scale-105"
        style={{
          backgroundColor: '#2E1E72',
          color: 'white',
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>Dashboard</span>
      </Link>
    </div>
  );
}
