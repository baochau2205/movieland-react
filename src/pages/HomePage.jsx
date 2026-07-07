import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import MovieCard from '../components/MovieCard';
import { SkeletonGrid } from '../components/Skeleton';
import { fetchMoviesBySearch } from '../services/omdb';

const featuredQueries = [
  { label: 'Action', query: 'action' },
  { label: 'Sci-Fi', query: 'science fiction' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Drama', query: 'drama' },
  { label: 'Adventure', query: 'adventure' },
];

const MAX_PAGES = 10;

function HomePage({ favorites, onToggleFavorite, watchlist, onToggleWatchlist }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    const loadMovies = async () => {
      const searchTerm = query.trim() || 'movie';
      setLoading(true);
      setError('');
      try {
        const [searchResult, ...sectionResults] = await Promise.all([
          fetchMoviesBySearch(searchTerm, 1),
          ...featuredQueries.map((item) => fetchMoviesBySearch(item.query, 1)),
        ]);

        if (ignore) return;

        setMovies(searchResult.results);
        setPage(1);
        setTotalResults(searchResult.totalResults);
        setCollections(
          featuredQueries.map((item, index) => ({
            ...item,
            movies: sectionResults[index].results.slice(0, 4),
          }))
        );
      } catch {
        if (!ignore) setError('Something went wrong while loading movies.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    const timer = window.setTimeout(loadMovies, 300);
    return () => {
      ignore = true;
      window.clearTimeout(timer);
    };
  }, [query, retryToken]);

  const hasMore = movies.length < totalResults && page < MAX_PAGES;

  const loadMore = useCallback(async () => {
    if (loadingMore || loading || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const searchTerm = query.trim() || 'movie';
    try {
      const { results } = await fetchMoviesBySearch(searchTerm, nextPage);
      setMovies((current) => [...current, ...results]);
      setPage(nextPage);
    } catch {
      setTotalResults((current) => Math.min(current, movies.length));
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, loading, hasMore, page, query, movies.length]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

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
              <button
                key={item.label}
                type="button"
                className={`chip ${query === item.query ? 'active' : ''}`}
                onClick={() => setQuery(item.query)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <SkeletonGrid count={12} />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setRetryToken((token) => token + 1)} />
        ) : (
          <>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={favorites.some((item) => item.imdbID === movie.imdbID)}
                  onToggleFavorite={onToggleFavorite}
                  isInWatchlist={watchlist.some((item) => item.imdbID === movie.imdbID)}
                  onToggleWatchlist={onToggleWatchlist}
                />
              ))}
            </div>
            {hasMore && <div ref={loadMoreRef} className="load-more-sentinel" />}
            {loadingMore && (
              <div className="load-more-status">
                <div className="spinner" role="status" aria-label="Loading more movies" />
              </div>
            )}
            {!hasMore && movies.length > 0 && (
              <p className="end-of-results">You have reached the end of the results.</p>
            )}
          </>
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
                    isInWatchlist={watchlist.some((item) => item.imdbID === movie.imdbID)}
                    onToggleWatchlist={onToggleWatchlist}
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
