# Acceptance record
Deployment URL: none. Server: none. Runtime checks are pending.
Do not change a row to PASS without dated evidence from the actual deployment.

| Check | Status | Evidence needed |
|---|---|---|
| Public trusted HTTPS | NOT TESTED | Real DNS, certificate chain and HTTPS response |
| Anonymous access blocked | NOT TESTED | 401 for homepage, browser, stream and health routes |
| Login | NOT TESTED | Wrong password rejected; correct password opens session |
| Container isolation / metadata blocked | NOT TESTED | Negative egress checks; browser ports inaccessible externally |
| Google search | NOT TESTED | Query and result navigation inside remote Chromium |
| Normal website | NOT TESTED | Open and interact with a separate site |
| YouTube picture and audio | NOT TESTED | Moving frames, audible sound, play/pause and sustained playback |
| Shorts video | NOT TESTED | Individual Short plays with sound |
| Shorts feed | NOT TESTED | Next/previous and touch swipe tested |
| 2048 game | NOT TESTED | Keys change game state; pointer/touch tested separately |
| Fullscreen | NOT TESTED | Enter/exit on desktop and physical mobile |
| Responsive layout | NOT TESTED | Desktop, Chromebook and physical iPhone |
| Restart/reconnect | NOT TESTED | Restart container and VM; authenticate and resume |
| Resource usage | NOT TESTED | CPU/RAM and bandwidth during playback |

Source checks alone cannot establish any of these runtime outcomes. A dedicated custom Shorts feed, custom external navigation toolbar and automatic idle logout remain incomplete. Native Chromium and Selkies supply their own controls.
