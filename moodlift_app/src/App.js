import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import './components/MoodSelector.css';
import MemeJokeCard from './components/MemeJokeCard';

const MOOD_THEMES = {
  happy: {
    '--primary': '#FFE066',
    '--secondary': '#FFD24C',
    '--accent': '#FFB800',
    '--base-light': '#FFFFB0',
    '--base-dark': '#FFD24C',
    '--text-color': '#3C2E00',
    '--border-color': 'rgba(255, 190, 0, 0.18)',
    fontFamily: "'Fredoka One', 'Comic Sans MS', 'Inter', sans-serif",
    bodyBg: 'linear-gradient(120deg, #FFFDE9 40%, #FFE066 80%, #FFB800 100%)',
  },
  sad: {
    '--primary': '#5A80BA',
    '--secondary': '#A3B9CE',
    '--accent': '#6C91C2',
    '--base-light': '#DCE9F6',
    '--base-dark': '#284164',
    '--text-color': '#F2F6FB',
    '--border-color': 'rgba(60, 95, 165, 0.15)',
    fontFamily: "'Nunito', 'Roboto', 'Helvetica', sans-serif",
    bodyBg: 'linear-gradient(125deg, #284164 18%, #5A80BA 78%, #A3B9CE 100%)',
  },
  excited: {
    '--primary': '#FF65A3',
    '--secondary': '#FFF740',
    '--accent': '#7AF9FF',
    '--base-light': '#FFF8D3',
    '--base-dark': '#7BC8F9',
    '--text-color': '#61084B',
    '--border-color': 'rgba(255, 101, 163, 0.18)',
    fontFamily: "'Luckiest Guy', 'Caveat', 'Comic Sans MS', cursive, sans-serif",
    bodyBg: 'linear-gradient(110deg, #FFF740 35%, #FF65A3 65%, #7AF9FF 100%)',
  },
  calm: {
    '--primary': '#78D6C6',
    '--secondary': '#CAE9EA',
    '--accent': '#53B2A9',
    '--base-light': '#E3FDFD',
    '--base-dark': '#0A5259',
    '--text-color': '#1C3636',
    '--border-color': 'rgba(100, 180, 170, 0.13)',
    fontFamily: "'Quicksand', 'Comfortaa', 'Roboto', sans-serif",
    bodyBg: 'linear-gradient(120deg, #E3FDFD 10%, #78D6C6 70%, #53B2A9 95%)',
  },
  energetic: {
    '--primary': '#FF6B06',
    '--secondary': '#FFD166',
    '--accent': '#19F365',
    '--base-light': '#FFF2D9',
    '--base-dark': '#FF572B',
    '--text-color': '#FDB828',
    '--border-color': 'rgba(255, 107, 6, 0.18)',
    fontFamily: "'Bungee', 'Inter', 'Arial', cursive, sans-serif",
    bodyBg: 'linear-gradient(115deg, #FFD166 20%, #FF6B06 80%, #19F365 95%)',
  },
  angry: {
    '--primary': '#FF3939',
    '--secondary': '#FD8261',
    '--accent': '#6E0707',
    '--base-light': '#FFEDED',
    '--base-dark': '#300000',
    '--text-color': '#FEEBE6',
    '--border-color': 'rgba(255, 57, 57, 0.18)',
    fontFamily: "'Oswald', 'Roboto Condensed', 'Arial', sans-serif",
    bodyBg: 'linear-gradient(120deg, #300000 25%, #FD8261 74%, #FF3939 100%)',
  },
  chill: {
    '--primary': '#8DE9C3',
    '--secondary': '#A0C3D2',
    '--accent': '#ACD8AA',
    '--base-light': '#E4F9EF',
    '--base-dark': '#17403A',
    '--text-color': '#17403A',
    '--border-color': 'rgba(140, 210, 170, 0.13)',
    fontFamily: "'Manrope', 'Kumbh Sans', 'Quicksand', 'Arial', sans-serif",
    bodyBg: 'linear-gradient(120deg, #E4F9EF 15%, #8DE9C3 77%, #A0C3D2 100%)'
  }
};

const FALLBACK_THEME = {
  '--primary': '#FFB347',
  '--secondary': '#6EC6FF',
  '--accent': '#FF69B4',
  '--base-light': '#6EC6FF',
  '--base-dark': '#00008b',
  '--text-color': '#ffffff',
  '--border-color': 'rgba(255, 255, 255, 0.1)',
  fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
  bodyBg: 'linear-gradient(120deg, #00008b, #FFB347 70%, #FF69B4 100%)',
};

