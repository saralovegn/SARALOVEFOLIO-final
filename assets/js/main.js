/**
 * ==========================================================================
 * GRADE 1: VANILLA JAVASCRIPT PORTFOLIO DEMO
 * Scroll animations using IntersectionObserver
 * No frameworks, no dependencies — just modern JavaScript!
 * ==========================================================================
 *
 * 🎓 LEARNING OBJECTIVES:
 * - Understand the IntersectionObserver API for scroll-based triggers
 * - Learn why IntersectionObserver is better than scroll event listeners
 * - Implement accessible animations with prefers-reduced-motion
 * - Master the observer pattern for performant scroll detection
 *
 * 📚 WHAT IS INTERSECTIONOBSERVER?
 * IntersectionObserver is a browser API that efficiently detects when elements
 * enter or leave the viewport (or any ancestor element). It's the modern
 * replacement for scroll event listeners.
 *
 * ⚡ WHY NOT USE addEventListener('scroll', ...)?
 * - scroll events fire on EVERY PIXEL of scroll (60+ times per second!)
 * - This blocks the main thread and causes "jank" (stuttering)
 * - IntersectionObserver is optimized by the browser, runs asynchronously,
 *   and only fires when intersection state actually changes
 *
 * 🔗 MDN DOCS: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

// ==========================================================================
// 1. INTERSECTIONOBSERVER CONFIGURATION
// ==========================================================================

/**
 * Observer options control WHEN the callback fires.
 *
 * 📐 UNDERSTANDING THE OPTIONS:
 *
 * root: The element to use as the viewport for checking visibility.
 *       - null = browser viewport (most common)
 *       - element = custom scroll container
 *
 * rootMargin: Expands or shrinks the root's bounding box.
 *       - Format: "top right bottom left" (like CSS margin)
 *       - Negative values shrink the detection area
 *       - "0px 0px -10% 0px" means: trigger when element is 10% INTO the viewport
 *         (not at the very edge, which feels more natural)
 *
 * threshold: What percentage of the element must be visible to trigger.
 *       - 0 = trigger as soon as 1 pixel is visible
 *       - 0.1 = trigger when 10% is visible
 *       - 1.0 = trigger only when 100% visible
 *       - [0, 0.5, 1] = trigger at multiple thresholds
 */
const observerOptions = {
	root: null,                        // Use the browser viewport
	rootMargin: '0px 0px -10% 0px',    // Trigger 10% before fully visible
	threshold: 0.1,                     // Need 10% visibility to trigger
};

/**
 * CALLBACK: Single-element reveals
 *
 * This function is called by IntersectionObserver whenever an observed
 * element's intersection state changes.
 *
 * @param {IntersectionObserverEntry[]} entries - Array of intersection events
 * @param {IntersectionObserver} observer - The observer instance (for cleanup)
 *
 * 📐 WHAT'S IN AN ENTRY?
 * - entry.isIntersecting: boolean - is element currently visible?
 * - entry.intersectionRatio: number - how much is visible (0-1)
 * - entry.target: Element - the DOM element being observed
 * - entry.boundingClientRect: DOMRect - element's position/size
 */
const revealOnScroll = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Add class that triggers CSS transition (see style.css)
			entry.target.classList.add('visible');

			// 🎯 PERFORMANCE OPTIMIZATION: Stop observing after reveal
			// Once an element is revealed, we don't need to watch it anymore.
			// This reduces work for the observer and prevents re-triggering.
			observer.unobserve(entry.target);
		}
	});
};

/**
 * CALLBACK: Staggered container reveals
 *
 * Same pattern, but adds 'revealed' class to containers.
 * CSS handles the staggered animation of children via transition-delay.
 */
const revealStaggered = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target);
		}
	});
};

/**
 * CREATE OBSERVER INSTANCES
 *
 * We create two separate observers because they add different classes.
 * You could use one observer with logic to determine which class to add,
 * but separate observers are clearer and more maintainable.
 */
