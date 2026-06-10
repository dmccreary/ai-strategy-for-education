# MicroSim Screenshot TODO

This file tracks MicroSims that need screenshots captured.

## Missing Screenshots

Both missing screenshots are in the **shared-microsims submodule**
(`docs/sims/shared/`). Do not capture them here — capture them in the
`shared-microsims` repo (`/Users/dan/Documents/ws/shared-microsims`), commit
and push there, then pull the submodule forward in this repo.

### CLD Viewer — logged 2026-06-10

No `cld-viewer.png` exists. The sims index card currently uses
`reinforcing-loop-cw.png` as a stand-in image.

```bash
~/.local/bin/bk-capture-screenshot docs/sims/cld-viewer 5
```

### Winner-Takes-All CLD — logged 2026-06-10

No PNG exists at all, so its index card has no image. Note this sim is
data-only (`winner-takes-all-cld.json` rendered through the shared
`cld-viewer` — there is no `main.html` in its directory), so
`bk-capture-screenshot` cannot target the directory directly. Capture the
cld-viewer loaded with this sim's JSON, then save the result as
`winner-takes-all-cld/winner-takes-all-cld.png` in the shared-microsims repo.
