import { Link } from 'react-router-dom';
import { getPosterUrl, handlePosterError } from '../utils/poster';

function MovieCard({ movie, isFavorite, onToggleFavorite, isInWatchlist, onToggleWatchlist }) {
  const poster = getPosterUrl(movie);

  return (
    <article className="movie-card">
      <img
        src={poster}
        alt={movie.Title}
        className="movie-poster"
        loading="lazy"
        decoding="async"
        onError={handlePosterError}
      />
      <div className="movie-card-body">
        <div className="movie-card-header">
          <h3>{movie.Title}</h3>
          <div className="card-icon-actions">
            {onToggleWatchlist && (
              <button
                type="button"
                className={`watchlist-btn ${isInWatchlist ? 'active' : ''}`}
                onClick={() => onToggleWatchlist(movie)}
                aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                🔖
              </button>
            )}
            <button
              type="button"
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(movie)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ♥
            </button>
          </div>
        </div>
        <p className="movie-meta">{movie.Year}</p>
        <div className="card-actions">
          <Link to={`/movie/${movie.imdbID}`} className="play-link">
            ▶ Play
          </Link>
          <Link to={`/movie/${movie.imdbID}`} className="details-link">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
