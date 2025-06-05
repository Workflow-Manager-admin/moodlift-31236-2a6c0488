import React from "react";

/**
 * SettingsPage – Mood-adaptive placeholder settings component
 * - Adapts its styling to the current mood (prop)
 * - Placeholder UI for future real settings
 * 
 * Props:
 *   mood (string): current selected mood, for dynamic theming
 */
// PUBLIC_INTERFACE
function SettingsPage({ mood }) {
  // Mood details for emoji header or highlight
  const moodMeta = {
    happy:     { emoji: "😄", header: "Sunny Settings" },
    sad:       { emoji: "😢", header: "Gentle Settings" },
    excited:   { emoji: "🤩", header: "Energized Settings" },
    calm:      { emoji: "🧘", header: "Calm Settings" },
    energetic: { emoji: "⚡", header: "Zesty Settings" },
    angry:     { emoji: "😡", header: "Chill Down Settings" },
    chill:     { emoji: "🧊", header: "Chill Settings" },
    default:   { emoji: "⚙️", header: "App Settings" }
  };
  const mm = moodMeta[mood] || moodMeta.default;

  // All styling comes from app-level CSS variables for mood theming
  return (
    <div className="container flex-col gap-lg" style={{ marginTop: 90, marginBottom: 85 }}>
      <section
        className="card"
        style={{
          minHeight: 250,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          background: "rgba(255,255,255,0.17)",
          borderLeft: "8px solid var(--primary)",
          boxShadow: "0 2px 16px 0 rgba(20,70,120,0.10)",
          fontFamily: "inherit",
          transition: "background 0.75s, color 0.7s, font-family 0.69s"
        }}
      >
        <div style={{marginTop: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 13}}>
          <span style={{fontSize: "2.3rem"}}>{mm.emoji}</span>
          <h2 style={{
            fontSize: "1.42rem",
            margin: 0,
            color: "var(--text-color, #fff)",
            fontWeight: 700,
            transition: "color 0.7s, font-family 0.7s"
          }}>
            {mm.header}
          </h2>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.09)",
          borderRadius: 11,
          padding: "18px 22px 12px 22px",
          boxShadow: "0 2px 10px 0 rgba(40,40,100,0.10)",
          minWidth: 210,
          width: "100%",
          maxWidth: 430,
          transition: "background 0.65s"
        }}>
          <div style={{
            fontSize: "1.16em",
            fontWeight: 600,
            marginBottom: 13,
            color: "var(--primary, #ffb347)"
          }}>Settings (Placeholder)</div>

          <div style={{
            display: "flex", flexDirection: "column", gap: 16
          }}>
            <div>
              <label style={{
                fontWeight: 500, color: "var(--text-secondary, #fff9)", marginRight: 8
              }}>
                Dark mode: 
              </label>
              {/* Non-functional switch (just a demo visual) */}
              <input type="checkbox" disabled style={{
                accentColor: "var(--accent, #FF69B4)",
                transform: "scale(1.25)",
                cursor: "not-allowed"
              }}/> <span style={{color:"#fff7", fontSize:"0.98em"}}>(Coming soon)</span>
            </div>
            <div>
              <label style={{
                fontWeight: 500, color: "var(--text-secondary, #fff9)", marginRight: 8
              }}>
                Notifications: 
              </label>
              <input type="checkbox" disabled style={{
                accentColor: "var(--primary, #FFB347)",
                transform: "scale(1.25)",
                cursor: "not-allowed"
              }}/> <span style={{color:"#fff7", fontSize:"0.98em"}}>(Coming soon)</span>
            </div>
            <div style={{color:"var(--accent, #FF69B4)", fontStyle: "italic", fontSize: "1.01em", opacity: 0.92, marginTop: 11}}>
              Personalize your MoodLift experience soon!
            </div>
          </div>
        </div>
        {/* Placeholder text, encourages future expansion */}
        <div
          className="placeholder-text"
          style={{
            marginTop: 29,
            opacity: 0.9,
            fontSize: "1.07em"
          }}
        >
          More settings and customization options will be available soon. <br/>
          Your experience will adapt with your mood!
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
