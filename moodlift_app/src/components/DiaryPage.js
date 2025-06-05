import React, { useState } from 'react';

/**
 * DiaryPage allows user to write and save a mood-tagged diary entry.
 * Adapts styling and placeholder to the current mood.
 * Props:
 *   mood: string | null
 *   onSave: function(entry: { mood, text })
 *   onBack: function()
 */
// PUBLIC_INTERFACE
function DiaryPage({ mood, onSave, onBack }) {
  const [entryText, setEntryText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Map mood -> mood label/emoji for visual feedback
  const moodDetails = {
    happy:   { label: "Happy", emoji: "😄" },
    sad:     { label: "Sad", emoji: "😢" },
    excited: { label: "Excited", emoji: "🤩" },
    calm:    { label: "Calm", emoji: "🧘" },
    energetic: { label: "Energetic", emoji: "⚡" },
    angry:   { label: "Angry", emoji: "😡" },
    chill:   { label: "Chill", emoji: "🧊" }
  };
  const md = moodDetails[mood] || { label: mood || "Unknown", emoji: "" };

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(res => setTimeout(res, 800));
    setSaving(false);
    setSaveSuccess(true);
    if (onSave) onSave({ mood, text: entryText });
    setTimeout(() => setSaveSuccess(false), 1100);
    setEntryText("");
  };

  return (
    <div className="container flex-col gap-lg" style={{ marginTop: "85px", marginBottom: "80px" }}>
      <section className="card" style={{ minHeight: 230 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
          <button className="btn" type="button" style={{ minWidth: 38, fontSize: '1.13em', padding: '6px 14px' }} onClick={onBack} aria-label="Back to main">
            ← Back
          </button>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.39rem' }}>
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
            transition: "border-color 0.22s, box-shadow 0.27s"
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
      </section>
    </div>
  );
}

export default DiaryPage;
