#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
[[ -f .env ]] || { echo "Run bash scripts/configure.sh first."; exit 1; }
docker compose config --quiet
docker compose pull
docker compose up -d
docker compose ps
echo "Containers requested. This does not confirm public HTTPS or playback."
