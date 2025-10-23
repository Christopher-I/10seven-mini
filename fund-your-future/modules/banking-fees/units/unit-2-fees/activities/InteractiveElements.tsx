/**
 * Interactive Elements for Unit 2
 * Includes tooltip definitions, mini quizzes, and interactive content
 */

'use client';

import { useState } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';

// Tooltip definition component
export function DefinitionTooltip({
  term,
  definition,
  children,
}: {
  term: string;
  definition: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="cursor-help text-gray-800 underline decoration-dashed underline-offset-2 hover:text-gray-900"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)} // For mobile
      >
        {children}
      </span>
      {isVisible && (
        <div className="absolute bottom-full left-0 right-0 z-10 mx-auto mb-2 w-72 max-w-[calc(100vw-2rem)] rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg sm:left-1/2 sm:right-auto sm:w-80 sm:-translate-x-1/2 sm:transform md:w-96">
          <div className="mb-1 font-semibold">{term}</div>
          <div className="leading-relaxed text-gray-200">{definition}</div>
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </span>
  );
}

// Mini quiz component for bank profits
export function BankProfitsQuiz({
  onAnswer,
}: {
  onAnswer: (correct: boolean) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    // Don't call onAnswer immediately - wait for user to read and click Continue
  };

  const handleContinue = () => {
    onAnswer(selectedAnswer === '50B+');
  };

  const options = [
    { value: '10-20B', label: '$10-20 Billion' },
    { value: '20-30B', label: '$20-30 Billion' },
    { value: '30-40B', label: '$30-40 Billion' },
    { value: '40-50B', label: '$40-50 Billion' },
    { value: '50B+', label: '$50+ Billion', correct: true },
  ];

  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-6">
      <h4 className="mb-4 text-lg font-semibold text-black">
        Quick Quiz: Bank Profits
      </h4>
      <p className="mb-6 text-gray-900">
        How much in profits did the largest US bank make last year?
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            disabled={showResult}
            className={`w-full rounded-lg border p-3 text-left transition-all ${
              showResult
                ? option.correct
                  ? 'border-purple-300 bg-purple-100 text-purple-900'
                  : selectedAnswer === option.value
                    ? 'border-blue-200 bg-blue-50 text-blue-800'
                    : 'border-gray-200 bg-gray-100 text-gray-800'
                : 'border-gray-200 text-gray-900 hover:border-gray-400 hover:bg-gray-100'
            } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option.label}
            {showResult && option.correct && (
              <span className="ml-2 text-purple-700">✓ Correct!</span>
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-6 rounded-lg bg-white p-4">
          {selectedAnswer === '50B+' ? (
            <>
              <h5 className="mb-2 font-semibold text-purple-900">
                🎉 Exactly right!
              </h5>
              <p className="mb-3 text-sm text-gray-900">
                The top 4 US banks made the following in profits last year:
              </p>
            </>
          ) : (
            <>
              <h5 className="mb-2 font-semibold text-blue-900">
                Let's learn together!
              </h5>
              <p className="mb-3 text-sm text-gray-900">
                The numbers are actually even higher than many people think.
                Here's what the top 4 US banks made in profits last year:
              </p>
            </>
          )}
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              • <strong>JP Morgan Chase:</strong> $58.5B
            </li>
            <li>
              • <strong>Bank of America:</strong> $27.1B
            </li>
            <li>
              • <strong>Wells Fargo:</strong> $19.7B
            </li>
            <li>
              • <strong>CitiGroup:</strong> $12.7B
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-900">
            Their profits continue to increase while consumer confidence remains
            low amid concerns about inflation and the job market.
          </p>
          <div className="mt-4 text-center">
            <AnimatedButton
              onClick={handleContinue}
              variant="primary"
              size="md"
            >
              Continue →
            </AnimatedButton>
          </div>
        </div>
      )}
    </div>
  );
}

// Interactive checklist component
export function InteractiveChecklist({
  title,
  items,
  onComplete,
}: {
  title: string;
  items: string[];
  onComplete?: () => void;
}) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const handleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);

    if (newChecked.every((item) => item) && onComplete) {
      onComplete();
    }
  };

  const completedCount = checkedItems.filter((item) => item).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <span className="text-sm text-gray-700">
          {completedCount} of {items.length} completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <label
            key={index}
            className={`flex cursor-pointer items-start space-x-3 rounded-lg p-3 transition-colors ${
              checkedItems[index]
                ? 'border border-purple-200 bg-purple-50'
                : 'border border-transparent hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheck(index)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
            />
            <span
              className={`flex-1 text-sm ${
                checkedItems[index]
                  ? 'text-purple-900 line-through'
                  : 'text-gray-900'
              }`}
            >
              {item}
            </span>
          </label>
        ))}
      </div>

      {completedCount === items.length && (
        <div className="mt-4 rounded-lg border border-purple-200 bg-purple-100 p-3 text-center">
          <span className="font-medium text-purple-900">
            All done! Great job!
          </span>
        </div>
      )}
    </div>
  );
}

// Historical timeline carousel component
export function HistoricalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '1980s Financial Crisis',
      content:
        'In the 1980s, a major financial crisis hit a group of small banks called the Savings and Loan associations (S&Ls). These banks mainly gave out home loans and were supposed to be "low-risk."',
      icon: '🏦',
    },
    {
      title: 'Interest Rate Shock',
      content:
        "When interest rates suddenly rose in the late 1970s and early 1980s, S&Ls found themselves in trouble—they had to pay higher interest to depositors, but the money they were earning from older, low-interest home loans wasn't enough to cover it.",
      icon: '📈',
    },
    {
      title: 'Deregulation Backfires',
      content:
        'To help them survive, the government loosened the rules, allowing S&Ls to invest in riskier things. Unfortunately, that backfired. Many made poor choices or committed fraud, and more than 1,000 S&Ls failed.',
      icon: '💥',
    },
    {
      title: 'Government Bailout',
      content:
        'The crisis cost the government—and ultimately taxpayers—billions of dollars to fix the mess. After the crisis, regulators forced banks to follow stricter rules.',
      icon: '💸',
    },
    {
      title: 'The Rise of Fees',
      content:
        "Many banks realized they couldn't rely just on loans to make money. So they started charging fees. These fees became a new, steady source of income that helped banks stay profitable and avoid the kind of collapse the S&Ls went through.",
      icon: '💰',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
      <h4 className="mb-6 text-center text-lg font-semibold text-purple-900">
        Learning: History: Why Do Banking Fees Exist?
      </h4>

      <div className="relative">
        <div className="flex min-h-[200px] flex-col justify-center rounded-lg bg-white p-6">
          <div className="mb-4 text-center">
            <div className="mb-2 text-4xl">{slides[currentSlide].icon}</div>
            <h5 className="text-lg font-semibold text-gray-900">
              {slides[currentSlide].title}
            </h5>
          </div>
          <p className="text-center text-gray-700">
            {slides[currentSlide].content}
          </p>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Slide indicators */}
      <div className="mt-4 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-purple-600' : 'bg-purple-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
