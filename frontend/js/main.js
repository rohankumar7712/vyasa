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

    // Sticky Navbar Logic (Smart Sticky - show only on scroll up)
    let lastScrollY = window.scrollY || 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const navbars = document.querySelectorAll('.navbar');
        
        navbars.forEach(navbar => {
            if (currentScrollY > 150) {
                // Scrolling Down -> Hide Navbar
                if (currentScrollY > lastScrollY) {
                    navbar.classList.remove('sticky');
                } 
                // Scrolling Up -> Show Navbar
                else {
                    navbar.classList.add('sticky');
                }
            } else {
                // At the top -> Remove sticky to revert to normal inline navbar
                navbar.classList.remove('sticky');
            }
        });
        
        lastScrollY = currentScrollY;
    });

    // Initialize Enquiry Popup
    initEnquiryPopup();
    
    // Initialize Campus Visit Popup
    initCampusVisitPopup();
    
    // Initialize Download Toast
    initDownloadToast();
    
    // Initialize Global Form Success Modal
    initGlobalFormSuccess();
    
    // Initialize EmailJS
    initEmailJS();
});

function initEmailJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        emailjs.init({
            publicKey: "knUMKXBtOMdBph3Za", // REPLACE WITH YOUR PUBLIC KEY
        });
    };
    document.head.appendChild(script);
}

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

    // Form submission
    const form = modal.querySelector('.enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (typeof emailjs !== 'undefined') {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Sending...';
                
                emailjs.sendForm('service_8abb7g4', 'YOUR_TEMPLATE_ID', form)
                    .then(() => {
                        btn.innerHTML = originalText;
                        alert('Enquiry Submitted Successfully!'); // Simple fallback since this modal lacks a built-in success view
                        closeModal();
                        form.reset();
                    }, (error) => {
                        btn.innerHTML = originalText;
                        alert('FAILED... ' + JSON.stringify(error));
                    });
            } else {
                alert('Enquiry Submitted Successfully!');
                closeModal();
                form.reset();
            }
        });
    }
}

function initCampusVisitPopup() {
    // 1. Create popup HTML dynamically
    const popupHTML = `
    <div class="enquiry-modal-overlay" id="visitModal">
        <div class="enquiry-modal" id="visitModalContent">
            <button class="enquiry-close-btn" id="visitCloseBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div id="visitFormContainer">
                <div class="enquiry-status">
                    <span class="enquiry-status-dot"></span>
                    <span class="enquiry-status-text">ADMISSIONS</span>
                </div>
                
                <h2 class="enquiry-title">Book a Campus Visit</h2>
                <p class="enquiry-desc">Experience our campus firsthand. Fill out the details below to schedule your visit.</p>
                
                <form class="enquiry-form" id="visitForm">
                    <div class="enquiry-form-row">
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">FIRST NAME *</label>
                            <input type="text" class="enquiry-input" placeholder="First Name" required>
                        </div>
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">LAST NAME *</label>
                            <input type="text" class="enquiry-input" placeholder="Last Name" required>
                        </div>
                    </div>
                    
                    <div class="enquiry-form-row">
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">EMAIL ADDRESS *</label>
                            <input type="email" class="enquiry-input" placeholder="name@example.com" required>
                        </div>
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">PHONE NUMBER *</label>
                            <input type="tel" class="enquiry-input" placeholder="+1 (555) 000-0000" required>
                        </div>
                    </div>

                    <div class="enquiry-form-row">
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">STUDENT NAME *</label>
                            <input type="text" class="enquiry-input" placeholder="Student's Full Name" required>
                        </div>
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">GRADE / CLASS</label>
                            <select class="enquiry-select" required>
                                <option value="" disabled selected>Select Grade ▼</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Grade 1-5">Primary (Grade 1-5)</option>
                                <option value="Grade 6-8">Middle (Grade 6-8)</option>
                                <option value="Grade 9-12">High (Grade 9-12)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="enquiry-form-row">
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">PREFERRED VISIT DATE *</label>
                            <input type="date" class="enquiry-input" required>
                        </div>
                        <div class="enquiry-form-group">
                            <label class="enquiry-label">PREFERRED TIME</label>
                            <select class="enquiry-select" required>
                                <option value="" disabled selected>Select Time ▼</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="enquiry-form-group">
                        <label class="enquiry-label">NUMBER OF VISITORS</label>
                        <input type="number" class="enquiry-input" placeholder="2" min="1" max="10" required>
                    </div>

                    <div class="enquiry-form-group">
                        <label class="enquiry-label">MESSAGE / SPECIAL REQUIREMENTS</label>
                        <textarea class="enquiry-textarea" placeholder="Optional notes for our team..."></textarea>
                    </div>
                    
                    <button type="submit" class="enquiry-submit-btn">
                        Book Campus Visit 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </form>
            </div>
            
            <div id="visitSuccessContainer" style="display: none; text-align: center; padding: 40px 20px;">
                <div style="width: 60px; height: 60px; background: rgba(252, 163, 17, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fca311" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2 class="enquiry-title" style="margin-bottom: 15px;">Thank You for Your Visit Request!</h2>
                <p class="enquiry-desc" style="margin-bottom: 30px;">Your campus visit request has been submitted successfully. Our admissions team will contact you shortly to confirm the date and time of your visit.</p>
                <button class="btn-outline-white close-success-btn" style="padding: 10px 24px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; cursor: pointer; font-family: 'Poppins', sans-serif;">Done</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const modal = document.getElementById('visitModal');
    const closeBtn = document.getElementById('visitCloseBtn');
    const formContainer = document.getElementById('visitFormContainer');
    const successContainer = document.getElementById('visitSuccessContainer');
    const form = document.getElementById('visitForm');
    const closeSuccessBtn = document.querySelector('.close-success-btn');
    
    // Find all visit buttons based on their text
    const visitButtons = Array.from(document.querySelectorAll('a, button')).filter(btn => {
        const txt = btn.textContent.trim().toLowerCase().replace('→', '').trim();
        return txt === 'book a campus visit' || txt === 'schedule a campus visit';
    });

    visitButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            formContainer.style.display = 'block';
            successContainer.style.display = 'none';
            form.reset();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Close logic
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    closeSuccessBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (typeof emailjs !== 'undefined') {
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Booking...';
            
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                .then(() => {
                    btn.innerHTML = originalText;
                    formContainer.style.display = 'none';
                    successContainer.style.display = 'block';
                }, (error) => {
                    btn.innerHTML = originalText;
                    alert('FAILED... ' + JSON.stringify(error));
                });
        } else {
            formContainer.style.display = 'none';
            successContainer.style.display = 'block';
        }
    });
}

function initDownloadToast() {
    // 1. Create toast HTML
    const toastHTML = `
    <div class="download-toast" id="downloadToast">
        <div class="download-toast-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Download started
        </div>
        <div class="download-toast-desc">
            Thank you for your interest in VYASA International School.
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);
    const toast = document.getElementById('downloadToast');
    
    // 2. Find all download links (text contains "download" or has specific classes)
    const downloadElements = Array.from(document.querySelectorAll('a, button')).filter(el => {
        const text = el.textContent.trim().toLowerCase();
        const hasDownloadClass = el.classList.contains('download-icon') || 
                                 el.classList.contains('btn-download') ||
                                 el.querySelector('.fa-download');
        return text.includes('download') || hasDownloadClass;
    });

    // 3. Attach click listener
    let toastTimeout;
    downloadElements.forEach(el => {
        el.addEventListener('click', (e) => {
            // Prevent actual download if it's a dummy # link
            if(el.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Show toast
            toast.classList.add('show');
            
            // Auto hide after 4 seconds
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });
    });
}

