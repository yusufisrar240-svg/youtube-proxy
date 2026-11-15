# Orbit personal web proxy
Modified from MercuryWorkshop/Scramjet-App (AGPL-3.0). Source and license remain available in this repository.

## Run
Node 22 is required. Run `npm install --omit=dev`, then `npm start`. The default port is 8080; PORT is respected. HTTPS and WebSocket upgrades at /wisp/ are required on a public host. This is a Node server, not a GitHub Pages site.

## Features
Responsive URL/YouTube search form, YouTube and Shorts shortcuts, an embedded Scramjet browser with fullscreen permissions, reload, and original-site fallback. Wisp restricts connections to web ports and rejects local/private targets.

## Verification status
Source prepared. Installation, deployment, video playback, Shorts playback and mobile-device playback are NOT yet verified. Update this section only with observed results.

## Limitations
YouTube can reject server IPs or require challenges. Page loading and video playback are separate checks. Codespaces URLs stop when a codespace stops; they are development previews, not permanent hosting.
