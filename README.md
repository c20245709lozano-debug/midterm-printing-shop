# KCL Printing & Photocopy Shop

A responsive static website for KCL Printing & Photocopy Shop, created using HTML and Tailwind CSS v4 Browser CDN.

## Commit 1: Basic Static Website

This stage establishes the website's structure, layout, and visual identity.

### Features

- Responsive homepage layout
- Navigation links connected to page sections
- Hero section
- Services section
- About section
- Contact information section
- Footer
- Reusable Tailwind component classes
- Centralized pastel color design tokens

## Technologies Used

- HTML5
- Tailwind CSS v4 Browser CDN
- Custom CSS using Tailwind CSS directives

## Design Palette

The website uses a pastel color palette with a 60-30-10 distribution.

| Color | Hex Code | Usage |
|---|---|---|
| Pastel Blue | `#DCEBFA` | 60% - Main page background and primary sections |
| Pastel Pink | `#F8DDE8` | 30% - Secondary sections and visual grouping |
| Pastel Yellow | `#FFF0B8` | 10% - Accent elements and footer |
| Dark Blue | `#243B53` | Headings, buttons, and important text |

### Design Rationale

Pastel blue creates a calm and welcoming background. Pastel pink adds warmth and visual variety, while pastel yellow highlights important areas without overwhelming the design.

Dark blue is used for headings and important text to maintain readability against the lighter pastel backgrounds.

## Tailwind CSS Implementation

The project uses the Tailwind CSS v4 Browser CDN:

`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`

The `@theme` directive defines reusable color tokens.

The `@layer components` section contains reusable classes created with `@apply`, including:

- `.btn-primary`
- `.btn-secondary`
- `.content-card`
- `.section-title`

These classes help maintain a consistent design throughout the website.

## Accessibility and Responsiveness

- Semantic HTML sections and headings
- Descriptive navigation labels
- Responsive layouts for mobile, tablet, and desktop screens
- Dark text on light pastel backgrounds
- Readable button labels and link text

The main text color is `#34495E`, while the heading color is `#243B53`. Both are intended to provide strong contrast against the pastel backgrounds.

**Contrast verification:** Run the final foreground and background color combinations through the WebAIM Contrast Checker before submission. Record the measured ratios after testing. Do not treat the ratios as verified until the check is completed.

## JavaScript

The `script.js` file is intentionally reserved for the next development stage. No interactive JavaScript features are included in Commit 1.

## Project Structure

```text
Printing-and-Photocopy-Shop/
│
├── index.html
├── script.js
└── README.md
```

## Development Stage

**Current Stage:** Commit 1 - Basic Static Website

Future stages will introduce website interactions, dark mode, GSAP animations, and final refinements.
