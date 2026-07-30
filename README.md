# SentinelAI frontend

Production-structured Angular POC for a **human-led** emergency operations and incident-command platform. The included North Texas scenario is synthetic and is not official or current.

## Quick start

```bash
npm ci
npm start
```

Open <http://localhost:4200> and sign in with `commander@sentinelai.demo` / `SentinelDemo123!`.

## Commands

| Command                    | Purpose                            |
| -------------------------- | ---------------------------------- |
| `npm start`                | Development server                 |
| `npm run build:production` | Optimized application bundle       |
| `npm run typecheck`        | Strict TypeScript check            |
| `npm run lint`             | ESLint and Angular template lint   |
| `npm test`                 | Vitest unit suite                  |
| `npm run test:e2e`         | Playwright critical workflow suite |
| `npm run format`           | Prettier formatting                |

Configuration is typed in `src/environments`. Browser-visible configuration must never contain provider secrets. See `.env.example`, `ARCHITECTURE.md`, and `SECURITY.md`.
