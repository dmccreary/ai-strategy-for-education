---
title: AI Foundations — What Every Educator Needs to Know
description: Core AI vocabulary and concepts every education stakeholder needs before any strategy discussion can begin.
generated_by: claude skill chapter-content-generator
date: 2026-06-10
version: 0.08
---

# AI Foundations — What Every Educator Needs to Know

## Summary

Introduces the core AI vocabulary every stakeholder needs before any strategy discussion can begin — covering machine learning, large language models, generative AI, prompts, hallucination, AI agents, and the critical distinction between public and private knowledge. After completing this chapter, readers can define key terms and explain in plain language how modern AI systems work.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Artificial Intelligence
2. Machine Learning
3. Large Language Model
4. Generative AI
5. Neural Network
6. Training Data
7. Model Parameters
8. Foundation Model
9. Frontier Model
10. Prompt
11. Prompt Engineering
12. Context Window
13. Token
14. Inference
15. Hallucination
16. World Model
17. Public Knowledge
18. Private Knowledge
19. Multimodal AI
20. AI Agent

## Prerequisites

This chapter has no in-book prerequisites. It assumes only the general prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Hi — I'm Sage. Let's chart the course!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome to *AI Strategy for Education*! I'm **Sage**, your guide through every chapter of this course. I wear orange-framed glasses because clear vision is what strategy demands, and I carry a circuit-board badge because AI is now woven into every institution's future. I'll appear throughout this book — but not randomly, and never as mere decoration. I have **six jobs**, and you'll learn to recognize me by which one I'm doing:

    1. **Welcome you** at the start of every chapter — that is what I am doing right now.
    2. **Help you think things through** when an idea is the kind that deserves more than a quick skim before you act.
    3. **Give you practical tips** — the moves a seasoned education strategist would make that nobody writes down in a policy document.
    4. **Warn you** about the spots where smart institutions and well-intentioned projects most often go wrong.
    5. **Encourage you** when a concept looks harder than it actually is.
    6. **Celebrate with you** at the end of each chapter when you have done the work.

    That is it. If I am not doing one of those six things, I am not in the chapter. *Let's chart the course!*

## Why Vocabulary Is a Strategy Tool

Before any school board can vote on an AI policy, before any principal can evaluate a vendor's pitch, before any teacher can decide whether to use an AI writing tool in the classroom — someone needs to define the terms. Not technically, in the way a computer scientist would, but precisely enough to have a shared, reliable conversation.

This chapter is that shared vocabulary. Twenty concepts, defined plainly and ordered from the simplest to the most complex. No math. No code. Just the words — and the relationships between them — that every education stakeholder needs to think and talk clearly about AI.

You will notice that most of these concepts build on each other. That is intentional, and it reflects how AI systems actually work: each layer of capability rests on a simpler foundation. By the end of this chapter you will be able to trace that stack from the bottom all the way up — from the broadest idea of **artificial intelligence** to the **AI agents** already appearing in classrooms and administrative offices.

## The Root: What Is Artificial Intelligence?

**Artificial intelligence (AI)** is the field of computer science concerned with building systems that perform tasks typically requiring human intelligence — recognizing speech, understanding text, translating languages, identifying objects in images, making decisions, and generating new content. The term was coined at a 1956 conference at Dartmouth College and has carried different meanings at different moments in history. Today, when people in education say "AI," they almost always mean a specific family of techniques that emerged powerfully after 2012 and dominates the field in the mid-2020s.

AI is not one technology. It is a large umbrella term covering many different approaches and methods. What all modern AI systems share, however, is that their capabilities come from learning patterns in data rather than from rules written by a programmer. That distinction — learned patterns versus hand-crafted rules — is the first important thing to understand about the technology reshaping education.

#### Diagram: Deep Learning Timeline

<iframe src="../../sims/shared/timeline/main.html" height="580" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

## How AI Learns: Machine Learning, Neural Networks, and Training

### From Rules to Learning

For most of computing's history, software worked by following explicit instructions written by human programmers: *if this condition is true, then do that action.* A spell-checker, for instance, compares every typed word against a stored dictionary and flags anything not found there — a set of rules a programmer wrote out by hand.

