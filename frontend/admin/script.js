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

});
