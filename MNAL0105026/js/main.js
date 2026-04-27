window.onload = () => {
    const splash = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');

    // Show button when resources are loaded
    enterBtn.style.display = 'block';

    enterBtn.addEventListener('click', () => {
        // Play music
        if (window.musicPlayer) {
            window.musicPlayer.play();
        }

        // Animation for splash screen
        splash.style.transform = 'translateY(+100%)';
        splash.style.opacity = '0';

        // Show main content
        mainContent.classList.remove('hidden');

        // Hide splash from DOM after animation
        setTimeout(() => {
            splash.style.display = 'none';
        }, 800);

        // Initialize secret system
        if (window.albumLogic) {
            window.albumLogic.initSecret();
        }

        // Elastic animation for music player
        if (window.triggerPlayerAnimation) {
            window.triggerPlayerAnimation();
        }
    });

};
