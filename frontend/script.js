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
