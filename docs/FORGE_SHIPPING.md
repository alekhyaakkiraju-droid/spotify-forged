# Forge Shipping Guide — SpotifyForged

This document describes how work orders (WO-001–WO-020) ship through Forge and GitHub.

## Branch naming

```
wo/WO-XXX-short-description
```

Base branch: `develop`

## Ship checklist

1. Acceptance criteria satisfied for the WO
2. `npm run lint && npm run test && npm run build` pass locally
3. Commit with `[WO-XXX]` prefix (commitlint enforced via Husky)
4. Push branch and open PR to `develop`
5. Update Forge work order to `in_review` with PR link

## Quality gates

CI runs `.github/workflows/quality-gates.yml`:

- ESLint (`npm run lint`)
- Vitest (`npm run test`)
- Production build (`npm run build`)

## Environment

Copy `.env.example` to `.env` and set Spotify Dashboard credentials. Never commit secrets.

```bash
npm run validate:env
```

## Module map

| Area              | Path             |
| ----------------- | ---------------- |
| App shell         | `src/app/`       |
| Features          | `src/features/`  |
| Shared API/stores | `src/shared/`    |
| Runbooks          | `docs/runbooks/` |

## Related docs

- [Migration Risk Register](./MIGRATION_RISK_REGISTER.md)
- OAuth recovery: `docs/runbooks/oauth-session-recovery.md`
- Playback SDK: `docs/runbooks/playback-sdk-failure.md`
- CI failures: `docs/runbooks/ci-quality-gate-failure.md`
