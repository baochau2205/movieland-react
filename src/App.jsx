import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import BackToTop from './components/BackToTop';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import WatchlistPage from './pages/WatchlistPage';

function MovieDetailRoute(props) {
  const { id } = useParams();
  return <MovieDetailPage key={id} {...props} />;
}

function getInitialTheme() {
  const saved = window.localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function AppRoutes() {
  const [favorites, setFavorites] = useState(() => {
    const saved = window.localStorage.getItem('favorite-movies');
    return saved ? JSON.parse(saved) : [];
  });
  const [watchlist, setWatchlist] = useState(() => {
    const saved = window.localStorage.getItem('watchlist-movies');
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem('favorite-movies', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem('watchlist-movies', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleFavorite = (movie) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        return current.filter((item) => item.imdbID !== movie.imdbID);
      }
      return [movie, ...current];
    });
  };

  const handleToggleWatchlist = (movie) => {
    setWatchlist((current) => {
      const exists = current.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        return current.filter((item) => item.imdbID !== movie.imdbID);
      }
      return [movie, ...current];
    });
  };

  const handleToggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const favoriteCount = useMemo(() => favorites.length, [favorites]);
  const watchlistCount = useMemo(() => watchlist.length, [watchlist]);

  return (
    <BrowserRouter>
      <nav className="top-nav">
        <Link to="/" className="brand">
          CineVerse
        </Link>
        <div className="nav-links">
          <Link to="/watchlist" className="nav-link">
            Watchlist ({watchlistCount})
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites ({favoriteCount})
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          )}
        />
        <Route
          path="/movie/:id"
          element={(
            <MovieDetailRoute
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          )}
        />
        <Route
          path="/favorites"
          element={(
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          )}
        />
        <Route
          path="/watchlist"
          element={(
            <WatchlistPage
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BackToTop />
    </BrowserRouter>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
