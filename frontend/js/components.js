/* =========================================================
   UI COMPONENTS (components.js)
========================================================= */

function initMobileNavigation() {
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

        navLinks.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }
}

function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggles.length > 0) {
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
    }
}

function initAccordions() {
    const faqItems = document.querySelectorAll('.pu-faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.pu-faq-question-wrap');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    }
}

function initNavigationTicker() {
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
}

// Ensure global accessibility for main.js initialization
window.VyasaComponents = {
    initMobileNavigation,
    initDropdowns,
    initAccordions,
    initNavigationTicker
};
