---
title: Measuring the AI Capability Curve
description: Using the METR long-tasks study and benchmark data to understand AI's exponential capability growth and its implications for institutional planning.
generated_by: claude skill chapter-content-generator
date: 2026-06-10 07:18:53
version: 0.09
---

# Measuring the AI Capability Curve

## Summary

Grounds the course's urgency in hard, published data by examining the METR long-tasks study and its finding that AI task horizons double roughly every four to seven months. Readers learn to read benchmark data, understand capability trajectories, and explain why exponential growth defeats linear planning cycles — making a compelling, evidence-based case to school boards and trustees.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. AI Benchmark
2. MMLU Benchmark
3. Task Horizon
4. METR Study
5. Long Task Rate
6. Fifty Percent Reliability
7. Capability Doubling
8. Exponential Growth
9. Doubling Time
10. Moores Law Analogy
11. Capability Trajectory
12. Capability Forecasting
13. Adoption Versus Capability
14. Reasoning Model
15. One Shot Task
16. Agentic Task Completion
17. Cost Per Task
18. Model Release Cadence
19. Benchmark Saturation
20. Intelligence Versus Price

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: AI Foundations — What Every Educator Needs to Know](../01-ai-foundations/index.md)

---

!!! mascot-welcome "Welcome to Chapter 2"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Strategy without data is just opinion. This chapter hands you the evidence — published, peer-reviewed, publicly available — that explains exactly why AI capability demands your attention right now. *"Let's chart the course!"*

## Why Data, Not Hype

Every major technology shift in the last century — electrification, the microprocessor, the internet — generated both genuine transformation and extravagant prediction. Education leaders who survived previous technology waves have every right to be skeptical about the latest claims for artificial intelligence. The correct response to hype is not dismissal, however; it is evidence. This chapter grounds the course's sense of urgency not in press releases or conference keynotes but in a specific, peer-reviewed measurement study that tracks AI capability the way meteorologists track storm systems — with instruments, at regular intervals, published for public scrutiny.

Before examining the data, we need two foundational ideas: what a benchmark is, and what distinguishes a useful benchmark from one that flatters the technology without measuring what actually matters.

## What Is an AI Benchmark?

An **AI benchmark** is a standardized test designed to measure what an AI model can and cannot do. Just as a standardized student assessment gives educators a consistent, comparable score across schools and years, an AI benchmark gives researchers and practitioners a consistent, comparable score across models and release dates. Benchmarks range from simple question-answering tests to complex, multi-step task evaluations.

The most widely cited academic benchmark is the **MMLU benchmark** — Massive Multitask Language Understanding — which tests an AI model across 57 subjects spanning elementary mathematics, history, law, medicine, and more. When a company announces that its new model scored 90 percent on MMLU, it means the model answered 90 percent of those questions correctly, performing on par with or above the average human expert on this test. MMLU is useful for comparing general knowledge and reasoning ability across models.

The table below summarizes the major benchmark categories education leaders are likely to encounter in vendor pitches and news coverage.

| Benchmark Category | What It Measures | Example Tests |
|--------------------|-----------------|---------------|
| Academic knowledge | Recall and reasoning across school subjects | MMLU, ARC, HellaSwag |
| Mathematical reasoning | Multi-step problem solving | GSM8K, MATH, AMC benchmarks |
| Coding ability | Writing and debugging software | HumanEval, SWE-bench |
| Long-task completion | Completing multi-hour autonomous work | METR long-tasks benchmark |
| Safety and alignment | Avoiding harmful or biased outputs | TruthfulQA, BBQ |

Academic-knowledge benchmarks tell us how well a model knows facts and solves problems in controlled conditions. They do not tell us how well a model can complete the extended, real-world work that defines professional and educational value. For that, we need a different kind of measurement — and that is where the METR study comes in.

#### Diagram: AI Benchmarks Timeline

<iframe src="../../sims/shared/ai-benchmarks-timeline/main.html" height="450" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

#### Diagram: Language Model Arena Timeline

<iframe src="../../sims/shared/lm-arena-timeline/main.html" height="450" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

## The METR Study — Measuring What AI Can Actually Do

The most consequential benchmark for education strategists is not an academic test at all. It is a measurement of a deceptively simple question: **how long a task can an AI model complete, on its own, at least half the time?** This is what the **METR study** set out to measure.

**METR** — the Model Evaluation and Threat Research organization — tracks AI performance on a suite of real, independent tasks: software-engineering projects, data-analysis workflows, research assignments, and multi-step problem-solving tasks. Rather than asking "can the model answer this question?", METR asks "can the model complete this task end-to-end, unsupervised, and succeed at least 50 percent of the time?"