const singleObserver = new IntersectionObserver(revealOnScroll, observerOptions);
const staggerObserver = new IntersectionObserver(revealStaggered, observerOptions);

// ==========================================================================
// 2. INITIALIZE OBSERVERS
// ==========================================================================

/**
 * Main initialization function for scroll animations.
 *
 * 🎓 KEY CONCEPT: PROGRESSIVE ENHANCEMENT
 * We check for reduced motion FIRST, before setting up any animations.
 * This ensures users who need reduced motion get a good experience immediately.
 *
 * 📐 THE FLOW:
 * 1. Check if user prefers reduced motion
 * 2. If yes → make everything visible immediately, skip animations
 * 3. If no → set up observers to trigger animations on scroll
 */
function initScrollAnimations() {
	/**
	 * CHECK FOR REDUCED MOTION PREFERENCE
	 *
	 * window.matchMedia() is like CSS media queries, but in JavaScript!
	 * It returns a MediaQueryList object with a .matches boolean property.
	 *
	 * This respects the user's OS-level accessibility settings:
	 * - macOS: System Preferences → Accessibility → Display → Reduce motion
	 * - Windows: Settings → Ease of Access → Display → Show animations
	 * - iOS: Settings → Accessibility → Motion → Reduce Motion
	 *
	 * ⚠️ IMPORTANT: Always check this BEFORE initializing animations!
	 */
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	if (prefersReducedMotion) {
		/**
		 * GRACEFUL DEGRADATION FOR REDUCED MOTION
		 *
		 * Instead of animations, we immediately show all content.
		 * Users get the same information, just without the motion.
		 *
		 * This is NOT about removing features — it's about providing
		 * an equivalent experience for users who need it.
		 */
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			el.classList.add('visible');
		});
		document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
			el.classList.add('revealed');
		});
		return; // Exit early — no observers needed
	}

	/**
	 * OBSERVE ELEMENTS FOR SCROLL-TRIGGERED ANIMATIONS
	 *
	 * querySelectorAll returns a NodeList (array-like).
	 * forEach loops through each element and tells the observer to watch it.
	 *
	 * Once observed, the callback (revealOnScroll) will fire when the
	 * element enters the viewport according to our observerOptions.
	 */

	// Single element reveals (e.g., headings, paragraphs)
	document.querySelectorAll('.animate-on-scroll').forEach((el) => {
		singleObserver.observe(el);
	});

	// Staggered container reveals (e.g., skill grids, project cards)
	document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
		staggerObserver.observe(el);
	});
}

// ==========================================================================
// 3. SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================================================

/**
 * Enhanced smooth scrolling for in-page navigation.
 *
 * 🎓 WHY NOT JUST USE CSS scroll-behavior: smooth?
 * CSS smooth scrolling works great, but it has limitations:
 * 1. Can't account for fixed header height
 * 2. Can't update URL without page jump
 * 3. Less control over timing/easing
 *
 * This JavaScript approach gives us full control while still being simple.
 *
 * 📐 THE PATTERN:
 * 1. Find all links starting with "#" (anchor links)
 * 2. On click, prevent default jump behavior
 * 3. Calculate target position accounting for fixed nav height
 * 4. Smoothly scroll to that position
 * 5. Update URL for bookmarking/sharing
 */
