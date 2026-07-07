import { Link } from 'react-router-dom';

function FavoritesPage({ favorites, onToggleFavorite }) {
  return (
    <div className="page-shell">
      <Link to="/" className="back-link">← Back to home</Link>
      <header className="section-heading">
        <h1>Your favorites</h1>
      </header>
      {favorites.length === 0 ? (
        <div className="state-card">No favorites saved yet.</div>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <article key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-card-body">
                <div className="movie-card-header">
                  <h3>{movie.Title}</h3>
                  <button
                    type="button"
                    className="favorite-btn active"
                    onClick={() => onToggleFavorite(movie)}
                  >
                    ♥
                  </button>
                </div>
                <p className="movie-meta">{movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="details-link">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
