import React, { useState, useEffect } from "react";

/**
 * ProfilePage (Refactored)
 * - Profile fields (username, date of birth, mood status) are editable in-place.
 * - Diary entries are displayed in a list, but diary entry input/editor is removed:
 *   new entries are added ONLY via DiaryPage and provided in the diaries prop.
 * - All changes propagate via the onProfileChange prop for state lifting.
 * - Mood-based theming is preserved for all elements.
 *
 * Props:
 *   mood (string | null): current mood for theming
 *   username (string): initial username, controlled
 *   dateOfBirth (string): initial DOB (ISO), controlled
 *   dailyMoodStatus (string): current mood, controlled
 *   diaries (array): list of diary entries [{date, mood, text}]
 *   onProfileChange (function): fires when username, dob, or mood status is changed ({ username, dateOfBirth, dailyMoodStatus })
 */
// PUBLIC_INTERFACE
function ProfilePage({
  mood,
  username: initialUsername = "",
  dateOfBirth: initialDOB = "",
  dailyMoodStatus: initialDailyMood = "",
  diaries = [],
  onProfileChange,
}) {
  // Controlled fields: internal state for fast UI, propagate up on Save/Update
  const [username, setUsername] = useState(initialUsername || "");
  const [editingUsername, setEditingUsername] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(initialDOB || "");
  const [editingDOB, setEditingDOB] = useState(false);

  const [dailyMoodStatus, setDailyMoodStatus] = useState(initialDailyMood || "");

  // Moods for mood selector
  const moodOptions = [
    { key: "happy", label: "Happy", emoji: "😄" },
    { key: "sad", label: "Sad", emoji: "😢" },
    { key: "excited", label: "Excited", emoji: "🤩" },
    { key: "calm", label: "Calm", emoji: "🧘" },
    { key: "energetic", label: "Energetic", emoji: "⚡" },
    { key: "angry", label: "Angry", emoji: "😡" },
    { key: "chill", label: "Chill", emoji: "🧊" },
  ];

  // Mood meta for avatar/vibe lines
  const moodMeta = {
    happy:     { emoji: "😄", vibe: "Ready to smile!" },
    sad:       { emoji: "😢", vibe: "Gentle mood" },
    excited:   { emoji: "🤩", vibe: "Buzzing with energy!" },
    calm:      { emoji: "🧘", vibe: "Peaceful mind" },
    energetic: { emoji: "⚡",  vibe: "You’re on fire!" },
    angry:     { emoji: "😡", vibe: "Let it out!" },
    chill:     { emoji: "🧊", vibe: "Chillin’" },
    default:   { emoji: "🙂", vibe: "Welcome aboard!" }
  };
  const mainMood = (
    (dailyMoodStatus && moodMeta[dailyMoodStatus])
      ? dailyMoodStatus
      : (mood && moodMeta[mood])
        ? mood
        : null
  );
  const mm = moodMeta[mainMood] || moodMeta[mood] || moodMeta.default;

  // Sync from parent when navigating away => back: controlled updates
  useEffect(() => { setUsername(initialUsername); }, [initialUsername]);
  useEffect(() => { setDateOfBirth(initialDOB); }, [initialDOB]);
  useEffect(() => { setDailyMoodStatus(initialDailyMood || ""); }, [initialDailyMood]);

  function getPrettyDate(dobStr) {
    if (!dobStr) return "";
    const d = new Date(dobStr);
    if (isNaN(d)) return dobStr;
    const opts = { year: "numeric", month: "long", day: "numeric" };
    return d.toLocaleDateString(undefined, opts);
  }
  function getAge(dobStr) {
    if (!dobStr) return null;
    const d = new Date(dobStr);
    if (isNaN(d)) return null;
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  }
  function isBirthdayToday(dobStr) {
    if (!dobStr) return false;
    const d = new Date(dobStr);
    if (isNaN(d)) return false;
    const today = new Date();
    return today.getDate() === d.getDate() && today.getMonth() === d.getMonth();
  }
  function moodLabelString(moodKey) {
    const m = moodMeta[moodKey];
    if (!m) return moodKey;
    return `${m.emoji} ${moodKey.charAt(0).toUpperCase()}${moodKey.slice(1)}`;
  }

  // Save updated username/dob/mood - lift state up
  function handleProfileSave(field) {
    if (onProfileChange) {
      onProfileChange({
        username,
        dateOfBirth,
        dailyMoodStatus,
      });
    }
    // turn off editors
    if (field === "username") setEditingUsername(false);
    if (field === "dob") setEditingDOB(false);
  }

  // Theming is handled via CSS vars

  return (
    <div className="container flex-col gap-lg" style={{ marginTop: 90, marginBottom: 85 }}>
      {/* Profile Main Card */}
      <section
        className="card"
        style={{
          minHeight: 270,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          background: "rgba(255,255,255,0.14)",
          borderLeft: "8px solid var(--primary)",
          boxShadow: "0 2px 14px 0 rgba(20,70,120,0.13)",
          fontFamily: "inherit",
          transition: "background 0.7s, color 0.68s, font-family 0.62s",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            marginTop: 16,
            marginBottom: 16,
            width: 95,
            height: 95,
            borderRadius: "50%",
            border: `5px solid var(--accent)`,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.2rem",
            boxShadow: "0 0 23px 0 rgba(80,80,160,0.10)",
            transition: "border-color 0.45s, background 0.57s"
          }}
          aria-label={`Profile avatar - ${mainMood || mood || "default"} mood`}
        >
          {mm.emoji}
        </div>

        {/* Username (editable) */}
        <div style={{
          fontSize: "1.33em",
          minHeight: "1.7em",
          fontWeight: 700,
          marginBottom: 2,
          color: "var(--text-color, #fff)",
          letterSpacing: "0.01em",
          textAlign: "center"
        }}>
          {editingUsername ? (
            <span>
              <input
                type="text"
                value={username}
                autoFocus
                placeholder="Enter your username"
                onChange={e => setUsername(e.target.value)}
                style={{
                  fontWeight: 700,
                  fontSize: "1.07em",
                  borderRadius: 8,
                  padding: "3px 7px",
                  border: "1.4px solid var(--primary)",
                  outline: "none",
                  background: "rgba(255,255,255,.15)",
                  color: "var(--text-color, #fff)",
                  marginRight: 5
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") handleProfileSave("username");
                  if (e.key === "Escape") setEditingUsername(false);
                }}
              />
              <button
                className="btn"
                style={{padding: "3px 9px", fontSize: "1em"}}
                onClick={() => handleProfileSave("username")}
                aria-label="Save username">💾</button>
              <button
                className="btn"
                style={{padding:"3px 8px", fontSize:"1em"}}
                onClick={() => { setUsername(""); setEditingUsername(false); }}>✖</button>
            </span>
          ) : (
            <>
              {username === "" ? <span style={{color: "#fff9a6", opacity:0.78, fontStyle:"italic"}}>No username set</span> : username}
              <button
                className="btn"
                type="button"
                style={{ fontSize: "0.99em", marginLeft: 10, padding: "3px 10px"}}
                onClick={() => setEditingUsername(true)}
                aria-label="Edit username"
                title="Edit username"
              >✏️</button>
            </>
          )}
        </div>

        {/* Date of Birth (editable date picker) */}
        <div style={{
          color: "var(--text-secondary, #fff9)",
          fontSize: "1.05em",
          marginBottom: 0,
          marginTop: -2,
          textAlign: "center"
        }}>
          Date of Birth:&nbsp;
          {editingDOB ? (
            <>
              <input
                type="date"
                value={dateOfBirth}
                placeholder="Enter your date of birth"
                autoFocus
                onChange={e => setDateOfBirth(e.target.value)}
                style={{
                  fontWeight: 500,
                  fontSize: "1em",
                  borderRadius: 8,
                  padding: "3px 7px",
                  border: "1.2px solid var(--primary)",
                  outline: "none",
                  background: "rgba(255,255,255,.14)",
                  color: "var(--text-color, #fff)",
                  marginRight: 9
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") handleProfileSave("dob");
                  if (e.key === "Escape") setEditingDOB(false);
                }}
              />
              <button
                className="btn"
                style={{padding: "3px 7px", fontSize:"1em"}}
                onClick={() => handleProfileSave("dob")}
                aria-label="Save DOB">💾</button>
              <button
                className="btn"
                style={{padding:"3px 8px", fontSize:"1em"}}
                onClick={() => { setDateOfBirth(""); setEditingDOB(false); }}>✖</button>
            </>
          ) : (
            <>
              {dateOfBirth === "" ? <span style={{color: "#fff9a6", opacity:0.78, fontStyle:"italic"}}>Date of birth not set</span> : getPrettyDate(dateOfBirth)}
              {getAge(dateOfBirth) !== null && dateOfBirth !== "" && (
                <span style={{ opacity: 0.82, marginLeft: 10 }}>({getAge(dateOfBirth)} yrs)</span>
              )}
              <button
                className="btn"
                style={{fontSize:"0.97em", marginLeft:7, padding:"3px 9px"}}
                onClick={() => setEditingDOB(true)}
                aria-label="Edit date of birth"
                title="Edit date of birth"
              >✏️</button>
            </>
          )}
        </div>

        {/* Birthday wish */}
        {isBirthdayToday(dateOfBirth) && (
          <div style={{
            color: "var(--accent, #FFB800)",
            fontWeight: 600,
            marginTop: 7,
            fontSize: "1.12em",
            letterSpacing: "0.02em",
            textShadow: "0 2px 8px rgba(255,216,99,0.11)"
          }}>
            🎉 Happy Birthday, {username.split(" ")[0] || "Friend"}! 🎈
          </div>
        )}

        {/* Daily Mood Status (select) */}
        <div
          style={{
            margin: "20px 0 5px 0",
            color: "var(--text-color, #fff)",
            fontWeight: 600,
            fontSize: "1.13em",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Today's Mood:&nbsp;
          <span>
            <select
              style={{
                fontWeight: 700,
                color: dailyMoodStatus ? "var(--primary)" : "#bbb",
                background: "rgba(255,255,255,0.13)",
                border: "1.5px solid var(--primary)",
                borderRadius: 8,
                fontSize: "1.07em",
                padding: "2.5px 11px",
                marginRight: 7,
                marginLeft: 5,
                transition: "color 0.7s, font-family 0.7s"
              }}
              value={dailyMoodStatus || ""}
              onChange={e => {
                setDailyMoodStatus(e.target.value);
                if (onProfileChange) {
                  onProfileChange({
                    username,
                    dateOfBirth,
                    dailyMoodStatus: e.target.value
                  });
                }
              }}
            >
              <option value="" disabled>
                Select your mood for today
              </option>
              {moodOptions.map(m =>
                <option key={m.key} value={m.key}>{m.emoji} {m.label}</option>
              )}
            </select>
          </span>
        </div>
        <div
          style={{
            color: "var(--text-secondary, #fff8)",
            fontSize: "1em",
            fontStyle: "italic",
            marginBottom: 14,
            textShadow: "0 1px 6px rgba(20,20,40,0.12)"
          }}
        >
          {dailyMoodStatus ? (moodMeta[dailyMoodStatus]?.vibe || "Vibin'!") : mm.vibe}
        </div>
      </section>

      {/* Diary List */}
      <section
        className="card"
        style={{
          marginTop: 4,
          background: "rgba(255,255,255,0.19)",
          borderLeft: "7px solid var(--secondary)",
          boxShadow: "0 2px 14px 0 rgba(21,70,120,0.10)",
          minHeight: 110,
          fontFamily: "inherit"
        }}
      >
        <h2 style={{
          fontWeight: 700,
          fontSize: "1.17em",
          color: "var(--secondary, #6EC6FF)",
          letterSpacing: 0.02,
          marginBottom: 10,
          marginTop: 4
        }}>
          My Diary Entries
        </h2>
        {(!diaries || diaries.length === 0) && (
          <div className="placeholder-text" style={{ marginTop: 10 }}>
            No diary entries yet.
          </div>
        )}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
          {diaries && diaries.map((entry, idx) => {
            const entryDate = new Date(entry.date);
            const prettyDate = isNaN(entryDate)
              ? entry.date
              : entryDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            return (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.09)",
                  borderLeft: `5.5px solid var(--primary)`,
                  borderRadius: 10,
                  padding: "8px 14px 8px 13px",
                  color: "var(--text-color, #fff)",
                  boxShadow: "0 1.8px 7px rgba(50,40,60,0.09)",
                  fontSize: "1.04em",
                  position: "relative"
                }}
              >
                <span style={{
                  fontWeight: 600,
                  color: "var(--accent)",
                  fontSize: "1.01em",
                  marginRight: 7,
                  opacity: 0.95,
                  letterSpacing: 0.01
                }}>
                  {moodLabelString(entry.mood)}
                </span>
                <span style={{
                  color: "var(--text-secondary, #ffe9)",
                  fontSize: "0.96em",
                  marginLeft: 0,
                  fontWeight: 400
                }}>
                  {prettyDate}
                </span>
                <div style={{
                  marginTop: 3,
                  whiteSpace: "pre-line",
                  fontWeight: 400,
                  fontSize: "1em"
                }}>
                  {entry.text}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
