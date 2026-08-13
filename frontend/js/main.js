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
        section:not([class*="hero"]),
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

    // Sticky Navbar Logic
    window.addEventListener('scroll', () => {
        const navbars = document.querySelectorAll('.navbar');
        navbars.forEach(navbar => {
            if (window.scrollY > 150) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    });

    // Initialize Enquiry Popup
    initEnquiryPopup();
});

function initEnquiryPopup() {
    // 1. Create popup HTML dynamically
    const popupHTML = `
    <div class="enquiry-modal-overlay" id="enquiryModal">
        <div class="enquiry-modal">
            <button class="enquiry-close-btn" id="enquiryCloseBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div class="enquiry-status">
                <span class="enquiry-status-dot"></span>
                <span class="enquiry-status-text">ONLINE DESK</span>
            </div>
            
            <h2 class="enquiry-title">Make an Enquiry</h2>
            <p class="enquiry-desc">Submit details below. Our admissions concierge will reach out to guide your family.</p>
            
            <form class="enquiry-form">
                <div class="enquiry-form-group">
                    <label class="enquiry-label">FULL NAME</label>
                    <input type="text" class="enquiry-input" placeholder="Enter your full name" required>
                </div>
                
                <div class="enquiry-form-row">
                    <div class="enquiry-form-group">
                        <label class="enquiry-label">EMAIL ADDRESS</label>
                        <input type="email" class="enquiry-input" placeholder="name@example.com" required>
                    </div>
                    <div class="enquiry-form-group">
                        <label class="enquiry-label">PHONE NUMBER</label>
                        <input type="tel" class="enquiry-input" placeholder="+1 (555) 000-0000" required>
                    </div>
                </div>
                
                <div class="enquiry-form-group">
                    <label class="enquiry-label">SUBJECT OF ENQUIRY</label>
                    <select class="enquiry-select" required>
                        <option value="Admissions (Academic Year 2025-26)">Admissions (Academic Year 2025-26)</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Campus Tour">Campus Tour</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                <div class="enquiry-form-group">
                    <label class="enquiry-label">YOUR MESSAGE</label>
                    <textarea class="enquiry-textarea" placeholder="Tell us about your child's academic goals or any specific concerns..." required></textarea>
                </div>
                
                <button type="submit" class="enquiry-submit-btn">
                    Submit Enquiry 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </form>
            
            <p class="enquiry-legal">By submitting, you agree to receive official correspondence regarding the admissions timeline.</p>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.getElementById('enquiryCloseBtn');
    
    // Find all apply buttons (using various classes used across the site)
    const applyButtons = document.querySelectorAll('.apply-btn, .btn-cta, .btn-cta-large, .btn-apply-online, .pu-apply-btn');

    applyButtons.forEach(btn => {
        // Only target buttons that contain 'Apply' in their text to avoid grabbing random unrelated buttons
        if (btn.textContent.toLowerCase().includes('apply')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        }
    });

    // Close logic
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
