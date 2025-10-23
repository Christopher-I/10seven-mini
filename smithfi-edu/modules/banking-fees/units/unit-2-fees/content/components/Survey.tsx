/**
 * Survey Component for Unit 2
 * Contains all survey questions (Pages 4-13) in a centralized component
 */

'use client';

import { useState } from 'react';

interface SurveyProps {
  currentQuestion: number;
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

export function Survey({ currentQuestion, onStepComplete, stepData }: SurveyProps) {
  const [ageInput, setAgeInput] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [experienceDescription, setExperienceDescription] = useState('');
  const [checkFrequency, setCheckFrequency] = useState('');
  const [feelings, setFeelings] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [socioeconomic, setSocioeconomic] = useState('');

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const toggleProcess = (process: string) => {
    setSelectedProcesses(prev =>
      prev.includes(process)
        ? prev.filter(p => p !== process)
        : [...prev, process]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getProgress = () => {
    return ((currentQuestion - 3) / 10) * 100; // Questions 4-13 = 10 questions
  };

  const getQuestionNumber = () => {
    return currentQuestion - 3; // Page 4 = Question 1, Page 5 = Question 2, etc.
  };

  // Page 4: Question 1 - Account Opening Age
  if (currentQuestion === 4) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-40 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                1 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '10%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 1 of 10: At what age did you first open a bank account? It's okay to guess if you don't remember.
            </h3>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Enter your age when you first opened a bank account:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={ageInput}
                  placeholder="e.g., 16"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E1E72] focus:border-[#2E1E72] text-gray-900 placeholder-gray-500 transition-colors"
                  onChange={(e) => {
                    setAgeInput(e.target.value);
                  }}
                />
              </div>

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-4">
                <button
                  onClick={() => {
                    const age = parseInt(ageInput) || 0;
                    onStepComplete?.({ accountOpeningAge: age, hasAccount: true });
                  }}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => onStepComplete?.({ hasAccount: false })}
                  className="text-sm text-[#8577B7] hover:text-[#2E1E72] underline font-medium transition-colors"
                >
                  I don't have a bank account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 5: Question 2 - Reasons for Opening
  if (currentQuestion === 5) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                2 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '20%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 2 of 10: Why did you open a bank account?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select all that apply</p>

            <div className="space-y-3">
              {[
                'I got a job',
                'My parent(s) or guardian(s) opened one for me',
                'I had money from other sources',
                'I started college',
                'Other'
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2E1E72] border-gray-300 rounded focus:ring-[#2E1E72] focus:ring-2 accent-[#2E1E72]"
                    onChange={() => toggleReason(reason)}
                    checked={selectedReasons.includes(reason)}
                  />
                  <span className="text-gray-800 font-medium">{reason}</span>
                </label>
              ))}

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-4">
                <button
                  onClick={() => onStepComplete?.({ openingReasons: selectedReasons })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 6: Question 3 - Opening Process
  if (currentQuestion === 6) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                3 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '30%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 3 of 10: What was the process you went through to open a bank account?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select all that apply</p>

            <div className="space-y-3">
              {[
                'I did it online',
                'I went to a bank branch in person',
                'I did it over the phone',
                'My parent(s) or guardian(s) did it for me',
                'Other'
              ].map((process) => (
                <label key={process} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2E1E72] border-gray-300 rounded focus:ring-[#2E1E72] focus:ring-2 accent-[#2E1E72]"
                    onChange={() => toggleProcess(process)}
                    checked={selectedProcesses.includes(process)}
                  />
                  <span className="text-gray-800 font-medium">{process}</span>
                </label>
              ))}

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-4">
                <button
                  onClick={() => onStepComplete?.({ openingProcess: selectedProcesses })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 7: Question 4 - Account Types
  if (currentQuestion === 7) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                4 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '40%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 4 of 10: What kind of account did you open?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select all that apply</p>

            <div className="space-y-3">
              {[
                'Checking account',
                'Savings account',
                'Investment account',
                'Not sure / can\'t remember',
                'Other'
              ].map((type) => (
                <label key={type} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2E1E72] border-gray-300 rounded focus:ring-[#2E1E72] focus:ring-2 accent-[#2E1E72]"
                    onChange={() => toggleType(type)}
                    checked={selectedTypes.includes(type)}
                  />
                  <span className="text-gray-800 font-medium">{type}</span>
                </label>
              ))}

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-4">
                <button
                  onClick={() => onStepComplete?.({ accountTypes: selectedTypes })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 8: Question 5 - Experience Rating
  if (currentQuestion === 8) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                5 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '50%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 5 of 10: How would you rate the experience of opening your account?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select one</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onStepComplete?.({ experienceRating: rating })}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[#2E1E72] mb-1">{rating}</span>
                    <span className="text-xs text-gray-800 font-medium text-center">
                      {rating === 1 ? 'Very difficult' :
                       rating === 2 ? 'Difficult' :
                       rating === 3 ? 'Somewhat difficult' :
                       rating === 4 ? 'Neither difficult nor easy' :
                       rating === 5 ? 'Somewhat easy' :
                       rating === 6 ? 'Easy' : 'Very easy'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue and Back Buttons */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 mt-6">
              <button
                onClick={() => onStepComplete?.({ experienceRating: 0 })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={() => onStepComplete?.({ goBackOnePage: true })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 9: Question 6 - Experience Description
  if (currentQuestion === 9) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                6 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 6 of 10: Based on what you just selected, please recount the experience to the best of your ability.
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For example, if you chose "very difficult," what specific task or interaction made it difficult? If you don't remember, just put N/A.
            </p>

            <div className="space-y-4">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E1E72] focus:border-[#2E1E72] text-gray-900 placeholder-gray-500 transition-colors"
                rows={6}
                placeholder="Please describe your experience opening the account..."
                value={experienceDescription}
                onChange={(e) => setExperienceDescription(e.target.value)}
              />

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-2">
                <button
                  onClick={() => onStepComplete?.({ experienceDescription: experienceDescription })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 10: Question 7 - Balance Check Frequency
  if (currentQuestion === 10) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                7 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '70%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 7 of 10: How often do you check your account balance(s)?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select one</p>

            <div className="space-y-3">
              {[
                'Multiple times a day',
                'Once a day',
                'Every few days',
                'Once a week',
                'Once a month',
                'Barely ever (less than once a month)'
              ].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => onStepComplete?.({ balanceCheckFrequency: frequency })}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all cursor-pointer"
                >
                  <span className="text-gray-800 font-medium">{frequency}</span>
                </button>
              ))}
            </div>

            {/* Continue and Back Buttons */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 mt-6">
              <button
                onClick={() => onStepComplete?.({ balanceCheckFrequency: 'Not specified' })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={() => onStepComplete?.({ goBackOnePage: true })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 11: Question 8 - Feelings When Checking Balance
  if (currentQuestion === 11) {
    const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
    const [customFeeling, setCustomFeeling] = useState('');
    const [showFeelingsWheel, setShowFeelingsWheel] = useState(false);

    const feelingOptions = [
      'Happy', 'Sad', 'Bad', 'Fearful', 'Angry', 'Surprised',
      'Disgusted', 'Confused', 'Embarrassed', 'Vulnerable',
      'Excited', 'Stressed', 'Shame'
    ];

    const toggleFeeling = (feeling: string) => {
      setSelectedFeelings(prev =>
        prev.includes(feeling)
          ? prev.filter(f => f !== feeling)
          : [...prev, feeling]
      );
    };

    const handleContinue = () => {
      const allFeelings = [...selectedFeelings];
      if (customFeeling.trim()) {
        allFeelings.push(customFeeling.trim());
      }
      onStepComplete?.({ feelingsWhenCheckingBalance: allFeelings });
    };

    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                8 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '80%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 8 of 10: How do you feel when you check your account balance(s)?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select all that apply. It is okay if one feeling applies to certain instances and another feeling applies to others.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {feelingOptions.map((feeling) => (
                  <label key={feeling} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#2E1E72] border-gray-300 rounded focus:ring-[#2E1E72] focus:ring-2 accent-[#2E1E72] cursor-pointer"
                      onChange={() => toggleFeeling(feeling)}
                      checked={selectedFeelings.includes(feeling)}
                    />
                    <span className="text-gray-800 font-medium text-sm">{feeling}</span>
                  </label>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-3">
                  Something not listed here? Take a look at the{' '}
                  <button
                    onClick={() => setShowFeelingsWheel(!showFeelingsWheel)}
                    className="text-[#2E1E72] underline hover:text-[#8577B7] font-medium cursor-pointer"
                  >
                    Feelings Wheel
                  </button>{' '}
                  and pick a word or words that feel more appropriate.
                </p>

                {showFeelingsWheel && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <a href="https://feelingswheel.com" target="_blank" rel="noopener noreferrer" className="text-[#2E1E72] underline">
                        Source: FeelingsWheel.com
                      </a>
                    </p>
                    <div className="bg-white p-2 rounded border">
                      <p className="text-sm text-gray-500 italic">
                        [Static Feelings Wheel image would be displayed here]
                      </p>
                    </div>
                  </div>
                )}

                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E1E72] focus:border-[#2E1E72] text-gray-900 placeholder-gray-500 transition-colors cursor-pointer"
                  rows={3}
                  placeholder="Describe other feelings not listed above..."
                  value={customFeeling}
                  onChange={(e) => setCustomFeeling(e.target.value)}
                />
              </div>

              <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 pt-4">
                <button
                  onClick={handleContinue}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={() => onStepComplete?.({ goBackOnePage: true })}
                  className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 12: Question 9 - Bank Satisfaction
  if (currentQuestion === 12) {
    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                9 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '90%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Question 9 of 10: How satisfied are you with your current bank?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select one</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onStepComplete?.({ bankSatisfaction: rating })}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[#2E1E72] mb-1">{rating}</span>
                    <span className="text-xs text-gray-800 font-medium text-center">
                      {rating === 1 ? 'Very dissatisfied' :
                       rating === 2 ? 'Dissatisfied' :
                       rating === 3 ? 'Somewhat dissatisfied' :
                       rating === 4 ? 'Neither satisfied nor dissatisfied' :
                       rating === 5 ? 'Somewhat satisfied' :
                       rating === 6 ? 'Satisfied' : 'Very satisfied'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue and Back Buttons */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 mt-6">
              <button
                onClick={() => onStepComplete?.({ bankSatisfaction: 0 })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={() => onStepComplete?.({ goBackOnePage: true })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  // Page 13: Question 10 - Socioeconomic Status (Optional)
  if (currentQuestion === 13) {
    const [selfDescribe, setSelfDescribe] = useState('');

    const handleOptionSelect = (option: string) => {
      if (option === 'self-describe') {
        // Don't complete yet, let them fill in the text
        return;
      }
      onStepComplete?.({ socioeconomicStatus: option });
    };

    const handleSelfDescribeSubmit = () => {
      if (selfDescribe.trim()) {
        onStepComplete?.({ socioeconomicStatus: `Self-described: ${selfDescribe.trim()}` });
      }
    };

    return (
      <div className="w-full md:max-w-3xl mx-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[28px] font-playfair font-semibold text-[#2E1E72]">Banking Survey</h2>
              <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
                10 of 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
              <div
                className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Optional Question 10: How would you describe your socioeconomic status growing up?
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select one</p>

            <div className="space-y-3">
              {[
                { value: 'prefer-not-to-answer', label: 'Prefer not to answer' },
                { value: 'low-income', label: 'Low income' },
                { value: 'middle-income', label: 'Middle income' },
                { value: 'upper-class', label: 'Upper class' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all cursor-pointer"
                >
                  <span className="text-gray-800 font-medium">{option.label}</span>
                </button>
              ))}

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <span className="text-gray-800 font-medium">Prefer to self-describe</span>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={selfDescribe}
                    onChange={(e) => setSelfDescribe(e.target.value)}
                    placeholder="Please describe..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E1E72] focus:border-[#2E1E72] text-gray-900 placeholder-gray-500 transition-colors cursor-pointer"
                  />
                  {selfDescribe.trim() && (
                    <button
                      onClick={handleSelfDescribeSubmit}
                      className="py-3 px-6 rounded-full font-medium text-base bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Continue and Back Buttons */}
            <div className="fixed bottom-6 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-50 space-y-3 mt-6">
              <button
                onClick={() => onStepComplete?.({ socioeconomicStatus: 'Not specified' })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg bg-[#2E1E72] text-white hover:bg-[#3B2A8F] transition-all duration-200 cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={() => onStepComplete?.({ goBackOnePage: true })}
                className="w-full py-4 px-8 rounded-full font-medium text-lg border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Page Number */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page {currentQuestion} of 43</p>
        </div>
      </div>
    );
  }

  return null;
}