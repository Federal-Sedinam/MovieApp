# Movie Database

A movie browsing app built with React, TypeScript and Vite. Browse what's popular, search the catalogue, and keep a personal list of favorites that persists in your browser.

**[Live demo →](https://movie-database-federal.netlify.app)**

Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Features

- **Browse popular movies** — the current popular list from TMDB, rendered as a poster grid
- **Search** — look up any title in the TMDB catalogue
- **Favorites** — mark movies with the heart icon; the list is saved to `localStorage` so it survives a page reload
- **Client-side routing** — separate home and favorites pages via React Router

## Tech stack

| | |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Icons | Font Awesome |
| Data | TMDB REST API |
| Hosting | Netlify |

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- A free TMDB API key — sign up at [themoviedb.org](https://www.themoviedb.org/signup), then generate one under [Settings → API](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/Federal-Sedinam/MovieApp.git
cd MovieApp
npm install
```

### Configuration

Copy the example env file and fill in your own key:

```bash
cp .env.example .env
```

```env
VITE_API_KEY=your_tmdb_api_key
VITE_BASE_URL=https://api.themoviedb.org/3
```

> **Note on the API key:** this is a client-side app, so Vite inlines `VITE_` variables into the production bundle at build time. The TMDB key is therefore visible to anyone who inspects the deployed JavaScript. That's acceptable here — TMDB keys are free, rate-limited and revocable — but don't reuse this pattern for a key that costs money or grants write access. Keeping `.env` out of version control avoids leaking it into git history, not out of the bundle.

### Running locally

```bash
npm run dev
```

The app starts on the port Vite prints to the console (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check with tsc, then build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── components/     # MovieCard, NavBar
├── contexts/       # MovieContext — favorites state + localStorage persistence
├── pages/          # Home (browse + search), Favorites
├── services/       # api.ts — TMDB fetch calls and the MovieResult type
└── css/            # per-component stylesheets
```

## Deployment

The app deploys to Netlify from `main`. `netlify.toml` holds the build command, publish directory, and a catch-all rewrite to `index.html` — the rewrite is what lets a deep link like `/favorites` survive a hard refresh instead of returning a 404.

`VITE_API_KEY` and `VITE_BASE_URL` are set as environment variables in the Netlify site settings, since `.env` isn't committed.

## Acknowledgements

This product uses the TMDB API but is not endorsed or certified by TMDB.