function initSmoothScroll() {
	// Select all anchor links (href starts with "#")
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			const targetId = anchor.getAttribute('href');

			// Ignore links that are just "#" (often used for JavaScript triggers)
			if (targetId === '#') return;

			const target = document.querySelector(targetId);
			if (target) {
				// Prevent the default "jump to anchor" behavior
				e.preventDefault();

				/**
				 * CALCULATE SCROLL POSITION
				 *
				 * We need to account for the fixed navigation bar, otherwise
				 * the target would be hidden behind it.
				 *
				 * getBoundingClientRect().top = distance from viewport top
				 * window.scrollY = how far page is already scrolled
				 * navHeight = height of fixed nav to offset
				 */
				const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
				const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

				/**
				 * SCROLL WITH SMOOTH BEHAVIOR
				 *
				 * window.scrollTo() with behavior: 'smooth' animates the scroll.
				 * This is supported in all modern browsers.
				 *
				 * Note: CSS scroll-behavior: smooth on <html> provides a fallback
				 * for browsers where this JS might fail.
				 */
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				});

				/**
				 * UPDATE URL WITHOUT PAGE RELOAD
				 *
				 * history.pushState() changes the URL in the address bar
				 * without triggering a page reload or scroll jump.
				 *
				 * This means:
				 * - Users can bookmark specific sections
				 * - Sharing the URL goes to the right section
				 * - Back button works as expected
				 */
				history.pushState(null, '', targetId);
			}
		});
	});
}

// ==========================================================================
// 4. ACTIVE NAVIGATION STATE
// ==========================================================================

/**
 * Highlight the nav link corresponding to the currently visible section.
 *
 * 🎓 UX PRINCIPLE: LOCATION AWARENESS
 * Users should always know where they are in the page. Highlighting the
 * active nav link provides this feedback without requiring user action.
 *
 * 📐 THE APPROACH:
 * We use IntersectionObserver again! But with different rootMargin settings
 * that define a "detection zone" in the middle of the viewport.
 *
 * rootMargin: '-50% 0px -50% 0px' means:
 * - Shrink the detection area by 50% from top AND bottom
 * - This creates a narrow band in the middle of the viewport
 * - Only the section crossing this band is considered "active"
 */
function initActiveNav() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-links a');

	const observerOptions = {
		root: null,
		rootMargin: '-50% 0px -50% 0px',  // Detect section in middle of viewport
		threshold: 0,                      // Trigger as soon as ANY part enters
	};

	/**
	 * NAV HIGHLIGHT OBSERVER
	 *
	 * When a section enters our detection zone (middle of viewport),
	 * we find the corresponding nav link and highlight it.
	 */
	const navObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id');

				// Update all nav links: highlight matching, reset others
				navLinks.forEach((link) => {
					link.style.color = link.getAttribute('href') === `#${id}`
						? 'var(--color-accent)'  // Highlighted color
						: '';                     // Reset to default (inherits from CSS)
				});
			}
		});
	}, observerOptions);

	// Observe all sections with IDs
	sections.forEach((section) => navObserver.observe(section));
}

// ==========================================================================
// 5. INITIALIZATION
// ==========================================================================

/**
 * DOMContentLoaded: The safe time to run DOM-manipulating JavaScript.
 *
 * 🎓 WHY DOMContentLoaded?
 * - Fires when HTML is fully parsed (DOM is ready)
 * - Doesn't wait for images/stylesheets to load (that's 'load' event)
 * - Safe to query and manipulate DOM elements
 *
 * If your script is in <head> without 'defer', this is essential.
 * If your script is at end of <body> or has 'defer', it's optional but good practice.
 */
document.addEventListener('DOMContentLoaded', () => {
	initScrollAnimations();
	initSmoothScroll();
	initActiveNav();

	// Initialize mobile hamburger navigation
	initMobileNav();

	console.log('🚀 Grade 1 Demo: Vanilla scroll animations initialized');
});

