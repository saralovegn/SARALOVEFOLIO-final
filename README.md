# SARALOVEFOLIO — Personal Portfolio Website

🔗 Live site:  
https://saralovegn.github.io/SARALOVEFOLIO-final/

---

# SARA LOVE — Graphic Design Portfolio

A personal portfolio website for my graphic design and illustration work, built using semantic HTML5, modular CSS, and vanilla JavaScript for the core structure and interactions. More complex features, such as the interactive hero section, required a deeper understanding of JavaScript and were developed with guidance and problem-solving support from Copilot.

## Project Overview

This is a single-page portfolio website with additional seperate project detail pages, designed to showcase visual design work with a modern, minimalist and space aesthetic. The site emphasizes interactivity through particle animations, smooth scrolling, and responsive design, while maintaining accessibility and performance best practices.

**Target Audience:** Potential clients, employers, and collaborators in graphic design and illustration.

**Academic Context:** Final project for Web Application and Design course (4th year, 1st semester).

---

## Project Goals

- Create a professional online presence for graphic design work
- Implement interactive visual effects that enhance but do not overwhelm content
- Ensure full responsiveness across mobile, tablet, and desktop devices
- Follow web accessibility standards (WCAG guidelines)
- Write clean, maintainable, and well-documented code using vanilla technologies
- Demonstrate understanding of modern CSS (custom properties, clamp(), grid/flexbox)
- Apply performance optimization techniques (IntersectionObserver, GPU-accelerated animations)

---

## Tech Stack

### Core Technologies
- **HTML5** — Semantic markup with ARIA labels and proper document structure
- **CSS3** — Modular stylesheets with custom properties, fluid typography, and modern layout techniques
- **Vanilla JavaScript (ES6+)** — No frameworks or libraries; uses modern browser APIs

### Key Browser APIs Used
- **IntersectionObserver API** — Scroll-triggered animations without scroll event listeners
- **Canvas API** — Particle network and floating particle effects
- **MatchMedia API** — `prefers-reduced-motion` media query support for accessibility

### External Resources
- **Google Fonts** — Zalando Sans Expanded (display), Helvetica Neue (body), Ubuntu Mono (monospace)
- **ImageKit CDN** — Image hosting and delivery
- **Custom favicon** — Heart icon (`<3`) representing brand identity

---

## Design System

### Color Palette
The portfolio uses a **pure black aesthetic** for a modern, gallery-like presentation:

- **Background:** `#000000` (pure black)
- **Text:** `#ffffff` (pure white) for maximum contrast
- **Muted Text:** `#cccccc` (light gray) for secondary content
- **Accent:** `#ffa1d0` (pink) — primary brand color
- **Accent Hover:** `#ff47a3` (bright pink)

### Typography
**Fluid typography** using `clamp()` for responsive scaling:

- **Display font:** Zalando Sans Expanded (headings, logo, hero text)
- **Body font:** Helvetica Neue (paragraphs, UI elements)
- **Monospace:** Ubuntu Mono (specific use cases)

Font sizes scale between mobile (320px) and desktop (1200px) viewports using fluid type scale from `0.75rem` (12px) to `4rem` (64px).

**Display headings** use increased letter-spacing (`0.08em`) and `font-optical-sizing: auto` for optimal rendering.

### Spacing System
Consistent spacing scale using CSS custom properties:
- `--space-xs` through `--space-2xl` (4px → 96px)
- All spacing values use `clamp()` for fluid scaling

### Layout Philosophy
- **Mobile-first responsive design** with breakpoints at 640px, 768px, and 1024px
- **CSS Grid and Flexbox** for layouts (no float-based layouts)
- **Pure black background** with high-contrast white text
- **Minimal visual distractions** — focus on showcasing visual work

---

## Key Features

### 1. Interactive Particle Network (Hero Section) - made possible thanks to copilot (final decisions taken by me)
- Canvas-based particle system with 80 particles (desktop) / 50 (mobile)
- Particles connected by lines when within proximity
- **Mouse interaction:** Particles repel from cursor within 150px radius
- Touch-enabled for mobile devices
- Respects `prefers-reduced-motion` setting

