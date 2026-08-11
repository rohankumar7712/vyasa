document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       VYASA SITE INTERACTIONS
    ========================================================= */

    // ---------------------------------------------------------
    // 1. Update Navigation
    // ---------------------------------------------------------

    const prevBtn = document.querySelector(".nav-btn.prev");
    const nextBtn = document.querySelector(".nav-btn.next");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            console.log("Previous update clicked");
        });

        nextBtn.addEventListener("click", () => {
            console.log("Next update clicked");
        });
    }

    // ---------------------------------------------------------
    // 2. Mobile Navigation
    // ---------------------------------------------------------

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (menuBtn && navLinks && menuOverlay) {
        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuOverlay.classList.remove("active");
            menuBtn.classList.remove("active");
        };

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        menuOverlay.addEventListener("click", closeMenu);

        // Close menu when clicking a navigation link (except dropdown toggles)
        navLinks.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    // ---------------------------------------------------------
    // 3. Respect Reduced Motion
    // ---------------------------------------------------------

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        document.documentElement.classList.add("reduce-motion");
        return;
    }

    // ---------------------------------------------------------
    // 4. Section Reveal
    // ---------------------------------------------------------

    const revealSections = document.querySelectorAll(`
        section:not(.hero-section):not(.vis-hero-section):not(.pu-hero):not(.about-hero-section),
        .legacy-section,
        .features-section,
        .achievements-section,
        .milestones-section,
        .showcase-section,
        .resources-section,
        .alumni-section,
        .insights-section,
        .admissions-process-section,
        .campus-experience-section,
        .educators-section,
        .leadership-section,
        .academic-framework-section,
        .cohorts-section,
        .pedagogy-section,
        .care-section,
        .infra-section,
        .cocurricular-section,
        .campus-life-section,
        .admissions-section,
        .faq-section
    `);

    revealSections.forEach((section) => {
        section.classList.add("reveal", "reveal-up", "reveal-section");
    });

    // ---------------------------------------------------------
    // 5. Directional Reveals
    // ---------------------------------------------------------

    const revealLeftElements = document.querySelectorAll(`
        .v-timeline-item.left,
        .about-leadership-grid:not(.reverse) .leadership-image,
        .about-leadership-grid.reverse .leadership-content,
        .sr-image,
        .af-left-col,
        .pedagogy-quote-col,
        .admissions-cta-card,
        .gallery-img-large,
        .pu-stream-content > div:first-child,
        .pu-coaching-blue-card,
        .pu-stats-blue-card,
        .pu-admissions-guidelines
    `);

    revealLeftElements.forEach((element) => {
        element.classList.add("reveal", "reveal-left", "reveal-timeline");
    });

    const revealRightElements = document.querySelectorAll(`
        .v-timeline-item.right,
        .about-leadership-grid:not(.reverse) .leadership-content,
        .about-leadership-grid.reverse .leadership-image,
        .sr-content,
        .af-right-col,
        .pedagogy-cards-col,
        .admissions-steps,
        .gallery-img-medium,
        .pu-stream-content > div:last-child,
        .pu-coaching-light-card,
        .pu-board-toppers-wrapper
    `);

    revealRightElements.forEach((element) => {
        element.classList.add("reveal", "reveal-right", "reveal-timeline");
    });

    // ---------------------------------------------------------
    // 6. Section Headers
    // ---------------------------------------------------------

    const sectionHeaders = document.querySelectorAll(`
        .legacy-content,
        .features-header,
        .achievements-header,
        .showcase-header,
        .resources-header,
        .alumni-header,
        .af-header,
        .cohorts-header,
        .leadership-header,
        .pedagogy-header-split,
        .care-header-split,
        .infra-header-split,
        .cocurricular-header-split,
        .campus-header-split,
        .admissions-header-split,
        .faq-header-split,
        .pu-section-header,
        .pu-cta-card
    `);

    sectionHeaders.forEach((header) => {
        header.classList.add("reveal", "reveal-up", "reveal-heading");
    });

    // ---------------------------------------------------------
    // 7. Staggered Cards
    // ---------------------------------------------------------

    const staggerGroups = document.querySelectorAll(`
        .cards-container,
        .features-gallery,
        .achievements-grid,
        .showcase-grid,
        .alumni-grid,
        .insights-grid,
        .leadership-grid,
        .programs-grid,
        .facilities-grid,
        .values-grid,
        .pillars-grid,
        .team-grid,
        .advisory-grid,
        .awards-grid,
        .advantage-grid,
        .vm-grid,
        .careers-list,
        .contact-info,
        .chronology-timeline,
        .af-left-col,
        .cohorts-grid,
        .care-grid,
        .infra-grid,
        .cocurricular-grid,
        .faq-list,
        .admissions-steps,
        .pu-faculty-grid,
        .pu-labs-grid,
        .pu-placement-grid,
        .pu-faq-list,
        .pu-admissions-steps,
        .pu-board-topper-grid,
        .pu-topper-grid
    `);

    staggerGroups.forEach((group) => {
        const cards = group.querySelectorAll(`
            .pillar-card,
            .team-card,
            .advantage-card,
            .c-item,
            .job-card,
            .vm-card,
            .info-block,
            .card,
            .feature-card,
            .achievement-card,
            .af-card,
            .cohort-card,
            .leader-card,
            .care-card,
            .infra-card,
            .cocurricular-card,
            .gallery-img-small,
            .step-card,
            .faq-item,
            .pu-faculty-card,
            .pu-lab-card,
            .pu-placement-card,
            .pu-faq-item,
            .pu-step-card,
            .pu-board-topper-card,
            .pu-topper-card
        `);

        // Explicitly map rather than relying strictly on group.children
        const elementsToStagger = cards.length > 0 ? cards : group.children;

        Array.from(elementsToStagger).forEach((card, index) => {
            if (
                !card.classList.contains("reveal-left") &&
                !card.classList.contains("reveal-right")
            ) {
                card.classList.add("reveal", "reveal-up", "reveal-card");
            }

            const delay = Math.min(index * 250, 1000);
            card.style.setProperty("--reveal-delay", `${delay}ms`);
        });
    });

    // ---------------------------------------------------------
    // 8. Intersection Observer
    // ---------------------------------------------------------

    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    // Only remove the active class if the element exits from the bottom.
                    // This prevents a loop where removing the class resets the transform (moving it down),
                    // which causes it to re-enter the intersection area at the top of the viewport.
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove("active");
                    }
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    // 9. PU College FAQ Accordion
    const faqItems = document.querySelectorAll('.pu-faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.pu-faq-question-wrap');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {  
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');  
    dropdownToggles.forEach(toggle => {  
        toggle.addEventListener('click', (e) => {  
            if (window.innerWidth <= 1200) {
                if (e.target.classList.contains('dropdown-icon')) {
                    e.preventDefault();  
                    const parentLi = toggle.closest('.has-mega-menu');  
                    if (parentLi) {
                        parentLi.classList.toggle('active');
                    }
                }
            }  
        });  
    });  
});
