/**
 * Consistent Application Header
 * Shows across all pages with context-aware breadcrumbs
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainNavigation } from './MainNavigation';
import { GlossaryModal } from './GlossaryModal';

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface AppHeaderProps {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  variant?: 'dashboard' | 'module' | 'unit' | 'module-overview';
  moduleNumber?: string;
  moduleName?: string;
  // Unit progress props
  unitTitle?: string;
  currentPage?: number;
  totalPages?: number;
  onPageJump?: (page: number) => void;
  onPageChange?: (page: number) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function AppHeader({
  title,
  description,
  breadcrumbs = [],
  actions,
  variant = 'dashboard',
  moduleNumber,
  moduleName,
  // Unit progress props
  unitTitle,
  currentPage = 1,
  totalPages = 1,
  onPageJump,
  onPageChange,
  canGoBack = true,
  canGoForward = true
}: AppHeaderProps) {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const router = useRouter();
  return (
    <header className={`shadow-sm ${variant === 'unit' ? 'sticky top-0 z-10 border-b' : ''}`} style={{ backgroundColor: '#E5DEEF' }}>
      <div className="w-full sm:mx-auto sm:w-[90%] max-w-none px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={`${index}-${breadcrumb.href}`} className="flex items-center gap-2 sm:gap-4">
                    <Link
                      href={breadcrumb.href}
                      className="text-gray-700 sm:text-gray-800 transition-colors hover:text-gray-900 font-medium"
                    >
                      {index === 0 ? (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span className="hidden sm:inline">{breadcrumb.label}</span>
                          <span className="sm:hidden">Back</span>
                        </span>
                      ) : breadcrumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-300 hidden sm:inline">|</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Title Section */}
            {variant === 'dashboard' ? (
              <div className="flex items-center gap-3">
                {/* Smith College Logo */}
                <img
                  src="/smith college logo.png"
                  alt="Smith College Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                  style={{ background: 'transparent', mixBlendMode: 'multiply' }}
                />
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    Fund Your Future
                  </h1>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-600">
                    Smith College | CONWAY CENTER
                  </p>
                </div>
              </div>
            ) : variant === 'module-overview' ? (
              <div className="flex items-center gap-4">
                {/* Back Button */}
                <button
                  onClick={() => router.push('/')}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: '#2E1E72',
                    boxShadow: '0 2px 4px rgba(46, 30, 114, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#3B2A8F';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#2E1E72';
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Module Info */}
                <div className="flex flex-col">
                  <p
                    className="font-red-hat font-semibold text-sm leading-[21px]"
                    style={{
                      color: '#8577B7',
                      letterSpacing: '0px',
                      marginBottom: '2px'
                    }}
                  >
                    {moduleNumber || 'Module'}
                  </p>
                  <h1
                    className="font-playfair font-semibold text-2xl md:text-[28px] leading-[130%]"
                    style={{
                      color: '#0F2D52',
                      letterSpacing: '0px'
                    }}
                  >
                    {moduleName || title || 'Module Overview'}
                  </h1>
                </div>
              </div>
            ) : variant === 'unit' && unitTitle ? (
              <div className="w-full">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center w-full">
                  {/* Left side - Back Button and Title */}
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    <button
                      onClick={() => window.history.back()}
                      className="flex items-center space-x-4 text-[#2E1E72] hover:text-[#8577B7] transition-colors cursor-pointer"
                      aria-label="Go back"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <h1 className="text-xl font-semibold font-red-hat">
                        {unitTitle}
                      </h1>
                    </button>
                  </div>

                  {/* Center - Progress Bars */}
                  <div className="flex items-center justify-center flex-1 px-4 lg:px-8">
                    <div className="flex items-center space-x-2 w-full max-w-2xl">
                      {Array.from({ length: 8 }, (_, index) => {
                        const totalProgress = (currentPage - 1) / totalPages;
                        const progressIn8Bars = totalProgress * 8;
                        const filledBars = Math.floor(progressIn8Bars);
                        const partialProgress = progressIn8Bars - filledBars;

                        let barState: 'empty' | 'partial' | 'complete' = 'empty';
                        let fillPercentage = 0;

                        if (index < filledBars) {
                          barState = 'complete';
                          fillPercentage = 100;
                        } else if (index === filledBars && partialProgress > 0) {
                          barState = 'partial';
                          fillPercentage = partialProgress * 100;
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if (onPageJump) {
                                const targetPage = Math.ceil(((index + 1) / 8) * totalPages);
                                onPageJump(Math.min(targetPage, totalPages));
                              }
                            }}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 relative overflow-hidden ${
                              onPageJump ? "cursor-pointer hover:h-2.5" : "cursor-default"
                            } bg-[#8577B7]`}
                            aria-label={`Progress bar ${index + 1} of 8`}
                          >
                            {/* Progress fill */}
                            {fillPercentage > 0 && (
                              <div
                                className="absolute inset-0 bg-[#2E1E72] transition-all duration-300"
                                style={{
                                  width: `${fillPercentage}%`
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                  {/* Title with back arrow - matching module overview design */}
                  <div className="mb-4 text-center">
                    <button
                      onClick={() => router.push('/banking-fees')}
                      className="flex items-center justify-center gap-4 text-xl font-playfair font-semibold text-[#2E1E72] hover:text-[#8577B7] transition-colors cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: '#2E1E72',
                          boxShadow: '0 2px 4px rgba(46, 30, 114, 0.2)'
                        }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      {unitTitle}
                    </button>
                  </div>

                  {/* Progress Bars Row - matching design and centered */}
                  <div className="flex items-center justify-center gap-2 w-full">
                    {Array.from({ length: 8 }, (_, index) => {
                      const totalProgress = (currentPage - 1) / totalPages;
                      const progressIn8Bars = totalProgress * 8;
                      const filledBars = Math.floor(progressIn8Bars);
                      const partialProgress = progressIn8Bars - filledBars;

                      let fillPercentage = 0;

                      if (index < filledBars) {
                        fillPercentage = 100;
                      } else if (index === filledBars && partialProgress > 0) {
                        fillPercentage = partialProgress * 100;
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (onPageJump) {
                              const targetPage = Math.ceil(((index + 1) / 8) * totalPages);
                              onPageJump(Math.min(targetPage, totalPages));
                            }
                          }}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 relative overflow-hidden ${
                            onPageJump ? "cursor-pointer" : "cursor-default"
                          } bg-[#8577B7] bg-opacity-50`}
                          aria-label={`Progress bar ${index + 1} of 8`}
                        >
                          {/* Progress fill */}
                          {fillPercentage > 0 && (
                            <div
                              className="absolute inset-0 bg-[#2E1E72] transition-all duration-300 rounded-full"
                              style={{
                                width: `${fillPercentage}%`
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : title ? (
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {title}
                </h1>
                {description && (
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">{description}</p>
                )}
              </div>
            ) : null}
          </div>

          {/* Actions */}
          <div className="ml-8 flex items-center gap-4">
            {/* Glossary Search Button - Hidden on Mobile */}
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hidden md:block p-2.5 text-[#2E1E72] hover:text-white hover:bg-[#2E1E72] rounded-full transition-all duration-200 shadow-sm border border-gray-200"
              title="Search Financial Glossary"
              aria-label="Open financial glossary search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {actions}

            {/* Unit or Dashboard Navigation - Hide profile icon on mobile */}
            {variant === 'unit' && unitTitle ? (
              <div className="hidden md:flex w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            ) : variant === 'dashboard' ? (
              <MainNavigation />
            ) : (
              <div className="hidden md:flex w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Navigation Buttons removed - now using PageNavigation component from design system in individual pages */}

      {/* Desktop Navigation also removed - PageNavigation component handles both mobile and desktop */}

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </header>
  );
}