function initGlobalFormSuccess() {
    // 1. Create global success modal HTML dynamically
    const modalHTML = `
    <div class="enquiry-modal-overlay" id="globalFormSuccessModal">
        <div class="enquiry-modal" style="text-align: center; background-color: #f4f5fb; color: #1a2b4c; padding: 50px 30px;">
            <div style="width: 60px; height: 60px; background: rgba(34, 197, 94, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 class="form-title" style="margin-bottom: 15px; color: #1a2b4c !important;">Submission Successful!</h3>
            <p style="color: #555; font-size: 14px; line-height: 1.6; font-family: 'Geist', sans-serif;">Thank you for contacting VYASA International School. Our team will contact you shortly. A confirmation email has also been sent to your email address.</p>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const successModal = document.getElementById('globalFormSuccessModal');

    // 2. Find all forms on the page EXCEPT those that have their own custom inline success handlers
    // (like forms inside .enquiry-modal, or .footer-subscribe-form if we don't want it to cover the screen)
    const forms = document.querySelectorAll('form:not(.footer-subscribe-form)');

    // 3. Attach submit listener
    forms.forEach(form => {
        // Skip forms that are inside a modal (they have their own logic)
        if (form.closest('.enquiry-modal')) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (typeof emailjs !== 'undefined') {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn ? btn.innerHTML : 'Submit';
                if (btn) btn.innerHTML = 'Sending...';
                
                emailjs.sendForm('service_8abb7g4', 'template_cwyd22i', form)
                    .then(() => {
                        if (btn) btn.innerHTML = originalText;
                        
                        // Show modal
                        successModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        form.reset();
                        
                        // Auto hide after 5 seconds
                        setTimeout(() => {
                            successModal.classList.remove('active');
                            document.body.style.overflow = '';
                        }, 5000);
                    }, (error) => {
                        if (btn) btn.innerHTML = originalText;
                        alert('FAILED... ' + JSON.stringify(error));
                    });
            } else {
                // Show modal
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                form.reset();
                
                // Auto hide after 5 seconds
                setTimeout(() => {
                    successModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 5000);
            }
        });
    });
}
