/**
 * Book Appointment Page
 */

import Link from 'next/link';

export const metadata = {
  title: 'Book Appointment - Smith College | CONWAY',
  description:
    'Schedule one-on-one financial counseling with Conway Center advisors',
};

export default function BookAppointmentPage() {
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
              Book Appointment
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <svg
                className="h-8 w-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Appointment Scheduling Coming Soon
          </h2>
          <p className="mb-6 text-gray-600">
            This page will allow you to schedule one-on-one financial counseling
            sessions with Conway Center advisors. Get personalized guidance on
            budgeting, saving, credit building, and financial planning.
          </p>

          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-6">
            <h3 className="mb-2 font-semibold text-orange-900">
              What to Expect
            </h3>
            <ul className="space-y-1 text-left text-sm text-orange-800">
              <li>• Personalized financial assessment</li>
              <li>• Budget planning and review</li>
              <li>• Credit score improvement strategies</li>
              <li>• Student loan guidance</li>
              <li>• Career and salary negotiation tips</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              For now, please contact The Conway Center directly to schedule an
              appointment.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Return to Learning Modules
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
