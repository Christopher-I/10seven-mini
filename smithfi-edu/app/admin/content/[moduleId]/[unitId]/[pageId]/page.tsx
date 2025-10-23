/**
 * Page Content Editor
 * Individual page content editing interface
 */

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppHeader } from '@/core/components/AppHeader';
import { ContentService } from '@/lib/content-service';
import { ContentElement, PageContent } from '@/lib/content-types';
import { useAuth } from '@/contexts/AuthContext';
import { Timestamp } from 'firebase/firestore';

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const moduleId = params.moduleId as string;
  const unitId = params.unitId as string;
  const pageId = params.pageId as string;

  const [elements, setElements] = useState<ContentElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Page info
  const [moduleTitle, setModuleTitle] = useState('');
  const [unitTitle, setUnitTitle] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  // Navigation
  const [totalPages, setTotalPages] = useState(0);
  const currentPageNumber = parseInt(pageId.replace('page-', ''));
  const previousPageId =
    currentPageNumber > 1 ? `page-${currentPageNumber - 1}` : null;
  const nextPageId =
    currentPageNumber < totalPages ? `page-${currentPageNumber + 1}` : null;

  useEffect(() => {
    loadPageContent();
  }, [moduleId, unitId, pageId]);

  useEffect(() => {
    // Set up beforeunload warning for unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const loadPageContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Set titles
      const moduleTitles: Record<string, string> = {
        'banking-fees': 'Module 2: Banking',
        'credit-system': 'Module 3: Credit System',
        investing: 'Module 4: Investing',
      };
      setModuleTitle(moduleTitles[moduleId] || `Module: ${moduleId}`);

      const unitTitles: Record<string, string> = {
        'unit-1-basics': 'Unit 1: Banking Basics',
        'unit-2-fees': 'Unit 2: Banking Fees',
        'unit-3-accounts': 'Unit 3: Account Types',
        'unit-4-relationships': 'Unit 4: Banking Relationships',
        'unit-5-alternatives': 'Unit 5: Alternative Banking',
      };
      setUnitTitle(unitTitles[unitId] || `Unit: ${unitId}`);

      const pageNumber = pageId.replace('page-', '');
      setPageTitle(`Page ${pageNumber}`);

      // Set total pages based on unit
      const pageCounts: Record<string, number> = {
        'unit-1-basics': 8,
        'unit-2-fees': 23,
        'unit-3-accounts': 18,
        'unit-4-relationships': 15,
        'unit-5-alternatives': 20,
      };
      setTotalPages(pageCounts[unitId] || 10);

      // Load existing content
      const pageContent = await ContentService.getPageContent(
        moduleId,
        unitId,
        pageId
      );

      if (pageContent && pageContent.elements) {
        setElements(pageContent.elements.sort((a, b) => a.order - b.order));
      } else {
        // Initialize with empty content
        setElements([]);
      }
    } catch (error) {
      console.error('Error loading page content:', error);
      setError('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!user) {
      setError('Must be logged in to save content');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const success = await ContentService.savePageContent(
        moduleId,
        unitId,
        pageId,
        elements,
        user.uid
      );

      if (success) {
        setSaveMessage('Content saved successfully!');
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setError('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const addElement = (type: 'heading' | 'paragraph') => {
    const newElement: ContentElement = {
      id: `${moduleId}-${unitId}-${pageId}-${type}-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Heading' : 'New paragraph content...',
      order: elements.length,
      editable: true,
      metadata: {
        created: Timestamp.now(),
        modified: Timestamp.now(),
        modifiedBy: user?.uid || 'unknown',
      },
    };

    setElements([...elements, newElement]);
    setHasUnsavedChanges(true);
  };

  const updateElement = (elementId: string, content: string) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === elementId
          ? {
              ...el,
              content,
              metadata: {
                ...el.metadata,
                modified: Timestamp.now(),
                modifiedBy: user?.uid || 'unknown',
              },
            }
          : el
      )
    );
    setHasUnsavedChanges(true);
  };

  const deleteElement = (elementId: string) => {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
    setHasUnsavedChanges(true);
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const index = elements.findIndex((el) => el.id === elementId);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= elements.length) return;

    const newElements = [...elements];
    [newElements[index], newElements[newIndex]] = [
      newElements[newIndex],
      newElements[index],
    ];

    // Update order values
    newElements.forEach((el, i) => (el.order = i));

    setElements(newElements);
    setHasUnsavedChanges(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Loading Page..."
          description="Loading page content"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' },
            { href: `/admin/content/${moduleId}`, label: 'Loading...' },
            {
              href: `/admin/content/${moduleId}/${unitId}`,
              label: 'Loading...',
            },
            {
              href: `/admin/content/${moduleId}/${unitId}/${pageId}`,
              label: 'Loading...',
            },
          ]}
        />
        <main className="mx-auto w-[90%] max-w-4xl px-4 py-6">
          <div className="rounded-xl border bg-white p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-1/2 rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title={`${pageTitle} Editor`}
        description={`Edit content for ${pageTitle} in ${unitTitle}`}
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/content', label: 'Content Management' },
          { href: `/admin/content/${moduleId}`, label: moduleTitle },
          { href: `/admin/content/${moduleId}/${unitId}`, label: unitTitle },
          {
            href: `/admin/content/${moduleId}/${unitId}/${pageId}`,
            label: pageTitle,
          },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-4xl px-4 py-6">
        {/* Save Status & Actions */}
        <div className="mb-6 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-gray-900">{pageTitle} Editor</h2>
              {hasUnsavedChanges && (
                <span className="rounded bg-purple-50 px-2 py-1 text-sm text-purple-600">
                  Unsaved changes
                </span>
              )}
              {saveMessage && (
                <span className="rounded bg-green-50 px-2 py-1 text-sm text-green-600">
                  {saveMessage}
                </span>
              )}
              {error && (
                <span className="rounded bg-red-50 px-2 py-1 text-sm text-red-600">
                  {error}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={saveContent}
                disabled={saving || !hasUnsavedChanges}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>💾 Save Content</>
                )}
              </button>

              {/* Page Navigation */}
              <div className="flex gap-1">
                {previousPageId && (
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/content/${moduleId}/${unitId}/${previousPageId}`
                      )
                    }
                    className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                    title={`Go to Page ${currentPageNumber - 1}`}
                  >
                    ← Prev
                  </button>
                )}
                <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                  {currentPageNumber} / {totalPages}
                </span>
                {nextPageId && (
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/content/${moduleId}/${unitId}/${nextPageId}`
                      )
                    }
                    className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                    title={`Go to Page ${currentPageNumber + 1}`}
                  >
                    Next →
                  </button>
                )}
              </div>

              <button
                onClick={() => router.back()}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                ⬅️ Back to Unit
              </button>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="mb-6 rounded-xl border bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Page Content</h3>
            <div className="flex gap-2">
              <button
                onClick={() => addElement('heading')}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                + Heading
              </button>
              <button
                onClick={() => addElement('paragraph')}
                className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
              >
                + Paragraph
              </button>
            </div>
          </div>

          {elements.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
              <div className="mb-4 text-4xl">📝</div>
              <h4 className="mb-2 text-lg font-medium text-gray-900">
                No content yet
              </h4>
              <p className="mb-4 text-gray-600">
                Start by adding a heading or paragraph
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => addElement('heading')}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Add Heading
                </button>
                <button
                  onClick={() => addElement('paragraph')}
                  className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Add Paragraph
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {elements.map((element, index) => (
                <div
                  key={element.id}
                  className="group rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          element.type === 'heading'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {element.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        Order: {element.order}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => moveElement(element.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveElement(element.id, 'down')}
                        disabled={index === elements.length - 1}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => deleteElement(element.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {element.type === 'heading' ? (
                    <input
                      type="text"
                      value={element.content}
                      onChange={(e) =>
                        updateElement(element.id, e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 text-xl font-bold text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter heading text..."
                    />
                  ) : (
                    <textarea
                      value={element.content}
                      onChange={(e) =>
                        updateElement(element.id, e.target.value)
                      }
                      rows={4}
                      className="resize-vertical w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter paragraph content..."
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Preview */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 font-bold text-gray-900">Preview</h3>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            {elements.length === 0 ? (
              <p className="italic text-gray-500">No content to preview</p>
            ) : (
              <div className="space-y-4">
                {elements
                  .sort((a, b) => a.order - b.order)
                  .map((element) => (
                    <div key={element.id}>
                      {element.type === 'heading' ? (
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {element.content}
                        </h2>
                      ) : (
                        <p className="leading-relaxed text-gray-900">
                          {element.content}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Page Info */}
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-bold text-blue-900">💡 Editor Tips</h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2">
            <div>
              <h4 className="mb-1 font-semibold">Content Elements:</h4>
              <ul className="space-y-1">
                <li>
                  • <strong>Headings</strong>: Section titles and main topics
                </li>
                <li>
                  • <strong>Paragraphs</strong>: Body text and explanations
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Editor Features:</h4>
              <ul className="space-y-1">
                <li>• Drag to reorder content elements</li>
                <li>• Real-time preview of changes</li>
                <li>• Auto-save warnings for unsaved changes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
