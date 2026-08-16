# keystrack — typing speed platform

A dark-mode, Monkeytype-inspired typing speed trainer built with React, Vite, and Tailwind CSS. Practice English sentences at three difficulty levels, or type real code snippets across JavaScript, Python, C++, and HTML/CSS.

## Features

- **Zero-latency typing engine** — raw `keydown` listener with no debounce, so characters paint instantly.
- **Live WPM & accuracy** at the top of the screen, updating every second, plus a small pace sparkline.
- **Per-character feedback**: correct → green, incorrect → red text on a soft red background, untyped → muted gray, with a blinking caret at your current position.
- **Two tracks**:
  - **English** — beginner / intermediate / advanced sentences.
  - **Developer** — JavaScript, Python, C++, and HTML/CSS snippets, including braces, brackets, arrow functions, `===`, `&&`, `||`, semicolons, and indentation.
- **Results screen** with final WPM, raw WPM, accuracy, and mistake count.
- Press **Tab** anytime for a new test.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    TypingArea.jsx      # main typing board + input tracking logic
    TrackSelector.jsx   # track/level/language selection tabs
    Stats.jsx           # real-time WPM, accuracy, timer, sparkline
  data/
    sentences.js         # English sentence database (beginner/intermediate/advanced)
    snippets.js           # code snippets per language (JS, Python, C++, HTML/CSS)
  utils/
    calculator.js        # WPM, raw WPM, accuracy, consistency, time formatting
  App.jsx                 # app shell, state, results panel
  index.css               # Tailwind directives + base styles
  main.jsx                 # React entry point
```

## Tech stack

- [Vite](https://vitejs.dev/) + React 19
- [Tailwind CSS](https://tailwindcss.com/) (dark theme, custom color tokens)
- [lucide-react](https://lucide.dev/) for icons
