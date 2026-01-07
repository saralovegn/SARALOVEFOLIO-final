# SARALOVEFOLIO — Personal Portfolio Website

🔗 Live site:  
https://saralovegn.github.io/SARALOVEFOLIO-final/

---

## Description

SARALOVEFOLIO is a personal portfolio website developed for the *Web Programming* course.  
The project showcases visual and editorial work through a dark-themed interface, scroll-based animations and individual project pages.

The main objective of this project is to demonstrate a solid understanding of semantic HTML, modern CSS architecture, vanilla JavaScript interactivity, responsive design and basic web accessibility principles, without relying on external frameworks or build tools.

The website is entirely written in English to target an international audience.

---

## Tech Stack

- **HTML5**
  - Semantic structure (`nav`, `main`, `section`, `article`, `footer`)
  - Accessibility features such as skip links and ARIA labels
- **CSS3**
  - CSS Custom Properties (design tokens)
  - Fluid typography using `clamp()`
  - Modular CSS architecture
  - Scroll-driven animations (CSS `scroll-timeline` with fallback)
  - `prefers-reduced-motion` support
- **JavaScript (Vanilla)**
  - IntersectionObserver API for scroll-triggered animations
  - Smooth scrolling with fixed navigation offset
  - Active navigation state tracking
- **Git & GitHub**
  - Version control
  - GitHub Pages deployment

No frameworks, preprocessors or build tools are used.

---

## Project Structure

/assets
/css
reset.css
theme.css
base.css
navigation.css
layout.css
components.css
index.css
/js
main.js
index.html
project-1.html
project-2.html
project-3.html
project-4.html


CSS is organized by responsibility (reset, theme, layout, components) to improve readability and maintainability.

---

## Features

- Dark-mode visual design using CSS variables
- Fully responsive layout
- Fixed navigation with active section highlighting
- Hero section with looping background video
- Scroll-based reveal animations
  - Single element reveals
  - Staggered animations for project grids
- Dedicated pages for individual projects
- Accessible navigation:
  - Skip-to-content link
  - Reduced motion support
  - Keyboard-friendly interactions
- Footer with back-to-top control and external links
- Custom 404 Page – Designed to maintain the site's look even when a user visits a broken link.  
- Hover Animations & Shine Effects** – Buttons and interactive elements respond visually to encourage engagement.  

---

## Animations & Performance

- Scroll animations are triggered using the **IntersectionObserver API**
- Visual effects are handled purely in CSS using `opacity` and `transform`
- No layout-affecting properties are animated
- CSS scroll-driven animations (`animation-timeline: scroll()`) are used when supported
- A fallback solution is provided for browsers without scroll-timeline support

This approach ensures smooth performance and avoids expensive scroll event listeners.

---

## Accessibility Considerations

- Semantic HTML elements throughout the layout
- Skip link for keyboard and screen reader users
- `prefers-reduced-motion` media query disables animations for users who request it
- All images include `alt` attributes
- Navigation links are accessible via keyboard

---

## Local Development

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/saralovegn/SARALOVEFOLIO-final.git
2. Open the project folder in Visual Studio Code

3. Launch index.html using a local server
(recommended: Live Server extension)

No additional dependencies or configuration are required.

## Customization Guide

Colors & theme
Edit CSS custom properties in assets/css/theme.css

Typography
Font families and fluid type scale are defined in theme.css

Layout spacing
Global spacing variables are defined using CSS custom properties

Projects content
Project cards and detail pages can be edited directly in their corresponding HTML files

Images & media
Replace external image URLs or add local assets as needed

## AI Usage Policy

AI tools (including GitHub Copilot and conversational AI assistants such as ChatGPT) were used as part of the learning and development process of this project, in accordance with the course guidelines.

AI assistance was primarily used for:
- Exploring and prototyping animation logic (CSS and JavaScript)
- Improving code readability and structure
- Understanding why certain animation or interaction techniques work better than others

In many cases, AI tools were used in an *interactive* way: code suggestions were generated, reviewed, modified and, when necessary, discarded. All AI-assisted changes were analyzed manually to understand their purpose and impact before being integrated into the project.

AI was not used as a replacement for decision-making or problem-solving, but as a support tool to accelerate experimentation and reinforce learning through review and iteration!

Where applicable, planning and conceptual guidance obtained from AI tools was documented following a two-phase workflow (planning → implementation), as required by the course.


## Credits

- Base template provided as a starting point thanks to the Web Programming course

- Google Fonts

- External media hosted via ImageKit
