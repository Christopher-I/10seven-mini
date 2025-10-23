/**
 * Admin Dashboard - Main Overview
 * Central hub for managing the Fund Your Future platform
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/core/components/AppHeader';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  completedModules: number;
  avgCompletionRate: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    completedModules: 0,
    avgCompletionRate: 0,
  });

  const [recentActivity, setRecentActivity] = useState<
    Array<{
      id: string;
      type: 'registration' | 'completion' | 'question' | 'progress';
      user: string;
      action: string;
      timestamp: string;
    }>
  >([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Wait for authentication first
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        '🔐 Admin dashboard auth state changed:',
        user?.email || 'No user'
      );
      setIsAuthenticated(!!user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(
      '🔍 Admin dashboard useEffect - isAuthenticated:',
      isAuthenticated,
      'authLoading:',
      authLoading
    );
    if (!isAuthenticated || authLoading) {
      console.log('❌ Not loading data - auth check failed');
      return;
    }
    console.log('✅ Auth check passed, loading data...');

    // Load real dashboard data from Firebase
    const loadDashboardData = async () => {
      try {
        console.log('🔄 Loading admin dashboard data...');

        // Get total users count
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalStudents = usersSnapshot.size;
        console.log(`📊 Total users found: ${totalStudents}`);

        // Get active users (active in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const activeUsersQuery = query(
          collection(db, 'users'),
          where('progress.lastActive', '>=', Timestamp.fromDate(sevenDaysAgo))
        );
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        const activeStudents = activeUsersSnapshot.size;
        console.log(`🟢 Active users (last 7 days): ${activeStudents}`);

        // Get user progress data for completion stats from users collection
        let totalModulesCompleted = 0;
        let totalCompletionRate = 0;
        let usersWithProgress = 0;

        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          const progress = data.progress;

          if (progress?.modules) {
            // Count completed modules
            Object.values(progress.modules).forEach((module: unknown) => {
              const moduleData = module as { completed?: boolean };
              if (moduleData.completed) {
                totalModulesCompleted++;
              }
            });
          }

          // Sum up completion rates
          if (progress?.overallCompletionRate !== undefined) {
            totalCompletionRate += progress.overallCompletionRate;
            usersWithProgress++;
          }
        });

        const avgCompletionRate =
          usersWithProgress > 0
            ? Math.round(totalCompletionRate / usersWithProgress)
            : 0;

        // Always use Firebase data (no fallback needed since we have real data)
        console.log(`📋 Total users: ${totalStudents}`);
        console.log(`📊 Modules completed: ${totalModulesCompleted}`);
        console.log(`📈 Avg completion rate: ${avgCompletionRate}%`);
        console.log(`🟢 Active users (last 7 days): ${activeStudents}`);
        console.log(`👤 Users with progress data: ${usersWithProgress}`);

        setStats({
          totalStudents,
          activeStudents,
          completedModules: totalModulesCompleted,
          avgCompletionRate,
        });

        console.log('✅ Admin dashboard data loaded successfully!');
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Set default values on error
        setStats({
          totalStudents: 0,
          activeStudents: 0,
          completedModules: 0,
          avgCompletionRate: 0,
        });
      }
    };

    // Load recent activity from Firebase
    const loadRecentActivity = () => {
      // Set up real-time listener for user activity
      const activityQuery = query(
        collection(db, 'activity_log'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const unsubscribe = onSnapshot(
        activityQuery,
        (snapshot) => {
          const activities: typeof recentActivity = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            activities.push({
              id: doc.id,
              type: data.type || 'progress',
              user: data.userDisplayName || 'Unknown User',
              action: data.action || 'Activity',
              timestamp:
                data.timestamp?.toDate()?.toISOString() ||
                new Date().toISOString(),
            });
          });

          // If no activities found, show empty state
          if (activities.length === 0) {
            setRecentActivity([]);
          } else {
            setRecentActivity(activities);
          }
        },
        (error) => {
          console.error('Error loading activity:', error);
          setRecentActivity([]);
        }
      );

      return unsubscribe;
    };

    loadDashboardData();
    const unsubscribe = loadRecentActivity();

    // Refresh dashboard data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);

    return () => {
      clearInterval(interval);
      if (unsubscribe) unsubscribe();
    };
  }, [isAuthenticated, authLoading]); // Add dependencies so effect runs when auth state changes

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return '👋';
      case 'completion':
        return '🎉';
      case 'question':
        return '❓';
      case 'progress':
        return '📈';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'registration':
        return 'text-blue-600';
      case 'completion':
        return 'text-green-600';
      case 'question':
        return 'text-purple-600';
      case 'progress':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔄</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Loading Admin Dashboard...
          </h2>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔐</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Authentication Required
          </h2>
          <p className="mb-4 text-gray-600">
            Please log in to access the admin dashboard.
          </p>
          <a
            href="/login"
            className="inline-block rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Admin Dashboard"
        description="Monitor platform performance and student engagement"
        breadcrumbs={[{ href: '/admin', label: 'Admin Dashboard' }]}
      />

      <main className="mx-auto w-[90%] max-w-none px-4 py-6">
        {/* Quick Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Students
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.activeStudents}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Modules Completed
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.completedModules}
                </p>
              </div>
              <div className="text-2xl">📚</div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.avgCompletionRate}%
                </p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/students"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <div>
                    <p className="font-medium text-gray-900">Manage Students</p>
                    <p className="text-sm text-gray-600">
                      View progress & profiles
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>

              <Link
                href="/admin/questions"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">❓</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Student Questions
                    </p>
                    <p className="text-sm text-gray-600">Manage Q&A</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>

              <Link
                href="/admin/analytics"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-gray-900">Analytics</p>
                    <p className="text-sm text-gray-600">Usage & performance</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>

              <Link
                href="/admin/content"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📝</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Content Management
                    </p>
                    <p className="text-sm text-gray-600">
                      Edit modules & units
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Platform Settings
                    </p>
                    <p className="text-sm text-gray-600">Configure system</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <Link
                href="/admin/activity"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                View all →
              </Link>
            </div>

            {recentActivity.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-4xl">📊</div>
                <h4 className="mb-2 text-lg font-medium text-gray-900">
                  No Recent Activity
                </h4>
                <p className="text-gray-600">
                  Student activity will appear here as it happens.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"
                  >
                    <span className="text-xl">
                      {getActivityIcon(activity.type)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="truncate font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${getActivityColor(activity.type)} bg-current bg-opacity-10`}
                        >
                          {activity.type}
                        </span>
                      </div>
                      <p className="mb-1 text-sm text-gray-600">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Module Performance Overview */}
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Module Performance
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-center">
              <h4 className="mb-2 font-medium text-gray-900">
                Module 2: Banking
              </h4>
              <div className="mb-1 text-2xl font-bold text-blue-600">
                Available
              </div>
              <p className="text-sm text-gray-600">5 Units • 100+ Pages</p>
              <div className="mt-2 h-2 rounded-full bg-blue-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center">
              <h4 className="mb-2 font-medium text-gray-900">
                Module 3: Credit
              </h4>
              <div className="mb-1 text-2xl font-bold text-gray-600">
                Coming Soon
              </div>
              <p className="text-sm text-gray-600">Under Development</p>
              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gray-400"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center">
              <h4 className="mb-2 font-medium text-gray-900">
                Module 4: Investing
              </h4>
              <div className="mb-1 text-2xl font-bold text-gray-600">
                Coming Soon
              </div>
              <p className="text-sm text-gray-600">Under Development</p>
              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gray-400"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
