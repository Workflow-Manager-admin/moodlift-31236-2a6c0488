import React from "react";
import "./SettingsPage.css";

/**
 * SettingsPage – Vibrant, playful, mood-adaptive settings page.
 * Applies dynamic animated, cheerful backgrounds, bold accent colors, playful hover/transition effects, and 
 * friendlier, bolder UI elements – purely a visual upgrade, no logic changes.
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

  return (
    <div className="container flex-col gap-lg settings-vibrant-bg" style={{ marginTop: 90, marginBottom: 85 }}>
      <section className="card settings-card-bounce">
        <div className="settings-header fancyify">
          <span className="settings-emoji">{mm.emoji}</span>
          <h2 className="settings-title">{mm.header}</h2>
        </div>
        <div className="settings-main-card">
          <div className="settings-subtitle">Settings (Placeholder)</div>
          <div className="settings-options">
            <div className="settings-option-row">
              <label className="settings-label">
                Dark mode: 
              </label>
              <span className="settings-switch-wrap">
                <span className="faux-switch">
                  <input type="checkbox" disabled tabIndex={-1}/>
                  <span className="faux-slider"></span>
                </span>
                <span className="settings-option-hint">(Coming soon)</span>
              </span>
            </div>
            <div className="settings-option-row">
              <label className="settings-label">
                Notifications: 
              </label>
              <span className="settings-switch-wrap">
                <span className="faux-switch">
                  <input type="checkbox" disabled tabIndex={-1}/>
                  <span className="faux-slider"></span>
                </span>
                <span className="settings-option-hint">(Coming soon)</span>
              </span>
            </div>
            <div className="settings-soon-note">
              Personalize your MoodLift experience soon!
            </div>
          </div>
        </div>
        <div className="placeholder-text settings-placeholder-text-animate">
          More settings and customization options will be available soon. <br/>
          Your experience will adapt with your mood!
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
