/**
 * Question Submission Modal
 * Allows students to submit questions that will be received by admins
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface QuestionSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionSubmissionModal({
  isOpen,
  onClose,
}: QuestionSubmissionModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    question: '',
    category: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const { user } = useAuth();

  const categories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'content', label: 'Content Question' },
    { value: 'account', label: 'Account Issue' },
    { value: 'suggestion', label: 'Suggestion' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.subject.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create question submission data
      const questionData = {
        id: Date.now().toString(),
        userId: user?.uid || 'anonymous',
        userEmail: user?.email || 'anonymous@example.com',
        subject: formData.subject.trim(),
        question: formData.question.trim(),
        category: formData.category,
        timestamp: new Date().toISOString(),
        status: 'pending',
        priority: 'normal',
      };

      // Store in localStorage for now (in production, this would be sent to a database)
      const existingQuestions = JSON.parse(
        localStorage.getItem('admin_questions') || '[]'
      );
      existingQuestions.push(questionData);
      localStorage.setItem(
        'admin_questions',
        JSON.stringify(existingQuestions)
      );

      // In a real app, you would also send this to your backend/Firebase
      // await submitQuestionToDatabase(questionData);

      setSubmitStatus('success');
      setFormData({ subject: '', question: '', category: 'general' });

      // Close modal after success message
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Ask a Question
              </h2>
              <p className="text-sm text-gray-600">
                We'll get back to you soon!
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {submitStatus === 'success' ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-4xl">✅</div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Question Submitted!
                </h3>
                <p className="text-sm text-gray-600">
                  Thank you for your question. An admin will review it and get
                  back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange('category', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange('subject', e.target.value)
                    }
                    placeholder="Brief description of your question"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Question */}
                <div>
                  <label
                    htmlFor="question"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) =>
                      handleInputChange('question', e.target.value)
                    }
                    placeholder="Please describe your question in detail..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* User Info Display */}
                {user && (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-600">
                      Submitting as:{' '}
                      <span className="font-medium">{user.email}</span>
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">
                      Failed to submit question. Please try again.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.question.trim() ||
                      !formData.subject.trim()
                    }
                    className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting...
                      </div>
                    ) : (
                      'Submit Question'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
