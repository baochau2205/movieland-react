import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { fetchMoviesBySearch } from '../services/omdb';

const featuredQueries = [
  { label: 'Action', query: 'action' },
  { label: 'Sci-Fi', query: 'science fiction' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Drama', query: 'drama' },
  { label: 'Adventure', query: 'adventure' },
];

function HomePage({ favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      const searchTerm = query.trim() || 'movie';
      setLoading(true);
      setError('');
      try {
        const [searchResults, ...sectionResults] = await Promise.all([
          fetchMoviesBySearch(searchTerm),
          ...featuredQueries.map((item) => fetchMoviesBySearch(item.query)),
        ]);

        setMovies(searchResults.slice(0, 12));
        setCollections(
          featuredQueries.map((item, index) => ({
            ...item,
            movies: sectionResults[index].slice(0, 4),
          }))
        );
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const timer = window.setTimeout(loadMovies, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const favoriteMovies = useMemo(() => favorites.slice(0, 4), [favorites]);

  return (
    <div className="page-shell">
      <header className="hero-section">
        <div className="hero-copy-panel">
          <p className="eyebrow">CineVerse</p>
          <div className="hero-pill">Now streaming</div>
          <h1>Find your next favorite movie</h1>
          <p className="hero-copy">
            Discover real films, explore details, and save your favorites in a sleek, cinematic experience.
          </p>
        </div>
        <div className="search-card">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="button" onClick={() => setQuery(query.trim() || 'batman')}>
            Search
          </button>
        </div>
      </header>

      <section className="section-block">
        <div className="section-heading">
          <h2>Popular picks</h2>
          <div className="chip-row">
            {featuredQueries.map((item) => (
              <button key={item.label} type="button" className="chip" onClick={() => setQuery(item.query)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="state-card">Loading movies...</div>
        ) : error ? (
          <div className="state-card error">{error}</div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={favorites.some((item) => item.imdbID === movie.imdbID)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Browse by genre</h2>
        </div>
        <div className="genre-stack">
          {collections.map((collection) => (
            <div key={collection.label} className="genre-section">
              <div className="section-heading compact">
                <h3>{collection.label}</h3>
              </div>
              <div className="movie-grid compact-grid">
                {collection.movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={favorites.some((item) => item.imdbID === movie.imdbID)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block favorites-block">
        <div className="section-heading">
          <h2>Your favorites</h2>
          <Link to="/favorites" className="inline-link">
            View all
          </Link>
        </div>
        {favoriteMovies.length === 0 ? (
          <div className="state-card">No favorites yet. Tap the heart on any movie.</div>
        ) : (
          <div className="pill-list">
            {favoriteMovies.map((movie) => (
              <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="pill-item">
                {movie.Title}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