// ==========================================================================
// 6. MOBILE NAVIGATION (HAMBURGER)
// ==========================================================================
function initMobileNav() {
	const nav = document.querySelector('.nav');
	const toggle = document.querySelector('.nav-toggle');
	const menu = document.getElementById('primary-navigation');

	if (!toggle || !menu || !nav) return;

	// Toggle menu open/closed
	const setOpen = (open) => {
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		if (open) {
			nav.classList.add('nav-open');
			menu.classList.add('open');
		} else {
			nav.classList.remove('nav-open');
			menu.classList.remove('open');
		}
	};

	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		setOpen(!expanded);
	});

	// Close when a menu link is clicked (mobile behavior)
	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => setOpen(false));
	});

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') setOpen(false);
	});

	// Close the menu when clicking outside (optional but user-friendly)
	document.addEventListener('click', (e) => {
		if (!nav.contains(e.target) && toggle.getAttribute('aria-expanded') === 'true') {
			setOpen(false);
		}
	});
}

// ==========================================================================
// 6. CLEANUP (FOR SPA ENVIRONMENTS)
// ==========================================================================

/**
 * Cleanup function for Single Page Application (SPA) routing.
 *
 * 🎓 WHY IS CLEANUP IMPORTANT?
 * In SPAs (React, Vue, etc.), pages don't fully reload when navigating.
 * If you don't disconnect observers, they keep watching elements that
 * may have been removed, causing memory leaks and bugs.
 *
 * 📐 WHEN TO CALL THIS:
 * - Before navigating away from this page in an SPA
 * - In React: useEffect cleanup function
 * - In Vue: onUnmounted lifecycle hook
 *
 * For traditional multi-page sites, this isn't needed (page reload cleans up).
 */
window.cleanupScrollObservers = () => {
	singleObserver.disconnect();  // Stop observing all elements
	staggerObserver.disconnect();
};

/* --------------------------------------------------------------------------
   CONTACT PARALLAX VIDEO (ACCESSIBLE)
   -------------------------------------------------------------------------- */

const contactSection = document.querySelector('.contact-parallax');
const contactVideo = document.querySelector('.contact-video');

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (contactSection && contactVideo && !prefersReducedMotion.matches) {
	const speed = 0.3; // lower = slower movement

	window.addEventListener('scroll', () => {
		const rect = contactSection.getBoundingClientRect();
		const offset = rect.top * speed;

		contactVideo.style.transform = `translateY(${offset}px)`;
	});
}

// ==========================================================================
// PARTICLE NETWORK MESH EFFECT
// Interactive particle system with mouse interaction
// ==========================================================================

class ParticleNetwork {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;
		
		this.ctx = this.canvas.getContext('2d');
		this.particles = [];
		this.mouse = { x: null, y: null, radius: 150 };
		this.animationId = null;
		
		// Configuration
		this.config = {
			particleCount: window.innerWidth < 768 ? 50 : 80,
			particleSize: 2,
			particleSpeed: 0.5,
			connectionDistance: 150,
			mouseInfluence: 100,
			particleColor: 'rgba(255, 163, 206, 0.8)',
			lineColor: 'rgba(255, 163, 206, 0.3)',
			lineWidth: 1
		};
		
