# Study Browser — deployment candidate

Status: source prepared; NOT deployed or playback verified. Existing Scramjet remains in the repository and on main. Run this directory's Compose file, never the legacy app.

## Choice
LinuxServer Chromium + Selkies on ARM64 or AMD64, Caddy for HTTPS and bcrypt HTTP Basic authentication. A browser on the server loads websites normally; only its display and input are streamed. No video downloader or rehosting service is included.

| Option | Assessment |
|---|---|
| Kasm Workspaces | ARM64 supported, managed sessions and auth; more components for a single user. |
| KasmVNC | Remote display; needs a browser image and separately verified sound path. |
| Selkies Chromium | Multiarch browser image, streamed audio/video, simpler single-user stack. Selected for first test. |
| Scramjet | Existing experimental rewriting setup; user reports black YouTube playback. Retained as legacy. |
| Rammerhead | Rewriting through testcafe-hammerhead; no verified fix for this deployment. |
| Invidious | YouTube-only frontend, not a general browser proxy; not deployed. |

This is an architecture choice, not evidence of YouTube compatibility. Cloud IP blocking, bot challenges, codecs and stream transport must be tested on the actual VM.

## Hosting
Preferred candidate: Oracle Always Free A1 in the account's home region, Ubuntu ARM64, at most **2 OCPU and 12 GB RAM total** across A1 instances. Verify the account's exact allowance before creation; do not use old 4 OCPU/24 GB tutorials. Storage: 200 GB combined boot/block total. Check existing allocations before adding a 50 GB boot disk. Published outbound allowance: 10 TB/month, subject to account/service conditions; streaming can consume substantial bandwidth. At 4 Mbps, one hour is about 1.8 GB, plus overhead.

Actual free capacity is unknown until a creation attempt in your tenancy. Oracle can reclaim idle instances after its documented seven-day utilization checks. Do not generate fake activity to avoid reclamation. Registration requires identity/contact/card verification and may place a temporary authorization hold. Do not upgrade to PAYG or select paid resources without owner approval.

No alternative host has been provisioned. Static/serverless hosting does not run this persistent browser container. A machine you already own running Linux is a fallback, with electricity and internet costs and uptime limitations.

Sources checked 2026-11-15:
- https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingup_topic-Sign_Up_for_Free_Oracle_Cloud_Promotion.htm
- https://docs.linuxserver.io/images/docker-chromium/
- https://docs.linuxserver.io/selkies/user-guide/reverse-proxy/
- https://docs.linuxserver.io/selkies/user-guide/configuration/
- https://docs.kasm.com/docs/install/system_requirements
- https://github.com/binary-person/rammerhead

## Deployment
1. Obtain an Always Free VM; check free labels, region, aggregate quotas and the estimate before creation. Install Docker Engine and Compose from https://docs.docker.com/engine/install/ubuntu/ (ARM64 supported).
2. Choose a real DNS name. A free DuckDNS subdomain is an option, subject to availability and account setup. Suggested name: study-browser-yusuf. No subdomain has been registered. Point it at the VM's public IP.
3. Permit inbound TCP 80/443 in OCI networking and the host firewall. Limit SSH 22 to the owner's IP. Do not publish ports 3000, 3001, debugging ports or Docker's API. Do not attach an OCI instance principal to a browser VM.
4. Clone this branch and enter remote-browser. Run `bash scripts/configure.sh`; the owner enters the password interactively. It writes a bcrypt hash to a private .env; the plain password is never written. Then `bash scripts/start.sh`.
5. Caddy obtains a public certificate when DNS and ports are correct. Never bypass a certificate warning as a test.
6. Run `bash scripts/health.sh` and complete TESTING.md. Anonymous requests to /, /browser/ and /healthz must return 401. Correct credentials must work over trusted HTTPS.
7. Resolve the browser image's pulled manifest digest and pin BROWSER_IMAGE to it after validation. Latest is used only as a bootstrap candidate.

## Security and limits
All public routes require authentication. Only the gateway publishes host ports. Chromium profile and TLS state live in named Docker volumes; secrets stay outside Git. No host directories, Docker socket, devices or privileged mode are mounted. The shared browser has an 8 GB memory cap, 1.7 CPU cap and 1024-process limit. One owner/session; no multi-user isolation or automatic idle logout is implemented. Basic auth is browser-managed and has no reliable logout button: close the private client window and rotate credentials if compromised. Use a strong unique password. Do not share access or save sensitive accounts in this shared profile.

Before exposing the VM, enforce host-level container egress restrictions against OCI metadata (169.254.169.254), link-local endpoints, the host gateway and private LANs, while preserving Docker DNS and the internal start service. This is a **deployment gate not yet implemented on any VM**. OCI VCN egress rules alone may not protect link-local metadata. Host firewall rules must account for Docker forwarding; ordinary UFW ingress rules alone are insufficient. No instance principal should be assigned. Validate the rules with negative connection tests from the container. Do not claim this deployment is hardened until these tests pass.

## Management
From remote-browser:
- Restart browser: `docker compose restart browser`
- Restart stack: `docker compose restart`
- Status: `docker compose ps`
- Logs: `docker compose logs --tail=100 browser gateway`
- Stop: `docker compose down` (volumes retained)
- Update: back up the profile securely, change the pinned image only after review, pull and recreate, then repeat playback tests.
- Never run `down -v` unless you deliberately want to delete saved state.
- Backups contain cookies/history; keep them private, never in this public repository.

## Troubleshooting
Black streaming screen: inspect browser health, gateway logs and WebSocket upgrade; serve only through HTTPS. Start with 720p and 30 fps. Confirm the selected encoder works without a GPU.
YouTube black video: compare another site/video, inspect Chromium DevTools media/network errors inside the remote session, verify VP9/H264 support and server connectivity. An HTTP 403/429 or bot challenge is different from a codec failure; do not promise an IP change will fix it.
No sound: interact with the client to unlock audio, check client mute, remote system sound and YouTube mute. Confirm actual audible output, not just a moving progress bar.
Shorts: use YouTube's own interface and test individual Shorts as well as feed navigation. A custom swipe feed is not implemented.
Games: begin with 2048; demanding 3D and cloud gaming are not guaranteed on a two-core CPU server.
iPhone: test on physical Safari; desktop viewport emulation does not validate touch, audio or fullscreen behavior.

## Charges
No paid resources were created by this project. Keep the Oracle account on its free tier and allocations within current limits. An upgrade to PAYG can make excess compute/storage/traffic billable. Domain purchases and paid tunnels are not required by this design.