**Machine learning (ML)** is a fundamentally different approach. Instead of writing rules, you show a system thousands — or millions, or billions — of examples, and the system figures out the rules on its own by detecting statistical patterns. A machine-learning spell-checker might be trained on millions of correctly-spelled documents; it learns which letter combinations appear frequently and flags those that never appear, without any programmer specifying those combinations. The practical consequence is that ML systems can handle tasks far too complex for explicit rules, such as understanding the nuance of natural language or recognizing a face in a crowd.

Before examining the architecture behind machine learning, consider the table below. It contrasts the traditional approach with the machine-learning approach across five dimensions — using only the vocabulary introduced in this section.

| Dimension | Traditional Programming | Machine Learning |
|-----------|------------------------|------------------|
| How logic is created | Programmer writes rules explicitly | System discovers patterns from examples |
| What you supply | Instructions + input data | Examples with correct outputs |
| Strength | Precise, auditable, predictable | Handles tasks no human could script |
| Weakness | Brittle; breaks on unforeseen inputs | Can fail in surprising, hard-to-predict ways |
| Typical education use | Attendance calculations, grade averaging | Language tutoring, essay feedback, image recognition |

### Neural Networks: The Architecture Behind Modern AI

The machine learning technique that powers virtually all of today's leading AI systems is the **neural network**. A neural network is a mathematical structure loosely inspired by the way neurons in the brain connect — not in the sense that it thinks or is conscious, but in the structural sense that many simple processing units are linked together in layers, each passing information to the next.

You do not need to understand the underlying mathematics to grasp the key insight: when a neural network is given many training examples, it adjusts the strength of the connections between its units until it can reliably produce the right output for each input. Those connection strengths are called **model parameters** — numerical values, often in the billions for a large modern model, that together encode everything the system has learned. Changing the parameters changes what the model can do.

**Training data** is the collection of examples the neural network learns from. For a language model, training data might be billions of documents: web pages, books, scientific papers, and code repositories. For an image recognition system, it might be millions of labeled photographs. The quality, scope, and diversity of the training data directly shape what the model can and cannot do. A model trained only on English text will perform poorly in French; a model trained only on formal writing will handle casual conversation awkwardly.

!!! mascot-thinking "Think about the data behind the model"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    When a vendor tells you their AI product "has been trained on educational content," your next question should be: *What educational content? From which grade levels, subjects, languages, and demographic groups?* Training data is the model's entire knowledge base. Its gaps become the model's gaps — and your students' risk.

The diagram below shows how these three components — training data, neural network, and model parameters — work together in the two-phase life of an AI system: first training, then inference.

#### Diagram: Neural Network Learning Pathway

<iframe src="../../sims/shared/autoregressive/main.html" height="600" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>How training data flows through a neural network to produce model parameters, which are then used for inference</summary>
Type: interactive-infographic
**sim-id:** neural-network-learning-pathway<br/>
**Library:** vis-network<br/>
**Status:** Specified

This interactive diagram illustrates the two-phase pipeline of an AI system in a left-to-right flow across three labeled stages.

**Stage 1 — Training (left panel):** A stack of five card icons representing different types of training data (web pages, books, audio transcripts, images, code). Cards are styled as flat-vector tiles with a small icon and one-line label each.

**Stage 2 — Neural Network (center panel):** A vis-network graph showing a three-layer neural network: input layer (4 nodes), hidden layer (6 nodes), output layer (2 nodes). All nodes are connected to the next layer. Edges are colored by weight using a blue-to-orange gradient (blue = low weight, orange = high weight). The panel is labeled "Training phase" above and "Parameter adjustment" below.

**Stage 3 — Model Parameters (right panel):** A column of horizontal slider-bar icons representing billions of numerical weights, labeled "7 billion parameters (example)." Below the parameters, a downward arrow leads to an "Inference Output" box representing a text response.

**Animated connections:** Dashed arrows flow left-to-right through the diagram to suggest data moving through each stage.

