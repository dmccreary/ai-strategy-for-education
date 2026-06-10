---
title: AI Governance, Policy, and Change Management
description: Making AI strategy durable — governance structures, AI use policies, change management practices, professional development, and community engagement.
generated_by: claude skill chapter-content-generator
date: 2026-06-10 08:45:00
version: 0.09
---

# AI Governance, Policy, and Change Management

## Summary

Addresses making strategy durable through governance, policy, and change management: centralised vs. decentralised AI governance, AI-use and academic-integrity policies, change management, implementation roadmaps, AI-literacy programs, professional development, school board and parent and community engagement, policy frameworks, pilot programs, and scaling strategy. Readers can draft an AI governance structure and a board-engagement plan.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. AI Governance
2. Centralized Governance
3. Decentralized Governance
4. AI Use Policy
5. Academic Integrity Policy
6. Change Management
7. Implementation Roadmap
8. AI Literacy Program
9. Professional Development
10. School Board Engagement
11. Parent Engagement
12. Community Engagement
13. Policy Framework
14. Pilot Program
15. Scaling Strategy

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Building Your AI Strategy](../03-ai-strategy-foundations/index.md)
- [Chapter 4: Generative AI, Intelligent Textbooks, and the Content Revolution](../04-genai-and-intelligent-textbooks/index.md)
- [Chapter 9: Responsible AI — Ethics, Bias, Privacy, and Fairness](../09-responsible-ai/index.md)

---

!!! mascot-welcome "Welcome to Chapter 11"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A strategy that is not embedded in governance, policy, and community trust will not survive the first budget cycle, the first parent complaint, or the first news story about AI in schools. This chapter builds the durable structures that protect good work and allow it to grow. *"Let's chart the course!"*

## Why Governance Makes Strategy Durable

The previous chapters built the content of an AI strategy: the idea funnel, the risk register, the xAPI infrastructure, the pedagogical models. This chapter builds the structure that keeps that strategy functioning after the initial enthusiasm fades, after the champion who launched it moves to another role, and after the media cycle produces alarming stories about AI in schools that put every AI program on the defensive.

**AI governance** is the system of authorities, processes, policies, and accountabilities that determines how an institution makes decisions about AI — what to adopt, who decides, what rules apply, how outcomes are evaluated, and who is responsible when something goes wrong. Governance is what turns a strategy document into an operating reality. Without it, the best-designed strategy becomes a cabinet document that nobody reads after the board presentation.

Effective AI governance in education requires decisions about structure, policy, people, and engagement — all four of which this chapter addresses.

## Centralized vs. Decentralized Governance

The first structural decision in AI governance is where decision-making authority lives: is AI strategy governed **centrally** (by a district-level or university-level authority), **decentrally** (by individual schools or departments), or through a **hybrid** model that delegates some decisions while centralizing others?

**Centralized governance** concentrates AI decision-making authority in a central body — typically the superintendent's office, a district AI steering committee, or the university's Office of the CIO. All AI tool adoptions, vendor contracts, data governance decisions, and policy development run through this central body.

Advantages of centralized governance:

- Consistent standards for data privacy, bias auditing, and vendor evaluation across all schools
- Stronger negotiating position with vendors (volume licensing; single contract)
- Prevention of redundant tools and fragmented vendor relationships
- Coherent equity strategy (decisions consider all student populations, not just those in individual schools)
- Clearer accountability when problems arise

Disadvantages of centralized governance:

- Slower response to school-level needs and innovation opportunities
- Risk of central authority disconnected from classroom realities
- Potential for teachers and principals to feel disempowered and disengaged
- Bottleneck when central staff capacity is limited

**Decentralized governance** delegates AI decision-making to individual schools, departments, or faculty — each making their own tool adoption and implementation decisions within broad institutional guidelines.

Advantages of decentralized governance:

- Faster adoption of tools that meet specific classroom needs
- Greater teacher agency and engagement
- Innovation at the edges that can be recognized and scaled centrally
- Reduced bottleneck in central administration

Disadvantages of decentralized governance:

- Inconsistent data privacy and vendor evaluation standards
- Fragmented vendor relationships and duplicate licensing costs
- Equity gaps when well-resourced schools adopt more tools than under-resourced ones
- Harder to build institution-wide data infrastructure (the LRS, the concept learning graph)
- Diffuse accountability when problems arise

