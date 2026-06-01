# FE22 JavaScript 2 — Mini Project 4 Calculator

<p align="center">
  <a href="https://fe22-js2-mp4-calculator.netlify.app"><img src="https://img.shields.io/badge/Live%20demo-Netlify-2563eb?style=for-the-badge&logo=netlify&logoColor=white" alt="Live demo on Netlify"></a>
  <img src="https://img.shields.io/badge/Program-FE22-2563eb?style=for-the-badge" alt="FE22 program">
  <img src="https://img.shields.io/badge/Course-JavaScript%202-2563eb?style=for-the-badge" alt="JavaScript 2">
  <img src="https://img.shields.io/badge/Assignment-Mini%20Project%204-2563eb?style=for-the-badge" alt="Mini Project 4">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5-2563eb?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6-2563eb?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Vitest-3-2563eb?style=for-the-badge" alt="Vitest">
  <img src="https://img.shields.io/badge/ESLint-9-2563eb?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/License-ISC-2563eb?style=for-the-badge" alt="ISC License">
</p>

<p align="center">
  A responsive calculator built with <strong>TypeScript</strong> and <strong>Vite</strong>. Originally submitted in March 2023 as a frontend school assignment, then rebuilt with clearer architecture, keyboard support, and automated tests.
</p>

<p align="center">
  <strong><a href="https://fe22-js2-mp4-calculator.netlify.app">https://fe22-js2-mp4-calculator.netlify.app</a></strong>
</p>

---

## About the project

| | |
| --- | --- |
| **School context** | **FE22 JavaScript 2 — Mini Project 4** (`FE22-js2-mp4`) |
| **Type** | Course mini project — not a final thesis project |
| **Original stack** | TypeScript + Parcel (2023) |
| **Current stack** | TypeScript + Vite + Vitest |
| **Hosting** | [Netlify](https://fe22-js2-mp4-calculator.netlify.app) only — **GitHub Pages is not used** |

The app covers basic arithmetic (`+`, `−`, `×`, `÷`), percentages, expression preview, and keyboard-friendly controls. Calculator logic lives in a separate module so the UI and math can be tested independently.

---

## Screenshots

### Desktop

![Desktop layout with hero panel and calculator](./screenshots/desktop.png)

### Calculation in action

![Calculator showing a completed expression and result](./screenshots/calculation.png)

### Mobile

![Mobile-responsive calculator layout](./screenshots/mobile.png)

---

## Features

- Four-function calculator with percentage support
- Keyboard shortcuts: digits, operators, `Enter`, `Backspace`, `%`, `Escape`
- Live expression line and readable error states
- Testable calculation engine decoupled from the DOM
- Responsive layout for desktop and mobile

---

## Tech stack

- **TypeScript** — typed application logic
- **Vite** — dev server and production bundling
- **Vitest** — unit tests for the calculator engine
- **ESLint** — linting
- **HTML & CSS** — semantic markup, no UI framework

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

### Install and run

```bash
git clone https://github.com/Elli2022/fe22-js2-mp4-calculator.git
cd fe22-js2-mp4-calculator
npm install
npm run dev
```

Open the URL from the terminal (usually `http://localhost:5173`).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run test` | Run unit tests |
| `npm run lint` | Lint source files |
| `npm run typecheck` | Type-check without emitting |
| `npm run clean` | Remove `dist/` and `coverage/` |

---

## Project structure

```text
.
├── index.html
├── netlify.toml
├── screenshots/
├── src/
│   ├── calculator.ts
│   ├── calculator.test.ts
│   ├── main.ts
│   ├── styles.css
│   └── images/
└── dist/          # generated — not committed
```

---

## Deployment

Production builds publish to **Netlify**:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |

Configuration lives in `netlify.toml`. This repository does not deploy to GitHub Pages.

---

## Testing

```bash
npm run test
```

Tests target `src/calculator.ts` so calculation rules stay reliable without driving the browser.

---

## License

ISC — see [package.json](./package.json).

## Author

**Eleonora Nocentini** — [GitHub @Elli2022](https://github.com/Elli2022)