// Google Fonts loader helper
function loadWebFont(family, weights = ['400', '700']) {
  // Only inject once per font
  if (document.getElementById(`fontlink-${family}`)) return;
  const formattedFamily = family.replace(/ /g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = `fontlink-${family}`;
  link.href = `https://fonts.googleapis.com/css?family=${formattedFamily}:${weights.join(',')}&display=swap`;
  document.head.appendChild(link);
}

// PUBLIC_INTERFACE
function App() {
  // Track the selected mood for the session (future: persist or send to backend if needed)
  const [selectedMood, setSelectedMood] = useState(null);
  const [meme, setMeme] = useState(null); // meme object
  const [joke, setJoke] = useState(null); // joke object
  const prevMood = useRef(null);

  // --- MOCK APIs (stubbed) ---
  // In production, replace with real fetches (and error handling)
  function fetchMemeForMood(mood) {
    // For demo: static map
    const moodMemes = {
      happy:   { url: "https://i.imgflip.com/30b1gx.jpg", caption: "Stay happy, stay awesome!" },
      sad:     { url: "https://i.imgflip.com/43a45p.jpg", caption: "When coffee runs out on a sad day." },
      excited: { url: "https://i.imgflip.com/39t1o.jpg", caption: "Excited? Let's roll!" },
      calm:    { url: "https://i.imgflip.com/4t0m5.jpg", caption: "Keep calm and carry on." },
      energetic: { url: "https://i.imgflip.com/26am.jpg", caption: "Energy level: Over 9000!" },
      angry:   { url: "https://i.imgflip.com/27w2.jpg", caption: "Take a deep breath... rawr!" },
      chill:   { url: "https://i.imgflip.com/1ur9b0.jpg", caption: "Just chillin' 😎" },
    };
    return Promise.resolve(moodMemes[mood] || { url: "https://i.imgflip.com/2fm6x.jpg", caption: "Any mood is meme mood!" });
  }
  function fetchJokeForMood(mood) {
    // For demo: static map
    const moodJokes = {
      happy:   { setup: "Why did the banana go to the party?", punchline: "Because it was a-peeling!" },
      sad:     { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts." },
      excited: { setup: "Why did the math book look excited?", punchline: "It had too many problems to handle!" },
      calm:    { setup: "What do you call a calm canine?", punchline: "A chi-ll dog." },
      energetic: { setup: "Why did the computer get so energetic?", punchline: "Because it had a byte to eat!" },
      angry:   { setup: "What do you call a grumpy cat?", punchline: "A sourpuss." },
      chill:   { setup: "How does a penguin build its house?", punchline: "Igloos it together." },
    };
    return Promise.resolve(moodJokes[mood] || { setup: "Feeling moody?", punchline: "Laughter is the best medicine!" });
  }

  // Side effect: update CSS variables and font when selectedMood changes
  useEffect(() => {
    const theme = selectedMood ? (MOOD_THEMES[selectedMood] || FALLBACK_THEME) : FALLBACK_THEME;

    // Animate color/theme transitions on body
    document.body.classList.add('mood-theme-transition');
    setTimeout(() => document.body.classList.remove('mood-theme-transition'), 850);

    // Set body's bg and variable theme colors
    document.body.style.background = theme.bodyBg;
    for (const key of Object.keys(FALLBACK_THEME)) {
      if (key.startsWith('--')) {
        document.documentElement.style.setProperty(key, theme[key]);
      }
    }
    // Animate font family on root
    document.body.style.fontFamily = theme.fontFamily;

    // Dynamically load playful web font
    const familyToLoad = (theme.fontFamily?.split(',')[0] || '').replace(/'/g, '').trim();
    loadWebFont(familyToLoad);

    // Also animate all .card, .navbar, .logo etc. on mood change for smooth theme
    const themables = document.querySelectorAll('.card, .navbar, .logo, .theme-bar, .main-content, .mood-selector-card, .meme-bar, .joke-bar, .meme-card, .gif-card');
    themables.forEach(el => {
      el.classList.add('mood-theme-transition');
      setTimeout(() => el.classList.remove('mood-theme-transition'), 850);
    });

    prevMood.current = selectedMood;
  }, [selectedMood]);

  const handleMoodChange = useCallback((moodKey) => {
    setSelectedMood(moodKey);
    // TODO: Use this to trigger mood-specific content fetch
  }, []);

  // Helper for showing pretty mood name for nav
  const moodLabel = selectedMood ? (
    {
      happy: "Happy 😄",
      sad: "Sad 😢",
      excited: "Excited 🤩",
      calm: "Calm 🧘",
      energetic: "Energetic ⚡",
      angry: "Angry 😡",
      chill: "Chill 🧊",
    }[selectedMood] || selectedMood
  ) : "Default";

  return (
    <div className="app" data-mood={selectedMood || "default"}>
      {/* Navbar at the top */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="logo-symbol">*</span> MoodLift
          </div>
          <div className="theme-bar" title={selectedMood ? `Current Mood: ${moodLabel}` : "Theme Bar"}>
            <span role="img" aria-label="theme">🎨</span>
            {selectedMood ? <>Mood: <b style={{ marginLeft: 3 }}>{moodLabel}</b></> : "Theme Bar"}
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
