# Runbook: Web Playback SDK Failure

## Symptoms

- Now Playing bar shows "Nothing playing"
- `playerReady` remains false in store
- Console error loading `spotify-player.js`

## Diagnosis

1. Confirm Premium account (SDK requirement)
2. Check `streaming` scope in `VITE_SPOTIFY_SCOPES`
3. Verify SDK script in `index.html`
4. Inspect network tab for blocked CDN requests

## Recovery steps

1. Hard refresh the page
2. Log out and log back in to refresh token/scopes
3. Toggle browser autoplay permissions
4. Fall back to Spotify Connect device transfer via API if SDK unavailable

## Escalation

- Capture browser console logs and active scopes
- File issue with reproduction steps and device/browser version
