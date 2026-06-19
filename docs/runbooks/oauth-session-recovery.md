# Runbook: OAuth Session Recovery

## Symptoms

- User sees "Session expired" modal
- API calls return 401
- Playback stops unexpectedly

## Diagnosis

1. Check browser sessionStorage for `AS-accessToken` and `AS-expiresAt`
2. Verify `VITE_SPOTIFY_REDIRECT_URI` matches Spotify Dashboard redirect URI
3. Confirm refresh token exists (`AS-refreshToken`)

## Recovery steps

1. Ask user to click **Sign in with Spotify** in the modal or TopBar
2. If callback fails, clear sessionStorage keys prefixed with `AS-`
3. Verify PKCE verifier was stored before redirect (`AS-codeVerifier`)
4. Re-run `npm run validate:env` locally if env errors appear in console

## Prevention

- Keep proactive refresh window at 60 seconds (`authService.ts`)
- Do not store tokens in localStorage
