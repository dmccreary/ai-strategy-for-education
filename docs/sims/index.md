# MicroSims

MicroSims are small, interactive educational simulations — each one focused on
a single concept. They live under `docs/sims/<sim-name>/` and are embedded
into chapters via iframes.

New MicroSims can be created with the `microsim-generator` skill, which routes
to the appropriate library (p5.js, Chart.js, vis-network, Mermaid, Leaflet,
Plotly, Venn.js).

## Shared MicroSims

Many AI/strategy MicroSims are shared with other textbooks (such as
[Tracking AI](https://dmccreary.github.io/tracking-ai-course/)). To avoid
copy-paste drift, those live in the central
**[shared-microsims](https://github.com/dmccreary/shared-microsims)** repository
and are mounted here as a **git submodule** at `docs/sims/shared/`.

- **Reference a shared sim** from a chapter with `sims/shared/<sim-name>/` — e.g.
  embed `sims/shared/idea-funnel/main.html` in an iframe.
- **Book-specific sims** (like `graph-viewer`) stay as ordinary directories
  directly under `docs/sims/`.
- **Clone note:** use `git clone --recurse-submodules`, or run
  `git submodule update --init docs/sims/shared` after cloning — otherwise the
  shared sims won't be present.

To **edit** a shared sim, change it in the `shared-microsims` repo (not inside
`docs/sims/shared/`), then pull it in here:

```bash
cd docs/sims/shared && git checkout main && git pull
cd ../../.. && git add docs/sims/shared && git commit -m "Update shared MicroSims"
```

The book stays pinned to a specific commit of `shared-microsims` until you do
this, so shared-sim changes never appear unexpectedly. Full maintainer guide:
<https://github.com/dmccreary/shared-microsims#readme>.

<!-- The MicroSim catalog is built up as new sims are added. -->
