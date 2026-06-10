---
title: Academic Integrity, Equity, and Managing AI Risk
description: Completing the risk framework with vendor lock-in, the risk register, student well-being, the digital divide, equity impact scoring, and the ethics of AI access inequality.
generated_by: claude skill chapter-content-generator
date: 2026-06-10 08:35:00
version: 0.09
---

# Academic Integrity, Equity, and Managing AI Risk

## Summary

Completes the risk picture and pivots to equity: AI safety, vendor lock-in, the risk register, the risk/reward tradeoff, student well-being, and screen-time concerns — then addresses the central equity question with the digital divide, educational equity, device and broadband access, Title I and under-resourced schools, resource disparity, equity-impact scoring, AI-access inequality, and inclusive design. Readers can populate a risk register and score AI initiatives for equity impact.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Human In The Loop
2. AI Safety
3. Vendor Lock In
4. Risk Register
5. Risk Reward Tradeoff
6. Student Well Being
7. Screen Time Concerns
8. Digital Divide
9. Educational Equity
10. Access To Devices
11. Broadband Access
12. Title I Schools
13. Under Resourced Schools
14. Resource Disparity
15. Equity Impact Scoring
16. AI Access Inequality
17. Inclusive Design

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: The Idea Funnel — Gathering, Registering, and Evaluating Ideas](../05-idea-funnel-gathering/index.md)
- [Chapter 6: Selecting Projects, Assigning Resources, and Evaluating Outcomes](../06-selecting-projects/index.md)
- [Chapter 9: Responsible AI — Ethics, Bias, Privacy, and Fairness](../09-responsible-ai/index.md)

---

!!! mascot-welcome "Welcome to Chapter 10"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Chapter 9 built the ethics and privacy framework. This chapter adds the practical governance tools — the risk register, the equity impact score — and confronts the course's most important moral question: What is the cost of *not* giving students access to AI? *"Strategy without action is just a plan."*

## Completing the Risk Picture

Chapter 9 examined the internal risk dimensions of AI in education: algorithmic bias, data privacy, hallucination, over-reliance, and academic integrity. This chapter addresses two additional risk categories that require explicit attention in any complete AI strategy: institutional risks (AI safety, vendor lock-in) and equity risks (the digital divide, access inequality, inclusive design). It then provides the practical governance tool — the risk register — that structures all these risk considerations into a manageable, trackable format.

Two concepts from Chapter 9 connect directly to this chapter. The **human-in-the-loop** principle — the requirement that consequential decisions affecting students remain under human review rather than being delegated entirely to AI — is the overarching governance posture that shapes how institutions manage AI safety. The risk register operationalizes human-in-the-loop by specifying, for each AI initiative, exactly which decisions require human review, who is responsible for that review, and how often it occurs.

## Human-in-the-Loop

The **human-in-the-loop** (HITL) principle holds that AI systems that make or recommend decisions affecting people's lives should always have a qualified human who reviews, approves, or can override those decisions. In education, the principle applies most critically to decisions that affect individual students:

- Identifying a student as "at risk" and initiating intervention
- Recommending that a student be placed in a different course or learning track
- Flagging a student's work as potentially AI-generated for academic integrity review
- Adjusting a student's personalized learning plan significantly
- Communicating with a student's family about their performance or behavior

For each of these decision types, human-in-the-loop means: the AI can recommend, analyze, or flag — but a named human (a teacher, counselor, or administrator) must review the AI's output and make the final decision, with the authority to override the AI recommendation based on contextual knowledge the AI does not have.

Human-in-the-loop is not a blanket requirement for every AI action — it would be impractical to require human review of every adaptive content recommendation. The principle applies specifically to high-stakes decisions: those that affect a student's educational trajectory, disciplinary record, or family relationships in ways that are difficult to reverse.

## AI Safety in Education

**AI safety** in the education context refers to the set of practices that ensure AI systems do not cause unintended harm to students, teachers, or the institution — and that when AI systems behave unexpectedly, the institution can detect the problem quickly and respond effectively.

Key AI safety considerations for education:

