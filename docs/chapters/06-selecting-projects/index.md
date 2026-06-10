---
title: Selecting Projects, Assigning Resources, and Evaluating Outcomes
description: Completing the idea funnel with portfolio management, resource assignment, KPI definition, quarterly reporting, and lessons-learned practices.
generated_by: claude skill chapter-content-generator
date: 2026-06-10 07:55:00
version: 0.09
---

# Selecting Projects, Assigning Resources, and Evaluating Outcomes

## Summary

Completes the funnel spine by covering the downstream stages: project selection, the project portfolio, quick wins versus strategic bets, resource assignment, team formation, shared code repositories, cross-team collaboration, project evaluation, success metrics, KPIs, pipeline and funnel-stage reporting, quarterly executive reporting, lessons learned, problem and solution taxonomies, and content-quality assessment. Readers can build and present a complete project-portfolio report.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Project Portfolio
2. Quick Wins
3. Strategic Bets
4. Resource Assignment
5. Project Team Formation
6. Shared Code Repository
7. Cross Team Collaboration
8. Project Evaluation
9. Success Metrics
10. Key Performance Indicator
11. Pipeline Report
12. Funnel Stage Tracking
13. Quarterly Executive Report
14. Lessons Learned
15. Problem Taxonomy
16. Solution Taxonomy
17. Content Quality Assessment

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: The Idea Funnel — Gathering, Registering, and Evaluating Ideas](../05-idea-funnel-gathering/index.md)

---

!!! mascot-welcome "Welcome to Chapter 6"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Good ideas selected on a rubric still fail if no one is assigned to execute them, no one can tell the board what's happening, and no one captures what the institution learned when a project succeeds or stumbles. This chapter builds the accountability layer. *"Strategy without action is just a plan."*

## The Downstream Half of the Funnel

Chapter 5 built the intake machinery: AI literacy sessions, the submission form, the registry, the scoring rubric, and the review panel. This chapter completes the funnel by addressing what happens after selection: how resources get assigned, how teams form and collaborate, how success gets measured, how leadership gets informed, and how each project — whether it succeeds or not — makes the institution smarter for the next cycle.

A recurring failure pattern in institutional AI programs is what might be called the "idea graveyard": institutions invest heavily in gathering and evaluating ideas, then the approved projects sit unfunded or understaffed because the governance structure stops at selection and does not extend to resource accountability. This chapter builds the second half of the structure that prevents that outcome.

## The Project Portfolio

A **project portfolio** is the institution's current collection of active, approved AI initiatives — the projects that have passed through the funnel, received funding, and are in some stage of execution or evaluation. Managing a portfolio is different from managing individual projects. Portfolio management asks:

- Do the projects together address the institution's highest-priority strategic goals, or has the portfolio drifted toward whatever was politically easy to fund?
- Is the portfolio balanced across use-case categories (instruction, teacher support, administration, student support), or is all the investment concentrated in one area?
- Is the mix of **quick wins** and **strategic bets** appropriate — enough near-term wins to maintain institutional confidence, enough long-range investments to produce structural change?
- Are there dependencies between projects that need to be sequenced carefully?
- Does the aggregate risk across the portfolio stay within the institution's tolerance?

Portfolio thinking requires a regular review — typically quarterly — at which the full portfolio is examined as a whole, not just individual project status reports reviewed in isolation.

## Quick Wins and Strategic Bets

Before examining how to balance a portfolio, it is essential to understand what **quick wins** and **strategic bets** are and why both are necessary.

A **quick win** is a project that:

- Can be implemented with existing tools and skills, typically within three to six months
- Produces visible, measurable results quickly enough to build confidence in the AI program
- Involves limited risk, limited sensitive data, and limited change management burden
- Demonstrates ROI at modest cost — the classic "underpromise and overdeliver"

Examples of quick wins: using AI to draft substitute teacher plans, generating differentiated homework practice problems, automating the first draft of parent-communication newsletters, or creating an AI chatbot that answers frequently asked questions from students about course policies.

A **strategic bet** is a project that:

- Requires significant investment — time, money, or organizational change — to implement
- Has higher uncertainty and longer timelines but the potential for transformative impact
- Involves structural changes to how the institution operates, not just tool adoption
- Is explicitly tied to the institution's five-year mission and the course's near-term assumptions

Examples of strategic bets: deploying an xAPI/LRS infrastructure to track student learning across all digital platforms, piloting an Alpha School model schedule in one grade, or building a district-wide AI tutoring program that adapts to each student's learning plan.

