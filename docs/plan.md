# AI Planning Document — Plan 1

## Feature / Issue
Custom 404 page behavior on GitHub Pages

---

## Context and Problem

While developing the portfolio, a custom `404.html` page was created and placed in the root of the project, as required by GitHub Pages.

During local testing in Visual Studio Code, intentionally entering an incorrect URL path did not display the custom 404 page. Instead, the browser showed the message:

> “404 — There isn't a GitHub Pages site here.”

This behavior caused confusion about whether the 404 page was implemented correctly or if additional configuration was required.

---

## AI Prompt (Planning Phase)

**Prompt used:**

> *How do I make my 404.html page appear correctly when using GitHub Pages?  
> I am working with VS Code and GitHub Pages. When I type an incorrect URL to test my custom 404 page, it does not appear. Instead, I get the message:  
> “404 — There isn't a GitHub Pages site here.”*

---

## AI Response (Summary)

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

---

## Implementation Notes

Based on this explanation:

- The `404.html` file was kept at the root level of the project
- No JavaScript-based routing or redirection was added
- The behavior was verified by navigating to a non-existent URL on the deployed GitHub Pages site
- The issue was identified as a misunderstanding of local vs deployed behavior, not a configuration error

No additional code changes were required after confirming the correct deployment behavior.

---

## Learning Outcome

This process clarified the difference between:
- Local development environments
- Static hosting behavior on GitHub Pages

It also reinforced the importance of testing deployment-specific features directl

# AI Planning Document — Plan 2

## Feature
Shine animation on button hover to increase visual affordance

---

## Context and Goal

During the design phase of the portfolio, buttons were visually correct but felt static and easy to overlook.  
The goal was to add a subtle hover animation that would:

- Draw attention to clickable elements
- Suggest interactivity without being distracting
- Fit the dark-mode aesthetic of the website

A “shine” or light-sweep animation on hover was identified as a possible solution.

---

## AI Prompt (Planning Phase)

**Prompt used:**

> *How can I create a subtle “shine” animation on button hover using CSS to encourage users to click?  

---

## AI Response (Summary)

The AI suggested:

- Using a `::before` or `::after` pseudo-element positioned absolutely inside the button
- Creating a diagonal or horizontal gradient that simulates a light reflection
- Animating the pseudo-element across the button on `:hover` using `transform` and `transition`
- Keeping the animation short and easing smooth to avoid distracting the user
- Ensuring the effect does not affect layout or text readability

The response emphasized using `overflow: hidden` on the button to contain the animation and avoid layout shifts.

---

## Implementation Notes

Based on the plan:

- A pseudo-element was added to the button component
- The shine effect is implemented using a linear gradient and `transform: translateX()`
- The animation is triggered only on `:hover`
- The animation duration and opacity were adjusted manually to keep the effect subtle
- The effect was tested against different background colors to ensure sufficient contrast and readability

The final implementation was adapted and refined manually rather than copied directly.

---

## Learning Outcome

This process helped reinforce:

- The use of pseudo-elements for decorative effects without adding extra markup
- How small micro-interactions can improve perceived interactivity

The feature improved the clarity of interactive elements without negatively impacting performance or accessibility.
