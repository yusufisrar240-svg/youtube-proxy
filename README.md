# Harbor Proxy

Self-hosted browser proxy interface using Mercury Workshop's Scramjet, BareMux, libcurl transport and Wisp. This repository is configured for deployment on Render with Node.js 22 and WebSocket support.

## Features

- Browse websites through the proxy
- YouTube and Shorts shortcuts
- Search query or full URL
- Fullscreen, reload and direct-site fallback
- Server health check at `/health`

## Launch

```bash
npm install
npm start
```

Local address: http://localhost:8080

## Deployment

The included `render.yaml` configures Render. Connect the repository to a Render web service and use the app's provided public URL. For HTTPS deployments, WebSocket upgrades must remain enabled for `/wisp/`.

## Video playback limitations

YouTube may reject datacenter IPs, require verification, or change streaming protocols. A loading YouTube page does **not** guarantee that videos or Shorts will play. Never claim playback has been verified without testing actual video streams from the deployed public site.

## Security

Wisp restricts private and loopback IP addresses, direct IP connections and ports to protect against unsafe proxying. An open public proxy risks abuse; deploy privately or add authentication and rate limits before distributing the link. This proxy is not anonymous.

## Credits and licensing

Built on [Mercury Workshop Scramjet](https://github.com/MercuryWorkshop/scramjet) and the [Scramjet App](https://github.com/MercuryWorkshop/Scramjet-App) ecosystem. Observe upstream licenses, including GNU AGPL obligations where applicable.
