/**
 * Upcoming Events Page
 */

import Link from 'next/link';

export const metadata = {
  title: 'Upcoming Events - Smith College | CONWAY',
  description:
    'Conway Center workshops, webinars, and financial education events',
};

export default function EventsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Events Calendar Coming Soon
          </h2>
          <p className="mb-6 text-gray-600">
            This page will list upcoming Conway Center workshops, webinars,
            guest speaker events, and other financial education opportunities
            for Smith College students.
          </p>
          <div className="space-y-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              Schedule One-on-One Session
            </Link>
            <div>
              <Link
                href="/"
                className="text-green-600 transition-colors hover:text-green-800"
              >
                Return to Learning Modules
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
