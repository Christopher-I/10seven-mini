/**
 * About the Course Page
 * Information about The Conway Center, 10Seven, and the Fund Your Future Program
 */

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDemoMode } from '@/hooks/useDemoMode';

export default function AboutPage() {
  const router = useRouter();
  const { isDemoMode } = useDemoMode();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E5DEEF' }}>
      {/* Custom Header with Circular Back Button */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-150 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#2E1E72',
                boxShadow: '0 2px 4px rgba(46, 30, 114, 0.2)',
              }}
              aria-label="Back to Dashboard"
            >
              <svg
                className="h-5 w-5 text-white"
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
            </button>
            <div>
              <h1
                className="font-playfair text-[32px] font-bold leading-tight"
                style={{ color: '#0F2D52' }}
              >
                About the Fund Your Future Course
              </h1>
              <p className="mt-2 font-red-hat text-gray-600">
                Learn about The Conway Center, 10Seven and The Fund Your Future
                Course
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:px-6 md:py-16">
        <div className="space-y-12">
          {/* Conway Center Section */}
          <section className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6">
              <h2
                className="mb-4 font-playfair text-[32px] font-bold"
                style={{ color: '#0F2D52' }}
              >
                The Conway Center
              </h2>
              <div
                className="h-1 w-20 rounded-full"
                style={{ backgroundColor: '#8577B7' }}
              ></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-red-hat leading-relaxed text-gray-700">
                The Conway Center Innovation and Entrepreneurship Center at
                Smith College is dedicated to fostering innovation, creativity,
                and entrepreneurial thinking among students. Our mission is to
                empower students with the knowledge, skills, and resources they
                need to create meaningful change in the world.
              </p>

              <p className="font-red-hat leading-relaxed text-gray-700">
                Through innovative programs, workshops, and educational
                initiatives, we help students develop financial literacy,
                business acumen, and the entrepreneurial mindset necessary to
                succeed in today&apos;s economy.
              </p>
            </div>
          </section>

          {/* 10Seven Section */}
          <section className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6">
              <h2
                className="mb-4 font-playfair text-[32px] font-bold"
                style={{ color: '#0F2D52' }}
              >
                10Seven
              </h2>
              <div
                className="h-1 w-20 rounded-full"
                style={{ backgroundColor: '#DBE250' }}
              ></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-red-hat leading-relaxed text-gray-700">
                10Seven is a research-driven organization that is advancing
                wealth justice. We work with organizations, leaders,
                governmental bodies, funders and beneficiaries to facilitate
                healing from financial trauma at the individual, community, and
                systemic levels. We develop educational programming and robust
                research that targets wealth justice from all angles.
              </p>

              <p className="font-red-hat leading-relaxed text-gray-700">
                In collaboration with the Conway Center, we are bringing
                financial education to all students—whether you&apos;re just
                starting to understand wealth building or you&apos;re looking
                ahead to long-term goals. The Fund Your Future course equips
                you with the knowledge and tools to make sustainable wealth
                building a reality.
              </p>
            </div>
          </section>

          {/* Generational Wealth Initiative */}
          <section
            className="rounded-2xl p-8 shadow-sm transition-shadow hover:shadow-md"
            style={{
              background:
                'linear-gradient(to bottom right, rgba(229, 222, 239, 0.5), rgba(133, 119, 183, 0.2))',
            }}
          >
            <div className="mb-6">
              <h2
                className="mb-4 font-playfair text-[32px] font-bold"
                style={{ color: '#0F2D52' }}
              >
                Generational Wealth Initiative
              </h2>
              <div
                className="h-1 w-20 rounded-full"
                style={{ backgroundColor: '#2E1E72' }}
              ></div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3
                  className="mb-4 font-playfair text-xl font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Our Mission
                </h3>
                <p className="font-red-hat leading-relaxed text-gray-700">
                  The Generational Wealth Initiative focuses on breaking cycles
                  of financial inequality by providing comprehensive financial
                  education to underrepresented communities. We believe that
                  financial literacy is a cornerstone of economic empowerment.
                </p>
              </div>

              <div>
                <h3
                  className="mb-4 font-playfair text-xl font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Program Goals
                </h3>
                <ul className="space-y-2 font-red-hat text-gray-700">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: '#2E1E72' }}
                    ></span>
                    Build foundational financial literacy skills
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: '#2E1E72' }}
                    ></span>
                    Promote long-term wealth building strategies
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: '#2E1E72' }}
                    ></span>
                    Foster entrepreneurial thinking and innovation
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: '#2E1E72' }}
                    ></span>
                    Create pathways to economic opportunity
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Course Overview */}
          <section className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6">
              <h2
                className="mb-4 font-playfair text-[32px] font-bold"
                style={{ color: '#0F2D52' }}
              >
                Course Overview
              </h2>
              <div
                className="h-1 w-20 rounded-full"
                style={{ backgroundColor: '#8577B7' }}
              ></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Item 1: Immersive Learning */}
              <div className="text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(133, 119, 183, 0.2)' }}
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: '#2E1E72' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-2 font-playfair text-lg font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Immersive Learning
                </h3>
                <p className="font-red-hat text-sm text-gray-600">
                  Engage with fun activities and real-world scenarios designed
                  for Smith College students
                </p>
              </div>

              {/* Item 2: Practical Skills */}
              <div className="text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(219, 226, 80, 0.3)' }}
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: '#0F2D52' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-2 font-playfair text-lg font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Practical Skills
                </h3>
                <p className="font-red-hat text-sm text-gray-600">
                  Learn accessible tools and strategies that you can implement
                  immediately
                </p>
              </div>

              {/* Item 3: Up-to-Date Content */}
              <div className="text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(133, 119, 183, 0.2)' }}
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: '#2E1E72' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-2 font-playfair text-lg font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Up-to-Date Content
                </h3>
                <p className="font-red-hat text-sm text-gray-600">
                  Get access to comprehensive, relevant information you can
                  trust
                </p>
              </div>

              {/* Item 4: Wealth Justice Approach */}
              <div className="text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(219, 226, 80, 0.3)' }}
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: '#0F2D52' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-2 font-playfair text-lg font-semibold"
                  style={{ color: '#0F2D52' }}
                >
                  Wealth Justice Approach
                </h3>
                <p className="font-red-hat text-sm text-gray-600">
                  Feel informed, equipped and empowered to fund your future
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            className="rounded-2xl p-8 text-white shadow-sm transition-shadow hover:shadow-md"
            style={{ backgroundColor: '#2E1E72' }}
          >
            <div className="text-center">
              <h2 className="mb-4 font-playfair text-[32px] font-bold">
                Reimagine Wealth in a Way That Works for You
              </h2>
              <p className="mx-auto mb-6 max-w-2xl font-red-hat text-gray-200">
                Connect with the Conway Center to learn more about our programs
                and resources.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center rounded-lg px-6 py-3 font-red-hat font-semibold text-gray-900 transition-all hover:scale-105"
                  style={{ backgroundColor: '#DBE250' }}
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center rounded-lg border-2 px-6 py-3 font-red-hat font-semibold text-white transition-all hover:scale-105"
                  style={{ borderColor: '#DBE250' }}
                >
                  View Upcoming Events
                </Link>
              </div>
            </div>
          </section>

          {/* Demo Mode: Play Whackamole Game Section */}
          {isDemoMode && (
            <section
              className="rounded-2xl p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              style={{
                background:
                  'linear-gradient(to bottom right, rgba(46, 30, 114, 0.1), rgba(133, 119, 183, 0.1))',
                border: '2px solid #8577B7',
              }}
            >
              <div className="max-w-2xl mx-auto">
                <h2
                  className="mb-4 font-playfair text-[32px] font-bold"
                  style={{ color: '#0F2D52' }}
                >
                  Try Our Interactive Learning
                </h2>
                <p className="mx-auto mb-6 font-red-hat text-gray-700 text-lg">
                  Experience hands-on financial literacy with our engaging
                  Whackamole game. Learn about banking fees in an interactive
                  way!
                </p>

                <Link
                  href="/demo/whackamole"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold font-red-hat text-white transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#2E1E72' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Play Whackamole Game
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
