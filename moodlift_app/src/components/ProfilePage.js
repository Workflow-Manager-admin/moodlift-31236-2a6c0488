import React from "react";

/**
 * ProfilePage – User profile display with username, date of birth, birthday wishes, mood status, and diary list.
 * Receives:
 *   - mood: string | null (current theme/mood)
 *   - username: string (user's name)
 *   - dateOfBirth: string (ISO date format, e.g. "1999-01-22")
 *   - dailyMoodStatus: string ("happy", "sad", etc.)
 *   - diaries: array of entries: [{date, mood, text}]
 */
// PUBLIC_INTERFACE
function ProfilePage({
  mood,
  username = "John Doe",
  dateOfBirth = "1998-02-28",
  dailyMoodStatus,
  diaries = []
}) {
  // Mood visual meta
  const moodMeta = {
    happy:     { emoji: "😄", vibe: "Ready to smile!" },
    sad:       { emoji: "😢", vibe: "Gentle mood" },
    excited:   { emoji: "🤩", vibe: "Buzzing with energy!" },
    calm:      { emoji: "🧘", vibe: "Peaceful mind" },
    energetic: { emoji: "⚡", vibe: "You’re on fire!" },
    angry:     { emoji: "😡", vibe: "Let it out!" },
    chill:     { emoji: "🧊", vibe: "Chillin’" },
    default:   { emoji: "🙂", vibe: "Welcome aboard!" }
  };
  const mainMood = (dailyMoodStatus && moodMeta[dailyMoodStatus]) ? dailyMoodStatus : (mood && moodMeta[mood]) ? mood : null;
  const mm = moodMeta[mainMood] || moodMeta[mood] || moodMeta.default;

  // Helpers
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

  // Theming for main section and cards leverages App.css mood variables via CSS vars.
  return (
    <div className="container flex-col gap-lg" style={{ marginTop: 90, marginBottom: 85 }}>
      {/* Profile Main Card */}
      <section
        className="card"
        style={{
          minHeight: 260,
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
        {/* User Info + DOB */}
        <div
          style={{
            fontSize: "1.41em",
            fontWeight: 700,
            marginBottom: 3,
            color: "var(--text-color, #fff)",
            letterSpacing: "0.01em",
            textAlign: "center"
          }}
        >
          {username}
        </div>
        <div
          style={{
            color: "var(--text-secondary, #fff9)",
            fontSize: "1.05em",
            marginBottom: 0,
            marginTop: -2,
            textAlign: "center"
          }}
        >
          Date of Birth: {getPrettyDate(dateOfBirth)}
          {"  "}
          {getAge(dateOfBirth) !== null && (
            <span style={{ opacity: 0.82, marginLeft: 10 }}>({getAge(dateOfBirth)} yrs)</span>
          )}
        </div>
        {/* Birthday Wish */}
        {isBirthdayToday(dateOfBirth) && (
          <div style={{
            color: "var(--accent, #FFB800)",
            fontWeight: 600,
            marginTop: 7,
            fontSize: "1.13em",
            letterSpacing: "0.02em",
            textShadow: "0 2px 8px rgba(255,216,99,0.11)"
          }}>
            🎉 Happy Birthday, {username.split(" ")[0] || "Friend"}! 🎈
          </div>
        )}

        {/* Daily Mood Status */}
        <div
          style={{
            margin: "18px 0 9px 0",
            color: "var(--text-color, #fff)",
            fontWeight: 600,
            fontSize: "1.13em",
            textAlign: "center"
          }}
        >
          Today's Mood:{" "}
          <b style={{ fontWeight: 700, color: "var(--primary)", letterSpacing: 0.01 }}>
            {dailyMoodStatus ? moodLabelString(dailyMoodStatus) : "Not Set"}
          </b>
        </div>
        {/* Current Vibe Line */}
        <div
          style={{
            color: "var(--text-secondary, #fff8)",
            fontSize: "1em",
            fontStyle: "italic",
            marginBottom: 14,
            textShadow: "0 1px 6px rgba(20,20,40,0.12)"
          }}
        >
          {mm.vibe}
        </div>
      </section>
      {/* Diaries List */}
      <section
        className="card"
        style={{
          marginTop: 4,
          background: "rgba(255,255,255,0.18)",
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
