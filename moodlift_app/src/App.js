import React, { useState, useCallback } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import './components/MoodSelector.css';

// PUBLIC_INTERFACE
function App() {
  // Track the selected mood for the session (future: persist or send to backend if needed)
  const [selectedMood, setSelectedMood] = useState(null);

  // Placeholder: In the future, use this hook for AI/auto detection of mood
  // const detectAIMood = useCallback(() => {
  //   // TODO: Implement Kavia AI-based mood detection here
  // }, []);

  const handleMoodChange = useCallback((moodKey) => {
    setSelectedMood(moodKey);
    // TODO: Use this to trigger mood-specific content fetch
  }, []);

  return (
    <div className="app">
      {/* Navbar at the top */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="logo-symbol">*</span> MoodLift
          </div>
          <div className="theme-bar">
            {/* Theming bar placeholder; in future, place theme toggles or indicators here */}
            <span role="img" aria-label="theme">🎨</span>
            Theme Bar
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="main-content">
        <div className="container flex-col gap-lg">

          {/* Mood Selector Section */}
          <section className="card mood-selector-card">
            <h2>Mood Selector</h2>
            <MoodSelector
              selectedMood={selectedMood}
              onMoodChange={handleMoodChange}
              // In the future, pass AI/auto detection handler here
            />
          </section>

          {/* --- Meme Bar Section --- */}
          <section className="card meme-bar">
            <h2>Meme Bar</h2>
            <div className="placeholder-text">[Scrolling memes will appear here]</div>
          </section>

          {/* --- Joke Bar Section --- */}
          <section className="card joke-bar">
            <h2>Joke Bar</h2>
            <div className="placeholder-text">[Scrolling jokes will appear here]</div>
          </section>

          {/* Scrollable GIF/Quote Cards (optional, can be extended) */}
          <div className="scrollable-content">
            <section className="card gif-card">
              {/* TODO: Replace with GIF/Quote content component */}
              <h2>GIF or Quote</h2>
              <div className="placeholder-text">[Motivational or Funny GIF/Quote card]</div>
            </section>
          </div>
        </div>
      </main>
      {/* Optionally, add a fixed theming bar or footer here in the future */}
    </div>
  );
}

export default App;
