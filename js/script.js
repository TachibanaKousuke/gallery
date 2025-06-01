// 检测移动端 vs 桌面端，并给 <body> 添加 class
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
document.body.classList.add(isMobile ? 'mobile' : 'desktop');

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const progressBarFill = document.querySelector('.progress-bar-fill');
const timeDisplay = document.querySelector('.time-display');
const lyricsContainer = document.querySelector('.lyrics');
let currentLineIndex = 0;

const poemLines = [
    "你说风吹错了方向，",
    "才会在万千网址中，敲出这一个意外。",
    "",
    "可我想说——",
    "",
    "每一次误入，都是命运偷偷安排的遇见。",
    "",
    "感谢你来到这里，",
    "",
    "哪怕只是一瞬，",
    "",
    "也愿你此刻安然，",
    "",
    "眼中有光，心里有海。"
];

function loadLyrics() {
    lyricsContainer.innerHTML = '';
    poemLines.forEach((line, index) => {
        const p = document.createElement('p');
        p.textContent = line;
        if (index === currentLineIndex) p.classList.add('current-line');
        lyricsContainer.appendChild(p);
    });
}
loadLyrics();

audioPlayer.addEventListener('loadedmetadata', () => {
    if (isFinite(audioPlayer.duration) && audioPlayer.duration > 320) {
        audioPlayer.currentTime = 320;
    }
    updateTimeDisplay();
});

function updateTimeDisplay() {
    const currentTimeMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentTimeSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(audioPlayer.duration / 60);
    const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds} / ${durationMinutes}:${durationSeconds}`;
}

function updateProgressBar() {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBarFill.style.width = `${progressPercent}%`;
    updateTimeDisplay();
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

function highlightLine(index) {
    const lines = document.querySelectorAll('.lyrics p');
    lines.forEach((line, idx) => {
        if (idx === index) {
            line.classList.add('current-line');
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            line.classList.remove('current-line');
        }
    });
}

function nextLine() {
    if (currentLineIndex < poemLines.length - 1) {
        currentLineIndex++;
        highlightLine(currentLineIndex);
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
    }
}

function previousLine() {
    if (currentLineIndex > 0) {
        currentLineIndex--;
        highlightLine(currentLineIndex);
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
    }
}

function shuffleLyrics() {
    for (let i = poemLines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [poemLines[i], poemLines[j]] = [poemLines[j], poemLines[i]];
    }
    currentLineIndex = 0;
    loadLyrics();
}

function repeatSong() {
    audioPlayer.currentTime = 0;
    if (audioPlayer.paused) audioPlayer.play();
}

audioPlayer.addEventListener('timeupdate', () => {
    updateProgressBar();
    if (audioPlayer.currentTime >= (320 + currentLineIndex * 10)) {
        highlightLine(currentLineIndex);
    }
});

playPauseButton.addEventListener('click', togglePlayPause);
document.getElementById('next').addEventListener('click', nextLine);
document.getElementById('prev').addEventListener('click', previousLine);
document.getElementById('shuffle').addEventListener('click', shuffleLyrics);
document.getElementById('repeat').addEventListener('click', repeatSong);