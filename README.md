# TaskFlow — To-Do List Web App

A clean, responsive to-do list built with plain HTML, CSS, and JavaScript. Tasks persist in the browser via `localStorage`, support priority levels, and can be filtered by status.

## Features
- Add tasks with Low / Medium / High priority
- Mark complete, delete, filter (All / Active / Completed)
- Task count + "clear completed" action
- Data saved locally — no backend needed

## Run it
Just open `index.html` in a browser. No build step, no dependencies.

## Project structure
```
todo-app/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── screenshots/
└── README.md
```

## Adding screenshots (PNG) so they fit perfectly on GitHub

Drop your PNGs into `assets/screenshots/`, then embed them with a fixed width using HTML `<img>` tags instead of markdown `![]()` — this is what keeps images from looking oversized or blowing out the README layout on GitHub:

```html
<p align="center">
  <img src="assets/screenshots/desktop-view.png" width="600" alt="TaskFlow desktop view">
</p>
```

Tips for a tidy fit:
- **Width, not height** — set `width="600"` (or `700` for wider mock UI shots) and let height scale automatically.
- **Trim before uploading** — crop screenshots tight to the app card so there's no extra browser chrome/whitespace.
- **Side-by-side shots** — use a table so multiple PNGs sit in a row instead of stacking:

```html
<p align="center">
  <img src="assets/screenshots/light-mode.png" width="45%">
  <img src="assets/screenshots/dark-mode.png" width="45%">
</p>
```

- Keep each PNG under ~500KB (use TinyPNG or `pngquant`) so the README loads fast.
- Recommended screenshot size: capture at **1280×800** or similar, GitHub will scale it down cleanly with the `width` attribute.

## License
Free to use and modify.