The following table compares the two models across key governance dimensions.

| Governance Dimension | Centralized | Decentralized | Hybrid (Recommended) |
|---------------------|------------|---------------|----------------------|
| Tool adoption decisions | Central approval required | School/department decides | Standards set centrally; selection approved locally |
| Vendor contracts | All contracts at district level | Individual school contracts | Strategic vendors centralized; classroom tools delegated |
| Data privacy review | Central privacy officer reviews all tools | Each school reviews independently | Central standards; central review for high-risk tools |
| Innovation speed | Slower | Faster | Medium — clear fast-track for low-risk tools |
| Equity assurance | Strong | Weak | Designed in through equity impact scoring |
| Accountability | Clear | Diffuse | Shared with defined escalation |

The hybrid model — in which the central authority sets non-negotiable standards (data privacy, bias auditing, xAPI compliance) and fast-tracks low-risk tools, while delegating tool selection and classroom implementation to schools — is the most common structure in well-governed districts and universities.

#### Diagram: AI Governance Structure — Hybrid Model


<iframe src="../../sims/ai-governance-structure/main.html" width="100%" height="542" scrolling="no"></iframe>
[Run AI Governance Structure — Hybrid Model Fullscreen](../../sims/ai-governance-structure/main.html)

<details markdown="1">
<summary>Interactive organizational chart of a hybrid AI governance model</summary>
Type: chart
**sim-id:** ai-governance-structure<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Understanding (Bloom's) — readers identify the decision-making authorities at each level of a hybrid governance structure and trace how a tool adoption request moves through the system.

**Canvas:** Responsive, full container width, 440px height.

**Nodes (each clickable with infobox):**
- "AI Steering Committee" (large, deep orange, top) — Infobox: "The senior governance body. Sets the AI strategy, approves the annual portfolio, reviews quarterly reports, and resolves policy disputes. Typically chaired by the superintendent or provost with board representation."
- "Center of Excellence (CoE)" (orange) — Infobox: "The operational hub. Maintains standards, runs the idea funnel, evaluates vendors, manages the shared code repository, and provides enablement support. Reports to the Steering Committee."
- "Privacy & Compliance Office" (steelblue) — Infobox: "Reviews all AI tools for FERPA, COPPA, and state privacy law compliance before approval. Conducts annual audits of deployed tools. Reports concerns to Steering Committee."
- "School Principal / Department Chair" (teal) — Infobox: "Local champion. Submits ideas to the funnel, facilitates teacher adoption, monitors school-level outcomes, and escalates issues to the CoE. Has delegated authority to approve low-risk tools from the approved vendor list."
- "Teacher AI Champion" (teal) — Infobox: "The teacher most familiar with AI tools in a given school. Provides peer training, gathers feedback on tool effectiveness, and surfaces issues and ideas to the principal."
- "Idea Funnel" (gray) — Infobox: "The process (managed by the CoE) through which AI ideas from any level of the organization are evaluated and selected. See Chapters 5 and 6."
- "Approved Vendor List" (gray) — Infobox: "A maintained list of vendors whose tools have been evaluated for privacy compliance, bias risk, and xAPI capability. Schools can adopt tools from this list with minimal additional approval."

**Edges (directed, with labels):**
- AI Steering Committee → CoE (label: "strategy direction")
- AI Steering Committee → Privacy & Compliance Office (label: "policy mandate")
- CoE → Idea Funnel (label: "manages")
- CoE → Approved Vendor List (label: "maintains")
- CoE → School Principal / Department Chair (label: "standards + support")
- School Principal / Department Chair → Teacher AI Champion (label: "delegates to")
- School Principal / Department Chair → Idea Funnel (label: "submits to")
- Teacher AI Champion → Idea Funnel (label: "submits to")

**Layout:** Hierarchical top-down: Steering Committee at top, CoE and Privacy office in second tier, school-level nodes in third tier, process nodes (funnel, vendor list) as supporting elements.
**Responsive:** fit() on window resize.
</details>

## AI Use Policy

An **AI use policy** is the institution's formal statement of what AI tools are permitted for what purposes, by whom, and under what conditions. AI use policies in education must address at least four distinct user groups — students, teachers, administrators, and external parties — because appropriate AI use differs significantly across these groups.

Before defining policy provisions, it is important to understand the **policy framework** in which an AI use policy sits. A policy framework is the set of existing institutional policies — acceptable use of technology, data privacy, professional conduct, academic integrity — within which the AI use policy must be consistent and to which it refers. New AI use policies should not duplicate existing policies; they should extend them to address AI-specific situations that existing policies do not cover.

Key provisions an AI use policy for a school district or university should address:

- **Student AI use:** For which types of assignments is AI assistance permitted? Prohibited? Required to be disclosed? What level of AI assistance is considered appropriate versus academically dishonest?
- **Teacher AI use:** What types of AI-generated content may be used in instruction? What review is required before AI-generated materials are distributed to students? What are the data privacy requirements for AI tools used in lesson planning?
- **Administrative AI use:** What categories of data may be processed by AI tools for administrative purposes? What human review is required before AI-generated communications are sent to families?
- **Vendor data use:** What obligations do AI vendors have regarding student data use, retention, and security? What must be in every vendor contract?
- **Accountability:** Who is responsible for AI use policy compliance at the school level, the district level, and the system level? What is the escalation process for suspected violations?

## Academic Integrity Policy in the AI Era

An **academic integrity policy** defines what constitutes honest, original academic work and what constitutes a violation of that standard. AI has required institutions everywhere to revisit and update these policies — which were typically written in an era when the primary integrity concern was plagiarism (copying human-authored text) rather than AI-generated substitution.

Three principles should guide AI academic integrity policy:

**1. Clarity over ambiguity.** Vague policies ("students must do their own work") fail in an AI-rich environment because students and teachers cannot agree on what "their own work" means when AI can draft, revise, and explain. Effective policies specify exactly what is permitted and prohibited for each assignment type — with examples.

**2. Consistency over improvisation.** Different teachers applying different standards creates confusion, resentment, and fairness concerns. The policy should establish baseline standards that apply across the institution, with defined mechanisms for teachers to specify additional constraints for specific assignments.

**3. Forward-looking over reactive.** A policy designed solely to prevent AI cheating will be obsolete in two years when AI capabilities shift. A policy designed around "demonstrating genuine understanding through appropriate means" — with specific means defined by assignment type — is durable because it keeps focus on the educational goal, not the tool.

The following table outlines a policy framework organized by assignment type, illustrating how different levels of AI assistance can be defined consistently.

| Assignment Type | AI Assistance Level | Example Policy Language |
|----------------|-------------------|------------------------|
| In-class work | None | "All in-class assignments must be completed without AI assistance. Students may not access AI tools during class unless specifically directed by the teacher." |
| Research and analysis | Permitted for research; disclosure required | "Students may use AI tools to help locate sources or summarize background material. All AI assistance must be disclosed. The analysis and conclusions must be the student's own." |
| First drafts | Permitted with disclosure | "Students may use AI to generate a first draft. The submission must show significant student revision, and the student must disclose that AI assistance was used." |
| Oral examination | None | "Oral examinations assess the student's own understanding. AI tools may not be used during the examination." |
| Project documentation | Case-by-case | "The teacher will specify which components of the project documentation may be AI-assisted. All AI assistance must be documented in a process log." |

## Change Management

**Change management** is the structured approach to transitioning individuals, teams, and organizations from a current state to a desired future state — specifically, the practices that make transitions succeed rather than stall in the face of resistance, uncertainty, and competing priorities.

AI deployment in education involves significant change management challenges because it affects teachers' professional identity (not just their tool set), requires learning new skills under time pressure, generates genuine uncertainty about what the future of teaching looks like, and can trigger resistance from staff who feel their expertise is being displaced.

Effective change management for AI in education is built on four principles:

**Involve staff before announcing decisions.** Teachers who are surprised by an AI deployment — told after the decision is made, rather than consulted during it — are more likely to resist and more likely to surface legitimate concerns that the design process should have caught. Early involvement converts potential resistors into co-designers.

**Address the loss, not just the gain.** Any significant change involves losses alongside gains. Teachers who move from direct instruction to mentorship and facilitation are gaining a different role, but they may also be losing the professional identity and satisfaction they built around direct instruction. Change management that acknowledges these losses — rather than dismissing them as irrational — builds the trust needed for genuine engagement.

**Provide time and support.** AI adoption requires learning new tools, new pedagogical practices, and new data-literacy skills. Change initiatives that announce a new AI system in September and expect it to be fully integrated by October have underestimated the learning curve. Realistic implementation timelines, adequate professional development, and peer support structures are not optional amenities — they determine whether the change takes root.

**Celebrate progress explicitly.** Change management research consistently finds that recognizing and celebrating early wins — even small ones — dramatically increases the probability of sustained change. A teacher who successfully uses AI to differentiate a lesson plan and sees the results in student engagement deserves explicit public recognition, not just a private acknowledgment.

## The Implementation Roadmap

An **implementation roadmap** is the time-structured plan that shows when each element of the AI strategy will be implemented, what must happen before each element can proceed, and who is responsible for each milestone. A well-designed implementation roadmap makes the strategy tangible, creates accountability, and gives all stakeholders a shared picture of what "done" looks like at each phase.

Before examining what a roadmap contains, note the most common roadmap failure: the document that specifies what will be done but not who will do it, what budget will fund it, or what evidence will confirm it is complete. A roadmap that says "complete teacher professional development" without specifying how many teachers, in what skills, with what materials, delivered by whom, is not a roadmap — it is a wish list.

An effective implementation roadmap entry includes:

- **Milestone:** What specific, observable condition marks completion?
- **Target date:** By when?
- **Owner:** Who is accountable?
- **Dependencies:** What must be true before this milestone can begin?
- **Resources required:** What budget, staff time, or vendor support is needed?
- **Success indicator:** How will completion be verified?

#### Diagram: AI Strategy Implementation Roadmap


<iframe src="../../sims/ai-implementation-roadmap/main.html" width="100%" height="592" scrolling="no"></iframe>
[Run AI Strategy Implementation Roadmap Fullscreen](../../sims/ai-implementation-roadmap/main.html)

<details markdown="1">
<summary>Interactive implementation roadmap showing phased AI strategy milestones</summary>
Type: timeline
**sim-id:** ai-implementation-roadmap<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

**Learning objective:** Applying (Bloom's) — readers examine a sample roadmap and identify the dependencies, owners, and sequencing logic for a phased AI strategy implementation.

**Canvas:** Responsive, full container width, 380px height.

**Timeline groups (horizontal swim lanes):**
- "Infrastructure" — device refresh, LRS deployment, vendor contracts
- "Policy & Governance" — AI use policy, academic integrity policy, steering committee formation
- "Professional Development" — AI literacy training for staff, teacher champion program
- "Pilots" — classroom pilot programs, data collection, evaluation
- "Community Engagement" — parent information sessions, board presentations, community forums
- "Scale-up" — district-wide deployment of pilot successes

**Sample timeline items (each clickable with infobox):**

Infrastructure:
- Month 1–3: "LRS vendor selection" — Infobox: "Select and contract an xAPI-compliant LRS. Required before any AI tutoring pilot can begin. Owner: CTO."
- Month 3–6: "LRS deployment and integration" — Infobox: "Configure LRS, connect to first two pilot platforms. Owner: IT team + vendor."

Policy & Governance:
- Month 1–2: "Form AI Steering Committee" — Infobox: "Appoint members, define charter, set meeting cadence. Owner: Superintendent."
- Month 2–4: "Draft AI Use Policy" — Infobox: "Develop policy with teacher and parent input. Board approval required before pilots begin. Owner: General Counsel + CoE."

Professional Development:
- Month 2–4: "AI literacy training — all staff" — Infobox: "One-hour AI literacy sessions for all teaching staff before pilot tools are available. Owner: CoE."
- Month 4–6: "Teacher champion program" — Infobox: "Select and train 1–2 teacher champions per pilot school. Owner: HR + CoE."

Pilots:
- Month 6–12: "Classroom pilot — AI tutoring, 3 schools" — Infobox: "Pilot with volunteer teachers. Collect xAPI data. Establish baseline metrics. Owner: Curriculum Director."
- Month 12–14: "Pilot evaluation" — Infobox: "Evaluate against pre-defined success metrics. Board presentation of results. Owner: Steering Committee."

Community Engagement:
- Month 3–5: "Parent information sessions" — Infobox: "Explain what AI will and will not be used for. Answer questions. Provide opt-out information. Owner: Principal."
- Month 12: "Board presentation — pilot results" — Infobox: "Present quantitative and qualitative results. Request approval for scale-up. Owner: Superintendent."

Scale-up:
- Month 15–24: "District-wide deployment — pilot successes" — Infobox: "Scale tools that met success metrics. Incorporate pilot lessons learned. Owner: CoE + Curriculum."

**Interaction:** Clicking any item opens its infobox. Timeline supports drag to pan and scroll to zoom.
**Responsive:** Adapts to viewports.
</details>

## AI Literacy Programs and Professional Development

An **AI literacy program** is the institution's structured investment in building staff understanding of AI — what it can and cannot do, how to use it effectively in their work, and how to critically evaluate AI claims and outputs. AI literacy programs are prerequisite to meaningful AI adoption: teachers who do not understand how AI works cannot use it effectively, cannot identify when it produces problematic outputs, and cannot make pedagogical decisions about when to use it and when not to.

AI literacy for educators covers:

- What LLMs can and cannot do (building on Chapter 1 foundations)
- How to write effective prompts for pedagogical purposes
- How to critically evaluate AI-generated content — checking for accuracy, bias, and appropriateness
- How to explain AI to students and parents in plain language
- What the privacy implications of specific AI tools are

Critically, AI literacy programs should be offered to all staff — not just the technical staff or the early adopters. A district where the technology department is AI-literate but classroom teachers are not will produce uneven, inequitable adoption.

**Professional development** for AI goes beyond literacy to develop the pedagogical skills required to teach effectively in an AI-augmented classroom: monitoring an AI-tutored block, facilitating project-based learning, using the early-alert dashboard to prioritize interventions, designing assessments that are valid in an AI-rich environment, and building the mentorship relationships with students that become the teacher's primary value-add.

Professional development for AI should be:

- **Ongoing, not one-time:** A single training day does not build lasting capability. Monthly or quarterly professional learning communities, coaching from teacher champions, and access to a shared resource repository sustain learning.
- **Job-embedded:** Learning in the context of actual teaching practice — trying a tool with real students, reflecting on what happened — is more effective than learning in isolation from practice.
- **Peer-led where possible:** Teachers learning from respected colleagues who have already navigated the same challenges are more likely to engage than those learning from outside "experts" who have never taught their grade level or subject.

!!! mascot-tip "Sage's Tip on Professional Development"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The most powerful professional development for AI tools happens when a teacher tries something in their classroom on Friday, reflects on it in a peer group on Monday, and adjusts it the following Friday. Build that cycle deliberately — it beats any day-long training workshop.

## School Board Engagement

**School board engagement** is the process of ensuring that the board of education — the elected or appointed body with ultimate governance authority over a K–12 district — is informed, confident, and supportive of the institution's AI strategy. Without board support, AI initiatives cannot be funded, and AI policies cannot be adopted. With uninformed board support, institutions are vulnerable when something goes wrong and the board has no context for evaluating it.

Effective school board engagement for AI has three dimensions:

**Education:** Boards need the same AI literacy that staff receive, presented in a format appropriate to their governance role — focused on strategic implications, risk and opportunity analysis, and policy questions rather than technical implementation details. A board that has seen AI in action (a live demonstration of AI tutoring; a walkthrough of the idea funnel) is a more capable governance body than one that has only read reports about it.

**Transparency:** Boards should receive the quarterly executive report described in Chapter 6 — portfolio status, KPIs, pipeline health, and emerging risks — with enough context to ask good questions. They should not be surprised by AI developments, positive or negative, in the press before hearing about them from leadership.

**Deliberate decision authority:** Boards should make explicit decisions about AI strategy — approving the AI use policy, authorizing the risk register, setting the annual AI budget — rather than having AI decisions made beneath their visibility. Explicit board decisions create accountability and build the public record that demonstrates responsible governance.

## Parent and Community Engagement

**Parent engagement** and **community engagement** on AI in education are not optional relationship management exercises — they are structural requirements for sustainable AI adoption. Parents who feel their children's education is being changed without their knowledge or consent become the most effective opponents of AI programs. Parents who understand what is changing, why, and how their child's data is being protected become informed advocates.

Before examining engagement strategies, it helps to understand the primary concerns that parents and community members typically bring to AI in education:

- **Privacy:** "Who has access to information about my child? What are they doing with it?"
- **Safety:** "Will AI expose my child to harmful content? Will it manipulate or deceive them?"
- **Fairness:** "Will AI treat my child differently because of their race or background?"
- **Displacement:** "Will AI replace teachers? What happens to the human relationships that matter most in school?"
- **Over-reliance:** "Will my child become dependent on AI and lose the skills to think independently?"
- **Screen time:** "My child is already on screens too much. Will this make it worse?"

Effective engagement addresses each of these concerns specifically and honestly — not with talking points designed to dismiss the concerns, but with genuine answers that acknowledge the tradeoffs and the uncertainty where it exists.

Community engagement extends beyond parents to include local employers, civic organizations, faith communities, and the broader public. In many communities, the school board is the most trusted civic institution, and its AI decisions will be scrutinized by stakeholders well beyond the student and family population. Community engagement communicates the institution's values — careful stewardship of student data, deliberate risk management, commitment to equity — in ways that build the trust the strategy needs to survive.

## Pilot Programs and Scaling Strategy

A **pilot program** is a small-scale, controlled implementation of an AI tool or practice that allows the institution to evaluate effectiveness, identify problems, and learn before committing to full-scale deployment. Pilots are the primary mechanism for managing implementation risk — they create the evidence base that board presentations need and the lessons learned that make full-scale deployment more likely to succeed.

A well-designed pilot program:

- **Defines the success metrics before launch** — not during or after (as emphasized in Chapter 6)
- **Selects schools or classrooms that are representative** — not just the most enthusiastic adopters, whose success may not generalize
- **Includes a comparison or control group** — at minimum, a baseline comparison to the same classrooms before the pilot
- **Has a defined decision gate** — a specific date at which pilot data is reviewed and a go/no-go decision is made for scale-up
- **Documents problems as well as successes** — lessons learned from what did not work are often more valuable for scale-up than confirmation of what did

A **scaling strategy** is the structured plan for expanding a successful pilot to district-wide or institution-wide deployment — specifying what conditions must be met before scaling, what the rollout sequence will be, how professional development will be extended, how vendor contracts will be renegotiated for volume, and how the evaluation framework will be maintained at scale.

The most common scaling failure is the "successful pilot that doesn't scale" — where an intervention works in pilot conditions (enthusiastic teachers, extra support from the development team, a motivated principal) but fails to produce the same results when deployed to the median school. A scaling strategy explicitly addresses the conditions that made the pilot successful and designs those conditions into the scaled deployment.

!!! mascot-celebration "Sage Celebrates Your Progress"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now design the governance structure, draft the key policies, manage the change process, engage your board and community, and build the pilot-to-scale pathway that makes an AI strategy durable. That is the institutional infrastructure that turns a good strategy into a lasting one. The final two chapters synthesize everything into the capstone deliverable.

## Key Takeaways

- **AI governance** is the system of authorities, processes, policies, and accountabilities that makes strategy operational — and keeps it functioning after initial enthusiasm fades.
- **Centralized governance** ensures consistency and equity; **decentralized governance** enables speed and innovation; the **hybrid model** — standards centrally set, selections locally made — balances both.
- An **AI use policy** must address all four user groups (students, teachers, administrators, vendors) and be consistent with the broader **policy framework** of existing institutional policies.
- An **academic integrity policy** for the AI era should be clear, consistent, and forward-looking — focused on demonstrating genuine understanding rather than preventing specific tools.
- **Change management** succeeds when staff are involved before decisions, losses are acknowledged alongside gains, time and support are adequate, and progress is celebrated explicitly.
- An **implementation roadmap** is only useful if it specifies not just what will be done but who is accountable, by when, with what resources, and with what success indicator.
- An **AI literacy program** for all staff — not just technical staff — is prerequisite to meaningful AI adoption; **professional development** builds the pedagogical skills AI-augmented teaching requires.
- **School board engagement** requires education, transparency, and deliberate decision authority — boards must make explicit AI decisions to create accountability and public confidence.
- **Parent engagement** and **community engagement** address privacy, safety, fairness, displacement, and screen-time concerns specifically and honestly — not with talking points.
- **Pilot programs** build the evidence base and lessons learned for **scaling strategy**; the most common scaling failure is deploying pilot conditions that do not transfer to median schools.
