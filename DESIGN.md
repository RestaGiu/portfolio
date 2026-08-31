---
name: Resta Giuliano Portfolio
description: A field notebook for clarifying complex product work
colors:
  paper: "#f5f2ea"
  ink: "#17221f"
  muted: "#5f6a65"
  line: "#cbd0c7"
  soft: "#e8ece4"
  evidence-green: "#0e604b"
  deep-green: "#102d27"
  white: "#fcfbf7"
typography:
  display:
    fontFamily: "Newsreader Variable, serif"
    fontSize: "clamp(3.45rem, 7vw, 7.35rem)"
    fontWeight: 430
    lineHeight: 0.88
    letterSpacing: "-0.06em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.1em"
spacing:
  compact: "16px"
  section: "clamp(96px, 13vw, 186px)"
components:
  button-primary:
    backgroundColor: "{colors.deep-green}"
    textColor: "{colors.white}"
    padding: "0 18px"
    height: "50px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 18px"
    height: "48px"
---

# Design System: Resta Giuliano Portfolio

## Overview

**Creative North Star: “The Clarifying Field Notebook”**

The portfolio reads like a senior designer's field notebook: large, direct editorial statements introduce the work, then precise project evidence does the persuasion. The visual system is warm and human without becoming decorative, and practical enough to carry dense B2B reasoning.

**Key Characteristics:**

- Editorial hierarchy with operational clarity
- Evidence green reserved for positioning and outcomes
- An asymmetrical, generous opening composition rather than a generic portfolio hero
- Deep-green visual stages for project evidence while real imagery is pending
- Pill-shaped controls and tags balanced by strict rules and editorial type

## Colors

Warm paper creates a calm reading surface. Deep green is reserved for project frames and primary actions; evidence green identifies outcomes, navigation states and decisive information.

**The Evidence Rule.** Evidence green is rare and meaningful; use it for outcomes, the thesis and decisive states, not general decoration.

## Typography

**Display Font:** Newsreader Variable
**Body Font:** Manrope Variable

Newsreader carries senior editorial authority; Manrope keeps dense product reasoning clean and contemporary. Display tracking never exceeds -0.04em, and body copy remains comfortably readable.

## Layout

The maximum shell is 1380px with 32px desktop gutters and 16px mobile gutters. The opening is a centered, text-led composition: navigation, proposition, actions and a full-width crowd scene anchored to the bottom of the hero. Project chapters use a text-first two-column grid with a sticky visual stage, then become a linear mobile reading flow. At 720px, the project index becomes a horizontal scroll rail and the hero crowd reduces to a compact bottom band.

## Elevation & Depth

The system is flat by default. Hairline dividers, tonal fields and sticky positioning create depth; shadows are intentionally absent. The only translucent layer is the sticky header, where blur clarifies separation from moving content.

## Shapes

Rules stay straight and precise, while buttons, tags and controls use fully rounded geometry. The animated crowd is a bounded hero-only scene, never an overlay over the proposition.

## Components

### Buttons

Primary actions are deep-green, 50px pills; secondary actions are transparent outlined pills. Hover lift is subtle, press feedback uses scale(.97), and focus uses a 2px evidence-green outline with 4px offset.

### Chips

Tags are non-interactive, compact uppercase pills with a one-pixel neutral border and no fill.

### Project Chapters

Selected work is presented as a five-project horizontal hover-expansion gallery. One project expands at a time to reveal company, case-study title, concise context, primary outcome and disciplines. Hover, tap, focus and left/right/Home/End keyboard controls all select a project; mobile turns the same pattern into an expanded vertical stack.

### Navigation

The 70px sticky header uses compact links and a circular RG mark. The project index is a five-column ruled strip on desktop, with a deep-green hover inversion, and a touch-scroll rail on mobile.

## Do's and Don'ts

### Do:

- **Do** move from identity to project evidence quickly.
- **Do** preserve the ruled editorial composition and restrained palette.
- **Do** keep metrics typographically dominant and descriptions concise.
- **Do** add project imagery through the structured content data and prepared public folders.

### Don't:

- **Don't** add gradients, glass cards, stock imagery or ornamental 3D effects.
- **Don't** turn project chapters into small repeated cards.
- **Don't** use evidence green as a general-purpose decoration.
- **Don't** add autoplay or motion that competes with reading.
