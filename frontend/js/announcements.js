document.addEventListener('DOMContentLoaded', () => {
    const fetchAnnouncements = async () => {
        try {
            // Using a relative path that works from the root HTML files
            const response = await fetch('data/announcements.json');
            if (!response.ok) return;
            const announcements = await response.json();
            
            // Filter active announcements
            const today = new Date().toISOString().split('T')[0];
            const activeAnnouncements = announcements.filter(a => {
                if (a.status !== 'published') return false;
                if (a.startDate && a.startDate > today) return false;
                if (a.endDate && a.endDate < today) return false;
                return true;
            });
            
            // Sort by priority (lower number = higher priority)
            activeAnnouncements.sort((a, b) => a.priority - b.priority);
            
            // Show the highest priority announcement
            if (activeAnnouncements.length > 0) {
                renderAnnouncement(activeAnnouncements[0]);
            }
            
        } catch (error) {
            console.error("Error loading announcements:", error);
        }
    };
    
    const renderAnnouncement = (announcement) => {
        // Create container
        const card = document.createElement('div');
        card.className = `floating-announcement-card pos-${announcement.position || 'bottom-right'}`;
        card.id = `announcement-${announcement.id}`;
        
        // Check if dismissed within the last 5 minutes
        const lastDismissedStr = localStorage.getItem(`dismissed_announcement_${announcement.id}`);
        if (lastDismissedStr) {
            const lastDismissedTime = parseInt(lastDismissedStr, 10);
            const now = new Date().getTime();
            const fiveMinutes = 5 * 60 * 1000;
            
            // If it hasn't been 5 minutes yet, don't show it
            if (now - lastDismissedTime < fiveMinutes) {
                return;
            }
        }
        
        let html = `
            <button class="announcement-close" aria-label="Close Announcement">&times;</button>
        `;
        
        if (announcement.banner) {
            html += `<img src="${announcement.banner}" alt="${announcement.title}" class="announcement-banner">`;
        }
        
        html += `
            <div class="announcement-content">
                <h4 class="announcement-title">${announcement.title}</h4>
                <p class="announcement-desc">${announcement.description}</p>
        `;
        
        if (announcement.buttonText && announcement.buttonUrl) {
            html += `<a href="${announcement.buttonUrl}" class="announcement-btn">${announcement.buttonText}</a>`;
        }
        
        html += `</div>`;
        card.innerHTML = html;
        
        document.body.appendChild(card);
        
        // Add close event
        const closeBtn = card.querySelector('.announcement-close');
        closeBtn.addEventListener('click', () => {
            card.classList.remove('show');
            setTimeout(() => {
                card.style.display = 'none';
            }, 500); // wait for slide-out transition
            // Save the exact time they dismissed it
            localStorage.setItem(`dismissed_announcement_${announcement.id}`, new Date().getTime().toString());
        });
        
        // 6-second initial delay before showing
        setTimeout(() => {
            card.classList.add('show');
        }, 6000);
    };

    fetchAnnouncements();
});
