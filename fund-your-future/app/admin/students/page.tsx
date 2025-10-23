/**
 * Admin Students Management
 * View and manage student accounts, progress, and performance
 */

'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/core/components/AppHeader';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface StoredQuestion {
  userEmail: string;
  category?: string;
  content: string;
  timestamp: string;
  userId: string;
}

interface Student {
  id: string;
  email: string;
  displayName: string;
  joinedDate: string;
  lastActive: string;
  totalProgress: number;
  modulesCompleted: number;
  currentModule: string | null;
  status: 'active' | 'inactive' | 'completed';
  questionsAsked: number;
  avgScore: number;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive' | 'completed'
  >('all');
  const [sortBy, setSortBy] = useState<
    'name' | 'progress' | 'lastActive' | 'score'
  >('lastActive');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Load real students data from Firebase
    const loadStudents = async () => {
      try {
        // Get all users from Firebase
        const usersQuery = query(
          collection(db, 'users'),
          orderBy('createdAt', 'desc')
        );

        const usersSnapshot = await getDocs(usersQuery);
        const studentsList: Student[] = [];

        // Process each user
        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();

          // Get user progress data if it exists
          let progressData = {
            totalProgress: 0,
            modulesCompleted: [],
            currentModule: 'Module 2: Banking',
            avgScore: 0,
          };

          try {
            const progressDoc = await getDoc(
              doc(db, 'user_progress', userDoc.id)
            );
            if (progressDoc.exists()) {
              const progress = progressDoc.data();
              progressData = {
                totalProgress: progress.totalProgress || 0,
                modulesCompleted: progress.completedModules || [],
                currentModule: progress.currentModule || 'Module 2: Banking',
                avgScore: progress.avgScore || 0,
              };
            }
          } catch (error) {
            console.error(
              'Error fetching progress for user:',
              userDoc.id,
              error
            );
          }

          // Get questions count from localStorage for now
          const storedQuestions = JSON.parse(
            localStorage.getItem('admin_questions') || '[]'
          );
          const userQuestions = storedQuestions.filter(
            (q: StoredQuestion) => q.userEmail === userData.email
          ).length;

          // Determine status based on last active time
          const lastActive =
            userData.lastActive?.toDate() ||
            userData.createdAt?.toDate() ||
            new Date();
          const daysSinceActive =
            (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
          let status: Student['status'] = 'active';

          if (progressData.totalProgress >= 100) {
            status = 'completed';
          } else if (daysSinceActive > 7) {
            status = 'inactive';
          }

          studentsList.push({
            id: userDoc.id,
            email: userData.email || 'No email',
            displayName:
              userData.displayName ||
              userData.email?.split('@')[0] ||
              'Unknown',
            joinedDate:
              userData.createdAt?.toDate()?.toISOString().split('T')[0] ||
              new Date().toISOString().split('T')[0],
            lastActive: lastActive.toISOString().split('T')[0],
            totalProgress: progressData.totalProgress,
            modulesCompleted: progressData.modulesCompleted.length,
            currentModule:
              progressData.totalProgress >= 100
                ? null
                : progressData.currentModule,
            status,
            questionsAsked: userQuestions,
            avgScore: progressData.avgScore,
          });
        }

        setStudents(studentsList);
      } catch (error) {
        console.error('Error loading students:', error);
        setStudents([]);
      }
    };

    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.displayName.localeCompare(b.displayName);
        case 'progress':
          return b.totalProgress - a.totalProgress;
        case 'score':
          return b.avgScore - a.avgScore;
        case 'lastActive':
        default:
          return (
            new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
          );
      }
    });

    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter, sortBy]);

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-purple-600';
    return 'text-red-600';
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Student Management"
        description="Monitor student progress and engagement across all modules"
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/students', label: 'Students' },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-none px-4 py-6">
        {/* Filters and Search */}
        <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:w-64"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | 'all'
                      | 'active'
                      | 'inactive'
                      | 'completed'
                  )
                }
                className="rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | 'name'
                      | 'progress'
                      | 'lastActive'
                      | 'score'
                  )
                }
                className="rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              >
                <option value="lastActive">Last Active</option>
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="score">Average Score</option>
              </select>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Total: {students.length}</span>
              <span>Filtered: {filteredStudents.length}</span>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Current Module
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-orange-500">
                          <span className="font-medium text-white">
                            {student.displayName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.displayName}
                          </div>
                          <div className="text-sm text-blue-600 hover:text-blue-800">
                            <a
                              href={`mailto:${student.email}`}
                              className="hover:underline"
                            >
                              {student.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${getProgressColor(student.totalProgress)}`}
                          >
                            {student.totalProgress}%
                          </div>
                          <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-purple-500"
                              style={{ width: `${student.totalProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {student.currentModule || 'All modules completed'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.modulesCompleted} modules completed
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.avgScore}%
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(student)}
                        className="mr-4 text-purple-600 hover:text-purple-900"
                      >
                        View Details
                      </button>
                      <a
                        href={`mailto:${student.email}`}
                        className="text-blue-600 hover:text-blue-900 hover:underline"
                      >
                        Email Student
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <div className="mb-4 text-4xl">👥</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No Students Found
            </h3>
            <p className="text-gray-600">
              {students.length === 0
                ? 'No students have registered yet.'
                : 'No students match the current filters.'}
            </p>
          </div>
        )}
      </main>

      {/* Student Details Modal */}
      {showDetails && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Student Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="mb-3 text-lg font-medium text-gray-900">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="text-sm text-gray-900">
                        {selectedStudent.displayName}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="text-sm text-blue-600">
                        <a
                          href={`mailto:${selectedStudent.email}`}
                          className="hover:underline"
                        >
                          {selectedStudent.email}
                        </a>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Joined
                      </label>
                      <div className="text-sm text-gray-900">
                        {new Date(
                          selectedStudent.joinedDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Last Active
                      </label>
                      <div className="text-sm text-gray-900">
                        {new Date(
                          selectedStudent.lastActive
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div>
                  <h4 className="mb-3 text-lg font-medium text-gray-900">
                    Progress Overview
                  </h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedStudent.totalProgress}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Overall Progress
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedStudent.modulesCompleted}
                      </div>
                      <div className="text-sm text-gray-600">Modules Done</div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedStudent.avgScore}%
                      </div>
                      <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedStudent.questionsAsked}
                      </div>
                      <div className="text-sm text-gray-600">
                        Questions Asked
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <h4 className="mb-3 text-lg font-medium text-gray-900">
                    Current Status
                  </h4>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(selectedStudent.status)}`}
                      >
                        {selectedStudent.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        {selectedStudent.currentModule ||
                          'All modules completed'}
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-purple-500"
                        style={{ width: `${selectedStudent.totalProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selectedStudent.email}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                  >
                    📧 Email Student
                  </a>
                  <a
                    href={`mailto:${selectedStudent.email}?subject=Fund Your Future Progress Update&body=Hi ${selectedStudent.displayName},%0D%0A%0D%0AI wanted to check in about your progress in the Fund Your Future program...`}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-center text-white hover:bg-purple-700"
                  >
                    📝 Quick Check-in
                  </a>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
