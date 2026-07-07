import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import { MovieDetailSkeleton } from '../components/Skeleton';
import TrailerModal from '../components/TrailerModal';
import { fetchMovieById } from '../services/omdb';
import { getPosterUrl, handlePosterError } from '../utils/poster';

function MovieDetailPage({ favorites, onToggleFavorite, watchlist, onToggleWatchlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadMovie = async () => {
      setLoading(true);
      setError('');
      try {
        const detail = await fetchMovieById(id);
        if (!ignore) setMovie(detail);
      } catch {
        if (!ignore) setError('Something went wrong while loading this movie.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadMovie();
    return () => {
      ignore = true;
    };
  }, [id, retryToken]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="page-shell">
        <Link to="/" className="back-link">← Back to home</Link>
        <ErrorState message={error} onRetry={() => setRetryToken((token) => token + 1)} />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const isFavorite = favorites.some((item) => item.imdbID === movie.imdbID);
  const isInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);
  const poster = getPosterUrl(movie);

  const title = (movie.Title || '').toLowerCase();
  const streamSources = {
    'the lego movie': 'https://www.w3schools.com/html/mov_bbb.mp4',
    'batman begins': 'https://www.w3schools.com/html/movie.mp4',
    'the batman': 'https://www.w3schools.com/html/movie.mp4',
    'batman v superman: dawn of justice': 'https://www.w3schools.com/html/mov_bbb.mp4',
    'spider-man: into the spider-verse': 'https://www.w3schools.com/html/movie.mp4',
    'avengers: endgame': 'https://www.w3schools.com/html/mov_bbb.mp4',
    'avengers: infinity war': 'https://www.w3schools.com/html/movie.mp4',
    'harry potter and the philosopher\'s stone': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'harry potter and the chamber of secrets': 'https://www.w3schools.com/html/movie.mp4',
    'harry potter and the prisoner of azkaban': 'https://www.w3schools.com/html/mov_bbb.mp4',
    titanic: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    inception: 'https://www.w3schools.com/html/movie.mp4',
    interstellar: 'https://www.w3schools.com/html/mov_bbb.mp4',
    'the matrix': 'https://www.w3schools.com/html/movie.mp4',
    'the matrix reloaded': 'https://www.w3schools.com/html/mov_bbb.mp4',
    'the matrix revolutions': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    default: 'https://www.w3schools.com/html/movie.mp4',
  };

  const streamUrl = streamSources[title] || streamSources.default;

  const playlist = [
    { title: 'The Lego Movie', id: 'tt1490017' },
    { title: 'Batman Begins', id: 'tt0372784' },
    { title: 'The Batman', id: 'tt1877830' },
    { title: 'Harry Potter and the Philosopher\'s Stone', id: 'tt0241527' },
    { title: 'Inception', id: 'tt1375666' },
    { title: 'The Matrix', id: 'tt0133093' },
  ];

  const currentIndex = playlist.findIndex((item) => item.title.toLowerCase() === (movie.Title || '').toLowerCase());
  const nextMovie = currentIndex >= 0 ? playlist[currentIndex + 1] : null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100 || 0);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    if (!video) return;
    const value = Number(event.target.value);
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  const handleVolume = (event) => {
    const value = Number(event.target.value);
    if (!videoRef.current) return;
    videoRef.current.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const element = videoRef.current?.closest('.player-panel');
    if (!element) return;
    if (!document.fullscreenElement) {
      await element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoEnded = () => {
    if (nextMovie) {
      navigate(`/movie/${nextMovie.id}`);
    }
  };

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to home</Link>
      <div className="detail-layout">
        <img
          src={poster}
          alt={movie.Title}
          className="detail-poster"
          loading="lazy"
          decoding="async"
          onError={handlePosterError}
        />
        <div className="detail-content">
          <div className="detail-header">
            <div>
              <p className="eyebrow">Now showing</p>
              <h1>{movie.Title}</h1>
            </div>
            <div className="detail-actions">
              <button
                type="button"
                className="play-link detail-play"
                onClick={() => setShowPlayer(true)}
              >
                ▶ Watch in app
              </button>
              <button
                type="button"
                className="play-link trailer-link"
                onClick={() => setShowTrailer(true)}
              >
                🎬 Trailer
              </button>
              <button
                type="button"
                className={`watchlist-btn detail-favorite ${isInWatchlist ? 'active' : ''}`}
                onClick={() => onToggleWatchlist(movie)}
                aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                🔖
              </button>
              <button
                type="button"
                className={`favorite-btn detail-favorite ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(movie)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                ♥
              </button>
            </div>
          </div>
          <div className="meta-row">
            <span>{movie.Year}</span>
            <span>{movie.Runtime}</span>
            <span>{movie.Genre}</span>
          </div>
          <p className="plot">{movie.Plot}</p>
          <div className="facts-grid">
            <div>
              <strong>Director</strong>
              <p>{movie.Director}</p>
            </div>
            <div>
              <strong>Actors</strong>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <strong>Language</strong>
              <p>{movie.Language}</p>
            </div>
            <div>
              <strong>IMDb Rating</strong>
              <p>{movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>

      {showPlayer && (
        <div className="player-overlay" role="dialog" aria-modal="true" onClick={() => setShowPlayer(false)}>
          <div className="player-panel" onClick={(event) => event.stopPropagation()}>
            <div className="player-topbar">
              <div className="player-title">{movie.Title}</div>
              <button type="button" className="player-close" onClick={() => setShowPlayer(false)}>
                ×
              </button>
            </div>
            <div className="player-shell">
              <video
                ref={videoRef}
                className="player-frame"
                autoPlay
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  setDuration(video.duration || 0);
                  setVolume(video.volume);
                }}
                onEnded={handleVideoEnded}
              >
                <source src={streamUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="custom-controls">
                <button type="button" className="control-btn" onClick={togglePlay}>
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <input
                  type="range"
                  className="progress-bar"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                />
                <span className="time-label">{Math.floor(duration * (progress / 100) || 0)}s</span>
                <button type="button" className="control-btn" onClick={toggleMute}>
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  className="volume-bar"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                />
                <button type="button" className="control-btn" onClick={toggleFullscreen}>
                  {isFullscreen ? '⤡' : '⤢'}
                </button>
              </div>
            </div>
            <div className="player-footer">
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
            </div>
          </div>
        </div>
      )}

      {showTrailer && <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />}
    </div>
  );
}

export default MovieDetailPage;
