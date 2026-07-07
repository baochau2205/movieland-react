function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  const searchTerm = `${movie.Title} ${movie.Year} official trailer`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;

  return (
    <div className="player-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="player-panel trailer-panel" onClick={(event) => event.stopPropagation()}>
        <div className="player-topbar">
          <div className="player-title">{movie.Title} — Trailer</div>
          <button type="button" className="player-close" onClick={onClose} aria-label="Close trailer">
            ×
          </button>
        </div>
        <div className="trailer-cta">
          <div className="trailer-cta-icon" aria-hidden="true">🎬</div>
          <p>
            Watch the trailer for <strong>{movie.Title}</strong> on YouTube.
          </p>
          <a
            className="play-link trailer-open-link"
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Watch trailer on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
