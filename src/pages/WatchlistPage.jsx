import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function WatchlistPage({ watchlist, onToggleWatchlist, favorites, onToggleFavorite }) {
  return (
    <div className="page-shell">
      <Link to="/" className="back-link">← Back to home</Link>
      <header className="section-heading">
        <h1>Your watchlist</h1>
      </header>
      {watchlist.length === 0 ? (
        <div className="state-card">No movies in your watchlist yet. Tap the bookmark on any movie.</div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.some((item) => item.imdbID === movie.imdbID)}
              onToggleFavorite={onToggleFavorite}
              isInWatchlist
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
