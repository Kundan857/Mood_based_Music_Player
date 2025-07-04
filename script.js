// =============================================
// DOM Elements
// =============================================
const body = document.body;
const moodBtns = document.querySelectorAll('.mood-btn');
const songsContainer = document.getElementById('songs-container');
const albumArt = document.getElementById('album-art').querySelector('img');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const vinyl = document.getElementById('vinyl');
const waveform = document.getElementById('waveform');
const volumeBar = document.getElementById('volume-bar');
const themeToggle = document.getElementById('theme-toggle');
const particleContainer = document.getElementById("particles");
// Audio Setup

const audioPlayer = new Audio();
let audioContext; // Will hold our Web Audio context

// Initialize with safe default volume
audioPlayer.volume = 0.8;

// Music Library (UPDATE THESE PATHS)

const moodPlaylists = {
    happy: [
        { 
            title: "Aaj Ki Raat",
            artist: "Madhubanti Bagchi",
            cover: "https://th.bing.com/th/id/OIP.vBlhjlZSCfwsPzkFVcNfPgAAAA?w=134&h=150&c=7&r=0&o=5&dpr=1.6&pid=1.7",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            duration: "3:45"
        },
        { 
            title: "Party All Night", 
            artist: "Yo Yo Honey singh", 
            cover: "https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/db/74/dc/db74dc08-fe8a-a345-21da-8e45416af6e6/8902894356817_cover.jpg/1200x1200bf-60.jpg",
            audio: "music/happy2.mp3", 
            duration: "3:45"
        },
        {
            title: "London Thumkada", 
            artist: "Lab Jhanjua", 
            cover: "https://th.bing.com/th/id/OIP.HaG_U-ohV_IHKPXEqkMacgHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.6&pid=1.7",
            audio: "music/happy3.mp3",
            duration: "3:15"
        },
        {
            title: "Mere Mehboob", 
            artist: "Sachin jigar", 
            cover: "https://th.bing.com/th/id/OIP.KG-l7hHgDQdUntmSJl-HEQHaEK?rs=1&pid=ImgDetMain",
            audio: "music/happy4.mp3", 
            duration: "3:35"
        },
        {
            title: "One Bottle Down", 
            artist: "Yo Yo Honey Singh", 
            cover: "https://ts4.mm.bing.net/th?id=OIP.Ks0OsPVxxL5sZbO1aSKkOQHaEK&pid=15.1",
            audio: "music/happy5.mp3", 
            duration: "3:10"
        },
        {
            title: "Chumma", 
            artist: "Pawan Singh", 
            cover: "https://www.bing.com/th/id/OIP.dVOe2jBHXa_uRGkkHg0BUwHaFY?w=242&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7",
            audio: "music/happy6.mp3", 
            duration: "3:15"
        }
    ],
    sad: [
        { 
            title: "Agar Tm Saath Ho", 
            artist: "Arijit Singh",  
            cover: "https://i.ytimg.com/vi/xRb8hxwN5zc/maxresdefault.jpg",         
            audio: "music/sad1.mp3", 
            duration: "5:36"
        },
        {
            title: "Ranjhaan", 
            artist: "Parampara Thandon", 
            cover: "https://a10.gaanacdn.com/gn_img/song/XYybzNrb2g/ybzEg61rW2/size_m_1628084846.jpg",
            audio: "music/sad2.mp3", 
            duration: "2:39"
        },
        {
            title: "Jhol", 
            artist: "Mannu X Annural", 
            cover: "https://i.ytimg.com/vi/nwR-yzvNCSs/maxresdefault.jpg",
            audio: "music/sad3.mp3",
            duration: "3:15"
        },
        {
            title: "Chal Diye Tm Kaha", 
            artist: "AUR", 
            cover: "https://i.ytimg.com/vi/fFSXotQhuz8/maxresdefault.jpg",
            audio: "music/sad4.mp3", 
            duration: "4:28"
        },
        {
            title: "Baaton Ko Teri", 
            artist: "Arijit Singh", 
            cover: "https://images.genius.com/0ed247480bb4cc8b9355ad3a0b4c39f6.1000x1000x1.jpg",
            audio: "music/sad5.mp3", 
            duration: "4:36"
        },
        {
            title: "Suniya Suniya", 
            artist: "Juss x MixSingh", 
            cover: "https://i.ytimg.com/vi/pi5IRQNiSwk/maxresdefault.jpg",
            audio: "music/sad6.mp3", 
            duration: "3:26"
        },
    ],
    chill: [  
        { 
            title: "Ilahi", 
            artist: "Arijit Singh", 
            cover: "https://i.ytimg.com/vi/ZZ-4t3xGNnQ/maxresdefault.jpg",
            audio: "music/chill1.mp3",
            duration: "3:45"
        },
        {
            title: "Raat Bhar", 
            artist: "Arijit Singh, Shreya Ghoshal", 
            cover: "https://i.ytimg.com/vi/4KFVySixs_E/maxresdefault.jpg",
            audio: "music/chill2.mp3",
            duration: "4:10"
        },
        { 
            title: "Safar", 
            artist: "Pritam , Arijit singh", 
            cover: "https://i.ytimg.com/vi/Ev3usCpFhPw/maxresdefault.jpg",
            audio: "music/chill3.mp3",
            duration: "3:45"
        },
        { 
            title: "Aakh Lad Jaave ", 
            artist: "Badsaah , Aees Kaur,jubin nautiyal", 
            cover: "https://i.ytimg.com/vi/3mEnmXhInrs/maxresdefault.jpg",
            audio: "music/chill4.mp3",
            duration: "4:10"
        },
        { 
            title: "Ghungroo", 
            artist: "Vishal-shekhar ,Shilpa Rao", 
            cover: "https://i0.wp.com/hindi.dekhnews.com/wp-content/uploads/2019/09/maxresdefault-3.jpg?fit=1280%2C720&ssl=1",
            audio: "music/chill5.mp3",
            duration: "3:45"
        },
        { 
            title: "Hawayein", 
            artist: "Pritam", 
            cover: "https://i.ytimg.com/vi/cs1e0fRyI18/maxresdefault.jpg",
            audio: "music/chill6.mp3",
            duration: "4:10"
        },
    ],
    energetic: [
        { 
            title: "295",
            artist: "Siddu Mosse Wala",
            cover: "https://i.ytimg.com/vi/rrECfUnyytc/maxresdefault.jpg",
            audio: "music/energetic1.mp3",
            duration: "4:59"
        },
        {
            title: "Kar Har Maidaan Fateh",
            artist: "Sukhwinder singh , shereya",
            cover: "https://i.ytimg.com/vi/64UX1npgRkI/maxresdefault.jpg",
            audio: "music/energetic2.mp3",
            duration: "5:12"
        },
        {
            title: "Zinda",
            artist: "Shanker-Ehsaan-Loy",
            cover: "https://i.ytimg.com/vi/fP6MNznzVcQ/maxresdefault.jpg",
            audio: "music/energetic3.mp3",
            duration: "3:31"
        },
        {
            title: "Aarambh",
            artist: "Piyush Mishra",
            cover: "https://i.ytimg.com/vi/stgjzFprx-c/maxresdefault.jpg",
            audio: "music/energetic4.mp3",
            duration: "4:20"
        },
        {
            title: "Born To Shine",
            artist: "Diljit Dosanjh",
            cover: "https://i.ytimg.com/vi/jxE3xSPDc48/maxresdefault.jpg",
            audio: "music/energetic5.mp3",
            duration: "3:33"
        },
        {
            title: "Same Beef",
            artist: "Siddhu Mosse Wala",
            cover: "https://i.ytimg.com/vi/BFUhrclr_Bk/maxresdefault.jpg",
            audio: "music/energetic6.mp3",
            duration: "4:20"
        },
    ]
};

