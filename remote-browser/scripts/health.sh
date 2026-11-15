#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose ps
docker compose exec -T browser curl -fsS http://127.0.0.1:3000/browser/ >/dev/null
docker compose exec -T browser curl -fsS http://start/ >/dev/null
echo "Internal browser HTTP and start page responded. Public authentication, TLS, audio and playback still require end-to-end testing."
