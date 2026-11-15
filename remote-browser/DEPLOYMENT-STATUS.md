# Deployment status — 2026-11-15

No live website URL. No browser VM was successfully provisioned.

## Actual Oracle console results
Authenticated into the owner's Ashburn tenancy and submitted Always Free-eligible VM.Standard.A1.Flex requests using Ubuntu 24.04 Minimal ARM64.

| Configuration | Domain | Result |
|---|---|---|
| 2 OCPU / 12 GB | AD-1 | API Error: Out of capacity |
| 2 OCPU / 12 GB | AD-2 | API Error: Out of capacity |
| 2 OCPU / 12 GB | AD-3 | API Error: Out of capacity |
| 1 OCPU / 6 GB | AD-3 | API Error: Out of capacity |
| 1 OCPU / 6 GB | AD-2 | Launch attempted; capacity error shown; no instance confirmed |
| 1 OCPU / 6 GB | AD-1 | API Error: Out of capacity |

An initial subnet error was corrected: the new network wizard uses 10.0.0.0/16, so the subnet must fit inside it; the final subnet is 10.0.1.0/24. Optional Cloud Guard Workload Protection and Custom Logs Monitoring were excluded from this new deployment. No paid upgrade was performed.

The form currently requests no public IPv4 address because the new-subnet wizard left that control disabled. After a successful launch, public IP assignment, route/ingress configuration, container egress restrictions, HTTPS and authentication must all be completed before exposing the browser.

The SSH public key was prepared; never publish the private key. Future sessions must verify access to the matching private key before reusing this form. If unavailable, replace the public key before launch.

## Validation
Local inline JavaScript syntax and viewport source checks passed. Docker is unavailable in the current Windows execution environment. No Compose runtime, login, YouTube video/audio, Shorts, game, mobile/fullscreen or restart acceptance test has passed.

## Alternate hosting research
- Render Free: 512 MB memory, 0.1 CPU. Not selected for a full streamed desktop.
- Koyeb Free: 512 MB memory, 0.1 CPU. Not selected for a full streamed desktop.
- Google Compute free tier: e2-micro and limited outbound transfer. Not selected for sustained streamed video.
- AWS Free plan: credits for up to six months, ending sooner if credits run out. A possible temporary test host, not an Always Free substitute. No account or resources created.

Sources:
https://render.com/docs/compute-plans
https://www.koyeb.com/docs/reference/instances
https://cloud.google.com/products/compute
https://aws.amazon.com/free/
https://aws.amazon.com/free/free-tier-faqs/

## Resume
Try available Oracle Always Free capacity later, or choose a genuinely suitable host. Do not upgrade to PAYG to bypass capacity without specific owner approval. A 1-OCPU/6-GB host also needs lower Compose CPU/memory limits than the current 2-OCPU/12-GB candidate. Update limits before launching there.