### 2. Global Floating Particles
- Subtle ambient particle effect across entire site
- 15-25 small particles with soft glow (1-3px radius)
- Low opacity (0.2-0.5) for non-intrusive effect
- Gentle random drift animation
- Fixed canvas behind all content (`z-index: 0`)

### 3. Scroll-Triggered Animations
- **IntersectionObserver-based** reveal animations (no scroll event listeners)
- Fade-in and slide-up effects on content
- Staggered animations for project cards
- CSS-driven transitions (GPU-accelerated `transform` and `opacity` only)
- Configurable trigger thresholds and root margins

### 4. Responsive Navigation
- Fixed header with blur backdrop effect
- Mobile hamburger menu (CSS + JavaScript toggle)
- Active section highlighting in navigation
- Smooth scrolling to anchor links
- Keyboard accessible with ARIA labels

### 5. Glassmorphism Project Cards
- Semi-transparent backgrounds with `backdrop-filter: blur()`
- Subtle border and multi-layer shadows
- Hover effects: lift (`translateY(-8px)`), scale, enhanced glow
- Image zoom on hover
- Tag badges with individual hover states
- 2-column responsive grid

### 6. Infinite Auto-Scrolling Carousel (Project Pages)
- Pure CSS implementation using `@keyframes`
- Image duplication for seamless infinite loop
- 30-second animation duration
- Responsive: 1 image (mobile), 2 (tablet), 3 (desktop)
- Pause on hover (desktop)
- Touch scrollable on mobile
- Respects `prefers-reduced-motion`

### 7. Custom 404 Page
- Animated error code with floating effect
- Heart symbol (`<3`) as decorative element
- Consistent dark theme styling
- Clear call-to-action button to return home

---

## Responsiveness and Accessibility

### Responsive Design
- **Mobile-first CSS architecture** — base styles target small screens, enhanced with `min-width` media queries
- **Fluid typography and spacing** — all text and spacing scales proportionally using `clamp()`
- **Flexible layouts** — CSS Grid and Flexbox adapt to viewport size
- **Responsive images** — `loading="lazy"` attribute for performance
- **Touch-optimized interactions** — particle effects support touch events

### Accessibility Features
- **Semantic HTML5** — proper heading hierarchy, landmarks (`<nav>`, `<main>`, `<footer>`)
- **ARIA labels and roles** — navigation menu, buttons, and decorative elements
- **Skip link** — keyboard users can skip to main content
- **`prefers-reduced-motion`** — animations disabled or simplified when user prefers reduced motion
- **Keyboard navigation** — all interactive elements accessible via keyboard
- **Focus states** — visible focus indicators with glow effects
- **Alt text** — descriptive alt attributes on all images
- **Color contrast** — pure black and white meet WCAG AAA standards

---

## Performance and Animation Strategy

### Performance Optimizations
1. **IntersectionObserver over scroll events** — animations trigger only when elements enter viewport, avoiding continuous scroll listeners
2. **GPU-accelerated animations** — only `transform` and `opacity` are animated (no layout/paint triggers)
3. **`will-change` property** — hints browser to optimize specific properties
4. **Canvas for particles** — hardware-accelerated rendering
5. **Lazy loading images** — `loading="lazy"` attribute on project images
6. **CSS containment** — isolated paint/layout boundaries where appropriate
7. **Unobserving after reveal** — IntersectionObserver stops watching elements after animation completes

### Animation Principles
- **Transform and opacity only** — no animating of width, height, margin, or color (triggers reflow/repaint)
- **Custom easing** — `cubic-bezier(0.22, 1, 0.36, 1)` for natural deceleration
- **Consistent timing** — `--duration-normal: 0.6s` used throughout
- **Staggered reveals** — CSS `transition-delay` for sequential animations
- **Reduced motion fallback** — static or simplified animations when `prefers-reduced-motion: reduce` is set

---

## Project Structure