// Audio Context Setup
const audioContex = new (window.AudioContext || window.webkitAudioContext)();
const enableAudioBtn = document.getElementById('enable-audio');

enableAudioBtn.addEventListener('click', async () => {
    await audioContext.resume(); // Unlock audio
    document.getElementById('audio-permission').style.display = 'none'; // Hide popup
});

// =============================================
// Player State
// =============================================
let currentPlaylist = [];
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;

// =============================================
// Initialization
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initAudioContext();
    selectMood('happy');
    loadTheme();
    setupEventListeners();
});

// =============================================
// Core Audio Functions
// =============================================
function initAudioContext() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        
        // Create a gain node to control volume
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.8;
        gainNode.connect(audioContext.destination);
        
        // Create media element source
        const source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(gainNode);
        
        console.log("Audio context initialized successfully");
    } catch (error) {
        console.error("Audio context initialization failed:", error);
        alert("Your browser has limited audio support. Some features may not work.");
    }
}

function unlockAudio() {
    if (!audioContext) return;
    
    // Resume audio context if suspended
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log("Audio context successfully resumed");
        }).catch(error => {
            console.warn("Audio context resume failed:", error);
        });
    }
}

// =============================================
// Player Controls
// =============================================
function playSong(index) {
    if (index < 0 || index >= currentPlaylist.length) {
        console.error("Invalid song index:", index);
        return;
    }

    currentSongIndex = index;
    const song = currentPlaylist[index];
    loadSong(index); // Ensure UI updates first  
    audioPlayer.src = song.audio;
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayUI();
    }).catch(console.error("Playback failed:", error));

    
    // Verify audio file exists
    fetch(song.audio)
        .then(response => {
            if (!response.ok) throw new Error(`File not found: ${song.audio}`);
            
            // Set audio source
            audioPlayer.src = song.audio;
            
            // Unlock audio context
            unlockAudio();
            
            // Start playback
            return audioPlayer.play();
        })
        .then(() => {
            isPlaying = true;
            updatePlayUI();
        })
        .catch(error => {
            console.error("Playback failed:", error);
            alert(`Error loading audio:\n${error.message}\n\nPlease verify the file exists at: ${song.audio}`);
            isPlaying = false;
            updatePlayUI();
        });
}



