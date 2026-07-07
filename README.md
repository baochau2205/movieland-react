# MovieLand React

Live Demo: https://react-movie-app-tan-eight.vercel.app

GitHub Repository: https://github.com/baochau2205/movieland-react

## Overview

MovieLand React is a modern movie discovery web application built with React. Users can browse movies, search by title, save favorites, and explore detailed movie information through a clean and responsive interface.

This project was created to strengthen my front-end development skills, including React component architecture, API integration, responsive design, and clean code organization.

## Features

* Browse popular movies and curated genre collections
* Search movies by title, with debounced input and infinite scroll pagination
* View detailed movie information
* Save movies to Favorites and a separate Watchlist (both persisted locally)
* Trailer modal linking out to a YouTube search for the movie
* In-app video player experience
* Dark / light theme toggle (persisted, respects system preference)
* Loading skeletons and a friendly error state with retry
* Lazy-loaded images with automatic fallback for broken posters
* Page transition animations and a "back to top" button
* Fully responsive design for desktop and mobile devices
* Dynamic data fetched from the OMDb API

## Technologies

* React
* React Router
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite
* OMDb API

## Installation

```bash
git clone https://github.com/baochau2205/movieland-react.git
cd movieland-react
npm install
```

(Optional) Copy `.env.example` to `.env` and set your own `VITE_OMDB_API_KEY` (get a free key at https://www.omdbapi.com/apikey.aspx).

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This app is deployed on [Vercel](https://vercel.com). It is a static Vite build, so any static host works, but `vercel.json` includes the SPA rewrite rule needed for client-side routes (e.g. `/movie/:id`, `/favorites`) to work on direct load/refresh.

## Future Improvements

* User authentication
* Advanced filtering
* Performance optimization

## License

This project is intended for educational and portfolio purposes only.