- **Content safety:** AI tutoring systems and chatbots must reliably refuse to produce content that is harmful, inappropriate, or illegal for students — explicit content, violent content, instructions for dangerous activities. Content filtering is a required minimum, not an optional feature.
- **Behavioral safety:** AI systems that interact directly with students should be designed to handle emotionally sensitive disclosures — a student expressing suicidal ideation, abuse, or crisis — by connecting the student to human support rather than attempting to handle the situation autonomously.
- **Operational safety:** AI systems should degrade gracefully when they encounter inputs outside their training distribution, rather than producing confident but nonsensical outputs. The system should communicate uncertainty rather than fabricating confident responses.
- **Monitoring and incident response:** Every AI system in production should have a monitoring plan that detects anomalous behavior, a defined incident response process for when problems occur, and a contact at the vendor who can respond quickly to safety concerns.

## Vendor Lock-In

**Vendor lock-in** is the situation in which an institution becomes so dependent on a specific vendor's technology, data format, or service that switching to a different vendor would be prohibitively expensive or technically impossible. In education, vendor lock-in is a significant strategic risk for AI systems because:

- **Data lock-in:** If a vendor stores student learning data in a proprietary format, the institution cannot take that data to a different vendor without significant data conversion effort or data loss. Years of LRS data that cannot be exported are effectively held hostage.
- **Integration lock-in:** If a vendor's AI system is deeply integrated with other institutional systems through proprietary APIs, switching vendors requires rebuilding all those integrations — a cost that can easily exceed the original implementation cost.
- **Dependency lock-in:** If teachers and students have built their workflows around a specific AI tool's interface and features, switching to a different tool requires retraining and creates productivity loss during the transition.
- **Pricing lock-in:** Vendors sometimes use initial low pricing to build dependency, then increase prices substantially once the institution is dependent. Educational institutions with multi-year contracts that include large annual price escalators are particularly vulnerable.

The countermeasures to vendor lock-in begin at the procurement stage: insisting on xAPI-compliant data export rights, requiring standard API access rather than proprietary integrations, negotiating price escalation caps, and building contract exit clauses that specify data migration support.

!!! mascot-warning "Vendor Lock-In Is a Strategic Risk"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    The most dangerous vendor relationship is one where switching would lose your student data. Before signing any multi-year AI contract, ask: "If we cancel this contract tomorrow, can we export all of our data in a standard, portable format with no conversion fees?" If the answer is no, the vendor owns your data — not you.

## The Risk Register

A **risk register** is a structured document that catalogs the risks associated with an institution's AI initiatives — identifying each risk, assessing its likelihood and potential severity, specifying the mitigation strategy, and naming the person responsible for monitoring it. The risk register is the primary accountability tool for responsible AI governance.

Before examining the structure of a risk register, it helps to understand the two dimensions by which risks are assessed. **Likelihood** is the probability that a risk event will occur — typically scored on a 1–5 scale from "very unlikely" to "very likely." **Severity** is the magnitude of harm if the risk event does occur — also typically scored 1–5 from "minimal impact" to "severe impact." The product of likelihood and severity produces a risk score that enables prioritization: high-likelihood, high-severity risks require the most urgent mitigation.

The following table illustrates a sample risk register entry format with representative risks for a mid-sized school district deploying an AI tutoring platform.

| Risk | Category | Likelihood (1–5) | Severity (1–5) | Risk Score | Mitigation | Owner | Review Date |
|------|----------|-----------------|----------------|------------|-----------|-------|-------------|
| Student data breach via vendor | Privacy | 2 | 5 | 10 | Data processing agreement; annual security audit; no student PII beyond what is required | CTO | Quarterly |
| AI hallucination in tutoring content | Content safety | 3 | 3 | 9 | Teacher training on hallucination; teacher review of flagged AI responses; student media literacy education | Curriculum Director | Monthly |
| Algorithmic bias in early-alert system | Fairness | 3 | 4 | 12 | Pre-deployment bias audit; disaggregated outcome tracking; quarterly equity review | Equity Director | Quarterly |
| Vendor price increase making platform unaffordable | Vendor lock-in | 2 | 4 | 8 | Contract price cap; annual budget contingency; data portability clause | CFO | Annually |
| Student over-reliance reducing writing skills | Skill atrophy | 4 | 3 | 12 | AI use policies specifying when AI assistance is permitted; writing-without-AI assessments | Academic VP | Semester |
| Parent community resistance to AI in classroom | Stakeholder | 3 | 3 | 9 | Parent information sessions; opt-out provisions; transparent communication about data use | Superintendent | As needed |

