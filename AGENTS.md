# AGENTS.md

This repository contains two standalone demo apps for the Mercura Frontend Form SDK:

- `react-sdk-demo/` — React 19 + Vite demo.
- `vue-sdk-demo/` — Vue 3 + Vite demo.

Both are independent Vite projects (no root workspace). Run commands from inside each demo directory. Standard scripts live in each `package.json` (`dev`, `build`, `lint`, plus `type-check`/`format` in the Vue demo).

## Cursor Cloud specific instructions

- Package manager is **Bun** (`bun.lock` + `bunfig.toml` in each demo). Use `bun install` / `bun run <script>`, not npm. Bun is installed at `~/.bun/bin/bun` (the installer added it to `~/.bashrc`; a fresh non-login shell may need `export PATH="$HOME/.bun/bin:$PATH"`).
- The SDK packages (`@mercura-aps/*`) come from a **private Verdaccio registry** (`https://npm.pkg.mercura.io/`). `bunfig.toml` authenticates using the `NPM_USER` and `NPM_PASS` env vars, which are provided as Cloud secrets and injected automatically — `bun install` fails without them. Do NOT put empty `NPM_USER`/`NPM_PASS` values in a demo `.env`, because Bun loads `.env` during install and empty values would override the real secrets.
- **Running the dev servers requires a `.env` file** in each demo dir (it is git-ignored, so recreate it if missing). Minimum contents:
  ```
  VITE_TARGET = https://demo.mercura.io
  VITE_COOKIE = ""
  ```
  `https://demo.mercura.io` is the public demo config panel and needs no authentication. Vite proxies `/api`, `/storage/uploads`, `/dashboard`, and `/packages` to `VITE_TARGET`; without a valid `VITE_TARGET` the app loads but categories/forms will not fetch.
- Start dev servers with `bun run dev` (React defaults to port 5173). Run the two demos on different ports if you need both at once, e.g. `bun run dev -- --port 5174` for the Vue demo.
- Hello-world flow to verify end to end: load the app, click a category (e.g. Truck → Truck Configurator) to create a config, click Continue to open the multi-step form, then select options / type values and watch the total price recalculate.
- The Vue demo's `bun run lint` currently reports pre-existing errors in its own `src/` (unused vars, `no-explicit-any`); these are repo code issues, not environment problems. `bun run build` succeeds for both demos.
