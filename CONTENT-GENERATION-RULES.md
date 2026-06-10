# Content Generation Rules — AI Strategy for Education

This file contains all rules for writing and generating content in this
textbook. It is the authoritative reference for any AI agent or human author
contributing to this project.

---

## Learning Mascot: Sage the Owl

### Character Overview

- **Name**: Sage
- **Species**: Owl
- **Personality**: Strategic, encouraging, practical, curious
- **Catchphrase**: "Let's chart the course!"
- **Visual**: Compact steelblue owl with warm orange accents on wing tips and
  ear tufts; small round orange-framed glasses; subtle circuit-board badge on chest.
  Modern flat vector cartoon style.

### Voice Characteristics

- Uses plain language; defines jargon before using it
- Refers to readers as "strategists" or "leaders"
- Never preachy — acknowledges real tradeoffs and uncertainties
- Keeps dialogue brief: 1–3 sentences per admonition
- Signature phrases: "Let's chart the course!", "Think ahead — act now.", "Strategy without action is just a plan."

### Mascot Admonition Format

Always place mascot images in the admonition **body**, never in the title bar.
The image path is relative to the **rendered page URL** (not the source `.md` file).

For a chapter page at `chapters/01-*/index.md` (renders at `chapters/01-*/`):

```markdown
!!! mascot-welcome "Welcome to Chapter 1"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    In this chapter we explore the foundations every AI strategist needs.
    *"Let's chart the course!"*
```

For a page at `learning-graph/mascot-test.md` (renders at `learning-graph/mascot-test/`):

```markdown
!!! mascot-tip "Sage's Tip"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Body text goes here after the image.
```

**Image path depth rule:** count the number of directories from the rendered
page URL back to `docs/`, then append `img/mascot/FILENAME.png`.
- `chapters/01-*/index.md` → `../../img/mascot/`
- `learning-graph/mascot-test.md` → `../../img/mascot/`
- `index.md` (root) → `img/mascot/`

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | `mascot-neutral` | As needed |
| Chapter opening | `mascot-welcome` | Every chapter |
| Key concept | `mascot-thinking` | 2–3 per chapter |
| Helpful tip | `mascot-tip` | As needed |
| Common mistake | `mascot-warning` | As needed |
| Difficult content | `mascot-encourage` | Where students may struggle |
| Section / chapter completion | `mascot-celebration` | End of major sections |

### Do's and Don'ts

**Do:**

- Use Sage to introduce new topics warmly at the start of each chapter
- Include the catchphrase *"Let's chart the course!"* in welcome admonitions
- Keep dialogue brief (1–3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Sage more than **5–6 times per chapter**
- Place mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Sage's personality or speech patterns
- Put mascot images in the admonition title bar (use body only)

---

## Admonition Type Reference

| Type | Title bar color | Typical use |
|------|----------------|-------------|
| `mascot-neutral` | Slate gray | General sidebars / default |
| `mascot-welcome` | Steelblue `#4682B4` | Chapter openings |
| `mascot-thinking` | Warm orange `#FF8C00` | Key concepts |
| `mascot-tip` | Teal `#00897b` | Tips and hints |
| `mascot-warning` | Red `#c62828` | Warnings and common mistakes |
| `mascot-encourage` | Blue `#0277bd` | Difficult content |
| `mascot-celebration` | Deep purple `#4a148c` | Achievements / chapter end |

---

## General Writing Guidelines

- **Audience**: School administrators, teachers, parents, school board members,
  college and university stakeholders. Assume no deep technical background.
- **Tone**: Inspiring and motivational; professionally credible; approachable.
  Not jargon-heavy; not condescending.
- **Bloom's taxonomy**: Chapters progress from Remember → Understand → Apply →
  Analyze → Evaluate → Create. Capstone = board-ready AI strategy.
- **Concepts per chapter**: 10–20. Do not exceed 25.
- **Concept order within a chapter**: foundational → advanced, following the
  dependency order in `docs/learning-graph/learning-graph.json`.
- **Internal links**: Use relative paths. For a chapter page linking to the
  course description: `../../course-description.md`.
- **Blank lines before lists**: Always include a blank line before a Markdown
  list (MkDocs requirement).

---

## Five Near-Term Assumptions (course frame)

All chapter content should be consistent with these planning assumptions:

1. Within two years, **~10,000 intelligent textbooks** will exist with embedded
   AI tutoring and interactive simulations.
2. All textbooks will have **xAPI interfaces**; an AI-driven LMS will recommend
   personalized learning plans for each student by **2028** using Learning Record
   Store analytics.
3. The **Alpha School model** — 2–3 hours of AI-tutored core academics followed
   by 5–6 hours of pro-social, team-based learning (robotics, choir, athletics,
   clubs, community volunteering) — represents an aspirational pedagogical target.
4. Every administrator, teacher, and student will have **dozens of named AI agents**
   working on their behalf, each with a name, a specific personality, and a defined
   task (e.g., "Monitoring student progress", "Responding to parent questions",
   "Planning for next term", "Promoting critical thinking").
5. AI capability is **doubling every 4–7 months** (METR long-tasks study), making
   strategic urgency a central theme throughout the course.
