/**
 * Drag-Drop Quiz Component for Unit 1
 * Trauma-informed 5-question quiz with gentle feedback
 */

'use client';

import { useState, useEffect } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';
import { QUIZ_QUESTIONS } from '../data/vocabulary';
import type { QuizQuestion } from '../data/vocabulary';

interface DragDropQuizProps {
  onComplete: (data: {
    quizCompleted: boolean;
    score: number;
    answers: QuizAnswer[];
    testOut?: boolean;
  }) => void;
  allowTestOut?: boolean;
}

interface QuizAnswer {
  questionId: number;
  userAnswers: string[];
  correct: boolean;
  attempts: number;
}

interface DroppedItem {
  definitionIndex: number;
  term: string;
}

const STORAGE_KEY = 'unit-1-quiz-progress';
const TEST_OUT_QUESTIONS = [1, 3, 4, 5]; // 4 representative questions for test-out
const TEST_OUT_PASSING_SCORE = 0.75; // 75% = 3/4 questions correct

export function DragDropQuiz({
  onComplete,
  allowTestOut = false,
}: DragDropQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTestOutOption, setShowTestOutOption] = useState(false);
  const [isTestOut, setIsTestOut] = useState(false);
  const [testOutPassed, setTestOutPassed] = useState(false);

  // Get questions based on test-out mode or regular mode
  const activeQuestions = isTestOut
    ? QUIZ_QUESTIONS.filter((q) => TEST_OUT_QUESTIONS.includes(q.id))
    : QUIZ_QUESTIONS;

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === activeQuestions.length - 1;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress.completed) {
        setAnswers(progress.answers);
        setIsCompleted(true);
        if (progress.testOutPassed) {
          setTestOutPassed(true);
        }
      }
    }

    // Show test-out option if allowed and no previous completion
    if (allowTestOut && !savedProgress) {
      setShowTestOutOption(true);
    }
  }, [allowTestOut]);

  // Save progress
  const saveProgress = (
    progressAnswers: QuizAnswer[],
    completed = false,
    testOutPassed = false
  ) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers: progressAnswers,
        completed,
        testOutPassed,
      })
    );
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, term: string) => {
    setDraggedTerm(term);
    e.dataTransfer.setData('text/plain', term);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, definitionIndex: number) => {
    e.preventDefault();
    const term = e.dataTransfer.getData('text/plain');

    // Remove any existing item in this drop zone
    const updatedItems = droppedItems.filter(
      (item) => item.definitionIndex !== definitionIndex
    );

    // Add the new item
    updatedItems.push({ definitionIndex, term });
    setDroppedItems(updatedItems);
    setDraggedTerm(null);
  };

  // Remove dropped item
  const handleRemoveItem = (definitionIndex: number) => {
    setDroppedItems(
      droppedItems.filter((item) => item.definitionIndex !== definitionIndex)
    );
  };

  // Mobile: Handle term selection
  const handleTermSelect = (term: string) => {
    if (!isMobile) return;
    setSelectedTerm(selectedTerm === term ? null : term);
  };

  // Mobile: Handle definition tap
  const handleDefinitionTap = (definitionIndex: number) => {
    if (!isMobile || !selectedTerm) return;

    // Remove any existing item in this drop zone
    const updatedItems = droppedItems.filter(
      (item) => item.definitionIndex !== definitionIndex
    );
    // Add the new item
    updatedItems.push({ definitionIndex, term: selectedTerm });
    setDroppedItems(updatedItems);
    setSelectedTerm(null); // Clear selection after placement
  };

  // Check answers
  const checkAnswers = () => {
    if (droppedItems.length !== currentQuestion.definitions.length) {
      return; // Not all definitions have answers
    }

    const userAnswers = currentQuestion.definitions.map((_, index) => {
      const droppedItem = droppedItems.find(
        (item) => item.definitionIndex === index
      );
      return droppedItem ? droppedItem.term : '';
    });

    const correct = userAnswers.every(
      (answer, index) => answer === currentQuestion.correctAnswers[index]
    );

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setIsCorrect(correct);
    setShowFeedback(true);

    // Save answer
    const answerData: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswers,
      correct,
      attempts: newAttempts,
    };

    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === currentQuestion.id
    );

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = answerData;
    } else {
      updatedAnswers.push(answerData);
    }

    setAnswers(updatedAnswers);

    if (correct) {
      saveProgress(updatedAnswers);
    }
  };

  // Handle next question or completion
  const handleNext = () => {
    if (isLastQuestion) {
      // Quiz completed
      const finalScore = answers.filter((a) => a.correct).length;
      const totalQuestions = activeQuestions.length;

      if (isTestOut) {
        // Check if test-out passed
        const testOutScore = finalScore / totalQuestions;
        const passed = testOutScore >= TEST_OUT_PASSING_SCORE;
        setTestOutPassed(passed);

        if (passed) {
          setIsCompleted(true);
          saveProgress(answers, true, true); // Save with testOut flag
          onComplete({
            quizCompleted: true,
            score: finalScore,
            answers,
            testOut: true,
          });
        } else {
          // Test-out failed, restart with full quiz
          setIsTestOut(false);
          setCurrentQuestionIndex(0);
          setAnswers([]);
          setDroppedItems([]);
          setShowFeedback(false);
          setIsCorrect(false);
          setAttempts(0);
        }
      } else {
        // Regular quiz completion
        setIsCompleted(true);
        saveProgress(answers, true);
        onComplete({
          quizCompleted: true,
          score: finalScore,
          answers,
        });
      }
    } else {
      // Next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setDroppedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);
      setAttempts(0);
    }
  };

  // Try again
  const handleTryAgain = () => {
    setDroppedItems([]);
    setShowFeedback(false);
  };

  // Start test-out quiz
  const handleStartTestOut = () => {
    setShowTestOutOption(false);
    setIsTestOut(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setDroppedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
  };

  // Start regular quiz
  const handleStartRegular = () => {
    setShowTestOutOption(false);
    setIsTestOut(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setDroppedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
  };

  // Reset quiz
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setDroppedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
    setIsCompleted(false);
    setShowTestOutOption(allowTestOut);
    setIsTestOut(false);
    setTestOutPassed(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Show test-out option screen
  if (showTestOutOption) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
          <div className="mb-4 text-4xl">🎯</div>
          <h3 className="mb-2 text-xl font-bold text-blue-900">
            Test Out Option
          </h3>
          <p className="mb-4 text-blue-800">
            Already know banking vocabulary? Take a quick 4-question assessment
            to test out of the full learning module.
          </p>
          <div className="mt-4 rounded-lg bg-white p-4">
            <h4 className="mb-3 font-semibold text-gray-900">
              Choose your path:
            </h4>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong>Test Out (4 questions):</strong> Score 75% or higher to
                skip directly to the next unit
              </div>
              <div className="text-sm text-gray-700">
                <strong>Full Learning (5 questions + flashcards):</strong>{' '}
                Complete the full vocabulary learning experience
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <AnimatedButton
              onClick={handleStartTestOut}
              variant="primary"
              size="lg"
            >
              Take Test Out (4 questions)
            </AnimatedButton>
            <AnimatedButton
              onClick={handleStartRegular}
              variant="outline"
              size="lg"
            >
              Full Learning Experience
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const finalScore = answers.filter((a) => a.correct).length;
    const totalQuestions = isTestOut
      ? TEST_OUT_QUESTIONS.length
      : QUIZ_QUESTIONS.length;
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
          <div className="mb-4 text-4xl">{testOutPassed ? '🏆' : '🎉'}</div>
          <h3 className="mb-2 text-xl font-bold text-purple-900">
            {testOutPassed ? 'Test Out Successful!' : 'Quiz Complete!'}
          </h3>
          <p className="mb-4 text-purple-800">
            {testOutPassed
              ? `Excellent! You scored ${finalScore} out of ${totalQuestions} questions correct (${percentage}%). You've demonstrated mastery and can skip to the next unit.`
              : `You got ${finalScore} out of ${totalQuestions} questions correct (${percentage}%)`}
          </p>

          <div className="mt-4 rounded-lg bg-white p-4">
            <h4 className="mb-3 font-semibold text-gray-900">Your Results:</h4>
            <div className="space-y-2 text-sm text-gray-900">
              {answers.map((answer, index) => (
                <div
                  key={answer.questionId}
                  className="flex items-center justify-between"
                >
                  <span>Question {index + 1}</span>
                  <span
                    className={`font-medium ${answer.correct ? 'text-purple-700' : 'text-blue-700'}`}
                  >
                    {answer.correct ? '✓ Correct' : 'Reviewed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <AnimatedButton onClick={handleReset} variant="outline" size="md">
              Take Quiz Again
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  const allTermsUsed =
    droppedItems.length === currentQuestion.definitions.length;
  const availableTerms = currentQuestion.terms.filter(
    (term) => !droppedItems.some((item) => item.term === term)
  );

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="text-center">
        <div className="mb-2 text-sm text-gray-600">
          {isTestOut && (
            <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
              TEST OUT
            </span>
          )}
          Question {currentQuestionIndex + 1} of {activeQuestions.length}
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${isTestOut ? 'bg-blue-600' : 'bg-gray-600'}`}
            style={{
              width: `${(currentQuestionIndex / activeQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-lg bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-700">
          <strong>Instructions:</strong>{' '}
          {isMobile
            ? 'Tap a term below, then tap the definition box where it belongs.'
            : 'Drag the terms from the bottom to match their definitions above.'}
        </p>
        {isMobile && selectedTerm && (
          <div className="mt-2 text-sm font-medium text-purple-700">
            Selected: "{selectedTerm}" - Now tap a definition box above
          </div>
        )}
      </div>

      {/* Drop zones (Definitions) */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Definitions:</h3>
        {currentQuestion.definitions.map((definition, index) => (
          <div
            key={index}
            className={`relative min-h-[80px] rounded-lg border-2 border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 ${
              isMobile && selectedTerm
                ? 'cursor-pointer border-purple-400 bg-purple-50'
                : ''
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => handleDefinitionTap(index)}
          >
            <div className="mb-2 text-sm text-gray-700">{definition}</div>

            {droppedItems.find((item) => item.definitionIndex === index) ? (
              <div className="absolute right-2 top-2">
                <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium text-white">
                  {
                    droppedItems.find((item) => item.definitionIndex === index)
                      ?.term
                  }
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="ml-1 text-gray-300 hover:text-white"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute right-2 top-2 text-xs text-gray-600">
                Drop term here
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Drag items (Terms) */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Terms:</h3>
        <div className="flex flex-wrap gap-2">
          {availableTerms.map((term) => (
            <div
              key={term}
              draggable
              onDragStart={(e) => handleDragStart(e, term)}
              onClick={() => handleTermSelect(term)}
              className={`cursor-move select-none rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 ${
                isMobile && selectedTerm === term
                  ? 'bg-purple-700 ring-2 ring-purple-400'
                  : ''
              }`}
              style={{ touchAction: 'none' }}
            >
              {term}
            </div>
          ))}
        </div>

        {availableTerms.length === 0 && (
          <div className="text-sm italic text-gray-500">
            All terms have been used. Ready to check your answers!
          </div>
        )}
      </div>

      {/* Check answers button */}
      {allTermsUsed && !showFeedback && (
        <div className="text-center">
          <AnimatedButton onClick={checkAnswers} variant="primary" size="lg">
            Check Answers
          </AnimatedButton>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`rounded-lg p-6 ${isCorrect ? 'border border-purple-200 bg-purple-50' : 'border border-blue-200 bg-blue-50'}`}
        >
          {isCorrect ? (
            <div className="text-center">
              <div className="mb-2 text-2xl">✅</div>
              <h4 className="mb-2 font-semibold text-purple-900">
                Excellent work!
              </h4>
              <p className="mb-4 text-purple-800">
                You got all the definitions correct on this question.
              </p>
              <AnimatedButton onClick={handleNext} variant="success" size="lg">
                {isLastQuestion ? 'Complete Quiz' : 'Next Question'} →
              </AnimatedButton>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-2 text-2xl">💙</div>
              <h4 className="mb-2 font-semibold text-blue-900">
                {isTestOut && isLastQuestion && !isCorrect
                  ? 'Ready for Full Learning!'
                  : "Let's learn together!"}
              </h4>
              <p className="mb-4 text-blue-800">
                {isTestOut && isLastQuestion && !isCorrect
                  ? "The test-out assessment shows you'll benefit from the full learning experience. You'll now proceed through the complete vocabulary module with flashcards and additional practice."
                  : `Not quite right, but that's perfectly okay! Learning takes practice.
                    ${attempts > 1 ? ' You can continue to the next question or try once more.' : ' Would you like to try again?'}`}
              </p>
              <div className="flex justify-center gap-3">
                {attempts <= 2 && (
                  <AnimatedButton
                    onClick={handleTryAgain}
                    variant="outline"
                    size="md"
                  >
                    Try Again
                  </AnimatedButton>
                )}
                <AnimatedButton
                  onClick={handleNext}
                  variant="primary"
                  size="md"
                >
                  {isLastQuestion ? 'Complete Quiz' : 'Continue'} →
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
