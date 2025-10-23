/**
 * My Profile Page
 */

import Link from 'next/link';

export const metadata = {
  title: 'My Profile - Smith College | CONWAY',
  description: 'View your progress, achievements, and account settings',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 transition-colors hover:text-blue-800"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Profile Management Coming Soon
          </h2>
          <p className="mb-6 text-gray-600">
            This page will show your learning progress, achievements,
            certificates, and account settings. You&apos;ll also be able to
            track your financial education journey and set learning goals.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Return to Learning Modules
          </Link>
        </div>
      </main>
    </div>
  );
}
