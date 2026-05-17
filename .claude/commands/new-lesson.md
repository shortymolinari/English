Create a complete new English grammar lesson for the **Eglish** project following all conventions in `CLAUDE.md`.

## Step 1 — Read conventions

Read `CLAUDE.md` to load the current file structure, design system, and naming rules.

## Step 2 — Gather lesson info

If the user provided arguments (`$ARGUMENTS`), extract as many of the following fields as possible from them. For any field that is still missing, ask the user with `AskUserQuestion` (batch all missing fields into a single call):

| Field | Examples |
|---|---|
| **Grammar concept** | "Comparative Adjectives", "Modal Verbs: Can / Could" |
| **CEFR level** | A1 · A1–A2 · A2 · A2–B1 · B1 · A1–B1 |
| **Topic section** | Topic 01 Verb Tenses · Topic 02 Verbs · Topic 03 Nouns & Determiners · Topic 04 Adjectives · Topic 05 Adverbs · Topic 06 Prepositions · Topic 07 Numbers & Dates · New topic |
| **File slug** | `comparative-adjectives` → `comparative-adjectives-lesson.html` |

## Step 3 — Study existing patterns

Read **two or three** existing lesson HTML files that are closest in topic to the new lesson (read the HTML source, not just the CSS). Pay special attention to:
- Hero formula / decorative element used
- Section numbering and headings used
- CSS custom property names chosen for accent colors
- How the conversation section is constructed
- The note-box / warn-box content

## Step 4 — Build the lesson (use the `eglish-lesson-builder` agent)

Hand off to the **`eglish-lesson-builder`** agent with full context. The agent must:

1. Create `<slug>-lesson.html` at the project root with all CSS **inline** in `<style>` first.
   - Include the `.back-home` anchor immediately after `<body>` (links to `index.html`, uses `css/shared.css`).
   - Follow the hero → numbered sections → conversation → note-box page structure.
   - Use the dark-theme design system and bilingual (English + Spanish) content throughout.
   - Every grammar rule must have at least 4 example pairs (English + Spanish translation).
   - The conversation section must have ≥ 5 bubble exchanges with all possessive/grammar elements highlighted.

2. **Extract** the `<style>` block to `css/<slug>-lesson.css` — move the content, do not rewrite the HTML.
   Replace with:
   ```html
   <link rel="stylesheet" href="css/<slug>-lesson.css">
   <link rel="stylesheet" href="css/shared.css">
   ```

3. If any JavaScript is needed, extract it to `js/<slug>-lesson.js` and replace the inline `<script>` with `<script src="js/<slug>-lesson.js"></script>`.

## Step 5 — Register in index.html

Edit `index.html` directly (do **not** use the agent for this step):

1. Find the correct `<section class="section theme-*">` for the chosen topic.
2. Add a lesson card following the exact pattern of existing cards:
   ```html
   <a class="card" href="<slug>-lesson.html">
     <div class="card-accent"></div>
     <div class="card-body">
       <span class="card-level">LEVEL</span>
       <h3>Lesson Title</h3>
       <p class="card-desc">One-line description of what the lesson covers.</p>
       <div class="card-cta">
         Open lesson
         <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M3 8h10M9 4l4 4-4 4"/>
         </svg>
       </div>
     </div>
   </a>
   ```
3. Increment the `<span class="stat-num">` lesson count in the hero stats section.
4. If a **new topic** was requested, also increment the `<span class="stat-num">` topic count and add a new `<section>` block.

## Step 6 — Report

Tell the user:
- Files created / modified (paths)
- How to open the lesson: `open <slug>-lesson.html` or drag into a browser
- Any design decisions made (accent color choices, section structure)