		this.init();
	}
	
	init() {
		this.resizeCanvas();
		this.createParticles();
		this.setupEventListeners();
		this.animate();
	}
	
	resizeCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
	createParticles() {
		this.particles = [];
		for (let i = 0; i < this.config.particleCount; i++) {
			this.particles.push({
				x: Math.random() * this.canvas.width,
				y: Math.random() * this.canvas.height,
				vx: (Math.random() - 0.5) * this.config.particleSpeed,
				vy: (Math.random() - 0.5) * this.config.particleSpeed,
				radius: this.config.particleSize
			});
		}
	}
	
	setupEventListeners() {
		// Mouse move
		this.canvas.addEventListener('mousemove', (e) => {
			const rect = this.canvas.getBoundingClientRect();
			this.mouse.x = e.clientX - rect.left;
			this.mouse.y = e.clientY - rect.top;
		});
		
		// Mouse leave
		this.canvas.addEventListener('mouseleave', () => {
			this.mouse.x = null;
			this.mouse.y = null;
		});
		
		// Touch support
		this.canvas.addEventListener('touchmove', (e) => {
			e.preventDefault();
			const rect = this.canvas.getBoundingClientRect();
			const touch = e.touches[0];
			this.mouse.x = touch.clientX - rect.left;
			this.mouse.y = touch.clientY - rect.top;
		});
		
		this.canvas.addEventListener('touchend', () => {
			this.mouse.x = null;
			this.mouse.y = null;
		});
		
		// Resize
		const resizeHandler = () => {
			this.resizeCanvas();
			this.config.particleCount = window.innerWidth < 768 ? 50 : 80;
			this.createParticles();
		};
		
		window.addEventListener('resize', resizeHandler);
	}
	
	updateParticles() {
		this.particles.forEach(particle => {
			// Mouse interaction - repel particles
			if (this.mouse.x !== null && this.mouse.y !== null) {
				const dx = particle.x - this.mouse.x;
				const dy = particle.y - this.mouse.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < this.mouse.radius) {
					const force = (this.mouse.radius - distance) / this.mouse.radius;
					const angle = Math.atan2(dy, dx);
					particle.vx += Math.cos(angle) * force * 0.5;
					particle.vy += Math.sin(angle) * force * 0.5;
				}
			}
			
			// Move particles
			particle.x += particle.vx;
			particle.y += particle.vy;
			
			// Damping
			particle.vx *= 0.99;
			particle.vy *= 0.99;
			
			// Keep minimum speed
			const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
			if (speed < 0.1) {
				particle.vx += (Math.random() - 0.5) * 0.1;
				particle.vy += (Math.random() - 0.5) * 0.1;
			}
			
			// Boundary bounce
			if (particle.x < 0 || particle.x > this.canvas.width) {
				particle.vx *= -1;
				particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
			}
			if (particle.y < 0 || particle.y > this.canvas.height) {
				particle.vy *= -1;
				particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
			}
		});
	}
	
	drawParticles() {
		// Draw connections
		this.ctx.strokeStyle = this.config.lineColor;
		this.ctx.lineWidth = this.config.lineWidth;
		
		for (let i = 0; i < this.particles.length; i++) {
			for (let j = i + 1; j < this.particles.length; j++) {
				const dx = this.particles[i].x - this.particles[j].x;
				const dy = this.particles[i].y - this.particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < this.config.connectionDistance) {
					// Fade based on distance
					const opacity = 1 - (distance / this.config.connectionDistance);
					this.ctx.strokeStyle = `rgba(255, 163, 206, ${opacity * 0.3})`;
					
					this.ctx.beginPath();
					this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
					this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
					this.ctx.stroke();
				}
			}
		}
		
		// Draw particles
		this.ctx.fillStyle = this.config.particleColor;
		this.particles.forEach(particle => {
			this.ctx.beginPath();
			this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
			this.ctx.fill();
		});
		
		// Draw mouse influence circle (optional visual feedback)
		if (this.mouse.x !== null && this.mouse.y !== null) {
			this.ctx.strokeStyle = 'rgba(255, 163, 206, 0.1)';
			this.ctx.lineWidth = 1;
			this.ctx.beginPath();
			this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
			this.ctx.stroke();
		}
	}
	
	animate() {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			// Draw static particles only
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawParticles();
			return;
		}
		
		// Clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Update and draw
		this.updateParticles();
		this.drawParticles();
		
		// Continue animation
		this.animationId = requestAnimationFrame(() => this.animate());
	}
	
	destroy() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
		}
	}
}

// Initialize particle network
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
	const particleNetwork = new ParticleNetwork('particleCanvas');
}

