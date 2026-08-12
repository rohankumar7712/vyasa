document.addEventListener('DOMContentLoaded', function() {
    // Chart.js Setup
    const chartCanvas = document.getElementById('enrollmentChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');

    const data = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Students Enrolled',
            data: [1500, 2100, 2600, 3100, 3562],
            borderColor: '#0f1626', // Primary dark color from CSS
            backgroundColor: '#0f1626',
            borderWidth: 2,
            pointBackgroundColor: '#f1d302', // Yellow brand color
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
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
                    backgroundColor: '#182236',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' Students';
                        }
                    }
                }
            },
            scales: {
                y: {
                    display: false, // Hide Y axis as per design
                    beginAtZero: true,
                    max: 4000
                },
                x: {
                    grid: {
                        display: false, // Hide vertical grid lines
                        drawBorder: false
                    },
                    ticks: {
                        color: '#828a99',
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
});
