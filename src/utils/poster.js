export const POSTER_FALLBACK = 'https://placehold.co/300x450?text=No+Poster';

export function getPosterUrl(movie) {
  return movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : POSTER_FALLBACK;
}

export function handlePosterError(event) {
  if (event.target.src !== POSTER_FALLBACK) {
    event.target.onerror = null;
    event.target.src = POSTER_FALLBACK;
  }
}
