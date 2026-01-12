# SARALOVEFOLIO — Personal Portfolio Website

🔗 Live site:  
https://saralovegn.github.io/SARALOVEFOLIO-final/

---

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
This project was developed with the assistance of GitHub Copilot, as a learning and support tool. AI was used throughout the development process in the following ways:

How AI Was Used
Code Generation: Generating boilerplate HTML structure, CSS modules, and JavaScript functions
Problem Solving: Debugging issues, suggesting alternative implementations, and explaining browser APIs
Optimization: Refactoring code for performance, accessibility, and maintainability
Learning Support: Explaining modern CSS techniques (clamp, custom properties, grid/flexbox), JavaScript APIs (IntersectionObserver, Canvas), and web standards
Educational Intent
AI served as an interactive tutor and pair programming partner, not as a replacement for understanding. All code was reviewed, tested, and somewhat understood before implementation. The learning objectives included:

- Understanding modern CSS architecture and design systems
- Mastering vanilla JavaScript and browser APIs
- Implementing accessible and performant web animations

While AI assisted in code generation and learning, the creative direction, design decisions, content, and final implementation are the work of Sara Love Gancedo. The AI acted as a tool to accelerate development and deepen understanding, similar to using documentation, tutorials, or Stack Overflow, but with interactive guidance.

Transparency
This README honestly reflects the AI's role in the project. In an academic or professional context, this level of AI assistance is disclosed upfront to maintain transparency and integrity.

# Credits
Design & Development: Sara Love Gancedo
Course: Web Application and Design (4th Year, 1st Semester)
Institution: UDIT
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



APUNTES TEORÍA PROGRAMACIÓN WEB 

¿Para qué sirve Visual Studio Code?
Visual Studio Code es el programa que utilizo para escribir y organizar el código de mi
portfolio. Es un editor de código que me permite trabajar con HTML, CSS y JavaScript de
forma ordenada, ver errores, usar extensiones y mantener todos los archivos del proyecto
bien estructurados.
¿Qué es HTML?
HTML es el lenguaje que se utiliza para estructurar una página web. En mi portfolio lo uso
para definir qué es cada cosa: títulos, párrafos, secciones, imágenes o enlaces. No da
estilo, solo orden y significado al contenido.
¿Qué es un IDE?
Un IDE es un Entorno de Desarrollo Integrado. Es un programa que reúne herramientas
para programar en un mismo sitio. Visual Studio Code funciona como un IDE porque me
permite escribir código, organizar archivos y depurar errores.
¿Para qué sirve GitHub?
GitHub sirve para guardar el proyecto en la nube y llevar control de versiones. En mi
portfolio lo uso para guardar el historial de cambios, trabajar de forma ordenada y poder
desplegar la web en GitHub Pages.
¿Qué son los elementos semánticos de HTML?
Son etiquetas que describen el contenido que envuelven. En mi web uso elementos como
header, nav, main, section, article y footer para que la estructura sea clara, accesible y
mejor entendida por buscadores.
¿Qué es index.html?
index.html es la página principal del proyecto. Es la primera que se carga cuando alguien
entra a mi portfolio y desde ella se accede al resto del contenido.
¿Qué es DOCTYPE?
DOCTYPE indica al navegador qué tipo de documento está leyendo. En mi web uso
HTML5 para asegurar compatibilidad con navegadores modernos.
¿Qué es una ruta absoluta y una relativa?
Una ruta absoluta apunta a una dirección completa. Una ruta relativa depende del archivo
desde el que se llama. En mi portfolio uso rutas relativas para enlazar imágenes, CSS y
JavaScript.
¿Qué es Mobile First?
Mobile First significa diseñar primero para móvil y luego adaptar a pantallas grandes. En
mi web empecé pensando en móvil y después añadí media queries para tablet y desktop.
¿Qué son las media queries?
Las media queries permiten cambiar el diseño según el tamaño de la pantalla. Las uso
para reorganizar grids, carruseles y tamaños de texto en móvil, tablet y escritorio.
¿Qué estrategias de maquetación usas?
Utilizo Flexbox y CSS Grid. Flexbox me sirve para alinear elementos en filas o columnas y
Grid para crear estructuras más complejas como las tarjetas de proyectos.
¿Qué es una SPA?
Una SPA es una web de una sola página. Mi portfolio funciona así: todo el contenido está
en un único HTML y se navega mediante anclas.
¿Qué es un favicon?
Un favicon es el pequeño icono que aparece en la pestaña del navegador. En mi web lo
añadí para reforzar la identidad visual.
¿Qué es refactorizar?
Refactorizar es mejorar el código por dentro sin cambiar lo que se ve por fuera. En mi
proyecto lo hice al reorganizar el CSS en archivos más claros.
¿Qué parte del proyecto te hace sentir más orgullosa?
Me siento especialmente orgullosa de las secciones de editorial, fotografía e ilustración,
donde combiné diseño visual, carruseles, responsive y animaciones manteniendo
coherencia estética.
¿Qué tipo de web es tu portfolio?
Es una web 1.0 porque muestra información y trabajos, pero no permite que el usuario
interactúe más allá de navegar y contactar.
¿Qué es un CDN?
Un CDN es una red de servidores que sirve recursos más rápido. En mi web uso CDNs
para cargar tipografías de Google Fonts.
¿Qué es Markdown?
Markdown es un lenguaje sencillo para escribir documentación. Lo utilizo en el README
y los archivos de planificación del proyecto.



