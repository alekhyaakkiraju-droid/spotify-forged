# Migration Risk Register

Risk register for migrating legacy Spotify client patterns to SpotifyForged (React 18 + Vite 5).

| ID    | Risk                                   | Impact | Likelihood | Mitigation                                                              | Owner    |
| ----- | -------------------------------------- | ------ | ---------- | ----------------------------------------------------------------------- | -------- |
| R-001 | OAuth token leakage in client bundle   | High   | Low        | PKCE flow, sessionStorage vault (`AS-` prefix), no client secret in env | Auth     |
| R-002 | Spotify Web Playback SDK load failure  | High   | Medium     | Script placeholder in `index.html`, graceful player-disabled UX         | Playback |
| R-003 | API rate limiting (429)                | Medium | Medium     | `spotifyFetch` retry with `Retry-After`, TanStack Query staleTime       | API      |
| R-004 | Session expiry during playback         | Medium | High       | Proactive refresh 60s before expiry, `UnauthorizedModal`                | Auth     |
| R-005 | Zustand persist corruption             | Low    | Low        | Settings-only `partialize`, default settings fallback                   | Settings |
| R-006 | Strict TypeScript breaking API changes | Medium | Medium     | Typed `spotifyApi.ts`, incremental adoption                             | Platform |
| R-007 | Test flakiness from live Spotify calls | Medium | High       | Mock `fetch` and SDK in Vitest setup                                    | QA       |
| R-008 | Env misconfiguration in CI/deploy      | High   | Medium     | Zod validation in `env.ts`, `validate:env` script, `.env.example`       | DevOps   |

## Review cadence

- Review before each release candidate
- Update when adding new Spotify scopes or playback features
