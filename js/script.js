document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const timeDisplay = document.querySelector('.time-display');
    const lyricsLines = document.querySelectorAll('.lyrics p');

    let currentLineIndex = 2; // Start with the third line as current

    function updateProgressBar() {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBarFill.style.width = `${progressPercent}%`;

        const currentTimeMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentTimeSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds} / ${durationMinutes}:${durationSeconds}`;
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function nextLine() {
        if (currentLineIndex < lyricsLines.length - 1) {
            lyricsLines[currentLineIndex].classList.remove('current-line');
            currentLineIndex++;
            lyricsLines[currentLineIndex].classList.add('current-line');
        }
    }

    function previousLine() {
        if (currentLineIndex > 0) {
            lyricsLines[currentLineIndex].classList.remove('current-line');
            currentLineIndex--;
            lyricsLines[currentLineIndex].classList.add('current-line');
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleShuffle() {
        shuffleArray(Array.from(lyricsLines));
        lyricsLines.forEach((line, index) => {
            line.classList.remove('current-line');
            if (index === 0) {
                line.classList.add('current-line');
            }
        });
        currentLineIndex = 0;
    }

    function handleRepeat() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }

    audioPlayer.addEventListener('timeupdate', () => {
        updateProgressBar();

        // Simple timing for lyrics (adjust as needed)
        if (audioPlayer.currentTime >= 0 && currentLineIndex !== 0) {
            lyricsLines[currentLineIndex].classList.remove('current-line');
            currentLineIndex = 0;
            lyricsLines[currentLineIndex].classList.add('current-line');
        }
        if (audioPlayer.currentTime >= 10 && currentLineIndex === 0) nextLine();
        if (audioPlayer.currentTime >= 20 && currentLineIndex === 1) nextLine();
        if (audioPlayer.currentTime >= 30 && currentLineIndex === 2) nextLine();
        if (audioPlayer.currentTime >= 40 && currentLineIndex === 3) nextLine();
        if (audioPlayer.currentTime >= 50 && currentLineIndex === 4) nextLine();
        if (audioPlayer.currentTime >= 60 && currentLineIndex === 5) nextLine();
        if (audioPlayer.currentTime >= 70 && currentLineIndex === 6) nextLine();
        if (audioPlayer.currentTime >= 80 && currentLineIndex === 7) nextLine();
    });

    playPauseButton.addEventListener('click', togglePlayPause);

    document.getElementById('next').addEventListener('click', () => {
        nextLine();
        audioPlayer.currentTime += 10; // Move forward by 10 seconds
    });

    document.getElementById('prev').addEventListener('click', () => {
        previousLine();
        audioPlayer.currentTime -= 10; // Move backward by 10 seconds
    });

    document.getElementById('shuffle').addEventListener('click', handleShuffle);

    document.getElementById('repeat').addEventListener('click', handleRepeat);
});