saralovefolio-final/
├── index.html # Main portfolio page
├── project-1.html # MAD University project detail
├── project-2.html # Torres Blancas project detail
├── project-3.html # Mark Manson Book project detail
├── project-4.html # Jugos JUGOSA project detail
├── 404.html # Custom error page
├── README.md # This file
│
├── assets/
│ ├── css/
│ │ ├── index.css # Main CSS entry point (imports all modules)
│ │ ├── reset.css # CSS reset for cross-browser consistency
│ │ ├── theme.css # Design tokens (colors, typography, spacing)
│ │ ├── base.css # Base styles (body, headings, links)
│ │ ├── layout.css # Layout utilities (container, sections, grid)
│ │ ├── navigation.css # Header and navigation styles
│ │ ├── components.css # Component styles (legacy/combined file)
│ │ └── components/ # Modular component stylesheets
│ │ ├── about.css # About section
│ │ ├── animations.css # Scroll reveal animations
│ │ ├── buttons.css # Button styles and hover effects
│ │ ├── carousel.css # Infinite auto-scrolling carousel
│ │ ├── contact.css # Contact section
│ │ ├── footer.css # Footer and back-to-top button
│ │ ├── project-details.css # Project page layouts
│ │ └── projects.css # Project cards and grid
│ │
│ ├── js/
│ │ └── main.js # All JavaScript (scroll animations, particles, navigation)
│ │
│ └── favicon/
│ └── favicon.svg # Heart icon favicon (local copy)
│
└── docs/ # Project documentation (optional)
├── plan.md
├── project-brief.md
├── project-inspiration.md
└── project.yaml


---

## Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended for testing)

### Setup Instructions

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd saralovefolio-final
Open with a local server (recommended to avoid CORS issues with assets)

Option A: VS Code Live Server

Install the "Live Server" extension in VS Code
Right-click index.html → "Open with Live Server"

2. Open with a local server (recommended to avoid CORS issues with assets)

Option A: VS Code Live Server

Install the "Live Server" extension in VS Code
Right-click index.html → "Open with Live Server"

Option B: Python HTTP Server
python -m http.server 8000
# Navigate to http://localhost:8000

Option C: Node.js http-server
npx http-server
# Navigate to http://localhost:8080

3. Open directly in browser (simpler, but some features may not work)

Double-click index.html
Note: External resources (CDN images, fonts) require internet connection

# AI Usage Policy
This project was developed with the assistance of GitHub Copilot (powered by Claude Sonnet 4.5) as a learning and support tool. AI was used throughout the development process in the following ways:

How AI Was Used
Code Generation: Generating boilerplate HTML structure, CSS modules, and JavaScript functions
Problem Solving: Debugging issues, suggesting alternative implementations, and explaining browser APIs
Optimization: Refactoring code for performance, accessibility, and maintainability
Documentation: Writing inline comments, structuring this README, and explaining complex concepts
Learning Support: Explaining modern CSS techniques (clamp, custom properties, grid/flexbox), JavaScript APIs (IntersectionObserver, Canvas), and web standards
Educational Intent
AI served as an interactive tutor and pair programming partner, not as a replacement for understanding. All code was reviewed, tested, and understood before implementation. The learning objectives included:

Understanding modern CSS architecture and design systems
Mastering vanilla JavaScript and browser APIs
Implementing accessible and performant web animations
Writing clean, maintainable, and well-documented code
Authorship Statement
While AI assisted in code generation and learning, the creative direction, design decisions, content, and final implementation are the work of Sara Love Gancedo. The AI acted as a tool to accelerate development and deepen understanding, similar to using documentation, tutorials, or Stack Overflow, but with interactive guidance.

Transparency
This README honestly reflects the AI's role in the project. In an academic or professional context, this level of AI assistance is disclosed upfront to maintain transparency and integrity.

# Credits
Design & Development: Sara Love Gancedo
Course: Web Application and Design (4th Year, 1st Semester)
Institution: Universidad [Name]
Year: 2025

Technologies: HTML5, CSS3, Vanilla JavaScript
AI Assistant: GitHub Copilot (Claude Sonnet 4.5)
Image Hosting: ImageKit CDN
Fonts: Google Fonts (Zalando Sans Expanded, Helvetica, Ubuntu Mono)

# License
This project is an academic portfolio website. All visual design work showcased is © Sara Love Gancedo. Code may be referenced for educational purposes with attribution.

Portfolio URL: https://saralovegn.github.io/SARALOVEFOLIO-final/
GitHub: [github.com/saralovegn](https://github.com/saralovegn)
Instagram: [@slove_design](https://www.instagram.com/slove_design/?next=%2F)