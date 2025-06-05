import React from 'react';

/**
 * MemeJokeCard displays a meme image and a joke, styled as a card.
 * It adapts to mood via styling or content. Used for Meme Bar and Joke Bar.
 * Props:
 *   type: "meme" | "joke"
 *   meme: { url: string, caption?: string }
 *   joke: { setup: string, punchline: string }
 *   mood: string
 */
 // PUBLIC_INTERFACE
function MemeJokeCard({ type, meme, joke, mood }) {
  if (type === "meme" && meme) {
    return (
      <div className="memejokecard memecard">
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <img
            src={meme.url}
            alt={meme.caption || "Funny meme"}
            style={{
              maxWidth: '100%',
              maxHeight: 200,
              borderRadius: '13px',
              boxShadow: '0 2px 10px 0 rgba(0,0,0,0.18)'
            }}
          />
        </div>
        {meme.caption && (
          <div
            className="meme-caption"
            style={{
              marginTop: 8,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.1rem'
            }}
          >{meme.caption}</div>
        )}
      </div>
    );
  }

  if (type === "joke" && joke) {
    return (
      <div className="memejokecard jokecard">
        <div className="joke-setup" style={{ fontWeight: 500, marginBottom: 6 }}>
          {joke.setup}
        </div>
        <div className="joke-punchline" style={{
          marginTop: 6,
          fontStyle: 'italic',
          color: 'var(--accent, #FFB800)',
          fontSize: '1.13em'
        }}>
          {joke.punchline}
        </div>
      </div>
    );
  }

  // Fallback/Empty
  return (
    <div className="memejokecard" style={{ textAlign: "center", color: "#fff", opacity: 0.67 }}>
      No {type === "joke" ? "joke" : "meme"} available for this mood.
    </div>
  );
}

export default MemeJokeCard;
