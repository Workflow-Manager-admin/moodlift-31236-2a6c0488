import React, { useState, useEffect, useRef } from 'react';
import './DiaryPage.css';

/**
 * DiaryPage allows user to write and save a mood-tagged diary entry.
 * Adapts styling and placeholder to the current mood with vibrant, animated, mood-specific styles and icons.
 * Props:
 *   mood: string | null
 *   onSave: function(entry: { mood, text })
 *   onBack: function()
 *
 * The component updates live in response to mood prop changes with DiaryPage-specific styling.
 */
// PUBLIC_INTERFACE
function DiaryPage({ mood, onSave, onBack }) {
  const [entryText, setEntryText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mood details for mood-adaptive coloring, emoji, accent icon
  const moodDetails = {
    happy:   { label: "Happy", emoji: "😄", accent: "⭐", accentLabel: "sparkles" },
    sad:     { label: "Sad", emoji: "😢", accent: "💧", accentLabel: "raindrop" },
    excited: { label: "Excited", emoji: "🤩", accent: "🎉", accentLabel: "confetti" },
    calm:    { label: "Calm", emoji: "🧘", accent: "🌿", accentLabel: "leaf" },
    energetic: { label: "Energetic", emoji: "⚡", accent: "🔥", accentLabel: "energy" },
    angry:   { label: "Angry", emoji: "😡", accent: "💥", accentLabel: "explosion" },
    chill:   { label: "Chill", emoji: "🧊", accent: "❄️", accentLabel: "ice" }
  };
  // current mood details object
  const md = moodDetails[mood] || { label: mood || "Unknown", emoji: "", accent: "📝", accentLabel: "edit" };

  // Used to add/remove mood class for dynamic vibrancy
  const rootMoodClass = mood ? `diary-page-root mood-${mood}` : "diary-page-root";

  // Track mood prop for animation/focus
  const prevMoodRef = useRef(mood);
  useEffect(() => {
    if (prevMoodRef.current !== mood) {
      // Mood changed! Could animate, e.g., add a pop class here
      prevMoodRef.current = mood;
      // Don't clear entry text on mood change to keep UX happy
    }
  }, [mood]);

  // Saving logic
  const handleSave = async () => {
    setSaving(true);
    // Simulate save latency
    await new Promise(res => setTimeout(res, 800));
    setSaving(false);
    setSaveSuccess(true);
    if (onSave) onSave({ mood, text: entryText });
    setTimeout(() => setSaveSuccess(false), 1100);
    setEntryText("");
  };

  // Animated mood accent icon for vibrant effect
  function MoodAccentIcon() {
    return (
      <span
        className="diary-mood-icon"
        role="img"
        aria-label={md.accentLabel}
      >
        {md.emoji}
      </span>
    );
  }

  return (
    <div className={rootMoodClass} style={{ minHeight: "100vh" }}>
      <div className="container flex-col gap-lg" style={{ marginTop: 90, marginBottom: 77 }}>
        <section className="diary-card-vibrant" style={{ minHeight: 263 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 17, marginBottom: 14 }}>
            <button
              className="diary-back-btn"
              type="button"
              onClick={onBack}
              aria-label="Back to main"
            >
              {/* back icon is handled with ::before in .diary-back-btn */}
              <span style={{ display: "none" }}>Back</span>
            </button>
            {/* Animated emoji + animated underline */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <MoodAccentIcon />
                <h2
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
            className="diary-textarea"
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
          <div style={{ display: 'flex', gap: 11, marginTop: 9 }}>
            <button
              className="diary-save-btn"
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
          <div className="diary-mood-tag">
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
