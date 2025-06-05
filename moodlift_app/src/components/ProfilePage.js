import React from "react";

/**
 * ProfilePage component – Placeholder user profile
 * Receives `mood` prop to adapt styling/theme to current mood.
 * Displays avatar, user name, and sections for stats/features.
 * 
 * Props:
 *   mood: string | null  // Current mood, for adaptive theme and emojis
 */
// PUBLIC_INTERFACE
function ProfilePage({ mood }) {
  // Mood details for avatar ring color, emoji/icon, and vibe text (extendable)
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
  const mm = moodMeta[mood] || moodMeta.default;

  // Main container adapts via CSS variables and card pattern
  return (
    <div className="container flex-col gap-lg" style={{ marginTop: 90, marginBottom: 85 }}>
      <section
        className="card"
        style={{
          minHeight: 280,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          background: "rgba(255,255,255,0.18)",
          borderLeft: "8px solid var(--primary)",
          boxShadow: "0 2px 16px 0 rgba(20,70,120,0.13)",
          fontFamily: "inherit",
          transition: "background 0.85s, color 0.7s, font-family 0.75s",
        }}
      >
        {/* Avatar / Profile image (placeholder) */}
        <div
          style={{
            marginTop: 17,
            marginBottom: 20,
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: `5px solid var(--accent)`,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.75rem",
            boxShadow: "0 0 24px 0 rgba(80,80,160,0.18)",
            transition: "border-color 0.55s, background 0.75s"
          }}
          aria-label={`Profile avatar - ${mood || "default"} mood`}
        >
          {mm.emoji}
        </div>
        {/* User Name (placeholder) */}
        <div
          style={{
            fontSize: "1.44em",
            fontWeight: 700,
            marginBottom: 6,
            color: "var(--text-color, #fff)",
            letterSpacing: ".01em"
          }}
        >
          John Doe
        </div>
        {/* Mood-adaptive subtitle */}
        <div
          style={{
            color: "var(--text-secondary, #fff9)",
            fontSize: "1.09em",
            fontStyle: "italic",
            marginBottom: 21,
            textShadow: "0 1px 5px rgba(20,20,40,0.13)"
          }}
        >
          {mm.vibe}
        </div>
        {/* Profile stats (future features layout) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            gap: 18,
            marginTop: 5
          }}
        >
          <div
            style={{
              minWidth: 87,
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 11,
              padding: "11px 7px 7px 7px",
              boxShadow: "0 1px 5px 0 rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "1.25em", color: "var(--primary)" }}>0</div>
            <div style={{ fontSize: "0.97em", color: "var(--text-secondary)" }}>Diaries</div>
          </div>
          <div
            style={{
              minWidth: 87,
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 11,
              padding: "11px 7px 7px 7px",
              boxShadow: "0 1px 5px 0 rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "1.25em", color: "var(--secondary)" }}>0</div>
            <div style={{ fontSize: "0.97em", color: "var(--text-secondary)" }}>Mood Stats</div>
          </div>
          <div
            style={{
              minWidth: 87,
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 11,
              padding: "11px 7px 7px 7px",
              boxShadow: "0 1px 5px 0 rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "1.25em", color: "var(--accent)" }}>Soon</div>
            <div style={{ fontSize: "0.97em", color: "var(--text-secondary)" }}>Achievements</div>
          </div>
        </div>
        {/* Placeholder/expansion for future features */}
        <div
          className="placeholder-text"
          style={{
            marginTop: 29,
            opacity: 0.93,
            fontSize: "1.06em"
          }}
        >
          Future: View your mood diary history, unlock badges, and track achievements here!
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
