import React, { useState } from "react";
import "./SettingsPage.css";

/**
 * SettingsPage – Vibrant, playful, mood-adaptive settings page with live color tweak support.
 *
 * Props:
 *   mood (string): current selected mood, for dynamic theming
 *   onThemeChange (function): optional, pass up {primary, secondary, accent}
 */

// Utility to get current root-level CSS variable
function getCssVar(varName, fallback = "#ffffff") {
  // getComputedStyle may return " " if not yet set
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return val && val.trim() !== "" ? val.trim() : fallback;
}

// Utility: set a CSS variable on root
function setCssVar(varName, value) {
  document.documentElement.style.setProperty(varName, value);
}

// PUBLIC_INTERFACE
function SettingsPage({ mood, onThemeChange }) {
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

  // Initial color state from CSS variables
  const [primaryColor, setPrimaryColor] = useState(getCssVar("--primary", "#FFB347"));
  const [secondaryColor, setSecondaryColor] = useState(getCssVar("--secondary", "#6EC6FF"));
  const [accentColor, setAccentColor] = useState(getCssVar("--accent", "#FF69B4"));

  // Update color and CSS variable, propagate up if prop exists
  function handleColorChange(colorVar, setColor, newColor) {
    setColor(newColor);
    setCssVar(colorVar, newColor);
    // Animate the app transition
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
    if (onThemeChange) {
      // Let parent App.js know about the color changes if needed
      onThemeChange({
        primary: colorVar === "--primary" ? newColor : primaryColor,
        secondary: colorVar === "--secondary" ? newColor : secondaryColor,
        accent: colorVar === "--accent" ? newColor : accentColor,
      });
    }
  }

  // Reset colors to app defaults
  function handleResetColors() {
    const defaults = {
      "--primary": "#FFB347",
      "--secondary": "#6EC6FF",
      "--accent": "#FF69B4",
    };
    setPrimaryColor(defaults["--primary"]);
    setSecondaryColor(defaults["--secondary"]);
    setAccentColor(defaults["--accent"]);
    Object.keys(defaults).forEach(k => setCssVar(k, defaults[k]));
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
    if (onThemeChange) {
      onThemeChange({
        primary: defaults["--primary"],
        secondary: defaults["--secondary"],
        accent: defaults["--accent"],
      });
    }
  }

  // Swatch palette suggestions
  const swatchOptions = [
    "#FFB347", "#FFD700", "#FFE066", "#FF65A3", "#7AF9FF", "#6EC6FF", "#FF69B4",
    "#ce68fc", "#FFD166", "#53B2A9", "#8DE9C3", "#A0C3D2", "#FF6B06", "#300000"
  ];

  function renderColorSwatches(current, setColor, cssVar) {
    return (
      <div style={{ display: "flex", gap: 5, marginLeft: 8 }}>
        {swatchOptions.map((sw, i) => (
          <button
            key={sw + i}
            style={{
              width: 22,
              height: 22,
              borderRadius: 8,
              border: current === sw ? "2.1px solid #222" : "1.2px solid #999",
              background: sw,
              cursor: "pointer",
              outline: current === sw ? "2.5px solid var(--accent)" : "none",
              marginRight: 1,
              boxShadow: current === sw ? "0 1.5px 9px #0002" : "none"
            }}
            aria-label={"Select color " + sw}
            tabIndex={0}
            type="button"
            onClick={() => handleColorChange(cssVar, setColor, sw)}
            title={sw}
          />
        ))}
      </div>
    );
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
                onChange={e => handleColorChange("--primary", setPrimaryColor, e.target.value)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--primary)", background: "#fff"
                }}
              />
              {/* Swatches */}
              {renderColorSwatches(primaryColor, setPrimaryColor, "--primary")}
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
                onChange={e => handleColorChange("--secondary", setSecondaryColor, e.target.value)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--secondary)", background: "#fff"
                }}
              />
              {renderColorSwatches(secondaryColor, setSecondaryColor, "--secondary")}
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
                onChange={e => handleColorChange("--accent", setAccentColor, e.target.value)}
                style={{
                  width: 42, height: 31, borderRadius: 8, border: "2.5px solid var(--accent)", background: "#fff"
                }}
              />
              {renderColorSwatches(accentColor, setAccentColor, "--accent")}
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
