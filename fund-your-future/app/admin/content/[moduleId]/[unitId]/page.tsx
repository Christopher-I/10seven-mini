/**
 * Unit Content Management Page
 * View and manage all pages within a specific unit
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppHeader } from '@/core/components/AppHeader';
import { ContentService } from '@/lib/content-service';
import { PageOverview } from '@/lib/content-types';

export default function UnitContentPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const unitId = params.unitId as string;

  const [pages, setPages] = useState<PageOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [unitTitle, setUnitTitle] = useState('');

  useEffect(() => {
    loadUnitData();
  }, [moduleId, unitId]);

  const loadUnitData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Set titles based on IDs
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

      // Load pages for this unit
      const pagesData = await ContentService.getPagesOverview(moduleId, unitId);

      // Generate default pages and merge with actual content
      const defaultPages = generateDefaultPages(unitId);

      if (pagesData.length === 0) {
        // No content exists, use defaults
        setPages(defaultPages);
      } else {
        // Merge: prioritize actual content, fill gaps with defaults
        const mergedPages = [...defaultPages];

        // Replace default pages with actual content where available
        pagesData.forEach((actualPage) => {
          const index = mergedPages.findIndex((p) => p.id === actualPage.id);
          if (index >= 0) {
            mergedPages[index] = actualPage;
          } else {
            mergedPages.push(actualPage);
          }
        });

        setPages(
          mergedPages.sort((a, b) => {
            const aNum = parseInt(a.id.replace('page-', ''));
            const bNum = parseInt(b.id.replace('page-', ''));
            return aNum - bNum;
          })
        );
      }
    } catch (error) {
      console.error('Error loading unit data:', error);
      setError('Failed to load unit data');
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultPages = (unitId: string): PageOverview[] => {
    // Generate default page structure based on unit
    const pageCounts: Record<string, number> = {
      'unit-1-basics': 8, // Already implemented
      'unit-2-fees': 23, // From PDF specification
      'unit-3-accounts': 18,
      'unit-4-relationships': 15,
      'unit-5-alternatives': 20,
    };

    const pageCount = pageCounts[unitId] || 10;
    const defaultPages: PageOverview[] = [];

    for (let i = 1; i <= pageCount; i++) {
      defaultPages.push({
        id: `page-${i}`,
        title: `Page ${i}`,
        elementCount: 0,
        hasContent: false,
        lastModified: new Date(),
      });
    }

    return defaultPages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Loading Unit..."
          description="Loading unit content"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' },
            { href: `/admin/content/${moduleId}`, label: 'Loading...' },
            {
              href: `/admin/content/${moduleId}/${unitId}`,
              label: 'Loading...',
            },
          ]}
        />
        <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border bg-white p-4"
              >
                <div className="mb-2 h-5 rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Error"
          description="Error loading unit content"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' },
            { href: `/admin/content/${moduleId}`, label: moduleTitle },
            { href: `/admin/content/${moduleId}/${unitId}`, label: 'Error' },
          ]}
        />
        <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-800">
              Error Loading Unit
            </h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadUnitData}
              className="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const totalPages = pages.length;
  const pagesWithContent = pages.filter((p) => p.hasContent).length;
  const totalElements = pages.reduce((acc, page) => acc + page.elementCount, 0);
  const completionPercentage =
    totalPages > 0 ? Math.round((pagesWithContent / totalPages) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title={unitTitle}
        description={`Manage content for all pages in ${unitTitle}`}
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/content', label: 'Content Management' },
          { href: `/admin/content/${moduleId}`, label: moduleTitle },
          { href: `/admin/content/${moduleId}/${unitId}`, label: unitTitle },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
        {/* Unit Overview Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">{totalPages}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {pagesWithContent}
            </div>
            <div className="text-sm text-gray-600">Pages with Content</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {totalElements}
            </div>
            <div className="text-sm text-gray-600">Content Elements</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 rounded-xl border bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Unit Progress</h3>
            <span className="text-sm text-gray-600">
              {pagesWithContent}/{totalPages} pages
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className={`h-3 rounded-full transition-all ${
                completionPercentage === 100
                  ? 'bg-green-500'
                  : completionPercentage > 0
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {pages.map((page) => (
            <Link
              href={`/admin/content/${moduleId}/${unitId}/${page.id}`}
              key={page.id}
            >
              <div
                className={`cursor-pointer rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${
                  page.hasContent
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <h4 className="font-medium text-gray-900">{page.title}</h4>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      page.hasContent ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Elements</span>
                    <span className="font-medium">{page.elementCount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`font-medium ${
                        page.hasContent ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {page.hasContent ? 'Has Content' : 'Empty'}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <div className="text-xs text-gray-500">
                      {page.lastModified.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-3 border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        page.hasContent
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {page.hasContent ? 'Ready' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-400">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Unit Actions */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 font-bold text-gray-900">Unit Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <button
              onClick={loadUnitData}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>

            <Link href={`/admin/content/${moduleId}`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
                <span>⬅️</span>
                <span>Back to Module</span>
              </button>
            </Link>

            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
              onClick={() => alert('Bulk page creation coming in Phase 2!')}
            >
              <span>📝</span>
              <span>Bulk Create</span>
            </button>

            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 p-3 text-white transition-colors hover:bg-purple-700"
              onClick={() => alert('Unit preview coming in Phase 2!')}
            >
              <span>👁️</span>
              <span>Preview Unit</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-bold text-blue-900">
            💡 Page Management Tips
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Page Status Indicators:</h4>
              <ul className="space-y-1">
                <li>
                  • <span className="text-green-600">Green dot</span>: Page has
                  content
                </li>
                <li>
                  • <span className="text-gray-500">Gray dot</span>: Page is
                  empty
                </li>
                <li>
                  • <span className="text-green-600">Green border</span>:
                  Content ready
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Content Creation:</h4>
              <ul className="space-y-1">
                <li>• Click any page to start editing</li>
                <li>• Add headings and paragraphs</li>
                <li>• Content saves automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
