import React, { useState, useEffect, useRef } from 'react';

/**
 * DiaryPage allows user to write and save a mood-tagged diary entry.
 * Adapts styling and placeholder to the current mood.
 * Props:
 *   mood: string | null
 *   onSave: function(entry: { mood, text })
 *   onBack: function()
 *
 * The component updates live in response to mood prop changes.
 */
// PUBLIC_INTERFACE
function DiaryPage({ mood, onSave, onBack }) {
  const [entryText, setEntryText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Track the current live mood (from prop) for labeling and theming; use effect triggers if mood prop changes

  // Helper for mood label/emoji
  const moodDetails = {
    happy:   { label: "Happy", emoji: "😄" },
    sad:     { label: "Sad", emoji: "😢" },
    excited: { label: "Excited", emoji: "🤩" },
    calm:    { label: "Calm", emoji: "🧘" },
    energetic: { label: "Energetic", emoji: "⚡" },
    angry:   { label: "Angry", emoji: "😡" },
    chill:   { label: "Chill", emoji: "🧊" }
  };
  // md is recalculated every render to reflect any mood prop update
  const md = moodDetails[mood] || { label: mood || "Unknown", emoji: "" };

  // When mood prop changes, re-rendering ensures theming/emoji/label is updated immediately (automatic in React functional)
  // But we can use useEffect if we want additional side effects
  const prevMoodRef = useRef(mood);
  useEffect(() => {
    if (prevMoodRef.current !== mood) {
      // Optionally animate or focus or indicate theme/mood transition here
      prevMoodRef.current = mood;
      // Do not reset entryText — always preserve user in-progress writing even if they switch moods
    }
  }, [mood]);

  // When saving: always tag entry with CURRENT mood prop value
  const handleSave = async () => {
    setSaving(true);
    // Simulate save, e.g., send to backend including the current mood:
    // entry: { mood, text: entryText }
    await new Promise(res => setTimeout(res, 800));
    setSaving(false);
    setSaveSuccess(true);
    if (onSave) onSave({ mood, text: entryText }); // mood is always latest from App.js
    setTimeout(() => setSaveSuccess(false), 1100);
    setEntryText("");
  };

  // Styles for the textarea/card – theme comes from CSS variables which update globally via App.js
  // No direct inline mood color, because the :root and card already adapt, but you could double up for emphasis

  return (
    <div className="container flex-col gap-lg" style={{ marginTop: "85px", marginBottom: "80px" }}>
      <section className="card" style={{ minHeight: 230, transition: 'background 0.85s, color 0.7s, font-family 0.65s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
          <button className="btn" type="button" style={{ minWidth: 38, fontSize: '1.13em', padding: '6px 14px' }} onClick={onBack} aria-label="Back to main">
            ← Back
          </button>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.39rem', transition: 'color 0.7s, font-family 0.7s' }}>
            {md.emoji} {md.label} Diary Entry
          </h2>
        </div>
        <textarea
          className="diary-textarea"
          style={{
            resize: "vertical",
            width: "99%",
            minHeight: 93,
            borderRadius: 11,
            fontFamily: "inherit",
            fontSize: "1.09em",
            padding: "10px",
            border: "1.5px solid var(--border-color, #dfd)",
            marginBottom: 11,
            background: "rgba(255,255,255,0.14)",
            color: "var(--text-color, #fff)",
            outline: "none",
            boxShadow: "0 1px 8px 0 rgba(60,60,120,0.08)",
            transition: "border-color 0.22s, box-shadow 0.27s, color 0.65s, font-family 0.65s"
          }}
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
        <div style={{ display: 'flex', gap: 11 }}>
          <button
            className="btn btn-large"
            type="button"
            onClick={handleSave}
            style={{ minWidth: 110, marginLeft: 0 }}
            disabled={saving || !entryText.trim()}
          >
            {saving ? "Saving..." : (saveSuccess ? "Saved!" : "Save")}
          </button>
          {saveSuccess && (
            <span style={{ color: "var(--accent)", marginLeft: 7, alignSelf: "center", fontWeight: 600, fontSize: "1.08em" }}>
              Entry saved!
            </span>
          )}
        </div>
        {/* Show current mood tag (live) below for clarity */}
        <div style={{
          marginTop: 12,
          opacity: 0.8,
          fontSize: "1em",
          color: "var(--text-secondary, #fff7)"
        }}>
          Saving entry as <b>{md.emoji} {md.label}</b>
        </div>
      </section>
    </div>
  );
}

export default DiaryPage;
