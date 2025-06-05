import React from "react";
import "./BottomNavBar.css";

// PUBLIC_INTERFACE
function BottomNavBar({ selectedNav, onSelectNav }) {
  /**
   * Renders a fixed bottom navigation bar with icons and text
   * Mood-adaptive via CSS variables. Stands out vs header.
   * @param {string} selectedNav - Currently selected nav item.
   * @param {function} onSelectNav - Callback for nav item selection.
   */
  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: (
        <span className="bnv-icon" role="img" aria-label="Home">
          {/* house icon */}
          <svg viewBox="0 0 24 24" width="1.8em" height="1.8em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 4l9 6.5" />
            <path d="M4 10v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h4v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-9" />
          </svg>
        </span>
      ),
    },
    {
      key: "write",
      label: "Write Diary",
      icon: (
        <span className="bnv-icon" role="img" aria-label="Write Your Own Diary">
          {/* pen and book */}
          <svg viewBox="0 0 24 24" width="1.8em" height="1.8em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6v15h13"/>
            <path d="M16 3h5v19"/>
            <path d="M16 3v19"/>
            <path d="M6 7h6"/>
            <path d="M6 11h6"/>
            <path d="M6 15h4"/>
          </svg>
        </span>
      ),
    },
    {
      key: "profile",
      label: "Profile",
      icon: (
        <span className="bnv-icon" role="img" aria-label="Profile">
          {/* user icon */}
          <svg viewBox="0 0 24 24" width="1.8em" height="1.8em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7.2" r="4"/>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          </svg>
        </span>
      ),
    },
    {
      key: "settings",
      label: "Settings",
      icon: (
        <span className="bnv-icon" role="img" aria-label="Settings">
          {/* gear icon */}
          <svg viewBox="0 0 24 24" width="1.8em" height="1.8em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.68 1.68 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.68 1.68 0 0 0 15 19.4a1.68 1.68 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.68 1.68 0 0 0 8.6 15a1.68 1.68 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.68 1.68 0 0 0 15 8.6c.42-.19.91-.06 1.23.26l.06.06A1.68 1.68 0 0 0 19.4 9c.19.42.06.91-.26 1.23l-.06.06A1.68 1.68 0 0 0 19.4 15z"/>
          </svg>
        </span>
      ),
    }
  ];

  return (
    <nav className="bottom-nav-bar" role="navigation" aria-label="Main bottom navigation">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={`bnv-action${selectedNav === item.key ? " bnv-selected" : ""}`}
          aria-label={item.label}
          aria-current={selectedNav === item.key ? "page" : undefined}
          tabIndex={0}
          onClick={() => {
            // Always call onSelectNav so App.js can update page state accordingly.
            // This ensures DiaryPage renders any time "Write Diary" is selected.
            // Route 'profile' nav key specifically for Profile navigation.
            if (item.key === "profile") {
              onSelectNav && onSelectNav("profile");
            } else if (onSelectNav) {
              onSelectNav(item.key);
            }
          }}
          type="button"
        >
          {item.icon}
          <span className="bnv-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavBar;