APUNTES TEORÍA PROGRAMACIÓN WEB 2

1. ¿Qué es la Web?
La Web es una serie de recursos identificados mediante URI.
Un recurso puede ser:
● una página
● una imagen
● un vídeo
● un documento
● una sección concreta dentro de una página
Estructura de una dirección web
● URL:
Está formada por:
○ esquema (https)
○ host (github.io)
○ path (/portfolio/...)
● URI:
Incluye el URL y la parte específica del recurso:
○ lo que va después de #
○ identifica un recurso concreto dentro de una página
👉 Una página puede tener muchos recursos, cada uno con su URI.
Origen
● TCP/IP: 1969
● Web: 1989

2. Tipos de Web
Web 1.0
● Comunicación unidireccional
● Del servidor al usuario
● El usuario no interactúa

● No hay backend
● Es la web que estamos haciendo en clase
Web 2.0
● El usuario interactúa
● Puede crear contenido
● Formularios, comentarios, perfiles
● Necesita backend
Web 3.0
● Integración con servicios externos
● APIs, sistemas inteligentes, automatización
● Intervienen más agentes además del usuario y el servidor
👉 Nuestro proyecto es Web 1.0 porque:
● solo hacemos frontend
● no hay backend
● no se procesan formularios

3. Web Semántica
La web semántica es aquella cuya estructura da información sobre el contenido.
Esto permite:
● indexación semántica
● mejor posicionamiento
● mejor accesibilidad
Se consigue mediante:
● HTML semántico (header, nav, main, section, article, etc.)
● meta-etiquetas
● buena jerarquía de contenido

4. ¿Qué es una aplicación web?
Una aplicación web es una aplicación cliente-servidor que utiliza un navegador web
como cliente.
Funciona mediante:

● request (petición)
● response (respuesta)

5. Protocolo de comunicación
¿Qué protocolo sigue tu página web?
● HTTP / HTTPS
Diferencia entre HTTP y HTTPS
● HTTPS es HTTP cifrado
● Forma parte de la familia TCP/IP
● Aporta seguridad
Puerto
● HTTP → 80
● HTTPS → 443
👉 Nuestra web funciona en 443 porque usamos HTTPS (GitHub Pages).

6. Cliente – Servidor
● El cliente hace una request
● El servidor devuelve una response
● No hay comunicación directa sin protocolo

7. ¿Dónde está alojada nuestra web?
● En GitHub Pages
● GitHub actúa como servidor web
● No hay backend

8. Lenguajes que usamos en el proyecto
● HTML
● CSS

● JavaScript
● Markdown (MD) → README
HTML
● Lenguaje de marcación
● Usa elementos y atributos
● Tiene:
○ <head>
○ <body>

HTML5
● Versión moderna
● Se independizó de versiones anteriores
● Permite:
○ geolocalización
○ cámara
○ recursos avanzados
● Es el que usamos
CSS
● Usamos CSS3
● Controla el diseño visual
JavaScript
● Interactividad
● Lógica
● Animaciones

9. Git y control de versiones
Git:
● Sistema de control de versiones
● Guarda cambios
● Permite volver atrás
● Organiza versiones
GitHub:
● Aloja repositorios
● Permite despliegue
● Trabajo colaborativo

10. CDN (Content Delivery Network)
Un CDN es un tipo de servidor optimizado para distribuir contenido multimedia.
Ejemplo:
● ImageKit.io
Ventajas:
● mayor velocidad
● servidores distribuidos
● mejor rendimiento

11. APIs
Una API permite que distintos servicios de software se comuniquen.
Todas las máquinas necesitan APIs.
Ejemplos que usamos:
● Adobe Fonts
● ImageKit.io
Funcionamiento:
● hablamos con su API
● mediante HTTP
● nos devuelven recursos desde su CDN