#### Diagram: Interactive Risk Register


<iframe src="../../sims/risk-register-matrix/main.html" width="100%" height="567" scrolling="no"></iframe>
[Run Interactive Risk Register Fullscreen](../../sims/risk-register-matrix/main.html)

<details markdown="1">
<summary>Interactive risk register tool — plot and prioritize risks by likelihood and severity</summary>
Type: MicroSim
**sim-id:** risk-register-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Applying (Bloom's) — readers plot institutional AI risks on a risk matrix and identify which require the most urgent mitigation attention.

**Canvas:** Responsive, container-width × 480px.

**Visualization:**
- 5×5 risk matrix heat map. X-axis: Likelihood 1–5 (left to right). Y-axis: Severity 1–5 (bottom to top).
- Cell colors: Low risk (score 1–4): light green. Medium risk (5–10): yellow. High risk (11–16): orange. Critical risk (17–25): red.
- Pre-populated sample risks appear as labeled circles positioned at their likelihood/severity coordinates.
- Risk score (likelihood × severity) displayed in each circle.

**Pre-populated sample risks (movable circles):**
- "Data breach" at Likelihood 2, Severity 5 (score 10, orange)
- "Bias in alerts" at Likelihood 3, Severity 4 (score 12, orange)
- "Over-reliance" at Likelihood 4, Severity 3 (score 12, orange)
- "Vendor lock-in" at Likelihood 2, Severity 4 (score 8, yellow)
- "Hallucination" at Likelihood 3, Severity 3 (score 9, yellow)

**Controls (p5.js builtins):**
- Button: "Add Risk" — opens a dialog to name a new risk and set initial coordinates.
- Button: "Clear Added Risks" — removes user-added risks; keeps pre-populated ones.
- Dropdown: "Highlight risks above score:" — 5, 8, 10, 12 — dims risks below the threshold.

**Interaction:**
- Hovering a risk circle shows its name and score.
- Clicking opens an infobox showing name, likelihood, severity, score, and a text field for entering a mitigation note.
- Circles are draggable — users can re-position risks as they refine their assessment.

**Responsive:** updateCanvasSize() called in setup() and on window resize. canvas.parent(document.querySelector('main'));
</details>

## The Risk/Reward Tradeoff

The **risk/reward tradeoff** is the explicit comparison between the potential benefits of an AI initiative and its potential harms — with the goal of making a deliberate, evidence-based decision rather than an optimistic or pessimistic one. For each significant AI initiative, a structured risk/reward analysis should answer four questions:

1. **What is the best-case outcome if the initiative succeeds, and how likely is that outcome?** (The reward.)
2. **What is the worst-case outcome if the initiative fails or causes harm, and how likely is that outcome?** (The risk.)
3. **Who captures the benefit, and who bears the risk?** (The equity question — the students most likely to benefit may not be the students most likely to be harmed.)
4. **What is the cost of doing nothing?** (The risk of inaction, which is often underweighted.)

The fourth question is particularly important in the education AI context: if a school district decides not to deploy an AI tutoring tool because of concerns about screen time or skill atrophy, what is the cost to students who would have benefited from personalized tutoring that they currently do not receive? This is not a rhetorical question designed to override risk concerns — it is a genuine analysis of what the course description calls "the ethics of denying students access to superior AI tools."

## Student Well-Being and Screen Time

**Student well-being** encompasses physical health, mental health, social-emotional development, and the quality of a student's daily experience in school. AI deployments that increase the total time students spend on screens — particularly unsocial, individual screen interaction — raise legitimate well-being concerns that must be evaluated explicitly rather than dismissed as technophobia.

**Screen time concerns** in the education AI context focus on two distinct issues:

- **Sedentary behavior:** Extended periods of screen-based activity that replace physical movement, outdoor time, and embodied learning experiences.
- **Social isolation:** AI-tutored individual learning that replaces peer interaction, discussion, and collaborative learning — the social dimensions of schooling that contribute to emotional development and belonging.

The Alpha School model introduced in Chapter 8 addresses both concerns directly: the two-to-three hour morning block is bounded and focused, and the five-to-six hour afternoon block is explicitly social, physical, and collaborative. Institutions that deploy AI tutoring without a corresponding increase in social and physical learning time may increase screen time without increasing the protective pro-social activities that buffer its effects.

The evidence on screen time and student well-being is nuanced: passive entertainment screen time (social media, video streaming) has the strongest negative associations with well-being; educational and interactive screen time has a more complex relationship. AI tutoring, properly designed, is interactive and cognitively demanding rather than passive — but institutions should monitor student engagement, sleep patterns, and social relationships alongside academic outcomes when deploying AI tutoring at scale.

## The Digital Divide

The **digital divide** is the gap between individuals, communities, and institutions that have reliable access to modern digital tools — devices, broadband connectivity, and the digital literacy to use them effectively — and those that do not. In the United States, the digital divide is correlated with income, race, and geography: urban communities of color, rural communities, and low-income communities are systematically less likely to have reliable broadband access and up-to-date devices.

For AI in education, the digital divide creates a potential amplification of existing educational inequity:

- If AI tutoring tools are available only to students with reliable home broadband, students without home internet access cannot benefit from AI-supported homework or evening tutoring.
- If AI tutoring requires current devices to run smoothly, students in under-resourced schools with aging device fleets may experience degraded performance that reduces the tool's educational effectiveness.
- If AI tools are deployed faster in well-funded districts (because they have the infrastructure and the budget), students in under-resourced schools may fall further behind peers in well-funded districts — a new dimension of resource disparity layered on existing ones.

**Educational equity** — the principle that every student, regardless of race, income, language, or geography, should have access to the educational opportunities that allow them to reach their potential — requires that AI strategy explicitly address the digital divide rather than assuming it is someone else's problem to solve.

#### Diagram: The Digital Divide in Education AI Access


<iframe src="../../sims/digital-divide-access-chart/main.html" width="100%" height="562" scrolling="no"></iframe>
[Run The Digital Divide in Education AI Access Fullscreen](../../sims/digital-divide-access-chart/main.html)

<details markdown="1">
<summary>Interactive chart showing device, broadband, and AI-tool access disparities across school types</summary>
Type: chart
**sim-id:** digital-divide-access-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's) — readers identify which dimensions of the digital divide are most significant for AI access and which student populations are most affected.

**Canvas:** Responsive, full container width, 380px height.

**Chart type:** Grouped horizontal bar chart.

**Groups (school types, y-axis):**
- "Wealthy suburban district"
- "Mid-income suburban district"
- "Urban Title I district"
- "Rural under-resourced district"

**Bars (three per group):**
1. "Students with reliable home broadband (%)" — blue bars
2. "Students with a personal device at home (%)" — teal bars
3. "Schools with current AI-compatible device fleet (%)" — orange bars

**Sample data (approximate, based on public research):**
- Wealthy suburban: 95%, 92%, 88%
- Mid-income suburban: 82%, 79%, 72%
- Urban Title I: 64%, 61%, 48%
- Rural under-resourced: 55%, 58%, 42%

**Interaction:**
- Hovering any bar shows the exact percentage and school type.
- Clicking a bar opens an infobox explaining the implication: "64% of students in this school type have home broadband. AI tutoring that requires home internet cannot benefit the 36% who don't."
- Toggle button: "Show equity gap" — adds a red annotation line at the wealthy suburban benchmark, highlighting the shortfall for each other group.

**Responsive:** Redraws on window resize.
</details>

## Access to Devices and Broadband

**Access to devices** — specifically, whether every student has access to a device capable of running AI-powered educational software, both at school and at home — is the first infrastructure requirement for any AI tutoring or intelligent textbook deployment. The COVID-19 pandemic accelerated device deployment significantly in many districts through emergency federal funding (Elementary and Secondary School Emergency Relief, or ESSER), but ESSER funding has expired, and device fleets purchased in 2020–2021 are now aging.

For AI applications specifically, device requirements may be higher than for simple web browsing or document editing. AI tutoring platforms with embedded simulations, real-time feedback, and conversational interfaces require:

- Devices with sufficient RAM and processing power to run modern web applications smoothly (typically 4GB RAM minimum; 8GB preferred)
- Reliable internet connectivity (minimum 5 Mbps per student for real-time AI interaction)
- Up-to-date browsers with JavaScript support

**Broadband access** at the household level remains one of the most persistent infrastructure gaps. The Federal Communications Commission defines "broadband" as 100 Mbps download / 20 Mbps upload for households; as of 2024, approximately 14–21 million Americans lack access to broadband at these speeds, with rural and low-income communities disproportionately affected. Federal programs including the Broadband Equity, Access, and Deployment (BEAD) program and E-Rate provide mechanisms to address school-level connectivity; home broadband access for students remains a harder problem that AI strategy must address through policy advocacy and community partnerships.

## Title I Schools and Under-Resourced Schools

**Title I schools** are public schools that receive additional federal funding under Title I of the Elementary and Secondary Education Act because a high percentage of their students come from low-income families. Title I designation does not mean a school is failing — it means the school serves a student population with higher needs and receives federal support intended to help meet those needs. Approximately 90% of all public schools receive some Title I funding; the most intensive support goes to schools where more than 40% of students come from low-income families.

**Under-resourced schools** is a broader category than Title I — it includes Title I schools, under-funded rural schools, and any institution whose per-pupil spending falls significantly below what is required to provide an adequate education. Resource disparity in U.S. education is significant: per-pupil spending varies by a factor of 3 to 5 across states, and varies even more dramatically within states where local property tax is the primary funding mechanism.

**Resource disparity** in the AI era has a new dimension: AI infrastructure investment. A wealthy suburban district that invests $50 per student per year in AI tutoring subscriptions, device refresh, and professional development can deploy AI in ways that demonstrate measurable learning gains. An under-resourced district without the budget for those investments cannot access the same tools — and the learning gap between students in the two districts may widen even if the under-resourced district's traditional instruction is excellent.

## Equity Impact Scoring

**Equity impact scoring** is the practice of explicitly evaluating each AI initiative's likely effect on educational equity before funding and deployment — not as a checkbox requirement but as a genuine analytical step that can reshape which initiatives are funded and how they are designed.

An equity impact score for an AI initiative assesses:

- **Access:** Will this initiative be equally accessible to all students, regardless of device, connectivity, or disability? If not, what is the plan to address the access gap?
- **Benefit distribution:** Who is most likely to benefit from this initiative? Are the primary beneficiaries the students with the greatest need, or those who are already advantaged?
- **Risk distribution:** Who is most likely to be harmed if this initiative has unintended consequences? Are the students bearing the risk the same students bearing the benefit, or different ones?
- **Design inclusion:** Was the initiative designed with input from the communities it most affects — including students and families from under-represented groups?
- **Differential performance:** Does the AI system perform equally well for all student groups? Have bias audits been conducted across race, income, language proficiency, and disability status?

The following table shows a simple equity impact scoring rubric that can be adapted for any institution's idea evaluation process.

| Equity Dimension | Positive (+1) | Neutral (0) | Negative (−2) |
|-----------------|--------------|-------------|---------------|
| Device/connectivity access | Equal access ensured; solution includes low-connectivity fallback | Primarily affects students who already have access | Requires devices/connectivity not available to significant portion of students |
| Benefit distribution | Primarily benefits under-served students | Benefits all students roughly equally | Primarily benefits already-advantaged students |
| Risk distribution | Risks are borne by well-resourced adults (administrators, vendors) | Risks are distributed broadly | Risks fall disproportionately on vulnerable students |
| AI bias auditing | Documented bias audit with results available for review | Vendor states compliance but no documented audit | No bias audit; no demographic testing |
| Design inclusion | Students and families from affected communities were involved in design | Standard stakeholder review | No community input |

A total equity impact score of +3 to +5 is a positive equity outcome; 0 to +2 is neutral; −1 to −4 is a negative equity outcome that requires redesign or compensating measures before approval.

## AI Access Inequality — The Counter-Argument

The course description explicitly raises a moral argument that education leaders must confront: **the ethics of denying students access to superior AI tools.** This is not a rhetorical device — it is a genuine ethical challenge.

**AI access inequality** in education has two possible futures. In the first, AI is deployed broadly across all school types, with equity-focused infrastructure investment (devices, broadband, professional development) that ensures students in under-resourced schools benefit from AI tutoring, personalized learning plans, and early-alert systems at least as much as students in well-funded districts. In this future, AI narrows the educational achievement gap by giving every student access to the kind of individualized attention that only wealthy families could previously afford through private tutoring.

In the second future, AI is deployed primarily by well-funded districts and private schools, while under-resourced schools delay adoption because of budget constraints, infrastructure gaps, and well-intentioned concerns about screen time and over-reliance. Students in under-resourced schools graduate without the AI literacy and AI-augmented skills that students in well-funded schools develop. The achievement gap widens.

The ethical question is direct: if AI tutoring is demonstrably effective, and if a school district serving low-income students decides not to deploy it because of theoretical risks, who bears the cost of that decision? The students who did not receive the tutoring they would have benefited from. This does not mean all AI risks can be dismissed in the name of access equity — it means the analysis must be genuinely two-sided, with the cost of inaction given equal weight to the cost of action.

!!! mascot-thinking "Sage thinks about the ethics of access"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    "We chose not to deploy AI tutoring because we were concerned about equity" can mean one of two very different things: "We refused to deploy a tool that would have helped our students because we hadn't solved the device gap" — or "We waited to deploy until we had solved the device gap, ensuring every student could benefit." The first is an equity failure masked as equity caution. The second is genuine equity leadership.

## Inclusive Design

**Inclusive design** is the practice of designing educational AI tools and deployments from the beginning to be accessible and effective for the full range of students — including students with disabilities, English language learners, students from non-dominant cultural backgrounds, and students with limited prior technology experience. Inclusive design is not accessibility compliance (a legal minimum); it is design quality that benefits everyone by starting with the most constrained users.

In practice, inclusive design for education AI means:

- **Accessibility compliance as a minimum:** WCAG 2.1 AA compliance for all student-facing interfaces; screen reader compatibility; keyboard navigation; sufficient color contrast; captions on all video content.
- **Language accessibility:** Support for English language learners, including AI explanations available in multiple languages and reading level adjustment that goes down to early-elementary comprehension for all concepts.
- **Cognitive accessibility:** Simple, consistent interfaces that do not overload working memory; clear progression indicators; ability to revisit previous content without penalty.
- **Cultural responsiveness:** AI content and examples that reflect diverse cultural contexts, names, and perspectives — not defaulting to a monocultural frame that alienates students whose background is not represented.
- **Low-bandwidth resilience:** For students with unreliable or limited connectivity, AI tools should provide meaningful functionality at lower bandwidth, with offline modes for the most critical content.

!!! mascot-celebration "Sage Celebrates Your Progress"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You now have the complete risk framework: the human-in-the-loop principle, AI safety practices, a risk register, the risk/reward tradeoff analysis, equity impact scoring, and inclusive design. Together with Chapter 9's ethics and privacy foundation, this gives you the tools to govern AI responsibly — protecting your students while pursuing the genuine educational benefits AI can provide.

## Key Takeaways

- The **human-in-the-loop** principle requires that consequential decisions affecting individual students remain under qualified human review — AI recommends, humans decide.
- **AI safety** in education requires content filtering, behavioral safety for crisis disclosures, operational safety (communicating uncertainty), and a monitoring and incident response plan.
- **Vendor lock-in** is mitigated by insisting on xAPI-compliant data export rights, standard APIs, price escalation caps, and contract exit clauses with data migration support.
- The **risk register** catalogs each risk by likelihood (1–5) and severity (1–5), producing a risk score that enables prioritization, mitigation assignment, and named accountability.
- The **risk/reward tradeoff** analysis must give equal weight to the cost of inaction — including the harm done to students who would have benefited from an AI tool their institution chose not to deploy.
- **Student well-being** and **screen time concerns** are legitimate considerations addressed by bounding AI-tutored time and ensuring robust pro-social, physical, and collaborative activity in the school day.
- The **digital divide** in AI access — gaps in device access, broadband connectivity, and AI-compatible device fleets — correlates with race, income, and geography, and must be addressed explicitly in AI strategy.
- **Title I schools** and **under-resourced schools** face a **resource disparity** that AI can either widen or narrow, depending on whether infrastructure investment accompanies tool deployment.
- **Equity impact scoring** evaluates each AI initiative on five dimensions — access, benefit distribution, risk distribution, bias auditing, and design inclusion — before funding and deployment.
- **AI access inequality** creates an ethical obligation to give equal weight to the cost of withholding AI access as to the risks of deploying it.
- **Inclusive design** starts with the most constrained users — students with disabilities, English language learners, students with limited connectivity — to produce AI tools that benefit everyone.