That "at least 50 percent of the time" threshold gives us the concept of **fifty percent reliability**, also written as P50. A task is considered within an AI model's capability when it can complete that task independently with 50% or better success. This is a pragmatic threshold: it does not demand perfection, but it does demand genuine, repeatable competence. An AI that succeeds once in twenty tries is not operationally reliable; one that succeeds more than half the time is.

The dimension METR tracks is called the **task horizon** — the maximum duration of task that a given model can complete with fifty percent reliability. In 2019, the best AI models could reliably complete tasks measured in seconds. By late 2021, that horizon had reached a few minutes. By late 2023, it had grown to roughly 30 minutes. By late 2025, frontier models were completing tasks that take a human expert several hours. The **long task rate** is the measure of how quickly this horizon is expanding.

#### Diagram: AI Doubling Rate

<iframe src="../../sims/shared/ai-doubling-rate/main.html" height="530" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

#### Diagram: The METR Task Horizon Timeline

<iframe src="../../sims/shared/ai-task-horizons/main.html" height="588" width="100%" scrolling="no" style="overflow: hidden;"></iframe>


<iframe src="../../sims/metr-task-horizon-timeline/main.html" width="100%" height="502" scrolling="no"></iframe>
[Run AI Benchmarks Timeline Fullscreen](../../sims/metr-task-horizon-timeline/main.html)

<details markdown="1">
<summary>Interactive timeline of AI task-horizon growth from 2019 to 2025</summary>
Type: timeline
**sim-id:** metr-task-horizon-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's) — readers examine the timeline of AI task-horizon data points to understand the pace and pattern of capability growth.

**Canvas:** Full-width, responsive, minimum height 300px.

**Timeline items (each is a clickable event that opens an infobox):**

- 2019-01: "Task horizon ~2 seconds" — Infobox: "Early GPT-2 era. AI could autocomplete short phrases and sentences reliably."
- 2020-06: "Task horizon ~30 seconds" — Infobox: "GPT-3 launch. AI could summarize paragraphs and answer factual questions."
- 2021-06: "Task horizon ~2 minutes" — Infobox: "Codex and early coding assistants. AI could write short functions and simple scripts reliably."
- 2022-06: "Task horizon ~5 minutes" — Infobox: "ChatGPT era begins. AI handles short research tasks and writing assignments with 50% reliability."
- 2023-03: "Task horizon ~15 minutes" — Infobox: "GPT-4 launch. AI completes small, self-contained software projects end-to-end."
- 2024-01: "Task horizon ~45 minutes" — Infobox: "Frontier models integrate tools and browse the web autonomously for extended sessions."
- 2025-06: "Task horizon ~4 hours" — Infobox: "Reasoning models complete multi-session software engineering tasks — equivalent to a junior developer's morning — with 50% reliability."

**Interaction:**
- Clicking any event marker opens a modal infobox with the full description above.
- Timeline supports drag-to-pan and scroll-to-zoom.
- Items are color-coded by era: pre-LLM (gray), early-LLM (steelblue), frontier (deep orange).
- A secondary logarithmic scale on the right y-axis shows task-horizon duration in hours.

**Responsive:** Reflows to a vertical stacked list on viewports narrower than 600px.
</details>

## Exponential Growth — Why Your Intuition Fails You

The numbers in that timeline reveal a pattern that is deeply counterintuitive: capability is not growing steadily, it is growing **exponentially**. **Exponential growth** means that a quantity multiplies by a fixed factor in each equal time period — it does not add a fixed amount, it multiplies by one. When something grows exponentially, the absolute gains in each period are larger than all prior periods combined.

To make this concrete: if a task horizon doubles every six months starting at two seconds in 2019, the progression looks like this — two seconds, four seconds, eight seconds, sixteen seconds, and so on. Those early doublings seem trivial. But after six years of doubling every six months (twelve doublings), the horizon exceeds 8,000 seconds — more than two hours. After seven years, it passes seventeen hours. The gains that feel negligible in the early rounds become enormous in the later ones. This is why AI capability surprised so many observers: most people track the early, unimpressive doublings and miss the moment the curve bends sharply upward.

!!! mascot-thinking "Sage thinks about exponential growth"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The most dangerous phrase in strategic planning is "it's only doubling." A quantity that doubles twelve times is 4,096 times its original size. If AI task horizons have doubled roughly twelve times since 2019, today's capability is thousands of times what it was then — and that is exactly what the METR data shows.