12. Responsive Design (Responsabilidad)
El responsive no es automático, es responsabilidad del desarrollador.
Técnicas que usamos
Viewport
● Meta etiqueta obligatoria
● Sin viewport no hay responsive

Media Queries
● Adaptan el diseño a distintos tamaños
Clamp()
● Tamaños fluidos
● Escalan según el dispositivo
Grid y Flexbox
● Estructuración en filas y columnas
● Diseño adaptable

13. Media Queries
Sirven para:
● cambiar estilos según tamaño
● adaptar layout
● mejorar experiencia
👉 En el examen:
● qué son
● cómo las usas
● dónde las aplicas

14. Modales
Un modal es una ventana emergente que:
● aparece sin cambiar de página
● mantiene el contexto
Formas de implementar modales
CSS (:target)
● Tiene limitaciones
● No se puede cerrar con esc
● Pierde foco
JavaScript

● Más control
● Accesibilidad
● Bloqueo del fondo
● Cierre con esc
Nativo (dialog)
● Soporte del navegador
● Gestión automática del foco

15. GSAP
● Librería de JavaScript
● Animaciones
● Transiciones suaves
● Control avanzado del movimiento

16. Respuestas directas a TODAS las preguntas
¿Qué protocolo usa tu web?
Mi web utiliza HTTPS, que es la versión segura del protocolo HTTP.

Diferencia entre HTTP y HTTPS
HTTP transmite la información en texto plano, mientras que HTTPS cifra la comunicación,
haciendo la conexión segura. HTTPS forma parte de la familia de protocolos TCP/IP.

¿Qué es TCP/IP?
TCP/IP es el conjunto de protocolos que permite la comunicación entre dispositivos en
Internet. Es la base sobre la que funciona la Web y otros servicios de red.

¿En qué puerto funciona tu web?
Mi web funciona en el puerto 443, que es el puerto estándar del protocolo HTTPS.

Diferencia entre URL y URI
La URL indica la dirección de un recurso (esquema, host y path).
La URI identifica un recurso concreto, incluyendo fragmentos como lo que va después del
símbolo #.

¿Qué tipo de web estás haciendo?
Estoy haciendo una Web 1.0, ya que es una web unidireccional que va del servidor al
usuario y no permite interacción ni backend.

¿Por qué no es Web 2.0?
No es Web 2.0 porque el usuario no puede crear contenido ni interactuar con el servidor
mediante formularios o sistemas de autenticación. No existe backend.

¿Qué lenguajes usas?
Utilizo HTML, CSS, JavaScript y Markdown para la documentación (README).

¿Qué versión de HTML usas?
Utilizo HTML5, la versión más reciente del lenguaje de marcación, que permite
funcionalidades modernas como acceso a dispositivos y APIs del navegador.

¿Qué es una API?
Una API es una interfaz que permite la comunicación entre distintos servicios de software.
Permite solicitar y recibir datos o recursos de otros sistemas.

¿Qué es un CDN?
Un CDN es una red de servidores optimizada para distribuir contenido, especialmente
multimedia, de forma más rápida y eficiente. Un ejemplo es ImageKit.

¿Cómo haces responsive?
Hago responsive la web utilizando:
● meta viewport
● media queries
● tamaños fluidos con clamp
● sistemas de layout como Flexbox y Grid

¿Qué es viewport?
El viewport es la zona visible de la página en el navegador. Se define mediante una
meta-etiqueta y es imprescindible para que el diseño responsive funcione.

¿Qué son media queries?
Las media queries son reglas CSS que permiten aplicar estilos distintos según el tamaño o
las características del dispositivo.

¿Qué es clamp?
Clamp es una función de CSS que permite definir tamaños fluidos con un valor mínimo, uno
ideal y uno máximo, adaptándose al tamaño de pantalla.

¿Flexbox o Grid?
Uso ambos:
● Flexbox para alineación y elementos en una sola dimensión
● Grid para estructurar layouts en filas y columnas

¿Qué es un modal?
Un modal es una ventana emergente que aparece sobre la página sin cambiar de contexto y
bloquea la interacción con el fondo.

¿Cómo implementas modales?
Los modales se implementan principalmente con JavaScript, ya que permite un mayor
control, mejor accesibilidad y cierre mediante teclado.

¿Dónde está alojada tu web?
La web está alojada en GitHub Pages, que actúa como servidor web.

¿Qué es Git?
Git es un sistema de control de versiones que permite registrar, organizar y gestionar los
cambios realizados en un proyecto.

¿Para qué sirve GitHub?
GitHub sirve para alojar repositorios Git, colaborar en proyectos, gestionar versiones y
desplegar sitios web como GitHub Pages.
