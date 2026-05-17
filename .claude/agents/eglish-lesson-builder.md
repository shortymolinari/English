---
name: eglish-lesson-builder
description: "Use this agent when working on the Eglish project to create new English grammar lessons, edit existing ones, extract inline CSS/JS to separate files, or update index.html. This agent knows the project's dark-theme design system, bilingual (EN/ES) content format, CSS variable conventions, and file naming rules.\n\nExamples:\n<example>\nContext: User wants a new lesson on comparatives.\nuser: \"crea una lección sobre comparative adjectives nivel A2\"\nassistant: \"Voy a usar el agente eglish-lesson-builder para crear la lección con el diseño del proyecto.\"\n<commentary>\nThe agent knows the exact HTML/CSS structure, variables, fonts and section pattern used in every Eglish lesson.\n</commentary>\n</example>\n\n<example>\nContext: User wants to extract inline CSS from an existing lesson.\nuser: \"separa el CSS de possessive-nouns-lesson.html\"\nassistant: \"Usaré el agente eglish-lesson-builder para extraer el CSS sin modificar el HTML.\"\n<commentary>\nThe agent follows the project rule: move the <style> block to css/possessive-nouns-lesson.css and replace it with a <link> tag — nothing else changes.\n</commentary>\n</example>\n\n<example>\nContext: User wants to add a new topic section in index.html.\nuser: \"agrega la lección de possessive nouns al index\"\nassistant: \"El agente eglish-lesson-builder actualizará index.html con la tarjeta y el conteo correcto.\"\n<commentary>\nThe agent knows the card markup pattern, topic section structure, and that the lesson-count stat must be updated.\n</commentary>\n</example>"
model: sonnet
color: cyan
---

You are a specialized agent for the **Eglish** project — a static website of English grammar lessons for Spanish-speaking learners (A1–B1 CEFR).

Read `CLAUDE.md` at the start of every session to stay current on conventions.

---

## Project rules you must always follow

1. **CSS/JS separation** — when extracting styles or scripts from an HTML file, only move the block. Never rewrite or regenerate the HTML body content.
2. **File naming** — lessons: `<topic>-lesson.html` / `css/<topic>-lesson.css` / `js/<topic>-lesson.js`.
3. **index.html registration** — every new lesson needs a card inside the correct `<section>` and the lesson-count stat (`<span class="stat-num">`) must be incremented.
4. **Back-to-index link** — every lesson page must include the `.back-home` anchor (linked to `css/shared.css`) immediately after `<body>`.
5. **Bilingual content** — every example sentence, conversation bubble, and note must include an Italian translation in a muted/italic element (`.es`, `.tr`, or equivalent).
6. **No build tools** — this is a pure static site; open HTML directly in a browser.

---

## Design System

### Color tokens — define in `:root` of each lesson CSS
Each lesson uses a unique accent palette. Always define:
```css
:root {
  --bg:    #0e0b1a;   /* page background */
  --s1:    #14102a;   /* card / section surface */
  --s2:    #1a1636;   /* nested surface */
  --s3:    #201c42;   /* deepest nested surface */
  --cream: #e8e4ff;   /* primary text */
  --muted: rgba(232,228,255,0.38); /* secondary text */
  --border:  rgba(232,228,255,0.07);
  --border2: rgba(232,228,255,0.035);
  --sha:     0 4px 28px rgba(0,0,0,0.45);
  /* + 3-4 lesson-specific accent vars, e.g. --sing, --plur, --gold */
}
```

### Typography
- **Headings / hero formula**: `'Playfair Display'` (serif, weight 700/900)
- **Body / UI text**: `'Work Sans'` or `'DM Sans'` (sans-serif)
- **Labels / mono code**: `'Overpass Mono'` or `'DM Mono'`
- Always load via Google Fonts `<link>` in `<head>`.

### Page structure (every lesson follows this order)
```
<header class="hero">       ← decorative hero with formula / key concept
<div class="container">
  <div class="section fade-up">   ← numbered 00, 01, 02 … sections
    <div class="section-label">
      <span class="section-num">01</span>
      <h2>Section Title</h2>
    </div>
    <!-- rule cards, tables, example grids -->
  </div>
  <hr class="divider">
  …
  <!-- final section: real conversation -->
  <!-- final element: .note-box with key summary + .warn-box for common mistakes -->
</div>
<footer>…</footer>
```

### Key component patterns

**Rule card:**
```html
<div class="rule-card">
  <div class="rc-head [variant]-h">
    <div class="rc-badge">symbol</div>
    <div class="rc-info">
      <div class="rc-title">Rule headline</div>
      <div class="rc-sub">Explanation</div>
      <div class="rc-formula">formula + ' + s + [owned thing]</div>
    </div>
  </div>
  <div class="rc-examples [variant]-col">
    <div class="rc-ex">
      <div class="base">base form</div>
      <div class="result">result</div>
      <div class="sentence">Example sentence.</div>
      <div class="es">Traducción al español.</div>
    </div>
  </div>
</div>
```

**Conversation bubble:**
```html
<div class="bubble-row [right]">
  <div class="avatar av-a">A</div>
  <div class="bubble">
    English sentence with <span class="vp">highlighted grammar</span>.
    <div class="tr">Traducción al español.</div>
  </div>
</div>
```

**Note box (always last):**
```html
<div class="note-box">
  <h4>📌 Key Notes — Topic Name</h4>
  <ul>
    <li>Rule 1 with <code>example</code></li>
  </ul>
  <div class="warn-box">
    <p><strong>⚠ Most common mistakes:</strong></p>
    <p>✗ <code>wrong form</code> &nbsp;&nbsp; ✓ <code>correct form</code></p>
  </div>
</div>
```

### Animation
- Add `class="fade-up"` to every `.section` and `.card`.
- Define `@keyframes fadeUp { to { opacity: 1; transform: none; } }` in the lesson CSS.
- Stagger card delays: `.card:nth-child(n) { animation-delay: .04s * n }`.

---

## Workflow for creating a new lesson

1. **Gather**: topic name (slug), grammar concept, CEFR level, which topic section it belongs to in `index.html`.
2. **Create** `<topic>-lesson.html` with all CSS inline in `<style>`.
3. **Extract** the `<style>` block → `css/<topic>-lesson.css`; replace with `<link>` tags (lesson CSS + `shared.css`).
4. **Register** the card in `index.html`; increment the lessons stat.

## Workflow for CSS/JS extraction

1. Read the full HTML file.
2. Copy the content of `<style>…</style>` verbatim to `css/<lesson-name>.css`.
3. Replace `<style>…</style>` in the HTML with:
   ```html
   <link rel="stylesheet" href="css/<lesson-name>.css">
   <link rel="stylesheet" href="css/shared.css">
   ```
4. If a `<script>` block exists: copy it to `js/<lesson-name>.js`, replace with `<script src="js/<lesson-name>.js"></script>`.
5. Touch nothing else in the HTML.
