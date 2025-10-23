/**
 * Module Content Management Page
 * View and manage all units within a specific module
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppHeader } from '@/core/components/AppHeader';
import { ContentService } from '@/lib/content-service';
import { UnitOverview } from '@/lib/content-types';

export default function ModuleContentPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [units, setUnits] = useState<UnitOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moduleTitle, setModuleTitle] = useState('');

  useEffect(() => {
    loadModuleData();
  }, [moduleId]);

  const loadModuleData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Set module title based on ID
      const titles: Record<string, string> = {
        'banking-fees': 'Module 2: Banking',
        'credit-system': 'Module 3: Credit System',
        investing: 'Module 4: Investing',
      };
      setModuleTitle(titles[moduleId] || `Module: ${moduleId}`);

      // Load units for this module
      const unitsData = await ContentService.getUnitsOverview(moduleId);
      setUnits(unitsData);
    } catch (error) {
      console.error('Error loading module data:', error);
      setError('Failed to load module data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Loading Module..."
          description="Loading module content"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' },
            { href: `/admin/content/${moduleId}`, label: 'Loading...' },
          ]}
        />
        <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border bg-white p-6"
              >
                <div className="mb-3 h-6 rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
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
          description="Error loading module content"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' },
            { href: `/admin/content/${moduleId}`, label: 'Error' },
          ]}
        />
        <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-800">
              Error Loading Module
            </h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadModuleData}
              className="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const totalPages = units.reduce((acc, unit) => acc + unit.pages.length, 0);
  const totalContent = units.reduce((acc, unit) => acc + unit.contentCount, 0);
  const unitsWithContent = units.filter((unit) => unit.contentCount > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title={moduleTitle}
        description={`Manage content for all units in ${moduleTitle}`}
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/content', label: 'Content Management' },
          { href: `/admin/content/${moduleId}`, label: moduleTitle },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-6xl px-4 py-6">
        {/* Module Overview Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {units.length}
            </div>
            <div className="text-sm text-gray-600">Total Units</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">{totalPages}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {totalContent}
            </div>
            <div className="text-sm text-gray-600">Content Elements</div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="text-2xl font-bold text-gray-900">
              {unitsWithContent}/{units.length}
            </div>
            <div className="text-sm text-gray-600">Units with Content</div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => {
            const completionPercentage =
              unit.pages.length > 0
                ? Math.round(
                    (unit.pages.filter((p) => p.hasContent).length /
                      unit.pages.length) *
                      100
                  )
                : 0;

            return (
              <Link
                href={`/admin/content/${moduleId}/${unit.id}`}
                key={unit.id}
              >
                <div className="cursor-pointer rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 font-bold text-gray-900">
                        {unit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {unit.pages.length} pages
                      </p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        completionPercentage === 100
                          ? 'bg-green-100 text-green-800'
                          : completionPercentage > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {completionPercentage}%
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Content Elements</span>
                      <span className="font-medium">{unit.contentCount}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Pages with Content</span>
                      <span className="font-medium">
                        {unit.pages.filter((p) => p.hasContent).length}/
                        {unit.pages.length}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Last Modified</span>
                      <span className="text-gray-600">
                        {unit.lastModified?.toLocaleDateString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-xs text-gray-500">
                        <span>Content Progress</span>
                        <span>{completionPercentage}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full transition-all ${
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
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        {completionPercentage === 100 ? (
                          <>
                            <span className="mr-2 text-green-600">✓</span>
                            Complete
                          </>
                        ) : completionPercentage > 0 ? (
                          <>
                            <span className="mr-2 text-yellow-600">⚠</span>In
                            Progress
                          </>
                        ) : (
                          <>
                            <span className="mr-2 text-gray-400">○</span>Not
                            Started
                          </>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Module Actions */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 font-bold text-gray-900">Module Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              onClick={loadModuleData}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50"
            >
              <span>🔄</span>
              <span>Refresh Data</span>
            </button>

            <Link href={`/admin/content`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
                <span>⬅️</span>
                <span>Back to Modules</span>
              </button>
            </Link>

            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 p-3 text-white transition-colors hover:bg-purple-700"
              onClick={() => alert('Bulk operations coming in Phase 2!')}
            >
              <span>📝</span>
              <span>Bulk Edit</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-bold text-blue-900">
            💡 Module Management Tips
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Content Status:</h4>
              <ul className="space-y-1">
                <li>
                  • <span className="text-green-600">Green (100%)</span>: Unit
                  complete
                </li>
                <li>
                  • <span className="text-yellow-600">Yellow (1-99%)</span>:
                  Partial content
                </li>
                <li>
                  • <span className="text-gray-500">Gray (0%)</span>: No content
                  yet
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Complete units sequentially</li>
                <li>• Review content before publishing</li>
                <li>• Use consistent formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
