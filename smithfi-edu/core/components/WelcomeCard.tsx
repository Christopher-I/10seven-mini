/**
 * Welcome Card Component
 * Shows onboarding message for new users
 */

'use client';

import Link from 'next/link';

interface WelcomeCardProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
}

export function WelcomeCard({
  title,
  description = 'Start your financial literacy journey with interactive lessons and practical tools.',
  ctaText,
  ctaHref,
}: WelcomeCardProps) {
  return (
    <section className="mb-8">
      <div className="rounded-xl bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>

            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-stone-100">
              {description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:shadow-lg"
              >
                <span className="mr-2">→</span>
                {ctaText}
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <button
                onClick={() => {
                  document.getElementById('all-modules')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
                className="inline-flex items-center rounded-lg border-2 border-white/30 px-6 py-4 font-medium text-white transition-all hover:bg-white/10"
              >
                Browse All Modules
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <svg
                  className="h-16 w-16 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-800">
                <span className="text-sm text-white">•</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
