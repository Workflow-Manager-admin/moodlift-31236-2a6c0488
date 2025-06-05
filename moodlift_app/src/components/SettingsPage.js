import React, { useState } from "react";
import "./SettingsPage.css";

/**
 * SettingsPage – Vibrant, playful, mood-adaptive settings page.
 *
 * Props:
 *   mood (string): current selected mood, for dynamic theming
 *   onThemeColorChange (function): optional, fires on every theme color change with {primary, secondary, accent}
 */

// PUBLIC_INTERFACE
function SettingsPage({ mood, onThemeColorChange }) {
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

  // Utility to get current root-level CSS variable
  function getCssVar(varName, fallback = "#ffffff") {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName);
    return val && val.trim() !== "" ? val.trim() : fallback;
  }
  // Utility: set a CSS variable on root
  function setCssVar(varName, value) {
    document.documentElement.style.setProperty(varName, value);
  }

  // Initial color state from current theme CSS variables
  const [primaryColor, setPrimaryColor] = useState(getCssVar("--primary", "#FFB347"));
  const [secondaryColor, setSecondaryColor] = useState(getCssVar("--secondary", "#6EC6FF"));
  const [accentColor, setAccentColor] = useState(getCssVar("--accent", "#FF69B4"));

  // Update color and CSS variable, propagate up if prop exists
  function handleColorChange(colorVar, setColor, newColor) {
    setColor(newColor);
    setCssVar(colorVar, newColor);
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
    // Inform parent via onThemeColorChange, if supplied
    if (typeof onThemeColorChange === "function") {
      onThemeColorChange({
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
      "--accent": "#FF69B4"
    };
    setPrimaryColor(defaults["--primary"]);
    setSecondaryColor(defaults["--secondary"]);
    setAccentColor(defaults["--accent"]);
    Object.keys(defaults).forEach((k) => setCssVar(k, defaults[k]));
    document.body.classList.add("mood-theme-transition");
    setTimeout(() => document.body.classList.remove("mood-theme-transition"), 700);
    // Inform parent for reset too
    if (typeof onThemeColorChange === "function") {
      onThemeColorChange({
        primary: defaults["--primary"],
        secondary: defaults["--secondary"],
        accent: defaults["--accent"],
      });
    }
  }

  // Fun, vibrant palette for color swatches
  const swatchOptions = [
    "#FFB347", "#FFD700", "#FFE066", "#FF65A3", "#7AF9FF", "#6EC6FF",
    "#FF69B4", "#ce68fc", "#FFD166", "#53B2A9", "#8DE9C3", "#A0C3D2", "#FF6B06", "#300000"
  ];

  function renderColorSwatches(current, setColor, cssVar) {
    return (
      <div
        role="group"
        aria-label={
          cssVar === "--primary"
            ? "Primary color swatches"
            : cssVar === "--secondary"
            ? "Secondary color swatches"
            : "Accent color swatches"
        }
        style={{ display: "flex", gap: 5, marginLeft: 8, alignItems: "center" }}
      >
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
            aria-label={
              (cssVar === "--primary"
                ? "Primary"
                : cssVar === "--secondary"
                ? "Secondary"
                : "Accent") +
              " color swatch " +
              sw
            }
            tabIndex={0}
            type="button"
            onClick={() => handleColorChange(cssVar, setColor, sw)}
            title={sw}
          />
        ))}
      </div>
    );
  }
  // Actual rendering of settings options for three theme colors
  return (
    <div
      className="settings-fullscreen flex-col gap-lg settings-vibrant-bg"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto"
      }}
      role="main"
      aria-label="Theme Settings"
    >
      <section className="card settings-card-bounce"
        style={{
          background: "linear-gradient(117deg, rgba(255,255,255,0.13) 50%, var(--base-light, #FFFDE9) 130%)",
          borderLeft: "10px solid var(--accent)",
          boxShadow: "0 4px 38px 0 var(--primary), 0 1.5px 24px var(--accent, #FF69B4, 0.09), 0 4px 23px 0 var(--accent)",
          minWidth: "clamp(320px, 90vw, 650px)",
          maxWidth: "96vw",
          width: "100%",
          margin: "0 auto",
          marginTop: 0,
          marginBottom: 0,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="settings-header fancyify">
          <span className="settings-emoji" aria-hidden="true">
            {mm.emoji}
          </span>
          <h2 className="settings-title">{mm.header}</h2>
        </div>
        <div className="settings-main-card" aria-label="Vibrant Theme Options">
          <div className="settings-subtitle">Theme Colors</div>
          <div className="settings-options">
            {/* Primary Color Picker and Swatches */}
            <div
              className="settings-option-row"
              tabIndex={0}
              aria-label="Select the primary color for the theme"
              role="group"
            >
              <label
                className="settings-label"
                htmlFor="color-primary"
                style={{ minWidth: 110 }}
              >
                Primary Color:
              </label>
              <input
                type="color"
                id="color-primary"
                value={primaryColor}
                aria-label="Pick primary color"
                onChange={e =>
                  handleColorChange("--primary", setPrimaryColor, e.target.value)
                }
                style={{
                  width: 42,
                  height: 31,
                  borderRadius: 8,
                  border: "2.5px solid var(--primary)",
                  background: "#fff"
                }}
              />
              {renderColorSwatches(primaryColor, setPrimaryColor, "--primary")}
              <span
                aria-label="Current primary color code"
                style={{ marginLeft: 10, color: primaryColor, fontWeight: 600 }}
              >
                {primaryColor}
              </span>
            </div>

            {/* Secondary Color Picker and Swatches */}
            <div
              className="settings-option-row"
              tabIndex={0}
              aria-label="Select the secondary color for the theme"
              role="group"
            >
              <label
                className="settings-label"
                htmlFor="color-secondary"
                style={{ minWidth: 110 }}
              >
                Secondary:
              </label>
              <input
                type="color"
                id="color-secondary"
                value={secondaryColor}
                aria-label="Pick secondary color"
                onChange={e =>
                  handleColorChange("--secondary", setSecondaryColor, e.target.value)
                }
                style={{
                  width: 42,
                  height: 31,
                  borderRadius: 8,
                  border: "2.5px solid var(--secondary)",
                  background: "#fff"
                }}
              />
              {renderColorSwatches(secondaryColor, setSecondaryColor, "--secondary")}
              <span
                aria-label="Current secondary color code"
                style={{ marginLeft: 10, color: secondaryColor, fontWeight: 600 }}
              >
                {secondaryColor}
              </span>
            </div>

            {/* Accent Color Picker and Swatches */}
            <div
              className="settings-option-row"
              tabIndex={0}
              aria-label="Select an accent color for highlights"
              role="group"
            >
              <label
                className="settings-label"
                htmlFor="color-accent"
                style={{ minWidth: 110 }}
              >
                Accent:
              </label>
              <input
                type="color"
                id="color-accent"
                value={accentColor}
                aria-label="Pick accent color"
                onChange={e =>
                  handleColorChange("--accent", setAccentColor, e.target.value)
                }
                style={{
                  width: 42,
                  height: 31,
                  borderRadius: 8,
                  border: "2.5px solid var(--accent)",
                  background: "#fff"
                }}
              />
              {renderColorSwatches(accentColor, setAccentColor, "--accent")}
              <span
                aria-label="Current accent color code"
                style={{ marginLeft: 10, color: accentColor, fontWeight: 600 }}
              >
                {accentColor}
              </span>
            </div>

            {/* Reset Colors Button */}
            <div
              className="settings-option-row"
              style={{ justifyContent: "flex-end" }}
              tabIndex={0}
              aria-label="Reset theme colors to app default"
            >
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
                  minWidth: 105
                }}
                aria-label="Reset theme colors to default"
              >
                Reset Colors
              </button>
              <span
                style={{
                  color: "var(--text-secondary, #fff7)",
                  fontSize: "0.98em",
                  fontStyle: "italic",
                  alignSelf: "center",
                  marginLeft: 6
                }}
              >
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
