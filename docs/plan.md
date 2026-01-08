# AI Planning Document — Portfolio Development

This document records the main questions, solutions, and learning outcomes during the development of the Sara Love graphic design portfolio. It reflects a collaborative process between independent coding work and AI assistance as a learning and problem-solving tool.

---

## Plan 1: Custom 404 Page Behavior on GitHub Pages

### Feature / Issue
Custom 404 page not displaying during local testing

### Context and Problem

While developing the portfolio, a custom `404.html` page was created and placed in the root of the project, as required by GitHub Pages.

During local testing in Visual Studio Code, intentionally entering an incorrect URL path did not display the custom 404 page. Instead, the browser showed the message:

> "404 — There isn't a GitHub Pages site here."

This behavior caused confusion about whether the 404 page was implemented correctly or if additional configuration was required.

### AI Prompt (Planning Phase)

> *How do I make my 404.html page appear correctly when using GitHub Pages?  
> I am working with VS Code and GitHub Pages. When I type an incorrect URL to test my custom 404 page, it does not appear. Instead, I get the message:  
> "404 — There isn't a GitHub Pages site here."*

### AI Response (Summary)

The AI explained that:

- GitHub Pages only serves the custom `404.html` page **after deployment**, not during local file-based testing
- Testing by typing random URLs locally does not trigger `404.html`
- The custom 404 page will appear only when:
  - The site is correctly deployed on GitHub Pages
  - The user navigates to a non-existent route **within the deployed domain**
- The `404.html` file must:
  - Be located at the root of the repository
  - Be named exactly `404.html`
- No additional configuration is required for static GitHub Pages sites

The AI also suggested testing the 404 page by visiting an invalid path directly on the deployed GitHub Pages URL.

### Implementation Notes

Based on this explanation:

- The `404.html` file was kept at the root level of the project
- I designed the error page with a floating heart symbol (`<3`) and a clear call-to-action button
- The styling was created to match the dark theme of the portfolio
- No JavaScript-based routing or redirection was added
- The behavior was verified by navigating to a non-existent URL on the deployed GitHub Pages site
- The issue was identified as a misunderstanding of local vs deployed behavior, not a configuration error

No additional code changes were required after confirming the correct deployment behavior.

### Learning Outcome

This process clarified the difference between:
- Local development environments
- Static hosting behavior on GitHub Pages

It also reinforced the importance of testing deployment-specific features directly on the live server rather than relying solely on local testing.

---

## Plan 2: Shine Animation on Button Hover

### Feature / Issue
Increase visual affordance of buttons with subtle hover animation

### Context and Problem

During the design phase of the portfolio, buttons were visually correct but felt static and easy to overlook.  
The goal was to add a subtle hover animation that would:

- Draw attention to clickable elements
- Suggest interactivity without being distracting
- Fit the dark-mode aesthetic of the website

A "shine" or light-sweep animation on hover was identified as a possible solution.

### AI Prompt (Planning Phase)

> *How can I create a subtle "shine" animation on button hover using CSS to encourage users to click?*

### AI Response (Summary)

The AI suggested:

- Using a `::before` or `::after` pseudo-element positioned absolutely inside the button
- Creating a diagonal or horizontal gradient that simulates a light reflection
- Animating the pseudo-element across the button on `:hover` using `transform` and `transition`
- Keeping the animation short and easing smooth to avoid distracting the user
- Ensuring the effect does not affect layout or text readability

The response emphasized using `overflow: hidden` on the button to contain the animation and avoid layout shifts.

### Implementation Notes

Based on the plan:

- I added a `::after` pseudo-element to the `.btn` component
- The shine effect uses a linear gradient with semi-transparent white
- Implemented using `transform: translateX()` with a `skewX(-20deg)` for a diagonal sweep
- The animation is triggered only on `:hover` with a 0.6s cubic-bezier easing
- I manually adjusted the animation duration and opacity to keep the effect subtle
- Tested against different background colors to ensure sufficient contrast and readability
- Applied the same effect to the back-to-top button for consistency

The final implementation was adapted and refined manually rather than copied directly.

### Learning Outcome

This process helped reinforce:

- The use of pseudo-elements for decorative effects without adding extra markup
- How small micro-interactions can improve perceived interactivity
- The importance of `overflow: hidden` to contain animated elements

The feature improved the clarity of interactive elements without negatively impacting performance or accessibility.

---

## Plan 3: Interactive Particle Mesh Effect (Hero Section)

### Feature / Issue
Create an interactive particle network background for the hero section

### Context and Problem

The hero section needed a dynamic, interactive background that would:
- Establish a modern, tech-forward aesthetic
- Engage users immediately upon landing
- Work across all devices (desktop and mobile)
- Not interfere with text readability
- Respond to user interaction (mouse movement)

### AI Prompt (Planning Phase)

> *Generate HTML, CSS, and JavaScript for a hero section with an interactive mesh/particle network effect.*
>
> *Requirements:*
> - *Particles are small dots connected by lines*
> - *Particles move slowly and randomly*
> - *Mouse interaction: nearby particles are attracted or repelled*
> - *Smooth animations at 60fps*
> - *Use a `<canvas>` element*
> - *Vanilla JavaScript (no libraries)*
> - *Responsive and mobile-first*

