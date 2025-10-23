/**
 * Narrative Component
 * Template pattern for text-heavy content with icons (Design Pattern B)
 * Features:
 * - Clean typography with Red Hat font
 * - Optional icon integration
 * - Purple theme accents
 * - Mobile-optimized reading experience
 * - Support for multiple content blocks
 */

'use client';

import React from 'react';
import { cn } from '../utils/classNames';

export interface NarrativeBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'highlight' | 'list' | 'quote';
  content: string;
  listItems?: string[];
  level?: 1 | 2 | 3; // For headings
}

export interface NarrativeProps {
  title?: string;
  subtitle?: string;
  blocks: NarrativeBlock[];
  icon?: React.ReactNode;
  iconPosition?: 'top' | 'side' | 'inline';
  accent?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onComplete?: () => void;
  autoAdvance?: boolean;
  readingTime?: number; // in seconds
  className?: string;
}

export function Narrative({
  title,
  subtitle,
  blocks,
  icon,
  iconPosition = 'top',
  accent = false,
  maxWidth = 'lg',
  onComplete,
  autoAdvance = false,
  readingTime,
  className
}: NarrativeProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full'
  };

  // Auto-advance after reading time
  React.useEffect(() => {
    if (autoAdvance && readingTime && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, readingTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [autoAdvance, readingTime, onComplete]);

  const renderBlock = (block: NarrativeBlock) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof React.JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={block.id}
            className={cn(
              "font-red-hat font-bold text-[#2E1E72]",
              block.level === 1 && "text-3xl md:text-4xl",
              block.level === 2 && "text-2xl md:text-3xl",
              block.level === 3 && "text-xl md:text-2xl"
            )}
          >
            {block.content}
          </HeadingTag>
        );

      case 'highlight':
        return (
          <div
            key={block.id}
            className="bg-[#E5DEEF] border-l-4 border-[#2E1E72] p-4 rounded-r-lg"
          >
            <p className="text-[#2E1E72] font-medium leading-relaxed">
              {block.content}
            </p>
          </div>
        );

      case 'list':
        return (
          <div key={block.id} className="space-y-2">
            {block.content && (
              <p className="text-gray-700 leading-relaxed font-medium">
                {block.content}
              </p>
            )}
            <ul className="space-y-2 ml-4">
              {block.listItems?.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2E1E72] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'quote':
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-[#8577B7] pl-6 py-4 bg-gray-50 rounded-r-lg"
          >
            <p className="text-gray-700 leading-relaxed italic text-lg">
              "{block.content}"
            </p>
          </blockquote>
        );

      case 'paragraph':
      default:
        return (
          <p
            key={block.id}
            className="text-gray-700 leading-relaxed text-base md:text-lg"
          >
            {block.content}
          </p>
        );
    }
  };

  const iconSection = icon && (
    <div className={cn(
      "flex-shrink-0",
      iconPosition === 'top' && "mb-6 text-center",
      iconPosition === 'side' && "mr-6",
      iconPosition === 'inline' && "inline-block mr-3"
    )}>
      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#E5DEEF] rounded-full text-[#2E1E72]">
        {icon}
      </div>
    </div>
  );

  return (
    <div className={cn(
      "space-y-6",
      maxWidthClasses[maxWidth],
      "mx-auto",
      className
    )}>
      {/* Header with optional icon */}
      {(title || subtitle || (icon && iconPosition === 'top')) && (
        <div className={cn(
          "text-center space-y-4",
          accent && "bg-[#E5DEEF] p-6 rounded-lg border border-[#2E1E72]"
        )}>
          {icon && iconPosition === 'top' && iconSection}

          {title && (
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E1E72] font-red-hat">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content with side icon layout */}
      <div className={cn(
        iconPosition === 'side' && "flex items-start"
      )}>
        {icon && iconPosition === 'side' && iconSection}

        <div className="space-y-6 flex-1">
          {blocks.map(renderBlock)}
        </div>
      </div>

      {/* Reading progress indicator */}
      {readingTime && autoAdvance && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
            <span>Reading time: {readingTime} seconds</span>
            <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E1E72] rounded-full animate-pulse"
                style={{
                  animation: `reading-progress ${readingTime}s linear forwards`
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes reading-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}