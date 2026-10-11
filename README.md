# Rag-Front

Rag-Front is a React frontend built with Vite.

## Requirements

- Node.js 20 LTS or newer
- npm (included with Node.js)

No VS Code extension or editor plugin is required. The dependencies and versions
are recorded in `package.json` and `package-lock.json`. See [`req.txt`](./req.txt)
for a readable dependency checklist.

## Run from a fresh clone

```sh
git clone <repository-url>
cd <repository-folder>
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser. `npm ci` installs the
locked dependencies from `package-lock.json`; do not install each package
separately.

## Available commands

```sh
npm run dev      # Start the local development server
npm run build    # Build the production files in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Main dependencies

- React and React DOM
- React Router
- Framer Motion
- React Icons
- Tailwind CSS with its Vite plugin
- DaisyUI
- Vite and the React plugin

`npm run lint` also uses ESLint and its configured plugins.
