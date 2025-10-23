/**
 * Admin Content Management Dashboard
 * Main content management interface for editing educational content
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/core/components/AppHeader';
import { ContentService } from '@/lib/content-service';
import { ModuleOverview, RecentChange } from '@/lib/content-types';
import { ContentMigration } from '@/lib/content-migration';

interface MigrationResults {
  unit1Page2: { success: boolean; message?: string };
  unit2Page1: { success: boolean; message?: string };
  validation: { success: boolean; details: string };
}

export default function ContentManagementDashboard() {
  const [modules, setModules] = useState<ModuleOverview[]>([]);
  const [recentChanges, setRecentChanges] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [migrationRunning, setMigrationRunning] = useState(false);
  const [migrationResults, setMigrationResults] = useState<MigrationResults | null>(null);

  useEffect(() => {
    loadContentOverview();
  }, []);

  const loadContentOverview = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load module data with content statistics
      const moduleData = await ContentService.getModuleOverview();
      setModules(moduleData);

      // Load recent changes
      const recentData = await ContentService.getRecentChanges(10);
      setRecentChanges(recentData);
    } catch (error) {
      console.error('Error loading content overview:', error);
      setError('Failed to load content overview');
    } finally {
      setLoading(false);
    }
  };

  const runTestMigration = async () => {
    try {
      setMigrationRunning(true);
      setError(null);

      console.log('🚀 Starting test migration...');
      const results = await ContentMigration.runPhase1Migration();

      setMigrationResults(results);

      // Refresh content overview to show new data
      await loadContentOverview();

      console.log('✅ Test migration completed!');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      setError('Migration failed: ' + (error as Error).message);
    } finally {
      setMigrationRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Content Management"
          description="Loading content overview..."
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' }
          ]}
        />
        <main className="mx-auto w-[90%] max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
          title="Content Management"
          description="Content management system"
          breadcrumbs={[
            { href: '/admin', label: 'Admin Dashboard' },
            { href: '/admin/content', label: 'Content Management' }
          ]}
        />
        <main className="mx-auto w-[90%] max-w-7xl px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">Error Loading Content</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadContentOverview}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const totalUnits = modules.reduce((acc, m) => acc + m.units.length, 0);
  const totalContent = modules.reduce((acc, m) => acc + m.totalContent, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Content Management"
        description="Edit educational content across all modules and units"
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/content', label: 'Content Management' }
        ]}
      />

      <main className="mx-auto w-[90%] max-w-7xl px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border">
            <div className="text-2xl font-bold text-gray-900">{modules.length}</div>
            <div className="text-sm text-gray-600">Active Modules</div>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <div className="text-2xl font-bold text-gray-900">{totalUnits}</div>
            <div className="text-sm text-gray-600">Total Units</div>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <div className="text-2xl font-bold text-gray-900">{totalContent}</div>
            <div className="text-sm text-gray-600">Content Elements</div>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <div className="text-2xl font-bold text-gray-900">{recentChanges.length}</div>
            <div className="text-sm text-gray-600">Recent Changes</div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map(module => (
            <Link href={`/admin/content/${module.id}`} key={module.id}>
              <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.units.length} units</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Content Elements</span>
                    <span className="font-medium">{module.totalContent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Modified</span>
                    <span className="text-gray-600">
                      {module.lastModified?.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-green-600 mr-2">✓</span>
                    Ready for editing
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Content Changes</h3>
            <button 
              onClick={loadContentOverview}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Refresh
            </button>
          </div>
          
          {recentChanges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>No recent content changes</p>
              <p className="text-sm">Content edits will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentChanges.map(change => (
                <div key={change.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{change.title}</div>
                    <div className="text-sm text-gray-600">{change.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {change.moduleId} → {change.unitId} → {change.pageId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{change.timestamp}</div>
                    <div className="text-xs text-gray-400">by {change.modifiedBy}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Migration Section */}
        <div className="bg-white rounded-xl p-6 border mb-8">
          <h3 className="font-bold text-gray-900 mb-4">🧪 Phase 1 Testing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Test Migration</h4>
              <p className="text-sm text-gray-600 mb-4">
                Run a test migration to populate sample content and verify the CMS system is working.
              </p>
              <button
                onClick={runTestMigration}
                disabled={migrationRunning}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {migrationRunning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Running Migration...
                  </>
                ) : (
                  <>
                    🔄 Run Test Migration
                  </>
                )}
              </button>
            </div>

            {migrationResults && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Migration Results</h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-2 ${
                    migrationResults.unit1Page2.success ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{migrationResults.unit1Page2.success ? '✅' : '❌'}</span>
                    <span>Unit 1, Page 2: {migrationResults.unit1Page2.success ? 'Success' : 'Failed'}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    migrationResults.unit2Page1.success ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{migrationResults.unit2Page1.success ? '✅' : '❌'}</span>
                    <span>Unit 2, Page 1: {migrationResults.unit2Page1.success ? 'Success' : 'Failed'}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    migrationResults.validation.success ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{migrationResults.validation.success ? '✅' : '❌'}</span>
                    <span>Validation: {migrationResults.validation.success ? 'Passed' : 'Failed'}</span>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    {migrationResults.validation.details}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started with Content Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Editing Content:</h4>
              <ul className="space-y-1">
                <li>• Click on a module to view its units</li>
                <li>• Select a unit to see its pages</li>
                <li>• Choose a page to edit its content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Types:</h4>
              <ul className="space-y-1">
                <li>• Headings: Main section titles</li>
                <li>• Paragraphs: Body text content</li>
                <li>• More types coming in Phase 2</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
