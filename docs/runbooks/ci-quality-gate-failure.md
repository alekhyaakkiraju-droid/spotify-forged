# Runbook: CI Quality Gate Failure

## Symptoms

- GitHub Actions `Quality Gates` workflow fails on lint, test, or build

## Lint failures

```bash
npm run lint
npm run format
```

Fix ESLint/Prettier issues; ensure `--max-warnings 0` passes.

## Test failures

```bash
npm run test
```

Ensure test env vars are set (see `vitest.config.ts`). Mocks live in `src/test/setup.ts`.

## Build failures

```bash
npm run build
```

Provide build-time `VITE_*` env vars. Run `tsc -b` locally for type errors.

## CI checklist

- [ ] `npm ci` clean install
- [ ] No missing lazy route modules
- [ ] Env validation passes with CI secrets/vars