// Initialize subtle particle backgrounds for sections
document.addEventListener('DOMContentLoaded', () => {
	const sectionParticles = document.querySelectorAll('.section-particles');
	
	sectionParticles.forEach(canvas => {
		const sectionName = canvas.dataset.section;
		// Create lighter particle effect for sections
		const ctx = canvas.getContext('2d');
		const particles = [];
		const particleCount = window.innerWidth < 768 ? 20 : 30;
		
		// Set canvas size
		function resizeCanvas() {
			canvas.width = canvas.parentElement.offsetWidth;
			canvas.height = canvas.parentElement.offsetHeight;
		}
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		
		// Create particles
		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				radius: 1.5
			});
		}
		
		// Animate particles
		function animate() {
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReducedMotion) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawParticles();
				return;
			}
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			// Update and draw
			particles.forEach(particle => {
				particle.x += particle.vx;
				particle.y += particle.vy;
				
				if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
				if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
			});
			
			drawParticles();
			requestAnimationFrame(animate);
		}
		
		function drawParticles() {
			// Draw connections (lighter than hero)
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					
					if (distance < 120) {
						const opacity = (1 - distance / 120) * 0.15;
						ctx.strokeStyle = `rgba(255, 163, 206, ${opacity})`;
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}
			
			// Draw particles (lighter)
			ctx.fillStyle = 'rgba(255, 163, 206, 0.4)';
			particles.forEach(particle => {
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
				ctx.fill();
			});
		}
		
		animate();
	});
});

/* ==========================================================================
   GLOBAL FLOATING PARTICLES EFFECT
   
   Subtle ambient background particles that float across the entire website.
   Designed to be minimal, elegant, and non-intrusive.
   
   Features:
   - Soft, slow-moving particles with gentle random drift
   - Uses brand accent color (pink) at low opacity
   - Respects prefers-reduced-motion
   - Lightweight and performant
   - Fixed global canvas behind all content
   ========================================================================== */

class GlobalFloatingParticles {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;
		
		this.ctx = this.canvas.getContext('2d');
		this.particles = [];
		this.animationId = null;
		
		// Check for reduced motion preference
		this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		
		// Configuration
		this.config = {
			particleCount: window.innerWidth < 768 ? 15 : 25, // Fewer on mobile
			minRadius: 1,
			maxRadius: 3,
			minOpacity: 0.2,
			maxOpacity: 0.5,
			baseSpeed: this.reducedMotion ? 0.05 : 0.15, // Very slow drift
			color: '255, 163, 206' // RGB for pink accent
		};
		
		this.init();
	}
	
	init() {
		this.resize();
		this.createParticles();
		
		// Handle window resize
		window.addEventListener('resize', () => {
			this.resize();
			// Adjust particle count on resize
			const newCount = window.innerWidth < 768 ? 15 : 25;
			if (newCount !== this.config.particleCount) {
				this.config.particleCount = newCount;
				this.createParticles();
			}
		});
		
		// Listen for motion preference changes
		window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
			this.reducedMotion = e.matches;
			this.config.baseSpeed = this.reducedMotion ? 0.05 : 0.15;
		});
		
		this.animate();
	}
	
	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
	createParticles() {
		this.particles = [];
		
		for (let i = 0; i < this.config.particleCount; i++) {
			this.particles.push({
				x: Math.random() * this.canvas.width,
				y: Math.random() * this.canvas.height,
				radius: this.config.minRadius + Math.random() * (this.config.maxRadius - this.config.minRadius),
				opacity: this.config.minOpacity + Math.random() * (this.config.maxOpacity - this.config.minOpacity),
				// Very gentle velocity for slow floating
				vx: (Math.random() - 0.5) * this.config.baseSpeed,
				vy: (Math.random() - 0.5) * this.config.baseSpeed,
				// Slight pulsing effect
				pulseSpeed: 0.001 + Math.random() * 0.002,
				pulsePhase: Math.random() * Math.PI * 2
			});
		}
	}
	
	updateParticles() {
		this.particles.forEach(particle => {
			// Update position with slow drift
			particle.x += particle.vx;
			particle.y += particle.vy;
			
			// Subtle pulsing opacity (very gentle)
			particle.pulsePhase += particle.pulseSpeed;
			const pulseFactor = Math.sin(particle.pulsePhase) * 0.1 + 1; // 0.9 to 1.1
			
			// Wrap around screen edges
			if (particle.x < -10) particle.x = this.canvas.width + 10;
			if (particle.x > this.canvas.width + 10) particle.x = -10;
			if (particle.y < -10) particle.y = this.canvas.height + 10;
			if (particle.y > this.canvas.height + 10) particle.y = -10;
			
			// Store adjusted opacity for rendering
			particle.currentOpacity = Math.min(this.config.maxOpacity, particle.opacity * pulseFactor);
		});
	}
	
	draw() {
		// Clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Draw particles
		this.particles.forEach(particle => {
			this.ctx.beginPath();
			this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
			this.ctx.fillStyle = `rgba(${this.config.color}, ${particle.currentOpacity})`;
			this.ctx.fill();
			
			// Optional: very subtle glow
			this.ctx.shadowBlur = 8;
			this.ctx.shadowColor = `rgba(${this.config.color}, ${particle.currentOpacity * 0.5})`;
			this.ctx.fill();
			this.ctx.shadowBlur = 0; // Reset shadow
		});
	}
	
	animate() {
		// Skip animation if reduced motion is preferred
		if (this.reducedMotion) {
			// Still draw particles, just don't animate them
			this.draw();
			return;
		}
		
		this.updateParticles();
		this.draw();
		
		this.animationId = requestAnimationFrame(() => this.animate());
	}
}

