const audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const songTitle = document.getElementById('song-title');

let isPlaying = false;

const songTitles = {
    'song1.m4a': 'I am Still Waitting',
    'song2.m4a': 'Dracula - Tame Impala, JENNIE'
};

function getTitleFromFilename(src) {
    const filename = src.split('/').pop();
    if (songTitles[filename]) {
        return songTitles[filename];
    }
    // Fallback: format filename (e.g. "my_song.m4a" -> "My Song")
    return filename.replace('.m4a', '').replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        // Update title if it's the first time
        if (songTitle.innerText.includes('Playing: ...')) {
            updateTitle();
        }
        audio.play().catch(e => console.log("Auto-play blocked or error:", e));
    }
}

function updateTitle() {
    // If audio.src is empty, look for the first source tag
    const currentSrc = audio.src || (audio.querySelector('source') ? audio.querySelector('source').src : '');
    if (currentSrc) {
        songTitle.innerText = `Playing: ${getTitleFromFilename(currentSrc)}`;
    }
}

// Initialize title on script load
updateTitle();

audio.onplay = () => {
    isPlaying = true;
    updateTitle();
    playPauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
    `;
};

audio.onpause = () => {
    isPlaying = false;
    playPauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    `;
};

playPauseBtn.addEventListener('click', togglePlay);

function triggerElasticAnimation() {
    const player = document.getElementById('music-player');
    if (!player) return;

    player.style.opacity = '1';
    player.style.display = 'flex';

    let targetY = 0;
    let velocity = -1; // Initial "upward" pop velocity
    const stiffness = 0.05;
    const damping = 0.8;

    let currentY = 150; // Start below the screen

    function animate() {
        const force = stiffness * (targetY - currentY);
        velocity = (velocity + force) * damping;
        currentY += velocity;

        // Squash & Stretch logic:
        // When velocity is high (moving fast), stretch vertically
        const stretchFactor = Math.abs(velocity) * 0.015;

        // Horizontal squash when moving fast
        const scaleX = 1 - (stretchFactor * 1.5);
        const scaleY = 1 + stretchFactor;

        player.style.transform = `translateX(-50%) translateY(${currentY}px) scale(${scaleX}, ${scaleY})`;

        if (Math.abs(velocity) > 0.05 || Math.abs(targetY - currentY) > 0.1) {
            requestAnimationFrame(animate);
        } else {
            // Settle at equilibrium
            player.style.transform = `translateX(-50%) translateY(0) scale(1, 1)`;
        }
    }

    animate();
}


// Initial call for first reveal (might be hidden by main.js logic too, so we'll coord)
// We'll expose it to window so main.js can call it when splash screen leaves.
window.triggerPlayerAnimation = triggerElasticAnimation;

function changeSong(src) {
    audio.src = src;
    updateTitle();
    triggerElasticAnimation(); // Bounce when song changes
    audio.play();
}

// Global scope for main logic access
window.musicPlayer = {
    play: () => audio.play(),
    changeSong: changeSong,
    triggerAnimation: triggerElasticAnimation
};



