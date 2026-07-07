# MovieLand React

Live Demo: https://react-movie-app-tan-eight.vercel.app

GitHub Repository: https://github.com/baochau2205/movieland-react

## About

This is a small movie-browsing app I built mostly to practice React — putting together routing, state, a public API, and a bit of UI polish in one project. It's not a production product, just a personal/portfolio project, so please judge it in that spirit.

You can search for movies, look at their details, and keep a couple of personal lists (Favorites, Watchlist) saved in your browser.

## What it does

* Search movies by title, with a debounced input and infinite scroll for more results
* Browse a few curated genre collections on the home page
* View a movie's details (plot, cast, rating, etc.)
* Save movies to Favorites or a separate Watchlist (stored in your browser's local storage — no account, no server)
* Look up a trailer, which opens a YouTube search in a new tab
* A small in-app "player" for fun (see note below)
* Light/dark theme toggle
* Basic niceties: loading skeletons, an error state with retry, lazy-loaded images, a back-to-top button

## Honest limitations

* The in-app video player does not actually stream the selected movie — it plays a short generic sample clip. There's no real video source behind it, it's just there to demonstrate a custom player UI.
* Trailers open a YouTube search rather than an embedded video. An earlier version tried embedding a YouTube search result directly, but that trick is blocked by YouTube now, so a plain link is what actually works.
* Movie posters come from the free OMDb API, and some of its image links are dead — there's a fallback placeholder for when that happens.

## Built with

React, React Router, Vite, and the [OMDb API](https://www.omdbapi.com/).

## Running it locally

```bash
git clone https://github.com/baochau2205/movieland-react.git
cd movieland-react
npm install
```

Optionally, copy `.env.example` to `.env` and set your own `VITE_OMDB_API_KEY` (free key at https://www.omdbapi.com/apikey.aspx). A default key is baked in for convenience, but it's shared and rate-limited.

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deployed on [Vercel](https://vercel.com). It's a static Vite build, so any static host would work, but `vercel.json` includes the SPA rewrite rule needed for client-side routes (e.g. `/movie/:id`, `/favorites`, `/watchlist`) to load correctly on direct visit or refresh.

## Possible next steps

* User accounts (right now everything is per-browser, local storage only)
* Real filtering/sorting options
* General performance tuning if the movie list grows

## License

For learning and portfolio purposes only.
