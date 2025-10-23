/**
 * Resources Page
 */

import Link from 'next/link';

export const metadata = {
  title: 'Resources - Smith College | CONWAY',
  description: 'Financial tools, guides, and additional learning materials',
};

export default function ResourcesPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Financial Resources Coming Soon
          </h2>
          <p className="mb-6 text-gray-600">
            This page will contain financial tools, guides, calculators, and
            additional learning materials from The Conway Center and our partner
            organizations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Return to Learning Modules
          </Link>
        </div>
      </main>
    </div>
  );
}
