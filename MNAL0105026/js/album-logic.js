function initSecretSystem() {
    const triggerContainer = document.getElementById('secret-trigger-container');
    const secretImages = document.querySelectorAll('.secret-img');

    const backBtnContainer = document.getElementById('back-btn-container');
    const backBtn = document.getElementById('back-to-album-btn');

    // Chance to show the secret button
    if (Math.random() < 0.8) {
        const btn = document.createElement('button');
        btn.className = 'ui-btn glass-card pill yellow-glass';
        btn.innerText = 'See Secret Album';
        btn.id = 'see-secret-btn';

        btn.onclick = () => {
            // Dark Mode Activation
            document.body.classList.add('dark-theme');

            // Show secret images
            secretImages.forEach(img => {
                img.classList.add('show');
            });

            // Change music
            if (window.musicPlayer) {
                window.musicPlayer.changeSong('assets/audio/song2.m4a');
            }

            // Show back button
            backBtnContainer.classList.remove('hidden');

            // Hide the trigger button
            btn.style.display = 'none';

            // Scroll to secrets
            secretImages[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        triggerContainer.appendChild(btn);
    }

    // Back to Album logic
    if (backBtn) {
        backBtn.onclick = () => {
            // Remove Dark Mode
            document.body.classList.remove('dark-theme');

            // Hide secret images
            secretImages.forEach(img => {
                img.classList.remove('show');
            });

            // Re-show secret trigger button (if it exists)
            const seeSecretBtn = document.getElementById('see-secret-btn');
            if (seeSecretBtn) seeSecretBtn.style.display = 'inline-block';

            // Change music back
            if (window.musicPlayer) {
                window.musicPlayer.changeSong('assets/audio/song1.m4a');
            }

            // Hide back button itself
            backBtnContainer.classList.add('hidden');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
}

window.albumLogic = {
    initSecret: initSecretSystem
};
