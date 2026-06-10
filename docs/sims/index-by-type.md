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
| [The Adoption vs. Capability Gap](./adoption-capability-gap-chart/index.md) | Interactive Chart.js MicroSim for causes of ai acceleration |
| [The Institutional Agent Workforce](./agent-workforce-diagram/index.md) | Interactive vis-network MicroSim for the institutional agent workforce |
| [Anatomy of an AI Agent](./ai-agent-anatomy/index.md) | Interactive vis-network MicroSim for anatomy of an ai agent |
| [AI Concept Hierarchy](./ai-concept-hierarchy/index.md) | Interactive vis-network MicroSim for tokenizer microsim |
| [AI Governance Structure — Hybrid Model](./ai-governance-structure/index.md) | Interactive vis-network MicroSim for ai governance structure — hybrid model |
| [AI Strategy Implementation Roadmap](./ai-implementation-roadmap/index.md) | Interactive vis-timeline MicroSim for ai strategy implementation roadmap |
| [Sources of Algorithmic Bias in Education AI](./algorithmic-bias-sources/index.md) | Interactive vis-network MicroSim for sources of algorithmic bias in education ai |
| [Build vs. Buy Decision Framework](./build-vs-buy-framework/index.md) | Interactive vis-network MicroSim for build vs |
| [Center of Excellence Organizational Structure](./coe-org-chart/index.md) | Interactive vis-network MicroSim for eight ai forces |
| [Sample Concept Learning Graph — Fractions](./concept-learning-graph-fractions/index.md) | Interactive vis-network MicroSim for book build workflow |
| [The Digital Divide in Education AI Access](./digital-divide-access-chart/index.md) | Interactive Chart.js MicroSim for the digital divide in education ai access |
| [Exponential Growth Explorer](./exponential-growth-explorer/index.md) | Interactive p5.js MicroSim for exponential growth explorer |
| [Five Levels of Textbooks Progression](./five-levels-textbooks/index.md) | Interactive vis-network MicroSim for five levels of textbooks progression |
| [Gap Analysis — Current State to Target State](./gap-analysis-diagram/index.md) | Interactive Chart.js MicroSim for gap analysis — current state to target state |
| [The Idea Funnel — Six Stages](./idea-funnel-stages/index.md) | Interactive vis-network MicroSim for the idea funnel — six stages |
| [Interactive Idea Scoring Rubric](./idea-scoring-rubric/index.md) | Interactive p5.js MicroSim for interactive idea scoring rubric |
| [Anatomy of an Intelligent Textbook](./intelligent-textbook-stack/index.md) | Interactive vis-network MicroSim for anatomy of an intelligent textbook |
| [The Learning Data Pipeline — From Textbook to Personalized Plan](./learning-data-pipeline/index.md) | Interactive vis-network MicroSim for the learning data pipeline — from textbook to personalized plan |
| [Learning Graph Taxonomy Structure](./learning-graph-taxonomy-structure/index.md) | Interactive vis-network MicroSim for learning graph taxonomy structure |
| [The METR Task Horizon Timeline](./metr-task-horizon-timeline/index.md) | Interactive vis-timeline MicroSim for ai benchmarks timeline |
| [Neural Network Learning Pathway](./neural-network-learning-pathway/index.md) | Interactive vis-network MicroSim for deep learning timeline |
| [AI Program Pipeline Report](./pipeline-report-dashboard/index.md) | Interactive Chart.js MicroSim for ai program pipeline report |
| [Portfolio Balance — The Quick Win / Strategic Bet Matrix](./portfolio-balance-matrix/index.md) | Interactive Chart.js MicroSim for portfolio balance — the quick win / strategic bet matrix |
| [Public vs. Private Knowledge Boundary](./public-private-knowledge-boundary/index.md) | Interactive vis-network MicroSim for public vs |
| [How Retrieval-Augmented Generation Works](./rag-architecture-diagram/index.md) | Interactive vis-network MicroSim for how retrieval-augmented generation works |
| [Interactive Risk Register](./risk-register-matrix/index.md) | Interactive p5.js MicroSim for interactive risk register |
| [Traditional vs. Alpha School Day Structure](./school-day-comparison-timeline/index.md) | Interactive vis-timeline MicroSim for traditional vs |
| [Stakeholder Alignment Map](./stakeholder-alignment-map/index.md) | Interactive vis-network MicroSim for technology adoption curve infographic |
| [SWOT Analysis Framework](./swot-analysis-builder/index.md) | Interactive p5.js MicroSim for swot analysis framework |
| [The xAPI Statement Structure](./xapi-statement-anatomy/index.md) | Interactive vis-network MicroSim for the xapi statement structure |
