/**
 * Global Glossary Search Modal
 * Provides searchable access to all financial terms across the platform
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { searchGlossary, getTermsByCategory, GLOSSARY_TERMS, GLOSSARY_CATEGORIES, type GlossaryTerm } from '@/core/data/glossary';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
}

export function GlossaryModal({ isOpen, onClose, initialTerm }: GlossaryModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialTerm || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (initialTerm) {
      setSearchQuery(initialTerm);
    }
  }, [initialTerm]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let terms = searchQuery ? searchGlossary(searchQuery) : GLOSSARY_TERMS;

    if (selectedCategory !== 'all') {
      terms = terms.filter(term => term.category === selectedCategory);
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(term);
  };

  const handleBackToSearch = () => {
    setSelectedTerm(null);
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200" style={{ backgroundColor: '#E5DEEF' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[#2E1E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">
              {selectedTerm ? selectedTerm.term : 'Financial Glossary'}
            </h2>
            {selectedTerm && (
              <button
                onClick={handleBackToSearch}
                className="ml-4 text-[#2E1E72] hover:text-[#8577B7] text-sm font-medium transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Search
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors text-[#2E1E72]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {selectedTerm ? (
            /* Term Detail View */
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-playfair font-semibold text-[#2E1E72]">{selectedTerm.term}</span>
                  <span className="bg-[#E5DEEF] text-[#2E1E72] text-sm px-3 py-1 rounded-full font-medium">
                    {GLOSSARY_CATEGORIES.find(cat => cat.id === selectedTerm.category)?.label}
                  </span>
                  {selectedTerm.unit && (
                    <span className="bg-[#8577B7] bg-opacity-20 text-[#2E1E72] text-sm px-3 py-1 rounded-full font-medium">
                      {selectedTerm.unit}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedTerm.definition}</p>
              </div>

              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-playfair font-semibold text-[#2E1E72] mb-4">Examples:</h3>
                  <ul className="space-y-3">
                    {selectedTerm.examples.map((example, index) => (
                      <li key={index} className="text-gray-700 flex items-start gap-3">
                        <span className="text-[#8577B7] mt-1 font-bold">•</span>
                        <span className="leading-relaxed">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-[#2E1E72] mb-4">Related Terms:</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedTerm.relatedTerms.map(relatedId => {
                      const relatedTerm = GLOSSARY_TERMS.find(t => t.id === relatedId);
                      return relatedTerm ? (
                        <button
                          key={relatedId}
                          onClick={() => handleTermClick(relatedTerm)}
                          className="bg-[#E5DEEF] hover:bg-[#8577B7] hover:text-white text-[#2E1E72] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        >
                          {relatedTerm.term}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Search View */
            <div className="p-6 space-y-6">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search terms, definitions, or examples..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#8577B7] focus:border-[#8577B7] text-black placeholder-gray-500 transition-all duration-200"
                  autoFocus
                />
                <svg className="w-5 h-5 text-[#8577B7] absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-[#2E1E72] text-white shadow-sm'
                      : 'bg-[#E5DEEF] hover:bg-[#8577B7] hover:text-white text-[#2E1E72]'
                  }`}
                >
                  All Categories
                </button>
                {GLOSSARY_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-[#2E1E72] text-white shadow-sm'
                        : 'bg-[#E5DEEF] hover:bg-[#8577B7] hover:text-white text-[#2E1E72]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="space-y-4">
                {filteredTerms.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="w-12 h-12 text-[#8577B7] mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146.832-5.636 2.172M6.343 14.828A7.962 7.962 0 016 12c0-1.01.188-1.98.532-2.867m11.135 5.695A7.962 7.962 0 0118 12c0-1.01-.188-1.98-.532-2.867M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 mb-2">No terms found matching your search.</p>
                    <p className="text-sm text-gray-500">Try a different search term or category.</p>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-[#8577B7] font-medium mb-4">
                      {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {filteredTerms.map(term => (
                        <button
                          key={term.id}
                          onClick={() => handleTermClick(term)}
                          className="text-left p-4 border-2 border-gray-200 hover:border-[#8577B7] hover:bg-[#E5DEEF] hover:bg-opacity-50 rounded-2xl transition-all duration-200 transform hover:scale-102"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-[#2E1E72] text-lg">{term.term}</span>
                            <div className="flex gap-2">
                              <span className="bg-[#E5DEEF] text-[#2E1E72] text-xs px-2 py-1 rounded-full">
                                {GLOSSARY_CATEGORIES.find(cat => cat.id === term.category)?.icon}
                              </span>
                              {term.unit && (
                                <span className="bg-[#8577B7] bg-opacity-20 text-[#2E1E72] text-xs px-2 py-1 rounded-full font-medium">
                                  {term.unit}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {term.definition}
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 text-center" style={{ backgroundColor: '#E5DEEF' }}>
          <p className="text-sm text-[#2E1E72]">
            Press <kbd className="bg-white bg-opacity-60 px-2 py-1 rounded text-xs font-medium">Esc</kbd> to close
            {!selectedTerm && (
              <span className="mx-2 text-[#8577B7]">•</span>
            )}
            {!selectedTerm && (
              <span className="font-medium">{GLOSSARY_TERMS.length} terms available</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}