### AI Response (Summary)

The AI provided a Canvas-based particle system with:

- A `ParticleNetwork` class managing particle creation, animation, and rendering
- Particle objects with `x`, `y`, `vx`, `vy` properties for position and velocity
- Distance calculations between particles to draw connecting lines
- Mouse position tracking with a repulsion force applied to nearby particles
- `requestAnimationFrame` loop for smooth 60fps rendering
- Responsive canvas resizing on window resize
- Reduced particle count on mobile for performance

The implementation used object-oriented JavaScript with clear separation of concerns.

### Implementation Notes

I implemented this feature by:

- Adding a `<canvas id="particleCanvas">` element to the hero section HTML
- Creating the `ParticleNetwork` class in `main.js`
- Configuring 80 particles on desktop, 50 on mobile
- Setting particle connection distance to 120px with opacity fade based on distance
- Implementing mouse repulsion with a 150px radius
- Adding touch support for mobile devices using `touchmove` events
- Ensuring the canvas sits behind hero text with proper z-index (`z-index: 0`)
- Adding `prefers-reduced-motion` support to disable animations for accessibility
- Testing performance across devices and adjusting particle count as needed

The particle network now provides a dynamic, engaging background without impacting readability or performance.

### Learning Outcome

This project taught me:
- How to use the Canvas API for 2D graphics and animations
- The performance benefits of `requestAnimationFrame` over `setInterval`
- Object-oriented patterns in vanilla JavaScript
- How to calculate distances and apply physics-based interactions
- The importance of responsive considerations (fewer particles on mobile)
- Accessibility considerations for motion-heavy effects

---

## Plan 4: Global Floating Particles Effect

### Feature / Issue
Add subtle ambient floating particles across the entire website

### Context and Problem

After implementing the hero particle mesh, I wanted to extend a similar but more subtle effect throughout the site to create visual continuity. Requirements:

- Very subtle, non-intrusive particles
- Lower opacity than hero particles (0.2-0.5)
- Slow, gentle movement
- Fixed positioning so particles float across all sections
- Must not interfere with content readability
- Lightweight and performant

### AI Prompt (Planning Phase)

> *I want to add subtle floating particles across the entire website as a background effect.*
>
> *Requirements:*
> - *Particles must be small, soft, and elegant*
> - *Use the existing accent color (pink)*
> - *Particles float slowly with gentle random movement*
> - *Low opacity (0.2-0.5) so content remains the focus*
> - *Particles stay behind all content (z-index safe)*
> - *Visible across all sections*
> - *Lightweight and performant*
> - *Respect `prefers-reduced-motion`*

### AI Response (Summary)

The AI suggested:

- Create a fixed-position `<canvas>` element at the body level
- Use a new `GlobalFloatingParticles` class separate from the hero mesh
- Fewer particles (15-25) with smaller radius (1-3px)
- Very slow base speed (0.15px per frame)
- Apply `z-index: 0` and `pointer-events: none`
- Subtle opacity pulsing animation
- Reduce particle count on mobile for performance

### Implementation Notes

I implemented this by:

- Adding `<canvas id="globalParticles" class="global-particles-canvas">` to the body of all HTML pages
- Creating a `GlobalFloatingParticles` class in `main.js`
- Setting 20 particles on desktop, 15 on mobile
- Configuring particle radius to 1.5-2.5px (very small)
- Setting base opacity to 0.3 with subtle pulsing between 0.2-0.4
- Using slow drift speed (0.1px/frame, or 0.05px with reduced motion)
- Styling the canvas with `position: fixed`, `inset: 0`, `z-index: 0`
- Testing across all sections to ensure particles don't interfere with text

The floating particles create a calm, ambient atmosphere across the entire site.

### Learning Outcome

This taught me:
- How to create layered canvas effects (hero particles + global particles)
- The importance of restraint in background effects
- How `position: fixed` creates effects that span the entire viewport
- Performance considerations when running multiple canvas animations
- The value of consistent visual language throughout a site

---

## Summary: Learning and Collaboration

Throughout the development of this portfolio, AI assistance served as:

1. **A learning tool** for understanding modern web APIs (IntersectionObserver, Canvas, MatchMedia)
2. **A problem-solving partner** for debugging CSS stacking issues and layout problems
3. **A code generation accelerator** for boilerplate HTML/CSS structures
4. **An explanation resource** for complex concepts like fluid typography and glassmorphism

However, the **creative direction, design decisions, content, and final implementation** were my own work. I:

- Designed the visual identity and color palette
- Selected and curated all project images
- Made all UX decisions and carousel behavior, hover effects, some animations, favicon...etc.
- Manually adjusted CSS values for optimal appearance
- Tested and debugged across devices and browsers
- Wrote custom code adaptations rather than copying AI suggestions verbatim
- Organized the project structure and file architecture

This collaboration model allowed me to learn faster while maintaining full ownership and little by little understanding the codebase.

---

**Last Updated:** January 8, 2026  
**Project:** Sara Love Graphic Design Portfolio