function togglePlay() {
    if (!audioPlayer.src) {
        playSong(0); // Start with first song if none loaded
        return;
    }

    if (audioPlayer.paused) {
        unlockAudio(); // Ensure context is active
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                updatePlayUI();
            })
            .catch(error => {
                console.error("Play failed:", error);
                alert("Please interact with the page first to enable audio");
                isPlaying = false;
                updatePlayUI();
            });
    } else {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayUI();
    }
}

function updatePlayUI() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    vinyl.classList.toggle('playing', isPlaying);
    waveform.style.opacity = isPlaying ? '1' : '0.6';
}

// =============================================
// Playback Navigation
// =============================================
function playNext() {
    const nextIndex = isShuffled 
        ? Math.floor(Math.random() * currentPlaylist.length)
        : (currentSongIndex + 1) % currentPlaylist.length;
    playSong(nextIndex);
}

function playPrevious() {
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0; // Restart current song
        return;
    }
    const prevIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playSong(prevIndex);
}

// =============================================
// Progress & Volume Controls
// =============================================
function updateProgress() {
    if (audioPlayer.duration && isFinite(audioPlayer.duration)) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        animateWaveform();
    }
}

function seekAudio() {
    if (audioPlayer.duration && isFinite(audioPlayer.duration)) {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        if (isFinite(seekTime)) {
            audioPlayer.currentTime = seekTime;
        }
    }
}

function setVolume() {
    const volume = volumeBar.value / 100;
    audioPlayer.volume = volume;
    
    // Also update Web Audio gain if available
    if (audioContext && audioContext.createGain) {
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volume;
    }
}

// =============================================
// UI Functions
// =============================================
function selectMood(mood) {
    if (!moodPlaylists[mood]) {
        console.error("Invalid mood selected:", mood);
        return;
    }
    
    currentPlaylist = moodPlaylists[mood];
    currentSongIndex = 0;
    
    // Update UI
    moodBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mood-btn[data-mood="${mood}"]`).classList.add('active');
    renderPlaylist();
    loadSong(currentSongIndex);
}

function renderPlaylist() {
    songsContainer.innerHTML = '';
    currentPlaylist.forEach((song, index) => {
        const songEl = document.createElement('div');
        songEl.className = `song-item ${index === currentSongIndex ? 'active' : ''}`;
        songEl.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" onerror="this.src='images/aaj-ki-raat.jpg'">
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <span class="song-duration">${song.duration}</span>
        `;
        songEl.addEventListener('click', () => playSong(index));
        songsContainer.appendChild(songEl);
    });
}
function loadSong(index) {
    const song = currentPlaylist[index];
    albumArt.style.opacity = "0";  
setTimeout(() => {
    albumArt.src = song.cover + "?t=" + new Date().getTime();
    albumArt.style.opacity = "1";
}, 300);  


    // Update album art and prevent caching issues
    albumArt.src = song.cover + '?t=' + new Date().getTime();
    albumArt.onerror = function() {
        this.src = 'images/aaj-ki-raat.jpg'; // Fallback image
    };

    // Update song details
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    totalTimeEl.textContent = song.duration;
    progressBar.value = 0;
    currentTimeEl.textContent = '0:00';

    // Update active song in playlist
    document.querySelectorAll('.song-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.song-item')[index].classList.add('active');
}

// =============================================
// Utility Functions
// =============================================
function animateWaveform() {
    const bars = document.querySelectorAll('.wave-bar');
    bars.forEach(bar => {
        const randomHeight = 5 + Math.random() * 20;
        bar.style.height = `${randomHeight}px`;
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    themeToggle.innerHTML = body.classList.contains('light-theme') 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

// =============================================
// Event Listeners
// =============================================
function setupEventListeners() {
    // Mood selection
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => selectMood(btn.dataset.mood));
    });
    
    // Player controls
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    shuffleBtn.addEventListener('click', () => {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active');
    });
    repeatBtn.addEventListener('click', () => {
        isRepeated = !isRepeated;
        repeatBtn.classList.toggle('active');
    });
    
    // Progress and volume
    progressBar.addEventListener('input', seekAudio);
    volumeBar.addEventListener('input', setVolume);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Audio events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (isRepeated) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNext();
        }
    });
    audioPlayer.addEventListener('error', () => {
        const errorMessages = {
            1: "Audio loading was aborted",
            2: "Network error occurred",
            3: "Audio decoding failed",
            4: "Audio format not supported"
        };
        const error = errorMessages[audioPlayer.error?.code] || "Unknown audio error";
        console.error("Audio error:", error);
        alert(`Audio Error: ${error}\nFile: ${audioPlayer.src}`);
    });
    
    // First interaction unlock
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, unlockAudio, { once: true });
    });
}


function toggleTheme() {
    document.body.classList.toggle("light-theme");
    
    // Save theme preference to localStorage
    const isLightTheme = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    
    // Update the theme toggle icon
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.innerHTML = isLightTheme 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

document.getElementById("theme-toggle").addEventListener("click", turnTheme);



