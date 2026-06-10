# Learning Graph Generator — Session Log

- **Skill:** learning-graph-generator
- **Skill version:** 0.05
- **Date:** 2026-06-09
- **Textbook:** AI Strategy for Education
- **Working directory:** `docs/learning-graph/`

## Source

- Generated from `docs/course-description.md` (quality_score: 97).
- Step 1 (course-description quality assessment) was **skipped** because the existing
  `quality_score` of 97 is above the 85 threshold — a token-saving shortcut the skill allows.

## Python programs used

| Program | Version | Purpose |
|---|---|---|
| `analyze-graph.py` | (from skill package, dated 2025-03-18) | DAG validation + quality metrics |
| `csv-to-json.py` | **0.04** | Build `learning-graph.json` from CSV + config files |
| `taxonomy-distribution.py` | (from skill package, dated 2025-02-07) | Category distribution report |
| `validate-learning-graph.py` / `.sh` | (from skill package) | Optional schema validation |

- Python runtime: Python 3.13.0

## Outputs produced

- `concept-list.md` — 200 concepts (Title Case, ≤32 chars)
- `learning-graph.csv` — 200 rows, columns `ConceptID,ConceptLabel,Dependencies,TaxonomyID`
  (Steps 3 and 6 combined: TaxonomyID written from the start since `analyze-graph.py` reads
  only the first three columns via DictReader)
- `quality-metrics.md` — graph quality report
- `concept-taxonomy.md` — 12 categories
- `taxonomy-names.json` — TaxonomyID → human-readable name map (12 entries)
- `color-config.json` — TaxonomyID → CSS color map (12 entries, from the recommended palette)
- `metadata.json` — Dublin-Core-style metadata
- `learning-graph.json` — vis-network format, 200 nodes / 286 edges / 12 groups
- `taxonomy-distribution.md` — distribution report
- `index.md` — section landing page (regenerated from `index-template.md`)

## Graph quality summary

- **Valid DAG:** ✅ yes — 0 cycles, 0 self-dependencies
- **Foundational concepts (roots):** 2 — Artificial Intelligence (1), Exponential Growth (28)
- **Terminal nodes:** 79 (39.5% — within the healthy 5–40% range)
- **Orphaned nodes:** 0
- **Connected components:** 1 (fully connected)
- **Average dependencies per concept:** 1.44
- **Longest dependency chain:** 24
- **Top hubs (indegree):** Intelligent Textbook (9), Generative AI (8), AI Tutoring (8),
  Artificial Intelligence (7), Strategic Planning (7), SWOT Analysis (7)

## Taxonomy distribution

12 categories, all under the 30% cap, spread of 11.5%:
FUNNEL 33 (16.5%), RISK 23 (11.5%), FOUND 20 (10.0%), CAPM 20 (10.0%), PEDMOD 17 (8.5%),
STRAT 15 (7.5%), LRNTECH 15 (7.5%), GOV 15 (7.5%), ITB 12 (6.0%), GENAI 10 (5.0%),
EQUITY 10 (5.0%), PLAN 10 (5.0%). No MISC category required.

## Known issues / notes

- **Schema validation discrepancy (benign):** `validate-learning-graph` reported
  `groups -> STRAT -> color: 'DarkSlateBlue' is not of type 'object'`. The bundled
  `learning-graph-schema.json` is **stale** — it requires a nested `color` object and a
  lowercase-only color pattern (`^(#[0-9A-Fa-f]{6}|[a-z]+)$`). The current `csv-to-json.py`
  v0.04 (and the skill's documented format) emit the flat vis-network shape
  (`classifierName` + string `color` + `font` object) that the graph viewer actually consumes.
  The generated `learning-graph.json` was intentionally **left in the viewer-correct format**;
  it was not altered to satisfy the stale schema. Recommend updating the bundled schema in the
  skill package to match `csv-to-json.py` v0.04 output.

## mkdocs.yml navigation updates

Added under the existing `Learning Graph` nav section: Concept Enumeration, Concept Taxonomy,
Graph Quality Analysis, and Taxonomy Distribution (Course Description Assessment was already
present). Also added `SWOT Case Studies` after the Course Description entry in a prior step.

## Update — 2026-06-09 (incremental: agentic workforce + Alpha pro-social detail)

The course description gained a fifth near-term assumption (every administrator/teacher/student
will manage **dozens of named AI agents**) and expanded the Alpha School bullet to emphasize
5–6 hours of **pro-social, team-based** afternoon learning. The graph was updated to match.

- **+14 concepts (now 214 total)**, appended with stable IDs 201–214 so existing dependency
  references were untouched:
  - New taxonomy **AGENT — "Agentic AI Workforce"** (color **Orange**, font black), 12 concepts
    (201–212): Personal AI Agents, AI Agent Persona, Agent Workforce, Agent Task Assignment,
    Multi Agent Coordination, Agent Orchestration, Agent Governance, Human Agent Collaboration,
    Progress Monitoring Agent, Parent Communication Agent, Term Planning Agent, Critical Thinking
    Agent.
  - **PEDMOD +2** (213–214): Pro-Social Learning, Extracurricular Activities.
- **Edited 2 existing edges** to integrate the new clusters: `126 Alpha School Model` now also
  depends on `213 Pro-Social Learning`; `199 Capstone AI Strategy` now also depends on
  `207 Agent Governance` (a complete strategy must address the agent workforce).
- Regenerated `quality-metrics.md`, `learning-graph.json`, `taxonomy-distribution.md`; updated
  `concept-list.md`, `concept-taxonomy.md`, `taxonomy-names.json`, `color-config.json`,
  `metadata.json`, and `index.md` counts.

### Post-update quality summary

- **Valid DAG:** ✅ yes — 0 cycles, 0 self-dependencies, 0 orphans, 1 connected component
- **214 nodes / 313 edges / 13 groups**, 0 dangling edges
- Foundational roots: still 2; terminal nodes: 83 (38.8%, healthy); longest chain: 24
- Distribution: 13 categories, all under 30% (largest FUNNEL 15.4%; AGENT 5.6%; PEDMOD 8.9%)
- No new `.md` files, so mkdocs nav was unchanged.
