import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

function MovieDetailRoute(props) {
  const { id } = useParams();
  return <MovieDetailPage key={id} {...props} />;
}

function AppRoutes() {
  const [favorites, setFavorites] = useState(() => {
    const saved = window.localStorage.getItem('favorite-movies');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('favorite-movies', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (movie) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        return current.filter((item) => item.imdbID !== movie.imdbID);
      }
      return [movie, ...current];
    });
  };

  const favoriteCount = useMemo(() => favorites.length, [favorites]);

  return (
    <BrowserRouter>
      <nav className="top-nav">
        <Link to="/" className="brand">
          CineVerse
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites ({favoriteCount})
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/movie/:id" element={<MovieDetailRoute favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
