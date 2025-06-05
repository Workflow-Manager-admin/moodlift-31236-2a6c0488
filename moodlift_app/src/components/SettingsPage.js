import React, { useState } from "react";
import "./SettingsPage.css";

/**
 * SettingsPage – Vibrant, playful, mood-adaptive settings page.
 * Now includes color pickers for customizing primary, secondary, and accent theme colors.
 *
 * Props:
 *   mood (string): current selected mood, for dynamic theming
 */
 
// Utility: gets CSS variable value from root or fallback.
function getCssVar(varName, fallback = "#ffffff") {
  return getComputedStyle(document.documentElement).getPropertyValue(varName) || fallback;
}

// Utility: set CSS var and handle transitions on the fly
function setCssVar(varName, value) {
  document.documentElement.style.setProperty(varName, value);
}

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

  // Load initial color states from CSS vars
  const [primaryColor, setPrimaryColor] = useState(
    getCssVar("--primary", "#FFB347").trim() || "#FFB347"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    getCssVar("--secondary", "#6EC6FF").trim() || "#6EC6FF"
  );
  const [accentColor, setAccentColor] = useState(
    getCssVar("--accent", "#FF69B4").trim() || "#FF69B4"
  );

  // Change handlers that update CSS vars and state for immediate feedback
  function handleColorChange(e, colorVar, setColor) {
    setColor(e.target.value);
    // Animate transition
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
    setCssVar(colorVar, e.target.value);
  }

  // Optionally: reset to app default colors
  function handleResetColors() {
    const defaults = {
      primary: "#FFB347",
      secondary: "#6EC6FF",
      accent: "#FF69B4",
    };
    setPrimaryColor(defaults.primary);
    setSecondaryColor(defaults.secondary);
    setAccentColor(defaults.accent);
    setCssVar("--primary", defaults.primary);
    setCssVar("--secondary", defaults.secondary);
    setCssVar("--accent", defaults.accent);
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
  }

  return (
    <div className="container flex-col gap-lg settings-vibrant-bg" style={{ marginTop: 90, marginBottom: 85 }}>
      <section className="card settings-card-bounce">
        <div className="settings-header fancyify">
          <span className="settings-emoji">{mm.emoji}</span>
          <h2 className="settings-title">{mm.header}</h2>
        </div>
        <div className="settings-main-card">
          <div className="settings-subtitle">Theme Colors</div>
          <div className="settings-options">
            <div className="settings-option-row">
              <label className="settings-label" htmlFor="color-primary" style={{ minWidth: 110 }}>
                Primary Color:
              </label>
              <input
                type="color"
                id="color-primary"
                value={primaryColor}
                aria-label="Pick primary color"
                onChange={e => handleColorChange(e, "--primary", setPrimaryColor)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--primary)", background: "#fff"
                }}
              />
              <span style={{ marginLeft: 10, color: primaryColor, fontWeight: 600 }}>{primaryColor}</span>
            </div>
            <div className="settings-option-row">
              <label className="settings-label" htmlFor="color-secondary" style={{ minWidth: 110 }}>
                Secondary:
              </label>
              <input
                type="color"
                id="color-secondary"
                value={secondaryColor}
                aria-label="Pick secondary color"
                onChange={e => handleColorChange(e, "--secondary", setSecondaryColor)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--secondary)", background: "#fff"
                }}
              />
              <span style={{ marginLeft: 10, color: secondaryColor, fontWeight: 600 }}>{secondaryColor}</span>
            </div>
            <div className="settings-option-row">
              <label className="settings-label" htmlFor="color-accent" style={{ minWidth: 110 }}>
                Accent:
              </label>
              <input
                type="color"
                id="color-accent"
                value={accentColor}
                aria-label="Pick accent color"
                onChange={e => handleColorChange(e, "--accent", setAccentColor)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--accent)", background: "#fff"
                }}
              />
              <span style={{ marginLeft: 10, color: accentColor, fontWeight: 600 }}>{accentColor}</span>
            </div>
            <div className="settings-option-row" style={{ justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleResetColors}
                className="btn"
                style={{
                  background: "linear-gradient(92deg, var(--secondary), var(--primary))",
                  color: "var(--base-dark, #00008b)",
                  fontSize: "1em",
                  fontWeight: 700,
                  padding: "7px 18px",
                  borderRadius: 9,
                  marginLeft: 0,
                  marginRight: 12,
                  minWidth: 105,
                }}
                aria-label="Reset theme colors to default"
              >
                Reset Colors
              </button>
              <span style={{
                color: "var(--text-secondary, #fff7)",
                fontSize: "0.98em",
                fontStyle: "italic",
                alignSelf: "center",
                marginLeft: 6
              }}>
                Restore defaults
              </span>
            </div>
          </div>
        </div>
        <div className="settings-soon-note" style={{ marginTop: 11 }}>
          More settings and customization options will be available soon!
        </div>
        <div className="placeholder-text settings-placeholder-text-animate">
          Your experience will adapt with your color picks in real time!
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
