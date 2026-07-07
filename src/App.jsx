import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

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
        <a href="/" className="brand">
          CineVerse
        </a>
        <a href="/favorites" className="nav-link">
          Favorites ({favoriteCount})
        </a>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
        <Route path="/movie/:id" element={<MovieDetailPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
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
