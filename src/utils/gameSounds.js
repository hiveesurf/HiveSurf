// Game Sound Effects System
// Provides audio feedback for game interactions

class GameSoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.volume = 0.7;
    this.audioContext = null;
    
    // Initialize audio context
    this.initAudioContext();
  }

  // Initialize Web Audio API context
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
    }
  }

  // Create a simple beep sound
  createBeep(frequency, duration, type = 'sine') {
    if (!this.audioContext || this.isMuted) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Create a chord (multiple frequencies)
  createChord(frequencies, duration, type = 'sine') {
    if (!this.audioContext || this.isMuted) return;

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createBeep(freq, duration, type);
      }, index * 50); // Stagger the notes slightly
    });
  }

  // Play click sound
  playClick() {
    this.createBeep(800, 0.1, 'square');
  }

  // Play success sound
  playSuccess() {
    this.createChord([523.25, 659.25, 783.99], 0.3, 'sine'); // C5, E5, G5
  }

  // Play error sound
  playError() {
    this.createChord([200, 150, 100], 0.5, 'sawtooth');
  }

  // Play win sound
  playWin() {
    this.createChord([523.25, 659.25, 783.99, 1046.50], 0.8, 'sine'); // C5, E5, G5, C6
  }

  // Play lose sound
  playLose() {
    this.createChord([400, 300, 200], 1.0, 'triangle');
  }

  // Play timer tick
  playTick() {
    this.createBeep(1000, 0.05, 'square');
  }

  // Play timer warning
  playWarning() {
    this.createChord([800, 600], 0.2, 'sine');
  }

  // Play game start sound
  playGameStart() {
    this.createChord([440, 554.37, 659.25], 0.5, 'sine'); // A4, C#5, E5
  }

  // Play game complete sound
  playGameComplete() {
    this.createChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 1.0, 'sine'); // C5, E5, G5, C6, E6
  }

  // Play cooldown sound
  playCooldown() {
    this.createChord([200, 150, 100, 80], 1.5, 'sawtooth');
  }

  // Play reward sound
  playReward() {
    this.createChord([523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98], 1.2, 'sine'); // C5, E5, G5, C6, E6, G6
  }

  // Play pattern match sound
  playPatternMatch() {
    this.createBeep(600, 0.2, 'sine');
  }

  // Play pattern wrong sound
  playPatternWrong() {
    this.createChord([300, 250, 200], 0.4, 'sawtooth');
  }

  // Play color click sound
  playColorClick(color) {
    const frequencies = {
      red: 440,    // A4
      blue: 523.25, // C5
      green: 659.25, // E5
      yellow: 783.99 // G5
    };
    
    this.createBeep(frequencies[color] || 440, 0.15, 'sine');
  }

  // Play scroll sound
  playScroll() {
    this.createBeep(400, 0.1, 'triangle');
  }

  // Play logo click sound
  playLogoClick() {
    this.createBeep(1000, 0.1, 'square');
  }

  // Play logo pop sound
  playLogoPop() {
    this.createChord([800, 1000, 1200], 0.2, 'sine');
  }

  // Play background music (optional)
  playBackgroundMusic() {
    if (this.isMuted) return;
    
    // Simple ambient background music
    const playNote = (freq, duration, delay) => {
      setTimeout(() => {
        this.createBeep(freq, duration, 'sine');
      }, delay);
    };

    // Play a simple melody
    const melody = [440, 523.25, 659.25, 523.25, 440, 392, 440];
    melody.forEach((freq, index) => {
      playNote(freq, 0.5, index * 1000);
    });
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Set volume
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Get volume
  getVolume() {
    return this.volume;
  }

  // Check if muted
  isMuted() {
    return this.isMuted;
  }
}

// Create singleton instance
const gameSoundManager = new GameSoundManager();

// Export individual sound functions for easy use
export const playClick = () => gameSoundManager.playClick();
export const playSuccess = () => gameSoundManager.playSuccess();
export const playError = () => gameSoundManager.playError();
export const playWin = () => gameSoundManager.playWin();
export const playLose = () => gameSoundManager.playLose();
export const playTick = () => gameSoundManager.playTick();
export const playWarning = () => gameSoundManager.playWarning();
export const playGameStart = () => gameSoundManager.playGameStart();
export const playGameComplete = () => gameSoundManager.playGameComplete();
export const playCooldown = () => gameSoundManager.playCooldown();
export const playReward = () => gameSoundManager.playReward();
export const playPatternMatch = () => gameSoundManager.playPatternMatch();
export const playPatternWrong = () => gameSoundManager.playPatternWrong();
export const playColorClick = (color) => gameSoundManager.playColorClick(color);
export const playScroll = () => gameSoundManager.playScroll();
export const playLogoClick = () => gameSoundManager.playLogoClick();
export const playLogoPop = () => gameSoundManager.playLogoPop();
export const playBackgroundMusic = () => gameSoundManager.playBackgroundMusic();

// Export sound manager for advanced usage
export const soundManager = gameSoundManager;

// Export toggle and volume functions
export const toggleMute = () => gameSoundManager.toggleMute();
export const setVolume = (volume) => gameSoundManager.setVolume(volume);
export const getVolume = () => gameSoundManager.getVolume();
export const isMuted = () => gameSoundManager.isMuted();

export default gameSoundManager;
