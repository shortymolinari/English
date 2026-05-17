# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Eglish** — a static website of English grammar lessons (A1–B1 level) aimed at Spanish speakers. No build tools, no package manager, no server: open HTML files directly in a browser.

## Architecture

```
index.html                    ← landing page (links to all lessons)
*-lesson.html                 ← one file per lesson (17 total)
css/
  shared.css                  ← back-to-index button used by all lesson pages
  <lesson-name>.css           ← per-lesson styles
js/
  <lesson-name>.js            ← per-lesson scripts (only when interactivity exists)
```

Each lesson HTML links its own CSS and `shared.css`:
```html
<link rel="stylesheet" href="css/verb-to-be-lesson.css">
<link rel="stylesheet" href="css/shared.css">
```

Interactive lessons also reference a JS file via a `<script src="js/...">` tag at the bottom of `<body>`.

## Adding a New Lesson

1. Create `<topic>-lesson.html` with inline `<style>` in `<head>` while drafting.
2. Extract styles to `css/<topic>-lesson.css`, update the `<link>` tag, and add `<link rel="stylesheet" href="css/shared.css">`.
3. Add the back-to-index link at the top of `<body>` (see `shared.css` for the `.back-home` class).
4. Register the lesson card in `index.html` under the correct topic section.

**When extracting CSS or JS to separate files, move the content — do not rewrite or recreate the HTML.**

## Design System

Dark theme with a consistent CSS variable palette defined in each lesson's `:root`. Key conventions:
- `--bg` / `--s1` / `--s2` / `--s3` — background layers (darkest to lightest)
- `--cream` — primary text color; `--muted` — secondary/italics
- Accent colors vary per lesson (e.g. `--sing`, `--plur`, `--apos` for possessives)
- Google Fonts: **Playfair Display** (headings/hero), **DM Sans** or **Work Sans** (body), **DM Mono** or **Overpass Mono** (labels/code)
- Section structure: hero → numbered `.section` blocks → `.cards-grid` or tables → conversation → `.note-box`
- `.fade-up` animation class added to `.section` and `.card` elements

## Content Conventions

- All lessons are bilingual: English sentences paired with Spanish translations (italics, muted color).
- Lesson level tags follow CEFR notation: A1, A1–A2, A2, A2–B1, B1, A1–B1.
- The `index.html` hero stat for lesson count must be updated when adding lessons.
