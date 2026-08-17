document.addEventListener('DOMContentLoaded', function() {
    // Chart.js Setup
    const chartCanvas = document.getElementById('enrollmentChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        // Create gradient
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)'); // Top color (blue)
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)'); // Bottom color (transparent)

    const data = {
        labels: ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
        datasets: [{
            label: 'Students Enrolled',
            data: [1100, 1600, 1800, 2100, 2680, 2800, 3000, 3300, 3500, 3900],
            borderColor: '#2563eb', // Bright blue
            backgroundColor: gradient,
            borderWidth: 2,
            pointBackgroundColor: '#2563eb', 
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.1 // Slight curve
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We have a custom legend in HTML
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#64748b',
                    bodyColor: '#0f172a',
                    bodyFont: { weight: 'bold' },
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' Students';
                        }
                    }
                }
            },
            scales: {
                y: {
                    display: true, 
                    beginAtZero: true,
                    max: 4000,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        callback: function(value) {
                            if (value === 0) return '0';
                            return (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false, // Hide vertical grid lines
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 10
                }
            }
        }
    };

    // Make chart dashed grid lines behind the line chart
    Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.05)';
    Chart.defaults.scale.grid.drawBorder = false;

    // To add dashed horizontal lines like the design, we can use a custom plugin or just adjust y axis
    config.options.scales.y.display = true;
    config.options.scales.y.grid = {
        color: 'rgba(0,0,0,0.05)',
        tickLength: 0,
        borderDash: [5, 5]
    };
    config.options.scales.y.ticks = {
        display: false // Still hide the numbers
    };
    config.options.scales.y.border = {
        display: false
    };
    

        const enrollmentChart = new Chart(ctx, config);
    }

    // --- Modal Logic ---
    const addEducatorModal = document.getElementById('addEducatorModal');
    const openAddEducatorBtn = document.getElementById('openAddEducatorModal');
    const closeAddEducatorBtn = document.getElementById('closeAddEducatorModal');
    const cancelAddEducatorBtn = document.getElementById('cancelAddEducator');

    if (addEducatorModal && openAddEducatorBtn) {
        openAddEducatorBtn.addEventListener('click', () => {
            addEducatorModal.classList.add('active');
        });

        const closeModal = () => {
            addEducatorModal.classList.remove('active');
        };

        if (closeAddEducatorBtn) closeAddEducatorBtn.addEventListener('click', closeModal);
        if (cancelAddEducatorBtn) cancelAddEducatorBtn.addEventListener('click', closeModal);

        // Close on overlay click
        addEducatorModal.addEventListener('click', (e) => {
            if (e.target === addEducatorModal) {
                closeModal();
            }
        });
    }
    // Sidebar Collapse Logic
    const collapseBtns = document.querySelectorAll('.collapse-menu-btn');
    if (collapseBtns) {
        collapseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                document.body.classList.toggle('sidebar-collapsed');
            });
        });
    }

    // --- Settings Page Tab Logic ---
    const settingsSidebarLinks = document.querySelectorAll('.settings-sidebar-nav li[data-target]');
    const settingsSections = document.querySelectorAll('.settings-section');

    if (settingsSidebarLinks.length > 0) {
        settingsSidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                settingsSidebarLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all sections
                settingsSections.forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetId = this.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    // We can use a tiny timeout to allow display:block to apply before adding class for animation
                    setTimeout(() => {
                        targetSection.classList.add('active');
                    }, 10);
                }
            });
        });
    }

    // Profile Dropdown Logic
    const profileContainer = document.querySelector('.profile-dropdown-container');
    const profileDropdownMenu = document.querySelector('.profile-dropdown-menu');
    
    if (profileContainer && profileDropdownMenu) {
        profileContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileContainer.contains(e.target)) {
                profileDropdownMenu.classList.remove('active');
            }
        });
    }

    // Notification Dropdown Logic
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationDropdownMenu = document.querySelector('.notification-dropdown-menu');
    
    if (notificationContainer && notificationDropdownMenu) {
        const notificationBtn = notificationContainer.querySelector('.notification-btn');
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdownMenu.classList.toggle('active');
            // Close profile dropdown if open
            if (profileDropdownMenu) profileDropdownMenu.classList.remove('active');
        });
        
        // Update profile container to close notification dropdown when clicked
        if (profileContainer) {
            profileContainer.addEventListener('click', function() {
                notificationDropdownMenu.classList.remove('active');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationContainer.contains(e.target)) {
                notificationDropdownMenu.classList.remove('active');
            }
        });
    }

    // Sidebar Submenu Logic
    const sidebarSubmenus = document.querySelectorAll('.sidebar-nav li.menu-item-has-children > a');
    
    sidebarSubmenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('.sub-menu');
            
            // Toggle open class for chevron rotation
            parentLi.classList.toggle('open');
            
            // Toggle visibility of submenu
            if (subMenu) {
                subMenu.classList.toggle('open');
            }
        });
    });

    // Active State and Auto-Expand based on URL
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'dashboard.html';

    // Remove active class from all static items first
    document.querySelectorAll('.sidebar-nav li.active').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav li.menu-item-has-children.open').forEach(li => {
        li.classList.remove('open');
        const subMenu = li.querySelector('.sub-menu');
        if (subMenu) subMenu.classList.remove('open');
    });

    // Map create/view pages to their parent list page
    const pageMapping = {
        'create-job.html': 'careers.html',
        'jobs.html': 'careers.html',
        'view-job.html': 'careers.html',
        'create-article.html': 'articles.html',
        'view-article.html': 'articles.html',
        'create-announcement.html': 'announcements.html',
        'create-achievement.html': 'achievements.html',
        'view-achievement.html': 'achievements.html',
        'create-media.html': 'media-library.html',
        'view-media.html': 'media-library.html',
        'create-program.html': 'programs.html',
        'view-program.html': 'programs.html',
        'create-student.html': 'students.html',
        'view-student.html': 'students.html',
        'create-testimonial.html': 'testimonials.html',
        'view-testimonial.html': 'testimonials.html',
        'educator-profile.html': 'educators.html',
        'page-editor.html': 'pages.html',
        'page-preview.html': 'pages.html'
    };

    const targetPage = pageMapping[pageName] || pageName;
    const currentActiveLi = document.querySelector(`.sidebar-nav li[data-page="${targetPage}"]`);

    if (currentActiveLi) {
        currentActiveLi.classList.add('active');
        
        // Check if it's inside a submenu
        const parentMenu = currentActiveLi.closest('.menu-item-has-children');
        if (parentMenu) {
            parentMenu.classList.add('open');
            const subMenu = parentMenu.querySelector('.sub-menu');
            if (subMenu) {
                subMenu.classList.add('open');
            }
        }
    }

});
