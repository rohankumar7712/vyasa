document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Previous update clicked');
        });
        
        nextBtn.addEventListener('click', () => {
            console.log('Next update clicked');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuBtn && navLinks && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });

        menuOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }
});


/* =========================================================
   VYASA SCROLL REVEAL SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Auto-assign reveal to full sections
    const revealSections = document.querySelectorAll(`
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
        .leadership-section
    `);
    
    revealSections.forEach((section) => {
        section.classList.add("reveal", "reveal-up");
    });
    
    // 2. Auto-assign reveal to section headers
    const sectionHeaders = document.querySelectorAll(`
        .legacy-content,
        .features-header,
        .achievements-header,
        .showcase-header,
        .resources-header,
        .alumni-header
    `);
    
    sectionHeaders.forEach((header) => {
        header.classList.add("reveal", "reveal-up");
    });
    
    // 3. Stagger cards automatically
    const staggerGroups = document.querySelectorAll(`
        .features-gallery,
        .achievements-grid,
        .showcase-grid,
        .alumni-grid,
        .insights-grid,
        .leadership-grid
    `);
    
    staggerGroups.forEach((group) => {
        const cards = group.children;
        Array.from(cards).forEach((card, index) => {
            card.classList.add("reveal", "reveal-up");
            const delay = Math.min(index * 100, 400);
            card.style.transitionDelay = `${delay}ms`;
        });
    });

    // 4. Setup Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
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
});