// Initialize global floating particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	const globalParticles = new GlobalFloatingParticles('globalParticles');
});

/* ==========================================================================
   LIGHTBOX GALLERY
   
   Click-to-view image gallery with navigation arrows and close button.
   Allows users to view project images at full size with keyboard navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
	const lightbox = document.getElementById('lightbox');
	if (!lightbox) return; // Exit if lightbox doesn't exist on this page
	
	const lightboxImage = lightbox.querySelector('.lightbox-image');
	const closeBtn = lightbox.querySelector('.lightbox-close');
	const prevBtn = lightbox.querySelector('.lightbox-prev');
	const nextBtn = lightbox.querySelector('.lightbox-next');
	const galleryImages = document.querySelectorAll('.gallery-image');
	
	if (galleryImages.length === 0) return;
	
	let currentIndex = 0;
	const images = Array.from(galleryImages).map(img => ({
		src: img.src,
		alt: img.alt
	}));
	
	// Open lightbox
	function openLightbox(index) {
		currentIndex = index;
		lightboxImage.src = images[currentIndex].src;
		lightboxImage.alt = images[currentIndex].alt;
		lightbox.classList.add('active');
		lightbox.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}
	
	// Close lightbox
	function closeLightbox() {
		lightbox.classList.remove('active');
		lightbox.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = ''; // Restore scrolling
	}
	
	// Show previous image
	function showPrevious() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		lightboxImage.src = images[currentIndex].src;
		lightboxImage.alt = images[currentIndex].alt;
	}
	
	// Show next image
	function showNext() {
		currentIndex = (currentIndex + 1) % images.length;
		lightboxImage.src = images[currentIndex].src;
		lightboxImage.alt = images[currentIndex].alt;
	}
	
	// Event listeners for gallery images
	galleryImages.forEach((img, index) => {
		img.addEventListener('click', () => openLightbox(index));
		img.style.cursor = 'pointer';
	});
	
	// Close button
	closeBtn.addEventListener('click', closeLightbox);
	
	// Navigation buttons
	prevBtn.addEventListener('click', showPrevious);
	nextBtn.addEventListener('click', showNext);
	
	// Close on background click
	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});
	
	// Keyboard navigation
	document.addEventListener('keydown', (e) => {
		if (!lightbox.classList.contains('active')) return;
		
		switch(e.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				showPrevious();
				break;
			case 'ArrowRight':
				showNext();
				break;
		}
	});
});
