# Precision Calculator

A modernized calculator app built with TypeScript and Vite. This project revisits an earlier frontend exercise and turns it into a cleaner, more production-minded implementation with a better toolchain, stronger UI decisions, and a testable calculation engine.

## Live Demo

[elli2022.github.io/precision-calculator](https://elli2022.github.io/precision-calculator/)

## Highlights

- Responsive interface with a more polished visual direction
- Keyboard support for numbers, operators, `Enter`, `Backspace`, `%`, and `Escape`
- Safer calculation flow with clear error handling for invalid operations
- Separated calculator logic that can be tested independently from the UI
- Fast modern build setup with Vite

## Stack

- TypeScript
- Vite
- Vitest
- ESLint
- Vanilla HTML and CSS

## Getting Started

```bash
npm install
npm run dev
```

Open the local development URL shown in the terminal to use the app.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
npm run typecheck
```

## Project Structure

```text
.
├── index.html
├── src
│   ├── calculator.ts
│   ├── calculator.test.ts
│   ├── main.ts
│   ├── styles.css
│   └── images
└── docs
```

## Notes

- Production builds are written to `docs/` to keep GitHub Pages deployment simple.
- The current implementation focuses on a strong four-function calculator experience with percentage support and keyboard-friendly interactions.

## Future Improvements

- Add calculation history
- Add memory controls
- Add theme switching and saved preferences
- Expand test coverage for more interaction flows
