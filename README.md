# MovieLand React

This project is a small React app for browsing movies. It is a simple learning project, and I tried to keep the experience clear and easy to use.

## Demo

Live demo: https://movieland-react.vercel.app

## What it includes

- Search for movies by keyword
- View a list of movie cards
- Open a movie detail page
- Save movies to favorites
- Use a simple in-browser player experience
- Responsive layout for desktop and mobile

## Tech stack

- React
- React Router
- Vite
- OMDb API

## Getting started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Copy `.env.example` to `.env` and set your own `VITE_OMDB_API_KEY` (get a free key at https://www.omdbapi.com/apikey.aspx).
4. Start the development server:
   ```bash
   npm run dev
   ```

## Build

To create a production build:

```bash
npm run build
```

## Deployment

This app is deployed on [Vercel](https://vercel.com). It is a static Vite build, so any static host works, but `vercel.json` includes the SPA rewrite rule needed for client-side routes (e.g. `/movie/:id`, `/favorites`) to work on direct load/refresh.

## Notes

This is a small demo project. It is not a full streaming platform, but it works as a simple movie browsing app.
