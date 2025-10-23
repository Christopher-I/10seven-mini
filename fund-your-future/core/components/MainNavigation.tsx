/**
 * Main Navigation Component
 * Provides access to key sections: About, Resources, Profile, Events, Appointments
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { QuestionSubmissionModal } from './QuestionSubmissionModal';

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  action?: string;
  icon: React.ReactElement;
  description?: string;
}

// Group navigation items for better organization
const primaryNavItems = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

const supportNavItems = [
  {
    id: 'ask-question',
    label: 'Ask a Question',
    action: 'question-modal',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'appointment',
    label: 'Book Appointment',
    href: '/book-appointment',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const accountNavItems = [
  {
    id: 'profile',
    label: 'My Profile',
    href: '/profile',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  
  // Debug logging
  console.log('MainNavigation - User:', user?.email || 'Not logged in');
  console.log('MainNavigation - Loading:', loading);

  const handleAuthToggle = async () => {
    if (user) {
      // Logout using Firebase auth and redirect immediately
      try {
        await signOut();
        window.location.href = '/login';
      } catch (error) {
        console.error('Error signing out:', error);
      }
    } else {
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  const handleSupportItemClick = (item: any) => {
    if (item.action === 'question-modal') {
      setQuestionModalOpen(true);
      setSupportDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (supportDropdownOpen) {
        setSupportDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [supportDropdownOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none lg:hidden cursor-pointer"
        aria-label="Open navigation menu"
      >
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
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Desktop navigation */}
      <nav className="hidden lg:flex lg:items-center lg:space-x-4">
        {/* Primary navigation items */}
        {primaryNavItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Support dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSupportDropdownOpen(!supportDropdownOpen);
            }}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Support</span>
            <svg className="h-3 w-3 transition-transform" style={{ transform: supportDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {supportDropdownOpen && (
            <div 
              className="absolute right-0 mt-1 w-48 rounded-md border bg-white py-1 shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {supportNavItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSupportDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleSupportItemClick(item)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
              ))}
            </div>
          )}
        </div>

        {/* Don't show buttons while loading */}
        {!loading && (
          <>
            {/* Account section - only show when logged in */}
            {user && (
              <div className="flex items-center gap-2">
                {accountNavItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="rounded-md p-1 text-gray-700 transition-colors hover:bg-gray-100"
                    title={item.label}
                  >
                    {item.icon}
                  </Link>
                ))}

                {/* Sign Out Button - only when logged in */}
                <button
                  onClick={handleAuthToggle}
                  className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-white transition-colors cursor-pointer font-red-hat"
                  style={{ backgroundColor: '#2E1E72' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e0f4e'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2E1E72'}
                >
                  <span className="hidden xl:inline">Sign Out</span>
                </button>
              </div>
            )}

            {/* Sign In Button - only when NOT logged in */}
            {!user && (
              <button
                onClick={handleAuthToggle}
                className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-white transition-colors cursor-pointer font-red-hat"
                style={{ backgroundColor: '#2E1E72' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e0f4e'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2E1E72'}
              >
                <span className="hidden xl:inline">Sign In</span>
              </button>
            )}
          </>
        )}
      </nav>

      {/* Mobile navigation menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-80 shadow-xl lg:hidden" style={{ backgroundColor: '#E5DEEF' }}>
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-4 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {/* Primary items */}
                  {primaryNavItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  {/* Support section */}
                  <div className="border-t pt-2 mt-2">
                    <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Support</p>
                    {supportNavItems.map((item) => (
                      item.href ? (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleSupportItemClick(item);
                            setIsOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      )
                    ))}
                  </div>

                  {/* Account section */}
                  <div className="border-t pt-2 mt-2">
                    <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Account</p>
                    {accountNavItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-3 border-t px-4 py-4">
                {user ? (
                  <button
                    onClick={() => {
                      handleAuthToggle();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors cursor-pointer font-red-hat"
                    style={{ backgroundColor: '#2E1E72' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e0f4e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2E1E72'}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleAuthToggle();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors cursor-pointer font-red-hat"
                    style={{ backgroundColor: '#2E1E72' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e0f4e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2E1E72'}
                  >
                    Sign In
                  </button>
                )}

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="h-4 w-4"
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
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Question Submission Modal */}
      <QuestionSubmissionModal
        isOpen={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
      />
    </>
  );
}
