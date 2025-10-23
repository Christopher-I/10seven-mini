/**
 * Admin Questions Dashboard
 * View and manage submitted questions from students
 */

'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/core/components/AppHeader';
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Question {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  question: string;
  category: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'normal' | 'high';
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<
    'all' | 'pending' | 'in-progress' | 'resolved'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load questions from Firebase with real-time updates
    const loadQuestions = () => {
      const questionsQuery = query(
        collection(db, 'questions'),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(
        questionsQuery,
        (snapshot) => {
          const questionsList: Question[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            questionsList.push({
              id: doc.id,
              userId: data.userId || '',
              userEmail: data.userEmail || 'Unknown',
              subject: data.subject || 'No Subject',
              question: data.question || '',
              category: data.category || 'general',
              timestamp:
                data.timestamp?.toDate()?.toISOString() ||
                new Date().toISOString(),
              status: data.status || 'pending',
              priority: data.priority || 'normal',
            });
          });

          setQuestions(questionsList);

          // Also update localStorage for backward compatibility
          localStorage.setItem(
            'admin_questions',
            JSON.stringify(questionsList)
          );
        },
        (error) => {
          console.error('Error loading questions:', error);
          // Fall back to localStorage if Firebase fails
          const storedQuestions = JSON.parse(
            localStorage.getItem('admin_questions') || '[]'
          );
          setQuestions(
            storedQuestions.sort(
              (a: Question, b: Question) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          );
        }
      );

      return unsubscribe;
    };

    const unsubscribe = loadQuestions();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const updateQuestionStatus = async (
    questionId: string,
    newStatus: Question['status']
  ) => {
    try {
      // Update in Firebase
      await updateDoc(doc(db, 'questions', questionId), {
        status: newStatus,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating question status:', error);
      // Fall back to local update if Firebase fails
      const updatedQuestions = questions.map((q) =>
        q.id === questionId ? { ...q, status: newStatus } : q
      );
      setQuestions(updatedQuestions);
      localStorage.setItem('admin_questions', JSON.stringify(updatedQuestions));
    }
  };

  const deleteQuestion = async (questionId: string) => {
    try {
      // Delete from Firebase
      await deleteDoc(doc(db, 'questions', questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
      // Fall back to local delete if Firebase fails
      const updatedQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(updatedQuestions);
      localStorage.setItem('admin_questions', JSON.stringify(updatedQuestions));
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const statusMatch = filter === 'all' || q.status === filter;
    const categoryMatch =
      selectedCategory === 'all' || q.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Student Questions"
        description="Manage and respond to student inquiries"
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/questions', label: 'Questions' },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-none px-4 py-6">
        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Status Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(
                      e.target.value as
                        | 'all'
                        | 'pending'
                        | 'in-progress'
                        | 'resolved'
                    )
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Issue</option>
                  <option value="content">Content Question</option>
                  <option value="account">Account Issue</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Total: {questions.length}</span>
              <span>
                Pending:{' '}
                {questions.filter((q) => q.status === 'pending').length}
              </span>
              <span>Filtered: {filteredQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <div className="mb-4 text-4xl">📝</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No Questions Found
            </h3>
            <p className="text-gray-600">
              {questions.length === 0
                ? 'No student questions have been submitted yet.'
                : 'No questions match the current filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="truncate text-lg font-semibold text-gray-900">
                        {question.subject}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[question.status]}`}
                      >
                        {question.status}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {question.category}
                      </span>
                    </div>
                    <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                      <span>📧 {question.userEmail}</span>
                      <span>
                        🕒 {new Date(question.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="whitespace-pre-wrap text-gray-800">
                        {question.question}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {question.status !== 'pending' && (
                    <button
                      onClick={() =>
                        updateQuestionStatus(question.id, 'pending')
                      }
                      className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-200"
                    >
                      Mark Pending
                    </button>
                  )}
                  {question.status !== 'in-progress' && (
                    <button
                      onClick={() =>
                        updateQuestionStatus(question.id, 'in-progress')
                      }
                      className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200"
                    >
                      Mark In Progress
                    </button>
                  )}
                  {question.status !== 'resolved' && (
                    <button
                      onClick={() =>
                        updateQuestionStatus(question.id, 'resolved')
                      }
                      className="rounded-lg bg-green-100 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-200"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to delete this question?'
                        )
                      ) {
                        deleteQuestion(question.id);
                      }
                    }}
                    className="rounded-lg bg-red-100 px-3 py-1 text-xs font-medium text-red-800 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
