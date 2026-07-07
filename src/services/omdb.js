const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '7035c60c';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export async function fetchMoviesBySearch(query) {
  const response = await fetch(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );

  if (!response.ok) {
    throw new Error('NETWORK_ERROR');
  }

  const data = await response.json();

  if (data.Response !== 'True') {
    throw new Error(data.Error || 'No results');
  }

  return data.Search || [];
}

export async function fetchMovieById(id) {
  const response = await fetch(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
  );

  if (!response.ok) {
    throw new Error('NETWORK_ERROR');
  }

  const data = await response.json();

  if (data.Response !== 'True') {
    throw new Error(data.Error || 'Movie not found');
  }

  return data;
}
