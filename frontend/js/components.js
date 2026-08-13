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
    const tickerContent = document.querySelector(".ticker-content");

    if (tickerContent) {
        tickerContent.style.textOverflow = 'clip';
        
        // Clone content for seamless looping
        const contentHtml = tickerContent.innerHTML;
        tickerContent.innerHTML = `
            <div class="ticker-scroll-wrapper" style="display: flex; width: max-content;">
                <div class="ticker-scroll-item" style="padding-right: 50px; white-space: nowrap;">${contentHtml}</div>
                <div class="ticker-scroll-item" style="padding-right: 50px; white-space: nowrap;">${contentHtml}</div>
            </div>`;
        
        const wrapper = tickerContent.querySelector('.ticker-scroll-wrapper');
        let scrollPos = 0;
        let isHovered = false;

        function animate() {
            if (!isHovered) {
                scrollPos += 0.4; // Slower speed of scroll
                const itemWidth = wrapper.children[0].offsetWidth;
                if (scrollPos >= itemWidth) {
                    scrollPos -= itemWidth;
                }
                wrapper.style.transform = `translateX(-${scrollPos}px)`;
            }
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
        
        tickerContent.addEventListener('mouseenter', () => isHovered = true);
        tickerContent.addEventListener('mouseleave', () => isHovered = false);
    }
}

// Ensure global accessibility for main.js initialization
window.VyasaComponents = {
    initMobileNavigation,
    initDropdowns,
    initAccordions,
    initNavigationTicker
};
