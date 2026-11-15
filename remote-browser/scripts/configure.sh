#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v docker >/dev/null || { echo "Docker Engine and Compose are required."; exit 1; }
docker compose version >/dev/null
case "$(uname -m)" in aarch64|x86_64) ;; *) echo "Unsupported host architecture"; exit 1;; esac
[[ ! -e .env ]] || { echo ".env already exists; edit it explicitly instead."; exit 1; }
read -rp "Real hostname pointing to this VM: " host
[[ "$host" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]] || { echo "Invalid hostname"; exit 1; }
read -rp "Login username (letters/numbers only): " user
[[ "$user" =~ ^[a-zA-Z0-9]+$ ]] || exit 1
echo "Caddy will ask you to enter and confirm your password. It is not stored in shell history."
hash="$(docker run --rm -it caddy:2-alpine caddy hash-password | tr -d '\r' | tail -n 1)"
[[ "$hash" == '$2'* ]] || { echo "Password hashing failed; no configuration written."; exit 1; }
umask 077
# Single quoting prevents Compose from interpreting bcrypt dollar signs.
printf "SITE_HOST=%s\nLOGIN_USER=%s\nLOGIN_HASH='%s'\nBROWSER_IMAGE=lscr.io/linuxserver/chromium:latest\n" "$host" "$user" "$hash" > .env
docker compose config --quiet
echo "Configuration saved. No containers started."
