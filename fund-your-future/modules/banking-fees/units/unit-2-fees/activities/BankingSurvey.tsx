/**
 * Banking History Survey Component
 * Collects user banking experience data and saves to localStorage
 */

'use client';

import { useState, useEffect } from 'react';
import { AnimatedButton } from '@/core/components/AnimatedButton';

interface SurveyData {
  accountOpeningAge?: number;
  hasAccount: boolean;
  openingReasons: string[];
  openingProcess?: string;
  accountTypes?: string[];
  experienceRating?: number;
  experienceDescription?: string;
  engagementFrequency?: string;
  balanceCheckFrequency?: string;
  completed: boolean;
}

const STORAGE_KEY = 'banking-survey-unit2';

export function BankingSurvey({ onComplete }: { onComplete: (data: SurveyData) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    hasAccount: true,
    openingReasons: [],
    accountTypes: [],
    completed: false,
  });

  // Load existing survey data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSurveyData(parsed);
      if (parsed.completed) {
        setCurrentStep(999); // Show completed state
      }
    }
  }, []);

  // Save survey data to localStorage
  const saveSurveyData = (data: SurveyData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSurveyData(data);
  };

  // Restart survey
  const handleRestart = () => {
    const freshData: SurveyData = {
      hasAccount: true,
      openingReasons: [],
      accountTypes: [],
      completed: false
    };
    localStorage.removeItem(STORAGE_KEY);
    setSurveyData(freshData);
    setCurrentStep(0);
  };

  const handleStepComplete = (stepData: Partial<SurveyData>) => {
    const updatedData = { ...surveyData, ...stepData };
    saveSurveyData(updatedData);
    
    // Move to next step or complete
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const completedData = { ...updatedData, completed: true };
      saveSurveyData(completedData);
      setCurrentStep(999);
      onComplete(completedData);
    }
  };

  const [ageInput, setAgeInput] = useState('');

  const steps = [
    // Step 0: Account Opening Age - Question 1 of 9
    {
      id: 'age',
      title: 'Question 1 of 9: At what age did you first open a bank account? It\'s okay to guess if you don\'t remember.',
      component: (
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
          
          {ageInput && parseInt(ageInput) > 0 && (
            <div className="pt-2">
              <AnimatedButton
                onClick={() => {
                  const age = parseInt(ageInput);
                  handleStepComplete({ accountOpeningAge: age, hasAccount: true });
                }}
                variant="primary"
                size="md"
              >
                Next →
              </AnimatedButton>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => handleStepComplete({ hasAccount: false })}
              className="text-sm text-[#8577B7] hover:text-[#2E1E72] underline font-medium transition-colors"
            >
              I don't have a bank account
            </button>
          </div>
        </div>
      )
    },
    // Step 1: Opening Reasons - Question 2 of 9
    {
      id: 'reasons',
      title: 'Question 2 of 9: Why did you open a bank account?',
      subtitle: 'Select all that apply',
      component: (
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
                onChange={(e) => {
                  const reasons = e.target.checked
                    ? [...surveyData.openingReasons, reason]
                    : surveyData.openingReasons.filter(r => r !== reason);
                  setSurveyData({ ...surveyData, openingReasons: reasons });
                }}
                checked={surveyData.openingReasons.includes(reason)}
              />
              <span className="text-gray-800 font-medium">{reason}</span>
            </label>
          ))}
          
          <div className="pt-4">
            <AnimatedButton
              onClick={() => handleStepComplete({ openingReasons: surveyData.openingReasons })}
              disabled={surveyData.openingReasons.length === 0}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue
            </AnimatedButton>
          </div>
        </div>
      )
    },
    // Step 2: Opening Process - Question 3 of 9
    {
      id: 'process',
      title: 'Question 3 of 9: What was the process you went through to open a bank account?',
      subtitle: 'Select all that apply',
      component: (
        <div className="space-y-3">
          {[
            'I did it online',
            'I went to a bank branch in person',
            'I did it over the phone',
            'My parent(s) or guardian(s) did it for me',
            'Other'
          ].map((process) => (
            <button
              key={process}
              onClick={() => handleStepComplete({ openingProcess: process })}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all"
            >
              <span className="text-gray-800 font-medium">{process}</span>
            </button>
          ))}
        </div>
      )
    },
    // Step 3: Account Types - Question 4 of 9
    {
      id: 'accountTypes',
      title: 'Question 4 of 9: What kind of account did you open?',
      subtitle: 'Select all that apply',
      component: (
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
                onChange={(e) => {
                  const types = e.target.checked
                    ? [...(surveyData.accountTypes || []), type]
                    : (surveyData.accountTypes || []).filter(t => t !== type);
                  setSurveyData({ ...surveyData, accountTypes: types });
                }}
                checked={(surveyData.accountTypes || []).includes(type)}
              />
              <span className="text-gray-800 font-medium">{type}</span>
            </label>
          ))}

          <div className="pt-4">
            <AnimatedButton
              onClick={() => handleStepComplete({ accountTypes: surveyData.accountTypes || [] })}
              disabled={(surveyData.accountTypes || []).length === 0}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue
            </AnimatedButton>
          </div>
        </div>
      )
    },
    // Step 4: Experience Rating
    {
      id: 'experience',
      title: 'Question 5 of 9: How would you rate the experience of opening your account?',
      subtitle: 'Select one',
      component: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
              <button
                key={rating}
                onClick={() => handleStepComplete({ experienceRating: rating })}
                className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all"
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
      )
    },
    // Step 5: Experience Description - Question 6 of 9
    {
      id: 'experienceDescription',
      title: 'Question 6 of 9: Based on what you just selected, please recount the experience to the best of your ability.',
      subtitle: 'For example, if you chose "very difficult," what specific task or interaction made it difficult? If you don\'t remember, just put N/A.',
      component: (
        <div className="space-y-4">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E1E72] focus:border-[#2E1E72] text-gray-900 placeholder-gray-500 transition-colors"
            rows={6}
            placeholder="Please describe your experience opening the account..."
            value={surveyData.experienceDescription || ''}
            onChange={(e) => setSurveyData({ ...surveyData, experienceDescription: e.target.value })}
          />

          <div className="pt-2">
            <AnimatedButton
              onClick={() => handleStepComplete({ experienceDescription: surveyData.experienceDescription || '' })}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue
            </AnimatedButton>
          </div>
        </div>
      )
    },
    // Step 6: Balance Check Frequency - Question 7 of 9
    {
      id: 'balanceFrequency',
      title: 'Question 7 of 9: How often do you check your account balance(s)?',
      subtitle: 'Select one',
      component: (
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
              onClick={() => handleStepComplete({ balanceCheckFrequency: frequency })}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all"
            >
              <span className="text-gray-800 font-medium">{frequency}</span>
            </button>
          ))}
        </div>
      )
    },
    // Step 7: Engagement Frequency - Question 8 of 9 (was previously engagement)
    {
      id: 'engagementFrequency',
      title: 'Question 8 of 9: How often do you engage with your bank account?',
      subtitle: 'Select one',
      component: (
        <div className="space-y-3">
          {[
            'Multiple times a day',
            'Once a day',
            'Every few days',
            'Once a week',
            'Once a month',
            'Rarely ever (less than once a month)'
          ].map((frequency) => (
            <button
              key={frequency}
              onClick={() => handleStepComplete({ engagementFrequency: frequency })}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-[#F8F6FF] hover:border-[#8577B7] hover:shadow-sm transition-all"
            >
              <span className="text-gray-800 font-medium">{frequency}</span>
            </button>
          ))}
        </div>
      )
    }
  ];

  // Handle no bank account path
  if (!surveyData.hasAccount && currentStep === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <div className="text-center">
          <div className="mb-4 text-4xl">💳</div>
          <h3 className="text-xl font-semibold text-[#2E1E72] mb-4">
            No Bank Account Yet?
          </h3>
          <p className="text-gray-700 mb-6">
            That's okay! Many people don't have traditional bank accounts. This unit will still be valuable
            for understanding how banking fees work when you're ready to open an account or if you use
            alternative financial services.
          </p>
          <AnimatedButton
            onClick={() => onComplete({ hasAccount: false, openingReasons: [], completed: true })}
            variant="primary"
            size="lg"
          >
            Continue Learning
          </AnimatedButton>
        </div>
      </div>
    );
  }

  // Survey completed
  if (currentStep === 999) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8">
        <div className="text-center">
          <div className="mb-4 text-4xl">✅</div>
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            Survey Complete!
          </h3>
          <p className="text-green-700 mb-6">
            Thanks for sharing your banking experience. Your responses help us understand how different
            people interact with the banking system.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-left mb-4">
            <h4 className="font-semibold text-[#2E1E72] mb-2">Your Responses:</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              {surveyData.accountOpeningAge && (
                <li>• Opened account at age {surveyData.accountOpeningAge}</li>
              )}
              {surveyData.openingReasons.length > 0 && (
                <li>• Reasons: {surveyData.openingReasons.join(', ')}</li>
              )}
              {surveyData.engagementFrequency && (
                <li>• Usage: {surveyData.engagementFrequency}</li>
              )}
            </ul>
          </div>
          <AnimatedButton
            onClick={handleRestart}
            variant="secondary"
            size="sm"
          >
            Retake Survey
          </AnimatedButton>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2E1E72]">Banking Survey</h2>
          <span className="text-sm text-gray-600 bg-[#E5DEEF] px-3 py-1 rounded-full">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="bg-[#E5DEEF] rounded-full h-2 mb-6">
          <div
            className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {currentStepData.title}
        </h3>
        {currentStepData.subtitle && (
          <p className="text-sm text-gray-600 mb-4">{currentStepData.subtitle}</p>
        )}

        {currentStepData.component}
      </div>
    </div>
  );
}