The METR study found that AI task horizons have doubled roughly **every four to seven months** for six straight years. The center of that range gives a **doubling time** of approximately five to six months. This is the single most important quantitative fact in this course. The following MicroSim lets you explore how different doubling times compound over an educational planning horizon — move the sliders and pay particular attention to how quickly the line bends once it gets started.

#### Diagram: Exponential Growth Explorer

<iframe src="../../sims/shared/ai-pace-accelerating/main.html" height="480" width="100%" scrolling="no" style="overflow: hidden;"></iframe>


<iframe src="../../sims/exponential-growth-explorer/main.html" width="100%" height="542" scrolling="no"></iframe>
[Run Exponential Growth Explorer Fullscreen](../../sims/exponential-growth-explorer/main.html)

<details markdown="1">
<summary>Interactive MicroSim: explore how doubling time compounds over years</summary>
Type: MicroSim
**sim-id:** exponential-growth-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Understanding (Bloom's) — readers manipulate doubling time and starting value to build intuition for how exponential growth behaves over educational planning horizons (2–10 years).

**Canvas:** Responsive, container-width × 480px.

**Controls (p5.js builtins, placed below canvas):**
- Slider: "Doubling time (months)" — range 3 to 18, default 6, step 1. Label shows current value.
- Slider: "Starting task horizon (minutes)" — range 1 to 60, default 2, step 1. Label shows current value.
- Slider: "Years to project" — range 2 to 10, default 7, step 1.
- Button: "Reset" — restores all sliders to defaults.

**Visualization:**
- Line chart: y-axis = task horizon in hours (log scale), x-axis = calendar year starting 2019.
- Line is drawn smoothly; each annual data point is a filled circle.
- Hovering a data point shows a tooltip: "Year XXXX — Task horizon: X.X hours".
- Horizontal dashed reference lines labeled: "1 hour (one meeting)", "8 hours (one workday)", "40 hours (one work week)".
- When the projected curve crosses a reference line, the crossing point is highlighted with a star marker and a year label.

**Responsive:** updateCanvasSize() called in setup() and on window resize. canvas.parent(document.querySelector('main'));

**Behavior:** All calculations are real-time as sliders change. Y-axis rescales automatically so the full curve is always visible.
</details>

#### Diagram: Causes of AI Acceleration

<iframe src="../../sims/shared/ai-causes/main.html" height="570" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

## The Moore's Law Analogy

How should a non-technical leader interpret a doubling time of four to seven months? The most useful frame is the **Moore's Law analogy**. In 1965, Intel co-founder Gordon Moore observed that the number of transistors on a computer chip doubled roughly every two years — and this empirical observation held for decades, driving the entire personal computing revolution. A computer bought in 1990 had roughly 1,000 times less processing power than one bought in 2000. Moore's Law made the personal computer, the internet, and the smartphone possible.

AI capability is following a similar doubling pattern, but at a far shorter doubling time. Where Moore's Law doubled processing power every two years, the METR data suggests AI task horizons are doubling every four to seven months — three to six times faster. If that rate holds, the AI available in two years will be dramatically more capable than what exists today. Leaders who build their strategic plans around today's AI limitations are making the equivalent of planning a 1995 internet strategy around 1990 modem speeds.

#### Diagram: Moore's Law Timeline

<iframe src="../../sims/shared/moores-law/main.html" height="600" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

#### Diagram: Power Wall MicroSim

<iframe src="../../sims/shared/power-wall/main.html" height="605" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

## Capability Trajectory and Forecasting

A **capability trajectory** is a projection of how an AI capability measure will change over time if current trends continue. Treating the METR doubling rate as a trajectory does not require certainty that the rate will hold exactly — it requires only the recognition that any plausible scenario involves AI growing substantially faster than education institutions typically adapt.

**Capability forecasting** means making explicit, time-stamped predictions about where the capability curve will be at a future date. Most strategic plans describe where education is today and set vague goals for "the future." Capability forecasting replaces vague futures with specific, testable claims: "If the METR doubling rate continues, AI models will be reliably completing eight-hour autonomous tasks before the graduating class of 2027 enters the workforce." That kind of claim can be debated, revised, and tracked — which is exactly what good strategy requires.

#### Diagram: Projecting AI Task Completion to 2030

<iframe src="../../sims/shared/projecting-ai/main.html" height="550" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

#### Diagram: Four AI Futures MicroSim

<iframe src="../../sims/shared/four-futures/main.html" height="400" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

## The Adoption vs. Capability Gap

One of the most important distinctions in this course is the gap between **what AI can do** and **what institutions are organized to use**. The METR curve measures capability growth. But capability adoption — the actual deployment of AI tools in classrooms, administrative offices, and curriculum design — follows a much slower, roughly linear trajectory that lags capability by years.

This **adoption versus capability** gap is not a failure of willpower or vision. It is a structural feature of how institutions work. A school adopts a new curriculum through committees, pilots, professional development, and board approval — a process that typically takes two to three years even for straightforward changes. By the time a school has fully adopted an AI tool released in 2024, the 2026 generation of tools may be dramatically more capable. Leaders who understand this gap do not try to close it by adopting every new tool immediately; they close it by building organizational structures — the idea funnel and the governance framework covered in later chapters — that allow continuous evaluation rather than locking in a single decision for five years.

#### Diagram: The Adoption vs. Capability Gap

<iframe src="../../sims/shared/hype-cycle/main.html" height="470" width="100%" scrolling="no" style="overflow: hidden;"></iframe>


<iframe src="../../sims/adoption-capability-gap-chart/main.html" width="100%" height="522" scrolling="no"></iframe>
[Run Moore's Law Timeline Fullscreen](../../sims/adoption-capability-gap-chart/main.html)

<details markdown="1">
<summary>Interactive chart showing diverging AI capability and institutional adoption curves</summary>
Type: chart
**sim-id:** adoption-capability-gap-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's) — readers identify the widening gap between capability and adoption and reason about why deliberate strategic structures are necessary.

**Canvas:** Responsive, full container width, 360px height.

**Two datasets:**
1. "AI Capability" — exponential curve (doubles every 6 months, normalized to 0–100 scale), color deep orange #E65100, solid line, 3px weight.
2. "Institutional Adoption" — linear trend from 5 to 40 over 2019–2028, color steelblue #4682B4, dashed line, 2px weight.

**X-axis:** Year labels 2019 to 2028.
**Y-axis:** Normalized index 0–100, label: "Relative Capability / Adoption Level".

**Shaded region:** Fill between the two curves, light orange (#FFE0B2, 40% opacity), with the text label "The Strategy Gap" in gray italic centered in the shaded area.

**Interaction:**
- Hovering any data point shows a tooltip: "Year: XXXX | [Series]: XX".
- Clicking inside the shaded "Strategy Gap" region opens an infobox: "The strategy gap is the space between what AI can do and what your institution is organized to use. The idea funnel, governance framework, and six-month review cadences in this course are tools for managing this gap deliberately."

**Legend:** Top-left, interactive — clicking a legend item toggles that series on/off.

**Responsive:** Chart.js options: responsive: true, maintainAspectRatio: false; redraws on window resize.
</details>

## Reasoning Models and Agentic Task Completion

Not all AI models are the same, and understanding the current generation of frontier models helps education leaders evaluate vendor claims more precisely. Three concepts define what makes recent AI different from earlier generations.

A **reasoning model** is an AI system designed to deliberate before producing an answer — to work through intermediate steps, evaluate alternatives, and verify conclusions before committing to a response. Earlier large language models produced answers in a single forward pass through the network. Reasoning models spend additional computation generating an internal "chain of thought" — analogous to showing work on a mathematics problem. This makes them substantially more reliable on complex, multi-step problems at the cost of slightly longer response times.

A **one-shot task** is a task that can be described in a single prompt and completed without human intervention between start and finish. Summarizing a document, drafting a letter, or answering a factual question are all one-shot tasks. The original ChatGPT excelled at one-shot tasks and struggled with anything requiring many sequential steps.

**Agentic task completion** is the ability to complete a long-horizon task — one requiring many sequential steps, tool use, error recovery, and decision-making — without human guidance between steps. When METR measures a task horizon of four hours, they are measuring agentic task completion: an AI that can plan, execute, check its work, recover from errors, and deliver a final result over a multi-hour session. This is the capability that is doubling every four to seven months, and it is fundamentally different from question-answering.

!!! mascot-tip "Sage's Tip for Board Presentations"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When a vendor tells your board their AI "scored 95% on MMLU," you now know the more useful follow-up: "What is your product's task horizon on the METR benchmark?" Academic benchmarks measure knowledge. Task horizons measure whether the AI can actually complete real work autonomously — and that is what matters for education operations.

## The Price Revolution — Intelligence Versus Cost

Capability is growing exponentially, but it is not getting more expensive — it is getting dramatically cheaper. The **cost per task** — what it costs in compute dollars for an AI model to complete a given piece of work — has fallen by roughly 100-fold over the three years from 2022 to 2025. A task that cost ten dollars in late 2022 costs pennies by 2025. This decline mirrors the early history of computing: as manufacturing scales and competition increases, the per-unit cost of AI processing drops toward commodity pricing.

This phenomenon is called **intelligence versus price** — the observation that AI capability and AI cost are moving in opposite directions simultaneously. The implication for education procurement is significant: AI tools that seem expensive today will likely be dramatically cheaper in 18 to 24 months. This makes "wait for the price to drop" a viable strategy for some implementations, but not a sufficient excuse for avoiding the governance work that takes just as long to build.

**Model release cadence** — the speed at which AI providers release new, more capable model versions — has also accelerated. Major providers are releasing significant model updates every three to six months. This pace makes long-term vendor contracts risky and creates a planning challenge: the best tool for a given job changes faster than most institutional procurement cycles can track.

The following table shows the order-of-magnitude change in API pricing for flagship AI models between 2023 and 2025, illustrating the intelligence-versus-price dynamic in concrete numbers.

| Year | Model Generation | Cost per Million Input Tokens | Approximate Task Equivalent |
|------|-----------------|------------------------------|-----------------------------|
| 2023 Q1 | Early GPT-4 | ~$30 | Reviewing a high-school essay |
| 2024 Q1 | GPT-4 Turbo | ~$10 | Same task |
| 2024 Q4 | GPT-4o | ~$2.50 | Same task |
| 2025 Q2 | Frontier reasoning models | ~$1–3 | Multi-step lesson plan generation |

## Benchmark Saturation — When Tests Stop Measuring Growth

There is one technical limitation every education leader should understand when reading AI benchmark claims: **benchmark saturation**. When an AI model begins scoring 95 percent or higher on a fixed benchmark, the test has effectively stopped measuring model capability — it is measuring only the difficulty ceiling of the test itself. MMLU, which seemed impossibly hard in 2022 when models scored around 70 percent, had been effectively saturated by frontier models by 2024 when several scored above 90 percent.

When a benchmark saturates, researchers create harder replacements. But this means the benchmark landscape is constantly shifting, making it genuinely difficult to compare AI models across years using the same test. The METR task-horizon approach is more resistant to saturation because tasks can always be made longer — measuring three-hour tasks, then ten-hour tasks, then 40-hour tasks — without the ceiling effect that afflicts fixed-question benchmarks.

#### Diagram: MMLU Timeline MicroSim

<iframe src="../../sims/shared/mmlu-timeline/main.html" height="550" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

!!! mascot-warning "Watch Out for Saturated Benchmarks"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A vendor who reports a score on a benchmark that every leading model now aces is not giving you useful comparative information. Ask which year's benchmark was used and whether frontier models have already saturated it. A score of 94% on a test where the median is 97% tells you almost nothing about comparative quality.

## What the Data Means for Education Planning

Two conclusions follow directly from the METR data and the cost curve.

**First, annual strategic plans are insufficient.** If AI task horizons double every four to seven months, then a strategic plan written in September may be based on capabilities that are already outdated by the following March. This does not mean abandoning long-term planning — it means building plans with explicit six-month review checkpoints and governance structures that allow continuous updating without requiring a full board cycle for every adjustment.

**Second, the relevant question is not "should we use AI?" but "at what pace, starting where, with what governance?"** The exponential capability curve makes the question time-sensitive, but it does not resolve it. Speed without governance is reckless. The remainder of this course is devoted to the governance structures, evaluation frameworks, and ethical guardrails that make a deliberate, institution-appropriate pace possible.

!!! mascot-celebration "Sage Celebrates Your Progress"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You now understand the single most important quantitative fact in this course — the METR doubling rate — and can explain it to a school board without a single piece of jargon. That is the foundation everything else builds on. Well earned!

## Key Takeaways

- An **AI benchmark** is a standardized test for comparing model capability; the **MMLU benchmark** tests general academic knowledge across 57 subjects.
- The **METR study** tracks **task horizons** — the longest tasks AI models can complete with **fifty percent reliability** — and found that horizon doubling roughly every four to seven months since 2019.
- **Exponential growth** means each doubling produces gains larger than all prior periods combined; a **doubling time** of five to six months compounds to thousands-fold improvement over six years.
- The **Moore's Law analogy** contextualizes AI capability growth as similar to — but three to six times faster than — the transistor-density doubling that drove the computing revolution.
- **Capability forecasting** translates the METR trajectory into time-stamped planning assumptions; the **adoption versus capability** gap is the central strategic challenge.
- **Reasoning models** deliberate before answering; **agentic task completion** is the multi-hour autonomous work that METR measures and that is doubling fastest.
- **Cost per task** is falling rapidly — the **intelligence versus price** dynamic — making AI economically accessible even as capability grows.
- **Benchmark saturation** limits the usefulness of fixed-question tests once frontier models score above 90 percent; task-horizon benchmarks are more durable measures of progress.
