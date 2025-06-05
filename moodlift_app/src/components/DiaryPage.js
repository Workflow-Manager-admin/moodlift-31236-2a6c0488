import React, { useState, useEffect, useRef } from 'react';
import './DiaryPage.css';

/**
 * DiaryPage allows users to write and save a mood-tagged diary entry.
 * Styling, classnames, and accents are driven by the `mood` prop for mood vibrance and dynamic vibrancy.
 * - All main divs and cards use diary-specific classNames (e.g., diary-page-root, diary-card-vibrant).
 * - A vibrant mood-matching emoji icon and accent are prominently displayed.
 * - All visual vibrance is controlled via props/state.
 *
 * Props:
 *   mood: string | null
 *   onSave: function(entry: { mood, text })
 *   onBack: function()
 *
 */
// PUBLIC_INTERFACE
function DiaryPage({ mood, onSave, onBack }) {
  const [entryText, setEntryText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Mood details map allows for mood-matching icon/accents and vibrance
  const moodDetails = {
    happy: {
      label: "Happy", emoji: "😄", accent: "⭐", accentLabel: "sparkles",
      accentImg: null // could be a URL in the future
    },
    sad: {
      label: "Sad", emoji: "😢", accent: "💧", accentLabel: "raindrop",
      accentImg: null
    },
    excited: {
      label: "Excited", emoji: "🤩", accent: "🎉", accentLabel: "confetti",
      accentImg: null
    },
    calm: {
      label: "Calm", emoji: "🧘", accent: "🌿", accentLabel: "leaf",
      accentImg: null
    },
    energetic: {
      label: "Energetic", emoji: "⚡", accent: "🔥", accentLabel: "energy",
      accentImg: null
    },
    angry: {
      label: "Angry", emoji: "😡", accent: "💥", accentLabel: "explosion",
      accentImg: null
    },
    chill: {
      label: "Chill", emoji: "🧊", accent: "❄️", accentLabel: "ice",
      accentImg: null
    }
  };
  const md = moodDetails[mood] || {
    label: mood || "Unknown",
    emoji: "",
    accent: "📝",
    accentLabel: "edit",
    accentImg: null
  };

  // Root class applies unique mood class: e.g. 'diary-page-root mood-happy'
  const rootMoodClass = `diary-page-root${mood ? ` mood-${mood}` : ''}`;

  // Track mood prop for potential focus/animation (for future use)
  const prevMoodRef = useRef(mood);
  useEffect(() => {
    if (prevMoodRef.current !== mood) {
      prevMoodRef.current = mood;
    }
  }, [mood]);

  // Save logic: disables form, fakes save delay, then calls onSave
  const handleSave = async () => {
    setSaving(true);
    await new Promise(res => setTimeout(res, 800));
    setSaving(false);
    setSaveSuccess(true);
    if (onSave) onSave({ mood, text: entryText });
    setTimeout(() => setSaveSuccess(false), 1100);
    setEntryText('');
  };

  // Renders the main mood/emoji icon, with unique diary accent for this mood, and the accent "badge" in the card corner.
  function MoodAccentIcon() {
    // Fallback to emoji if no accentImg, but extensible for image/graphic
    return (
      <span
        className={`diary-mood-icon diary-mood-icon--accent diary-mood-icon--${mood || 'default'}`}
        role="img"
        aria-label={md.accentLabel}
        title={md.label}
        style={{
          // Optionally style for unique vibrance, e.g. filter, border color depending on mood
          borderColor: 'var(--primary)',
        }}
      >
        {md.emoji}
      </span>
    );
  }

  // Optionally show an accent image in the card's corner for vibrance
  function MoodAccentCorner() {
    // Show a corner emoji/graphic, by default position in upper right
    if (!md.accent) return null;
    return (
      <span
        className={`diary-card-accent-corner mood-${mood || 'default'}`}
        aria-label={md.accentLabel}
        title={`Mood accent: ${md.accentLabel}`}
        style={{
          position: 'absolute',
          top: 16,
          right: 23,
          fontSize: '2.13em',
          zIndex: 9,
          animation: 'diaryMoodEmojiBounce 1.6s infinite alternate',
          filter: 'drop-shadow(0 0 7px var(--accent, #FF69B4aa))'
        }}
      >
        {md.accent}
      </span>
    );
  }

  // h2 gets a diary-specific class for targeted styling, textarea and buttons use vibrant/diary classes.
  return (
    <div className={rootMoodClass} style={{ minHeight: '100vh' }}>
      <div className="container flex-col gap-lg diary-page-content" style={{ marginTop: 90, marginBottom: 77 }}>
        <section
          className={`diary-card-vibrant${mood ? ` diary-card-vibrant--${mood}` : ''}`}
          style={{ minHeight: 263, position: 'relative' }}
        >
          {/* Mood accent in upper right: always visible */}
          <MoodAccentCorner />

          {/* Header row with back, emoji, and animated underline */}
          <div className="diary-header-row" style={{ display: "flex", alignItems: "center", gap: 17, marginBottom: 14 }}>
            <button
              className="diary-back-btn"
              type="button"
              onClick={onBack}
              aria-label="Back to main"
            >
              <span style={{ display: "none" }}>Back</span>
            </button>
            <div className="diary-title-box" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span className="diary-title-row" style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <MoodAccentIcon />
                <h2
                  className={`diary-title diary-title--${mood || "default"}`}
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: "1.42rem",
                    color: "var(--text-color)",
                    letterSpacing: "0.01em",
                    transition: "color 0.7s, font-family 0.7s",
                  }}
                >
                  {md.label} Diary Entry
                </h2>
              </span>
              <div className="diary-mood-underline" aria-hidden="true"></div>
            </div>
          </div>

          <textarea
            className={`diary-textarea${mood ? ` diary-textarea--${mood}` : ''}`}
            placeholder={
              mood
                ? `What's on your mind? Write about your ${md.label.toLowerCase()} day here...`
                : "Write about your day and mood here..."
            }
            aria-label="Diary entry text"
            value={entryText}
            onChange={e => setEntryText(e.target.value)}
            disabled={saving}
          />

          <div className="diary-action-row" style={{ display: 'flex', gap: 11, marginTop: 9 }}>
            <button
              className={`diary-save-btn${mood ? ` diary-save-btn--${mood}` : ""}`}
              type="button"
              onClick={handleSave}
              disabled={saving || !entryText.trim()}
            >
              {saving ? "Saving..." : (saveSuccess ? "Saved!" : "Save")}
            </button>
            {saveSuccess && (
              <span className="diary-save-success" role="status">
                Entry saved!
              </span>
            )}
          </div>
          {/* Animated "Saving as mood" badge/tag */}
          <div className={`diary-mood-tag diary-mood-tag--${mood || 'default'}`}>
            <span role="img" aria-label={md.label + " icon"} style={{ fontSize: "1.25em" }}>
              {md.accent}
            </span>
            Saving entry as <b style={{ marginLeft: 3 }}>{md.emoji} {md.label}</b>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryPage;