**Interactivity:**
- Click any Training Data card → tooltip: one sentence about what that data type contributes to the model's capabilities, plus a note about what happens when this type is absent or biased.
- Click any node in the neural network → tooltip: "This processing unit receives values from the previous layer, applies a mathematical transformation, and passes results forward."
- Click any edge in the network → tooltip: "This connection has a weight — a number adjusted during training. A high weight means this connection strongly influences the output."
- Click the Model Parameters panel → expandable info panel: "After training, all connection weights are frozen. This frozen set of numbers IS the model. Every answer it gives comes from applying these fixed numbers to your input."
- Click the Inference Output box → tooltip: "When you ask a question, the system applies the fixed parameters to your prompt to calculate an answer. This process is called inference — no learning happens here."

**Canvas:** 900px wide × 380px tall, responsive to container width. Background: #f5f5f5. Left panel: soft blue (#e3f2fd). Center panel: white. Right panel: soft amber (#fff8e1). Arrows: warm orange (#FF8C00), dashed, animated (CSS dash-flow at 0.8s). Font: clean sans-serif, 14px.

**Learning objective (Bloom's Remembering/Understanding):** Learner can name the three stages of the training pipeline, state the role of each, and distinguish training from inference.
</details>

## The Language Revolution: Large Language Models, Generative AI, and Tokens

### Large Language Models

A **large language model (LLM)** is a neural network trained specifically to understand and generate text. The "large" in the name refers to scale: these models have tens of billions to hundreds of billions of parameters, and they were trained on text datasets so enormous that they span a significant fraction of all publicly available human writing.

What makes LLMs remarkable is that sheer scale appears to produce emergent capabilities that no one explicitly programmed. Train a network large enough on enough text, and it can answer questions, summarize documents, translate languages, write code, compose essays, and carry on a conversation — not because any programmer scripted those abilities, but because statistical patterns in trillions of words encode a great deal about how language and knowledge work.

The LLM is the technological engine behind the AI tools that have most visibly entered education since 2022: writing assistants, tutoring chatbots, grading aids, and lesson-plan generators.

### Generative AI

**Generative AI** is a broader category that includes LLMs but extends beyond them. A generative AI system is any AI that produces new content — text, images, audio, video, or code — rather than simply classifying or retrieving existing content. An LLM that writes a paragraph is generative. An AI that generates a photorealistic image from a text description is also generative, even though it is not a language model. The term "generative AI" covers both and everything in between.

For education strategy purposes, the most important implication of generative AI is that it has dramatically reduced the cost of producing high-quality first drafts of nearly any content. This is both an enormous opportunity — personalized learning materials, instant explanations calibrated to any level, real-time translation — and a significant challenge — easier academic dishonesty, AI-generated misinformation, and the displacement of productive struggle that learning often requires.

### Tokens: The Currency of Language Models

Before a language model can process text, it breaks the text into small pieces called **tokens**. A token is the basic unit of text that an LLM operates on — not always a whole word, but typically a word fragment, a short word, or a punctuation mark, depending on the model. For English text, a useful rule of thumb is that one token is roughly four characters, or about three-quarters of a word.

Tokens matter to education administrators for a practical reason: they are the unit of cost. AI service providers typically charge per token of input and per token of output. A student submitting a 500-word essay for AI feedback sends roughly 665 tokens; a district running that service for thousands of students accumulates token costs that must be budgeted for, planned around, and monitored.

#### Diagram: Tokenizer MicroSim

<iframe src="../../sims/shared/tokenizer/main.html" height="470" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

### The Context Window

A language model does not have unlimited working memory for a conversation. It has a **context window** — the total number of tokens it can "see" at one time, including both what you have sent it and what it has replied so far. Think of the context window as the model's short-term memory for a single interaction.

Early LLMs had context windows of a few thousand tokens — roughly equivalent to a few pages of text. By the mid-2020s, frontier models offer context windows of 100,000 to over 1,000,000 tokens, enabling them to process an entire textbook chapter, a full student transcript, or a lengthy policy document in a single exchange. Larger context windows unlock more complex tasks: summarizing a year's worth of a student's writing, maintaining coherence through a long tutoring session, or cross-referencing multiple institutional documents to give tailored guidance.

The diagram below shows how the six concepts introduced in this section — AI, machine learning, neural network, LLM, generative AI, and token — relate to each other hierarchically.

#### Diagram: AI Concept Hierarchy

<details markdown="1">
<summary>How Artificial Intelligence, Machine Learning, Neural Networks, LLMs, Generative AI, and Tokens relate to each other</summary>
Type: interactive-infographic
**sim-id:** ai-concept-hierarchy<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Layout:** A vis-network hierarchical diagram (layout: hierarchical, direction: UD — top to bottom). Seven nodes arranged across four levels.

**Nodes:**
- Level 1: "Artificial Intelligence" — large, teal (#4682B4), centered
- Level 2: "Machine Learning" — medium, connected to AI
- Level 3 (side by side): "Neural Network" and "Large Language Model (LLM)" — both connected to Machine Learning
- Level 4 (connected to LLM): "Generative AI" and "Token" and "Context Window" as smaller leaf nodes

**Edges with labels:**
- AI → Machine Learning: "dominant modern approach"
- Machine Learning → Neural Network: "key architecture"
- Machine Learning → LLM: "trained at scale on text"
- LLM → Generative AI: "text branch of"
- LLM → Token: "processes text as"
- LLM → Context Window: "bounded by"

**Interactivity:**
- Click any node → a right-side info panel appears with: the term in bold, a two-sentence plain-language definition, and one concrete education example (e.g., clicking "Token": "A fragment of text — roughly 4 characters — that the model processes as a single unit. Education example: A 500-word student essay contains roughly 665 tokens; at $0.01 per 1,000 tokens, that costs less than one cent to process.")
- Hover over any edge label → tooltip explaining the relationship in one sentence
- A small legend at bottom-right explains the node size convention (larger = more foundational)

**Canvas:** 750px × 520px, responsive. Background: white. Node colors: teal for parent/foundational concepts, warm orange (#FF8C00) for leaf concepts. Edge lines: medium gray with directional arrowheads. Font: clean sans-serif, 13px node labels.

**Learning objective (Bloom's Understanding):** Learner can correctly place each concept within the AI concept hierarchy and explain the relationship between any adjacent pair of concepts.
</details>

## Talking to AI: Prompts and Prompt Engineering

### Prompts

A **prompt** is the input you give to an AI system — the text, image, audio, or other data you send to the model to request a response. For an LLM, a prompt might be a question ("What are the main provisions of FERPA?"), an instruction ("Summarize this paragraph for a seventh-grader"), a role assignment ("You are a friendly math tutor working with a student who finds fractions confusing"), or any combination of the above.

The prompt is the primary control interface between a human and a language model. Unlike traditional software, where you select options from menus or run coded commands, you interact with an LLM through natural language. This makes AI feel intuitive — almost anyone can write a sentence — but it also means that the quality of the model's response depends heavily on how the prompt is written.

### Prompt Engineering

**Prompt engineering** is the practice of crafting prompts deliberately to get more accurate, useful, and appropriately formatted outputs from an AI. It is less like programming and more like learning the most effective way to ask a question.

Prompt engineering techniques useful to education leaders include the following:

- Providing clear context about your role and situation ("I am a high school principal in a rural district with limited broadband infrastructure")
- Specifying the desired format of the response ("Give your answer as a three-bullet executive summary, one sentence per bullet")
- Assigning the model a role or persona ("Act as a skeptical school board member and list three objections to this proposal")
- Including concrete examples of the output style you want
- Breaking a complex task into numbered sequential steps so the model works through them in order

Prompt engineering is not a mystical skill reserved for engineers. It is, at its core, clear professional writing applied to a new medium — and it is a capability every educator and administrator can build with modest practice.

!!! mascot-tip "Your first prompt engineering move"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you send any prompt, add three things to the first sentence: your role, your audience, and your goal. *"As a high school curriculum coordinator preparing a brief for the school board, write a one-paragraph plain-English explanation of how large language models work."* That single sentence of context will improve the response more than any other technique — and it takes fifteen seconds.

## Scale and the Frontier: Foundation Models and Inference

### Foundation Models

A **foundation model** is a large neural network — typically an LLM or a generative model — that has been trained at massive scale on broad, diverse data and is designed to be adapted or fine-tuned for many specific downstream tasks. The word "foundation" captures the idea that these models serve as a base layer: specific applications and products are built on top of them rather than trained from scratch each time.

The leading AI systems from Anthropic, Google, OpenAI, and Meta are all foundation models. When an education technology company builds an AI tutoring product, they almost never train a model from scratch — they start with a foundation model and adapt it for their specific use case. This is why dozens of AI education products can appear in a short span of time: the expensive, compute-intensive foundation model is shared infrastructure, and individual products customize it.

### Frontier Models

A **frontier model** is a foundation model that represents the current state of the art — the most capable publicly available AI system at a given moment. The concept of a "frontier" matters for strategy because the frontier moves. A model that was considered frontier-grade in 2023 may be surpassed many times over by 2025.

Planning your institution's AI strategy around a specific model's current capabilities is a mistake. Planning around the trajectory of the frontier — where capabilities are headed, not where they sit today — is the goal. The METR study referenced throughout this course, which found that AI capability is doubling every four to seven months, is specifically tracking the frontier. For educators, the implication is concrete: the tools your incoming first-year students will use during their senior year will be substantially more capable than the tools available on their first day of school.

### Inference

When you send a prompt to an AI and receive a response, the model is not "thinking" in any human sense. It is performing a mathematical calculation: taking your input and running it through all of its frozen parameters to produce an output. This process — applying a trained model to new data to generate a prediction or response — is called **inference**.

Inference is distinct from training. Training is expensive: it requires enormous computing infrastructure, weeks of processing time, and datasets of billions of documents. Inference is far cheaper: it requires only the frozen model and the user's input. Once a foundation model has been trained, it can serve millions of users through inference at a relatively low cost per interaction — which is why AI products can reach global scale without needing to retrain for every user.

The table below summarizes the three model-related terms introduced in this section. The definitions above should be read before using this table as a reference; the table is a review and comparison, not an introduction.

| Term | What it is | Why it matters for your strategy |
|------|-----------|----------------------------------|
| Foundation Model | A large, broadly-trained model that serves as the base for many applications | Most AI products you evaluate are built on one; you are usually evaluating the product layer, not the foundation |
| Frontier Model | The most capable model publicly available at a given time | The frontier moves fast; plan for where it is going, not where it stands today |
| Inference | Applying a trained model's frozen parameters to a new input to generate a response | The mechanism behind every AI interaction a student or teacher has — cost scales with volume |

## What AI Doesn't Know: Hallucination, World Models, and Knowledge Boundaries

### Hallucination

Language models are extraordinarily fluent. They produce text that sounds confident and authoritative. This fluency makes one of their most important failure modes especially dangerous: **hallucination**, the phenomenon in which an LLM generates text that is factually incorrect, fabricated, or nonsensical while presenting it with the same confident tone it uses for accurate information.

A model does not know when it is wrong. It generates the most statistically plausible continuation of your prompt based on its training data — and sometimes the most statistically plausible continuation is incorrect. A model trained on millions of articles about a topic may, when asked about an obscure detail, generate a plausible-sounding but false answer because plausible-and-wrong fits the patterns in its training data better than "I don't know."

For educators, this has direct practical implications. AI tutoring systems may confidently teach incorrect facts. AI-generated curriculum materials require expert review before classroom use. An AI that summarizes a policy document may get the broad strokes right while inverting a critical detail. Recognizing hallucination as a systematic, architectural property of current LLMs — not a bug that will be fully fixed — is essential for any responsible AI strategy.

!!! mascot-warning "Always verify before you trust"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Never cite an AI-generated statement in a board document or policy brief without independent verification. Hallucination does not announce itself — a fabricated citation looks identical to a real one. For high-stakes decisions, treat AI output as a first draft from a brilliant colleague who occasionally and confidently makes things up. The draft is valuable; the verification step is not optional.

### World Models

Human beings develop a **world model** — an internal mental simulation of how physical reality works, how other people think, how cause and effect operate, and how time unfolds. When you predict that a dropped glass will shatter on a tile floor, you are running your world model.

Current large language models do not have genuine world models. They have learned to produce language that reflects the world models described in their training data — which means they can discuss physics, causality, and human behavior in remarkably sophisticated ways. But they do not have an underlying simulation of reality. They cannot reliably reason about novel physical scenarios they have never encountered in text, and they have no persistent understanding of events that occurred after their training was completed.

This limitation matters for teaching and learning. An AI tutor that lacks a genuine world model may give subtly wrong answers about cause-and-effect relationships in history, science, or social situations — not because it lacks relevant vocabulary, but because it is pattern-matching text rather than reasoning from a model of how the world actually works.

### Public Knowledge and Private Knowledge

One of the most practically important distinctions for education institutions is the difference between what an AI knows from its training and what your organization knows from its own records and operations.

**Public knowledge** refers to information that was available in the public domain at the time the model was trained — established science, published histories, legal statutes, publicly available curricula, and the entire written record of public human knowledge up to the model's training cutoff date. Public knowledge is what a foundation model "comes with" out of the box, free of charge and without any additional configuration.

**Private knowledge** refers to information specific to your institution — student records, internal policies, teacher evaluations, budget documents, local curriculum decisions, community demographics, and individual learning histories — that was never part of any public training dataset. A language model knows nothing about your school's specific discipline policy, your district's budget constraints, or any individual student's needs unless you explicitly provide that information in the context window or through a specialized technique.

The distinction matters enormously for strategy. When an AI vendor claims their product enables personalized learning, the critical question is: *How does the AI access private knowledge about individual students?* Is it reading your student information system? Where does that data go after the interaction? Who controls it, and under what terms? Private knowledge handled carelessly becomes a privacy and FERPA liability.

The diagram below makes this boundary concrete by sorting common institutional data types into the two categories.

#### Diagram: Public vs. Private Knowledge Boundary

<details markdown="1">
<summary>How to classify institutional information as public training knowledge or private data requiring governance</summary>
Type: interactive-infographic
**sim-id:** public-private-knowledge-boundary<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Layout:** A two-panel side-by-side diagram with a labeled dividing line between them.

**Left panel — "Public Knowledge":** A soft-blue (#e3f2fd) background with five stacked card icons representing: Published textbooks, Scientific research papers, State curriculum standards, Federal laws and regulations, News and public records. Each card has a small flat-vector icon and a one-line label.

**Right panel — "Private Knowledge":** A soft-amber (#fff8e1) background with a locked-vault visual cue (small padlock icon in the top corner). Five card icons: Student grade records, Staff performance evaluations, District budget documents, School discipline logs, Internal policy drafts.

**Center dividing line:** A vertical dashed line (#555), labeled "Training Cutoff / Privacy Boundary." Above the divider label, a secondary note: "Also: AI may lack recent public knowledge published after training cutoff."

**Below the panels — two connector arrows:**
- Arrow 1: labeled "Context Window (manual)" — a dashed orange arrow pointing from the Private panel toward a small "AI" icon at the bottom center. Tooltip on hover: "You can paste private documents into your prompt. This is fast, but the data leaves your systems and enters the AI provider's infrastructure — review your vendor's data-use terms."
- Arrow 2: labeled "RAG (technical bridge)" — a dashed teal arrow with a padlock icon, pointing from the Private panel to the same AI icon. Tooltip on hover: "Retrieval-Augmented Generation connects the AI to your private data stores without training the model on that data — a more privacy-conscious approach. Covered in a later chapter."

**Interactivity:**
- Click any card in the left panel → tooltip: "The AI model already understands this type of information from training. Example relevant to education: [specific example]."
- Click any card in the right panel → tooltip: "The AI model has NO knowledge of this unless you provide it. Key governance question: [the specific privacy question this data type raises]."
- Click either connector arrow → an info panel expands below the diagram with two or three sentences describing the pathway, its privacy implications, and the chapter where it is addressed in depth.

**Canvas:** 900px wide × 450px tall, responsive. Left panel width: 42%. Right panel width: 42%. Center divider: 4px dashed. Padlock icon on right panel: 28px, positioned top-right. Bottom connector area height: 100px.

**Learning objective (Bloom's Analyzing):** Learner can classify a given piece of institutional information as public or private, identify the appropriate AI access pathway for each, and state the governance question each pathway raises.
</details>

## Beyond Text: Multimodal AI

The earliest powerful LLMs worked exclusively with text. **Multimodal AI** refers to AI systems that can process and generate multiple types of data — text, images, audio, video, and code — within a single model or tightly integrated system.

By the mid-2020s, frontier models are routinely multimodal. A student can photograph a hand-written math problem and ask for a step-by-step explanation. A teacher can record a short video of a science demonstration and ask an AI to generate discussion questions calibrated to a specific grade level. A special education coordinator can submit a recorded reading session and receive a detailed fluency analysis. The practical effect of multimodality is that AI is no longer limited to text-literate users — it can work with any student who can hold up a phone, speak a sentence, or draw a sketch.

For curriculum design, multimodal AI opens significant new possibilities: AI tutors adapted for students with reading disabilities, AI feedback systems for art and music classes, and AI assessments that evaluate spoken answers rather than only written ones. For procurement, it raises a new set of data governance questions — audio and video of students are among the most sensitive private data an institution holds.

## AI That Acts: Understanding AI Agents

All the AI capabilities introduced so far in this chapter — generating text, answering questions, analyzing images — share a common structure: a single request–response cycle. You send a prompt; the AI produces one output. An **AI agent** is a system that goes further: it is an AI that can take actions, use tools, make multi-step plans, and operate autonomously over time to accomplish a goal.

Consider an example. An AI agent might be given this instruction: "Review the last thirty days of attendance data for students enrolled in our after-school tutoring program, identify any student whose attendance has declined by more than fifteen percent, and draft a summary report for the principal." To complete that task, the agent would need to access the attendance database, retrieve and filter records, identify the relevant trend across dozens of students, format a report, and deliver it — all without a human directing each individual step.

For education, the agent paradigm represents a shift in kind, not just degree. An AI tutoring system that answers questions is a useful tool. An AI agent that monitors a student's progress, notices when they are consistently struggling with fractions, proactively surfaces targeted review exercises, and notifies the teacher when the pattern persists is something qualitatively different: a tireless, personalized teaching assistant operating at scale.

The course assumption that every administrator, teacher, and student will have dozens of named AI agents working on their behalf within two years is a prediction specifically about agent AI — not about simple question-answering chatbots. Managing, coordinating, and governing a workforce of AI agents becomes a distinct administrative and ethical challenge, one that later chapters address in detail.

!!! mascot-encourage "Agents can seem overwhelming — here is the key insight"
    ![Sage encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    You do not need to understand how AI agents are built to govern them wisely. What you need to understand is what they are authorized to do: Which data sources can they read? Which actions can they take autonomously? Who can override or pause them? Those governance questions fall entirely within the scope of education leadership — and they are exactly what this course prepares you to answer. *Think ahead — act now.*

The diagram below shows the four operational components of an AI agent and the external environment it interacts with.

#### Diagram: Anatomy of an AI Agent

<details markdown="1">
<summary>The four components of an AI agent cycle — perceive, plan, act, remember — and the institutional environment they operate within</summary>
Type: interactive-infographic
**sim-id:** ai-agent-anatomy<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Layout:** A circular flow diagram centered on a small robot-face icon labeled "AI Agent." Four labeled nodes are arranged clockwise at equal distances around the center: (1) Perceive (top), (2) Plan (right), (3) Act (bottom), (4) Remember (left). Directed arrows connect the nodes clockwise. Three "environment" icons appear outside the circular loop at 12 o'clock, 4 o'clock, and 8 o'clock positions: a database icon (Data Sources), a document icon (Outputs), and a human figure icon (Human Oversight).

**Node definitions to display on click:**
- Perceive: "Receives inputs — a prompt, a database query result, a scheduled trigger, or a new event in a connected system."
- Plan: "Uses the LLM to reason about how to accomplish the assigned goal; may break the task into steps or decide which tool to invoke next."
- Act: "Executes one step — queries a database, writes a file, sends a message, or calls another AI tool."
- Remember: "Stores the result of this step so subsequent steps can build on it; may also update a persistent memory store between sessions."

**Environment icon definitions:**
- Database (Data Sources): "The agent reads from — and may write to — institutional data stores. Data governance policies apply here."
- Document (Outputs): "The agent produces outputs — reports, messages, lesson drafts — that humans review before any consequential action."
- Human Figure (Human Oversight): "A human supervisor can inspect the agent's plan before it executes, set hard limits on permitted actions, or pause the agent at any point."

**Interactivity:**
- Click each of the four cycle nodes → info panel expands with the node's definition plus an education-specific example (e.g., Perceive: "A student-monitoring agent receives a new batch of quiz scores from the LMS every Sunday evening.")
- Click each environment icon → tooltip with the definition above and a one-sentence note about where this governance question is addressed in the course
- The four clockwise arrows animate slowly (gentle pulse along the arrow path) to suggest the cycle runs continuously
- A "Pause / Override" button icon appears on the Human Oversight node, clickable to reveal a tooltip: "In responsible agent deployments, human override is always technically possible. Chapter [N] covers governance structures that make override practically effective."

**Canvas:** 620px × 620px, responsive. Background: white. Cycle node colors: teal (#4682B4). Center icon: steelblue. Environment icon background circles: light gray (#f0f0f0). Arrow color: warm orange (#FF8C00), 2px stroke, directional arrowheads. Clockwise pulse animation: CSS, 2.5s loop.

**Learning objective (Bloom's Understanding):** Learner can describe the four stages of an AI agent's operation, identify which stage raises the most significant data governance concerns, and explain why human override capability is a governance requirement rather than an optional feature.
</details>

## Chapter Summary: A Map of the Territory

You have now worked through the twenty foundational concepts that underpin every discussion in this course. Here is the full stack, from bottom to top:

- **Artificial intelligence** is the broad field. **Machine learning** is the dominant modern approach within it — systems that learn patterns from data rather than following hand-written rules.
- ML systems learn from **training data** using **neural networks**, and their knowledge is encoded in **model parameters** — billions of numbers that capture everything the system has learned.
- **Large language models** are neural networks trained at massive scale on text. **Generative AI** is the broader category of models that produce new content — text, images, audio, and more.
- LLMs process text as **tokens** and operate within a **context window** — limits that determine both cost and the complexity of tasks a model can handle in a single exchange.
- You communicate with LLMs through **prompts**. The skill of crafting effective prompts is **prompt engineering** — a learnable, practical skill for any educator or administrator.
- **Foundation models** are the base layer most AI products are built on. **Frontier models** are the leading edge of what is currently possible. **Inference** is the process of running any model to generate a response.
- AI systems **hallucinate** — they generate plausible-sounding falsehoods with no reliable warning signal. They also lack genuine **world models**, making them sophisticated pattern-matchers rather than reasoners with a full understanding of reality.
- **Public knowledge** is what the model learned during training from publicly available text. **Private knowledge** is everything your institution holds that the model has never seen — student records, internal policies, local data.
- **Multimodal AI** extends these capabilities beyond text to images, audio, and video, opening possibilities for accessibility and richer assessment.
- **AI agents** add action and autonomy to AI: they perceive, plan, act, and remember across multi-step tasks — and governing them becomes a core institutional responsibility.

!!! mascot-celebration "You have charted the foundations!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Every chapter from here builds directly on these twenty terms. If you find yourself uncertain about any of them, come back to this chapter — it is your anchor for the rest of the course. You have done the essential groundwork of every strategist: before you plan, you understand the terrain. *Strategy without a shared language is just noise. Now you have the language. Let's chart the rest of the course!*