Quick wins matter because institutional confidence is finite. If the first cohort of AI projects all fail or produce no visible results, the idea funnel will dry up — staff will stop submitting ideas, leadership will lose enthusiasm, and the governance structure will atrophy. Quick wins keep the program credible while the institution builds the capacity for strategic bets.

Strategic bets matter because quick wins alone do not produce transformation. A district that only funds AI tools that improve administrative efficiency will improve administration — it will not transform the educational model.

#### Diagram: Portfolio Balance — The Quick Win / Strategic Bet Matrix


<iframe src="../../sims/portfolio-balance-matrix/main.html" width="100%" height="622" scrolling="no"></iframe>
[Run Portfolio Balance — The Quick Win / Strategic Bet Matrix Fullscreen](../../sims/portfolio-balance-matrix/main.html)

<details markdown="1">
<summary>Interactive portfolio matrix mapping projects by impact and implementation difficulty</summary>
Type: chart
**sim-id:** portfolio-balance-matrix<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Evaluating (Bloom's) — readers judge how to position and balance candidate projects across a portfolio matrix.

**Canvas:** Responsive, full container width, 440px height.

**Chart type:** Bubble chart / scatter plot with four quadrants.

**Axes:**
- X-axis: "Implementation Difficulty" — Low (left) to High (right), scale 1–5.
- Y-axis: "Potential Impact on Students" — Low (bottom) to High (top), scale 1–5.

**Quadrant labels (in background):**
- Top-left (green): "Quick Wins — Do first"
- Top-right (orange): "Strategic Bets — Plan carefully"
- Bottom-left (gray): "Low priority — Deprioritize"
- Bottom-right (yellow): "Effort Traps — Question value"

**Sample data points (bubbles, each clickable):**
- "AI Sub Plans" (x:1, y:2, r:8, green) — Infobox: "Quick Win: low difficulty, moderate impact. Ideal first project."
- "Differentiated Homework" (x:1.5, y:3, r:10, green) — Infobox: "Quick Win: uses existing tools, benefits most students."
- "Parent Q&A Chatbot" (x:2, y:2, r:8, green) — Infobox: "Quick Win: reduces after-hours questions for staff."
- "xAPI/LRS Infrastructure" (x:4, y:5, r:14, orange) — Infobox: "Strategic Bet: complex implementation, but enables AI-personalized learning plans across all platforms."
- "Alpha School Schedule Pilot" (x:5, y:5, r:16, orange) — Infobox: "Strategic Bet: requires full schedule redesign, community engagement, and staff retraining. Transformative if successful."
- "AI Grading for Essays" (x:3, y:3, r:10, yellow) — Infobox: "Effort Trap: significant teacher training required; academic integrity concerns. Re-evaluate."
- "AI Attendance Tracking" (x:4, y:1, r:6, yellow) — Infobox: "Effort Trap: moderate difficulty for low additional impact — attendance is already well-tracked."

**Interaction:**
- Clicking any bubble opens its infobox.
- Hovering shows the project name and coordinates.
- Draggable mode: users can drag bubbles to re-position sample projects, exploring how repositioning changes portfolio balance.
- Button: "Reset positions" — restores defaults.

**Legend:** Quadrant color legend in top-right.
**Responsive:** Redraws on window resize.
</details>

## Stage 5: Resource Assignment

**Resource assignment** is the process of formally allocating the people, budget, and time that a selected project needs to succeed. It is one of the most common failure points in institutional AI programs — projects are selected enthusiastically in a board presentation, then quietly starve because no one specified who was doing the work on what timeline with what budget authority.

Resource assignment for an AI project should answer five questions explicitly:

- **Who is the project owner?** One named individual is accountable for delivering the outcome. Not a committee, not a department — one person.
- **What staff time is committed?** In hours per week, from which roles, for how many months. This must be agreed by the staff members' supervisors.
- **What is the budget?** Line-item budget: software license, implementation consulting, professional development, hardware, and contingency.
- **What is the timeline?** Specific milestones with dates, including a go/no-go decision point after the pilot phase.
- **What does success look like?** The pre-defined success metrics that will be measured at the pilot review date.

The following table provides a resource assignment template that can be adapted for any AI project.

| Resource Element | Question to Answer | Example |
|-----------------|-------------------|---------|
| Project owner | Who is accountable? | Assistant Superintendent for Curriculum |
| Core team | Who does the work? | 2 instructional designers (4 hrs/wk each) + 1 IT specialist (2 hrs/wk) |
| Executive sponsor | Who removes obstacles? | Superintendent |
| Vendor/partner | Who is the external partner? | ReadAI Platform (subscription) |
| Budget: license | Annual platform cost | $28,000/year |
| Budget: implementation | One-time setup and integration | $12,000 |
| Budget: training | Professional development | $5,000 |
| Budget: contingency | Buffer (10–20%) | $5,000 |
| Timeline: pilot | Dates and scope | September–December, Grades 4–5, 3 schools |
| Timeline: evaluation | Decision date | January 15 — go/no-go for district-wide deployment |
| Success metric | What will be measured | Reading fluency scores, teacher planning time, student engagement rate |

## Project Team Formation

**Project team formation** is the composition of the group that will actually execute the project. A common mistake is assigning AI projects entirely to the IT department, treating them as technology installations rather than educational interventions. AI projects that affect students and teachers need teams that blend technical, educational, and community expertise.

Effective AI project teams in education typically include:

- **Project owner / lead:** The accountable individual who manages timelines, budget, and stakeholder communication.
- **Instructional design expert:** Ensures the AI implementation aligns with pedagogical goals and teacher workflows.
- **IT or data integration specialist:** Handles the technical implementation, system integration, and data governance.
- **Classroom practitioner:** A teacher or counselor who can evaluate the tool from the user's perspective during pilot and provide feedback.
- **Student voice representative:** A student or small group of students who test the experience and provide feedback. Particularly important for tools students will use daily.
- **Privacy / compliance reviewer:** Ensures FERPA, COPPA, and any applicable state requirements are met before launch.

!!! mascot-thinking "Sage thinks about team composition"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    The question "who should be on this project team?" is actually a question about whose perspective you cannot afford to miss. For any AI tool that students will use directly, that list always includes at least one student. The people who will live with the system daily are the ones who will find the problems you didn't anticipate.

## Shared Code Repositories and Cross-Team Collaboration

One of the most powerful but underused efficiency tools in institutional AI programs is the **shared code repository** — a centralized, version-controlled library where the technical artifacts of AI projects (prompt templates, integration scripts, configuration files, API wrappers, and evaluation tools) are stored and shared across teams.

Without a shared repository, each AI project team builds from scratch. The team implementing an AI newsletter generator writes their own prompt template; the team implementing an AI lesson-plan assistant writes a different one. Neither knows what the other learned, and both make the same mistakes. With a shared repository, the second team starts from a tested, refined foundation and contributes their improvements back.

**Cross-team collaboration** — the practice of intentionally connecting AI project teams so they can share learnings, spot redundancies, and avoid duplicate vendor relationships — is the organizational habit that makes the shared repository valuable. The Center of Excellence introduced in Chapter 3 is the natural coordinator of cross-team collaboration: it maintains the repository, facilitates quarterly project showcases, and manages vendor relationships centrally to avoid the situation where five different departments have signed five different contracts with the same vendor at five different price points.

## Stage 6: Project Evaluation — Defining Success Up Front

**Project evaluation** is the process of measuring whether a project achieved what it promised. It sounds obvious, but it is systematically underinvested in educational AI programs. The reason is structural: evaluation requires baseline data (collected before the project launches), measurement instrumentation (built into the project's execution), and evaluation time (scheduled after the project ends). All three require upfront planning that is easy to skip when the enthusiasm of launching a new initiative crowds out the administrative work of measuring it.

The golden rule of project evaluation: **define the success metric and collect the baseline before the project launches.** Not after. Not during. Before. A district that implements an AI reading tool in September without collecting September baseline reading scores cannot demonstrate in June whether the tool improved reading outcomes — no matter how strong the anecdotal evidence.

**Success metrics** are the specific, measurable outcomes that will be used to evaluate whether the project achieved its goals. Good success metrics are:

- **Specific:** "Third-grade reading fluency, measured by Dibels ORF, averaged across all pilot classrooms" is specific. "Improved reading outcomes" is not.
- **Time-bound:** "By June 1, compared to September baseline" specifies when measurement occurs.
- **Attributable:** "For students in the pilot schools compared to a matched control group" attempts to isolate the project's contribution from other factors.
- **Practical:** The data must be collectable with available tools and staff time. A perfect metric that requires six months of custom software development is not practical.

## Key Performance Indicators

**Key performance indicators** (KPIs) are the small set of metrics that leadership tracks regularly to assess overall program health — not the full set of success metrics for every project, but the subset of measures that most meaningfully summarize whether the AI program is creating institutional value.

KPIs operate at two levels. Project-level KPIs measure whether a specific initiative is on track. Program-level KPIs summarize the health of the entire idea funnel and portfolio. The following table provides examples at both levels, organized by use-case category.

| Use-Case Category | Project-Level KPI Example | Program-Level KPI |
|------------------|--------------------------|--------------------|
| Instruction enhancement | Avg student fluency gain vs control group | % of students with access to AI-tutored content |
| Teacher support | Teacher planning time saved per week | Teacher satisfaction with AI tools (survey) |
| Administration | Time to process substitute plan requests | # of administrative processes with AI integration |
| Student support | At-risk students identified before Tier 2 intervention | Early-alert system false-positive rate |
| Idea funnel | # ideas submitted per quarter | # ideas moving from evaluation to selection |
| Portfolio | # projects delivering on promised KPIs at evaluation | % of project budget spent within 10% of estimate |

## Pipeline Reports and Funnel Stage Tracking

A **pipeline report** is a dashboard view of all ideas and projects at every stage of the funnel — how many ideas are in each stage, how long they have been there, and what action is pending. Before defining pipeline reporting in detail, it helps to understand what **funnel stage tracking** captures.

Funnel stage tracking monitors the movement of every idea and project through the six funnel stages, capturing:

- The date an idea entered each stage
- The date it moved to the next stage (or was declined/archived)
- The time spent in each stage (dwell time)
- The conversion rate from each stage to the next

The pipeline report presents this data at a glance for leadership. A well-designed pipeline report answers four questions:

- Are we generating enough ideas? (Stage 1 volume)
- Are good ideas getting stuck? (Stage 2–3 dwell time)
- Are we selecting and funding at the right pace? (Stage 3–5 conversion rates)
- Are funded projects delivering outcomes? (Stage 6 KPI attainment rates)

#### Diagram: AI Program Pipeline Report


<iframe src="../../sims/pipeline-report-dashboard/main.html" width="100%" height="642" scrolling="no"></iframe>
[Run AI Program Pipeline Report Fullscreen](../../sims/pipeline-report-dashboard/main.html)

<details markdown="1">
<summary>Interactive pipeline dashboard showing ideas and projects at each funnel stage</summary>
Type: chart
**sim-id:** pipeline-report-dashboard<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's) — readers interpret a pipeline report to diagnose where an AI program is healthy and where there are bottlenecks.

**Canvas:** Responsive, full container width, 360px height.

**Chart type:** Horizontal bar chart — one bar per funnel stage, bar length = number of ideas/projects currently in that stage.

**Sample data (editable via slider controls below):**
- Stage 1 — Gathering: 47 ideas (this cycle)
- Stage 2 — Registry: 38 ideas registered
- Stage 3 — Under Evaluation: 22 ideas
- Stage 4 — Selection Review: 12 ideas
- Stage 5 — Funded/In Progress: 7 projects
- Stage 6 — Evaluating Outcomes: 4 projects

**Bar colors:** gradient from light blue (Stage 1) to deep orange (Stage 6).

**Annotations:** Small text labels on each bar: "Avg dwell: X days" based on sample data.

**Interaction:**
- Clicking any bar opens an infobox: "What a healthy stage looks like and what warning signs to watch for." E.g., Stage 2: "If fewer than 50% of submitted ideas are entering the registry, the submission form may be too complex or the inbox is understaffed."
- Hovering a bar shows the count and dwell time tooltip.

**Benchmark overlays:** Dashed vertical lines at recommended counts: "Target Stage 1: 30+" ideas per cycle, "Target Stage 5: 5–10 active projects."

**Responsive:** Redraws on window resize.
</details>

## Quarterly Executive Reporting

The **quarterly executive report** is the primary accountability mechanism for the AI program with senior leadership and the board. Its purpose is to give decision-makers the information they need to evaluate whether the AI strategy is working and whether resource commitments should continue, increase, or be redirected.

A quarterly executive report covers:

- **Portfolio status:** Which projects are on track, which are delayed, which have completed, which have been paused or cancelled.
- **KPI summary:** For each funded project, the pre-defined KPIs and current performance against them.
- **Pipeline health:** Funnel stage counts — how many ideas are in the registry, how many are under evaluation, how many were selected this quarter.
- **Spend versus budget:** Actual expenditure against approved budget for each project and the program overall.
- **Key risks:** Any emerging risks — vendor issues, data privacy concerns, unexpected community concerns — that leadership should be aware of.
- **Upcoming decisions:** Any selection decisions, budget requests, or policy questions that require leadership input before the next quarter.

The executive report should be concise — a one- to two-page written summary plus a dashboard — not an exhaustive project management printout. Board members and superintendents make better decisions with fewer, better-chosen data points than with comprehensive tables they do not have time to read.

!!! mascot-tip "Sage's Tip on Executive Reports"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The most effective quarterly executive report leads with outcomes, not activities. "Our AI tutoring pilot raised third-grade reading fluency scores by 0.8 grade levels in 12 weeks" is far more compelling than "we deployed the platform in 3 schools and 47 teachers received training." Boards fund outcomes, not activities.

## Lessons Learned

The **lessons learned** practice is the process by which each completed or paused project contributes its experience back to the institution's collective knowledge — informing future idea generation, evaluation criteria, vendor selection, and implementation practices.

Lessons learned should be documented within 30 days of project completion or pause, while memories are fresh. A standard lessons-learned document captures:

- What was the project and what did it set out to achieve?
- What worked well — practices, tools, team structures, timelines that should be repeated?
- What did not work — unexpected obstacles, vendor failures, adoption barriers, measurement challenges?
- What would we do differently?
- What does this tell us about future similar projects?

The lessons learned document should be stored in the idea registry alongside the original project entry and referenced explicitly when similar projects are evaluated in future cycles. Without this connection, institutions repeat the same mistakes across project generations because the learning never becomes institutional knowledge.

## Problem and Solution Taxonomies

Two analytical tools help the idea registry become more useful over time: problem and solution taxonomies.

A **problem taxonomy** is a structured classification system for the types of problems that AI initiatives address. Rather than treating every submission as a unique problem, a taxonomy groups problems into categories: "student learning gap identification," "teacher time on non-instructional tasks," "parent communication delays," "administrative data entry," and so on. When the registry contains 200 ideas over three years, a problem taxonomy lets the AI steering committee ask: "How many of our ideas address student learning gaps? How many are funded? How many of the unfunded ones are waiting for better technology?"

A **solution taxonomy** classifies the AI approaches used to address problems: "LLM-based text generation," "computer vision," "predictive analytics," "conversational AI," "recommendation engine," and so on. A solution taxonomy lets the technology team ask: "How many of our projects use the same underlying AI technology? Are we building redundant implementations that could share infrastructure?"

Together, problem and solution taxonomies turn the idea registry from a flat list into a searchable, analyzable strategic asset — a picture of how the institution's problems map onto the AI solution landscape over time.

## Content Quality Assessment

For AI initiatives that produce educational content — lesson plans, reading passages, assessment questions, student-facing explanations — **content quality assessment** is a critical evaluation step that is distinct from technical project evaluation.

Content quality assessment asks: Is the AI-generated content pedagogically sound, accurate, appropriately differentiated, and aligned to standards? This requires evaluation by educators, not just technologists. Key dimensions of content quality assessment:

- **Accuracy:** Is the content factually correct? Does it reflect current curriculum standards?
- **Grade-level appropriateness:** Is the reading level and cognitive demand appropriate for the intended students?
- **Alignment:** Does the content address the specific learning objectives it was designed for?
- **Bias check:** Does the content use inclusive language, represent diverse perspectives, and avoid stereotypes?
- **Pedagogical quality:** Does the content support active learning, address common misconceptions, and provide appropriate scaffolding?

Content quality assessment should be built into the project evaluation plan from the start — not added as an afterthought when a teacher raises concerns about a generated lesson plan.

!!! mascot-celebration "Sage Celebrates Your Progress"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    The idea funnel is now fully assembled — all six stages, with resource assignment, team formation, KPIs, pipeline reporting, quarterly board accountability, and lessons learned. You have the complete operational system for managing AI initiatives at an institutional level. The next chapters build the specialized knowledge layers on top of this foundation.

## Key Takeaways

- A **project portfolio** is managed holistically — for balance across quick wins, strategic bets, equity priorities, and use-case categories — not just as a collection of individual project status reports.
- **Quick wins** build institutional confidence; **strategic bets** drive structural transformation. Both are necessary; neither alone is sufficient.
- **Resource assignment** must specify a named project owner, committed staff time, line-item budget, milestone timeline, and pre-defined success metrics — or the project will stall.
- Effective **project team formation** blends technical, instructional, student, and community perspectives; IT alone cannot execute educational AI projects.
- **Shared code repositories** and **cross-team collaboration** prevent duplicate effort and turn each project's learnings into institutional assets.
- The golden rule of **project evaluation**: define the success metric and collect the baseline before the project launches.
- **Key performance indicators** (KPIs) operate at both project and program level; program-level KPIs measure idea funnel health and portfolio performance.
- **Pipeline reports** and **funnel stage tracking** give leadership a live view of idea flow and conversion rates across all six funnel stages.
- **Quarterly executive reports** should lead with outcomes, not activities, and provide the concise data leadership needs to make resource decisions.
- **Lessons learned**, **problem taxonomy**, and **solution taxonomy** transform the idea registry from a flat list into an institutional knowledge base.
- **Content quality assessment** is a distinct evaluation dimension for AI initiatives that produce student-facing educational material.
