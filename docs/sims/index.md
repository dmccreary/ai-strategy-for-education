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

---

## AI Foundations & How LLMs Work

| Sim | Description |
|-----|-------------|
| [Autoregressive](./shared/autoregressive/index.md) | Interactive simulation showing how language models predict the next token using neural networks |
| [Tokenizer](./shared/tokenizer/index.md) | Interactive visualization demonstrating how text is tokenized for language model processing |
| [Moore's Law](./shared/moores-law/index.md) | Interactive infographic showing transistor growth with linear and log scale views |
| [Power Wall](./shared/power-wall/index.md) | Interactive visualization showing CPU clock speed evolution and the Power Wall phenomenon |
| [AI Causes of Acceleration](./shared/ai-causes/index.md) | A causal loop diagram showing how AI feedback is accelerating AI progress |

## AI Capability & Progress

| Sim | Description |
|-----|-------------|
| [AI Benchmarks Timeline](./shared/ai-benchmarks-timeline/index.md) | Interactive timeline showing key AI benchmarks and when they were introduced |
| [AI Doubling Rate](./shared/ai-doubling-rate/index.md) | Analysis of AI task completion doubling rate based on METR research |
| [AI Pace Accelerating](./shared/ai-pace-accelerating/index.md) | Interactive visualization demonstrating how AI capabilities are accelerating |
| [AI Task Horizons](./shared/ai-task-horizons/index.md) | Interactive visualization showing how long AI models can work on tasks based on METR research |
| [MMLU Timeline](./shared/mmlu-timeline/index.md) | Interactive visualization showing AI model progress on the MMLU benchmark |
| [LM Arena Timeline](./shared/lm-arena-timeline/index.md) | Interactive visualization of LMArena benchmark rankings for AI models |
| [Projecting AI](./shared/projecting-ai/index.md) | Interactive visualization showing exponential growth of AI task completion capabilities from 2019 to 2030 |
| [Four AI Futures](./shared/four-futures/index.md) | Interactive chart showing four possible scenarios for AI development growth patterns |
| [Technology Hype Cycle](./shared/hype-cycle/index.md) | Interactive visualization of the Gartner Technology Hype Cycle phases |
| [AI Timeline](./shared/timeline/index.md) | Interactive timeline showing over 100 key events in Deep Learning history from 1935 to present |

## AI Strategy Tools

| Sim | Description |
|-----|-------------|
| [AI Capability Maturity Model](./shared/ai-cmm/index.md) | Interactive visualization of five AI maturity levels from Ad Hoc to Transformative |
| [AI Flywheel](./shared/ai-flywheel/index.md) | An infographic MicroSim of the AI Flywheel causal loop |
| [GenAI Idea Funnel](./shared/idea-funnel/index.md) | An interactive infographic showing the steps in managing a GenAI Center of Excellence |
| [AI SWOT Analysis](./shared/swot/index.md) | Interactive SWOT analysis diagram for AI strategy development with hover descriptions |
| [Porter's Five Forces](./shared/porters-five-forces/index.md) | Interactive visualization of Porter's Five Forces competitive analysis framework |
| [Technology Adoption Curve](./shared/technology-adoption/index.md) | An interactive infographic visualizing the Technology Adoption Lifecycle Curve |
| [Eight AI Forces](./shared/eight-ai-forces/index.md) | Interactive infographic showing the four reinforcing and four balancing loops that determine whether AI capability runs away or stays in oligopoly |
| [CLD Viewer](./shared/cld-viewer/index.md) | A generic vis-network viewer for causal loop diagrams (CLDs) |
| [Winner-Takes-All CLD](./shared/winner-takes-all-cld/index.md) | An interactive CLD of the reinforcing and balancing loops that determine whether AI tips into a single dominant player |

## Education & Intelligent Textbooks

| Sim | Description |
|-----|-------------|
| [Bloom's Taxonomy](./shared/blooms-taxonomy/index.md) | Infographic with infobox hovers showing layers of Bloom's Taxonomy |
| [Book Levels](./shared/book-levels/index.md) | Interactive visualization of five levels of intelligent textbooks from static to AI-driven |
| [Book Generation Workflow](./shared/book-gen-workflow/index.md) | Interactive infographic showing the workflow for generating intelligent textbooks |

---

## Book-Specific MicroSims

| Sim | Description |
|-----|-------------|
| [Learning Graph Viewer](./graph-viewer/index.md) | Interactive viewer for this book's learning graph — concepts, dependencies, and taxonomy |
