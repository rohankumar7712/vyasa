/* =========================================================
   MAIN APPLICATION LOGIC (main.js)
========================================================= */

function initRevealAnimations() {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        document.documentElement.classList.add("reduce-motion");
        return;
    }

    // Prepare Sections (Reveal Up)
    const revealSections = document.querySelectorAll(`
        section:not(.hero-section):not(.vis-hero-section):not(.pu-hero):not(.about-hero-section),
        .legacy-section, .features-section, .achievements-section, .milestones-section,
        .showcase-section, .resources-section, .alumni-section, .insights-section,
        .admissions-process-section, .campus-experience-section, .educators-section,
        .leadership-section, .academic-framework-section, .cohorts-section,
        .pedagogy-section, .care-section, .infra-section, .cocurricular-section,
        .campus-life-section, .admissions-section, .faq-section
    `);
    
    if (revealSections.length > 0) {
        revealSections.forEach((section) => {
            section.classList.add("reveal", "reveal-up", "reveal-section");
        });
    }

    // Directional Reveals (Left)
    const revealLeftElements = document.querySelectorAll(`
        .v-timeline-item.left, .about-leadership-grid:not(.reverse) .leadership-image,
        .about-leadership-grid.reverse .leadership-content, .sr-image, .af-left-col,
        .pedagogy-quote-col, .admissions-cta-card, .gallery-img-large,
        .pu-stream-content > div:first-child, .pu-coaching-blue-card,
        .pu-stats-blue-card, .pu-admissions-guidelines
    `);

    if (revealLeftElements.length > 0) {
        revealLeftElements.forEach((element) => {
            element.classList.add("reveal", "reveal-left", "reveal-timeline");
        });
    }

    // Directional Reveals (Right)
    const revealRightElements = document.querySelectorAll(`
        .v-timeline-item.right, .about-leadership-grid:not(.reverse) .leadership-content,
        .about-leadership-grid.reverse .leadership-image, .sr-content, .af-right-col,
        .pedagogy-cards-col, .admissions-steps, .gallery-img-medium,
        .pu-stream-content > div:last-child, .pu-coaching-light-card,
        .pu-board-toppers-wrapper
    `);

    if (revealRightElements.length > 0) {
        revealRightElements.forEach((element) => {
            element.classList.add("reveal", "reveal-right", "reveal-timeline");
        });
    }

    // Section Headers (Reveal Up)
    const sectionHeaders = document.querySelectorAll(`
        .legacy-content, .features-header, .achievements-header, .showcase-header,
        .resources-header, .alumni-header, .af-header, .cohorts-header,
        .leadership-header, .pedagogy-header-split, .care-header-split,
        .infra-header-split, .cocurricular-header-split, .campus-header-split,
        .admissions-header-split, .faq-header-split, .pu-section-header, .pu-cta-card
    `);

    if (sectionHeaders.length > 0) {
        sectionHeaders.forEach((header) => {
            header.classList.add("reveal", "reveal-up", "reveal-heading");
        });
    }

    // Staggered Cards (Reveal Up with delays)
    const staggerGroups = document.querySelectorAll(`
        .cards-container, .features-gallery, .achievements-grid, .showcase-grid,
        .alumni-grid, .insights-grid, .leadership-grid, .programs-grid,
        .facilities-grid, .values-grid, .pillars-grid, .team-grid,
        .advisory-grid, .awards-grid, .advantage-grid, .vm-grid,
        .careers-list, .contact-info, .chronology-timeline, .af-left-col,
        .cohorts-grid, .care-grid, .infra-grid, .cocurricular-grid,
        .faq-list, .admissions-steps, .pu-faculty-grid, .pu-labs-grid,
        .pu-placement-grid, .pu-faq-list, .pu-admissions-steps,
        .pu-board-topper-grid, .pu-topper-grid
    `);

    if (staggerGroups.length > 0) {
        staggerGroups.forEach((group) => {
            const cards = group.querySelectorAll(`
                .pillar-card, .team-card, .advantage-card, .c-item, .job-card,
                .vm-card, .info-block, .card, .feature-card, .achievement-card,
                .af-card, .cohort-card, .leader-card, .care-card, .infra-card,
                .cocurricular-card, .gallery-img-small, .step-card, .faq-item,
                .pu-faculty-card, .pu-lab-card, .pu-placement-card, .pu-faq-item,
                .pu-step-card, .pu-board-topper-card, .pu-topper-card
            `);

            const elementsToStagger = cards.length > 0 ? cards : group.children;

            Array.from(elementsToStagger).forEach((card, index) => {
                if (!card.classList.contains("reveal-left") && !card.classList.contains("reveal-right")) {
                    card.classList.add("reveal", "reveal-up", "reveal-card");
                }
                const delay = Math.min(index * 250, 1000);
                card.style.setProperty("--reveal-delay", `${delay}ms`);
            });
        });
    }

    // Initialize Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove("active");
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

// ---------------------------------------------------------
// Application Initialization
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Initialize components if available
    if (window.VyasaComponents) {
        window.VyasaComponents.initMobileNavigation();
        window.VyasaComponents.initDropdowns();
        window.VyasaComponents.initAccordions();
        window.VyasaComponents.initNavigationTicker();
    }

    // Initialize core animations
    initRevealAnimations();
});
