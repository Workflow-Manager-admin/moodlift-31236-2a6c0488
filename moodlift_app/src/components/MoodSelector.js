import React from 'react';
import './MoodSelector.css';

// Mood options with emoji representations
const MOODS = [
  { key: 'happy', label: 'Happy', emoji: '😄' },
  { key: 'sad', label: 'Sad', emoji: '😢' },
  { key: 'stressed', label: 'Stressed', emoji: '😣' },
  { key: 'energetic', label: 'Energetic', emoji: '⚡' },
  { key: 'chill', label: 'Chill', emoji: '🧘' },
  { key: 'angry', label: 'Angry', emoji: '😡' },
];

// PUBLIC_INTERFACE
function MoodSelector({ selectedMood, onMoodChange }) {
  /**
   * This is a visual component that allows the user to select their mood.
   * In the future, hooks can be added to connect with AI mood/auto-detection logic.
   */
  return (
    <div className="mood-selector-root">
      <div className="mood-prompt">How are you feeling today?</div>
      <div className="moods-list">
        {MOODS.map((mood) => (
          <button
            key={mood.key}
            className={`mood-btn${selectedMood === mood.key ? ' selected' : ''}`}
            onClick={() => onMoodChange(mood.key)}
            aria-pressed={selectedMood === mood.key}
          >
            <span className="mood-emoji" role="img" aria-label={mood.label}>
              {mood.emoji}
            </span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
        {/* PUBLIC_INTERFACE
          Placeholder for future AI/Auto detection logic:
          <button className="mood-detect-btn" onClick={handleDetectMood}>Detect AI Mood</button>
        */}
      </div>
      {selectedMood && (
        <div className="mood-selected-feedback">
          <span>Selected mood:</span> 
          <span className="mood-feedback-emoji">{MOODS.find(m => m.key === selectedMood)?.emoji}</span> 
          <span>{MOODS.find(m => m.key === selectedMood)?.label}</span>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;
