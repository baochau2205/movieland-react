import { Link } from 'react-router-dom';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const poster = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <article className="movie-card">
      <img src={poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-card-body">
        <div className="movie-card-header">
          <h3>{movie.Title}</h3>
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(movie)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
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
