# Cover Image Prompt — AI Strategy for Education

This file holds the text-to-image prompt used to generate the book cover at
`docs/img/cover.png`. Paste the prompt below into ChatGPT/DALL·E, Midjourney
(append `--ar 191:100`), Ideogram, or any image generator. Target output is the
Open Graph standard **1.91:1** aspect ratio (e.g. 1910×1000 px). Title text is
added later via HTML/CSS overlay, so the image itself contains **no text**.

## Design notes

- **Palette:** deep navy → steelblue (`#4682B4`) gradient background with warm
  orange (`#FF8C00`) accent glows — the same blue-and-orange scheme as the book
  theme and the mascot, Sage the Owl.
- **Montage themes** (from the course): the METR exponential capability curve,
  the six-stage idea funnel, an explosion of intelligent textbooks, the
  xAPI → Learning Record Store telemetry pipeline, a SWOT matrix and a
  risk/reward balance scale, a team of named AI agents, and the Alpha School
  morning-academics / afternoon-projects split.
- **Mascot:** Sage the Owl in the **welcome pose** (one wing raised in a
  friendly wave) anchored in the **lower-left corner**, facing inward toward
  the title.
- **Composition:** elements fade toward the edges with a soft vignette, leaving
  the center darker and cleaner for the white title overlay.

## Image prompt

```
A wide landscape book cover background (1.91:1 aspect ratio, 1910x1000) for an
education-strategy textbook titled "AI Strategy for Education." Deep navy
(#0d1b3a) to steelblue (#4682B4) gradient background with a softly glowing
montage of AI-in-education strategy elements distributed across the frame:

- a bright upward-sweeping exponential growth curve (the AI capability
  doubling), rising from lower-left toward upper-right with glowing data points
- a stylized six-stage idea funnel with small glowing lightbulb and idea cards
  feeding into its wide mouth and a refined stream emerging at the bottom
- a cluster of floating intelligent-textbook icons, a few with tiny
  chat-bubble and simulation sparkles, suggesting thousands of adaptive books
- an interconnected knowledge-graph network of nodes and edges
- a telemetry data stream flowing into a database cylinder (xAPI to a Learning
  Record Store), shown as glowing dotted paths and small statement packets
- a clean 2x2 SWOT matrix grid and a balanced scale weighing reward against
  risk, signaling clear-eyed strategy
- a small row of distinct AI-agent avatar badges, each with a different simple
  icon, representing a team of named agents
- a split day/clock motif: a focused morning-academics block beside a
  project-based afternoon (robotics, arts, athletics icons) for the Alpha
  School model
- subtle circuit-board traces and a graduation-cap silhouette woven faintly
  into the background

In the LOWER-LEFT CORNER, place a friendly cartoon owl mascot named Sage: a
compact, modern flat-vector cartoon owl with a STEELBLUE (#4682B4) body, WARM
ORANGE (#FF8C00) feet and wingtips, small round orange-framed glasses, and a
subtle light circuit-board pattern badge on the chest. Sage is in a welcome
pose with one wing raised in a friendly wave, wearing a thoughtful, confident
half-smile, facing inward toward the center of the cover. Clean lines, crisp
edges, well-lit.

Modern flat design aesthetic with warm orange (#FF8C00) and electric-blue
accent glows. Elements softly fade toward the edges with a subtle vignette,
leaving the center area darker and cleaner for a white title text overlay.
Professional, forward-looking, strategic, optimistic-yet-balanced mood suitable
for school administrators, board members, and university leaders. High
resolution, polished. No text, no words, and no letters anywhere in the image.
```
