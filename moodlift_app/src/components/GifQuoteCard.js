import React from 'react';

/**
 * GifQuoteCard component displays a GIF (image or video) and a motivational or funny quote,
 * both tailored to the current mood. Designed with a vibrant card-based style to fit MoodLift's UI.
 *
 * Props:
 *   gif: { url: string, alt?: string, isVideo?: boolean }
 *   quote: { text: string, author?: string }
 *   mood: string
 */
// PUBLIC_INTERFACE
function GifQuoteCard({ gif, quote, mood }) {
  return (
    <div className="gif-quote-card" style={{ textAlign: 'center', minHeight: 260 }}>
      <div style={{ marginBottom: 13 }}>
        {gif ? (
          gif.isVideo ? (
            <video
              src={gif.url}
              autoPlay
              loop
              muted
              playsInline
              style={{
                maxWidth: '100%',
                maxHeight: 200,
                borderRadius: '15px',
                boxShadow: '0 2px 10px 0 rgba(0,0,0,0.13)'
              }}
              aria-label={gif.alt || 'Mood based gif'}
            />
          ) : (
            <img
              src={gif.url}
              alt={gif.alt || "Motivational or funny gif"}
              style={{
                maxWidth: '100%',
                maxHeight: 200,
                borderRadius: '15px',
                boxShadow: '0 2px 10px 0 rgba(0,0,0,0.13)'
              }}
            />
          )
        ) : (
          <div className="placeholder-text">[No GIF for this mood yet]</div>
        )}
      </div>
      {quote ? (
        <div style={{
          background: 'rgba(0,0,0,0.13)',
          padding: '11px 15px 7px 15px',
          borderRadius: '13px',
          fontSize: '1.17em',
          fontWeight: 500,
          color: 'var(--text-color, #fff)',
          textShadow: '0 1px 5px rgba(40,40,80,0.14)'
        }}>
          <span style={{ fontStyle: 'italic', fontWeight: 400, marginRight: 4 }}>"</span>
          {quote.text}
          <span style={{ fontStyle: 'italic', fontWeight: 400, marginLeft: 4 }}>"</span>
          {quote.author && (
            <span style={{
              display: 'block',
              marginTop: 7,
              fontSize: '0.96em',
              color: 'var(--text-secondary, #fff7)',
              fontWeight: 300
            }}>&mdash; {quote.author}</span>
          )}
        </div>
      ) : (
        <div className="placeholder-text">[No quote for this mood yet]</div>
      )}
    </div>
  );
}

export default GifQuoteCard;
