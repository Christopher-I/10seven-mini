/**
 * Emoji Survey Component for Unit 1
 * Simple emoji feedback collection with progress tracking
 */

'use client';

import { useState } from 'react';
import { useActivityTracking } from '@/hooks/useProgressTracking';

interface EmojiSurveyProps {
  onComplete: (data: { emojiSelected: string }) => void;
  moduleId?: string;
  unitId?: string;
}

const EMOJI_OPTIONS = [
  { emoji: '😃', label: 'Great!' },
  { emoji: '😅', label: 'Good' },
  { emoji: '🤔', label: 'Thinking' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🥴', label: 'Confused' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😡', label: 'Frustrated' },
];

export function EmojiSurvey({
  onComplete,
  moduleId = 'banking-fees',
  unitId = 'unit-1-basics',
}: EmojiSurveyProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const { completeActivity } = useActivityTracking(
    moduleId,
    unitId,
    'emoji-survey',
    'survey'
  );

  const handleEmojiSelect = async (emoji: string) => {
    setSelectedEmoji(emoji);

    // Track activity completion with progress tracking
    await completeActivity({
      completed: true,
      score: 100, // All emoji selections are valid
      data: { emojiSelected: emoji },
    });

    // Save feedback and complete
    setTimeout(() => {
      onComplete({ emojiSelected: emoji });
    }, 500); // Brief delay to show selection
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          How are you feeling?
        </h3>
        <p className="text-sm text-gray-600">
          Tell us using one of the emojis below:
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {EMOJI_OPTIONS.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => handleEmojiSelect(emoji)}
            className={`rounded-xl border-2 p-3 transition-all duration-200 hover:scale-110 active:scale-95 sm:p-4 ${
              selectedEmoji === emoji
                ? 'scale-110 border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="mb-1 text-2xl sm:text-3xl">{emoji}</div>
            <div className="text-xs text-gray-600">{label}</div>
          </button>
        ))}
      </div>

      {selectedEmoji && (
        <div className="text-center">
          <div className="text-sm text-purple-700">
            Thanks for your feedback! {selectedEmoji}
          </div>
        </div>
      )}
    </div>
  );
}
