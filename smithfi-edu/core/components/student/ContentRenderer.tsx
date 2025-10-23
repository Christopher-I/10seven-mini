/**
 * Content Renderer Component
 * Renders admin-managed content with fallback to static content
 */

'use client';

import { useState, useEffect } from 'react';
import { ContentService } from '@/lib/content-service';
import { ContentElement } from '@/lib/content-types';
import { CalloutBox } from '@/core/components/CalloutBox';

interface ContentRendererProps {
  moduleId: string;
  unitId: string;
  pageId: string;
  fallbackContent?: React.ReactNode;
  className?: string;
}

export function ContentRenderer({
  moduleId,
  unitId,
  pageId,
  fallbackContent,
  className = ''
}: ContentRendererProps) {
  const [content, setContent] = useState<ContentElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadContent();
  }, [moduleId, unitId, pageId]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const elements = await ContentService.getStudentContent(moduleId, unitId, pageId);
      
      if (elements && elements.length > 0) {
        // Admin content available
        setContent(elements);
        setUsingFallback(false);
      } else {
        // No admin content, use fallback
        setContent([]);
        setUsingFallback(true);
      }
    } catch (err) {
      console.error('Error loading content:', err);
      setError('Failed to load content');
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state or fallback
  if (error || usingFallback || !content.length) {
    // Use fallback content if available
    if (fallbackContent) {
      return <div className={className}>{fallbackContent}</div>;
    }
    
    // Emergency content if no fallback
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Content is temporarily unavailable. Please refresh the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  // Render admin content
  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {content
        .sort((a, b) => a.order - b.order)
        .map((element, index) => (
          <ContentElementRenderer key={element.id || index} element={element} />
        ))}
    </div>
  );
}

// Individual content element renderer
function ContentElementRenderer({ element }: { element: ContentElement }) {
  const { type, content } = element;

  switch (type) {
    case 'heading':
      return (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {content}
        </h2>
      );

    case 'paragraph':
      return (
        <p className="text-gray-900 leading-relaxed">
          {content}
        </p>
      );

    default:
      // Fallback for unknown content types
      return (
        <div className="text-gray-900">
          {typeof content === 'string' ? content : JSON.stringify(content)}
        </div>
      );
  }
}

// Loading component for content
export function ContentLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
