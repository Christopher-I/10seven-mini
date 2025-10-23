/**
 * Educational Component
 * Template pattern for interactive learning content (Design Pattern C)
 * Features:
 * - Interactive elements with purple theming
 * - Glossary term integration
 * - Progressive disclosure
 * - Mobile-first touch interactions
 * - Built-in completion tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../utils/classNames';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
}

export interface InteractiveElement {
  id: string;
  type: 'button' | 'reveal' | 'glossary' | 'highlight' | 'tooltip';
  trigger: string;
  content: string;
  position?: number; // Position in text for inline elements
  completed?: boolean;
  required?: boolean; // Must be interacted with to proceed
}

export interface EducationalProps {
  title?: string;
  content: string;
  interactiveElements: InteractiveElement[];
  glossaryTerms?: GlossaryTerm[];
  onElementInteraction?: (elementId: string) => void;
  onComplete?: () => void;
  autoAdvance?: boolean;
  className?: string;
}

export function Educational({
  title,
  content,
  interactiveElements,
  glossaryTerms = [],
  onElementInteraction,
  onComplete,
  autoAdvance = true,
  className
}: EducationalProps) {
  const [interactedElements, setInteractedElements] = useState<Set<string>>(new Set());
  const [revealedContent, setRevealedContent] = useState<Set<string>>(new Set());
  const [activeGlossary, setActiveGlossary] = useState<string | null>(null);

  // Check completion status
  useEffect(() => {
    const requiredElements = interactiveElements.filter(el => el.required);
    const allRequiredCompleted = requiredElements.every(el =>
      interactedElements.has(el.id)
    );

    if (allRequiredCompleted && requiredElements.length > 0 && autoAdvance) {
      onComplete?.();
    }
  }, [interactedElements, interactiveElements, autoAdvance, onComplete]);

  const handleElementClick = (element: InteractiveElement) => {
    const newInteracted = new Set(interactedElements);
    newInteracted.add(element.id);
    setInteractedElements(newInteracted);

    if (element.type === 'reveal') {
      const newRevealed = new Set(revealedContent);
      newRevealed.add(element.id);
      setRevealedContent(newRevealed);
    }

    if (element.type === 'glossary') {
      setActiveGlossary(activeGlossary === element.id ? null : element.id);
    }

    onElementInteraction?.(element.id);
  };

  const renderInteractiveContent = () => {
    let processedContent = content;

    // Sort elements by position to process them in order
    const sortedElements = [...interactiveElements].sort((a, b) =>
      (a.position || 0) - (b.position || 0)
    );

    // Process each interactive element
    sortedElements.forEach(element => {
      const isInteracted = interactedElements.has(element.id);
      const isRevealed = revealedContent.has(element.id);

      let replacement = '';

      switch (element.type) {
        case 'button':
          replacement = `<button
            class="interactive-button ${isInteracted ? 'completed' : ''}"
            data-element-id="${element.id}"
          >
            ${element.trigger}
          </button>`;
          break;

        case 'reveal':
          replacement = `
            <span class="reveal-trigger ${isInteracted ? 'revealed' : ''}" data-element-id="${element.id}">
              ${element.trigger}
            </span>
            ${isRevealed ? `<span class="revealed-content">${element.content}</span>` : ''}
          `;
          break;

        case 'glossary':
          replacement = `<span
            class="glossary-term ${isInteracted ? 'active' : ''}"
            data-element-id="${element.id}"
          >
            ${element.trigger}
          </span>`;
          break;

        case 'highlight':
          replacement = `<mark class="educational-highlight">${element.trigger}</mark>`;
          break;

        default:
          replacement = element.trigger;
      }

      processedContent = processedContent.replace(element.trigger, replacement);
    });

    return processedContent;
  };

  const requiredCount = interactiveElements.filter(el => el.required).length;
  const completedRequired = interactiveElements.filter(el =>
    el.required && interactedElements.has(el.id)
  ).length;

  return (
    <div className={cn("space-y-6 max-w-4xl mx-auto", className)}>
      {/* Header */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#2E1E72] font-red-hat mb-4">
            {title}
          </h2>

          {/* Progress indicator for required interactions */}
          {requiredCount > 0 && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Interactive elements: {completedRequired} of {requiredCount}</span>
              <div className="w-20 h-2 bg-[#E5DEEF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2E1E72] transition-all duration-500"
                  style={{ width: `${requiredCount > 0 ? (completedRequired / requiredCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Content */}
      <div className="space-y-6">
        <div
          className="prose prose-lg max-w-none leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: renderInteractiveContent() }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const elementId = target.getAttribute('data-element-id');

            if (elementId) {
              const element = interactiveElements.find(el => el.id === elementId);
              if (element) {
                handleElementClick(element);
              }
            }
          }}
        />

        {/* Active Glossary Definition */}
        {activeGlossary && (
          <div className="bg-[#E5DEEF] border-l-4 border-[#2E1E72] p-6 rounded-r-lg">
            <button
              onClick={() => setActiveGlossary(null)}
              className="float-right text-[#2E1E72] hover:text-[#8577B7] text-xl font-bold"
            >
              ×
            </button>

            {(() => {
              const element = interactiveElements.find(el => el.id === activeGlossary);
              const glossaryTerm = glossaryTerms.find(term =>
                term.term.toLowerCase() === element?.trigger.toLowerCase()
              );

              return (
                <div>
                  <h4 className="font-bold text-[#2E1E72] text-lg mb-2">
                    {element?.trigger || 'Term'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {glossaryTerm?.definition || element?.content || 'Definition not available.'}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Completion Status */}
      {completedRequired === requiredCount && requiredCount > 0 && (
        <div className="text-center p-6 bg-[#E5DEEF] rounded-lg border border-[#2E1E72]">
          <div className="text-3xl mb-2">✨</div>
          <p className="text-[#2E1E72] font-semibold text-lg">
            Great! You've explored all the interactive elements.
          </p>
        </div>
      )}

      {/* Styles for interactive elements */}
      <style jsx global>{`
        .interactive-button {
          background: #2E1E72;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0 4px;
        }

        .interactive-button:hover {
          background: #8577B7;
          transform: translateY(-1px);
        }

        .interactive-button.completed {
          background: #4CAF50;
        }

        .reveal-trigger {
          background: #E5DEEF;
          color: #2E1E72;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .reveal-trigger:hover {
          border-color: #2E1E72;
        }

        .reveal-trigger.revealed {
          background: #2E1E72;
          color: white;
        }

        .revealed-content {
          display: inline-block;
          margin-left: 8px;
          padding: 4px 8px;
          background: #f0f9ff;
          border-radius: 4px;
          border-left: 3px solid #2E1E72;
          font-style: italic;
        }

        .glossary-term {
          color: #2E1E72;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-style: dotted;
          text-underline-offset: 3px;
          transition: all 0.3s ease;
        }

        .glossary-term:hover {
          color: #8577B7;
          text-decoration-style: solid;
        }

        .glossary-term.active {
          background: #E5DEEF;
          padding: 2px 4px;
          border-radius: 3px;
        }

        .educational-highlight {
          background: #FFF3CD;
          color: #856404;
          padding: 2px 4px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}